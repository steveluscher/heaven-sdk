# Valhalla SDK

## Usage
```bash
npm install heaven-sdk
```
### Create a new mint ([example](./examples/create-new-mint.ts))
```typescript
import {
	Connection,
	Keypair,
	sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
	Heaven,
	HeavenSupportedNetwork,
	HeavenSupportedNetworkClusterApiUrl,
} from 'heaven-sdk';
import { readFileSync } from 'fs';

const wallet = readFileSync('./wallet.json', 'utf-8');
const walletJson = JSON.parse(wallet);

const payer = Keypair.fromSecretKey(new Uint8Array(walletJson));

async function test() {
	const connection = new Connection(
		HeavenSupportedNetworkClusterApiUrl[HeavenSupportedNetwork.localnet],
		'confirmed'
	);
	const mint = Keypair.generate();
	const createMintIx =
		await Heaven.makeCreateToken2022WithTransferFeeInstruction({
			connection,
			decimals: 9,
			feeBasisPoints: 100,
			maxFee: BigInt(100),
			mintAuthority: payer.publicKey,
			payer: payer.publicKey,
			transferFeeConfigAuthority: payer.publicKey,
			withdrawWithheldAuthority: payer.publicKey,
			freezeAuthority: payer.publicKey,
			userDefinedMint: mint.publicKey,
		});

	const createMintTx = await sendAndConfirmTransaction(
		connection,
		createMintIx,
		[payer, mint],
		{
			commitment: 'confirmed',
			preflightCommitment: 'confirmed',
		}
	);

	console.log(createMintTx);
}

test()
	.then(() => {})
	.catch((error) => {
		console.log(error);
	});
```

### Create a new pool ([example](./examples/create-new-pool.ts))
#### Parameters
- `encodedUserDefinedEventData`: A base64 encoded string that can be used to store any data you want to emit when the pool is created.
- `expectedBaseTokenBalanceAfterTransferFee`: The expected balance of the base token after the transfer fee(if any).
- `expectedQuoteTokenBalanceAfterTransferFee`: The expected balance of the quote token after the transfer fee(if any).
- `inputBaseTokenAmount`: The amount of base token to deposit.
- `inputQuoteTokenAmount`: The amount of quote token to deposit.
- `lockLiquidityProviderTokenUntil`: The unix timestamp in seconds until which the liquidity provider tokens will be locked.
- `openAt`: The unix timestamp in seconds at which the pool will be open for trading.
- `buyTax`: Buy tax BPS e.g. if buyTax is 100 then it is 100 / 10000 * 100 = 1%.
- `sellTax`: Sell tax BPS e.g. if sellTax is 100 then it is 100 / 10000 * 100 = 1%.
- `burnLpTokens`: If true, all the LP tokens will be burned at the same time as the pool creation, effectively locking the liquidity forever.

```typescript
import {
	Connection,
	Keypair,
	PublicKey,
	Transaction,
	sendAndConfirmTransaction,
} from '@solana/web3.js';
import { BN } from 'bn.js';
import {
	Heaven,
	HeavenSupportedNetwork,
	HeavenSupportedNetworkClusterApiUrl,
	HeavenSupportedTokenProgram,
	anchor,
} from 'heaven-sdk';

async function test() {
	const locked = false;
	const burnLpTokens = false;
	const connection = new Connection(
		HeavenSupportedNetworkClusterApiUrl[HeavenSupportedNetwork.localnet],
		'confirmed'
	);
	const baseTokenMint = new PublicKey(
		'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
	); // USDC;
	const baseTokenProgram = HeavenSupportedTokenProgram.TOKEN;
	const quoteTokenMint = new PublicKey(
		'So11111111111111111111111111111111111111112'
	); // WSOL;
	const quoteTokenProgram = HeavenSupportedTokenProgram.TOKEN;
	const network = HeavenSupportedNetwork.devnet;
	const owner = Keypair.generate();

	const pool = Heaven.initializeWithTokenPair({
		baseTokenMint,
		baseTokenProgram,
		quoteTokenMint,
		quoteTokenProgram,
		protocolConfigVersion: 1,
		network,
		owner: owner.publicKey,
	});

	const createLiquidityPoolIx = await pool
		.makeCreateLiquidityPoolInstruction({
			encodedUserDefinedEventData: '',
			expectedBaseTokenBalanceAfterTransferFee: new BN(1000_000 * 1e9),
			expectedQuoteTokenBalanceAfterTransferFee: new BN(1000 * 1e9),
			inputBaseTokenAmount: new BN(1000_000 * 1e9),
			inputQuoteTokenAmount: new BN(1000 * 1e9),
			lockLiquidityProviderTokenUntil: locked
				? new BN(Math.ceil(Date.now() / 1000 + 1 * 60))
				: new BN(0),
			openAt: new BN(0),
			sellTax: new BN(100),
			buyTax: new BN(25),
			burnLpTokens,
		})
		.instruction();

	const createLiquidityPoolTx = await sendAndConfirmTransaction(
		connection,
		new Transaction().add(
			...[
				anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({
					units: 300000,
				}),
				createLiquidityPoolIx,
			]
		),
		[owner],
		{
			commitment: 'confirmed',
		}
	);
}
```

### Swap exact in ([example](./examples/swap-exact-in.ts))
### Pre-requisites
- `heaven-wasm-sdk` or `heaven-wasm-sdk-nodejs` package.
```bash
# Browser
npm install heaven-wasm-sdk
# or
# Node.js
npm install heaven-wasm-sdk-nodejs
```
#### Parameters
- `amountIn`: The amount of the input token to swap.
- `minimumAmountOut`: The minimum amount of the output token to receive.
- `encodedUserDefinedEventData`: A base64 encoded string that can be used to store any data you want to emit when the swap is executed.
- `swapDirection`: The direction of the swap.

```typescript
/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Connection,
	Keypair,
	PublicKey,
	Transaction,
	sendAndConfirmTransaction,
} from '@solana/web3.js';
import { BN } from 'bn.js';
import {
	Heaven,
	HeavenSupportedNetwork,
	HeavenSupportedNetworkClusterApiUrl,
	anchor,
	parseProtocolSwapFeeDirection,
	parseTaxationMode,
	splToken,
} from 'heaven-sdk';
import { SwapDirection, estimate_exact_in_minimum_out } from 'heaven-wasm-sdk'; // "heaven-wasm-sdk-nodejs" for Node.js

async function test() {
	const connection = new Connection(
		HeavenSupportedNetworkClusterApiUrl[HeavenSupportedNetwork.localnet],
		'confirmed'
	);
	const network = HeavenSupportedNetwork.devnet;
	const liquidityPoolId = new PublicKey('...');
	const user = Keypair.generate();
	const inputTokenMint = new PublicKey(
		'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
	); // USDC;
	const outputTokenMint = new PublicKey(
		'So11111111111111111111111111111111111111112'
	); // WSOL;

	const pool = await Heaven.initializeWithExistingPoolId({
		liquidityPoolId,
		network,
		user: user.publicKey,
	});

	const poolState = await pool.program.account.liquidityPoolState.fetch(
		liquidityPoolId,
		'confirmed'
	);

	const baseTokenMint = await splToken.getMint(
		connection,
		poolState.baseTokenMint,
		'confirmed'
	);

	const baseTokenTransferFee = splToken.getTransferFeeConfig(baseTokenMint)
		?.newerTransferFee ?? {
		maximumFee: BigInt(0),
		transferFeeBasisPoints: 0,
	};

	const quoteTokenMint = await splToken.getMint(
		connection,
		poolState.quoteTokenMint,
		'confirmed'
	);

	const quoteTokenTransferFee = splToken.getTransferFeeConfig(quoteTokenMint)
		?.newerTransferFee ?? {
		maximumFee: BigInt(0),
		transferFeeBasisPoints: 0,
	};
	let swapDirection: SwapDirection;
	if (inputTokenMint.toBase58() === poolState.baseTokenMint.toBase58()) {
		swapDirection = SwapDirection.Base2Quote;
		// eslint-disable-next-line @typescript-eslint/brace-style
	} else {
		swapDirection = SwapDirection.Quote2Base;
	}

	const inputTokenDecimals =
		swapDirection === SwapDirection.Base2Quote
			? poolState.baseTokenMintDecimals
			: poolState.quoteTokenMintDecimals;
	const outputTokenDecimals =
		swapDirection === SwapDirection.Base2Quote
			? poolState.quoteTokenMintDecimals
			: poolState.baseTokenMintDecimals;

	const amountIn = new anchor.BN(1000 * Math.pow(10, inputTokenDecimals));
	const protocolSwapFeeDirection = parseProtocolSwapFeeDirection(
		poolState.baseTokenMint,
		poolState.quoteTokenMint,
		swapDirection
	);
	const taxationMode = parseTaxationMode(
		Object.keys(poolState.taxationMode)[0]
	);
	const slippageNumerator = BigInt(100); // 1% slippage (100/10000)

	const result = estimate_exact_in_minimum_out(
		amountIn.toString(),
		swapDirection,
		protocolSwapFeeDirection,
		taxationMode,
		poolState.baseTokenVaultBalance.toString(),
		poolState.quoteTokenVaultBalance.toString(),
		BigInt(poolState.swapFeeNumerator.toString()),
		BigInt(poolState.swapFeeDenominator.toString()),
		BigInt(poolState.protocolSwapFeeNumerator.toString()),
		BigInt(poolState.protocolSwapFeeDenominator.toString()),
		BigInt(poolState.buyTax.toString()),
		BigInt(poolState.sellTax.toString()),
		BigInt(baseTokenTransferFee.maximumFee),
		BigInt(baseTokenTransferFee.transferFeeBasisPoints),
		BigInt(quoteTokenTransferFee.maximumFee),
		BigInt(quoteTokenTransferFee.transferFeeBasisPoints),
		slippageNumerator
	);

	const swapExactInIx = await pool
		.makeSwapInInstruction({
			encodedUserDefinedEventData: '',
			amountIn: amountIn,
			minimumAmountOut: new BN(result.minimum_amount_out),
			swapDirection:
				swapDirection === SwapDirection.Base2Quote
					? {
							base2Quote: {},
					  }
					: {
							quote2Base: {},
					  },
		})
		.instruction();

	const swapExactInTx = await sendAndConfirmTransaction(
		connection,
		new Transaction().add(
			...[
				anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({
					units: 300000,
				}),
				swapExactInIx,
			]
		),
		[user],
		{
			commitment: 'confirmed',
		}
	);
}
```

### Swap exact in ([example](./examples/swap-exact-in.ts))
### Pre-requisites
- `heaven-wasm-sdk` or `heaven-wasm-sdk-nodejs` package.
```bash
# Browser
npm install heaven-wasm-sdk
# or
# Node.js
npm install heaven-wasm-sdk-nodejs
```
#### Parameters
- `amountIn`: The amount of the input token to swap.
- `minimumAmountOut`: The minimum amount of the output token to receive.
- `encodedUserDefinedEventData`: A base64 encoded string that can be used to store any data you want to emit when the swap is executed.
- `swapDirection`: The direction of the swap.

```typescript
/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Connection,
	Keypair,
	PublicKey,
	Transaction,
	sendAndConfirmTransaction,
} from '@solana/web3.js';
import { BN } from 'bn.js';
import {
	Heaven,
	HeavenSupportedNetwork,
	HeavenSupportedNetworkClusterApiUrl,
	anchor,
	parseProtocolSwapFeeDirection,
	parseTaxationMode,
	splToken,
} from 'heaven-sdk';
import { SwapDirection, estimate_exact_out_maximum_in } from 'heaven-wasm-sdk'; // "heaven-wasm-sdk-nodejs" for Node.js

async function test() {
	const connection = new Connection(
		HeavenSupportedNetworkClusterApiUrl[HeavenSupportedNetwork.localnet],
		'confirmed'
	);
	const network = HeavenSupportedNetwork.devnet;
	const liquidityPoolId = new PublicKey('...');
	const user = Keypair.generate();
	const inputTokenMint = new PublicKey(
		'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
	); // USDC;
	const outputTokenMint = new PublicKey(
		'So11111111111111111111111111111111111111112'
	); // WSOL;

	const pool = await Heaven.initializeWithExistingPoolId({
		liquidityPoolId,
		network,
		user: user.publicKey,
	});

	const poolState = await pool.program.account.liquidityPoolState.fetch(
		liquidityPoolId,
		'confirmed'
	);

	const baseTokenMint = await splToken.getMint(
		connection,
		poolState.baseTokenMint,
		'confirmed'
	);

	const baseTokenTransferFee = splToken.getTransferFeeConfig(baseTokenMint)
		?.newerTransferFee ?? {
		maximumFee: BigInt(0),
		transferFeeBasisPoints: 0,
	};

	const quoteTokenMint = await splToken.getMint(
		connection,
		poolState.quoteTokenMint,
		'confirmed'
	);

	const quoteTokenTransferFee = splToken.getTransferFeeConfig(quoteTokenMint)
		?.newerTransferFee ?? {
		maximumFee: BigInt(0),
		transferFeeBasisPoints: 0,
	};
	let swapDirection: SwapDirection;
	if (inputTokenMint.toBase58() === poolState.baseTokenMint.toBase58()) {
		swapDirection = SwapDirection.Base2Quote;
		// eslint-disable-next-line @typescript-eslint/brace-style
	} else {
		swapDirection = SwapDirection.Quote2Base;
	}

	const inputTokenDecimals =
		swapDirection === SwapDirection.Base2Quote
			? poolState.baseTokenMintDecimals
			: poolState.quoteTokenMintDecimals;
	const outputTokenDecimals =
		swapDirection === SwapDirection.Base2Quote
			? poolState.quoteTokenMintDecimals
			: poolState.baseTokenMintDecimals;

	const amountOut = new anchor.BN(1000 * Math.pow(10, inputTokenDecimals));
	const protocolSwapFeeDirection = parseProtocolSwapFeeDirection(
		poolState.baseTokenMint,
		poolState.quoteTokenMint,
		swapDirection
	);
	const taxationMode = parseTaxationMode(
		Object.keys(poolState.taxationMode)[0]
	);
	const slippageNumerator = BigInt(100); // 1% slippage (100/10000)

	const result = estimate_exact_out_maximum_in(
		amountOut.toString(),
		swapDirection,
		protocolSwapFeeDirection,
		taxationMode,
		poolState.baseTokenVaultBalance.toString(),
		poolState.quoteTokenVaultBalance.toString(),
		BigInt(poolState.swapFeeNumerator.toString()),
		BigInt(poolState.swapFeeDenominator.toString()),
		BigInt(poolState.protocolSwapFeeNumerator.toString()),
		BigInt(poolState.protocolSwapFeeDenominator.toString()),
		BigInt(poolState.buyTax.toString()),
		BigInt(poolState.sellTax.toString()),
		BigInt(baseTokenTransferFee.maximumFee),
		BigInt(baseTokenTransferFee.transferFeeBasisPoints),
		BigInt(quoteTokenTransferFee.maximumFee),
		BigInt(quoteTokenTransferFee.transferFeeBasisPoints),
		slippageNumerator
	);

	const swapExactOutIx = await pool
		.makeSwapOutInstruction({
			encodedUserDefinedEventData: '',
			amountOut: amountOut,
			maxAmountIn: new BN(result.maximum_amount_in),
			swapDirection:
				swapDirection === SwapDirection.Base2Quote
					? {
							base2Quote: {},
					  }
					: {
							quote2Base: {},
					  },
		})
		.instruction();

	const swapExactOutTx = await sendAndConfirmTransaction(
		connection,
		new Transaction().add(
			...[
				anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({
					units: 300000,
				}),
				swapExactOutIx,
			]
		),
		[user],
		{
			commitment: 'confirmed',
		}
	);
}
```

### Add liquidity ([example](./examples/add-liquidity.ts))
### Pre-requisites
- `heaven-wasm-sdk` or `heaven-wasm-sdk-nodejs` package.
```bash
# Browser
npm install heaven-wasm-sdk
# or
# Node.js
npm install heaven-wasm-sdk-nodejs
```
#### Parameters
- `baseSide`: Which side of the pool to add liquidity to.
- `maxBaseTokenAmount`: The maximum amount of base token to deposit.
- `maxQuoteTokenAmount`: The maximum amount of quote token to deposit.
- `encodedUserDefinedEventData`: A base64 encoded string that can be used to store any data you want to emit when the swap is executed.

```typescript
/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Connection,
	Keypair,
	PublicKey,
	Transaction,
	sendAndConfirmTransaction,
} from '@solana/web3.js';
import { BN } from 'bn.js';
import {
	Heaven,
	HeavenSupportedNetwork,
	HeavenSupportedNetworkClusterApiUrl,
	splToken,
} from 'heaven-sdk';
import {
	estimate_add_liquidity_maximum_base_and_quote_token,
	AddLiquiditySide,
} from 'heaven-wasm-sdk'; // "heaven-wasm-sdk-nodejs" for Node.js

async function test() {
	const connection = new Connection(
		HeavenSupportedNetworkClusterApiUrl[HeavenSupportedNetwork.localnet],
		'confirmed'
	);
	const network = HeavenSupportedNetwork.devnet;
	const liquidityPoolId = new PublicKey('...');
	const user = Keypair.generate();

	const pool = await Heaven.initializeWithExistingPoolId({
		liquidityPoolId,
		network,
		user: user.publicKey,
	});

	const poolState = await pool.program.account.liquidityPoolState.fetch(
		liquidityPoolId,
		'confirmed'
	);

	const baseTokenMint = await splToken.getMint(
		connection,
		poolState.baseTokenMint,
		'confirmed'
	);

	const baseTokenTransferFee = splToken.getTransferFeeConfig(baseTokenMint)
		?.newerTransferFee ?? {
		maximumFee: BigInt(0),
		transferFeeBasisPoints: 0,
	};

	const quoteTokenMint = await splToken.getMint(
		connection,
		poolState.quoteTokenMint,
		'confirmed'
	);

	const quoteTokenTransferFee = splToken.getTransferFeeConfig(quoteTokenMint)
		?.newerTransferFee ?? {
		maximumFee: BigInt(0),
		transferFeeBasisPoints: 0,
	};

	const slippageNumerator = BigInt(100); // 1% slippage (100/10000)
	const total_quote_amount = poolState.quoteTokenVaultBalance.toString();
	const total_base_amount = poolState.baseTokenVaultBalance.toString();
	const base_side = AddLiquiditySide.Base;
	const max_base_token_amount = new BN(
		5000 * 10 ** poolState.baseTokenMintDecimals
	).toString();
	const max_quote_token_amount = new BN(0).toString();

	const result = estimate_add_liquidity_maximum_base_and_quote_token(
		total_quote_amount,
		total_base_amount,
		base_side,
		max_base_token_amount,
		max_quote_token_amount,
		baseTokenTransferFee.maximumFee,
		BigInt(baseTokenTransferFee.transferFeeBasisPoints),
		slippageNumerator,
		quoteTokenTransferFee.maximumFee,
		BigInt(quoteTokenTransferFee.transferFeeBasisPoints),
		slippageNumerator,
		poolState.lpTokenCurrentSupply.toString()
	);

	const addLiquidityIx = await pool
		.makeAddLiquidityInstruction({
			encodedUserDefinedEventData: '',
			baseSide:
				base_side === AddLiquiditySide.Base
					? {
							base: {},
					  }
					: {
							quote: {},
					  },
			maxBaseTokenAmount: new BN(result.max_base_token_amount),
			maxQuoteTokenAmount: new BN(result.max_quote_token_amount),
		})
		.instruction();

	const addLiquidityTx = await sendAndConfirmTransaction(
		connection,
		new Transaction().add(addLiquidityIx),
		[user],
		{
			commitment: 'confirmed',
		}
	);
}
```

### Remove liquidity ([example](./examples/remove-liquidity.ts))
### Pre-requisites
- `heaven-wasm-sdk` or `heaven-wasm-sdk-nodejs` package.
```bash
# Browser
npm install heaven-wasm-sdk
# or
# Node.js
npm install heaven-wasm-sdk-nodejs
```
#### Parameters
- `minimumBaseTokenAmount`: The minimum amount of base token to receive.
- `minimumQuoteTokenAmount`: The minimum amount of quote token to receive.
- `amount`: The amount of LP tokens remove.
- `encodedUserDefinedEventData`: A base64 encoded string that can be used to store any data you want to emit when the swap is executed.

```typescript
/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Connection,
	Keypair,
	PublicKey,
	Transaction,
	sendAndConfirmTransaction,
} from '@solana/web3.js';
import { BN } from 'bn.js';
import {
	Heaven,
	HeavenSupportedNetwork,
	HeavenSupportedNetworkClusterApiUrl,
	splToken,
} from 'heaven-sdk';
import { estimate_remove_liquidity_minimum_base_and_quote_token } from 'heaven-wasm-sdk'; // "heaven-wasm-sdk-nodejs" for Node.js

async function test() {
	const connection = new Connection(
		HeavenSupportedNetworkClusterApiUrl[HeavenSupportedNetwork.localnet],
		'confirmed'
	);
	const network = HeavenSupportedNetwork.devnet;
	const liquidityPoolId = new PublicKey('...');
	const user = Keypair.generate();

	const pool = await Heaven.initializeWithExistingPoolId({
		liquidityPoolId,
		network,
		user: user.publicKey,
	});

	const poolState = await pool.program.account.liquidityPoolState.fetch(
		liquidityPoolId,
		'confirmed'
	);

	const baseTokenMint = await splToken.getMint(
		connection,
		poolState.baseTokenMint,
		'confirmed'
	);

	const baseTokenTransferFee = splToken.getTransferFeeConfig(baseTokenMint)
		?.newerTransferFee ?? {
		maximumFee: BigInt(0),
		transferFeeBasisPoints: 0,
	};

	const quoteTokenMint = await splToken.getMint(
		connection,
		poolState.quoteTokenMint,
		'confirmed'
	);

	const quoteTokenTransferFee = splToken.getTransferFeeConfig(quoteTokenMint)
		?.newerTransferFee ?? {
		maximumFee: BigInt(0),
		transferFeeBasisPoints: 0,
	};

	const slippageNumerator = BigInt(100); // 1% slippage (100/10000)
	const total_quote_amount = poolState.quoteTokenVaultBalance.toString();
	const total_base_amount = poolState.baseTokenVaultBalance.toString();
	// the amount of LP tokens to remove
	const amount = new BN(1000 * 10 ** poolState.lpTokenMintDecimals);

	const result = estimate_remove_liquidity_minimum_base_and_quote_token(
		amount.toString(),
		total_base_amount,
		total_quote_amount,
		poolState.lpTokenCurrentSupply.toString(),
		baseTokenTransferFee.maximumFee,
		BigInt(baseTokenTransferFee.transferFeeBasisPoints),
		slippageNumerator,
		quoteTokenTransferFee.maximumFee,
		BigInt(quoteTokenTransferFee.transferFeeBasisPoints),
		slippageNumerator
	);

	const removeLiquidityIx = await pool
		.makeRemoveLiquidityInstruction({
			encodedUserDefinedEventData: '',
			amount,
			minimumBaseTokenAmount: new BN(result.base_token_minimum_amount),
			minimumQuoteTokenAmount: new BN(result.quote_token_minimum_amount),
		})
		.instruction();

	const removeLiquidityTx = await sendAndConfirmTransaction(
		connection,
		new Transaction().add(removeLiquidityIx),
		[user],
		{
			commitment: 'confirmed',
		}
	);
}
```

### Claim Swap Tax ([example](./examples/claim-tax.ts))
### Pre-requisites
- `heaven-wasm-sdk` or `heaven-wasm-sdk-nodejs` package.
```bash
# Browser
npm install heaven-wasm-sdk
# or
# Node.js
npm install heaven-wasm-sdk-nodejs
```
#### Parameters
- `baseAmount`: The amount of base token to claim.
- `quoteAmount`: The amount of quote token to receive.
- `encodedUserDefinedEventData`: A base64 encoded string that can be used to store any data you want to emit when the swap is executed.

```typescript
/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Connection,
	Keypair,
	PublicKey,
	Transaction,
	sendAndConfirmTransaction,
} from '@solana/web3.js';
import { BN } from 'bn.js';
import {
	Heaven,
	HeavenSupportedNetwork,
	HeavenSupportedNetworkClusterApiUrl,
} from 'heaven-sdk';

async function test() {
	const connection = new Connection(
		HeavenSupportedNetworkClusterApiUrl[HeavenSupportedNetwork.localnet],
		'confirmed'
	);
	const network = HeavenSupportedNetwork.devnet;
	const liquidityPoolId = new PublicKey('...');
	const user = Keypair.generate();

	const pool = await Heaven.initializeWithExistingPoolId({
		liquidityPoolId,
		network,
		user: user.publicKey,
	});

	const poolState = await pool.program.account.liquidityPoolState.fetch(
		liquidityPoolId,
		'confirmed'
	);

	const baseTokenTaxCollected = await connection.getTokenAccountBalance(
		poolState.baseTokenSwapTaxVault
	);
	const quoteTokenTaxCollected = await connection.getTokenAccountBalance(
		poolState.quoteTokenSwapTaxVault
	);

	const claimSwapTaxIx = await pool
		.makeClaimSwapTaxInstruction({
			encodedUserDefinedEventData: '',
			baseAmount: new BN(baseTokenTaxCollected.value.amount),
			quoteAmount: new BN(quoteTokenTaxCollected.value.amount),
		})
		.instruction();

	const claimSwapTaxTx = await sendAndConfirmTransaction(
		connection,
		new Transaction().add(claimSwapTaxIx),
		[user],
		{
			commitment: 'confirmed',
		}
	);
}
```

### Claim Lp Tokens ([example](./examples/claim-locked-lp-tokens.ts))
### Pre-requisites
- `heaven-wasm-sdk` or `heaven-wasm-sdk-nodejs` package.
```bash
# Browser
npm install heaven-wasm-sdk
# or
# Node.js
npm install heaven-wasm-sdk-nodejs
```
#### Parameters
- `amount`: The amount of lp token to claim.

```typescript
/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Connection,
	Keypair,
	PublicKey,
	Transaction,
	sendAndConfirmTransaction,
} from '@solana/web3.js';
import { BN } from 'bn.js';
import {
	Heaven,
	HeavenSupportedNetwork,
	HeavenSupportedNetworkClusterApiUrl,
} from 'heaven-sdk';

async function test() {
	const connection = new Connection(
		HeavenSupportedNetworkClusterApiUrl[HeavenSupportedNetwork.localnet],
		'confirmed'
	);
	const network = HeavenSupportedNetwork.devnet;
	const liquidityPoolId = new PublicKey('...');
	const user = Keypair.generate();

	const pool = await Heaven.initializeWithExistingPoolId({
		liquidityPoolId,
		network,
		user: user.publicKey,
	});

	const lockedLpTokenAmount = await connection.getTokenAccountBalance(
		pool.accounts.lpTokenLockVault
	);

	const claimLpTokenIx = await pool
		.makeClaimLpTokensInstruction({
			amount: new BN(lockedLpTokenAmount.value.amount),
		})
		.instruction();

	const claimLpTokenTx = await sendAndConfirmTransaction(
		connection,
		new Transaction().add(claimLpTokenIx),
		[user],
		{
			commitment: 'confirmed',
		}
	);
}
```

### Update Liquidity Pool ([example](./examples/update-liquidity-pool.ts))
### Pre-requisites
- `heaven-wasm-sdk` or `heaven-wasm-sdk-nodejs` package.
```bash
# Browser
npm install heaven-wasm-sdk
# or
# Node.js
npm install heaven-wasm-sdk-nodejs
```
#### Parameters
- `allowAddLiquidity`: Allow adding liquidity.
- `allowRemoveLiquidity`: Allow removing liquidity.
- `allowSwap`: Allow swapping.
- `buyTax`: Buy tax BPS e.g. if buyTax is 100 then it is 100 / 10000 * 100 = 1%.
- `encodedUserDefinedEventData`: A base64 encoded string that can be used to store any data you want to emit when the pool is created.,
- `lockUntil`: The unix timestamp in seconds until which the liquidity provider tokens will be locked.
- `openAt`: The unix timestamp in seconds at which the pool will be open for trading.
- `sellTax`: Sell tax BPS e.g. if sellTax is 100 then it is 100 / 10000 * 100 = 1%.

```typescript
/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Connection,
	Keypair,
	PublicKey,
	Transaction,
	sendAndConfirmTransaction,
} from '@solana/web3.js';
import { BN } from 'bn.js';
import {
	Heaven,
	HeavenSupportedNetwork,
	HeavenSupportedNetworkClusterApiUrl,
} from 'heaven-sdk';

async function test() {
	const connection = new Connection(
		HeavenSupportedNetworkClusterApiUrl[HeavenSupportedNetwork.localnet],
		'confirmed'
	);
	const network = HeavenSupportedNetwork.devnet;
	const liquidityPoolId = new PublicKey('...');
	const user = Keypair.generate();

	const pool = await Heaven.initializeWithExistingPoolId({
		liquidityPoolId,
		network,
		user: user.publicKey,
	});

	const poolState = await pool.program.account.liquidityPoolState.fetch(
		liquidityPoolId,
		'confirmed'
	);

	const allowAddLiquidity = true;
	const allowRemoveLiquidity = true;
	const allowSwap = true;

	const buyTax = 0;
	if (buyTax > 10000 || buyTax < 0) {
		throw new Error('Buy tax value between 0 and 10000');
	}

	const sellTax = 0;
	if (sellTax > 10000 || sellTax < 0) {
		throw new Error('Sell tax value between 0 and 10000');
	}

	const newLockUntil = Date.now() / 1000; // convert from milliseconds to seconds
	if (newLockUntil < poolState.lockUntil.toNumber()) {
		throw new Error(
			'Cannot update lockUntil to a value less than the current lockUntil'
		);
	}

	const slot = await connection.getSlot();
	const timestamp = await connection.getBlockTime(slot);
	const isAlreadyOpen = timestamp > poolState.openAt.toNumber();

	const newOpenAt = Date.now() / 1000; // convert from milliseconds to seconds
	if (isAlreadyOpen && newOpenAt !== poolState.openAt.toNumber()) {
		throw new Error(
			`If the pool has already opened, then openAt cannot be updated. Current block timestamp: ${timestamp}, openAt: ${poolState.openAt.toNumber()}`
		);
	}

	const updateLiquidityPoolIx = await pool
		.makeUpdateLiquidityPoolInstruction({
			allowAddLiquidity,
			allowRemoveLiquidity,
			allowSwap,
			buyTax: new BN(buyTax),
			encodedUserDefinedEventData: '',
			lockUntil: new BN(newLockUntil),
			openAt: new BN(newOpenAt),
			sellTax: new BN(sellTax),
		})
		.instruction();

	const updateLiquidityPoolTx = await sendAndConfirmTransaction(
		connection,
		new Transaction().add(updateLiquidityPoolIx),
		[user],
		{
			commitment: 'confirmed',
		}
	);
}
```
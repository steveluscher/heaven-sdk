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
} from 'src';
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
		new Transaction().add(swapExactOutIx),
		[user],
		{
			commitment: 'confirmed',
		}
	);
}

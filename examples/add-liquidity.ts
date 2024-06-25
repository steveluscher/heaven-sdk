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
} from 'src';
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

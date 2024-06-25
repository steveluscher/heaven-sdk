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

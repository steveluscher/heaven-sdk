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
} from 'src';

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

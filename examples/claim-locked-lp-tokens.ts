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

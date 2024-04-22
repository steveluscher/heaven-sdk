'use strict';

import { PublicKey, Connection, Keypair } from '@solana/web3.js';
import { AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
const privateKey = bs58.encode(
	// TODO: DONT COMMIT THIS
	Uint8Array.from([
		47, 100, 53, 161, 27, 88, 197, 222, 5, 149, 205, 9, 94, 15, 164, 77, 14,
		104, 28, 193, 43, 60, 122, 207, 145, 215, 191, 111, 83, 52, 145, 184,
		38, 71, 26, 209, 121, 71, 194, 152, 253, 156, 41, 159, 10, 0, 120, 91,
		44, 125, 50, 249, 162, 41, 99, 10, 190, 48, 0, 22, 86, 112, 228, 0,
	])
);
const keypair = Keypair.fromSecretKey(bs58.decode(privateKey));

export const PRIORITY_RATE = 100_000; // MICRO_LAMPORTS
export const SOL = new PublicKey('So11111111111111111111111111111111111111112');
export const SOL_DECIMALS = 9;
export const USD_TO_SOL = 0.0066;
export const PAYER = keypair;
//const keypair = Keypair.generate();
export const OPTS = {
	txConfirmationCommitment: 'confirmed',
	preflightCommitment: 'confirmed',
	maxRetries: 15,
	maxSupportedTransactionVersion: 0,
	skipPreflight: true,
	postSendTxCallback: (tx: any) => {
		console.log('**debug**', 'postSendTxCallback: ' + tx.txid);
	},
	prioritizationFee: PRIORITY_RATE,
};
const LOCALNET = 'http://localhost:8899';
const WALLET = new Wallet(keypair);
const connection = new AnchorProvider(
	new Connection(LOCALNET, 'confirmed'),
	WALLET,
	{
		commitment: 'confirmed',
		maxRetries: 15,
		preflightCommitment: 'confirmed',
		skipPreflight: true,
	}
);
export const PROVIDER = {
	connection,
	connectionReadOnly: connection,
};

export type ProviderType = typeof PROVIDER;

export const PROGRAMS = {
	LOCALNET: {
		OPENBOOK: new PublicKey('4Dmzf8YgoBmoTKkEYkVzdKUgXZuWosP9UuWqLbiJQeuw'),
		AMMV4: new PublicKey('5UcVozcPMkEXibeRkKqyfZS9dkoCrKB3T2Qo6VY91nPf'),
	},
};

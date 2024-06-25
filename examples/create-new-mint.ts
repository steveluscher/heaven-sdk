import {
	Connection,
	Keypair,
	sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
	Heaven,
	HeavenSupportedNetwork,
	HeavenSupportedNetworkClusterApiUrl,
} from 'src';
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

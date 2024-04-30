import {
	Connection,
	Keypair,
	sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
	Heaven,
	HeavenSupportedNetwork,
	HeavenSupportedNetworkClusterApiUrl,
} from '../src';
import { readFileSync } from 'fs';
import { Signer } from '@metaplex-foundation/umi';
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';

const wallet = readFileSync('./wallet.json', 'utf-8');
const walletJson = JSON.parse(wallet);

const payer = Keypair.fromSecretKey(new Uint8Array(walletJson));

const file = readFileSync('./coin.png');

(async (): Promise<void> => {
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

	console.debug('createMintTx:', createMintTx, mint.publicKey.toBase58());

	const coinUploadResult = await Heaven.uploadMintImage({
		key: payer,
		coinImageData: file,
		coinImageType: 'image/png',
	});

	console.debug('coinUploadResult:', coinUploadResult);

	const coinMetadataUploadResult = await Heaven.uploadMintMetadata({
		description: 'A coin',
		name: 'Coin',
		image: coinUploadResult.contentIdUrl,
		key: payer,
		symbol: 'COIN',
	});

	console.debug('coinMetadataUploadResult:', coinMetadataUploadResult);

	const signer: Signer = {
		publicKey: payer.publicKey as any,
		signAllTransactions: async (transactions) => {
			return transactions.map((transaction) => {
				return transaction;
			});
		},
		signTransaction: async (transaction) => {
			return transaction;
		},
		signMessage: async (message) => {
			return message;
		},
	};

	const createMintMetadataIx = await Heaven.makeCreateMintMetadataInstruction(
		{
			decimals: 9,
			description: coinMetadataUploadResult.metadata.description,
			uri: coinMetadataUploadResult.contentIdUrl,
			mint: mint.publicKey,
			name: coinMetadataUploadResult.metadata.name,
			network: HeavenSupportedNetwork.devnet,
			signer: signer,
			symbol: coinMetadataUploadResult.metadata.symbol,
			tokenProgram: TOKEN_2022_PROGRAM_ID,
		}
	);

	const createMintMetadataTx = await sendAndConfirmTransaction(
		connection,
		createMintMetadataIx,
		[payer],
		{
			commitment: 'confirmed',
			preflightCommitment: 'confirmed',
		}
	);

	console.debug('createMintMetadataTx:', createMintMetadataTx);
})();

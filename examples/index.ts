// import {
// 	Connection,
// 	Keypair,
// 	sendAndConfirmTransaction,
// } from '@solana/web3.js';
// import {
// 	Heaven,
// 	HeavenSupportedNetwork,
// 	HeavenSupportedNetworkClusterApiUrl,
// 	NodeWalletAdapter,
// } from '../src';
// import { readFileSync } from 'fs';
// import { Signer } from '@metaplex-foundation/umi';
// import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
// import {
// 	ProtocolSwapFeeDirection,
// 	SwapDirection,
// 	TaxationMode,
// } from 'heaven-wasm-sdk-nodejs';
// import * as wasm from 'heaven-wasm-sdk-nodejs';

// const wallet = readFileSync('./wallet.json', 'utf-8');
// const walletJson = JSON.parse(wallet);

// const payer = Keypair.fromSecretKey(new Uint8Array(walletJson));

// const file = readFileSync('./coin.png');

// let result = wasm.swap_in(
// 	'1000,000,000,000,000'.replace(/,/g, ''),
// 	SwapDirection.Base2Quote,
// 	ProtocolSwapFeeDirection.Base,
// 	TaxationMode.Base,
// 	'1000,000,000,000,000,000'.replace(/,/g, ''),
// 	'1000,000,000,000'.replace(/,/g, ''),
// 	BigInt(25),
// 	BigInt(10000),
// 	BigInt(25),
// 	BigInt(10000),
// 	BigInt(25),
// 	BigInt(10000)
// );

// console.log(result.protocol_swap_fee_on_input_amount);
// console.log(result.protocol_swap_fee_on_output_amount);
// console.log(result.swap_fee);
// console.log(result.swap_tax_on_input_amount);
// console.log(result.swap_tax_on_output_amount);
// console.log(result.swap_amount_in_before_fees);
// console.log(result.swap_amount_in_after_fees);
// console.log(result.swap_amount_out_after_fees);
// console.log(result.swap_amount_out_before_fees);

// result = wasm.swap_out(
// 	'1000,000,000'.replace(/,/g, ''),
// 	SwapDirection.Base2Quote,
// 	ProtocolSwapFeeDirection.Quote,
// 	TaxationMode.Quote,
// 	'1000,000,000,000,000,000'.replace(/,/g, ''),
// 	'1000,000,000,000'.replace(/,/g, ''),
// 	BigInt(25),
// 	BigInt(10000),
// 	BigInt(25),
// 	BigInt(10000),
// 	BigInt(25),
// 	BigInt(10000)
// );

// console.log(result.protocol_swap_fee_on_input_amount);
// console.log(result.protocol_swap_fee_on_output_amount);
// console.log(result.swap_fee);
// console.log(result.swap_tax_on_input_amount);
// console.log(result.swap_tax_on_output_amount);
// console.log(result.swap_amount_in_before_fees);
// console.log(result.swap_amount_in_after_fees);
// console.log(result.swap_amount_out_after_fees);
// console.log(result.swap_amount_out_before_fees);

// async function test() {
// 	const connection = new Connection(
// 		HeavenSupportedNetworkClusterApiUrl[HeavenSupportedNetwork.localnet],
// 		'confirmed'
// 	);
// 	const mint = Keypair.generate();
// 	const createMintIx =
// 		await Heaven.makeCreateToken2022WithTransferFeeInstruction({
// 			connection,
// 			decimals: 9,
// 			feeBasisPoints: 100,
// 			maxFee: BigInt(100),
// 			mintAuthority: payer.publicKey,
// 			payer: payer.publicKey,
// 			transferFeeConfigAuthority: payer.publicKey,
// 			withdrawWithheldAuthority: payer.publicKey,
// 			freezeAuthority: payer.publicKey,
// 			userDefinedMint: mint.publicKey,
// 		});

// 	const createMintTx = await sendAndConfirmTransaction(
// 		connection,
// 		createMintIx,
// 		[payer, mint],
// 		{
// 			commitment: 'confirmed',
// 			preflightCommitment: 'confirmed',
// 		}
// 	);

// 	console.debug('createMintTx:', createMintTx, mint.publicKey.toBase58());

// 	const wallet = new NodeWalletAdapter(payer);

// 	const coinUploadResult = await Heaven.uploadMintImage({
// 		key: wallet,
// 		coinImageData: file,
// 		coinImageType: 'image/png',
// 		network: HeavenSupportedNetwork.devnet,
// 	});

// 	console.debug('coinUploadResult:', coinUploadResult);

// 	const coinMetadataUploadResult = await Heaven.uploadMintMetadata({
// 		description: 'A coin',
// 		name: 'Coin',
// 		image: coinUploadResult.contentIdUrl,
// 		key: wallet,
// 		symbol: 'COIN',
// 		network: HeavenSupportedNetwork.devnet,
// 	});

// 	console.debug('coinMetadataUploadResult:', coinMetadataUploadResult);

// 	const signer: Signer = {
// 		publicKey: payer.publicKey as any,
// 		signAllTransactions: async (transactions) => {
// 			return transactions.map((transaction) => {
// 				return transaction;
// 			});
// 		},
// 		signTransaction: async (transaction) => {
// 			return transaction;
// 		},
// 		signMessage: async (message) => {
// 			return message;
// 		},
// 	};

// 	const createMintMetadataIx = await Heaven.makeCreateMintMetadataInstruction(
// 		{
// 			decimals: 9,
// 			description: coinMetadataUploadResult.metadata.description,
// 			uri: coinMetadataUploadResult.contentIdUrl,
// 			mint: mint.publicKey,
// 			name: coinMetadataUploadResult.metadata.name,
// 			network: HeavenSupportedNetwork.devnet,
// 			signer: wallet,
// 			symbol: coinMetadataUploadResult.metadata.symbol,
// 			tokenProgram: TOKEN_2022_PROGRAM_ID,
// 		}
// 	);

// 	const createMintMetadataTx = await sendAndConfirmTransaction(
// 		connection,
// 		createMintMetadataIx,
// 		[payer],
// 		{
// 			commitment: 'confirmed',
// 			preflightCommitment: 'confirmed',
// 		}
// 	);

// 	console.debug('createMintMetadataTx:', createMintMetadataTx);
// }

// test()
// 	.then(() => {})
// 	.catch((error) => {
// 		console.log(error);
// 	});

// import { expect, jest, test } from '@jest/globals'
import {
	NATIVE_MINT,
	createSyncNativeInstruction,
	getOrCreateAssociatedTokenAccount,
	syncNative,
	transferChecked,
} from '@solana/spl-token';
import {
	ComputeBudgetProgram,
	Keypair,
	LAMPORTS_PER_SOL,
	SystemProgram,
	Transaction,
	sendAndConfirmTransaction,
} from '@solana/web3.js';
import assert from 'node:assert';
import test from 'node:test';
import {
	MarketV2,
	RENT_PROGRAM_ID,
	SYSTEM_PROGRAM_ID,
	TxVersion,
	WSOL,
} from '@raydium-io/raydium-sdk';
import { OPTS, PAYER, PROVIDER } from './config';
import { SolanaToken } from './token';
import {
	RecentBlockhash,
	log,
	sendTransaction,
	signTransaction,
} from './utils';
import { BaseHeavenSupportedNetwork, HeavenPoolBaseClient } from '../../src';
import { BN } from 'bn.js';

test('Full setup', async () => {
	assert.strictEqual(
		HeavenPoolBaseClient.network,
		BaseHeavenSupportedNetwork.mainnet
	);

	HeavenPoolBaseClient.network = BaseHeavenSupportedNetwork.localnet;

	assert.strictEqual(
		HeavenPoolBaseClient.network,
		BaseHeavenSupportedNetwork.localnet
	);

	const recentBlockhash =
		await PROVIDER.connectionReadOnly.connection.getLatestBlockhashAndContext();

	const token = await createToken(recentBlockhash);

	assert.ok(token);

	const market = await createMarket(recentBlockhash, token);

	assert.ok(market);

	let ata = await getOrCreateAssociatedTokenAccount(
		PROVIDER.connection.connection, // connection
		PAYER, // fee payer
		NATIVE_MINT, // mint
		PAYER.publicKey // owner,
	);
	console.log(`ATA: ${ata}`);

	const transferTransaction = new Transaction().add(
		SystemProgram.transfer({
			fromPubkey: PAYER.publicKey,
			toPubkey: ata.address,
			lamports: 100 * LAMPORTS_PER_SOL,
		}),
		createSyncNativeInstruction(ata.address)
	);

	await sendAndConfirmTransaction(
		PROVIDER.connection.connection,
		transferTransaction,
		[PAYER]
	);

	const pool = await createPool(recentBlockhash, token, market);

	await pool.wait(1000);

	assert.ok(pool);

	await pool.fetchMarketMetadata();

	await pool.wait(1000);

	await pool.swapIn(
		{
			source: ata.address,
			destination: pool.userBaseTokenVault[0],
			amountIn: new BN(0.1),
			minimumAmountOut: new BN(1),
			liquidity_pool_bump: pool.ammId[1],
		},
		async (ix) => {
			const signed = await signTransaction(PROVIDER, PAYER, [ix], [], {
				latestBlockhash: recentBlockhash,
			});
			return signed.versionedTransaction;
		}
	);

	// await pool.wait();

	// const liquidity = await pool.liquidityPoolAccount;

	// assert.ok(liquidity);

	// await pool.fetchMarketMetadata();

	// await swapIn(pool, recentBlockhash);

	// const taxAccount = await pool.taxAccount;

	// console.log(taxAccount);
	// assert.ok(taxAccount);

	// await swapOut(pool, recentBlockhash);

	// await claimTax(pool, recentBlockhash);
});

async function createAdmin(recentBlockhash: RecentBlockhash) {
	const createConfigIx = HeavenPoolBaseClient.makeCreateConfigInstruction({
		protocolAdmin: PAYER.publicKey,
		protocolConfig: HeavenPoolBaseClient.getAssociatedConfigId()[0],
		protocolProfitAndLossOwner: PAYER.publicKey,
		rentProgram: RENT_PROGRAM_ID,
		systemProgram: SYSTEM_PROGRAM_ID,
	});

	const signed = await signTransaction(
		PROVIDER,
		PAYER,
		[createConfigIx],
		[],
		{
			latestBlockhash: recentBlockhash,
		}
	);

	await sendTransaction(PROVIDER, signed.versionedTransaction, OPTS);
}

async function createToken(recentBlockhash: RecentBlockhash) {
	const supply = 1_000_000_000;
	const liquidity = 1;
	const tokenName = 'Abcd Token';
	const tokenSymbol = 'ABCD';
	const tokenURL = 'https://test.com';
	const tokenDescription = 'Testing a token';
	const tokenLogo = 'https://test.com';
	const twitterURL = 'https://twitter.com/test';
	const telegramURL = 'https://t.me/test';
	const creatorName = 'Test Creator';
	const creatorURL = 'https://test.com';

	// Initialize
	const token = new SolanaToken(
		PROVIDER.connection.connection,
		PAYER,
		supply,
		liquidity,
		tokenName,
		tokenSymbol,
		tokenLogo,
		tokenDescription,
		tokenURL,
		twitterURL,
		telegramURL,
		creatorName,
		creatorURL,
		Keypair.generate()
	);

	await token.initMetadata();
	const tokenIx = await token.getCreateInstructions();
	const tokenSigned = await signTransaction(PROVIDER, PAYER, tokenIx, [], {
		additionalSigners: [token.baseMint],
		latestBlockhash: recentBlockhash,
	});
	await sendTransaction(PROVIDER, tokenSigned.versionedTransaction, OPTS);

	return token;
}

async function createMarket(
	recentBlockhash: RecentBlockhash,
	token: SolanaToken
) {
	const createMarketIx = await MarketV2.makeCreateMarketInstructionSimple({
		connection: PROVIDER.connection.connection,
		dexProgramId: HeavenPoolBaseClient.programs.openbook,
		baseInfo: {
			mint: token.baseToken,
			decimals: token.baseDecimals,
		},
		quoteInfo: {
			mint: token.quoteToken,
			decimals: token.quoteDecimals,
		},
		lotSize: 1,
		tickSize: 0.01,
		wallet: PAYER.publicKey,
		makeTxVersion: TxVersion.V0,
		lookupTableCache: {},
	});

	for (const tx of createMarketIx.innerTransactions) {
		const signed = await signTransaction(
			PROVIDER,
			PAYER,
			tx.instructions,
			[],
			{
				latestBlockhash: recentBlockhash,
			}
		);
		await sendTransaction(PROVIDER, signed.versionedTransaction, OPTS);
	}

	return createMarketIx.address;
}

async function createPool(
	recentBlockhash: RecentBlockhash,
	token: SolanaToken,
	market: any
) {
	const baseAmount = new BN(token.baseSupply * 10 ** token.baseDecimals);
	const quoteAmount = new BN(token.quoteSupply * 10 ** token.quoteDecimals);

	const newPool = HeavenPoolBaseClient.new({
		baseMint: token.baseToken,
		connection: PROVIDER.connection.connection,
		marketId: market.marketId,
		quoteMint: token.quoteToken,
		userWallet: PAYER.publicKey,
	});

	const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
		units: 300000,
	});
	const pool = await newPool.create(
		{
			buyTax: new BN(25),
			sellTax: new BN(25),
			coinAmount: baseAmount,
			pcAmount: quoteAmount,
			lockUntil: new BN(0),
			openTime: new BN(0),
			nonce: 0,
			taxationMode: 0,
		},
		async (ix) => {
			const signed = await signTransaction(
				PROVIDER,
				PAYER,
				[modifyComputeUnits, ix],
				[],
				{
					latestBlockhash: recentBlockhash,
				}
			);
			return signed.versionedTransaction;
		}
	);

	return pool;
}

// async function swapIn(
// 	pool: HeavenPoolBaseClient,
// 	recentBlockhash: RecentBlockhash
// ) {
// 	const ata = await getOrCreateAssociatedTokenAccount(
// 		PROVIDER.connection.connection, // connection
// 		PAYER, // fee payer
// 		pool.ammBaseMint!, // mint
// 		PAYER.publicKey // owner,
// 	);

// 	assert.strictEqual(
// 		ata.address.toBase58(),
// 		pool.userBaseTokenVault!.toBase58()
// 	);

// 	const ix = pool.makeSwapInInstruction({
// 		amountIn: new BN(0.01 * LAMPORTS_PER_SOL),
// 		minimumAmountOut: new BN(1),
// 		destination: pool.userBaseTokenVault!,
// 		source: pool.userQuoteTokenVault!,
// 	});

// 	const signed = await signTransaction(PROVIDER, PAYER, [ix], [], {
// 		latestBlockhash: recentBlockhash,
// 	});

// 	await sendTransaction(PROVIDER, signed.versionedTransaction, OPTS);
// }

// async function swapOut(
// 	pool: HeavenPoolBaseClient,
// 	recentBlockhash: RecentBlockhash
// ) {
// 	const ata = await getOrCreateAssociatedTokenAccount(
// 		PROVIDER.connection.connection, // connection
// 		PAYER, // fee payer
// 		pool.ammBaseMint!, // mint
// 		PAYER.publicKey // owner,
// 	);

// 	assert.strictEqual(
// 		ata.address.toBase58(),
// 		pool.userBaseTokenVault!.toBase58()
// 	);

// 	const ix = pool.makeSwapOutInstruction({
// 		maxAmountIn: new BN(0.1 * LAMPORTS_PER_SOL),
// 		amountOut: new BN(1000_000_000),
// 		destination: pool.userBaseTokenVault!,
// 		source: pool.userQuoteTokenVault!,
// 	});

// 	const signed = await signTransaction(PROVIDER, PAYER, [ix], [], {
// 		latestBlockhash: recentBlockhash,
// 	});

// 	await sendTransaction(PROVIDER, signed.versionedTransaction, OPTS);
// }

// async function claimTax(
// 	pool: HeavenPoolBaseClient,
// 	recentBlockhash: RecentBlockhash
// ) {
// 	const ix = pool.makeClaimSwapTaxInstruction({
// 		amount: new BN((await pool.taxAccount!).amount.toString()),
// 	});

// 	const signed = await signTransaction(PROVIDER, PAYER, [ix], [], {
// 		latestBlockhash: recentBlockhash,
// 	});

// 	await sendTransaction(PROVIDER, signed.versionedTransaction, OPTS);
// }

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

	const allowAddLiquidity = true;
	const allowRemoveLiquidity = true;
	const allowSwap = true;

	const buyTax = 0;
	if (buyTax > 10000 || buyTax < 0) {
		throw new Error('Buy tax value between 0 and 10000');
	}

	const sellTax = 0;
	if (sellTax > 10000 || sellTax < 0) {
		throw new Error('Sell tax value between 0 and 10000');
	}

	const newLockUntil = Date.now() / 1000; // convert from milliseconds to seconds
	if (newLockUntil < poolState.lockUntil.toNumber()) {
		throw new Error(
			'Cannot update lockUntil to a value less than the current lockUntil'
		);
	}

	const slot = await connection.getSlot();
	const timestamp = await connection.getBlockTime(slot);
	const isAlreadyOpen = timestamp > poolState.openAt.toNumber();

	const newOpenAt = Date.now() / 1000; // convert from milliseconds to seconds
	if (isAlreadyOpen && newOpenAt !== poolState.openAt.toNumber()) {
		throw new Error(
			`If the pool has already opened, then openAt cannot be updated. Current block timestamp: ${timestamp}, openAt: ${poolState.openAt.toNumber()}`
		);
	}

	const updateLiquidityPoolIx = await pool
		.makeUpdateLiquidityPoolInstruction({
			allowAddLiquidity,
			allowRemoveLiquidity,
			allowSwap,
			buyTax: new BN(buyTax),
			encodedUserDefinedEventData: '',
			lockUntil: new BN(newLockUntil),
			openAt: new BN(newOpenAt),
			sellTax: new BN(sellTax),
		})
		.instruction();

	const updateLiquidityPoolTx = await sendAndConfirmTransaction(
		connection,
		new Transaction().add(updateLiquidityPoolIx),
		[user],
		{
			commitment: 'confirmed',
		}
	);
}

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
import { Heaven } from 'src';

export async function updateLiquidityPoolExample() {
    const connection = new Connection(
        'https://api.devnet.solana.com',
        'confirmed'
    );
    const liquidityPoolAddress = new PublicKey('...'); // Insert the liquidity pool address
    const payer = Keypair.generate();

    // Load the pool
    const pool = await Heaven.load({
        id: liquidityPoolAddress,
        network: 'devnet',
        payer: payer.publicKey,
        connection,
        // Optional: If you want to use a custom program ID
        // programId: new PublicKey('...'), // Insert the program ID
    });

    const enableAddLpIx = await pool.enableAddLpIx();
    const enableRemoveLpIx = await pool.enableRemoveLpIx();
    const enableSwapIx = await pool.enableSwapIx();
    const disableAddLpIx = await pool.disableAddLpIx();
    const disableRemoveLpIx = await pool.disableRemoveLpIx();
    const disableSwapIx = await pool.disableSwapIx();
    const updateSellTaxIx = await pool.updateSellTaxIx({
        sellTax: new BN(30), // 30 BPS = 30 / 10000 * 100 = 0.3%
    });
    const updateBuyTaxIx = await pool.updateBuyTaxIx({
        buyTax: new BN(30), // 30 BPS = 30 / 10000 * 100 = 0.3%
    });
    // You can lock the buy and sell tax rates forever to ensure that they cannot be changed
    const lockTaxationIx = await pool.lockTaxationIx();

    const currentLpLockTs = await pool.getCurrentLpLockTimestamp();
    const extendedLpLockTs = currentLpLockTs.getTime() + 60 * 60 * 1000; // extend the lock by 1 hour

    // Note: you can only extend lp lock, not shorten it
    const extendLpLockIx = await pool.extendLpLockIx({
        lockLiquidityUntil: new Date(extendedLpLockTs),
    });

    // Note: you can only update the open pool at timestamp if the previous open pool at timestamp has not passed
    const updateOpenPoolAtIx = await pool.updateOpenPoolAtIx({
        openPoolAt: new Date(Date.now() + 60 * 60 * 1000), // open the pool in 1 hour from now
    });

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(
            enableAddLpIx,
            enableRemoveLpIx,
            enableSwapIx,
            disableAddLpIx,
            disableRemoveLpIx,
            disableSwapIx,
            extendLpLockIx,
            updateOpenPoolAtIx,
            updateSellTaxIx,
            updateBuyTaxIx,
            lockTaxationIx
        ),
        [payer],
        {
            commitment: 'confirmed',
        }
    );
}

/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
import {
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import { Heaven } from 'src';

export async function claimLpTokensExample() {
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
    });

    // Get the current locked lp token account balance
    const amount = await pool.lockedLpTokenBalance;

    // Claim all of the locked lp tokens
    const ix = await pool.claimLpTokensIx({
        amount,
    });

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(ix),
        [payer],
        {
            commitment: 'confirmed',
        }
    );
}

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

export async function claimTaxExample() {
    const connection = new Connection(
        'https://api.devnet.solana.com',
        'confirmed'
    );
    const liquidityPoolAddress = new PublicKey('...'); // Insert the liquidity pool address
    const user = Keypair.generate();

    // Load the pool
    const pool = await Heaven.load({
        id: liquidityPoolAddress,
        network: 'devnet',
        user: user.publicKey,
        connection,
    });

    // Get the current tax balances
    const baseAmount = await pool.baseTaxBalance;
    const quoteAmount = await pool.quoteTaxBalance;

    // Claim all of the tax
    const ix = await pool.claimTaxIx({
        base: baseAmount,
        quote: quoteAmount,
        event: '',
    });

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(ix),
        [user],
        {
            commitment: 'confirmed',
        }
    );
}

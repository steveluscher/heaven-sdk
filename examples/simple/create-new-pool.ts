/* eslint-disable max-len */
import {
    ComputeBudgetProgram,
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import { BN } from 'bn.js';
import { Heaven } from '../../src';

export async function createLiquidityPoolExample() {
    const owner = Keypair.generate();
    const connection = new Connection(
        'https://api.devnet.solana.com/', // Replace with your preferred Solana RPC endpoint
        'confirmed'
    );

    // Initialize a new liquidity pool
    const pool = await Heaven.init({
        base: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), // USDC;
        quote: new PublicKey('So11111111111111111111111111111111111111112'), // WSOL;
        connection: connection,
        owner: owner.publicKey,
        network: 'devnet',
    });

    const ix = await pool.createIx({
        // amount of base token to deposit
        baseAmount: new BN(1000_000 * 10 ** pool.baseTokenMintDecimals),
        // amount of quote token to deposit
        quoteAmount: new BN(1000 * 10 ** pool.quoteTokenMintDecimals),
        // sellTax BPS = 100 / 10000 * 100 = 1%;
        sellTax: new BN(100),
        // buyTax BPS = 25 / 10000 * 100 = 0.25%;
        buyTax: new BN(25),
        // locking liquidity
        lp: 'lock', // or 'burn' to burn LP tokens
        // Lock liquidity for 60 seconds
        lockLiquidityUntil: new Date(new Date().getTime() + 60 * 1000),
        // Open pool 60 seconds after creation
        openPoolAt: new Date(new Date().getTime() + 60 * 1000),
        event: '',
    });

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(
            ComputeBudgetProgram.setComputeUnitLimit({
                units: 300000,
            }),
            ix
        ),
        [owner],
        {
            commitment: 'confirmed',
        }
    );
}

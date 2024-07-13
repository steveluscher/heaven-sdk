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
    const creator = Keypair.generate();
    const connection = new Connection(
        'https://api.devnet.solana.com/', // Replace with your preferred Solana RPC endpoint
        'confirmed'
    );

    // Initialize a new liquidity pool
    const pool = await Heaven.new({
        base: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), // USDC;
        quote: new PublicKey('So11111111111111111111111111111111111111112'), // WSOL;
        connection: connection,
        payer: creator.publicKey,
        network: 'devnet',
        // Optional: If you want to use a custom program ID
        // programId: new PublicKey('...'), // Insert the program ID
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
        // [OPTIONAL]: The contract will emit this event when the pool is created
        event: '',
        // [OPTIONAL]: Only allow pool creatot to add additional liquidity.
        // Default is `false`.
        // Important: This cannot be changed after pool creation.
        // Setting this to `true` will only allow the pool creator to collect swap fees without pulling
        // all the liquidity from the pool.
        disableNonCreatorAddLiquidity: true,
    });

    const id = pool.subscribeCustomEvent((event, poolId, instruction) => {
        console.log('Custom event:', event, poolId, instruction);
    });

    // Don't forget to unsubscribe from the custom event when you no longer need it
    // await pool.unsubscribe(id);

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(
            ComputeBudgetProgram.setComputeUnitLimit({
                units: 300000,
            }),
            ix
        ),
        [creator],
        {
            commitment: 'confirmed',
        }
    );
}

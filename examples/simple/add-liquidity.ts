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

export async function addLpExample() {
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

    // Adding 1000 base tokens
    const baseAmount = new BN(1000 * 10 ** pool.baseTokenMintDecimals);

    // Calculate the maximum amount of quote tokens that needs to be added as well
    // based on the provided slippage
    const quoteResult = await pool.quoteAddLp({
        inputSide: 'base',
        amount: baseAmount,
        // Slippage BPS => 100 = 1% = 100 / 10000 * 100
        slippage: new BN(100),
    });

    const ix = await pool.addLpIx({
        quoteResult,
        // [OPTIONAL]: The contract will emit this event when the liquidity is added
        event: '',
    });

    const id = pool.subscribeCustomEvent((event, poolId, instruction) => {
        console.log('Custom event:', event, poolId, instruction);
    });

    // Don't forget to unsubscribe from the custom event when you no longer need it
    // await pool.unsubscribe(id);

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(ix),
        [payer],
        {
            commitment: 'confirmed',
        }
    );
}

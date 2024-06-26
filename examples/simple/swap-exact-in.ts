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

export async function swapExactInExample() {
    const connection = new Connection(
        'https://api.devnet.solana.com',
        'confirmed'
    );
    const liquidityPoolAddress = new PublicKey('...'); // Insert the liquidity pool address
    const payer = Keypair.generate();

    // Load an existing pool by id
    const pool = await Heaven.load({
        id: liquidityPoolAddress,
        network: 'devnet',
        payer: payer.publicKey,
        connection,
    });

    // Swapping in 1000 base tokens for quote tokens
    const amount = new BN(1000 * 10 ** pool.baseTokenMintDecimals);

    // Slippage BPS => 100 = 1% = 100 / 10000 * 100
    const slippage = new BN(100);

    // Quote the minimum amount of quote tokens that will be received
    // based on the provided slippage
    const quoteResult = await pool.quoteSwapIn({
        amount,
        inputSide: 'base',
        slippage,
    });

    const ix = await pool.swapInIx({
        amount,
        quoteResult,
        // [OPTIONAL]: The contract will emit this event when the swap is executed
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

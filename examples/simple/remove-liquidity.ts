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

export async function removeLpExample() {
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

    // Remove 1000 lp tokens
    const lpAmount = new BN(1000 * 10 ** pool.lpTokenMintDecimals);

    // Calculate the minimum amount of base and quote tokens that will be received
    // based on the provided slippage
    const quoteResult = await pool.quoteRemoveLp({
        amount: lpAmount,
        // Slippage BPS => 100 = 1% = 100 / 10000 * 100
        slippage: new BN(100),
    });

    const ix = await pool.removeLpIx({
        quoteResult,
        // [OPTIONAL]: The contract will emit this event when the liquidity is removed
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

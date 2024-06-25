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

export async function swapExactOutExample() {
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

    // Swapping out 1000 base tokens using quote tokens
    const amountOut = new BN(1000 * 10 ** pool.baseTokenMintDecimals);

    const slippage = new BN(100); // 1%

    // Quote the maximum amount of quote tokens that will be spent
    // based on the provided slippage
    const quoteResult = await pool.quoteSwapOut({
        amount: amountOut,
        inputSide: 'quote',
        slippage,
    });

    const ix = await pool.swapOutIx({
        amount: amountOut,
        quoteResult,
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

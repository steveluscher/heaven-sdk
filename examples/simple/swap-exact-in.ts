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
    const user = Keypair.generate();

    // Load an existing pool by id
    const pool = await Heaven.load({
        id: liquidityPoolAddress,
        network: 'devnet',
        user: user.publicKey,
        connection,
    });

    // Swapping in 1000 base tokens for quote tokens
    const amount = new BN(1000 * 10 ** pool.baseTokenMintDecimals);

    const slippage = new BN(100); // 1%

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

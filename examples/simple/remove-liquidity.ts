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
    const user = Keypair.generate();

    // Load the pool
    const pool = await Heaven.load({
        id: liquidityPoolAddress,
        network: 'devnet',
        user: user.publicKey,
        connection,
    });

    // Remove 1000 lp tokens
    const lpAmount = new BN(1000 * 10 ** pool.lpTokenMintDecimals);

    // Calculate the minimum amount of base and quote tokens that will be received
    // based on the provided slippage
    const quoteResult = await pool.quoteRemoveLp({
        amount: lpAmount,
        slippage: new BN(100), // 1%
    });

    const ix = await pool.removeLpIx({
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

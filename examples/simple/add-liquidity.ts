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
    const user = Keypair.generate();

    // Load the pool
    const pool = await Heaven.load({
        id: liquidityPoolAddress,
        network: 'devnet',
        user: user.publicKey,
        connection,
    });

    // Adding 1000 base tokens
    const baseAmount = new BN(1000 * 10 ** pool.baseTokenMintDecimals);

    // Calculate the maximum amount of quote tokens that needs to be added as well
    // based on the provided slippage
    const quoteResult = await pool.quoteAddLp({
        inputSide: 'base',
        amount: baseAmount,
        slippage: new BN(100), // 1%
    });

    const ix = await pool.addLpIx({
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

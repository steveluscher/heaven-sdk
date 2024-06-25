import {
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import { BN } from 'bn.js';
import {
    Heaven,
    HeavenSupportedNetwork,
    HeavenSupportedNetworkClusterApiUrl,
    HeavenSupportedTokenProgram,
    anchor,
} from 'src';

async function test() {
    const locked = false;
    const burnLpTokens = false;
    const connection = new Connection(
        HeavenSupportedNetworkClusterApiUrl[HeavenSupportedNetwork.localnet],
        'confirmed'
    );
    const baseTokenMint = new PublicKey(
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    ); // USDC;
    const baseTokenProgram = HeavenSupportedTokenProgram.TOKEN;
    const quoteTokenMint = new PublicKey(
        'So11111111111111111111111111111111111111112'
    ); // WSOL;
    const quoteTokenProgram = HeavenSupportedTokenProgram.TOKEN;
    const network = HeavenSupportedNetwork.devnet;
    const owner = Keypair.generate();

    const pool = Heaven.initializeWithTokenPair({
        baseTokenMint,
        baseTokenProgram,
        quoteTokenMint,
        quoteTokenProgram,
        protocolConfigVersion: 1,
        network,
        owner: owner.publicKey,
        baseTokenMintDecimals: 6,
        quoteTokenMintDecimals: 9,
        connection: connection,
    });

    const createLiquidityPoolIx = await pool
        .makeCreateLiquidityPoolInstruction({
            encodedUserDefinedEventData: '',
            expectedBaseTokenBalanceAfterTransferFee: new BN(1000_000 * 1e9),
            expectedQuoteTokenBalanceAfterTransferFee: new BN(1000 * 1e9),
            inputBaseTokenAmount: new BN(1000_000 * 1e9),
            inputQuoteTokenAmount: new BN(1000 * 1e9),
            lockLiquidityProviderTokenUntil: locked
                ? new BN(Math.ceil(Date.now() / 1000 + 1 * 60))
                : new BN(0),
            openAt: new BN(0),
            sellTax: new BN(100),
            buyTax: new BN(25),
            burnLpTokens,
        })
        .instruction();

    const createLiquidityPoolTx = await sendAndConfirmTransaction(
        connection,
        new Transaction().add(
            ...[
                anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({
                    units: 300000,
                }),
                createLiquidityPoolIx,
            ]
        ),
        [owner],
        {
            commitment: 'confirmed',
            preflightCommitment: 'confirmed',
            skipPreflight: true,
        }
    );
}

/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { HeavenAnchorAmm, IDL } from './idl';
import {
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    clusterApiUrl,
} from '@solana/web3.js';
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    ExtensionType,
    MINT_SIZE,
    Mint,
    TOKEN_2022_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    createInitializeMintInstruction,
    createInitializeTransferFeeConfigInstruction,
    getAssociatedTokenAddressSync,
    getMinimumBalanceForRentExemptMint,
    getMint,
    getMintLen,
    getTransferFeeConfig,
} from '@solana/spl-token';
import Arweave from 'arweave';
import { WebIrys } from '@irys/sdk';
import IPFS from 'ipfs-only-hash';
import {
    percentAmount,
    signerIdentity,
    Signer as UmiSigner,
    some,
    UmiPlugin,
} from '@metaplex-foundation/umi';
import { createFungible } from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import '@solana/web3.js';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { WalletAdapter } from '@solana/wallet-adapter-base';
import {
    AddLiquiditySide,
    SwapDirection,
    estimate_add_liquidity_maximum_base_and_quote_token,
    estimate_exact_in_minimum_out,
    estimate_exact_out_maximum_in,
    estimate_remove_liquidity_minimum_base_and_quote_token,
} from 'heaven-wasm-sdk';
import { parseProtocolSwapFeeDirection, parseTaxationMode } from './index';
import { BN } from 'bn.js';

export type BNType = anchor.BN;

export enum HeavenSupportedNetwork {
    localnet = 0,
    devnet = 1,
    testnet = 2,
    mainnet = 3,
}

export type Network = 'localnet' | 'devnet' | 'testnet' | 'mainnet';

const LOG_MESSAGES_BYTES_LIMIT = 10 * 1000;

export type QuoteSwapInResult = {
    minimumOut: BNType;
    swapDirection: SwapDirection;
};

export type QuoteSwapOutResult = {
    maximumIn: BNType;
    swapDirection: SwapDirection;
};

export type QuoteAddLiquidityResult = {
    maxBaseToken: BNType;
    maxQuoteToken: BNType;
    lpToken: BNType;
    inputSide: AddLiquiditySide;
};

export type QuoteRemoveLiquidityResult = {
    minimumBaseTokenAmount: BNType;
    minimumQuoteTokenAmount: BNType;
    amount: BNType;
};

export const NetworkFromString = {
    localnet: HeavenSupportedNetwork.localnet,
    devnet: HeavenSupportedNetwork.devnet,
    testnet: HeavenSupportedNetwork.testnet,
    mainnet: HeavenSupportedNetwork.mainnet,
};

export const HeavenSupportedNetworkClusterApiUrl = {
    [HeavenSupportedNetwork.localnet]: 'http://localhost:8899',
    [HeavenSupportedNetwork.devnet]: clusterApiUrl('devnet'),
    [HeavenSupportedNetwork.testnet]: clusterApiUrl('testnet'),
    [HeavenSupportedNetwork.mainnet]: clusterApiUrl('mainnet-beta'),
};

export const HeavenSupportedNetworkName = {
    [HeavenSupportedNetwork.localnet]: 'localnet',
    [HeavenSupportedNetwork.devnet]: 'devnet',
    [HeavenSupportedNetwork.testnet]: 'testnet',
    [HeavenSupportedNetwork.mainnet]: 'mainnet',
};

export const HeavenSupportedNetworkProgramId = {
    [HeavenSupportedNetwork.localnet]: new PublicKey(
        'BFbT2pvqgUFytCBNAWf1i5b2XjNfeEWLk661K1ADTABQ'
    ),
    [HeavenSupportedNetwork.devnet]: new PublicKey(
        'BFbT2pvqgUFytCBNAWf1i5b2XjNfeEWLk661K1ADTABQ'
    ),
    [HeavenSupportedNetwork.testnet]: new PublicKey(
        'BFbT2pvqgUFytCBNAWf1i5b2XjNfeEWLk661K1ADTABQ'
    ),
    // TODO: Replace this with the correct mainnet program ID
    [HeavenSupportedNetwork.mainnet]: new PublicKey(
        'BFbT2pvqgUFytCBNAWf1i5b2XjNfeEWLk661K1ADTABQ'
    ),
};

export const HeavenSupportedNetworkPoolCreationFeeWallet = {
    [HeavenSupportedNetwork.localnet]: new PublicKey(
        '5gCC5UQgKWDhCKjGGWUEpWBhUbrMpgpV9asUzRGrVRBm'
    ),
    [HeavenSupportedNetwork.devnet]: new PublicKey(
        '5gCC5UQgKWDhCKjGGWUEpWBhUbrMpgpV9asUzRGrVRBm'
    ),
    [HeavenSupportedNetwork.testnet]: new PublicKey(
        '5gCC5UQgKWDhCKjGGWUEpWBhUbrMpgpV9asUzRGrVRBm'
    ),
    // TODO: Replace this with the correct mainnet program ID
    [HeavenSupportedNetwork.mainnet]: new PublicKey(
        '5gCC5UQgKWDhCKjGGWUEpWBhUbrMpgpV9asUzRGrVRBm'
    ),
};

export const HeavenSupportedNetworkProtocolOwnerWallet = {
    [HeavenSupportedNetwork.localnet]: new PublicKey(
        '5gCC5UQgKWDhCKjGGWUEpWBhUbrMpgpV9asUzRGrVRBm'
    ),
    [HeavenSupportedNetwork.devnet]: new PublicKey(
        '5gCC5UQgKWDhCKjGGWUEpWBhUbrMpgpV9asUzRGrVRBm'
    ),
    [HeavenSupportedNetwork.testnet]: new PublicKey(
        '5gCC5UQgKWDhCKjGGWUEpWBhUbrMpgpV9asUzRGrVRBm'
    ),
    // TODO: Replace this with the correct mainnet program ID
    [HeavenSupportedNetwork.mainnet]: new PublicKey(
        '5gCC5UQgKWDhCKjGGWUEpWBhUbrMpgpV9asUzRGrVRBm'
    ),
};

export enum HeavenSupportedStableCoin {
    WSOL,
    USDC,
    USDT,
}

export const HeavenSupportedStableCoinMint = {
    So11111111111111111111111111111111111111112: HeavenSupportedStableCoin.WSOL,
    EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v:
        HeavenSupportedStableCoin.USDC,
    Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB:
        HeavenSupportedStableCoin.USDT,
};

export const HeavenSupportedStableCoinMintAddress = {
    [HeavenSupportedStableCoin.WSOL]: new PublicKey(
        'So11111111111111111111111111111111111111112'
    ),
    [HeavenSupportedStableCoin.USDC]: new PublicKey(
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    ),
    [HeavenSupportedStableCoin.USDT]: new PublicKey(
        'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
    ),
};

export enum HeavenSupportedTokenProgram {
    TOKEN,
    TOKEN_2022,
}

export const HeavenSupportedTokenProgramId = {
    [HeavenSupportedTokenProgram.TOKEN]: TOKEN_PROGRAM_ID,
    [HeavenSupportedTokenProgram.TOKEN_2022]: TOKEN_2022_PROGRAM_ID,
};

export type LiquidityPoolState =
    anchor.IdlAccounts<HeavenAnchorAmm>['liquidityPoolState'];

const getHeavenSupportedTokenProgramFromKey = (key: PublicKey) => {
    if (
        key.equals(
            HeavenSupportedTokenProgramId[HeavenSupportedTokenProgram.TOKEN]
        )
    ) {
        return HeavenSupportedTokenProgram.TOKEN;
    } else if (
        key.equals(
            HeavenSupportedTokenProgramId[
                HeavenSupportedTokenProgram.TOKEN_2022
            ]
        )
    ) {
        return HeavenSupportedTokenProgram.TOKEN_2022;
    }
    throw new Error('Unsupported token program');
};

export class Heaven {
    program: anchor.Program<HeavenAnchorAmm>;
    connection: Connection;
    network: HeavenSupportedNetwork;
    programId: PublicKey;
    protocolConfigVersion: number;

    makeClaimSwapTaxInstruction(
        params: anchor.IdlTypes<HeavenAnchorAmm>['ClaimSwapTaxParams']
    ) {
        return this.program.methods
            .claimSwapTax(params)
            .accountsStrict(this.accounts);
    }

    makeClaimProtocolSwapFeeInstruction(
        ownerBaseTokenSwapFeeVault: PublicKey,
        ownerQuoteTokenSwapFeeVault: PublicKey,
        params: anchor.IdlTypes<HeavenAnchorAmm>['ClaimProtocolSwapFeeParams']
    ) {
        return this.program.methods
            .claimProtocolSwapFee(params)
            .accountsStrict({
                ...this.accounts,
                ownerBaseTokenSwapFeeVault,
                ownerQuoteTokenSwapFeeVault,
            });
    }

    makeClaimLpTokensInstruction(
        params: anchor.IdlTypes<HeavenAnchorAmm>['ClaimLpTokensParams']
    ) {
        return this.program.methods
            .claimLpTokens(params)
            .accountsStrict(this.accounts);
    }

    makeSwapInInstruction(
        params: anchor.IdlTypes<HeavenAnchorAmm>['SwapInParams']
    ) {
        return this.program.methods
            .swapIn(params)
            .accountsStrict(this.accounts);
    }

    makeUpdateLiquidityPoolInstruction(
        params: anchor.IdlTypes<HeavenAnchorAmm>['UpdateLiquidityPoolParams']
    ) {
        return this.program.methods
            .updateLiquidityPool(params)
            .accountsStrict(this.accounts);
    }

    makeSwapOutInstruction(
        params: anchor.IdlTypes<HeavenAnchorAmm>['SwapOutParams']
    ) {
        return this.program.methods
            .swapOut(params)
            .accountsStrict(this.accounts);
    }

    makeAddLiquidityInstruction(
        params: anchor.IdlTypes<HeavenAnchorAmm>['AddLiquidityParams']
    ) {
        return this.program.methods
            .addLiquidity(params)
            .accountsStrict(this.accounts);
    }

    makeRemoveLiquidityInstruction(
        params: anchor.IdlTypes<HeavenAnchorAmm>['RemoveLiquidityParams']
    ) {
        return this.program.methods
            .removeLiquidity(params)
            .accountsStrict(this.accounts);
    }

    makeCreateProtocolConfigInstruction(
        version: number,
        params: anchor.IdlTypes<HeavenAnchorAmm>['ProtocolConfigParams']
    ) {
        return this.program.methods
            .createProtocolConfig(version, params)
            .accountsStrict({
                ...this.accounts,
                protocolConfigState: Heaven.deriveProtocolConfigPda(
                    version,
                    this.programId
                )[0],
            });
    }

    makeUpdateProtocolConfigInstruction(
        version: number,
        params: anchor.IdlTypes<HeavenAnchorAmm>['ProtocolConfigParams']
    ) {
        return this.program.methods
            .updateProtocolConfig(params)
            .accountsStrict({
                ...this.accounts,
                protocolConfigState: Heaven.deriveProtocolConfigPda(
                    version,
                    this.programId
                )[0],
            });
    }

    makeCreateLiquidityPoolInstruction(
        params: anchor.IdlTypes<HeavenAnchorAmm>['CreateLiquidityPoolParams']
    ) {
        return this.program.methods
            .createLiquidityPool(this.protocolConfigVersion, params)
            .accountsStrict(this.accounts)
            .remainingAccounts([
                {
                    pubkey: this.userLpTokenVault,
                    isWritable: true,
                    isSigner: false,
                },
                {
                    pubkey: this.accounts.protocolBaseTokenSwapFeeVault,
                    isWritable: true,
                    isSigner: false,
                },
                {
                    pubkey: this.accounts.protocolQuoteTokenSwapFeeVault,
                    isWritable: true,
                    isSigner: false,
                },
                {
                    pubkey: this.accounts.userAmmStats,
                    isWritable: true,
                    isSigner: false,
                },
                {
                    pubkey: this.accounts.userGlobalStats,
                    isWritable: true,
                    isSigner: false,
                },
            ]);
    }

    accounts: {
        authority: PublicKey;
        user: PublicKey;
        userBaseTokenVault: PublicKey;
        baseTokenMint: PublicKey;
        baseTokenProgram: PublicKey;
        baseTokenSwapTaxVault: PublicKey;
        liquidityPoolState: PublicKey;
        quoteTokenMint: PublicKey;
        quoteTokenProgram: PublicKey;
        quoteTokenSwapTaxVault: PublicKey;
        userQuoteTokenVault: PublicKey;
        associatedTokenProgram: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        lpTokenMint: PublicKey;
        lpTokenLockVault: PublicKey;
        poolCreationFeeWallet: PublicKey;
        protocolConfig: PublicKey;
        rent: PublicKey;
        systemProgram: PublicKey;
        tokenProgram: PublicKey;
        userAmmStats: PublicKey;
        userLiquidityProviderTokenVault: PublicKey;
        owner: PublicKey;
        protocolBaseTokenSwapFeeVault: PublicKey;
        protocolQuoteTokenSwapFeeVault: PublicKey;
        userLpTokenVault: PublicKey;
        userGlobalStats: PublicKey;
        protocolOwnerState: PublicKey;
    };

    static async new(params: {
        payer: PublicKey;
        base: PublicKey;
        quote: PublicKey;
        network: Network;
        connection: Connection;
    }) {
        const baseTokenProgram = await Heaven.getTokenProgramFromMint(
            params.base,
            params.connection
        );
        const quoteTokenProgram = await Heaven.getTokenProgramFromMint(
            params.quote,
            params.connection
        );
        const baseTokenMint = await getMint(
            params.connection,
            params.base,
            'confirmed'
        );
        const quoteTokenMint = await getMint(
            params.connection,
            params.quote,
            'confirmed'
        );
        return Heaven.initializeWithTokenPair({
            baseTokenMint: params.base,
            baseTokenProgram: baseTokenProgram,
            network: NetworkFromString[params.network],
            owner: params.payer,
            protocolConfigVersion: 1,
            quoteTokenMint: params.quote,
            quoteTokenProgram: quoteTokenProgram,
            connection: params.connection,
            baseTokenMintDecimals: baseTokenMint.decimals,
            quoteTokenMintDecimals: quoteTokenMint.decimals,
        });
    }

    async swapOutIx(params: {
        amount: BNType;
        quoteResult: QuoteSwapOutResult;
        event?: string;
    }) {
        const eventSize = Buffer.from(params.event ?? '').length;
        if (eventSize > LOG_MESSAGES_BYTES_LIMIT) {
            throw new Error(
                `Event size exceeds the limit of ${LOG_MESSAGES_BYTES_LIMIT} bytes`
            );
        }
        const ix = await this.makeSwapOutInstruction({
            encodedUserDefinedEventData: params.event ?? '',
            amountOut: params.amount,
            maxAmountIn: params.quoteResult.maximumIn,
            swapDirection:
                params.quoteResult.swapDirection === SwapDirection.Base2Quote
                    ? {
                          base2Quote: {},
                      }
                    : {
                          quote2Base: {},
                      },
        }).instruction();
        return ix;
    }

    async swapInIx(params: {
        amount: BNType;
        quoteResult: QuoteSwapInResult;
        event?: string;
    }) {
        const eventSize = Buffer.from(params.event ?? '').length;
        if (eventSize > LOG_MESSAGES_BYTES_LIMIT) {
            throw new Error(
                `Event size exceeds the limit of ${LOG_MESSAGES_BYTES_LIMIT} bytes`
            );
        }
        const ix = await this.makeSwapInInstruction({
            encodedUserDefinedEventData: params.event ?? '',
            amountIn: params.amount,
            minimumAmountOut: params.quoteResult.minimumOut,
            swapDirection:
                params.quoteResult.swapDirection === SwapDirection.Base2Quote
                    ? {
                          base2Quote: {},
                      }
                    : {
                          quote2Base: {},
                      },
        }).instruction();
        return ix;
    }

    _baseMint?: Mint;
    async baseMint(): Promise<Mint> {
        if (this._baseMint) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this._baseMint!;
        }
        return getMint(
            this.connection,
            this.accounts.baseTokenMint,
            'confirmed'
        ).then((mint) => {
            this._baseMint = mint;
            return this._baseMint;
        });
    }
    _quoteMint?: Mint;
    async quoteMint(): Promise<Mint> {
        if (this._quoteMint) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this._quoteMint!;
        }
        return getMint(
            this.connection,
            this.accounts.quoteTokenMint,
            'confirmed'
        ).then((mint) => {
            this._quoteMint = mint;
            return this._quoteMint;
        });
    }

    subscribeCustomEvent(
        callback: (
            event: string,
            poolId: PublicKey,
            instruction: string
        ) => void
    ): number {
        return this.program.addEventListener('UserDefinedEvent', (event) => {
            if (
                !event.liquidityPoolId.equals(this.accounts.liquidityPoolState)
            ) {
                return;
            }
            callback(
                event.base64Data,
                event.liquidityPoolId,
                event.instructionName
            );
        });
    }

    async unsubscribe(subscriptionId: number): Promise<void> {
        return this.program.removeEventListener(subscriptionId);
    }

    subscribeAddLpEvent(
        callback: (
            baseAdded: BNType,
            quoteAdded: BNType,
            lpMinted: BNType,
            poolId: PublicKey,
            payer: PublicKey
        ) => void
    ) {
        return this.program.addEventListener('AddLiquidityEvent', (event) => {
            callback(
                event.baseTokenInputAmount,
                event.quoteTokenInputAmount,
                event.lpTokenOutputAmount,
                event.liquidityPoolId,
                event.user
            );
        });
    }

    subscribeRemoveLpEvent(
        callback: (
            baseRemoved: BNType,
            quoteRemoved: BNType,
            lpBurned: BNType,
            poolId: PublicKey,
            payer: PublicKey
        ) => void
    ) {
        return this.program.addEventListener(
            'RemoveLiquidityEvent',
            (event) => {
                callback(
                    event.baseTokenAmount,
                    event.quoteTokenAmount,
                    event.lpTokenAmount,
                    event.liquidityPoolId,
                    event.user
                );
            }
        );
    }

    subscribePoolUpdatedEvent(callback: (state: LiquidityPoolState) => void) {
        return this.program.addEventListener(
            'UpdateLiquidityPoolEvent',
            async (event) => {
                if (
                    !event.liquidityPoolId.equals(
                        this.accounts.liquidityPoolState
                    )
                ) {
                    return;
                }
                callback(
                    await this.program.account.liquidityPoolState.fetch(
                        this.accounts.liquidityPoolState,
                        'confirmed'
                    )
                );
            }
        );
    }

    subscribeSwapOutEvent(
        callback: (
            amountIn: BNType,
            amountOut: BNType,
            poolId: PublicKey,
            direction: SwapDirection,
            payer: PublicKey,
            baseBalance: BNType,
            quoteBalance: BNType
        ) => void
    ) {
        return this.program.addEventListener('SwapOutEvent', (event) => {
            if (
                !event.liquidityPoolId.equals(this.accounts.liquidityPoolState)
            ) {
                return;
            }
            callback(
                event.swapAmountIn,
                event.swapAmountOut,
                event.liquidityPoolId,
                event.swapDirection.base2Quote
                    ? SwapDirection.Base2Quote
                    : SwapDirection.Quote2Base,
                event.user,
                event.baseTokenVaultBalance,
                event.quoteTokenVaultBalance
            );
        });
    }

    subscribeSwapInEvent(
        callback: (
            amountIn: BNType,
            amountOut: BNType,
            poolId: PublicKey,
            direction: SwapDirection,
            payer: PublicKey,
            baseBalance: BNType,
            quoteBalance: BNType
        ) => void
    ) {
        return this.program.addEventListener('SwapInEvent', (event) => {
            callback(
                event.swapAmountIn,
                event.swapAmountOut,
                event.liquidityPoolId,
                event.swapDirection.base2Quote
                    ? SwapDirection.Base2Quote
                    : SwapDirection.Quote2Base,
                event.user,
                event.baseTokenVaultBalance,
                event.quoteTokenVaultBalance
            );
        });
    }

    async addLpIx(params: {
        event?: string;
        quoteResult: QuoteAddLiquidityResult;
    }) {
        const eventSize = Buffer.from(params.event ?? '').length;
        if (eventSize > LOG_MESSAGES_BYTES_LIMIT) {
            throw new Error(
                `Event size exceeds the limit of ${LOG_MESSAGES_BYTES_LIMIT} bytes`
            );
        }

        const ix = await this.makeAddLiquidityInstruction({
            encodedUserDefinedEventData: params.event ?? '',
            baseSide:
                params.quoteResult.inputSide === AddLiquiditySide.Base
                    ? {
                          base: {},
                      }
                    : {
                          quote: {},
                      },
            maxBaseTokenAmount: params.quoteResult.maxBaseToken,
            maxQuoteTokenAmount: params.quoteResult.maxQuoteToken,
        }).instruction();
        return ix;
    }

    async quoteAddLp(params: {
        inputSide: 'base' | 'quote';
        amount: BNType;
        slippage: BNType;
    }): Promise<QuoteAddLiquidityResult> {
        const poolState = await this.program.account.liquidityPoolState.fetch(
            this.accounts.liquidityPoolState,
            'confirmed'
        );

        const baseTokenMint = await this.baseMint();

        const baseTokenTransferFee = getTransferFeeConfig(baseTokenMint)
            ?.newerTransferFee ?? {
            maximumFee: BigInt(0),
            transferFeeBasisPoints: 0,
        };

        const quoteTokenMint = await this.quoteMint();

        const quoteTokenTransferFee = getTransferFeeConfig(quoteTokenMint)
            ?.newerTransferFee ?? {
            maximumFee: BigInt(0),
            transferFeeBasisPoints: 0,
        };
        const slippageNumerator = BigInt(params.slippage.toString()); // 1% slippage (100/10000)
        const total_quote_amount = poolState.quoteTokenVaultBalance.toString();
        const total_base_amount = poolState.baseTokenVaultBalance.toString();
        const base_side =
            params.inputSide === 'base'
                ? AddLiquiditySide.Base
                : AddLiquiditySide.Quote;
        const max_base_token_amount = new BN(
            base_side === AddLiquiditySide.Base ? params.amount.toString() : 0
        ).toString();
        const max_quote_token_amount = new BN(
            base_side === AddLiquiditySide.Quote ? params.amount.toString() : 0
        ).toString();

        const result = estimate_add_liquidity_maximum_base_and_quote_token(
            total_quote_amount,
            total_base_amount,
            base_side,
            max_base_token_amount,
            max_quote_token_amount,
            baseTokenTransferFee.maximumFee,
            BigInt(baseTokenTransferFee.transferFeeBasisPoints),
            slippageNumerator,
            quoteTokenTransferFee.maximumFee,
            BigInt(quoteTokenTransferFee.transferFeeBasisPoints),
            slippageNumerator,
            poolState.lpTokenCurrentSupply.toString()
        );

        return {
            maxBaseToken: new BN(result.max_base_token_amount),
            maxQuoteToken: new BN(result.max_quote_token_amount),
            lpToken: new BN(result.lp_token_output_amount),
            inputSide: base_side,
        };
    }

    async removeLpIx(params: {
        event?: string;
        quoteResult: QuoteRemoveLiquidityResult;
    }) {
        const eventSize = Buffer.from(params.event ?? '').length;
        if (eventSize > LOG_MESSAGES_BYTES_LIMIT) {
            throw new Error(
                `Event size exceeds the limit of ${LOG_MESSAGES_BYTES_LIMIT} bytes`
            );
        }

        const ix = await this.makeRemoveLiquidityInstruction({
            encodedUserDefinedEventData: params.event ?? '',
            amount: params.quoteResult.amount,
            minimumBaseTokenAmount: params.quoteResult.minimumBaseTokenAmount,
            minimumQuoteTokenAmount: params.quoteResult.minimumQuoteTokenAmount,
        }).instruction();
        return ix;
    }

    async quoteRemoveLp(params: {
        amount: BNType;
        slippage: BNType;
    }): Promise<QuoteRemoveLiquidityResult> {
        const poolState = await this.program.account.liquidityPoolState.fetch(
            this.accounts.liquidityPoolState,
            'confirmed'
        );

        const baseTokenMint = await this.baseMint();

        const baseTokenTransferFee = getTransferFeeConfig(baseTokenMint)
            ?.newerTransferFee ?? {
            maximumFee: BigInt(0),
            transferFeeBasisPoints: 0,
        };

        const quoteTokenMint = await this.quoteMint();

        const quoteTokenTransferFee = getTransferFeeConfig(quoteTokenMint)
            ?.newerTransferFee ?? {
            maximumFee: BigInt(0),
            transferFeeBasisPoints: 0,
        };

        const slippageNumerator = BigInt(params.slippage.toString());
        const total_quote_amount = poolState.quoteTokenVaultBalance.toString();
        const total_base_amount = poolState.baseTokenVaultBalance.toString();

        const result = estimate_remove_liquidity_minimum_base_and_quote_token(
            params.amount.toString(),
            total_base_amount,
            total_quote_amount,
            poolState.lpTokenCurrentSupply.toString(),
            baseTokenTransferFee.maximumFee,
            BigInt(baseTokenTransferFee.transferFeeBasisPoints),
            slippageNumerator,
            quoteTokenTransferFee.maximumFee,
            BigInt(quoteTokenTransferFee.transferFeeBasisPoints),
            slippageNumerator
        );

        return {
            minimumBaseTokenAmount: new BN(result.base_token_minimum_amount),
            minimumQuoteTokenAmount: new BN(result.quote_token_minimum_amount),
            amount: params.amount,
        };
    }

    async quoteSwapIn(params: {
        inputSide: 'base' | 'quote';
        amount: BNType;
        slippage: BNType;
    }) {
        const poolState = await this.program.account.liquidityPoolState.fetch(
            this.accounts.liquidityPoolState,
            'confirmed'
        );

        const baseTokenMint = await this.baseMint();

        const baseTokenTransferFee = getTransferFeeConfig(baseTokenMint)
            ?.newerTransferFee ?? {
            maximumFee: BigInt(0),
            transferFeeBasisPoints: 0,
        };

        const quoteTokenMint = await this.quoteMint();

        const quoteTokenTransferFee = getTransferFeeConfig(quoteTokenMint)
            ?.newerTransferFee ?? {
            maximumFee: BigInt(0),
            transferFeeBasisPoints: 0,
        };
        let swapDirection: SwapDirection;
        if (params.inputSide === 'base') {
            swapDirection = SwapDirection.Base2Quote;
        } else {
            swapDirection = SwapDirection.Quote2Base;
        }

        const protocolSwapFeeDirection = parseProtocolSwapFeeDirection(
            poolState.baseTokenMint,
            poolState.quoteTokenMint,
            swapDirection
        );
        const taxationMode = parseTaxationMode(
            Object.keys(poolState.taxationMode)[0]
        );
        const slippageNumerator = BigInt(params.slippage.toString()); // 1% slippage (100/10000)

        const result = estimate_exact_in_minimum_out(
            params.amount.toString(),
            swapDirection,
            protocolSwapFeeDirection,
            taxationMode,
            poolState.baseTokenVaultBalance.toString(),
            poolState.quoteTokenVaultBalance.toString(),
            BigInt(poolState.swapFeeNumerator.toString()),
            BigInt(poolState.swapFeeDenominator.toString()),
            BigInt(poolState.protocolSwapFeeNumerator.toString()),
            BigInt(poolState.protocolSwapFeeDenominator.toString()),
            BigInt(poolState.buyTax.toString()),
            BigInt(poolState.sellTax.toString()),
            BigInt(baseTokenTransferFee.maximumFee),
            BigInt(baseTokenTransferFee.transferFeeBasisPoints),
            BigInt(quoteTokenTransferFee.maximumFee),
            BigInt(quoteTokenTransferFee.transferFeeBasisPoints),
            slippageNumerator
        );

        return {
            minimumOut: new BN(result.minimum_amount_out),
            swapDirection,
        };
    }

    async quoteSwapOut(params: {
        inputSide: 'base' | 'quote';
        amount: BNType;
        slippage: BNType;
    }) {
        const poolState = await this.program.account.liquidityPoolState.fetch(
            this.accounts.liquidityPoolState,
            'confirmed'
        );

        const baseTokenMint = await this.baseMint();

        const baseTokenTransferFee = getTransferFeeConfig(baseTokenMint)
            ?.newerTransferFee ?? {
            maximumFee: BigInt(0),
            transferFeeBasisPoints: 0,
        };

        const quoteTokenMint = await this.quoteMint();

        const quoteTokenTransferFee = getTransferFeeConfig(quoteTokenMint)
            ?.newerTransferFee ?? {
            maximumFee: BigInt(0),
            transferFeeBasisPoints: 0,
        };
        let swapDirection: SwapDirection;
        if (params.inputSide === 'base') {
            swapDirection = SwapDirection.Base2Quote;
        } else {
            swapDirection = SwapDirection.Quote2Base;
        }

        const protocolSwapFeeDirection = parseProtocolSwapFeeDirection(
            poolState.baseTokenMint,
            poolState.quoteTokenMint,
            swapDirection
        );
        const taxationMode = parseTaxationMode(
            Object.keys(poolState.taxationMode)[0]
        );
        const slippageNumerator = BigInt(params.slippage.toString()); // 1% slippage (100/10000)

        const result = estimate_exact_out_maximum_in(
            params.amount.toString(),
            swapDirection,
            protocolSwapFeeDirection,
            taxationMode,
            poolState.baseTokenVaultBalance.toString(),
            poolState.quoteTokenVaultBalance.toString(),
            BigInt(poolState.swapFeeNumerator.toString()),
            BigInt(poolState.swapFeeDenominator.toString()),
            BigInt(poolState.protocolSwapFeeNumerator.toString()),
            BigInt(poolState.protocolSwapFeeDenominator.toString()),
            BigInt(poolState.buyTax.toString()),
            BigInt(poolState.sellTax.toString()),
            BigInt(baseTokenTransferFee.maximumFee),
            BigInt(baseTokenTransferFee.transferFeeBasisPoints),
            BigInt(quoteTokenTransferFee.maximumFee),
            BigInt(quoteTokenTransferFee.transferFeeBasisPoints),
            slippageNumerator
        );

        return {
            maximumIn: new BN(result.maximum_amount_in),
            swapDirection,
        };
    }

    async claimTaxIx(params: { base: BNType; quote: BNType; event?: string }) {
        const eventSize = Buffer.from(params.event ?? '').length;
        if (eventSize > LOG_MESSAGES_BYTES_LIMIT) {
            throw new Error(
                `Event size exceeds the limit of ${LOG_MESSAGES_BYTES_LIMIT} bytes`
            );
        }

        const ix = await this.makeClaimSwapTaxInstruction({
            baseAmount: params.base,
            quoteAmount: params.quote,
            encodedUserDefinedEventData: params.event ?? '',
        }).instruction();
        return ix;
    }

    async claimLpTokensIx(params: { amount: BNType }) {
        const ix = await this.makeClaimLpTokensInstruction({
            amount: params.amount,
        }).instruction();
        return ix;
    }

    async updateSellTaxIx(params: { sellTax: BNType; event?: string }) {
        const eventSize = Buffer.from(params.event ?? '').length;
        if (eventSize > LOG_MESSAGES_BYTES_LIMIT) {
            throw new Error(
                `Event size exceeds the limit of ${LOG_MESSAGES_BYTES_LIMIT} bytes`
            );
        }
        const poolState = await this.program.account.liquidityPoolState.fetch(
            this.accounts.liquidityPoolState,
            'confirmed'
        );

        if (params.sellTax.gtn(10000) || params.sellTax.ltn(0)) {
            throw new Error('Sell tax value must be between 0 and 10000');
        }

        const ix = await this.makeUpdateLiquidityPoolInstruction({
            allowAddLiquidity: poolState.allowAddLiquidity,
            allowRemoveLiquidity: poolState.allowRemoveLiquidity,
            allowSwap: poolState.allowSwap,
            buyTax: poolState.buyTax,
            sellTax: params.sellTax,
            encodedUserDefinedEventData: params.event ?? '',
            lockUntil: poolState.lockUntil,
            openAt: poolState.openAt,
        }).instruction();
        return ix;
    }

    async updateBuyTaxIx(params: { buyTax: BNType; event?: string }) {
        const eventSize = Buffer.from(params.event ?? '').length;
        if (eventSize > LOG_MESSAGES_BYTES_LIMIT) {
            throw new Error(
                `Event size exceeds the limit of ${LOG_MESSAGES_BYTES_LIMIT} bytes`
            );
        }
        const poolState = await this.program.account.liquidityPoolState.fetch(
            this.accounts.liquidityPoolState,
            'confirmed'
        );

        if (params.buyTax.gtn(10000) || params.buyTax.ltn(0)) {
            throw new Error('Buy tax value must be between 0 and 10000');
        }

        const ix = await this.makeUpdateLiquidityPoolInstruction({
            allowAddLiquidity: poolState.allowAddLiquidity,
            allowRemoveLiquidity: poolState.allowRemoveLiquidity,
            allowSwap: poolState.allowSwap,
            sellTax: poolState.sellTax,
            buyTax: params.buyTax,
            encodedUserDefinedEventData: params.event ?? '',
            lockUntil: poolState.lockUntil,
            openAt: poolState.openAt,
        }).instruction();
        return ix;
    }

    async updateAllowAddLpIx(params: {
        allowAddLiquidity: boolean;
        event?: string;
    }) {
        const eventSize = Buffer.from(params.event ?? '').length;
        if (eventSize > LOG_MESSAGES_BYTES_LIMIT) {
            throw new Error(
                `Event size exceeds the limit of ${LOG_MESSAGES_BYTES_LIMIT} bytes`
            );
        }
        const poolState = await this.program.account.liquidityPoolState.fetch(
            this.accounts.liquidityPoolState,
            'confirmed'
        );

        const ix = await this.makeUpdateLiquidityPoolInstruction({
            allowAddLiquidity: params.allowAddLiquidity,
            allowRemoveLiquidity: poolState.allowRemoveLiquidity,
            allowSwap: poolState.allowSwap,
            sellTax: poolState.sellTax,
            buyTax: poolState.buyTax,
            encodedUserDefinedEventData: params.event ?? '',
            lockUntil: poolState.lockUntil,
            openAt: poolState.openAt,
        }).instruction();
        return ix;
    }

    async updateAllowRemoveLpIx(params: {
        allowRemoveLiquidity: boolean;
        event?: string;
    }) {
        const eventSize = Buffer.from(params.event ?? '').length;
        if (eventSize > LOG_MESSAGES_BYTES_LIMIT) {
            throw new Error(
                `Event size exceeds the limit of ${LOG_MESSAGES_BYTES_LIMIT} bytes`
            );
        }
        const poolState = await this.program.account.liquidityPoolState.fetch(
            this.accounts.liquidityPoolState,
            'confirmed'
        );

        const ix = await this.makeUpdateLiquidityPoolInstruction({
            allowAddLiquidity: poolState.allowAddLiquidity,
            allowRemoveLiquidity: params.allowRemoveLiquidity,
            allowSwap: poolState.allowSwap,
            sellTax: poolState.sellTax,
            buyTax: poolState.buyTax,
            encodedUserDefinedEventData: params.event ?? '',
            lockUntil: poolState.lockUntil,
            openAt: poolState.openAt,
        }).instruction();
        return ix;
    }

    async updateAllowSwapIx(params: { allowSwap: boolean; event?: string }) {
        const eventSize = Buffer.from(params.event ?? '').length;
        if (eventSize > LOG_MESSAGES_BYTES_LIMIT) {
            throw new Error(
                `Event size exceeds the limit of ${LOG_MESSAGES_BYTES_LIMIT} bytes`
            );
        }
        const poolState = await this.program.account.liquidityPoolState.fetch(
            this.accounts.liquidityPoolState,
            'confirmed'
        );

        const ix = await this.makeUpdateLiquidityPoolInstruction({
            allowAddLiquidity: poolState.allowAddLiquidity,
            allowRemoveLiquidity: poolState.allowRemoveLiquidity,
            allowSwap: params.allowSwap,
            sellTax: poolState.sellTax,
            buyTax: poolState.buyTax,
            encodedUserDefinedEventData: params.event ?? '',
            lockUntil: poolState.lockUntil,
            openAt: poolState.openAt,
        }).instruction();
        return ix;
    }

    async updateOpenPoolAtIx(params: { openPoolAt: Date; event?: string }) {
        const eventSize = Buffer.from(params.event ?? '').length;
        if (eventSize > LOG_MESSAGES_BYTES_LIMIT) {
            throw new Error(
                `Event size exceeds the limit of ${LOG_MESSAGES_BYTES_LIMIT} bytes`
            );
        }
        const poolState = await this.program.account.liquidityPoolState.fetch(
            this.accounts.liquidityPoolState,
            'confirmed'
        );

        const slot = await this.connection.getSlot();
        const timestamp = await this.connection.getBlockTime(slot);
        const isAlreadyOpen = timestamp > poolState.openAt.toNumber();

        if (isAlreadyOpen) {
            throw new Error(
                `If the pool has already opened, then openAt cannot be updated. Current block timestamp: ${timestamp}, openAt: ${poolState.openAt.toNumber()}`
            );
        }

        const ix = await this.makeUpdateLiquidityPoolInstruction({
            allowAddLiquidity: poolState.allowAddLiquidity,
            allowRemoveLiquidity: poolState.allowRemoveLiquidity,
            allowSwap: poolState.allowSwap,
            sellTax: poolState.sellTax,
            buyTax: poolState.buyTax,
            encodedUserDefinedEventData: params.event ?? '',
            lockUntil: poolState.lockUntil,
            openAt: new anchor.BN(
                Math.ceil(params.openPoolAt.getTime() / 1000)
            ),
        }).instruction();
        return ix;
    }

    async getCurrentLpLockTimestamp(): Promise<Date> {
        const poolState = await this.program.account.liquidityPoolState.fetch(
            this.accounts.liquidityPoolState,
            'confirmed'
        );

        return new Date(poolState.lockUntil.toNumber() * 1000);
    }

    async extendLpLockIx(params: { event?: string; lockLiquidityUntil: Date }) {
        const eventSize = Buffer.from(params.event ?? '').length;
        if (eventSize > LOG_MESSAGES_BYTES_LIMIT) {
            throw new Error(
                `Event size exceeds the limit of ${LOG_MESSAGES_BYTES_LIMIT} bytes`
            );
        }
        const poolState = await this.program.account.liquidityPoolState.fetch(
            this.accounts.liquidityPoolState,
            'confirmed'
        );

        const newLockTs = new anchor.BN(
            Math.ceil(params.lockLiquidityUntil.getTime() / 1000)
        );

        if (newLockTs.ltn(poolState.lockUntil.toNumber())) {
            throw new Error(
                'Cannot update lockUntil to a value less than the current lockUntil'
            );
        }

        const ix = await this.makeUpdateLiquidityPoolInstruction({
            allowAddLiquidity: poolState.allowAddLiquidity,
            allowRemoveLiquidity: poolState.allowRemoveLiquidity,
            allowSwap: poolState.allowSwap,
            sellTax: poolState.sellTax,
            buyTax: poolState.buyTax,
            encodedUserDefinedEventData: params.event ?? '',
            lockUntil: newLockTs,
            openAt: poolState.openAt,
        }).instruction();
        return ix;
    }

    async disableSwapIx() {
        return this.updateAllowSwapIx({ allowSwap: false });
    }

    async enableSwapIx() {
        return this.updateAllowSwapIx({ allowSwap: true });
    }

    async disableAddLpIx() {
        return this.updateAllowAddLpIx({ allowAddLiquidity: false });
    }

    async enableAddLpIx() {
        return this.updateAllowAddLpIx({ allowAddLiquidity: true });
    }

    async disableRemoveLpIx() {
        return this.updateAllowRemoveLpIx({ allowRemoveLiquidity: false });
    }

    async enableRemoveLpIx() {
        return this.updateAllowRemoveLpIx({ allowRemoveLiquidity: true });
    }

    async createIx(params: {
        lp: 'burn' | 'lock';
        lockLiquidityUntil?: Date;
        openPoolAt: Date;
        baseAmount: BNType;
        quoteAmount: BNType;
        sellTax: BNType;
        buyTax: BNType;
        event?: string;
    }) {
        const eventSize = Buffer.from(params.event ?? '').length;
        if (eventSize > LOG_MESSAGES_BYTES_LIMIT) {
            throw new Error(
                `Event size exceeds the limit of ${LOG_MESSAGES_BYTES_LIMIT} bytes`
            );
        }

        if (params.baseAmount.lten(0) || params.quoteAmount.lten(0)) {
            throw new Error('Amounts must be greater than 0');
        }

        if (params.sellTax.gtn(10000) || params.sellTax.ltn(0)) {
            throw new Error('Sell tax value must be between 0 and 10000');
        }

        if (params.buyTax.gtn(10000) || params.buyTax.ltn(0)) {
            throw new Error('Buy tax value must be between 0 and 10000');
        }

        if (params.lp === 'burn' && params.lockLiquidityUntil) {
            throw new Error(
                'lockLiquidityUntil is not required when burning liquidity'
            );
        }

        if (params.lp === 'lock' && !params.lockLiquidityUntil) {
            throw new Error(
                'lockLiquidityUntil is required when locking liquidity'
            );
        }

        const baseTokenMint = await getMint(
            this.connection,
            this.accounts.baseTokenMint,
            'confirmed'
        );

        const baseTokenTransferFee = getTransferFeeConfig(baseTokenMint)
            ?.newerTransferFee ?? {
            maximumFee: BigInt(0),
            transferFeeBasisPoints: 0,
        };

        const quoteTokenMint = await getMint(
            this.connection,
            this.accounts.baseTokenMint,
            'confirmed'
        );

        const quoteTokenTransferFee = getTransferFeeConfig(quoteTokenMint)
            ?.newerTransferFee ?? {
            maximumFee: BigInt(0),
            transferFeeBasisPoints: 0,
        };

        const baseTokenAmount = BigInt(params.baseAmount.toString());
        const quoteTokenAmount = BigInt(params.quoteAmount.toString());

        const baseTokenCalcFee =
            (baseTokenAmount *
                BigInt(baseTokenTransferFee.transferFeeBasisPoints)) /
            BigInt(10_000); // expect 10 fee
        const baseTokenFee =
            baseTokenCalcFee > baseTokenTransferFee.maximumFee
                ? baseTokenTransferFee.maximumFee
                : baseTokenCalcFee; // expect 9 fee

        const quoteTokenCalcFee =
            (quoteTokenAmount *
                BigInt(quoteTokenTransferFee.transferFeeBasisPoints)) /
            BigInt(10_000); // expect 10 fee
        const quoteTokenFee =
            baseTokenCalcFee > quoteTokenTransferFee.maximumFee
                ? quoteTokenTransferFee.maximumFee
                : quoteTokenCalcFee; // expect 9 fee

        const expectedBaseTokenBalanceAfterTransferFee =
            baseTokenAmount - baseTokenFee;
        const expectedQuoteTokenBalanceAfterTransferFee =
            quoteTokenAmount - quoteTokenFee;

        const ix = await this.makeCreateLiquidityPoolInstruction({
            burnLpTokens: params.lp === 'burn',
            lockLiquidityProviderTokenUntil: new anchor.BN(
                Math.ceil(
                    (params.lockLiquidityUntil ?? new Date()).getTime() / 1000
                )
            ),
            buyTax: params.buyTax,
            encodedUserDefinedEventData: params.event ?? '',
            expectedBaseTokenBalanceAfterTransferFee: new anchor.BN(
                expectedBaseTokenBalanceAfterTransferFee.toString()
            ),
            expectedQuoteTokenBalanceAfterTransferFee: new anchor.BN(
                expectedQuoteTokenBalanceAfterTransferFee.toString()
            ),
            openAt: new anchor.BN(
                Math.ceil(params.openPoolAt.getTime() / 1000)
            ),
            sellTax: params.sellTax,
            inputBaseTokenAmount: params.baseAmount,
            inputQuoteTokenAmount: params.quoteAmount,
        }).instruction();

        return ix;
    }

    static async getTokenProgramFromMint(
        mint: PublicKey,
        connection: Connection
    ) {
        const mintInfo = await connection.getAccountInfo(mint);
        if (!mintInfo) {
            throw new Error('Mint not found');
        }
        return getHeavenSupportedTokenProgramFromKey(mintInfo.owner);
    }

    static initializeWithTokenPair(params: {
        owner: PublicKey;
        baseTokenMint: PublicKey;
        baseTokenProgram: HeavenSupportedTokenProgram;
        quoteTokenMint: PublicKey;
        quoteTokenProgram: HeavenSupportedTokenProgram;
        protocolConfigVersion: number;
        network: HeavenSupportedNetwork;
        clusterApiUrlOverride?: string;
        connection?: Connection;
        baseTokenMintDecimals: number;
        quoteTokenMintDecimals: number;
    }) {
        return new Heaven(params);
    }

    static createProgram(network: HeavenSupportedNetwork) {
        const programId = HeavenSupportedNetworkProgramId[network];

        const connection = new Connection(
            HeavenSupportedNetworkClusterApiUrl[network],
            'confirmed'
        );

        const program = new Program<HeavenAnchorAmm>(IDL, programId, {
            connection,
        });
        return program;
    }

    static async load(params: {
        payer: PublicKey;
        network: Network;
        connection: Connection;
        id: PublicKey;
    }) {
        return Heaven.initializeWithExistingPoolId({
            liquidityPoolId: params.id,
            network: NetworkFromString[params.network],
            user: params.payer,
        });
    }

    get lockedLpTokenBalance(): Promise<BNType> {
        return this.connection
            .getTokenAccountBalance(this.accounts.lpTokenLockVault)
            .then((amount) => {
                return new BN(amount.value.amount);
            });
    }

    get baseTaxBalance(): Promise<BNType> {
        return this.connection
            .getTokenAccountBalance(this.accounts.baseTokenSwapTaxVault)
            .then((amount) => {
                return new BN(amount.value.amount);
            });
    }

    get quoteTaxBalance(): Promise<BNType> {
        return this.connection
            .getTokenAccountBalance(this.accounts.quoteTokenSwapTaxVault)
            .then((amount) => {
                return new BN(amount.value.amount);
            });
    }

    static async initializeWithExistingPoolId(params: {
        user: PublicKey;
        network: HeavenSupportedNetwork;
        clusterApiUrlOverride?: string;
        liquidityPoolId: PublicKey;
        connection?: Connection;
    }) {
        const programId = HeavenSupportedNetworkProgramId[params.network];

        const connection =
            params.connection ??
            new Connection(
                params.clusterApiUrlOverride ??
                    HeavenSupportedNetworkClusterApiUrl[params.network],
                'confirmed'
            );

        const program = new Program<HeavenAnchorAmm>(IDL, programId, {
            connection,
        });

        const poolInfo = await program.account.liquidityPoolState.fetch(
            params.liquidityPoolId
        );

        const baseTokenMintInfo = await connection.getAccountInfo(
            poolInfo.baseTokenMint
        );
        const quoteTokenMintInfo = await connection.getAccountInfo(
            poolInfo.quoteTokenMint
        );

        const baseTokenProgram = getHeavenSupportedTokenProgramFromKey(
            baseTokenMintInfo.owner
        );
        const quoteTokenProgram = getHeavenSupportedTokenProgramFromKey(
            quoteTokenMintInfo.owner
        );

        return new Heaven({
            owner: poolInfo.creator,
            baseTokenMint: poolInfo.baseTokenMint,
            baseTokenProgram: baseTokenProgram,
            quoteTokenMint: poolInfo.quoteTokenMint,
            quoteTokenProgram: quoteTokenProgram,
            protocolConfigVersion: poolInfo.protocolConfigVersion,
            network: params.network,
            clusterApiUrlOverride: params.clusterApiUrlOverride,
            user: params.user,
            connection,
            baseTokenMintDecimals: poolInfo.baseTokenMintDecimals,
            quoteTokenMintDecimals: poolInfo.quoteTokenMintDecimals,
        });
    }

    private constructor(
        public params: {
            owner: PublicKey;
            baseTokenMint: PublicKey;
            baseTokenProgram: HeavenSupportedTokenProgram;
            quoteTokenMint: PublicKey;
            quoteTokenProgram: HeavenSupportedTokenProgram;
            protocolConfigVersion: number;
            network: HeavenSupportedNetwork;
            clusterApiUrlOverride?: string;
            user?: PublicKey;
            connection?: Connection;
            baseTokenMintDecimals: number;
            quoteTokenMintDecimals: number;
        }
    ) {
        this.baseTokenMintDecimals = params.baseTokenMintDecimals;
        this.quoteTokenMintDecimals = params.quoteTokenMintDecimals;
        this.lpTokenMintDecimals =
            params.baseTokenMintDecimals > params.quoteTokenMintDecimals
                ? params.baseTokenMintDecimals
                : params.quoteTokenMintDecimals;
        this.protocolConfigVersion = params.protocolConfigVersion;
        this.network = params.network;
        this.programId = HeavenSupportedNetworkProgramId[this.network];
        this.connection =
            params.connection ??
            new Connection(
                params.clusterApiUrlOverride ??
                    HeavenSupportedNetworkClusterApiUrl[this.network],
                'confirmed'
            );
        this.program = new Program<HeavenAnchorAmm>(IDL, this.programId, {
            connection: this.connection,
        });
        this._authority = Heaven.deriveAuthorityPda(this.programId);
        this._baseTokenProgram =
            HeavenSupportedTokenProgramId[this.params.baseTokenProgram];
        this._quoteTokenProgram =
            HeavenSupportedTokenProgramId[this.params.quoteTokenProgram];
        this._owner = this.params.owner;
        this._user = this.params.user ?? this.params.owner;
        this._baseTokenMint = this.params.baseTokenMint;
        this._quoteTokenMint = this.params.quoteTokenMint;
        this._liquidityPoolState = Heaven.deriveLiquidityPoolStatePda(
            this.owner,
            this.baseTokenMint,
            this.quoteTokenMint,
            this.programId
        );
        this._userAmmStats = Heaven.deriveUserAmmStatsPda(
            params.user ?? params.owner,
            this.liquidityPoolState,
            this.programId
        );
        this._liquidityProviderTokenMint =
            Heaven.deriveLiquidityProviderTokenMintPda(
                this.liquidityPoolState,
                this.programId
            );
        this._baseTokenVault = Heaven.deriveTokenVaultPda(
            this.liquidityPoolState,
            this.baseTokenMint,
            this.programId
        );
        this._quoteTokenVault = Heaven.deriveTokenVaultPda(
            this.liquidityPoolState,
            this.quoteTokenMint,
            this.programId
        );
        this._lpTokenLockVault = Heaven.deriveLpTokenLockVaultPda(
            this.owner,
            this.liquidityProviderTokenMint,
            this.programId
        );
        this._baseTokenSwapTaxVault = Heaven.deriveTokenSwapVaultPda(
            this.liquidityPoolState,
            this.baseTokenMint,
            this.programId
        );
        this._quoteTokenSwapTaxVault = Heaven.deriveTokenSwapVaultPda(
            this.liquidityPoolState,
            this.quoteTokenMint,
            this.programId
        );
        this._protocolConfig = Heaven.deriveProtocolConfigPda(
            this.params.protocolConfigVersion,
            this.programId
        );
        this._userBaseTokenVault = Heaven.deriveUserTokenVaultPda(
            this.user,
            this.baseTokenMint,
            this.baseTokenProgram
        );
        this._userQuoteTokenVault = Heaven.deriveUserTokenVaultPda(
            this.user,
            this.quoteTokenMint,
            this.quoteTokenProgram
        );
        this._userLpTokenVault = Heaven.deriveUserTokenVaultPda(
            this.user,
            this.liquidityProviderTokenMint,
            TOKEN_PROGRAM_ID
        );
        this.poolCreationFeeWallet =
            HeavenSupportedNetworkPoolCreationFeeWallet[this.network];
        this.protocolOwnerWallet =
            HeavenSupportedNetworkProtocolOwnerWallet[this.network];

        this._protocolBaseTokenSwapFeeVault =
            Heaven.deriveProtocolSwapFeeTokenVaultPda(
                this.liquidityPoolState,
                this.baseTokenMint,
                this.programId
            );
        this._protocolQuoteTokenSwapFeeVault =
            Heaven.deriveProtocolSwapFeeTokenVaultPda(
                this.liquidityPoolState,
                this.quoteTokenMint,
                this.programId
            );
        this._userGlobalStats = Heaven.deriveUserGlobalStatsPda(
            this.user,
            this.programId
        );

        this.accounts = {
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            authority: this.authority,
            baseTokenMint: this.baseTokenMint,
            baseTokenProgram: this.baseTokenProgram,
            baseTokenSwapTaxVault: this.baseTokenSwapTaxVault,
            baseTokenVault: this.baseTokenVault,
            liquidityPoolState: this.liquidityPoolState,
            lpTokenLockVault: this.lpTokenLockVault,
            lpTokenMint: this.liquidityProviderTokenMint,
            poolCreationFeeWallet: this.poolCreationFeeWallet,
            protocolConfig: this.protocolConfig,
            quoteTokenMint: this.quoteTokenMint,
            quoteTokenProgram: this.quoteTokenProgram,
            quoteTokenSwapTaxVault: this.quoteTokenSwapTaxVault,
            quoteTokenVault: this.quoteTokenVault,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            user: this.user,
            userBaseTokenVault: this.userBaseTokenVault,
            userQuoteTokenVault: this.userQuoteTokenVault,
            userAmmStats: this.userAmmStats,
            userLiquidityProviderTokenVault: this.userLpTokenVault,
            owner: this.protocolOwnerWallet,
            protocolQuoteTokenSwapFeeVault: this.protocolQuoteTokenSwapFeeVault,
            protocolBaseTokenSwapFeeVault: this.protocolBaseTokenSwapFeeVault,
            userLpTokenVault: this.userLpTokenVault,
            userGlobalStats: this.userGlobalStats,
            protocolOwnerState: Heaven.deriveProtocolOwnerPda(
                this.programId
            )[0],
        };
    }

    poolCreationFeeWallet: PublicKey;
    protocolOwnerWallet: PublicKey;

    baseTokenMintDecimals: number;
    quoteTokenMintDecimals: number;
    lpTokenMintDecimals: number;

    _liquidityProviderTokenMint: [PublicKey, number];
    get liquidityProviderTokenMint(): PublicKey {
        return this._liquidityProviderTokenMint[0];
    }
    get liquidityProviderTokenMintBump(): number {
        return this._liquidityProviderTokenMint[1];
    }

    _lpTokenLockVault: [PublicKey, number];
    get lpTokenLockVault(): PublicKey {
        return this._lpTokenLockVault[0];
    }
    get lpTokenLockVaultBump(): number {
        return this._lpTokenLockVault[1];
    }

    _baseTokenProgram: PublicKey;
    get baseTokenProgram(): PublicKey {
        return this._baseTokenProgram;
    }
    _quoteTokenProgram: PublicKey;
    get quoteTokenProgram(): PublicKey {
        return this._quoteTokenProgram;
    }

    _baseTokenVault: [PublicKey, number];
    get baseTokenVault(): PublicKey {
        return this._baseTokenVault[0];
    }
    get baseTokenVaultBump(): number {
        return this._baseTokenVault[1];
    }

    _baseTokenSwapTaxVault: [PublicKey, number];
    get baseTokenSwapTaxVault(): PublicKey {
        return this._baseTokenSwapTaxVault[0];
    }
    get baseTokenSwapTaxVaultBump(): number {
        return this._baseTokenSwapTaxVault[1];
    }

    _userBaseTokenVault: PublicKey;
    get userBaseTokenVault(): PublicKey {
        return this._userBaseTokenVault;
    }

    _userQuoteTokenVault: PublicKey;
    get userQuoteTokenVault(): PublicKey {
        return this._userQuoteTokenVault;
    }

    _userLpTokenVault: PublicKey;
    get userLpTokenVault(): PublicKey {
        return this._userLpTokenVault;
    }

    _quoteTokenSwapTaxVault: [PublicKey, number];
    get quoteTokenSwapTaxVault(): PublicKey {
        return this._quoteTokenSwapTaxVault[0];
    }
    get quoteTokenSwapTaxVaultBump(): number {
        return this._quoteTokenSwapTaxVault[1];
    }

    _quoteTokenVault: [PublicKey, number];
    get quoteTokenVault(): PublicKey {
        return this._quoteTokenVault[0];
    }
    get quoteTokenVaultBump(): number {
        return this._quoteTokenVault[1];
    }

    _owner: PublicKey;
    get owner(): PublicKey {
        return this._owner;
    }

    _user: PublicKey;
    get user(): PublicKey {
        return this._user;
    }

    _baseTokenMint: PublicKey;
    get baseTokenMint(): PublicKey {
        return this._baseTokenMint;
    }

    _quoteTokenMint: PublicKey;
    get quoteTokenMint(): PublicKey {
        return this._quoteTokenMint;
    }

    _liquidityPoolState: [PublicKey, number];
    get liquidityPoolState(): PublicKey {
        return this._liquidityPoolState[0];
    }
    get liquidityPoolStateBump(): number {
        return this._liquidityPoolState[1];
    }

    _userAmmStats: [PublicKey, number];
    get userAmmStats(): PublicKey {
        return this._userAmmStats[0];
    }
    get userAmmStatsBump(): number {
        return this._userAmmStats[1];
    }

    _authority: [PublicKey, number];
    get authority(): PublicKey {
        return this._authority[0];
    }
    get authorityBump(): number {
        return this._authority[1];
    }

    _protocolConfig: [PublicKey, number];
    get protocolConfig(): PublicKey {
        return this._protocolConfig[0];
    }
    get protocolConfigBump(): number {
        return this._protocolConfig[1];
    }

    _protocolBaseTokenSwapFeeVault: [PublicKey, number];
    get protocolBaseTokenSwapFeeVault(): PublicKey {
        return this._protocolBaseTokenSwapFeeVault[0];
    }
    _protocolQuoteTokenSwapFeeVault: [PublicKey, number];
    get protocolQuoteTokenSwapFeeVault(): PublicKey {
        return this._protocolQuoteTokenSwapFeeVault[0];
    }

    _userGlobalStats: [PublicKey, number];
    get userGlobalStats(): PublicKey {
        return this._userGlobalStats[0];
    }
    get userGlobalStatsBump(): number {
        return this._userGlobalStats[1];
    }

    static deriveAuthorityPda(programId: PublicKey) {
        const seeds = [
            Buffer.from(anchor.utils.bytes.utf8.encode('authority')),
        ];
        return PublicKey.findProgramAddressSync(seeds, programId);
    }

    static deriveProtocolOwnerPda(programId: PublicKey) {
        const seeds = [
            Buffer.from(anchor.utils.bytes.utf8.encode('protocol_owner_state')),
        ];
        return PublicKey.findProgramAddressSync(seeds, programId);
    }

    static deriveUserTokenVaultPda(
        user: PublicKey,
        tokenMint: PublicKey,
        tokenProgram: PublicKey = TOKEN_PROGRAM_ID
    ) {
        return getAssociatedTokenAddressSync(
            tokenMint,
            user,
            false,
            tokenProgram
        );
    }

    static deriveUserAmmStatsPda(
        user: PublicKey,
        liquidityPoolState: PublicKey,
        programId: PublicKey
    ) {
        const seeds = [
            Buffer.from(anchor.utils.bytes.utf8.encode('user_amm_stats')), // Correct seed for lock LP authority
            user.toBuffer(),
            liquidityPoolState.toBuffer(),
        ];
        return PublicKey.findProgramAddressSync(seeds, programId);
    }

    static deriveLiquidityProviderTokenMintPda(
        liquidityPoolState: PublicKey,
        programId: PublicKey
    ) {
        const seeds = [
            Buffer.from(
                anchor.utils.bytes.utf8.encode('liquidity_provider_token_mint')
            ), // Correct seed for liquidity provider token mint
            liquidityPoolState.toBuffer(),
        ];
        return PublicKey.findProgramAddressSync(seeds, programId);
    }

    static deriveTokenVaultPda(
        liquidityPoolState: PublicKey,
        tokenMint: PublicKey,
        programId: PublicKey
    ) {
        const seeds = [
            Buffer.from(
                anchor.utils.bytes.utf8.encode('liquidity_pool_token_vault')
            ), // Correct seed for liquidity pool token vault
            liquidityPoolState.toBuffer(),
            tokenMint.toBuffer(),
        ];
        return PublicKey.findProgramAddressSync(seeds, programId);
    }

    static deriveProtocolSwapFeeTokenVaultPda(
        liquidityPoolState: PublicKey,
        tokenMint: PublicKey,
        programId: PublicKey
    ) {
        const seeds = [
            Buffer.from(
                anchor.utils.bytes.utf8.encode('protocol_swap_fee_vault')
            ),
            tokenMint.toBuffer(),
            liquidityPoolState.toBuffer(),
        ];
        return PublicKey.findProgramAddressSync(seeds, programId);
    }

    static deriveLpTokenLockVaultPda(
        user: PublicKey,
        tokenMint: PublicKey,
        programId: PublicKey
    ) {
        const seeds = [
            Buffer.from(
                anchor.utils.bytes.utf8.encode('liquidity_pool_token_vault')
            ), // Correct seed for liquidity pool token vault
            user.toBuffer(),
            tokenMint.toBuffer(),
        ];
        return PublicKey.findProgramAddressSync(seeds, programId);
    }
    static deriveTokenSwapVaultPda(
        liquidityPoolState: PublicKey,
        tokenMint: PublicKey,
        programId: PublicKey
    ) {
        const seeds = [
            Buffer.from(
                anchor.utils.bytes.utf8.encode('lp_swap_tax_token_vault')
            ),
            liquidityPoolState.toBuffer(),
            tokenMint.toBuffer(),
        ];
        return PublicKey.findProgramAddressSync(seeds, programId);
    }

    static deriveLiquidityPoolStatePda(
        user: PublicKey,
        baseTokenMint: PublicKey,
        quoteTokenMint: PublicKey,
        programId: PublicKey
    ) {
        const seeds = [
            Buffer.from(anchor.utils.bytes.utf8.encode('liquidity_pool_state')), // Correct seed for liquidity pool state
            user.toBuffer(),
            baseTokenMint.toBuffer(),
            quoteTokenMint.toBuffer(),
        ];
        return PublicKey.findProgramAddressSync(seeds, programId);
    }

    static deriveUserGlobalStatsPda(user: PublicKey, programId: PublicKey) {
        const seeds = [
            Buffer.from(anchor.utils.bytes.utf8.encode('user_global_stats')), // Correct seed for liquidity pool state
            user.toBuffer(),
        ];
        return PublicKey.findProgramAddressSync(seeds, programId);
    }

    static u16ToBytes(num: number) {
        const arr = new ArrayBuffer(2);
        const view = new DataView(arr);
        view.setUint16(0, num, false);
        return new Uint8Array(arr);
    }

    static deriveProtocolConfigPda(
        protocolConfigVersion: number,
        programId: PublicKey
    ) {
        const seeds = [
            Buffer.from(
                anchor.utils.bytes.utf8.encode('protocol_config_state')
            ), // Correct seed for protocol config state
            Buffer.from(this.u16ToBytes(protocolConfigVersion)),
        ];
        return PublicKey.findProgramAddressSync(seeds, programId);
    }

    static arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
        timeout: 20000,
        logging: false,
    });

    static _webIrys?: WebIrys;
    static get webIrys() {
        if (!this._webIrys) {
            throw new Error('WebIrys not initialized');
        }
        return this._webIrys;
    }

    static initializeWebIrys = async (
        network: HeavenSupportedNetwork,
        wallet: object
    ) => {
        if (this._webIrys) {
            return this._webIrys;
        }
        const networkName = HeavenSupportedNetworkName[network];
        // Devnet RPC URLs change often, use a recent one from https://chainlist.org/
        const providerUrl = HeavenSupportedNetworkClusterApiUrl[network];
        const token = 'solana';

        const webIrys = new WebIrys({
            network: networkName,
            token,
            wallet: {
                rpcUrl: providerUrl,
                name: 'solana',
                provider: wallet,
            },
        });

        this._webIrys = await webIrys.ready();
        return this._webIrys;
    };

    static generateCID = async (content) => {
        return await IPFS.of(content);
    };

    static makeCreateTokenInstruction = async (params: {
        decimals: number;
        payer: PublicKey;
        connection: Connection;
        userDefinedMint: PublicKey;
    }) => {
        const mint = params.userDefinedMint;
        const tx = new Transaction().add(
            // create mint account
            SystemProgram.createAccount({
                fromPubkey: params.payer,
                newAccountPubkey: mint,
                space: MINT_SIZE,
                lamports: await getMinimumBalanceForRentExemptMint(
                    params.connection
                ),
                programId: TOKEN_PROGRAM_ID,
            }),
            // init mint account
            createInitializeMintInstruction(
                mint, // mint pubkey
                params.decimals, // decimals
                params.payer, // mint authority
                params.payer // freeze authority (you can use `null` to disable it. when you disable it, you can't turn it on again)
            )
        );
        return tx;
    };

    static makeCreateToken2022WithTransferFeeInstruction = async (params: {
        decimals: number;
        payer: PublicKey;
        mintAuthority: PublicKey;
        transferFeeConfigAuthority: PublicKey;
        withdrawWithheldAuthority: PublicKey;
        freezeAuthority?: PublicKey;
        connection: Connection;
        userDefinedMint?: PublicKey;
        // Fee basis points for transfers (100 = 1%
        feeBasisPoints: number;
        // Maximum fee per transfer
        maxFee: bigint;
    }) => {
        // Generate new keypair for Mint Account
        const mintKeypair = Keypair.generate();
        // Address for Mint Account
        const mint = params.userDefinedMint ?? mintKeypair.publicKey;

        // Size of Mint Account with extensions
        const mintLen = getMintLen([ExtensionType.TransferFeeConfig]);
        // Minimum lamports required for Mint Account
        const lamports =
            await params.connection.getMinimumBalanceForRentExemption(mintLen);

        // Instruction to invoke System Program to create new account
        const createAccountInstruction = SystemProgram.createAccount({
            fromPubkey: params.payer, // Account that will transfer lamports to created account
            newAccountPubkey: mint, // Address of the account to create
            space: mintLen, // Amount of bytes to allocate to the created account
            lamports, // Amount of lamports transferred to created account
            programId: TOKEN_2022_PROGRAM_ID, // Program assigned as owner of created account
        });

        // Instruction to initialize TransferFeeConfig Extension
        const initializeTransferFeeConfig =
            createInitializeTransferFeeConfigInstruction(
                mint, // Mint Account address
                params.transferFeeConfigAuthority, // Authority to update fees
                params.withdrawWithheldAuthority, // Authority to withdraw fees
                params.feeBasisPoints, // Basis points for transfer fee calculation
                params.maxFee, // Maximum fee per transfer
                TOKEN_2022_PROGRAM_ID // Token Extension Program ID
            );

        // Instruction to initialize Mint Account data
        const initializeMintInstruction = createInitializeMintInstruction(
            mint, // Mint Account Address
            params.decimals, // Decimals of Mint
            params.mintAuthority, // Designated Mint Authority
            params.freezeAuthority, // Optional Freeze Authority
            TOKEN_2022_PROGRAM_ID // Token Extension Program ID
        );

        // Add instructions to new transaction
        const transaction = new Transaction().add(
            createAccountInstruction,
            initializeTransferFeeConfig,
            initializeMintInstruction
        );

        return transaction;
    };

    static uploadMintImage = async (params: {
        key: Keypair | object;
        coinImageData: string | Buffer;
        coinImageType: string;
        network: HeavenSupportedNetwork.devnet | HeavenSupportedNetwork.mainnet;
    }) => {
        const coinUploadResult = await Heaven.webUploadToIrysWithCID(
            params.network,
            params.key,
            params.coinImageData,
            params.coinImageType
        );
        return coinUploadResult;
    };

    static uploadMintMetadata = async (params: {
        key: Keypair | object;
        image: string;
        name: string;
        symbol: string;
        description: string;
        network: HeavenSupportedNetwork.devnet | HeavenSupportedNetwork.mainnet;
    }) => {
        const tokenMetadata = {
            name: params.name,
            symbol: params.symbol,
            description: params.description,
            image: params.image,
        };
        const tokenMetadataUploadResult: {
            contentID: any;
            directUrl: string;
            contentIdUrl: string;
        } = await Heaven.webUploadToIrysWithCID(
            params.network,
            params.key,
            JSON.stringify(tokenMetadata),
            'application/json'
        );

        return { ...tokenMetadataUploadResult, metadata: tokenMetadata };
    };

    static async makeCreateMintMetadataInstruction(params: {
        network: HeavenSupportedNetwork;
        name: string;
        symbol: string;
        description: string;
        decimals: number;
        uri: string;
        mint: PublicKey;
        signer: WalletAdapter;
        tokenProgram: PublicKey;
    }) {
        const umi = createUmi(
            HeavenSupportedNetworkClusterApiUrl[params.network]
        );
        umi.use(walletAdapterIdentity(params.signer));
        umi.use(mplCandyMachine());

        const ixs = createFungible(umi, {
            mint: params.mint as any,
            name: params.name,
            uri: params.uri,
            symbol: params.symbol,
            sellerFeeBasisPoints: percentAmount(0),
            splTokenProgram: params.tokenProgram as any,
            decimals: some(params.decimals), // for 0 decimals use some(0)
        }).getInstructions();

        const txIxs = ixs.map((ix) => {
            return new TransactionInstruction({
                keys: ix.keys.map((key) => {
                    return {
                        pubkey: new PublicKey(key.pubkey),
                        isSigner: key.isSigner,
                        isWritable: key.isWritable,
                    };
                }),
                programId: new PublicKey(ix.programId),
                data: Buffer.from(ix.data),
            });
        });

        return new Transaction().add(...txIxs);
    }

    static webUploadToIrysWithCID = async (
        network: HeavenSupportedNetwork,
        wallet: object,
        data: string | Buffer,
        contentType: string
    ) => {
        const irys = await this.initializeWebIrys(network, wallet);

        const contentID = await this.generateCID(data);

        const price = await irys.getPrice(data.length);
        await irys.fund(price);

        const tags = [
            { name: 'Content-Type', value: contentType },
            { name: 'IPFS-CID', value: contentID },
        ];
        const receipt = await irys.upload(data, { tags: tags });

        return {
            contentID,
            directUrl: `https://gateway.irys.xyz/${receipt.id}`,
            contentIdUrl: `https://gateway.irys.xyz/ipfs/${contentID}`,
        };
    };
}

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
	TOKEN_2022_PROGRAM_ID,
	TOKEN_PROGRAM_ID,
	createInitializeMintInstruction,
	createInitializeTransferFeeConfigInstruction,
	getAssociatedTokenAddressSync,
	getMinimumBalanceForRentExemptMint,
	getMintLen,
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

export enum HeavenSupportedNetwork {
	localnet = 0,
	devnet = 1,
	testnet = 2,
	mainnet = 3,
}

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

	static initializeWithTokenPair(params: {
		owner: PublicKey;
		baseTokenMint: PublicKey;
		baseTokenProgram: HeavenSupportedTokenProgram;
		quoteTokenMint: PublicKey;
		quoteTokenProgram: HeavenSupportedTokenProgram;
		protocolConfigVersion: number;
		network: HeavenSupportedNetwork;
		clusterApiUrlOverride?: string;
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

	static async initializeWithExistingPoolId(params: {
		user: PublicKey;
		network: HeavenSupportedNetwork;
		clusterApiUrlOverride?: string;
		liquidityPoolId: PublicKey;
	}) {
		const programId = HeavenSupportedNetworkProgramId[params.network];

		const connection = new Connection(
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
		}
	) {
		this.protocolConfigVersion = params.protocolConfigVersion;
		this.network = params.network;
		this.programId = HeavenSupportedNetworkProgramId[this.network];
		this.connection = new Connection(
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

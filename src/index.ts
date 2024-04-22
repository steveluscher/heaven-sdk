import {
	ASSOCIATED_TOKEN_PROGRAM_ID,
	NATIVE_MINT,
	TOKEN_PROGRAM_ID,
	getAccount,
} from '@solana/spl-token';
import {
	AccountInfo,
	Connection,
	PublicKey,
	SYSVAR_RENT_PUBKEY,
	SystemProgram,
	TransactionInstruction,
	VersionedTransaction,
} from '@solana/web3.js';
import {
	AmmStatus,
	BaseHeaven,
	ClaimSwapTaxInstruction,
	CreateLiquidityPoolInstruction,
	LiquidityPoolState,
	OpenOrdersState,
	OpenbookMarketState,
	SwapBaseInInstruction,
	SwapBaseOutInstruction,
} from './base';
import assert from 'assert';
import { BN } from 'bn.js';

export * from './base';

// // eslint-disable-next-line @typescript-eslint/ban-types
// export type PoolUninitialized = {};
// // eslint-disable-next-line @typescript-eslint/ban-types
// export type PoolInitializing = {};

export class HeavenPoolBaseClient extends BaseHeaven {
	static async userClient(
		id: PublicKey,
		connection: Connection
	): Promise<HeavenPoolUserClient> {
		const liquidityState =
			await HeavenPoolBaseClient.fetchLiquidityPoolAccount(
				id,
				connection
			);
		const marketState = await HeavenPoolBaseClient.fetchMarketAccount(
			liquidityState.data.marketId,
			connection
		);

		const pool = new HeavenPoolBaseClient({
			baseMint: liquidityState.data.baseMint,
			connection,
			marketId: liquidityState.data.marketId,
			quoteMint: liquidityState.data.quoteMint,
			userWallet: liquidityState.data.updaterAuthority,
		});
		pool.setMarketState(marketState);
		return pool as unknown as HeavenPoolUserClient;
	}

	static async adminClient(
		id: PublicKey,
		connection: Connection,
		ownerWallet: PublicKey
	): Promise<HeavenPoolUserClient> {
		const liquidityState =
			await HeavenPoolBaseClient.fetchLiquidityPoolAccount(
				id,
				connection
			);
		assert(liquidityState.data.updaterAuthority.equals(ownerWallet));
		const marketState = await HeavenPoolBaseClient.fetchMarketAccount(
			liquidityState.data.marketId,
			connection
		);

		const pool = new HeavenPoolBaseClient({
			baseMint: liquidityState.data.baseMint,
			connection,
			marketId: liquidityState.data.marketId,
			quoteMint: liquidityState.data.quoteMint,
			userWallet: liquidityState.data.updaterAuthority,
		});
		pool.setMarketState(marketState);
		return pool as unknown as HeavenPoolAdminClient;
	}

	setMarketState(account: AccountInfo<OpenbookMarketState>) {
		this.marketMetadata = {
			marketId: this.marketId,
			requestQueue: account.data.requestQueue,
			eventQueue: account.data.eventQueue,
			bids: account.data.bids,
			asks: account.data.asks,
			baseVault: account.data.baseVault,
			quoteVault: account.data.quoteVault,
			baseMint: account.data.baseMint,
			quoteMint: account.data.quoteMint,
		};
	}

	static new(params: {
		marketId: PublicKey;
		userWallet: PublicKey;
		baseMint: PublicKey;
		quoteMint: PublicKey;
		connection: Connection;
	}) {
		return new HeavenPoolBaseClient(
			params
		) as unknown as HeavenPoolUninitializedClient;
	}

	private constructor(
		public params: {
			marketId: PublicKey;
			userWallet: PublicKey;
			baseMint: PublicKey;
			quoteMint: PublicKey;
			connection: Connection;
		}
	) {
		super();
		this.marketId = params.marketId;
		this.userWallet = params.userWallet;
		const input = { marketId: this.marketId };
		this.ammId = HeavenPoolBaseClient.getAssociatedId(input);
		this.ammLpMint = HeavenPoolBaseClient.getAssociatedLpMint(input);
		this.ammAuthority = HeavenPoolBaseClient.getAssociatedAuthority();
		this.ammBaseVault = HeavenPoolBaseClient.getAssociatedBaseVault(input);
		this.ammQuoteVault =
			HeavenPoolBaseClient.getAssociatedQuoteVault(input);
		this.ammLockLpVaultOwner =
			HeavenPoolBaseClient.getAssociatedLpLockOwner({
				lpMint: this.ammLpMint[0],
				userWallet: this.userWallet,
			});
		this.ammLockLpVault = HeavenPoolBaseClient.getAssociatedLpLock({
			lpMint: this.ammLpMint[0],
			userWallet: this.ammLockLpVaultOwner[0],
		});
		this.ammOpenOrders =
			HeavenPoolBaseClient.getAssociatedOpenOrders(input);
		this.ammTargetOrders =
			HeavenPoolBaseClient.getAssociatedTargetOrders(input);
		this.ammWidrawQueue =
			HeavenPoolBaseClient.getAssociatedWithdrawQueue(input);
		this.marketAuthority =
			HeavenPoolBaseClient.getMarketAssociatedAuthority(input);
		this.ammConfig = HeavenPoolBaseClient.getAssociatedConfigId();
		this.ammTaxWalletOwner = HeavenPoolBaseClient.getAmmTaxWalletOwner({
			ammId: this.ammId[0],
			ammOwner: this.userWallet,
		});
		this.ammBaseTokenTaxWallet =
			HeavenPoolBaseClient.generateAssociatedTokenAccountAddress(
				this.ammTaxWalletOwner[0],
				params.baseMint
			);
		this.ammQuoteTokenTaxWallet =
			HeavenPoolBaseClient.generateAssociatedTokenAccountAddress(
				this.ammTaxWalletOwner[0],
				params.quoteMint
			);
		this.ammBaseMint = params.baseMint;
		this.ammQuoteMint = params.quoteMint;

		this.userLpVault = HeavenPoolBaseClient.getUserLpTokenAccount({
			userWallet: this.userWallet,
			lpMint: this.ammLpMint[0],
		});
		this.userBaseTokenVault =
			HeavenPoolBaseClient.generateAssociatedTokenAccountAddress(
				this.userWallet,
				params.baseMint
			);
		this.userQuoteTokenVault =
			HeavenPoolBaseClient.generateAssociatedTokenAccountAddress(
				this.userWallet,
				params.quoteMint
			);
		this.connection = params.connection;
	}

	marketId: PublicKey;
	userWallet: PublicKey;
	ammId: [PublicKey, number];
	ammLpMint: [PublicKey, number];
	ammAuthority: [PublicKey, number];
	ammOpenOrders: [PublicKey, number];
	ammBaseVault: [PublicKey, number];
	ammQuoteVault: [PublicKey, number];
	ammTargetOrders: [PublicKey, number];
	ammWidrawQueue: [PublicKey, number];
	ammConfig: [PublicKey, number];
	ammLockLpVault: [PublicKey, number];
	ammLockLpVaultOwner: [PublicKey, number];
	ammBaseMint: PublicKey;
	ammQuoteMint: PublicKey;
	userWSolAtaWallet: PublicKey;

	marketAuthority: [PublicKey, Buffer[]];

	userLpVault: [PublicKey, number];
	userBaseTokenVault: [PublicKey, number];
	userQuoteTokenVault: [PublicKey, number];

	ammBaseTokenTaxWallet: [PublicKey, number];
	ammQuoteTokenTaxWallet: [PublicKey, number];
	ammTaxWalletOwner: [PublicKey, number];

	marketMetadata?: {
		marketId: PublicKey;
		requestQueue: PublicKey;
		eventQueue: PublicKey;
		bids: PublicKey;
		asks: PublicKey;
		baseVault: PublicKey;
		quoteVault: PublicKey;
		baseMint: PublicKey;
		quoteMint: PublicKey;
	};

	connection: Connection;
	initializingTransactionHash: string;

	protected get liquidityPoolAccount() {
		return HeavenPoolBaseClient.fetchLiquidityPoolAccount(
			this.ammId[0],
			this.connection
		);
	}

	static async fetchLiquidityPoolAccount(
		id: PublicKey,
		connection: Connection
	): Promise<AccountInfo<LiquidityPoolState>> {
		return HeavenPoolBaseClient.fetchAccountInfo(connection!, id).then(
			(info: any) => {
				info!.data = HeavenPoolBaseClient.metadata.ammId.layout.decode(
					info!.data
				);
				return info;
			}
		);
	}

	protected get marketAccount(): Promise<AccountInfo<OpenbookMarketState>> {
		return HeavenPoolBaseClient.fetchMarketAccount(
			this.marketId,
			this.connection!
		);
	}

	static fetchMarketAccount(
		id: PublicKey,
		connection: Connection
	): Promise<AccountInfo<OpenbookMarketState>> {
		return HeavenPoolBaseClient.fetchAccountInfo(connection, id).then(
			(info: any) => {
				info!.data =
					HeavenPoolBaseClient.metadata.marketId.layout.decode(
						info!.data
					);
				return info;
			}
		);
	}

	get openOrdersAccount(): Promise<AccountInfo<OpenOrdersState>> {
		return HeavenPoolBaseClient.fetchAccountInfo(
			this.connection!,
			this.ammOpenOrders![0]
		).then((info: any) => {
			info!.data = HeavenPoolBaseClient.metadata.openOrders.layout.decode(
				info!.data
			);
			return info;
		});
	}

	wait(ms: number = 500) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	get baseVaultAccount() {
		return getAccount(this.connection!, this.ammBaseVault![0]);
	}

	get quoteVaultAccount() {
		return getAccount(this.connection!, this.ammQuoteVault![0]);
	}

	get taxAccount() {
		return getAccount(this.connection!, this.ammBaseTokenTaxWallet![0]);
	}

	get userLpVaultAccount() {
		return getAccount(this.connection!, this.userLpVault![0]);
	}

	get adminFeeAccount() {
		return getAccount(
			this.connection!,
			HeavenPoolBaseClient.adminFeeWallet[0]
		);
	}

	get userTaxClaimWallet() {
		if (
			this.ammBaseMint!.equals(NATIVE_MINT) ||
			this.ammQuoteMint!.equals(NATIVE_MINT)
		) {
			return HeavenPoolBaseClient.generateAssociatedTokenAccountAddress(
				this.userWallet,
				NATIVE_MINT
			)[0];
		}
		throw new Error(
			'Cannot generate tax claim wallet for non-native mint.'
		);
	}

	async fetchMarketMetadata() {
		const marketAccount = await this.marketAccount;
		this.marketMetadata = {
			marketId: this.marketId,
			requestQueue: marketAccount.data.requestQueue,
			eventQueue: marketAccount.data.eventQueue,
			bids: marketAccount.data.bids,
			asks: marketAccount.data.asks,
			baseVault: marketAccount.data.baseVault,
			quoteVault: marketAccount.data.quoteVault,
			baseMint: marketAccount.data.baseMint,
			quoteMint: marketAccount.data.quoteMint,
		};
	}

	ensureMarketMetadataAvailable() {
		if (!this.marketMetadata) {
			console.log(this.marketMetadata);
			throw new Error(
				'Market metadata has not been fetched. Please call fetchMarketMetadata first.'
			);
		}
	}

	makeCreateLiquidityPoolInstruction(params: CreateLiquidityPoolInstruction) {
		params.nonce = this.ammAuthority[1];
		params.liquidity_pool_bump = this.ammId[1];
		params.open_orders_bump = this.ammOpenOrders[1];
		params.base_token_vault_bump = this.ammBaseVault[1];
		params.quote_token_vault_bump = this.ammQuoteVault[1];
		params.target_orders_bump = this.ammTargetOrders[1];
		params.protocol_config_bump = this.ammConfig[1];
		params.lock_lp_token_vault_owner_bump = this.ammLockLpVaultOwner[1];
		params.lock_lp_token_vault_bump = this.ammLockLpVault[1];
		params.base_token_swap_tax_vault_bump = this.ammBaseTokenTaxWallet[1];
		params.quote_token_swap_tax_vault_bump = this.ammQuoteTokenTaxWallet[1];
		params.swap_tax_vault_owner_bump = this.ammTaxWalletOwner[1];
		params.liquidity_provider_mint_bump = this.ammLpMint[1];
		params.user_liquidity_provider_token_vault_bump = this.userLpVault[1];
		params.user_quote_token_vault_bump = this.userQuoteTokenVault[1];
		params.user_base_token_vault_bump = this.userBaseTokenVault[1];

		return HeavenPoolBaseClient.makeCreateLiquidityPoolInstruction(
			{
				ammAuthority: this.ammAuthority![0],
				ammId: this.ammId![0],
				ammOpenOrders: this.ammOpenOrders![0],
				ammTargetOrders: this.ammTargetOrders![0],
				ammConfig: this.ammConfig![0],
				ammCoinVault: this.ammBaseVault![0],
				ammPcVault: this.ammQuoteVault![0],
				ammLpMint: this.ammLpMint![0],
				coinMint: this.ammBaseMint!,
				pcMint: this.ammQuoteMint!,
				feeDestination:
					HeavenPoolBaseClient.accounts.createPoolFeeWallet,
				marketId: this.marketId,
				marketProgramId: HeavenPoolBaseClient.programs.openbook,
				userCoinVault: this.userBaseTokenVault![0],
				userPcVault: this.userQuoteTokenVault![0],
				userWallet: this.userWallet,
				userLpVault: this.userLpVault![0],
				ammBaseTokenTaxWallet: this.ammBaseTokenTaxWallet![0],
				ammTaxWalletOwner: this.ammTaxWalletOwner![0],
				ammQuoteTokenTaxWallet: this.ammQuoteTokenTaxWallet![0],
				ammLockLpTokenVault: this.ammLockLpVault![0],
				ammLockLpTokenVaultOwner: this.ammLockLpVaultOwner![0],
			},
			params
		);
	}

	makeSwapInInstruction(
		params: {
			destination: PublicKey;
			source: PublicKey;
		} & SwapBaseInInstruction
	) {
		this.ensureMarketMetadataAvailable();

		return HeavenPoolBaseClient.makeSwapBaseInInstruction(
			{
				ammAuthority: this.ammAuthority![0],
				ammId: this.ammId![0],
				ammOpenOrders: this.ammOpenOrders![0],
				ammTargetOrders: this.ammTargetOrders![0],
				ammCoinVault: this.ammBaseVault![0],
				ammPcVault: this.ammQuoteVault![0],
				marketId: this.marketId,
				marketProgramId: HeavenPoolBaseClient.programs.openbook,
				userWallet: this.userWallet,
				adminFeeWallet: HeavenPoolBaseClient.adminFeeWallet[0],
				ammBaseTokenTaxWallet: this.ammBaseTokenTaxWallet![0],
				ammQuoteTokenTaxWallet: this.ammQuoteTokenTaxWallet![0],
				rentProgram: SYSVAR_RENT_PUBKEY,
				ataProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
				systemProgram: SystemProgram.programId,
				tokenProgram: TOKEN_PROGRAM_ID,
				userDestinationToken: params.destination,
				userSourceToken: params.source,
				marketVaultSigner: this.marketAuthority![0],
				marketAsks: this.marketMetadata!.asks,
				marketBids: this.marketMetadata!.bids,
				marketEventQueue: this.marketMetadata!.eventQueue,
				marketCoinVault: this.marketMetadata!.baseVault,
				marketPcVault: this.marketMetadata!.quoteVault,
			},
			params
		);
	}

	makeSwapOutInstruction(
		params: {
			destination: PublicKey;
			source: PublicKey;
		} & SwapBaseOutInstruction
	) {
		this.ensureMarketMetadataAvailable();
		return HeavenPoolBaseClient.makeSwapBaseOutInstruction(
			{
				ammAuthority: this.ammAuthority![0],
				ammId: this.ammId![0],
				ammOpenOrders: this.ammOpenOrders![0],
				ammTargetOrders: this.ammTargetOrders![0],
				ammCoinVault: this.ammBaseVault![0],
				ammPcVault: this.ammQuoteVault![0],
				marketId: this.marketId,
				marketProgramId: HeavenPoolBaseClient.programs.openbook,
				userWallet: this.userWallet,
				adminFeeWallet: HeavenPoolBaseClient.adminFeeWallet[0],
				ammBaseTokenTaxWallet: this.ammBaseTokenTaxWallet![0],
				ammQuoteTokenTaxWallet: this.ammQuoteTokenTaxWallet![0],
				tokenProgram: TOKEN_PROGRAM_ID,
				userDestinationToken: params.destination,
				userSourceToken: params.source,
				marketVaultSigner: this.marketAuthority![0],
				marketAsks: this.marketMetadata!.asks,
				marketBids: this.marketMetadata!.bids,
				marketEventQueue: this.marketMetadata!.eventQueue,
				marketCoinVault: this.marketMetadata!.baseVault,
				marketPcVault: this.marketMetadata!.quoteVault,
			},
			params
		);
	}

	makeClaimSwapTaxInstruction(params: ClaimSwapTaxInstruction) {
		return HeavenPoolBaseClient.makeClaimSwapTaxInstruction(
			{
				ammId: this.ammId![0],
				ammTaxWallet: this.ammBaseTokenTaxWallet![0],
				ammTaxWalletOwner: this.ammTaxWalletOwner![0],
				ammTaxWalletMint: NATIVE_MINT,
				associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
				splTokenProgram: TOKEN_PROGRAM_ID,
				systemProgram: SystemProgram.programId,
				userWallet: this.userWallet,
				userWSolAtaWallet: this.userTaxClaimWallet,
			},
			params
		);
	}

	async create(
		params: CreateLiquidityPoolInstruction,
		signer: (ix: TransactionInstruction) => Promise<VersionedTransaction>
	): Promise<HeavenPoolBaseClient> {
		const ix = this.makeCreateLiquidityPoolInstruction(params);

		const signedIx = await signer(ix);
		const txId = await this.sendTransaction(signedIx);
		this.initializingTransactionHash = txId;
		console.log('postSendTxCallback', txId);

		return this as unknown as HeavenPoolBaseClient;
	}

	async swapIn(
		params: {
			destination: PublicKey;
			source: PublicKey;
		} & SwapBaseInInstruction,
		signer: (ix: TransactionInstruction) => Promise<VersionedTransaction>
	): Promise<HeavenPoolAdminClient> {
		const ix = this.makeSwapInInstruction(params);
		const signedIx = await signer(ix);
		const txId = await this.sendTransaction(signedIx);
		this.initializingTransactionHash = txId;
		console.log('postSendTxCallback', txId);

		return this as unknown as HeavenPoolAdminClient;
	}

	private async sendTransaction(
		tx: VersionedTransaction,
		opts: {
			txConfirmationCommitment?: string;
			preflightCommitment?: string;
			maxRetries?: number;
			skipPreflight?: boolean;
			postSendTxCallback?: (tx: { txid: string }) => void;
			latestBlockhash?: string;
		} = {}
	) {
		const signature = await this.connection.sendRawTransaction(
			tx.serialize(),
			{
				skipPreflight: opts.skipPreflight || true,
				preflightCommitment: 'processed',
				maxRetries: opts.maxRetries || 3,
			}
		);

		return signature;
	}
}

interface HeavenPoolUninitializedClient {
	create: (
		params: CreateLiquidityPoolInstruction,
		signer: (ix: TransactionInstruction) => Promise<VersionedTransaction>
	) => Promise<HeavenPoolBaseClient>;
}

interface HeavenPoolFields {
	marketId: PublicKey;
	userWallet: PublicKey;
	ammId: [PublicKey, number];
	ammLpMint: [PublicKey, number];
	ammAuthority: [PublicKey, number];
	ammOpenOrders: [PublicKey, number];
	ammBaseVault: [PublicKey, number];
	ammQuoteVault: [PublicKey, number];
	ammTargetOrders: [PublicKey, number];
	ammWidrawQueue: [PublicKey, number];
	ammConfig: [PublicKey, number];
	ammLockLpVault: [PublicKey, number];
	ammLockLpVaultOwner: [PublicKey, number];
	ammBaseMint: PublicKey;
	ammQuoteMint: PublicKey;
	userWSolAtaWallet: PublicKey;

	marketAuthority: [PublicKey, Buffer[]];

	userLpVault: [PublicKey, number];
	userBaseTokenVault: [PublicKey, number];
	userQuoteTokenVault: [PublicKey, number];

	ammBaseTokenTaxWallet: [PublicKey, number];
	ammQuoteTokenTaxWallet: [PublicKey, number];
	ammTaxWalletOwner: [PublicKey, number];

	marketMetadata?: {
		marketId: PublicKey;
		requestQueue: PublicKey;
		eventQueue: PublicKey;
		bids: PublicKey;
		asks: PublicKey;
		baseVault: PublicKey;
		quoteVault: PublicKey;
		baseMint: PublicKey;
		quoteMint: PublicKey;
	};

	connection: Connection;
	initializingTransactionHash: string;
}

interface HeavenPoolAdminClient {
	swapIn: (params: {
		destination: PublicKey;
		source: PublicKey;
		amount: number;
	}) => Promise<void>;
	swapOut: (params: {
		destination: PublicKey;
		source: PublicKey;
		amount: number;
	}) => Promise<void>;
	claimSwapTax: () => Promise<void>;
}

type HeavenPoolUserClient = Omit<HeavenPoolAdminClient, 'claimSwapTax'>;

async function sleep(ms: number) {
	// const newPool = HeavenPoolBaseClient.new({
	// 	baseMint: new PublicKey(''),
	// 	connection: new Connection(''),
	// 	marketId: new PublicKey(''),
	// 	quoteMint: new PublicKey(''),
	// 	userWallet: new PublicKey(''),
	// });
	// const pool = await newPool.create(
	// 	{
	// 		buyTax: new BN(0),
	// 		sellTax: new BN(0),
	// 		coinAmount: new BN(1000_000),
	// 		pcAmount: new BN(1000_000),
	// 		lockUntil: new BN(0),
	// 		openTime: new BN(0),
	// 		nonce: 0,
	// 	},
	// 	(ix) => {}
	// );
	// pool.claimSwapTax();
}

// class HeavenPoolCalculator {
// 	static async computeMinimumAmountInForSwapOut(pool: HeavenPool) {
// 		let total_pc_without_take_pnl = 0;
// 		let total_coin_without_take_pnl = 0;

// 		const bids = [];
// 		const asks = [];

// 		const liquidityPool = await pool.liquidityPoolAccount;

// 		// Safe to convert to number
// 		const enable_orderbook = this.is_orderbook_enable(
// 			liquidityPool.data.status.toNumber()
// 		);

// 		if (enable_orderbook) {
// 			const openOrdersAccount = await pool.openOrdersAccount;
// 		}
// 	}

// 	static loadOpenOrders(openOrdersAccount: AccountInfo<OpenOrdersState>) {}

// 	static is_orderbook_enable(status: number) {
// 		switch (status) {
// 			case AmmStatus.Uninitialized:
// 				return false;
// 			case AmmStatus.Initialized:
// 				return true;
// 			case AmmStatus.Disabled:
// 				return false;
// 			case AmmStatus.WithdrawOnly:
// 				return false;
// 			case AmmStatus.LiquidityOnly:
// 				return false;
// 			case AmmStatus.OrderBookOnly:
// 				return true;
// 			case AmmStatus.SwapOnly:
// 				return false;
// 			case AmmStatus.WaitingTrade:
// 				return true;
// 			default:
// 				throw new Error('Invalid status');
// 		}
// 	}
// }

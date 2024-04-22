import {
	ASSOCIATED_TOKEN_PROGRAM_ID,
	NATIVE_MINT,
	TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
	Connection,
	PublicKey,
	SYSVAR_RENT_PUBKEY,
	SystemProgram,
	TransactionInstruction,
} from '@solana/web3.js';
import { BN } from 'bn.js';
import {
	GetStructureSchema,
	blob,
	publicKey,
	seq,
	struct,
	u128,
	u64,
	u8,
} from './data';

export enum BaseHeavenSupportedNetwork {
	localnet = 0,
	devnet = 1,
	testnet = 2,
	mainnet = 3,
}

export function AccountMeta(publicKey: PublicKey, isSigner: boolean) {
	return {
		pubkey: publicKey,
		isWritable: true,
		isSigner,
	};
}

export function AccountMetaReadonly(publicKey: PublicKey, isSigner: boolean) {
	return {
		pubkey: publicKey,
		isWritable: false,
		isSigner,
	};
}

export type LiquidityPoolStateLayout = typeof BaseHeaven.metadata.ammId.layout;
export type LiquidityPoolState = GetStructureSchema<LiquidityPoolStateLayout>;
export type OpenbookMarketStateLayout =
	typeof BaseHeaven.metadata.marketId.layout;
export type OpenbookMarketState = GetStructureSchema<OpenbookMarketStateLayout>;
export type OpenOrdersLayout = typeof BaseHeaven.metadata.openOrders.layout;
export type OpenOrdersState = GetStructureSchema<OpenOrdersLayout>;

export enum AmmStatus {
	Uninitialized = 0,
	Initialized = 1,
	Disabled = 2,
	WithdrawOnly = 3,
	// pool only can add or remove liquidity, can't swap and plan orders
	LiquidityOnly = 4,
	// pool only can add or remove liquidity and plan orders, can't swap
	OrderBookOnly = 5,
	// pool only can add or remove liquidity and swap, can't plan orders
	SwapOnly = 6,
	// pool status after created and will auto update to SwapOnly during swap after open_time
	WaitingTrade = 7,
}

export abstract class BaseHeaven {
	static AMM_ASSOCIATED_SEED = Buffer.from('amm_associated_seed', 'utf-8');
	static getAssociatedId({ marketId }: { marketId: PublicKey }) {
		return PublicKey.findProgramAddressSync(
			[
				this.AMM_PROGRAM_ID_BYTES,
				marketId.toBuffer(),
				this.AMM_ASSOCIATED_SEED,
			],
			this.programs.amm
		);
	}

	static generateAssociatedTokenAccountAddress(
		owner: PublicKey,
		mint: PublicKey
	) {
		return PublicKey.findProgramAddressSync(
			[owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
			ASSOCIATED_TOKEN_PROGRAM_ID
		);
	}

	static getUserLpTokenAccount({
		userWallet,
		lpMint,
	}: {
		userWallet: PublicKey;
		lpMint: PublicKey;
	}) {
		return this.generateAssociatedTokenAccountAddress(userWallet, lpMint);
	}

	static getAssociatedAuthority() {
		return PublicKey.findProgramAddressSync(
			[
				Buffer.from([
					97, 109, 109, 32, 97, 117, 116, 104, 111, 114, 105, 116,
					121,
				]),
			],
			this.programs.amm
		);
	}

	static getMarketAssociatedAuthority({
		marketId,
	}: {
		marketId: PublicKey;
	}): [PublicKey, Buffer[]] {
		const seeds = [marketId.toBuffer()];

		let nonce = 0;
		let publicKey: PublicKey;
		let seedsWithNonce: Buffer[];

		while (nonce < 100) {
			try {
				seedsWithNonce = seeds.concat(
					Buffer.from([nonce]),
					Buffer.alloc(7)
				);
				publicKey = PublicKey.createProgramAddressSync(
					seedsWithNonce,
					this.programs.openbook
				);
			} catch (err) {
				if (err instanceof TypeError) {
					throw err;
				}
				nonce++;
				continue;
			}
			return [publicKey, seedsWithNonce];
		}

		throw Error('unable to find a viable program address nonce');
	}

	static COIN_VAULT_ASSOCIATED_SEED = Buffer.from(
		'coin_vault_associated_seed',
		'utf-8'
	);

	static getAssociatedBaseVault({ marketId }: { marketId: PublicKey }) {
		return PublicKey.findProgramAddressSync(
			[
				this.AMM_PROGRAM_ID_BYTES,
				marketId.toBuffer(),
				this.COIN_VAULT_ASSOCIATED_SEED,
			],
			this.programs.amm
		);
	}

	static PC_VAULT_ASSOCIATED_SEED = Buffer.from(
		'pc_vault_associated_seed',
		'utf-8'
	);

	static getAssociatedQuoteVault({ marketId }: { marketId: PublicKey }) {
		return PublicKey.findProgramAddressSync(
			[
				this.AMM_PROGRAM_ID_BYTES,
				marketId.toBuffer(),
				this.PC_VAULT_ASSOCIATED_SEED,
			],
			this.programs.amm
		);
	}

	static LP_MINT_ASSOCIATED_SEED = Buffer.from(
		'lp_mint_associated_seed',
		'utf-8'
	);

	static getAssociatedLpMint({ marketId }: { marketId: PublicKey }) {
		return PublicKey.findProgramAddressSync(
			[
				this.AMM_PROGRAM_ID_BYTES,
				marketId.toBuffer(),
				this.LP_MINT_ASSOCIATED_SEED,
			],
			this.programs.amm
		);
	}

	static TEMP_LP_TOKEN_ASSOCIATED_SEED = Buffer.from(
		'temp_lp_token_associated_seed',
		'utf-8'
	);

	static getAssociatedLpVault({ marketId }: { marketId: PublicKey }) {
		return PublicKey.findProgramAddressSync(
			[
				this.AMM_PROGRAM_ID_BYTES,
				marketId.toBuffer(),
				this.TEMP_LP_TOKEN_ASSOCIATED_SEED,
			],
			this.programs.amm
		);
	}

	static TARGET_ASSOCIATED_SEED = Buffer.from(
		'target_associated_seed',
		'utf-8'
	);

	static getAssociatedTargetOrders({ marketId }: { marketId: PublicKey }) {
		return PublicKey.findProgramAddressSync(
			[
				this.AMM_PROGRAM_ID_BYTES,
				marketId.toBuffer(),
				this.TARGET_ASSOCIATED_SEED,
			],
			this.programs.amm
		);
	}

	static WITHDRAW_ASSOCIATED_SEED = Buffer.from(
		'withdraw_associated_seed',
		'utf-8'
	);

	static getAssociatedWithdrawQueue({ marketId }: { marketId: PublicKey }) {
		return PublicKey.findProgramAddressSync(
			[
				this.AMM_PROGRAM_ID_BYTES,
				marketId.toBuffer(),
				this.WITHDRAW_ASSOCIATED_SEED,
			],
			this.programs.amm
		);
	}

	static OPEN_ORDERS_ASSOCIATED_SEED = Buffer.from(
		'open_order_associated_seed',
		'utf-8'
	);
	static getAssociatedOpenOrders({ marketId }: { marketId: PublicKey }) {
		return PublicKey.findProgramAddressSync(
			[
				this.AMM_PROGRAM_ID_BYTES,
				marketId.toBuffer(),
				this.OPEN_ORDERS_ASSOCIATED_SEED,
			],
			this.programs.amm
		);
	}

	static AMM_LP_LOCK_SEED = Buffer.from('amm_lp_lock_seed', 'utf-8');

	static getAssociatedLpLockOwner({
		userWallet,
		lpMint,
	}: {
		userWallet: PublicKey;
		lpMint: PublicKey;
	}) {
		return PublicKey.findProgramAddressSync(
			[
				this.AMM_PROGRAM_ID_BYTES,
				userWallet.toBuffer(),
				lpMint.toBuffer(),
				this.AMM_LP_LOCK_SEED,
			],
			this.programs.amm
		);
	}

	static getAssociatedLpLock({
		lpMint,
		userWallet,
	}: {
		lpMint: PublicKey;
		userWallet: PublicKey;
	}) {
		return PublicKey.findProgramAddressSync(
			[
				userWallet.toBuffer(),
				TOKEN_PROGRAM_ID.toBuffer(),
				lpMint.toBuffer(),
			],
			ASSOCIATED_TOKEN_PROGRAM_ID
		);
	}

	static AMM_CONFIG_ACCOUNT_SEED = Buffer.from(
		'amm_config_account_seed',
		'utf-8'
	);

	static getAssociatedConfigId() {
		return PublicKey.findProgramAddressSync(
			[this.AMM_CONFIG_ACCOUNT_SEED],
			this.programs.amm
		);
	}

	static POOL_TAX_WALLET_SEED = Buffer.from('amm_tax_wallet_seed', 'utf-8');

	static _AMM_PROGRAM_ID_BYTES?: Buffer;

	static get AMM_PROGRAM_ID_BYTES() {
		if (this._AMM_PROGRAM_ID_BYTES) {
			return this._AMM_PROGRAM_ID_BYTES;
		}
		this._AMM_PROGRAM_ID_BYTES = this.programs.amm.toBuffer();
		return this._AMM_PROGRAM_ID_BYTES;
	}

	static getAmmTaxWalletOwner({
		ammId,
		ammOwner,
	}: {
		ammId: PublicKey;
		ammOwner: PublicKey;
	}) {
		return PublicKey.findProgramAddressSync(
			[ammId.toBuffer(), ammOwner.toBuffer(), this.POOL_TAX_WALLET_SEED],
			this.programs.amm
		);
	}

	static get adminFeeWallet() {
		return PublicKey.findProgramAddressSync(
			[
				this.accounts.createPoolFeeWallet.toBuffer(),
				TOKEN_PROGRAM_ID.toBuffer(),
				NATIVE_MINT.toBuffer(),
			],
			ASSOCIATED_TOKEN_PROGRAM_ID
		);
	}

	static instructions = {
		swapBaseIn: {
			layout: struct([
				u8('instruction'),
				u64('amountIn'),
				u64('minimumAmountOut'),
				u8('liquidity_pool_bump'),
			]),
			index: 4,
		},
		swapBaseOut: {
			layout: struct([
				u8('instruction'),
				u64('maxAmountIn'),
				u64('amountOut'),
			]),
			index: 11,
		},
		claimSwapTax: {
			layout: struct([u8('instruction'), u64('amount')]),
			index: 18,
		},
		createLiquidityPool: {
			layout: struct([
				u8('instruction'),
				u8('nonce'),
				u64('openTime'),
				u64('pcAmount'),
				u64('coinAmount'),
				u64('sellTax'),
				u64('buyTax'),
				u64('lockUntil'),
				u8('taxationMode'),
				u8('liquidity_pool_bump'),
				u8('open_orders_bump'),
				u8('base_token_vault_bump'),
				u8('quote_token_vault_bump'),
				u8('target_orders_bump'),
				u8('protocol_config_bump'),
				u8('lock_lp_token_vault_owner_bump'),
				u8('lock_lp_token_vault_bump'),
				u8('base_token_swap_tax_vault_bump'),
				u8('quote_token_swap_tax_vault_bump'),
				u8('swap_tax_vault_owner_bump'),
				u8('liquidity_provider_mint_bump'),
				u8('user_liquidity_provider_token_vault_bump'),
				u8('user_base_token_vault_bump'),
				u8('user_quote_token_vault_bump'),
			]),
			index: 0,
		},
	};

	static metadata = {
		ammId: {
			layout: struct([
				u64('status'),
				u64('nonce'),
				u64('maxOrder'),
				u64('depth'),
				u64('baseDecimal'),
				u64('quoteDecimal'),
				u64('state'),
				u64('resetFlag'),
				u64('minSize'),
				u64('volMaxCutRatio'),
				u64('amountWaveRatio'),
				u64('baseLotSize'),
				u64('quoteLotSize'),
				u64('minPriceMultiplier'),
				u64('maxPriceMultiplier'),
				u64('systemDecimalValue'),
				u64('minSeparateNumerator'),
				u64('minSeparateDenominator'),
				u64('tradeFeeNumerator'),
				u64('tradeFeeDenominator'),
				u64('pnlNumerator'),
				u64('pnlDenominator'),
				u64('swapFeeNumerator'),
				u64('swapFeeDenominator'),
				u64('baseNeedTakePnl'),
				u64('quoteNeedTakePnl'),
				u64('quoteTotalPnl'),
				u64('baseTotalPnl'),
				u64('poolOpenTime'),
				u64('punishPcAmount'),
				u64('punishCoinAmount'),
				u64('orderbookToInitTime'),
				// u128('poolTotalDepositPc'),
				// u128('poolTotalDepositCoin'),
				u128('swapBaseInAmount'),
				u128('swapQuoteOutAmount'),
				u64('swapBase2QuoteFee'),
				u128('swapQuoteInAmount'),
				u128('swapBaseOutAmount'),
				u64('swapQuote2BaseFee'),
				// amm vault
				publicKey('baseVault'),
				publicKey('quoteVault'),
				// mint
				publicKey('baseMint'),
				publicKey('quoteMint'),
				publicKey('lpMint'),
				// market
				publicKey('openOrders'),
				publicKey('marketId'),
				publicKey('marketProgramId'),
				publicKey('targetOrders'),
				publicKey('withdrawQueue'),
				publicKey('lpVault'),
				publicKey('owner'),
				// true circulating supply without lock up
				u64('lpReserve'),
				seq(u64(), 3, 'padding'),
				u64('sellTax'),
				u64('buyTax'),
				u64('lockUntil'),
				publicKey('updaterAuthority'),
			]),
		},
		marketId: {
			layout: struct([
				blob(5),

				blob(8), // accountFlagsLayout('accountFlags'),

				publicKey('ownAddress'),

				u64('vaultSignerNonce'),

				publicKey('baseMint'),
				publicKey('quoteMint'),

				publicKey('baseVault'),
				u64('baseDepositsTotal'),
				u64('baseFeesAccrued'),

				publicKey('quoteVault'),
				u64('quoteDepositsTotal'),
				u64('quoteFeesAccrued'),

				u64('quoteDustThreshold'),

				publicKey('requestQueue'),
				publicKey('eventQueue'),

				publicKey('bids'),
				publicKey('asks'),

				u64('baseLotSize'),
				u64('quoteLotSize'),

				u64('feeRateBps'),

				u64('referrerRebatesAccrued'),

				blob(7),
			]),
		},
		openOrders: {
			layout: struct([
				u64('account_flags'),
				seq(u64(), 4, 'market'),
				seq(u64(), 4, 'owner'),

				u64('native_coin_fee'),
				u64('native_coin_total'),

				u64('native_pc_fee'),
				u64('native_pc_total'),

				u128('free_slot_bits'),
				u128('is_bid_bits'),
				seq(u128(), 128, 'orders'),

				seq(u64(), 128, 'client_order_ids'),
				u64('referrer_rebates_accrued'),
			]),
		},
	};

	static async fetchAccountInfo(
		connection: Connection,
		publicKey: PublicKey
	) {
		return connection.getAccountInfo(publicKey);
	}

	static makeSwapBaseInInstruction(
		accounts: SwapBaseInInstructionAccounts,
		instruction: SwapBaseInInstruction
	) {
		const data = Buffer.alloc(this.instructions.swapBaseIn.layout.span);
		this.instructions.swapBaseIn.layout.encode(
			{
				instruction: this.instructions.swapBaseIn.index,
				amountIn: instruction.amountIn,
				minimumAmountOut: instruction.minimumAmountOut,
				liquidity_pool_bump: instruction.liquidity_pool_bump,
			},
			data
		);

		const keys = [
			AccountMetaReadonly(accounts.tokenProgram, false),
			AccountMetaReadonly(accounts.ataProgram, false),
			AccountMetaReadonly(accounts.systemProgram, false),
			AccountMetaReadonly(accounts.rentProgram, false),
			AccountMeta(accounts.ammId, false),
			AccountMetaReadonly(accounts.ammAuthority, false),
			AccountMeta(accounts.ammOpenOrders, false),
			AccountMeta(accounts.ammTargetOrders, false),
			AccountMeta(accounts.ammCoinVault, false),
			AccountMeta(accounts.ammPcVault, false),
			AccountMetaReadonly(accounts.marketProgramId, false),
			AccountMeta(accounts.marketId, false),
			AccountMeta(accounts.marketBids, false),
			AccountMeta(accounts.marketAsks, false),
			AccountMeta(accounts.marketEventQueue, false),
			AccountMeta(accounts.marketCoinVault, false),
			AccountMeta(accounts.marketPcVault, false),
			AccountMetaReadonly(accounts.marketVaultSigner, false),
			AccountMeta(accounts.userSourceToken, false),
			AccountMeta(accounts.userDestinationToken, false),
			AccountMetaReadonly(accounts.userWallet, true),
			AccountMeta(accounts.ammBaseTokenTaxWallet, false),
			AccountMeta(accounts.ammQuoteTokenTaxWallet, false),
			AccountMeta(accounts.adminFeeWallet, false),
		];

		return new TransactionInstruction({
			programId: this.programs.amm,
			keys,
			data,
		});
	}

	static makeSwapBaseOutInstruction(
		accounts: SwapBaseOutInstructionAccounts,
		instruction: SwapBaseOutInstruction
	) {
		const data = Buffer.alloc(this.instructions.swapBaseOut.layout.span);
		this.instructions.swapBaseOut.layout.encode(
			{
				instruction: this.instructions.swapBaseOut.index,
				maxAmountIn: instruction.maxAmountIn,
				amountOut: instruction.amountOut,
			},
			data
		);

		const keys = [
			AccountMetaReadonly(accounts.tokenProgram, false),
			AccountMeta(accounts.ammId, false),
			AccountMetaReadonly(accounts.ammAuthority, false),
			AccountMeta(accounts.ammOpenOrders, false),
			AccountMeta(accounts.ammTargetOrders, false),
			AccountMeta(accounts.ammCoinVault, false),
			AccountMeta(accounts.ammPcVault, false),
			AccountMetaReadonly(accounts.marketProgramId, false),
			AccountMeta(accounts.marketId, false),
			AccountMeta(accounts.marketBids, false),
			AccountMeta(accounts.marketAsks, false),
			AccountMeta(accounts.marketEventQueue, false),
			AccountMeta(accounts.marketCoinVault, false),
			AccountMeta(accounts.marketPcVault, false),
			AccountMetaReadonly(accounts.marketVaultSigner, false),
			AccountMeta(accounts.userSourceToken, false),
			AccountMeta(accounts.userDestinationToken, false),
			AccountMetaReadonly(accounts.userWallet, true),
			AccountMeta(accounts.ammBaseTokenTaxWallet, false),
			AccountMeta(accounts.ammQuoteTokenTaxWallet, false),
			AccountMeta(accounts.adminFeeWallet, false),
		];

		return new TransactionInstruction({
			programId: this.programs.amm,
			keys,
			data,
		});
	}

	static makeCreateConfigInstruction(
		accounts: CreateConfigInstructionAccounts
	) {
		const keys = [
			AccountMetaReadonly(accounts.protocolAdmin, true),
			AccountMeta(accounts.protocolConfig, false),
			AccountMetaReadonly(accounts.protocolAdmin, false),
			AccountMeta(accounts.systemProgram, false),
			AccountMeta(accounts.rentProgram, false),
		];

		return new TransactionInstruction({
			programId: this.programs.amm,
			keys,
			data: Buffer.from([6]),
		});
	}

	static makeClaimSwapTaxInstruction(
		accounts: ClaimSwapTaxInstructionAccounts,
		instruction: ClaimSwapTaxInstruction
	) {
		const data = Buffer.alloc(this.instructions.claimSwapTax.layout.span);
		this.instructions.claimSwapTax.layout.encode(
			{
				instruction: this.instructions.claimSwapTax.index,
				amount: instruction.amount,
			},
			data
		);

		const keys = [
			AccountMeta(accounts.ammId, false),
			AccountMeta(accounts.ammTaxWallet, false),
			AccountMetaReadonly(accounts.ammTaxWalletOwner, false),
			AccountMeta(accounts.userWSolAtaWallet, false),
			AccountMetaReadonly(accounts.userWallet, true),
			AccountMeta(accounts.ammTaxWalletMint, false),
			AccountMetaReadonly(accounts.splTokenProgram, false),
			AccountMetaReadonly(accounts.associatedTokenProgram, false),
			AccountMetaReadonly(accounts.systemProgram, false),
		];

		return new TransactionInstruction({
			programId: this.programs.amm,
			keys,
			data,
		});
	}

	static makeCreateLiquidityPoolInstruction(
		accounts: CreateLiquidityPoolInstructionAccounts,
		instruction: CreateLiquidityPoolInstruction
	) {
		const data = Buffer.alloc(
			this.instructions.createLiquidityPool.layout.span
		);
		this.instructions.createLiquidityPool.layout.encode(
			{
				instruction: this.instructions.createLiquidityPool.index,
				nonce: instruction.nonce!,
				openTime: instruction.openTime,
				pcAmount: instruction.pcAmount,
				coinAmount: instruction.coinAmount,
				sellTax: instruction.sellTax,
				buyTax: instruction.buyTax,
				lockUntil: instruction.lockUntil,
				taxationMode: instruction.taxationMode,
				liquidity_pool_bump: instruction.liquidity_pool_bump,
				open_orders_bump: instruction.open_orders_bump,
				base_token_vault_bump: instruction.base_token_vault_bump,
				quote_token_vault_bump: instruction.quote_token_vault_bump,
				target_orders_bump: instruction.target_orders_bump,
				protocol_config_bump: instruction.protocol_config_bump,
				lock_lp_token_vault_owner_bump:
					instruction.lock_lp_token_vault_owner_bump,
				lock_lp_token_vault_bump: instruction.lock_lp_token_vault_bump,
				base_token_swap_tax_vault_bump:
					instruction.base_token_swap_tax_vault_bump,
				quote_token_swap_tax_vault_bump:
					instruction.quote_token_swap_tax_vault_bump,
				swap_tax_vault_owner_bump:
					instruction.swap_tax_vault_owner_bump,
				liquidity_provider_mint_bump:
					instruction.liquidity_provider_mint_bump,
				user_liquidity_provider_token_vault_bump:
					instruction.user_liquidity_provider_token_vault_bump,
				user_quote_token_vault_bump:
					instruction.user_quote_token_vault_bump,
				user_base_token_vault_bump:
					instruction.user_base_token_vault_bump,
			},
			data
		);

		const keys = [
			{ pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
			{
				pubkey: ASSOCIATED_TOKEN_PROGRAM_ID,
				isSigner: false,
				isWritable: false,
			},
			{
				pubkey: SystemProgram.programId,
				isSigner: false,
				isWritable: false,
			},
			{ pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
			{ pubkey: accounts.ammId, isSigner: false, isWritable: true },
			{
				pubkey: accounts.ammAuthority,
				isSigner: false,
				isWritable: false,
			},
			{
				pubkey: accounts.ammOpenOrders,
				isSigner: false,
				isWritable: true,
			},
			{ pubkey: accounts.ammLpMint, isSigner: false, isWritable: true },
			{ pubkey: accounts.coinMint, isSigner: false, isWritable: false },
			{ pubkey: accounts.pcMint, isSigner: false, isWritable: false },
			{
				pubkey: accounts.ammCoinVault,
				isSigner: false,
				isWritable: true,
			},
			{ pubkey: accounts.ammPcVault, isSigner: false, isWritable: true },
			{
				pubkey: accounts.ammTargetOrders,
				isSigner: false,
				isWritable: true,
			},
			{ pubkey: accounts.ammConfig, isSigner: false, isWritable: false },
			{
				pubkey: accounts.feeDestination,
				isSigner: false,
				isWritable: true,
			},
			{
				pubkey: accounts.marketProgramId,
				isSigner: false,
				isWritable: false,
			},
			{ pubkey: accounts.marketId, isSigner: false, isWritable: false },
			{ pubkey: accounts.userWallet, isSigner: true, isWritable: true },
			{
				pubkey: accounts.userCoinVault,
				isSigner: false,
				isWritable: true,
			},
			{ pubkey: accounts.userPcVault, isSigner: false, isWritable: true },
			{ pubkey: accounts.userLpVault, isSigner: false, isWritable: true },
			{
				pubkey: accounts.ammLockLpTokenVault,
				isSigner: false,
				isWritable: true,
			},
			{
				pubkey: accounts.ammLockLpTokenVaultOwner,
				isSigner: false,
				isWritable: true,
			},
			{
				pubkey: accounts.ammBaseTokenTaxWallet,
				isSigner: false,
				isWritable: true,
			},
			{
				pubkey: accounts.ammQuoteTokenTaxWallet,
				isSigner: false,
				isWritable: true,
			},
			{
				pubkey: accounts.ammTaxWalletOwner,
				isSigner: false,
				isWritable: false,
			},
		];

		return new TransactionInstruction({
			keys,
			programId: this.programs.amm,
			data,
		});
	}

	static network = BaseHeavenSupportedNetwork.mainnet;

	static get programs() {
		return this._programs[this.network];
	}

	static _programs = {
		[BaseHeavenSupportedNetwork.localnet]: {
			openbook: new PublicKey(
				'4Dmzf8YgoBmoTKkEYkVzdKUgXZuWosP9UuWqLbiJQeuw'
			),
			amm: new PublicKey('5UcVozcPMkEXibeRkKqyfZS9dkoCrKB3T2Qo6VY91nPf'),
		},
		[BaseHeavenSupportedNetwork.devnet]: {
			openbook: new PublicKey(
				'4Dmzf8YgoBmoTKkEYkVzdKUgXZuWosP9UuWqLbiJQeuw'
			),
			amm: new PublicKey('5UcVozcPMkEXibeRkKqyfZS9dkoCrKB3T2Qo6VY91nPf'),
		},
		[BaseHeavenSupportedNetwork.testnet]: {
			openbook: new PublicKey(
				'4Dmzf8YgoBmoTKkEYkVzdKUgXZuWosP9UuWqLbiJQeuw'
			),
			amm: new PublicKey('5UcVozcPMkEXibeRkKqyfZS9dkoCrKB3T2Qo6VY91nPf'),
		},
		[BaseHeavenSupportedNetwork.mainnet]: {
			openbook: new PublicKey(
				'4Dmzf8YgoBmoTKkEYkVzdKUgXZuWosP9UuWqLbiJQeuw'
			),
			amm: new PublicKey('5UcVozcPMkEXibeRkKqyfZS9dkoCrKB3T2Qo6VY91nPf'),
		},
	};

	static get accounts() {
		return this._accounts[this.network];
	}

	static _accounts = {
		[BaseHeavenSupportedNetwork.localnet]: {
			createPoolFeeWallet: new PublicKey(
				'3aRNvLXMT7MVpz6gaM9DSn9RAfh9KCB2DjWPq3bJKysm'
			),
			ammProgramOwner: new PublicKey(
				'3aRNvLXMT7MVpz6gaM9DSn9RAfh9KCB2DjWPq3bJKysm'
			),
		},
		[BaseHeavenSupportedNetwork.devnet]: {
			createPoolFeeWallet: new PublicKey(
				'3aRNvLXMT7MVpz6gaM9DSn9RAfh9KCB2DjWPq3bJKysm'
			),
			ammProgramOwner: new PublicKey(
				'3aRNvLXMT7MVpz6gaM9DSn9RAfh9KCB2DjWPq3bJKysm'
			),
		},
		[BaseHeavenSupportedNetwork.testnet]: {
			createPoolFeeWallet: new PublicKey(
				'3aRNvLXMT7MVpz6gaM9DSn9RAfh9KCB2DjWPq3bJKysm'
			),
			ammProgramOwner: new PublicKey(
				'3aRNvLXMT7MVpz6gaM9DSn9RAfh9KCB2DjWPq3bJKysm'
			),
		},
		[BaseHeavenSupportedNetwork.mainnet]: {
			createPoolFeeWallet: new PublicKey(
				'3aRNvLXMT7MVpz6gaM9DSn9RAfh9KCB2DjWPq3bJKysm'
			),
			ammProgramOwner: new PublicKey(
				'3aRNvLXMT7MVpz6gaM9DSn9RAfh9KCB2DjWPq3bJKysm'
			),
		},
	};
}

const _BN = new BN(0);

export type BNType = typeof _BN;

export type SwapBaseOutInstruction = {
	amountOut: BNType;
	maxAmountIn: BNType;
};

export type SwapBaseInInstruction = {
	amountIn: BNType;
	minimumAmountOut: BNType;
	liquidity_pool_bump: number;
};

export type ClaimSwapTaxInstruction = {
	amount: BNType;
};

export type CreateLiquidityPoolInstruction = {
	openTime: BNType;
	pcAmount: BNType;
	coinAmount: BNType;
	sellTax: BNType;
	buyTax: BNType;
	lockUntil: BNType;
	nonce?: number;
	taxationMode: number;
	liquidity_pool_bump?: number;
	open_orders_bump?: number;
	base_token_vault_bump?: number;
	quote_token_vault_bump?: number;
	target_orders_bump?: number;
	protocol_config_bump?: number;
	lock_lp_token_vault_owner_bump?: number;
	lock_lp_token_vault_bump?: number;
	base_token_swap_tax_vault_bump?: number;
	quote_token_swap_tax_vault_bump?: number;
	swap_tax_vault_owner_bump?: number;
	liquidity_provider_mint_bump?: number;
	user_liquidity_provider_token_vault_bump?: number;
	user_quote_token_vault_bump?: number;
	user_base_token_vault_bump?: number;
};

export type CreateLiquidityPoolInstructionAccounts = {
	ammId: PublicKey;
	ammAuthority: PublicKey;
	ammOpenOrders: PublicKey;
	ammLpMint: PublicKey;
	coinMint: PublicKey;
	pcMint: PublicKey;
	ammCoinVault: PublicKey;
	ammPcVault: PublicKey;
	ammTargetOrders: PublicKey;
	marketProgramId: PublicKey;
	marketId: PublicKey;
	userWallet: PublicKey;
	userCoinVault: PublicKey;
	userPcVault: PublicKey;
	userLpVault: PublicKey;
	ammConfig: PublicKey;
	feeDestination: PublicKey;
	ammBaseTokenTaxWallet: PublicKey;
	ammQuoteTokenTaxWallet: PublicKey;
	ammTaxWalletOwner: PublicKey;
	ammLockLpTokenVaultOwner: PublicKey;
	ammLockLpTokenVault: PublicKey;
};

export type ClaimSwapTaxInstructionAccounts = {
	ammId: PublicKey;
	ammTaxWallet: PublicKey;
	ammTaxWalletOwner: PublicKey;
	userWSolAtaWallet: PublicKey;
	userWallet: PublicKey;
	ammTaxWalletMint: PublicKey;
	splTokenProgram: PublicKey;
	associatedTokenProgram: PublicKey;
	systemProgram: PublicKey;
};

export type CreateConfigInstructionAccounts = {
	protocolAdmin: PublicKey;
	protocolConfig: PublicKey;
	protocolProfitAndLossOwner: PublicKey;
	systemProgram: PublicKey;
	rentProgram: PublicKey;
};

export type SwapBaseOutInstructionAccounts = {
	tokenProgram: PublicKey;
	ammId: PublicKey;
	ammAuthority: PublicKey;
	ammOpenOrders: PublicKey;
	ammTargetOrders: PublicKey;
	ammCoinVault: PublicKey;
	ammPcVault: PublicKey;
	marketProgramId: PublicKey;
	marketId: PublicKey;
	marketBids: PublicKey;
	marketAsks: PublicKey;
	marketEventQueue: PublicKey;
	marketCoinVault: PublicKey;
	marketPcVault: PublicKey;
	marketVaultSigner: PublicKey;
	userSourceToken: PublicKey;
	userDestinationToken: PublicKey;
	userWallet: PublicKey;
	ammBaseTokenTaxWallet: PublicKey;
	ammQuoteTokenTaxWallet: PublicKey;
	adminFeeWallet: PublicKey;
};

export type SwapBaseInInstructionAccounts = {
	tokenProgram: PublicKey;
	ataProgram: PublicKey;
	systemProgram: PublicKey;
	rentProgram: PublicKey;
	ammId: PublicKey;
	ammAuthority: PublicKey;
	ammOpenOrders: PublicKey;
	ammTargetOrders: PublicKey;
	ammCoinVault: PublicKey;
	ammPcVault: PublicKey;
	marketProgramId: PublicKey;
	marketId: PublicKey;
	marketBids: PublicKey;
	marketAsks: PublicKey;
	marketEventQueue: PublicKey;
	marketCoinVault: PublicKey;
	marketPcVault: PublicKey;
	marketVaultSigner: PublicKey;
	userSourceToken: PublicKey;
	userDestinationToken: PublicKey;
	userWallet: PublicKey;
	ammBaseTokenTaxWallet: PublicKey;
	ammQuoteTokenTaxWallet: PublicKey;
	adminFeeWallet: PublicKey;
};

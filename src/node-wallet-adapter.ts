/* eslint-disable @typescript-eslint/brace-style */
import type {
	SendTransactionOptions,
	WalletName,
} from '@solana/wallet-adapter-base';
import {
	BaseMessageSignerWalletAdapter,
	WalletReadyState,
} from '@solana/wallet-adapter-base';
import type {
	Connection,
	Keypair,
	Transaction,
	TransactionSignature,
	TransactionVersion,
	VersionedTransaction,
} from '@solana/web3.js';
import { sendAndConfirmTransaction } from '@solana/web3.js';
import nacl from 'tweetnacl';

export const NodeWalletName = 'NodeWallet' as WalletName<'NodeWallet'>;

export class NodeWalletAdapter extends BaseMessageSignerWalletAdapter {
	name = NodeWalletName;
	url = '';
	icon = '';
	supportedTransactionVersions: ReadonlySet<TransactionVersion> = new Set([
		'legacy',
	]);

	private _keypair: Keypair;

	constructor(keypair: Keypair) {
		super();
		this._keypair = keypair;
	}

	get publicKey() {
		return this._keypair.publicKey;
	}

	get connecting() {
		return false;
	}

	get readyState() {
		return WalletReadyState.Installed;
	}

	async autoConnect(): Promise<void> {}

	async connect(): Promise<void> {}

	async disconnect(): Promise<void> {}

	async sendTransaction<T extends Transaction | VersionedTransaction>(
		transaction: T,
		connection: Connection,
		options: SendTransactionOptions = {}
	): Promise<TransactionSignature> {
		const signature = await sendAndConfirmTransaction(
			connection,
			transaction as Transaction,
			[this._keypair],
			options
		);
		return signature;
	}

	async signTransaction<T extends Transaction | VersionedTransaction>(
		transaction: T
	): Promise<T> {
		(transaction as Transaction).sign(this._keypair);
		return transaction;
	}

	async signAllTransactions<T extends Transaction | VersionedTransaction>(
		transactions: T[]
	): Promise<T[]> {
		return transactions.map((transaction) => {
			(transaction as Transaction).sign(this._keypair);
			return transaction;
		});
	}

	async signMessage(message: Uint8Array): Promise<Uint8Array> {
		const signature = nacl.sign.detached(message, this._keypair.secretKey);
		nacl.sign.detached.verify(message, signature, this.publicKey.toBytes());
		return signature;
	}
}

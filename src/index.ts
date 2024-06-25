/* eslint-disable @typescript-eslint/brace-style */
export * from './heaven';
export * from './idl';
export * from '@metaplex-foundation/umi';
import * as _anchor from '@coral-xyz/anchor';

export const anchor = _anchor;
export * from './node-wallet-adapter';
import * as spl_token from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import {
	ProtocolSwapFeeDirection,
	SwapDirection,
	TaxationMode,
} from 'heaven-wasm-sdk';
import { HeavenSupportedStableCoinMint } from './heaven';
export const splToken = spl_token;

export const parseTaxationMode = (name: string) => {
	switch (name) {
		case 'base':
			return TaxationMode.Base;
		case 'quote':
			return TaxationMode.Quote;
		case 'none':
			return TaxationMode.None;
		default:
			throw new Error('Invalid taxation mode');
	}
};

export const taxationModeLabel = (mode: TaxationMode) => {
	switch (mode) {
		case TaxationMode.Base:
			return 'Base';
		case TaxationMode.Quote:
			return 'Quote';
		case TaxationMode.None:
			return 'None';
		default:
			throw new Error('Invalid taxation mode');
	}
};

export const protocolSwapFeeDirectionLabel = (
	direction: ProtocolSwapFeeDirection
) => {
	switch (direction) {
		case ProtocolSwapFeeDirection.Base:
			return 'Base';
		case ProtocolSwapFeeDirection.Quote:
			return 'Quote';
		case ProtocolSwapFeeDirection.None:
			return 'None';
		default:
			throw new Error('Invalid protocol swap fee direction');
	}
};

export const swapDirectionLabel = (direction: SwapDirection) => {
	switch (direction) {
		case SwapDirection.Base2Quote:
			return 'Base to Quote';
		case SwapDirection.Quote2Base:
			return 'Quote to Base';
		default:
			throw new Error('Invalid swap direction');
	}
};

export const parseProtocolSwapFeeDirection = (
	base_mint: PublicKey,
	quote_mint: PublicKey,
	swapDirection: SwapDirection
): ProtocolSwapFeeDirection => {
	const base_coin =
		HeavenSupportedStableCoinMint[
			base_mint.toBase58() as keyof typeof HeavenSupportedStableCoinMint
		];
	const quote_coin =
		HeavenSupportedStableCoinMint[
			quote_mint.toBase58() as keyof typeof HeavenSupportedStableCoinMint
		];

	if (base_coin != null && quote_coin != null) {
		if (swapDirection == SwapDirection.Base2Quote) {
			return ProtocolSwapFeeDirection.Base;
		} else {
			return ProtocolSwapFeeDirection.Quote;
		}
	} else if (base_coin != null && quote_coin == null) {
		return ProtocolSwapFeeDirection.Base;
	} else if (base_coin == null && quote_coin != null) {
		return ProtocolSwapFeeDirection.Quote;
	} else {
		return ProtocolSwapFeeDirection.None;
	}
};

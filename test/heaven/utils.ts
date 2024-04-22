import { AddressLookupTableAccount, Keypair, RpcResponseAndContext, TransactionInstruction } from '@solana/web3.js'
import { ProviderType } from './config'

import { MessageV0, VersionedTransaction } from '@solana/web3.js'
export const log = console.log

export type SignedTransactionPayload = {
  versionedTransaction: VersionedTransaction
  latestBlockhash: RecentBlockhash
  lastValidBlockHeight: number
}

export type RecentBlockhash = RpcResponseAndContext<
  Readonly<{
    blockhash: string
    lastValidBlockHeight: number
  }>
>

export async function signTransaction(
  provider: ProviderType,
  payer: Keypair,
  ixs: TransactionInstruction[],
  alts: AddressLookupTableAccount[] = [],
  opts: {
    additionalSigners?: Keypair[]
    latestBlockhash?: RecentBlockhash
  } = {},
) {
  const latestBlockhash = opts?.latestBlockhash ?? (await provider.connection.connection.getLatestBlockhashAndContext())
  const lastValidBlockHeight = latestBlockhash.context.slot + 150

  const message = MessageV0.compile({
    payerKey: payer.publicKey,
    instructions: ixs,
    recentBlockhash: latestBlockhash.value.blockhash,
    addressLookupTableAccounts: alts,
  })
  log(
    'signer',
    '  ### DEBUG Signed and encoded transaction size: ' + Buffer.from(message.serialize()).toString('base64').length,
  )
  const vtx = new VersionedTransaction(message)

  if (opts?.additionalSigners !== undefined && opts?.additionalSigners.length !== 0) {
    log('signer', '  ### DEBUG Signing with additional signers: ' + opts.additionalSigners.length)
    vtx.sign([...(opts?.additionalSigners ?? [])])
  }

  vtx.sign([payer])

  return {
    versionedTransaction: vtx,
    latestBlockhash,
    lastValidBlockHeight,
  }
}

export async function sendTransaction(
  provider: ProviderType,
  tx: VersionedTransaction,
  opts: {
    txConfirmationCommitment?: string
    preflightCommitment?: string
    maxRetries?: number
    skipPreflight?: boolean
    postSendTxCallback?: (tx: { txid: string }) => void
    latestBlockhash?: string
  } = {},
) {
  const maxRetries = opts.maxRetries || 3 // Default to 3 retries if not specified
  // Serialize and send the transaction
  const signature = await provider.connection.connection.sendRawTransaction(tx.serialize(), {
    skipPreflight: opts.skipPreflight || true,
    preflightCommitment: 'confirmed',
    maxRetries,
  })

  // Optional callback after sending
  if (opts?.postSendTxCallback) {
    try {
      opts.postSendTxCallback({ txid: signature })
    } catch (e) {
      console.warn(`postSendTxCallback error`, e)
    }
  }

  const { blockhash, lastValidBlockHeight } = await provider.connectionReadOnly.connection.getLatestBlockhash(
    'processed',
  )

  // Wait for confirmation
  const confirmation = await provider.connection.connection.confirmTransaction(
    {
      signature,
      blockhash,
      lastValidBlockHeight,
    },
    'confirmed',
  )

  if (confirmation.value.err) {
    console.warn('Transaction error:', confirmation.value.err)
    throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`)
  }

  // Transaction confirmed successfully
  return signature
}

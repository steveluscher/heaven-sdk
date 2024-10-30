# Heaven

## Usage
```bash
npm install heaven-sdk
```

## Bundler
If you are using a bundler like Webpack or Vite, you will need to add the following configuration to your project.
### Vite (`vite.config.ts`)
```typescript
import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    wasm(),
    topLevelAwait(),
    nodePolyfills({
      exclude: ["fs"],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
    // crossOriginIsolation()
  ],
  worker: {
    plugins: () => [
      wasm(),
      topLevelAwait(),
      nodePolyfills({
        exclude: ["fs"],
        // Whether to polyfill specific globals.
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
      }),
    ],
  },
  resolve: {
    alias: {
      process: "process/browser",
      path: "path-browserify",
      os: "os-browserify",
      stream: "stream-browserify",
    },
  },
});
```

### Webpack (`webpack.config.js`) ([example](https://github.com/rustwasm/rust-webpack-template/blob/master/template/webpack.config.js))
```javascript
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",
  entry: {
    index: "./js/index.js"
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  devServer: {
    contentBase: dist,
  },
  plugins: [
    new CopyPlugin([
      path.resolve(__dirname, "static")
    ]),

    new WasmPackPlugin({
      crateDirectory: __dirname,
    }),
  ]
};
```

# Quick Start

## Install Dependencies
```bash
npm i @solana/web3.js@1 @solana/spl-token bn.js heaven-sdk
```

## Setup

#### 1. Import Dependencies
```typescript
import {
 ComputeBudgetProgram,
 Connection,
 Keypair,
 LAMPORTS_PER_SOL,
 PublicKey,
 SystemProgram,
 Transaction,
 sendAndConfirmTransaction,
} from "@solana/web3.js";
import { BN } from "bn.js";
import { Heaven } from "heaven-sdk";
import {
 AuthorityType,
 createAssociatedTokenAccountInstruction,
 createInitializeMintInstruction,
 createMintToCheckedInstruction,
 createSetAuthorityInstruction,
 createSyncNativeInstruction,
 getAssociatedTokenAddressSync,
 getMinimumBalanceForRentExemptMint,
 MINT_SIZE,
 NATIVE_MINT,
 TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
```

#### 2. Create a wallet
```typescript
const creator = Keypair.generate();
```

#### 3. Create an RPC connection
```typescript
const connection = new Connection(
 // Replace with your preferred Solana RPC endpoint
 "https://api.devnet.solana.com", 
 "confirmed"
);
```

#### 4. Request Airdrop
```typescript
const signature = await connection.requestAirdrop(
 creator.publicKey,
 3 * LAMPORTS_PER_SOL
);
await connection.confirmTransaction(signature);
```

## Create a Token
```typescript
const mint = Keypair.generate();
const decimals = 9;
const amount = 1000_000_000 * 10 ** decimals; // Mint 1 Billion tokens

const tokenAccount = getAssociatedTokenAddressSync(
 mint.publicKey,
 creator.publicKey,
 false,
 TOKEN_PROGRAM_ID
);

const tx = new Transaction().add(
 // Create mint account
 SystemProgram.createAccount({
  fromPubkey: creator.publicKey,
  newAccountPubkey: mint.publicKey,
  space: MINT_SIZE,
  lamports: await getMinimumBalanceForRentExemptMint(connection),
  programId: TOKEN_PROGRAM_ID,
 }),
 // Create a new token
 createInitializeMintInstruction(
  mint.publicKey, // mint pubkey
  decimals, // decimals
  creator.publicKey, // mint authority
  null // freeze authority (you can use `null` to disable it. when you disable it, you can't turn it on again)
 ),
 // Create a new token account to receive the minted tokens
 createAssociatedTokenAccountInstruction(
  creator.publicKey, // payer
  tokenAccount, // ata
  creator.publicKey, // owner
  mint.publicKey // mint
 ),
 // Mint tokens to the token account
 createMintToCheckedInstruction(
  mint.publicKey, // mint
  tokenAccount, // receiver (should be a token account)
  creator.publicKey, // mint authority
  amount, // amount. if your decimals is 8, you mint 10^8 for 1 token.
  decimals // decimals
 ),
 // Optionally, revoke the mint authority
 createSetAuthorityInstruction(
  mint.publicKey, // mint acocunt || token account
  creator.publicKey, // current auth
  AuthorityType.MintTokens, // authority type
  null // new auth (you can pass `null` to close it)
 )
);

await sendAndConfirmTransaction(connection, tx, [creator, mint], {
 commitment: "confirmed",
});
```

## Prepare WSOL
```typescript
const wsolTokenAccount = getAssociatedTokenAddressSync(
 NATIVE_MINT,
 creator.publicKey,
 false,
 TOKEN_PROGRAM_ID
);

const tx2 = new Transaction().add(
 createAssociatedTokenAccountInstruction(
  creator.publicKey,
  wsolTokenAccount,
  creator.publicKey,
  NATIVE_MINT
 ),
 SystemProgram.transfer({
  fromPubkey: creator.publicKey,
  toPubkey: wsolTokenAccount,
  lamports: 2 * LAMPORTS_PER_SOL,
 }),
 createSyncNativeInstruction(wsolTokenAccount, TOKEN_PROGRAM_ID)
);
await sendAndConfirmTransaction(connection, tx2, [creator], {
 commitment: "confirmed",
});
```

## Create a Pool
```typescript
// Initialize a new liquidity pool
const pool = await Heaven.new({
 base: mint.publicKey, // The token we created;
 quote: NATIVE_MINT, // WSOL;
 connection: connection,
 payer: creator.publicKey,
 network: "devnet",
 // Optional: If you want to use a custom program ID
 // programId: new PublicKey('...'), // Insert the program ID
});

// This will create a new liquidity pool with the following parameters:
// - 1 SOL
// - 1000,000 of the token we created
// - 1% sell tax -> Swapping from base to quote token
// - 0.25% buy tax -> Swapping from quote to base token
// - Lock liquidity for 60 seconds
// - Open pool 5 seconds after creation
// - And only allowing pool creator to add additional liquidity
const ix = await pool.createIx({
 // amount of base token to deposit
 baseAmount: new BN(1000_000 * 10 ** pool.baseTokenMintDecimals),
 // amount of quote token to deposit
 quoteAmount: new BN(1 * 10 ** pool.quoteTokenMintDecimals),
 // sellTax BPS = 100 / 10000 * 100 = 1%;
 sellTax: new BN(100),
 // buyTax BPS = 25 / 10000 * 100 = 0.25%;
 buyTax: new BN(25),
 // locking liquidity
 lp: "lock", // or 'burn' to burn LP tokens
 // Lock liquidity for 60 seconds
 lockLiquidityUntil: new Date(new Date().getTime() + 60 * 1000),
 // Open pool 5 seconds after creation
 openPoolAt: new Date(new Date().getTime() + 5 * 1000),
 // [OPTIONAL]: The contract will emit this event when the pool is created
 event: "",
 // [OPTIONAL]: Only allow pool creatot to add additional liquidity.
 // Default is `false`.
 // Important: This cannot be changed after pool creation.
 // Setting this to `true` will only allow the pool creator to collect swap fees without pulling
 // all the liquidity from the pool.
 disableNonCreatorAddLiquidity: true,
});

const id = pool.subscribeCustomEvent((event, poolId, instruction) => {
 console.log("Custom event:", event, poolId, instruction);
});

// Don't forget to unsubscribe from the custom event when you no longer need it
await pool.unsubscribe(id);

const createPoolTx = await sendAndConfirmTransaction(
 connection,
 new Transaction().add(
  // Creating a new pool uses more than the default 200K compute units
  // so we need to increase the compute unit limit
  // to avoid the transaction failing with an error
  ComputeBudgetProgram.setComputeUnitLimit({
   units: 300000,
  }),
  ix
 ),
 [creator],
 {
  commitment: "confirmed",
 }
);
```

## Swap
```typescript
console.log("Waiting for the pool to open...");
await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

console.log("Swapping 0.01 SOL for as much tokens as possible...");
const swapInAmount = new BN(0.01 * 10 ** pool.quoteTokenMintDecimals);
const swapInQuote = await pool.quoteSwapIn({
 amount: swapInAmount,
 inputSide: "quote",
 slippage: new BN(100), // 1%
});

console.log("Quote ", swapInQuote);

const swapInIx = await pool.swapInIx({
 quoteResult: swapInQuote,
 amount: swapInAmount,
});

const swapInTx = await sendAndConfirmTransaction(
 connection,
 new Transaction().add(swapInIx),
 [creator],
 {
  commitment: "confirmed",
 }
);

console.log("Swap in transaction confirmed!", swapInTx);
```

## Full Code Example ([source](https://github.com/heavenxyz/heaven-sdk-examples/blob/master/src/create-pool.mjs))
```typescript create-pool.mjs
import {
 ComputeBudgetProgram,
 Connection,
 Keypair,
 LAMPORTS_PER_SOL,
 PublicKey,
 SystemProgram,
 Transaction,
 sendAndConfirmTransaction,
} from "@solana/web3.js";
import { BN } from "bn.js";
import { Heaven } from "heaven-sdk";
import {
 AuthorityType,
 createAssociatedTokenAccountInstruction,
 createInitializeMintInstruction,
 createMintToCheckedInstruction,
 createSetAuthorityInstruction,
 createSyncNativeInstruction,
 getAssociatedTokenAddressSync,
 getMinimumBalanceForRentExemptMint,
 MINT_SIZE,
 NATIVE_MINT,
 TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

console.log("Creating a new liquidity pool...");
const creator = Keypair.generate();
const connection = new Connection(
 "https://api.devnet.solana.com", // Replace with your preferred Solana RPC endpoint
 "confirmed"
);

const signature = await connection.requestAirdrop(
 creator.publicKey,
 3 * LAMPORTS_PER_SOL
);
await connection.confirmTransaction(signature);

const mint = Keypair.generate();
const decimals = 9;
const amount = 1000_000_000 * 10 ** decimals; // Mint 1 Billion tokens

const tokenAccount = getAssociatedTokenAddressSync(
 mint.publicKey,
 creator.publicKey,
 false,
 TOKEN_PROGRAM_ID
);

const tx = new Transaction().add(
 // Create mint account
 SystemProgram.createAccount({
  fromPubkey: creator.publicKey,
  newAccountPubkey: mint.publicKey,
  space: MINT_SIZE,
  lamports: await getMinimumBalanceForRentExemptMint(connection),
  programId: TOKEN_PROGRAM_ID,
 }),
 // Create a new token
 createInitializeMintInstruction(
  mint.publicKey, // mint pubkey
  decimals, // decimals
  creator.publicKey, // mint authority
  null // freeze authority (you can use `null` to disable it. when you disable it, you can't turn it on again)
 ),
 // Create a new token account to receive the minted tokens
 createAssociatedTokenAccountInstruction(
  creator.publicKey, // payer
  tokenAccount, // ata
  creator.publicKey, // owner
  mint.publicKey // mint
 ),
 // Mint tokens to the token account
 createMintToCheckedInstruction(
  mint.publicKey, // mint
  tokenAccount, // receiver (should be a token account)
  creator.publicKey, // mint authority
  amount, // amount. if your decimals is 8, you mint 10^8 for 1 token.
  decimals // decimals
 ),
 // Optionally, revoke the mint authority
 createSetAuthorityInstruction(
  mint.publicKey, // mint acocunt || token account
  creator.publicKey, // current auth
  AuthorityType.MintTokens, // authority type
  null // new auth (you can pass `null` to close it)
 )
);

await sendAndConfirmTransaction(connection, tx, [creator, mint], {
 commitment: "confirmed",
});

const wsolTokenAccount = getAssociatedTokenAddressSync(
 NATIVE_MINT,
 creator.publicKey,
 false,
 TOKEN_PROGRAM_ID
);

console.log(
 "Creating a new token account for WSOL...",
 wsolTokenAccount.toBase58()
);

const tx2 = new Transaction().add(
 createAssociatedTokenAccountInstruction(
  creator.publicKey,
  wsolTokenAccount,
  creator.publicKey,
  NATIVE_MINT
 ),
 SystemProgram.transfer({
  fromPubkey: creator.publicKey,
  toPubkey: wsolTokenAccount,
  lamports: 2 * LAMPORTS_PER_SOL,
 }),
 createSyncNativeInstruction(wsolTokenAccount, TOKEN_PROGRAM_ID)
);
await sendAndConfirmTransaction(connection, tx2, [creator], {
 commitment: "confirmed",
});
console.log("WSOL token account created successfully!");

// Initialize a new liquidity pool
const pool = await Heaven.new({
 base: mint.publicKey, // The token we created;
 quote: NATIVE_MINT, // WSOL;
 connection: connection,
 payer: creator.publicKey,
 network: "devnet",
 // Optional: If you want to use a custom program ID
 // programId: new PublicKey('...'), // Insert the program ID
});

// This will create a new liquidity pool with the following parameters:
// - 1 SOL
// - 1000,000 of the token we created
// - 1% sell tax -> Swapping from base to quote token
// - 0.25% buy tax -> Swapping from quote to base token
// - Lock liquidity for 60 seconds
// - Open pool 5 seconds after creation
// - And only allowing pool creator to add additional liquidity
const ix = await pool.createIx({
 // amount of base token to deposit
 baseAmount: new BN(1000_000 * 10 ** pool.baseTokenMintDecimals),
 // amount of quote token to deposit
 quoteAmount: new BN(1 * 10 ** pool.quoteTokenMintDecimals),
 // sellTax BPS = 100 / 10000 * 100 = 1%;
 sellTax: new BN(100),
 // buyTax BPS = 25 / 10000 * 100 = 0.25%;
 buyTax: new BN(25),
 // locking liquidity
 lp: "lock", // or 'burn' to burn LP tokens
 // Lock liquidity for 60 seconds
 lockLiquidityUntil: new Date(new Date().getTime() + 60 * 1000),
 // Open pool 5 seconds after creation
 openPoolAt: new Date(new Date().getTime() + 5 * 1000),
 // [OPTIONAL]: The contract will emit this event when the pool is created
 event: "",
 // [OPTIONAL]: Only allow pool creatot to add additional liquidity.
 // Default is `false`.
 // Important: This cannot be changed after pool creation.
 // Setting this to `true` will only allow the pool creator to collect swap fees without pulling
 // all the liquidity from the pool.
 disableNonCreatorAddLiquidity: true,
});

const id = pool.subscribeCustomEvent((event, poolId, instruction) => {
 console.log("Custom event:", event, poolId, instruction);
});

// Don't forget to unsubscribe from the custom event when you no longer need it
await pool.unsubscribe(id);

const createPoolTx = await sendAndConfirmTransaction(
 connection,
 new Transaction().add(
  // Creating a new pool uses more than the default 200K compute units
  // so we need to increase the compute unit limit
  // to avoid the transaction failing with an error
  ComputeBudgetProgram.setComputeUnitLimit({
   units: 300000,
  }),
  ix
 ),
 [creator],
 {
  commitment: "confirmed",
 }
);
console.log("Liquidity pool created successfully!", createPoolTx);
console.log("Pool address:", pool.liquidityPoolState.toBase58());

console.log("Waiting for the pool to open...");
await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

console.log("Swapping 0.01 SOL for as much tokens as possible...");
const swapInAmount = new BN(0.01 * 10 ** pool.quoteTokenMintDecimals);
const swapInQuote = await pool.quoteSwapIn({
 amount: swapInAmount,
 inputSide: "quote",
 slippage: new BN(100), // 1%
});

console.log("Quote ", swapInQuote);

const swapInIx = await pool.swapInIx({
 quoteResult: swapInQuote,
 amount: swapInAmount,
});

const swapInTx = await sendAndConfirmTransaction(
 connection,
 new Transaction().add(swapInIx),
 [creator],
 {
  commitment: "confirmed",
 }
);

console.log("Swap in transaction confirmed!", swapInTx);
```

# Documentation
For more information, please refer to the [official documentation](https://docs.heaven.xyz).
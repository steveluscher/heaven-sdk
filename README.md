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

### Create a new pool ([example](./examples/simple/create-new-pool.ts))

```typescript
/* eslint-disable max-len */
import {
    ComputeBudgetProgram,
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import { BN } from 'bn.js';
import { Heaven } from 'heaven-sdk';

export async function createLiquidityPoolExample() {
    const creator = Keypair.generate();
    const connection = new Connection(
        'https://api.devnet.solana.com/', // Replace with your preferred Solana RPC endpoint
        'confirmed'
    );

    // Initialize a new liquidity pool
    const pool = await Heaven.new({
        base: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), // USDC;
        quote: new PublicKey('So11111111111111111111111111111111111111112'), // WSOL;
        connection: connection,
        payer: creator.publicKey,
        network: 'devnet', // 'mainnet' or 'testnet'
    });

    const ix = await pool.createIx({
        // amount of base token to deposit
        baseAmount: new BN(1000_000 * 10 ** pool.baseTokenMintDecimals),
        // amount of quote token to deposit
        quoteAmount: new BN(1000 * 10 ** pool.quoteTokenMintDecimals),
        // sellTax BPS = 100 / 10000 * 100 = 1%;
        sellTax: new BN(100),
        // buyTax BPS = 25 / 10000 * 100 = 0.25%;
        buyTax: new BN(25),
        // locking liquidity
        lp: 'lock', // or 'burn' to burn LP tokens
        // Lock liquidity for 60 seconds
        lockLiquidityUntil: new Date(new Date().getTime() + 60 * 1000),
        // Open pool 60 seconds after creation
        openPoolAt: new Date(new Date().getTime() + 60 * 1000),
        // [OPTIONAL]: The contract will emit this event when the pool is created
        event: '',
    });

    const id = pool.subscribeCustomEvent((event, poolId, instruction) => {
        console.log('Custom event:', event, poolId, instruction);
    });

    // Don't forget to unsubscribe from the custom event when you no longer need it
    // await pool.unsubscribe(id);

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(
            ComputeBudgetProgram.setComputeUnitLimit({
                units: 300000,
            }),
            ix
        ),
        [creator],
        {
            commitment: 'confirmed',
        }
    );
}
```

### Swap exact in ([example](./examples/simple/swap-exact-in.ts))

```typescript
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
import { Heaven } from 'heaven-sdk';

export async function swapExactInExample() {
    const connection = new Connection(
        'https://api.devnet.solana.com',
        'confirmed'
    );
    const liquidityPoolAddress = new PublicKey('...'); // Insert the liquidity pool address
    const payer = Keypair.generate();

    // Load an existing pool by id
    const pool = await Heaven.load({
        id: liquidityPoolAddress,
        network: 'devnet', // 'mainnet' or 'testnet'
        payer: payer.publicKey,
        connection,
    });

    // Swapping in 1000 base tokens for quote tokens
    const amount = new BN(1000 * 10 ** pool.baseTokenMintDecimals);

    // Slippage BPS => 100 = 1% = 100 / 10000 * 100
    const slippage = new BN(100);

    // Quote the minimum amount of quote tokens that will be received
    // based on the provided slippage
    const quoteResult = await pool.quoteSwapIn({
        amount,
        inputSide: 'base',
        slippage,
    });

    const ix = await pool.swapInIx({
        amount,
        quoteResult,
        // [OPTIONAL]: The contract will emit this event when the swap is executed
        event: '',
    });

    const id = pool.subscribeCustomEvent((event, poolId, instruction) => {
        console.log('Custom event:', event, poolId, instruction);
    });

    // Don't forget to unsubscribe from the custom event when you no longer need it
    // await pool.unsubscribe(id);

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(ix),
        [payer],
        {
            commitment: 'confirmed',
        }
    );
}
```

### Swap exact out ([example](./examples/simple/swap-exact-out.ts))

```typescript
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
import { Heaven } from 'heaven-sdk';

export async function swapExactOutExample() {
    const connection = new Connection(
        'https://api.devnet.solana.com',
        'confirmed'
    );
    const liquidityPoolAddress = new PublicKey('...'); // Insert the liquidity pool address
    const payer = Keypair.generate();

    // Load the pool
    const pool = await Heaven.load({
        id: liquidityPoolAddress,
        network: 'devnet', // 'mainnet' or 'testnet'
        payer: payer.publicKey,
        connection,
    });

    // Swapping out 1000 base tokens using quote tokens
    const amountOut = new BN(1000 * 10 ** pool.baseTokenMintDecimals);

    // Slippage BPS => 100 = 1% = 100 / 10000 * 100
    const slippage = new BN(100);

    // Quote the maximum amount of quote tokens that will be spent
    // based on the provided slippage
    const quoteResult = await pool.quoteSwapOut({
        amount: amountOut,
        inputSide: 'quote',
        slippage,
    });

    const ix = await pool.swapOutIx({
        amount: amountOut,
        quoteResult,
        // [OPTIONAL]: The contract will emit this event when the swap is executed
        event: '',
    });

    const id = pool.subscribeCustomEvent((event, poolId, instruction) => {
        console.log('Custom event:', event, poolId, instruction);
    });

    // Don't forget to unsubscribe from the custom event when you no longer need it
    // await pool.unsubscribe(id);

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(ix),
        [payer],
        {
            commitment: 'confirmed',
        }
    );
}
```

### Add liquidity ([example](./examples/simple/add-liquidity.ts))

```typescript
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
import { Heaven } from 'heaven-sdk';

export async function addLpExample() {
    const connection = new Connection(
        'https://api.devnet.solana.com',
        'confirmed'
    );
    const liquidityPoolAddress = new PublicKey('...'); // Insert the liquidity pool address
    const payer = Keypair.generate();

    // Load the pool
    const pool = await Heaven.load({
        id: liquidityPoolAddress,
        network: 'devnet', // 'mainnet' or 'testnet'
        payer: payer.publicKey,
        connection,
    });

    // Adding 1000 base tokens
    const baseAmount = new BN(1000 * 10 ** pool.baseTokenMintDecimals);

    // Calculate the maximum amount of quote tokens that needs to be added as well
    // based on the provided slippage
    const quoteResult = await pool.quoteAddLp({
        inputSide: 'base',
        amount: baseAmount,
        // Slippage BPS => 100 = 1% = 100 / 10000 * 100
        slippage: new BN(100),
    });

    const ix = await pool.addLpIx({
        quoteResult,
        // [OPTIONAL]: The contract will emit this event when the liquidity is added
        event: '',
    });

    const id = pool.subscribeCustomEvent((event, poolId, instruction) => {
        console.log('Custom event:', event, poolId, instruction);
    });

    // Don't forget to unsubscribe from the custom event when you no longer need it
    // await pool.unsubscribe(id);

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(ix),
        [payer],
        {
            commitment: 'confirmed',
        }
    );
}
```

### Remove liquidity ([example](./examples/simple/remove-liquidity.ts))

```typescript
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
import { Heaven } from 'heaven-sdk';

export async function removeLpExample() {
    const connection = new Connection(
        'https://api.devnet.solana.com',
        'confirmed'
    );
    const liquidityPoolAddress = new PublicKey('...'); // Insert the liquidity pool address
    const payer = Keypair.generate();

    // Load the pool
    const pool = await Heaven.load({
        id: liquidityPoolAddress,
        network: 'devnet', // 'mainnet' or 'testnet'
        payer: payer.publicKey,
        connection,
    });

    // Remove 1000 lp tokens
    const lpAmount = new BN(1000 * 10 ** pool.lpTokenMintDecimals);

    // Calculate the minimum amount of base and quote tokens that will be received
    // based on the provided slippage
    const quoteResult = await pool.quoteRemoveLp({
        amount: lpAmount,
        // Slippage BPS => 100 = 1% = 100 / 10000 * 100
        slippage: new BN(100),
    });

    const ix = await pool.removeLpIx({
        quoteResult,
        // [OPTIONAL]: The contract will emit this event when the liquidity is removed
        event: '',
    });

    const id = pool.subscribeCustomEvent((event, poolId, instruction) => {
        console.log('Custom event:', event, poolId, instruction);
    });

    // Don't forget to unsubscribe from the custom event when you no longer need it
    // await pool.unsubscribe(id);

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(ix),
        [payer],
        {
            commitment: 'confirmed',
        }
    );
}
```

### Claim Swap Tax ([example](./examples/simple/claim-tax.ts))

```typescript
/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
import {
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import { Heaven } from 'heaven-sdk';

export async function claimTaxExample() {
    const connection = new Connection(
        'https://api.devnet.solana.com',
        'confirmed'
    );
    const liquidityPoolAddress = new PublicKey('...'); // Insert the liquidity pool address
    const payer = Keypair.generate();

    // Load the pool
    const pool = await Heaven.load({
        id: liquidityPoolAddress,
        network: 'devnet', // 'mainnet' or 'testnet'
        payer: payer.publicKey,
        connection,
    });

    // Get the current tax balances
    const baseAmount = await pool.baseTaxBalance;
    const quoteAmount = await pool.quoteTaxBalance;

    // Claim all of the tax
    const ix = await pool.claimTaxIx({
        base: baseAmount,
        quote: quoteAmount,
        // [OPTIONAL]: The contract will emit this event when the tax is claimed
        event: '',
    });

    const id = pool.subscribeCustomEvent((event, poolId, instruction) => {
        console.log('Custom event:', event, poolId, instruction);
    });

    // Don't forget to unsubscribe from the custom event when you no longer need it
    // await pool.unsubscribe(id);

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(ix),
        [payer],
        {
            commitment: 'confirmed',
        }
    );
}
```

### Claim Lp Tokens ([example](./examples/simple/claim-lp-tokens.ts))

```typescript
/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
import {
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import { Heaven } from 'heaven-sdk';

export async function claimLpTokensExample() {
    const connection = new Connection(
        'https://api.devnet.solana.com',
        'confirmed'
    );
    const liquidityPoolAddress = new PublicKey('...'); // Insert the liquidity pool address
    const payer = Keypair.generate();

    // Load the pool
    const pool = await Heaven.load({
        id: liquidityPoolAddress,
        network: 'devnet', // 'mainnet' or 'testnet'
        payer: payer.publicKey,
        connection,
    });

    // Get the current locked lp token account balance
    const amount = await pool.lockedLpTokenBalance;

    // Claim all of the locked lp tokens
    const ix = await pool.claimLpTokensIx({
        amount,
    });

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(ix),
        [payer],
        {
            commitment: 'confirmed',
        }
    );
}
```

### Update Liquidity Pool ([example](./examples/simple/update-liquidity-pool.ts))

```typescript
/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
import {
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import { Heaven } from 'heaven-sdk';

export async function updateLiquidityPoolExample() {
    const connection = new Connection(
        'https://api.devnet.solana.com',
        'confirmed'
    );
    const liquidityPoolAddress = new PublicKey('...'); // Insert the liquidity pool address
    const payer = Keypair.generate();

    // Load the pool
    const pool = await Heaven.load({
        id: liquidityPoolAddress,
        network: 'devnet', // 'mainnet' or 'testnet'
        payer: payer.publicKey,
        connection,
    });

    const enableAddLpIx = await pool.enableAddLpIx();
    const enableRemoveLpIx = await pool.enableRemoveLpIx();
    const enableSwapIx = await pool.enableSwapIx();
    const disableAddLpIx = await pool.disableAddLpIx();
    const disableRemoveLpIx = await pool.disableRemoveLpIx();
    const disableSwapIx = await pool.disableSwapIx();

    const currentLpLockTs = await pool.getCurrentLpLockTimestamp();
    const extendedLpLockTs = currentLpLockTs.getTime() + 60 * 60 * 1000; // extend the lock by 1 hour

    // Note: you can only extend lp lock, not shorten it
    const extendLpLockIx = await pool.extendLpLockIx({
        lockLiquidityUntil: new Date(extendedLpLockTs),
    });

    // Note: you can only update the open pool at timestamp if the previous open pool at timestamp has not passed
    const updateOpenPoolAtIx = await pool.updateOpenPoolAtIx({
        openPoolAt: new Date(Date.now() + 60 * 60 * 1000), // open the pool in 1 hour from now
    });

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(
            enableAddLpIx,
            enableRemoveLpIx,
            enableSwapIx,
            disableAddLpIx,
            disableRemoveLpIx,
            disableSwapIx,
            extendLpLockIx,
            updateOpenPoolAtIx
        ),
        [payer],
        {
            commitment: 'confirmed',
        }
    );
}
```
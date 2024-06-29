export type HeavenAnchorAmm = {
    version: '0.1.0';
    name: 'heaven_anchor_amm';
    instructions: [
        {
            name: 'createOrUpdateProtocolOwner';
            accounts: [
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'currentOwner';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'newOwner';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'protocolOwnerState';
                    isMut: true;
                    isSigner: false;
                }
            ];
            args: [];
        },
        {
            name: 'claimLpTokens';
            accounts: [
                {
                    name: 'user';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'authority';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'liquidityPoolState';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'lpTokenLockVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userLpTokenVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'lpTokenMint';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: 'ClaimLpTokensParams';
                    };
                }
            ];
        },
        {
            name: 'claimProtocolSwapFee';
            accounts: [
                {
                    name: 'owner';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'baseTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'liquidityPoolState';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'protocolBaseTokenSwapFeeVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'ownerBaseTokenSwapFeeVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'protocolQuoteTokenSwapFeeVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'ownerQuoteTokenSwapFeeVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'authority';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'baseTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'protocolOwnerState';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: 'ClaimProtocolSwapFeeParams';
                    };
                }
            ];
        },
        {
            name: 'createProtocolConfig';
            accounts: [
                {
                    name: 'owner';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'protocolConfigState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'protocolOwnerState';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'version';
                    type: 'u16';
                },
                {
                    name: 'params';
                    type: {
                        defined: 'ProtocolConfigParams';
                    };
                }
            ];
        },
        {
            name: 'swapIn';
            accounts: [
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'baseTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'liquidityPoolState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'authority';
                    isMut: false;
                    isSigner: false;
                    docs: ['create pool fee account'];
                },
                {
                    name: 'user';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'baseTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'userBaseTokenVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userQuoteTokenVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'baseTokenVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'quoteTokenVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'baseTokenSwapTaxVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'quoteTokenSwapTaxVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'protocolBaseTokenSwapFeeVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'protocolQuoteTokenSwapFeeVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userAmmStats';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userGlobalStats';
                    isMut: true;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: 'SwapInParams';
                    };
                }
            ];
        },
        {
            name: 'swapOut';
            accounts: [
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'baseTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'liquidityPoolState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'authority';
                    isMut: false;
                    isSigner: false;
                    docs: ['create pool fee account'];
                },
                {
                    name: 'user';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'baseTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'userBaseTokenVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userQuoteTokenVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'baseTokenVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'quoteTokenVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'baseTokenSwapTaxVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'quoteTokenSwapTaxVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'protocolBaseTokenSwapFeeVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'protocolQuoteTokenSwapFeeVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userAmmStats';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userGlobalStats';
                    isMut: true;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: 'SwapOutParams';
                    };
                }
            ];
        },
        {
            name: 'claimSwapTax';
            accounts: [
                {
                    name: 'baseTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'user';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'authority';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'liquidityPoolState';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'baseTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'baseTokenSwapTaxVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'quoteTokenSwapTaxVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'userQuoteTokenVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userBaseTokenVault';
                    isMut: true;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: 'ClaimSwapTaxParams';
                    };
                }
            ];
        },
        {
            name: 'updateLiquidityPool';
            accounts: [
                {
                    name: 'user';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'liquidityPoolState';
                    isMut: true;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: 'UpdateLiquidityPoolParams';
                    };
                }
            ];
        },
        {
            name: 'updateProtocolConfig';
            accounts: [
                {
                    name: 'owner';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'protocolConfigState';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'protocolOwnerState';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: 'ProtocolConfigParams';
                    };
                }
            ];
        },
        {
            name: 'createLiquidityPool';
            accounts: [
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'baseTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'rent';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'poolCreationFeeWallet';
                    isMut: true;
                    isSigner: false;
                    docs: ['create pool fee account'];
                },
                {
                    name: 'authority';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'user';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'baseTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'lpTokenMint';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userBaseTokenVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userQuoteTokenVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'baseTokenVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'quoteTokenVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'baseTokenSwapTaxVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'quoteTokenSwapTaxVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'liquidityPoolState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'lpTokenLockVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'protocolConfig';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'protocolConfigVersion';
                    type: 'u16';
                },
                {
                    name: 'params';
                    type: {
                        defined: 'CreateLiquidityPoolParams';
                    };
                }
            ];
        },
        {
            name: 'addLiquidity';
            accounts: [
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'baseTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'authority';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'user';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'liquidityPoolState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'baseTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'lpTokenMint';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userBaseTokenVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userQuoteTokenVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userLpTokenVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'baseTokenVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'userAmmStats';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'userGlobalStats';
                    isMut: true;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: 'AddLiquidityParams';
                    };
                }
            ];
        },
        {
            name: 'removeLiquidity';
            accounts: [
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'baseTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'authority';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'user';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'liquidityPoolState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'baseTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'lpTokenMint';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userBaseTokenVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userQuoteTokenVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userLpTokenVault';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'baseTokenVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'userAmmStats';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'quoteTokenVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['CHECK'];
                },
                {
                    name: 'userGlobalStats';
                    isMut: true;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: 'RemoveLiquidityParams';
                    };
                }
            ];
        }
    ];
    accounts: [
        {
            name: 'liquidityPoolUserStats';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'baseSwapInCount';
                        type: 'u64';
                    },
                    {
                        name: 'quoteSwapInCount';
                        type: 'u64';
                    },
                    {
                        name: 'baseSwapOutCount';
                        type: 'u64';
                    },
                    {
                        name: 'quoteSwapOutCount';
                        type: 'u64';
                    },
                    {
                        name: 'baseInAmount';
                        type: 'u128';
                    },
                    {
                        name: 'baseOutAmount';
                        type: 'u128';
                    },
                    {
                        name: 'quoteInAmount';
                        type: 'u128';
                    },
                    {
                        name: 'quoteOutAmount';
                        type: 'u128';
                    },
                    {
                        name: 'firstSwapOutTimestamp';
                        type: 'u64';
                    },
                    {
                        name: 'latestSwapOutTimestamp';
                        type: 'u64';
                    },
                    {
                        name: 'firstSwapInTimestamp';
                        type: 'u64';
                    },
                    {
                        name: 'latestSwapInTimestamp';
                        type: 'u64';
                    },
                    {
                        name: 'baseTokenAdded';
                        type: 'u128';
                    },
                    {
                        name: 'baseTokenRemoved';
                        type: 'u128';
                    },
                    {
                        name: 'quoteTokenAdded';
                        type: 'u128';
                    },
                    {
                        name: 'quoteTokenRemoved';
                        type: 'u128';
                    },
                    {
                        name: 'addLiquidityCount';
                        type: 'u64';
                    },
                    {
                        name: 'removeLiquidityCount';
                        type: 'u64';
                    },
                    {
                        name: 'initialBaseTokenAdded';
                        type: 'u64';
                    },
                    {
                        name: 'initialQuoteTokenAdded';
                        type: 'u64';
                    },
                    {
                        name: 'initialLiquidityAddedTimestamp';
                        type: 'u64';
                    },
                    {
                        name: 'baseProtocolSwapFeePaid';
                        type: 'u128';
                    },
                    {
                        name: 'quoteProtocolSwapFeePaid';
                        type: 'u128';
                    },
                    {
                        name: 'basePoolSwapFeePaid';
                        type: 'u128';
                    },
                    {
                        name: 'quotePoolSwapFeePaid';
                        type: 'u128';
                    },
                    {
                        name: 'basePoolSwapTaxPaid';
                        type: 'u128';
                    },
                    {
                        name: 'quotePoolSwapTaxPaid';
                        type: 'u128';
                    },
                    {
                        name: 'baseProtocolTaxPaid';
                        type: 'u128';
                    },
                    {
                        name: 'quoteProtocolTaxPaid';
                        type: 'u128';
                    }
                ];
            };
        },
        {
            name: 'globalUserStats';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'sellVolumeWsol';
                        type: 'u128';
                    },
                    {
                        name: 'sellVolumeUsdc';
                        type: 'u128';
                    },
                    {
                        name: 'sellVolumeUsdt';
                        type: 'u128';
                    },
                    {
                        name: 'buyVolumeWsol';
                        type: 'u128';
                    },
                    {
                        name: 'buyVolumeUsdc';
                        type: 'u128';
                    },
                    {
                        name: 'buyVolumeUsdt';
                        type: 'u128';
                    },
                    {
                        name: 'firstSellTimestamp';
                        type: 'u64';
                    },
                    {
                        name: 'latestSellTimestamp';
                        type: 'u64';
                    },
                    {
                        name: 'firstBuyTimestamp';
                        type: 'u64';
                    },
                    {
                        name: 'latestBuyTimestamp';
                        type: 'u64';
                    },
                    {
                        name: 'firstSellAmountWsol';
                        type: 'u128';
                    },
                    {
                        name: 'firstSellAmountUsdc';
                        type: 'u128';
                    },
                    {
                        name: 'firstSellAmountUsdt';
                        type: 'u128';
                    },
                    {
                        name: 'firstBuyAmountWsol';
                        type: 'u128';
                    },
                    {
                        name: 'firstBuyAmountUsdc';
                        type: 'u128';
                    },
                    {
                        name: 'firstBuyAmountUsdt';
                        type: 'u128';
                    },
                    {
                        name: 'sellCount';
                        type: 'u64';
                    },
                    {
                        name: 'buyCount';
                        type: 'u64';
                    },
                    {
                        name: 'liquidityAddedWsol';
                        type: 'u128';
                    },
                    {
                        name: 'liquidityAddedUsdc';
                        type: 'u128';
                    },
                    {
                        name: 'liquidityAddedUsdt';
                        type: 'u128';
                    },
                    {
                        name: 'liquidityRemovedWsol';
                        type: 'u128';
                    },
                    {
                        name: 'liquidityRemovedUsdc';
                        type: 'u128';
                    },
                    {
                        name: 'liquidityRemovedUsdt';
                        type: 'u128';
                    },
                    {
                        name: 'addLiquidityCount';
                        type: 'u64';
                    },
                    {
                        name: 'removeLiquidityCount';
                        type: 'u64';
                    },
                    {
                        name: 'protocolSwapFeePaidWsol';
                        type: 'u128';
                    },
                    {
                        name: 'protocolSwapFeePaidUsdc';
                        type: 'u128';
                    },
                    {
                        name: 'protocolSwapFeePaidUsdt';
                        type: 'u128';
                    },
                    {
                        name: 'poolSwapFeePaidWsol';
                        type: 'u128';
                    },
                    {
                        name: 'poolSwapFeePaidUsdc';
                        type: 'u128';
                    },
                    {
                        name: 'poolSwapFeePaidUsdt';
                        type: 'u128';
                    },
                    {
                        name: 'poolSwapTaxPaidWsol';
                        type: 'u128';
                    },
                    {
                        name: 'poolSwapTaxPaidUsdc';
                        type: 'u128';
                    },
                    {
                        name: 'poolSwapTaxPaidUsdt';
                        type: 'u128';
                    },
                    {
                        name: 'protocolSwapTaxPaidWsol';
                        type: 'u128';
                    },
                    {
                        name: 'protocolSwapTaxPaidUsdc';
                        type: 'u128';
                    },
                    {
                        name: 'protocolSwapTaxPaidUsdt';
                        type: 'u128';
                    }
                ];
            };
        },
        {
            name: 'liquidityPoolState';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'baseTokenMint';
                        type: 'publicKey';
                    },
                    {
                        name: 'baseTokenMintDecimals';
                        type: 'u8';
                    },
                    {
                        name: 'baseTokenVault';
                        type: 'publicKey';
                    },
                    {
                        name: 'baseTokenSwapTaxVault';
                        type: 'publicKey';
                    },
                    {
                        name: 'quoteTokenMint';
                        type: 'publicKey';
                    },
                    {
                        name: 'quoteTokenMintDecimals';
                        type: 'u8';
                    },
                    {
                        name: 'quoteTokenVault';
                        type: 'publicKey';
                    },
                    {
                        name: 'quoteTokenSwapTaxVault';
                        type: 'publicKey';
                    },
                    {
                        name: 'protocolBaseTokenSwapFeeVault';
                        type: 'publicKey';
                    },
                    {
                        name: 'protocolQuoteTokenSwapFeeVault';
                        type: 'publicKey';
                    },
                    {
                        name: 'lpTokenMint';
                        type: 'publicKey';
                    },
                    {
                        name: 'lpTokenMintDecimals';
                        type: 'u8';
                    },
                    {
                        name: 'lpTokenCurrentSupply';
                        type: 'u64';
                    },
                    {
                        name: 'swapFeeNumerator';
                        type: 'u64';
                    },
                    {
                        name: 'swapFeeDenominator';
                        type: 'u64';
                    },
                    {
                        name: 'protocolSwapFeeNumerator';
                        type: 'u64';
                    },
                    {
                        name: 'protocolSwapFeeDenominator';
                        type: 'u64';
                    },
                    {
                        name: 'buyTax';
                        type: 'u64';
                    },
                    {
                        name: 'sellTax';
                        type: 'u64';
                    },
                    {
                        name: 'protocolTaxNumerator';
                        type: 'u64';
                    },
                    {
                        name: 'protocolTaxDenominator';
                        type: 'u64';
                    },
                    {
                        name: 'creator';
                        type: 'publicKey';
                    },
                    {
                        name: 'authorityBump';
                        type: 'u8';
                    },
                    {
                        name: 'allowSwap';
                        type: 'bool';
                    },
                    {
                        name: 'allowRemoveLiquidity';
                        type: 'bool';
                    },
                    {
                        name: 'allowAddLiquidity';
                        type: 'bool';
                    },
                    {
                        name: 'openAt';
                        type: 'u64';
                    },
                    {
                        name: 'createdAt';
                        type: 'u64';
                    },
                    {
                        name: 'lockUntil';
                        type: 'u64';
                    },
                    {
                        name: 'protocolConfigVersion';
                        type: 'u16';
                    },
                    {
                        name: 'taxationMode';
                        type: {
                            defined: 'TaxationMode';
                        };
                    },
                    {
                        name: 'swapBaseInAmount';
                        type: 'u128';
                    },
                    {
                        name: 'swapQuoteInAmount';
                        type: 'u128';
                    },
                    {
                        name: 'swapBaseOutAmount';
                        type: 'u128';
                    },
                    {
                        name: 'swapQuoteOutAmount';
                        type: 'u128';
                    },
                    {
                        name: 'swapBaseFee';
                        type: 'u128';
                    },
                    {
                        name: 'swapQuoteFee';
                        type: 'u128';
                    },
                    {
                        name: 'swapBaseToQuoteCount';
                        type: 'u128';
                    },
                    {
                        name: 'swapQuoteToBaseCount';
                        type: 'u128';
                    },
                    {
                        name: 'swapInCount';
                        type: 'u128';
                    },
                    {
                        name: 'swapOutCount';
                        type: 'u128';
                    },
                    {
                        name: 'baseSwapTaxAmount';
                        type: 'u128';
                    },
                    {
                        name: 'quoteSwapTaxAmount';
                        type: 'u128';
                    },
                    {
                        name: 'firstSwapOutTimestamp';
                        type: 'u64';
                    },
                    {
                        name: 'latestSwapOutTimestamp';
                        type: 'u64';
                    },
                    {
                        name: 'firstSwapInTimestamp';
                        type: 'u64';
                    },
                    {
                        name: 'latestSwapInTimestamp';
                        type: 'u64';
                    },
                    {
                        name: 'firstBaseToQuoteAmount';
                        type: 'u128';
                    },
                    {
                        name: 'latestBaseToQuoteAmount';
                        type: 'u128';
                    },
                    {
                        name: 'firstQuoteToBaseAmount';
                        type: 'u128';
                    },
                    {
                        name: 'latestQuoteToBaseAmount';
                        type: 'u128';
                    },
                    {
                        name: 'lockedLp';
                        type: 'u64';
                    },
                    {
                        name: 'initialLp';
                        type: 'u64';
                    },
                    {
                        name: 'liquidityAdded';
                        type: 'u128';
                    },
                    {
                        name: 'liquidityRemoved';
                        type: 'u128';
                    },
                    {
                        name: 'isInitialLpBurned';
                        type: 'bool';
                    },
                    {
                        name: 'baseTokenAdded';
                        type: 'u128';
                    },
                    {
                        name: 'baseTokenRemoved';
                        type: 'u128';
                    },
                    {
                        name: 'quoteTokenAdded';
                        type: 'u128';
                    },
                    {
                        name: 'quoteTokenRemoved';
                        type: 'u128';
                    },
                    {
                        name: 'baseProtocolTax';
                        type: 'u128';
                    },
                    {
                        name: 'quoteProtocolTax';
                        type: 'u128';
                    },
                    {
                        name: 'baseProtocolFee';
                        type: 'u128';
                    },
                    {
                        name: 'quoteProtocolFee';
                        type: 'u128';
                    },
                    {
                        name: 'baseTokenVaultBalance';
                        type: 'u64';
                    },
                    {
                        name: 'quoteTokenVaultBalance';
                        type: 'u64';
                    },
                    {
                        name: 'minPrice';
                        type: 'f64';
                    },
                    {
                        name: 'maxPrice';
                        type: 'f64';
                    },
                    {
                        name: 'currPrice';
                        type: 'f64';
                    },
                    {
                        name: 'currMc';
                        type: 'f64';
                    },
                    {
                        name: 'minMc';
                        type: 'f64';
                    },
                    {
                        name: 'maxMc';
                        type: 'f64';
                    }
                ];
            };
        },
        {
            name: 'protocolOwnerState';
            docs: ['Holds the current owner of the factory'];
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'currentProtocolOwner';
                        type: 'publicKey';
                    }
                ];
            };
        },
        {
            name: 'protocolConfig';
            docs: ['Holds the current owner of the factory'];
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'protocolConfigStateBump';
                        type: 'u8';
                    },
                    {
                        name: 'allowCreatePool';
                        type: 'bool';
                    },
                    {
                        name: 'protocolSwapFeeNumerator';
                        type: 'u64';
                    },
                    {
                        name: 'protocolSwapFeeDenominator';
                        type: 'u64';
                    },
                    {
                        name: 'swapFeeNumerator';
                        type: 'u64';
                    },
                    {
                        name: 'swapFeeDenominator';
                        type: 'u64';
                    },
                    {
                        name: 'protocolTaxNumerator';
                        type: 'u64';
                    },
                    {
                        name: 'protocolTaxDenominator';
                        type: 'u64';
                    },
                    {
                        name: 'createPoolFee';
                        type: 'u64';
                    },
                    {
                        name: 'protocolOwner';
                        type: 'publicKey';
                    },
                    {
                        name: 'version';
                        type: 'u16';
                    }
                ];
            };
        }
    ];
    types: [
        {
            name: 'AddLiquidityParams';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'maxBaseTokenAmount';
                        type: 'u64';
                    },
                    {
                        name: 'maxQuoteTokenAmount';
                        type: 'u64';
                    },
                    {
                        name: 'baseSide';
                        type: {
                            defined: 'AddLiquiditySide';
                        };
                    },
                    {
                        name: 'encodedUserDefinedEventData';
                        type: 'string';
                    }
                ];
            };
        },
        {
            name: 'ClaimLpTokensParams';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'amount';
                        type: 'u64';
                    }
                ];
            };
        },
        {
            name: 'ClaimProtocolSwapFeeParams';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'baseAmount';
                        type: 'u64';
                    },
                    {
                        name: 'quoteAmount';
                        type: 'u64';
                    }
                ];
            };
        },
        {
            name: 'ClaimSwapTaxParams';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'quoteAmount';
                        type: 'u64';
                    },
                    {
                        name: 'baseAmount';
                        type: 'u64';
                    },
                    {
                        name: 'encodedUserDefinedEventData';
                        type: 'string';
                    }
                ];
            };
        },
        {
            name: 'CreateLiquidityPoolParams';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'inputBaseTokenAmount';
                        type: 'u64';
                    },
                    {
                        name: 'expectedBaseTokenBalanceAfterTransferFee';
                        type: 'u64';
                    },
                    {
                        name: 'inputQuoteTokenAmount';
                        type: 'u64';
                    },
                    {
                        name: 'expectedQuoteTokenBalanceAfterTransferFee';
                        type: 'u64';
                    },
                    {
                        name: 'openAt';
                        type: 'u64';
                    },
                    {
                        name: 'lockLiquidityProviderTokenUntil';
                        type: 'u64';
                    },
                    {
                        name: 'buyTax';
                        type: 'u64';
                    },
                    {
                        name: 'sellTax';
                        type: 'u64';
                    },
                    {
                        name: 'encodedUserDefinedEventData';
                        type: 'string';
                    },
                    {
                        name: 'burnLpTokens';
                        type: 'bool';
                    }
                ];
            };
        },
        {
            name: 'ProtocolConfigParams';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'createPoolFee';
                        type: 'u64';
                    },
                    {
                        name: 'protocolSwapFeeNumerator';
                        type: 'u64';
                    },
                    {
                        name: 'protocolSwapFeeDenominator';
                        type: 'u64';
                    },
                    {
                        name: 'swapFeeNumerator';
                        type: 'u64';
                    },
                    {
                        name: 'swapFeeDenominator';
                        type: 'u64';
                    },
                    {
                        name: 'allowCreatePool';
                        type: 'bool';
                    },
                    {
                        name: 'protocolTaxNumerator';
                        type: 'u64';
                    },
                    {
                        name: 'protocolTaxDenominator';
                        type: 'u64';
                    }
                ];
            };
        },
        {
            name: 'RemoveLiquidityParams';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'amount';
                        type: 'u64';
                    },
                    {
                        name: 'minimumBaseTokenAmount';
                        type: 'u64';
                    },
                    {
                        name: 'minimumQuoteTokenAmount';
                        type: 'u64';
                    },
                    {
                        name: 'encodedUserDefinedEventData';
                        type: 'string';
                    }
                ];
            };
        },
        {
            name: 'SwapInParams';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'amountIn';
                        type: 'u64';
                    },
                    {
                        name: 'minimumAmountOut';
                        type: 'u64';
                    },
                    {
                        name: 'swapDirection';
                        type: {
                            defined: 'SwapDirection';
                        };
                    },
                    {
                        name: 'encodedUserDefinedEventData';
                        type: 'string';
                    }
                ];
            };
        },
        {
            name: 'SwapOutParams';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'maxAmountIn';
                        type: 'u64';
                    },
                    {
                        name: 'amountOut';
                        type: 'u64';
                    },
                    {
                        name: 'swapDirection';
                        type: {
                            defined: 'SwapDirection';
                        };
                    },
                    {
                        name: 'encodedUserDefinedEventData';
                        type: 'string';
                    }
                ];
            };
        },
        {
            name: 'UpdateLiquidityPoolParams';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'allowSwap';
                        type: 'bool';
                    },
                    {
                        name: 'allowAddLiquidity';
                        type: 'bool';
                    },
                    {
                        name: 'allowRemoveLiquidity';
                        type: 'bool';
                    },
                    {
                        name: 'buyTax';
                        type: 'u64';
                    },
                    {
                        name: 'sellTax';
                        type: 'u64';
                    },
                    {
                        name: 'lockUntil';
                        type: 'u64';
                    },
                    {
                        name: 'encodedUserDefinedEventData';
                        type: 'string';
                    },
                    {
                        name: 'openAt';
                        type: 'u64';
                    }
                ];
            };
        },
        {
            name: 'SwapDirection';
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'Quote2Base';
                    },
                    {
                        name: 'Base2Quote';
                    }
                ];
            };
        },
        {
            name: 'TaxationMode';
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'None';
                    },
                    {
                        name: 'Base';
                    },
                    {
                        name: 'Quote';
                    }
                ];
            };
        },
        {
            name: 'StableCoin';
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'WSOL';
                    },
                    {
                        name: 'USDC';
                    },
                    {
                        name: 'USDT';
                    }
                ];
            };
        },
        {
            name: 'RoundDirection';
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'Floor';
                    },
                    {
                        name: 'Ceiling';
                    }
                ];
            };
        },
        {
            name: 'ProtocolSwapFeeDirection';
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'None';
                    },
                    {
                        name: 'Base';
                    },
                    {
                        name: 'Quote';
                    }
                ];
            };
        },
        {
            name: 'AddLiquiditySide';
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'Base';
                    },
                    {
                        name: 'Quote';
                    }
                ];
            };
        },
        {
            name: 'SupportedTokenMint';
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'Token';
                    },
                    {
                        name: 'Token2022';
                    }
                ];
            };
        }
    ];
    events: [
        {
            name: 'AddLiquidityEvent';
            fields: [
                {
                    name: 'liquidityPoolId';
                    type: 'publicKey';
                    index: true;
                },
                {
                    name: 'user';
                    type: 'publicKey';
                    index: false;
                },
                {
                    name: 'baseTokenInputAmount';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'quoteTokenInputAmount';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'lpTokenOutputAmount';
                    type: 'u64';
                    index: false;
                }
            ];
        },
        {
            name: 'CreateLiquidityPoolEvent';
            fields: [
                {
                    name: 'liquidityPoolId';
                    type: 'publicKey';
                    index: true;
                },
                {
                    name: 'user';
                    type: 'publicKey';
                    index: false;
                },
                {
                    name: 'baseTokenInputTransferFeeAmount';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'quoteTokenInputTransferFeeAmount';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'baseTokenInputAmount';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'quoteTokenInputAmount';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'lpTokenOutputAmount';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'lockedLp';
                    type: 'bool';
                    index: false;
                }
            ];
        },
        {
            name: 'RemoveLiquidityEvent';
            fields: [
                {
                    name: 'liquidityPoolId';
                    type: 'publicKey';
                    index: true;
                },
                {
                    name: 'user';
                    type: 'publicKey';
                    index: false;
                },
                {
                    name: 'baseTokenAmount';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'quoteTokenAmount';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'lpTokenAmount';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'baseTokenTransferFeeAmount';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'quoteTokenTransferFeeAmount';
                    type: 'u64';
                    index: false;
                }
            ];
        },
        {
            name: 'SwapInEvent';
            fields: [
                {
                    name: 'liquidityPoolId';
                    type: 'publicKey';
                    index: true;
                },
                {
                    name: 'user';
                    type: 'publicKey';
                    index: false;
                },
                {
                    name: 'swapDirection';
                    type: {
                        defined: 'SwapDirection';
                    };
                    index: false;
                },
                {
                    name: 'swapAmountIn';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'swapAmountOut';
                    type: 'u64';
                    index: false;
                }
            ];
        },
        {
            name: 'SwapOutEvent';
            fields: [
                {
                    name: 'liquidityPoolId';
                    type: 'publicKey';
                    index: true;
                },
                {
                    name: 'user';
                    type: 'publicKey';
                    index: false;
                },
                {
                    name: 'swapDirection';
                    type: {
                        defined: 'SwapDirection';
                    };
                    index: false;
                },
                {
                    name: 'swapAmountIn';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'swapAmountOut';
                    type: 'u64';
                    index: false;
                }
            ];
        },
        {
            name: 'UpdateLiquidityPoolEvent';
            fields: [
                {
                    name: 'liquidityPoolId';
                    type: 'publicKey';
                    index: true;
                },
                {
                    name: 'user';
                    type: 'publicKey';
                    index: false;
                },
                {
                    name: 'allowSwap';
                    type: 'bool';
                    index: false;
                },
                {
                    name: 'allowAddLiquidity';
                    type: 'bool';
                    index: false;
                },
                {
                    name: 'allowRemoveLiquidity';
                    type: 'bool';
                    index: false;
                },
                {
                    name: 'buyTax';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'sellTax';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'lockUntil';
                    type: 'u64';
                    index: false;
                },
                {
                    name: 'taxationMode';
                    type: {
                        defined: 'TaxationMode';
                    };
                    index: false;
                },
                {
                    name: 'openAt';
                    type: 'u64';
                    index: false;
                }
            ];
        },
        {
            name: 'UserDefinedEvent';
            fields: [
                {
                    name: 'liquidityPoolId';
                    type: 'publicKey';
                    index: true;
                },
                {
                    name: 'instructionName';
                    type: 'string';
                    index: false;
                },
                {
                    name: 'base64Data';
                    type: 'string';
                    index: false;
                }
            ];
        }
    ];
    errors: [
        {
            code: 6000;
            name: 'UnsupportedTokenMint';
            msg: 'Unsupported token mint';
        },
        {
            code: 6001;
            name: 'InvalidTokenVaultBalance';
            msg: 'Invalid token vault balance';
        },
        {
            code: 6002;
            name: 'InvalidUserToken';
            msg: 'Invalid user token';
        },
        {
            code: 6003;
            name: 'InvalidTaxationMode';
            msg: 'Invalid taxation mode';
        },
        {
            code: 6004;
            name: 'InvalidOwner';
            msg: 'Invalid owner';
        },
        {
            code: 6005;
            name: 'InvalidLockLiquidityProviderTokenPercentage';
            msg: 'Invalid lock liquidity provider token percentage';
        },
        {
            code: 6006;
            name: 'CannotCreatePoolWithDisabledProtocolConfigVersion';
            msg: 'Cannot create pool with the a disabled protocol config version';
        },
        {
            code: 6007;
            name: 'InvalidTokenInputAmount';
            msg: 'Invalid token input amount';
        },
        {
            code: 6008;
            name: 'InvalidSwapTax';
            msg: 'Invalid swap tax';
        },
        {
            code: 6009;
            name: 'InvalidFeeMode';
            msg: 'Invalid fee mode';
        },
        {
            code: 6010;
            name: 'InvalidLiquidityProviderTokenLockVault';
            msg: 'Invalid liquidity provider token lock vault';
        },
        {
            code: 6011;
            name: 'InvalidUserLiquidityProviderTokenVault';
            msg: 'Invalid liquidity provider token vault';
        },
        {
            code: 6012;
            name: 'InsufficientBalance';
            msg: 'Insufficient balance';
        },
        {
            code: 6013;
            name: 'ExceededSlippage';
            msg: 'Exceeded slippage';
        },
        {
            code: 6014;
            name: 'InvalidAddLiquidityInput';
            msg: 'Invalid add liquidity input';
        },
        {
            code: 6015;
            name: 'InvalidRemoveLiquidityInput';
            msg: 'Invalid remove liquidity input';
        },
        {
            code: 6016;
            name: 'AddLiquidityDisabled';
            msg: 'Add liquidity is disabled';
        },
        {
            code: 6017;
            name: 'RemoveLiquidityDisabled';
            msg: 'Remove liquidity is disabled';
        },
        {
            code: 6018;
            name: 'SwapDisabled';
            msg: 'Swap is disabled';
        },
        {
            code: 6019;
            name: 'LiquidityPoolIsNotOpenYet';
            msg: 'Liquidity pool is not open yet';
        },
        {
            code: 6020;
            name: 'InvalidSwapInInputs';
            msg: 'Invalid swap in inputs';
        },
        {
            code: 6021;
            name: 'InvalidProtocolSwapFeeWallet';
            msg: 'Invalid protocol swap fee wallet';
        },
        {
            code: 6022;
            name: 'InvalidSwapOutInputs';
            msg: 'Invalid swap out inputs';
        },
        {
            code: 6023;
            name: 'InvalidPostFeeAmount';
            msg: 'Invalid post fee amount';
        },
        {
            code: 6024;
            name: 'ExceededQuoteTokenSlippage';
            msg: 'Exceeded quote token slippage';
        },
        {
            code: 6025;
            name: 'ExceededBaseTokenSlippage';
            msg: 'Exceeded base token slippage';
        },
        {
            code: 6026;
            name: 'LpTokensLocked';
            msg: 'Lp tokens locked';
        },
        {
            code: 6027;
            name: 'InvalidProtocolBaseTokenSwapFeeVault';
            msg: 'Invalid protocol base token swap fee vault';
        },
        {
            code: 6028;
            name: 'InvalidProtocolQuoteTokenSwapFeeVault';
            msg: 'Invalid protocol quote token swap fee vault';
        },
        {
            code: 6029;
            name: 'InvalidUserPoolStatsAccount';
            msg: 'Invalid user pool stats account';
        },
        {
            code: 6030;
            name: 'InvalidUserGlobalStatsAccount';
            msg: 'Invalid user global stats account';
        },
        {
            code: 6031;
            name: 'CannotUpdateLpLock';
            msg: 'Cannot update lp lock';
        },
        {
            code: 6032;
            name: 'ZeroAmount';
            msg: 'Zero amount';
        },
        {
            code: 6033;
            name: 'CannotUpdateLpOpenTime';
            msg: 'Cannot update lp open time';
        },
        {
            code: 6034;
            name: 'CannotSetLockBurnLpTokens';
            msg: 'Cannot set lock burn lp tokens';
        },
        {
            code: 6035;
            name: 'InvalidTax';
            msg: 'Invalid tax';
        },
        {
            code: 6036;
            name: 'InvalidChainlinkFeedAccount';
            msg: 'Invalid chainlink feed account';
        },
        {
            code: 6037;
            name: 'InvalidChainlinkProgram';
            msg: 'Invalid chainlink program';
        }
    ];
};

export const IDL: HeavenAnchorAmm = {
    version: '0.1.0',
    name: 'heaven_anchor_amm',
    instructions: [
        {
            name: 'createOrUpdateProtocolOwner',
            accounts: [
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'currentOwner',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'newOwner',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'protocolOwnerState',
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: 'claimLpTokens',
            accounts: [
                {
                    name: 'user',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'authority',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'liquidityPoolState',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'lpTokenLockVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userLpTokenVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'lpTokenMint',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: 'ClaimLpTokensParams',
                    },
                },
            ],
        },
        {
            name: 'claimProtocolSwapFee',
            accounts: [
                {
                    name: 'owner',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'baseTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'liquidityPoolState',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'protocolBaseTokenSwapFeeVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'ownerBaseTokenSwapFeeVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'protocolQuoteTokenSwapFeeVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'ownerQuoteTokenSwapFeeVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'authority',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'baseTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'protocolOwnerState',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: 'ClaimProtocolSwapFeeParams',
                    },
                },
            ],
        },
        {
            name: 'createProtocolConfig',
            accounts: [
                {
                    name: 'owner',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'protocolConfigState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'protocolOwnerState',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'version',
                    type: 'u16',
                },
                {
                    name: 'params',
                    type: {
                        defined: 'ProtocolConfigParams',
                    },
                },
            ],
        },
        {
            name: 'swapIn',
            accounts: [
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'baseTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'liquidityPoolState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'authority',
                    isMut: false,
                    isSigner: false,
                    docs: ['create pool fee account'],
                },
                {
                    name: 'user',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'baseTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'userBaseTokenVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userQuoteTokenVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'baseTokenVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'quoteTokenVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'baseTokenSwapTaxVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'quoteTokenSwapTaxVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'protocolBaseTokenSwapFeeVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'protocolQuoteTokenSwapFeeVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userAmmStats',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userGlobalStats',
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: 'SwapInParams',
                    },
                },
            ],
        },
        {
            name: 'swapOut',
            accounts: [
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'baseTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'liquidityPoolState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'authority',
                    isMut: false,
                    isSigner: false,
                    docs: ['create pool fee account'],
                },
                {
                    name: 'user',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'baseTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'userBaseTokenVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userQuoteTokenVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'baseTokenVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'quoteTokenVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'baseTokenSwapTaxVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'quoteTokenSwapTaxVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'protocolBaseTokenSwapFeeVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'protocolQuoteTokenSwapFeeVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userAmmStats',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userGlobalStats',
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: 'SwapOutParams',
                    },
                },
            ],
        },
        {
            name: 'claimSwapTax',
            accounts: [
                {
                    name: 'baseTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'user',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'authority',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'liquidityPoolState',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'baseTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'baseTokenSwapTaxVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'quoteTokenSwapTaxVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'userQuoteTokenVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userBaseTokenVault',
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: 'ClaimSwapTaxParams',
                    },
                },
            ],
        },
        {
            name: 'updateLiquidityPool',
            accounts: [
                {
                    name: 'user',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'liquidityPoolState',
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: 'UpdateLiquidityPoolParams',
                    },
                },
            ],
        },
        {
            name: 'updateProtocolConfig',
            accounts: [
                {
                    name: 'owner',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'protocolConfigState',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'protocolOwnerState',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: 'ProtocolConfigParams',
                    },
                },
            ],
        },
        {
            name: 'createLiquidityPool',
            accounts: [
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'baseTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'poolCreationFeeWallet',
                    isMut: true,
                    isSigner: false,
                    docs: ['create pool fee account'],
                },
                {
                    name: 'authority',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'user',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'baseTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'lpTokenMint',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userBaseTokenVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userQuoteTokenVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'baseTokenVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'quoteTokenVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'baseTokenSwapTaxVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'quoteTokenSwapTaxVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'liquidityPoolState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'lpTokenLockVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'protocolConfig',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'protocolConfigVersion',
                    type: 'u16',
                },
                {
                    name: 'params',
                    type: {
                        defined: 'CreateLiquidityPoolParams',
                    },
                },
            ],
        },
        {
            name: 'addLiquidity',
            accounts: [
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'baseTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'authority',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'user',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'liquidityPoolState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'baseTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'lpTokenMint',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userBaseTokenVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userQuoteTokenVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userLpTokenVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'baseTokenVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'userAmmStats',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'userGlobalStats',
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: 'AddLiquidityParams',
                    },
                },
            ],
        },
        {
            name: 'removeLiquidity',
            accounts: [
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'baseTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'authority',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'user',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'liquidityPoolState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'baseTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'lpTokenMint',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userBaseTokenVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userQuoteTokenVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userLpTokenVault',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'baseTokenVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'userAmmStats',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'quoteTokenVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['CHECK'],
                },
                {
                    name: 'userGlobalStats',
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: 'RemoveLiquidityParams',
                    },
                },
            ],
        },
    ],
    accounts: [
        {
            name: 'liquidityPoolUserStats',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'baseSwapInCount',
                        type: 'u64',
                    },
                    {
                        name: 'quoteSwapInCount',
                        type: 'u64',
                    },
                    {
                        name: 'baseSwapOutCount',
                        type: 'u64',
                    },
                    {
                        name: 'quoteSwapOutCount',
                        type: 'u64',
                    },
                    {
                        name: 'baseInAmount',
                        type: 'u128',
                    },
                    {
                        name: 'baseOutAmount',
                        type: 'u128',
                    },
                    {
                        name: 'quoteInAmount',
                        type: 'u128',
                    },
                    {
                        name: 'quoteOutAmount',
                        type: 'u128',
                    },
                    {
                        name: 'firstSwapOutTimestamp',
                        type: 'u64',
                    },
                    {
                        name: 'latestSwapOutTimestamp',
                        type: 'u64',
                    },
                    {
                        name: 'firstSwapInTimestamp',
                        type: 'u64',
                    },
                    {
                        name: 'latestSwapInTimestamp',
                        type: 'u64',
                    },
                    {
                        name: 'baseTokenAdded',
                        type: 'u128',
                    },
                    {
                        name: 'baseTokenRemoved',
                        type: 'u128',
                    },
                    {
                        name: 'quoteTokenAdded',
                        type: 'u128',
                    },
                    {
                        name: 'quoteTokenRemoved',
                        type: 'u128',
                    },
                    {
                        name: 'addLiquidityCount',
                        type: 'u64',
                    },
                    {
                        name: 'removeLiquidityCount',
                        type: 'u64',
                    },
                    {
                        name: 'initialBaseTokenAdded',
                        type: 'u64',
                    },
                    {
                        name: 'initialQuoteTokenAdded',
                        type: 'u64',
                    },
                    {
                        name: 'initialLiquidityAddedTimestamp',
                        type: 'u64',
                    },
                    {
                        name: 'baseProtocolSwapFeePaid',
                        type: 'u128',
                    },
                    {
                        name: 'quoteProtocolSwapFeePaid',
                        type: 'u128',
                    },
                    {
                        name: 'basePoolSwapFeePaid',
                        type: 'u128',
                    },
                    {
                        name: 'quotePoolSwapFeePaid',
                        type: 'u128',
                    },
                    {
                        name: 'basePoolSwapTaxPaid',
                        type: 'u128',
                    },
                    {
                        name: 'quotePoolSwapTaxPaid',
                        type: 'u128',
                    },
                    {
                        name: 'baseProtocolTaxPaid',
                        type: 'u128',
                    },
                    {
                        name: 'quoteProtocolTaxPaid',
                        type: 'u128',
                    },
                ],
            },
        },
        {
            name: 'globalUserStats',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'sellVolumeWsol',
                        type: 'u128',
                    },
                    {
                        name: 'sellVolumeUsdc',
                        type: 'u128',
                    },
                    {
                        name: 'sellVolumeUsdt',
                        type: 'u128',
                    },
                    {
                        name: 'buyVolumeWsol',
                        type: 'u128',
                    },
                    {
                        name: 'buyVolumeUsdc',
                        type: 'u128',
                    },
                    {
                        name: 'buyVolumeUsdt',
                        type: 'u128',
                    },
                    {
                        name: 'firstSellTimestamp',
                        type: 'u64',
                    },
                    {
                        name: 'latestSellTimestamp',
                        type: 'u64',
                    },
                    {
                        name: 'firstBuyTimestamp',
                        type: 'u64',
                    },
                    {
                        name: 'latestBuyTimestamp',
                        type: 'u64',
                    },
                    {
                        name: 'firstSellAmountWsol',
                        type: 'u128',
                    },
                    {
                        name: 'firstSellAmountUsdc',
                        type: 'u128',
                    },
                    {
                        name: 'firstSellAmountUsdt',
                        type: 'u128',
                    },
                    {
                        name: 'firstBuyAmountWsol',
                        type: 'u128',
                    },
                    {
                        name: 'firstBuyAmountUsdc',
                        type: 'u128',
                    },
                    {
                        name: 'firstBuyAmountUsdt',
                        type: 'u128',
                    },
                    {
                        name: 'sellCount',
                        type: 'u64',
                    },
                    {
                        name: 'buyCount',
                        type: 'u64',
                    },
                    {
                        name: 'liquidityAddedWsol',
                        type: 'u128',
                    },
                    {
                        name: 'liquidityAddedUsdc',
                        type: 'u128',
                    },
                    {
                        name: 'liquidityAddedUsdt',
                        type: 'u128',
                    },
                    {
                        name: 'liquidityRemovedWsol',
                        type: 'u128',
                    },
                    {
                        name: 'liquidityRemovedUsdc',
                        type: 'u128',
                    },
                    {
                        name: 'liquidityRemovedUsdt',
                        type: 'u128',
                    },
                    {
                        name: 'addLiquidityCount',
                        type: 'u64',
                    },
                    {
                        name: 'removeLiquidityCount',
                        type: 'u64',
                    },
                    {
                        name: 'protocolSwapFeePaidWsol',
                        type: 'u128',
                    },
                    {
                        name: 'protocolSwapFeePaidUsdc',
                        type: 'u128',
                    },
                    {
                        name: 'protocolSwapFeePaidUsdt',
                        type: 'u128',
                    },
                    {
                        name: 'poolSwapFeePaidWsol',
                        type: 'u128',
                    },
                    {
                        name: 'poolSwapFeePaidUsdc',
                        type: 'u128',
                    },
                    {
                        name: 'poolSwapFeePaidUsdt',
                        type: 'u128',
                    },
                    {
                        name: 'poolSwapTaxPaidWsol',
                        type: 'u128',
                    },
                    {
                        name: 'poolSwapTaxPaidUsdc',
                        type: 'u128',
                    },
                    {
                        name: 'poolSwapTaxPaidUsdt',
                        type: 'u128',
                    },
                    {
                        name: 'protocolSwapTaxPaidWsol',
                        type: 'u128',
                    },
                    {
                        name: 'protocolSwapTaxPaidUsdc',
                        type: 'u128',
                    },
                    {
                        name: 'protocolSwapTaxPaidUsdt',
                        type: 'u128',
                    },
                ],
            },
        },
        {
            name: 'liquidityPoolState',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'baseTokenMint',
                        type: 'publicKey',
                    },
                    {
                        name: 'baseTokenMintDecimals',
                        type: 'u8',
                    },
                    {
                        name: 'baseTokenVault',
                        type: 'publicKey',
                    },
                    {
                        name: 'baseTokenSwapTaxVault',
                        type: 'publicKey',
                    },
                    {
                        name: 'quoteTokenMint',
                        type: 'publicKey',
                    },
                    {
                        name: 'quoteTokenMintDecimals',
                        type: 'u8',
                    },
                    {
                        name: 'quoteTokenVault',
                        type: 'publicKey',
                    },
                    {
                        name: 'quoteTokenSwapTaxVault',
                        type: 'publicKey',
                    },
                    {
                        name: 'protocolBaseTokenSwapFeeVault',
                        type: 'publicKey',
                    },
                    {
                        name: 'protocolQuoteTokenSwapFeeVault',
                        type: 'publicKey',
                    },
                    {
                        name: 'lpTokenMint',
                        type: 'publicKey',
                    },
                    {
                        name: 'lpTokenMintDecimals',
                        type: 'u8',
                    },
                    {
                        name: 'lpTokenCurrentSupply',
                        type: 'u64',
                    },
                    {
                        name: 'swapFeeNumerator',
                        type: 'u64',
                    },
                    {
                        name: 'swapFeeDenominator',
                        type: 'u64',
                    },
                    {
                        name: 'protocolSwapFeeNumerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocolSwapFeeDenominator',
                        type: 'u64',
                    },
                    {
                        name: 'buyTax',
                        type: 'u64',
                    },
                    {
                        name: 'sellTax',
                        type: 'u64',
                    },
                    {
                        name: 'protocolTaxNumerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocolTaxDenominator',
                        type: 'u64',
                    },
                    {
                        name: 'creator',
                        type: 'publicKey',
                    },
                    {
                        name: 'authorityBump',
                        type: 'u8',
                    },
                    {
                        name: 'allowSwap',
                        type: 'bool',
                    },
                    {
                        name: 'allowRemoveLiquidity',
                        type: 'bool',
                    },
                    {
                        name: 'allowAddLiquidity',
                        type: 'bool',
                    },
                    {
                        name: 'openAt',
                        type: 'u64',
                    },
                    {
                        name: 'createdAt',
                        type: 'u64',
                    },
                    {
                        name: 'lockUntil',
                        type: 'u64',
                    },
                    {
                        name: 'protocolConfigVersion',
                        type: 'u16',
                    },
                    {
                        name: 'taxationMode',
                        type: {
                            defined: 'TaxationMode',
                        },
                    },
                    {
                        name: 'swapBaseInAmount',
                        type: 'u128',
                    },
                    {
                        name: 'swapQuoteInAmount',
                        type: 'u128',
                    },
                    {
                        name: 'swapBaseOutAmount',
                        type: 'u128',
                    },
                    {
                        name: 'swapQuoteOutAmount',
                        type: 'u128',
                    },
                    {
                        name: 'swapBaseFee',
                        type: 'u128',
                    },
                    {
                        name: 'swapQuoteFee',
                        type: 'u128',
                    },
                    {
                        name: 'swapBaseToQuoteCount',
                        type: 'u128',
                    },
                    {
                        name: 'swapQuoteToBaseCount',
                        type: 'u128',
                    },
                    {
                        name: 'swapInCount',
                        type: 'u128',
                    },
                    {
                        name: 'swapOutCount',
                        type: 'u128',
                    },
                    {
                        name: 'baseSwapTaxAmount',
                        type: 'u128',
                    },
                    {
                        name: 'quoteSwapTaxAmount',
                        type: 'u128',
                    },
                    {
                        name: 'firstSwapOutTimestamp',
                        type: 'u64',
                    },
                    {
                        name: 'latestSwapOutTimestamp',
                        type: 'u64',
                    },
                    {
                        name: 'firstSwapInTimestamp',
                        type: 'u64',
                    },
                    {
                        name: 'latestSwapInTimestamp',
                        type: 'u64',
                    },
                    {
                        name: 'firstBaseToQuoteAmount',
                        type: 'u128',
                    },
                    {
                        name: 'latestBaseToQuoteAmount',
                        type: 'u128',
                    },
                    {
                        name: 'firstQuoteToBaseAmount',
                        type: 'u128',
                    },
                    {
                        name: 'latestQuoteToBaseAmount',
                        type: 'u128',
                    },
                    {
                        name: 'lockedLp',
                        type: 'u64',
                    },
                    {
                        name: 'initialLp',
                        type: 'u64',
                    },
                    {
                        name: 'liquidityAdded',
                        type: 'u128',
                    },
                    {
                        name: 'liquidityRemoved',
                        type: 'u128',
                    },
                    {
                        name: 'isInitialLpBurned',
                        type: 'bool',
                    },
                    {
                        name: 'baseTokenAdded',
                        type: 'u128',
                    },
                    {
                        name: 'baseTokenRemoved',
                        type: 'u128',
                    },
                    {
                        name: 'quoteTokenAdded',
                        type: 'u128',
                    },
                    {
                        name: 'quoteTokenRemoved',
                        type: 'u128',
                    },
                    {
                        name: 'baseProtocolTax',
                        type: 'u128',
                    },
                    {
                        name: 'quoteProtocolTax',
                        type: 'u128',
                    },
                    {
                        name: 'baseProtocolFee',
                        type: 'u128',
                    },
                    {
                        name: 'quoteProtocolFee',
                        type: 'u128',
                    },
                    {
                        name: 'baseTokenVaultBalance',
                        type: 'u64',
                    },
                    {
                        name: 'quoteTokenVaultBalance',
                        type: 'u64',
                    },
                    {
                        name: 'minPrice',
                        type: 'f64',
                    },
                    {
                        name: 'maxPrice',
                        type: 'f64',
                    },
                    {
                        name: 'currPrice',
                        type: 'f64',
                    },
                    {
                        name: 'currMc',
                        type: 'f64',
                    },
                    {
                        name: 'minMc',
                        type: 'f64',
                    },
                    {
                        name: 'maxMc',
                        type: 'f64',
                    },
                ],
            },
        },
        {
            name: 'protocolOwnerState',
            docs: ['Holds the current owner of the factory'],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'currentProtocolOwner',
                        type: 'publicKey',
                    },
                ],
            },
        },
        {
            name: 'protocolConfig',
            docs: ['Holds the current owner of the factory'],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'protocolConfigStateBump',
                        type: 'u8',
                    },
                    {
                        name: 'allowCreatePool',
                        type: 'bool',
                    },
                    {
                        name: 'protocolSwapFeeNumerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocolSwapFeeDenominator',
                        type: 'u64',
                    },
                    {
                        name: 'swapFeeNumerator',
                        type: 'u64',
                    },
                    {
                        name: 'swapFeeDenominator',
                        type: 'u64',
                    },
                    {
                        name: 'protocolTaxNumerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocolTaxDenominator',
                        type: 'u64',
                    },
                    {
                        name: 'createPoolFee',
                        type: 'u64',
                    },
                    {
                        name: 'protocolOwner',
                        type: 'publicKey',
                    },
                    {
                        name: 'version',
                        type: 'u16',
                    },
                ],
            },
        },
    ],
    types: [
        {
            name: 'AddLiquidityParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'maxBaseTokenAmount',
                        type: 'u64',
                    },
                    {
                        name: 'maxQuoteTokenAmount',
                        type: 'u64',
                    },
                    {
                        name: 'baseSide',
                        type: {
                            defined: 'AddLiquiditySide',
                        },
                    },
                    {
                        name: 'encodedUserDefinedEventData',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'ClaimLpTokensParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'amount',
                        type: 'u64',
                    },
                ],
            },
        },
        {
            name: 'ClaimProtocolSwapFeeParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'baseAmount',
                        type: 'u64',
                    },
                    {
                        name: 'quoteAmount',
                        type: 'u64',
                    },
                ],
            },
        },
        {
            name: 'ClaimSwapTaxParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'quoteAmount',
                        type: 'u64',
                    },
                    {
                        name: 'baseAmount',
                        type: 'u64',
                    },
                    {
                        name: 'encodedUserDefinedEventData',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'CreateLiquidityPoolParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'inputBaseTokenAmount',
                        type: 'u64',
                    },
                    {
                        name: 'expectedBaseTokenBalanceAfterTransferFee',
                        type: 'u64',
                    },
                    {
                        name: 'inputQuoteTokenAmount',
                        type: 'u64',
                    },
                    {
                        name: 'expectedQuoteTokenBalanceAfterTransferFee',
                        type: 'u64',
                    },
                    {
                        name: 'openAt',
                        type: 'u64',
                    },
                    {
                        name: 'lockLiquidityProviderTokenUntil',
                        type: 'u64',
                    },
                    {
                        name: 'buyTax',
                        type: 'u64',
                    },
                    {
                        name: 'sellTax',
                        type: 'u64',
                    },
                    {
                        name: 'encodedUserDefinedEventData',
                        type: 'string',
                    },
                    {
                        name: 'burnLpTokens',
                        type: 'bool',
                    },
                ],
            },
        },
        {
            name: 'ProtocolConfigParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'createPoolFee',
                        type: 'u64',
                    },
                    {
                        name: 'protocolSwapFeeNumerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocolSwapFeeDenominator',
                        type: 'u64',
                    },
                    {
                        name: 'swapFeeNumerator',
                        type: 'u64',
                    },
                    {
                        name: 'swapFeeDenominator',
                        type: 'u64',
                    },
                    {
                        name: 'allowCreatePool',
                        type: 'bool',
                    },
                    {
                        name: 'protocolTaxNumerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocolTaxDenominator',
                        type: 'u64',
                    },
                ],
            },
        },
        {
            name: 'RemoveLiquidityParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'amount',
                        type: 'u64',
                    },
                    {
                        name: 'minimumBaseTokenAmount',
                        type: 'u64',
                    },
                    {
                        name: 'minimumQuoteTokenAmount',
                        type: 'u64',
                    },
                    {
                        name: 'encodedUserDefinedEventData',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'SwapInParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'amountIn',
                        type: 'u64',
                    },
                    {
                        name: 'minimumAmountOut',
                        type: 'u64',
                    },
                    {
                        name: 'swapDirection',
                        type: {
                            defined: 'SwapDirection',
                        },
                    },
                    {
                        name: 'encodedUserDefinedEventData',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'SwapOutParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'maxAmountIn',
                        type: 'u64',
                    },
                    {
                        name: 'amountOut',
                        type: 'u64',
                    },
                    {
                        name: 'swapDirection',
                        type: {
                            defined: 'SwapDirection',
                        },
                    },
                    {
                        name: 'encodedUserDefinedEventData',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'UpdateLiquidityPoolParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'allowSwap',
                        type: 'bool',
                    },
                    {
                        name: 'allowAddLiquidity',
                        type: 'bool',
                    },
                    {
                        name: 'allowRemoveLiquidity',
                        type: 'bool',
                    },
                    {
                        name: 'buyTax',
                        type: 'u64',
                    },
                    {
                        name: 'sellTax',
                        type: 'u64',
                    },
                    {
                        name: 'lockUntil',
                        type: 'u64',
                    },
                    {
                        name: 'encodedUserDefinedEventData',
                        type: 'string',
                    },
                    {
                        name: 'openAt',
                        type: 'u64',
                    },
                ],
            },
        },
        {
            name: 'SwapDirection',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Quote2Base',
                    },
                    {
                        name: 'Base2Quote',
                    },
                ],
            },
        },
        {
            name: 'TaxationMode',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'None',
                    },
                    {
                        name: 'Base',
                    },
                    {
                        name: 'Quote',
                    },
                ],
            },
        },
        {
            name: 'StableCoin',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'WSOL',
                    },
                    {
                        name: 'USDC',
                    },
                    {
                        name: 'USDT',
                    },
                ],
            },
        },
        {
            name: 'RoundDirection',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Floor',
                    },
                    {
                        name: 'Ceiling',
                    },
                ],
            },
        },
        {
            name: 'ProtocolSwapFeeDirection',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'None',
                    },
                    {
                        name: 'Base',
                    },
                    {
                        name: 'Quote',
                    },
                ],
            },
        },
        {
            name: 'AddLiquiditySide',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Base',
                    },
                    {
                        name: 'Quote',
                    },
                ],
            },
        },
        {
            name: 'SupportedTokenMint',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Token',
                    },
                    {
                        name: 'Token2022',
                    },
                ],
            },
        },
    ],
    events: [
        {
            name: 'AddLiquidityEvent',
            fields: [
                {
                    name: 'liquidityPoolId',
                    type: 'publicKey',
                    index: true,
                },
                {
                    name: 'user',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'baseTokenInputAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'quoteTokenInputAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'lpTokenOutputAmount',
                    type: 'u64',
                    index: false,
                },
            ],
        },
        {
            name: 'CreateLiquidityPoolEvent',
            fields: [
                {
                    name: 'liquidityPoolId',
                    type: 'publicKey',
                    index: true,
                },
                {
                    name: 'user',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'baseTokenInputTransferFeeAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'quoteTokenInputTransferFeeAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'baseTokenInputAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'quoteTokenInputAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'lpTokenOutputAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'lockedLp',
                    type: 'bool',
                    index: false,
                },
            ],
        },
        {
            name: 'RemoveLiquidityEvent',
            fields: [
                {
                    name: 'liquidityPoolId',
                    type: 'publicKey',
                    index: true,
                },
                {
                    name: 'user',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'baseTokenAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'quoteTokenAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'lpTokenAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'baseTokenTransferFeeAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'quoteTokenTransferFeeAmount',
                    type: 'u64',
                    index: false,
                },
            ],
        },
        {
            name: 'SwapInEvent',
            fields: [
                {
                    name: 'liquidityPoolId',
                    type: 'publicKey',
                    index: true,
                },
                {
                    name: 'user',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'swapDirection',
                    type: {
                        defined: 'SwapDirection',
                    },
                    index: false,
                },
                {
                    name: 'swapAmountIn',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'swapAmountOut',
                    type: 'u64',
                    index: false,
                },
            ],
        },
        {
            name: 'SwapOutEvent',
            fields: [
                {
                    name: 'liquidityPoolId',
                    type: 'publicKey',
                    index: true,
                },
                {
                    name: 'user',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'swapDirection',
                    type: {
                        defined: 'SwapDirection',
                    },
                    index: false,
                },
                {
                    name: 'swapAmountIn',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'swapAmountOut',
                    type: 'u64',
                    index: false,
                },
            ],
        },
        {
            name: 'UpdateLiquidityPoolEvent',
            fields: [
                {
                    name: 'liquidityPoolId',
                    type: 'publicKey',
                    index: true,
                },
                {
                    name: 'user',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'allowSwap',
                    type: 'bool',
                    index: false,
                },
                {
                    name: 'allowAddLiquidity',
                    type: 'bool',
                    index: false,
                },
                {
                    name: 'allowRemoveLiquidity',
                    type: 'bool',
                    index: false,
                },
                {
                    name: 'buyTax',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'sellTax',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'lockUntil',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'taxationMode',
                    type: {
                        defined: 'TaxationMode',
                    },
                    index: false,
                },
                {
                    name: 'openAt',
                    type: 'u64',
                    index: false,
                },
            ],
        },
        {
            name: 'UserDefinedEvent',
            fields: [
                {
                    name: 'liquidityPoolId',
                    type: 'publicKey',
                    index: true,
                },
                {
                    name: 'instructionName',
                    type: 'string',
                    index: false,
                },
                {
                    name: 'base64Data',
                    type: 'string',
                    index: false,
                },
            ],
        },
    ],
    errors: [
        {
            code: 6000,
            name: 'UnsupportedTokenMint',
            msg: 'Unsupported token mint',
        },
        {
            code: 6001,
            name: 'InvalidTokenVaultBalance',
            msg: 'Invalid token vault balance',
        },
        {
            code: 6002,
            name: 'InvalidUserToken',
            msg: 'Invalid user token',
        },
        {
            code: 6003,
            name: 'InvalidTaxationMode',
            msg: 'Invalid taxation mode',
        },
        {
            code: 6004,
            name: 'InvalidOwner',
            msg: 'Invalid owner',
        },
        {
            code: 6005,
            name: 'InvalidLockLiquidityProviderTokenPercentage',
            msg: 'Invalid lock liquidity provider token percentage',
        },
        {
            code: 6006,
            name: 'CannotCreatePoolWithDisabledProtocolConfigVersion',
            msg: 'Cannot create pool with the a disabled protocol config version',
        },
        {
            code: 6007,
            name: 'InvalidTokenInputAmount',
            msg: 'Invalid token input amount',
        },
        {
            code: 6008,
            name: 'InvalidSwapTax',
            msg: 'Invalid swap tax',
        },
        {
            code: 6009,
            name: 'InvalidFeeMode',
            msg: 'Invalid fee mode',
        },
        {
            code: 6010,
            name: 'InvalidLiquidityProviderTokenLockVault',
            msg: 'Invalid liquidity provider token lock vault',
        },
        {
            code: 6011,
            name: 'InvalidUserLiquidityProviderTokenVault',
            msg: 'Invalid liquidity provider token vault',
        },
        {
            code: 6012,
            name: 'InsufficientBalance',
            msg: 'Insufficient balance',
        },
        {
            code: 6013,
            name: 'ExceededSlippage',
            msg: 'Exceeded slippage',
        },
        {
            code: 6014,
            name: 'InvalidAddLiquidityInput',
            msg: 'Invalid add liquidity input',
        },
        {
            code: 6015,
            name: 'InvalidRemoveLiquidityInput',
            msg: 'Invalid remove liquidity input',
        },
        {
            code: 6016,
            name: 'AddLiquidityDisabled',
            msg: 'Add liquidity is disabled',
        },
        {
            code: 6017,
            name: 'RemoveLiquidityDisabled',
            msg: 'Remove liquidity is disabled',
        },
        {
            code: 6018,
            name: 'SwapDisabled',
            msg: 'Swap is disabled',
        },
        {
            code: 6019,
            name: 'LiquidityPoolIsNotOpenYet',
            msg: 'Liquidity pool is not open yet',
        },
        {
            code: 6020,
            name: 'InvalidSwapInInputs',
            msg: 'Invalid swap in inputs',
        },
        {
            code: 6021,
            name: 'InvalidProtocolSwapFeeWallet',
            msg: 'Invalid protocol swap fee wallet',
        },
        {
            code: 6022,
            name: 'InvalidSwapOutInputs',
            msg: 'Invalid swap out inputs',
        },
        {
            code: 6023,
            name: 'InvalidPostFeeAmount',
            msg: 'Invalid post fee amount',
        },
        {
            code: 6024,
            name: 'ExceededQuoteTokenSlippage',
            msg: 'Exceeded quote token slippage',
        },
        {
            code: 6025,
            name: 'ExceededBaseTokenSlippage',
            msg: 'Exceeded base token slippage',
        },
        {
            code: 6026,
            name: 'LpTokensLocked',
            msg: 'Lp tokens locked',
        },
        {
            code: 6027,
            name: 'InvalidProtocolBaseTokenSwapFeeVault',
            msg: 'Invalid protocol base token swap fee vault',
        },
        {
            code: 6028,
            name: 'InvalidProtocolQuoteTokenSwapFeeVault',
            msg: 'Invalid protocol quote token swap fee vault',
        },
        {
            code: 6029,
            name: 'InvalidUserPoolStatsAccount',
            msg: 'Invalid user pool stats account',
        },
        {
            code: 6030,
            name: 'InvalidUserGlobalStatsAccount',
            msg: 'Invalid user global stats account',
        },
        {
            code: 6031,
            name: 'CannotUpdateLpLock',
            msg: 'Cannot update lp lock',
        },
        {
            code: 6032,
            name: 'ZeroAmount',
            msg: 'Zero amount',
        },
        {
            code: 6033,
            name: 'CannotUpdateLpOpenTime',
            msg: 'Cannot update lp open time',
        },
        {
            code: 6034,
            name: 'CannotSetLockBurnLpTokens',
            msg: 'Cannot set lock burn lp tokens',
        },
        {
            code: 6035,
            name: 'InvalidTax',
            msg: 'Invalid tax',
        },
        {
            code: 6036,
            name: 'InvalidChainlinkFeedAccount',
            msg: 'Invalid chainlink feed account',
        },
        {
            code: 6037,
            name: 'InvalidChainlinkProgram',
            msg: 'Invalid chainlink program',
        },
    ],
};

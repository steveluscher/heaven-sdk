export const IDL = {
    address: 'HEAVEnMX7RoaYCucpyFterLWzFJR8Ah26oNSnqBs5Jtn',
    metadata: {
        name: 'heaven_anchor_amm',
        version: '0.1.0',
        spec: '0.1.0',
        description: 'Created with Anchor',
    },
    instructions: [
        {
            name: 'add_liquidity',
            discriminator: [181, 157, 89, 67, 143, 182, 52, 72],
            accounts: [
                {
                    name: 'token_program',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'base_token_program',
                },
                {
                    name: 'quote_token_program',
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'associated_token_program',
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
                },
                {
                    name: 'authority',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'base_token_mint',
                },
                {
                    name: 'quote_token_mint',
                },
                {
                    name: 'lp_token_mint',
                    writable: true,
                },
                {
                    name: 'user_base_token_vault',
                    writable: true,
                },
                {
                    name: 'user_quote_token_vault',
                    writable: true,
                },
                {
                    name: 'user_lp_token_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'base_token_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'user_amm_stats',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    117, 115, 101, 114, 95, 97, 109, 109, 95,
                                    115, 116, 97, 116, 115,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'user',
                            },
                            {
                                kind: 'account',
                                path: 'liquidity_pool_state',
                            },
                        ],
                    },
                },
                {
                    name: 'quote_token_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'user_global_stats',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    117, 115, 101, 114, 95, 103, 108, 111, 98,
                                    97, 108, 95, 115, 116, 97, 116, 115,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'user',
                            },
                        ],
                    },
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: {
                            name: 'AddLiquidityParams',
                        },
                    },
                },
            ],
        },
        {
            name: 'claim_lp_tokens',
            discriminator: [233, 167, 205, 67, 124, 222, 169, 86],
            accounts: [
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'authority',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'lp_token_lock_vault',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    108, 105, 113, 117, 105, 100, 105, 116, 121,
                                    95, 112, 111, 111, 108, 95, 116, 111, 107,
                                    101, 110, 95, 118, 97, 117, 108, 116,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'user',
                            },
                            {
                                kind: 'account',
                                path: 'liquidity_pool_state',
                            },
                        ],
                    },
                },
                {
                    name: 'user_lp_token_vault',
                    writable: true,
                },
                {
                    name: 'token_program',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'lp_token_mint',
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: {
                            name: 'ClaimLpTokensParams',
                        },
                    },
                },
            ],
        },
        {
            name: 'claim_protocol_swap_fee',
            discriminator: [149, 27, 138, 16, 12, 182, 118, 218],
            accounts: [
                {
                    name: 'owner',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'token_program',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'base_token_program',
                },
                {
                    name: 'quote_token_program',
                },
                {
                    name: 'associated_token_program',
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'protocol_base_token_swap_fee_vault',
                    writable: true,
                },
                {
                    name: 'owner_base_token_swap_fee_vault',
                    writable: true,
                },
                {
                    name: 'protocol_quote_token_swap_fee_vault',
                    writable: true,
                },
                {
                    name: 'owner_quote_token_swap_fee_vault',
                    writable: true,
                },
                {
                    name: 'authority',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'base_token_mint',
                },
                {
                    name: 'quote_token_mint',
                },
                {
                    name: 'protocol_owner_state',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    112, 114, 111, 116, 111, 99, 111, 108, 95,
                                    111, 119, 110, 101, 114, 95, 115, 116, 97,
                                    116, 101,
                                ],
                            },
                        ],
                    },
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: {
                            name: 'ClaimProtocolSwapFeeParams',
                        },
                    },
                },
            ],
        },
        {
            name: 'claim_swap_fee',
            discriminator: [151, 78, 98, 61, 163, 87, 133, 33],
            accounts: [
                {
                    name: 'base_token_program',
                },
                {
                    name: 'quote_token_program',
                },
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'authority',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'base_token_mint',
                },
                {
                    name: 'quote_token_mint',
                },
                {
                    name: 'base_token_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'quote_token_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'user_quote_token_vault',
                    writable: true,
                },
                {
                    name: 'user_base_token_vault',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [
                {
                    name: 'base_amount',
                    type: 'u64',
                },
                {
                    name: 'quote_amount',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'claim_swap_tax',
            discriminator: [216, 30, 72, 117, 38, 125, 118, 215],
            accounts: [
                {
                    name: 'base_token_program',
                },
                {
                    name: 'quote_token_program',
                },
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'authority',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'base_token_mint',
                },
                {
                    name: 'quote_token_mint',
                },
                {
                    name: 'base_token_swap_tax_vault',
                    docs: ['CHECK'],
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    108, 112, 95, 115, 119, 97, 112, 95, 116,
                                    97, 120, 95, 116, 111, 107, 101, 110, 95,
                                    118, 97, 117, 108, 116,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'liquidity_pool_state',
                            },
                            {
                                kind: 'account',
                                path: 'base_token_mint',
                            },
                        ],
                    },
                },
                {
                    name: 'quote_token_swap_tax_vault',
                    docs: ['CHECK'],
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    108, 112, 95, 115, 119, 97, 112, 95, 116,
                                    97, 120, 95, 116, 111, 107, 101, 110, 95,
                                    118, 97, 117, 108, 116,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'liquidity_pool_state',
                            },
                            {
                                kind: 'account',
                                path: 'quote_token_mint',
                            },
                        ],
                    },
                },
                {
                    name: 'user_quote_token_vault',
                    writable: true,
                },
                {
                    name: 'user_base_token_vault',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: {
                            name: 'ClaimSwapTaxParams',
                        },
                    },
                },
            ],
        },
        {
            name: 'create_extras_account',
            discriminator: [232, 203, 133, 126, 114, 81, 33, 190],
            accounts: [
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'data',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    101, 120, 116, 114, 97, 115, 95, 97, 99, 99,
                                    111, 117, 110, 116,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'user',
                            },
                        ],
                    },
                },
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
            ],
            args: [
                {
                    name: 'value',
                    type: {
                        defined: {
                            name: 'ExtrasAccountParams',
                        },
                    },
                },
            ],
        },
        {
            name: 'create_liquidity_pool',
            discriminator: [175, 75, 181, 165, 224, 254, 6, 131],
            accounts: [
                {
                    name: 'token_program',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'base_token_program',
                },
                {
                    name: 'quote_token_program',
                },
                {
                    name: 'associated_token_program',
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'rent',
                    address: 'SysvarRent111111111111111111111111111111111',
                },
                {
                    name: 'pool_creation_fee_wallet',
                    docs: ['create pool fee account'],
                    writable: true,
                    address: 'CYTDCTNLEaBFD5GLs6MyaoVh4nqozH2B4vNPWEBgNBsX',
                },
                {
                    name: 'authority',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'base_token_mint',
                },
                {
                    name: 'quote_token_mint',
                },
                {
                    name: 'lp_token_mint',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    108, 105, 113, 117, 105, 100, 105, 116, 121,
                                    95, 112, 114, 111, 118, 105, 100, 101, 114,
                                    95, 116, 111, 107, 101, 110, 95, 109, 105,
                                    110, 116,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'liquidity_pool_state',
                            },
                        ],
                    },
                },
                {
                    name: 'user_base_token_vault',
                    writable: true,
                },
                {
                    name: 'user_quote_token_vault',
                    writable: true,
                },
                {
                    name: 'base_token_vault',
                    docs: ['CHECK'],
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    108, 105, 113, 117, 105, 100, 105, 116, 121,
                                    95, 112, 111, 111, 108, 95, 116, 111, 107,
                                    101, 110, 95, 118, 97, 117, 108, 116,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'liquidity_pool_state',
                            },
                            {
                                kind: 'account',
                                path: 'base_token_mint',
                            },
                        ],
                    },
                },
                {
                    name: 'quote_token_vault',
                    docs: ['CHECK'],
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    108, 105, 113, 117, 105, 100, 105, 116, 121,
                                    95, 112, 111, 111, 108, 95, 116, 111, 107,
                                    101, 110, 95, 118, 97, 117, 108, 116,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'liquidity_pool_state',
                            },
                            {
                                kind: 'account',
                                path: 'quote_token_mint',
                            },
                        ],
                    },
                },
                {
                    name: 'base_token_swap_tax_vault',
                    docs: ['CHECK'],
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    108, 112, 95, 115, 119, 97, 112, 95, 116,
                                    97, 120, 95, 116, 111, 107, 101, 110, 95,
                                    118, 97, 117, 108, 116,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'liquidity_pool_state',
                            },
                            {
                                kind: 'account',
                                path: 'base_token_mint',
                            },
                        ],
                    },
                },
                {
                    name: 'quote_token_swap_tax_vault',
                    docs: ['CHECK'],
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    108, 112, 95, 115, 119, 97, 112, 95, 116,
                                    97, 120, 95, 116, 111, 107, 101, 110, 95,
                                    118, 97, 117, 108, 116,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'liquidity_pool_state',
                            },
                            {
                                kind: 'account',
                                path: 'quote_token_mint',
                            },
                        ],
                    },
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    108, 105, 113, 117, 105, 100, 105, 116, 121,
                                    95, 112, 111, 111, 108, 95, 115, 116, 97,
                                    116, 101,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'user',
                            },
                            {
                                kind: 'account',
                                path: 'base_token_mint',
                            },
                            {
                                kind: 'account',
                                path: 'quote_token_mint',
                            },
                        ],
                    },
                },
                {
                    name: 'lp_token_lock_vault',
                    writable: true,
                },
                {
                    name: 'protocol_config',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    112, 114, 111, 116, 111, 99, 111, 108, 95,
                                    99, 111, 110, 102, 105, 103, 95, 115, 116,
                                    97, 116, 101,
                                ],
                            },
                            {
                                kind: 'arg',
                                path: 'protocol_config_version',
                            },
                        ],
                    },
                },
            ],
            args: [
                {
                    name: 'protocol_config_version',
                    type: 'u16',
                },
                {
                    name: 'params',
                    type: {
                        defined: {
                            name: 'CreateLiquidityPoolParams',
                        },
                    },
                },
            ],
        },
        {
            name: 'create_or_update_protocol_owner',
            discriminator: [170, 124, 128, 40, 48, 105, 139, 148],
            accounts: [
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'current_owner',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'new_owner',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'protocol_owner_state',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    112, 114, 111, 116, 111, 99, 111, 108, 95,
                                    111, 119, 110, 101, 114, 95, 115, 116, 97,
                                    116, 101,
                                ],
                            },
                        ],
                    },
                },
            ],
            args: [],
        },
        {
            name: 'create_protocol_config',
            discriminator: [115, 114, 24, 111, 14, 53, 113, 254],
            accounts: [
                {
                    name: 'owner',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'protocol_config_state',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    112, 114, 111, 116, 111, 99, 111, 108, 95,
                                    99, 111, 110, 102, 105, 103, 95, 115, 116,
                                    97, 116, 101,
                                ],
                            },
                            {
                                kind: 'arg',
                                path: 'version',
                            },
                        ],
                    },
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'protocol_owner_state',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    112, 114, 111, 116, 111, 99, 111, 108, 95,
                                    111, 119, 110, 101, 114, 95, 115, 116, 97,
                                    116, 101,
                                ],
                            },
                        ],
                    },
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
                        defined: {
                            name: 'ProtocolConfigParams',
                        },
                    },
                },
            ],
        },
        {
            name: 'disable_add_liquidity',
            discriminator: [47, 199, 142, 71, 109, 51, 200, 162],
            accounts: [
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [],
        },
        {
            name: 'disable_remove_liquidity',
            discriminator: [79, 197, 25, 109, 17, 125, 182, 61],
            accounts: [
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [],
        },
        {
            name: 'disable_swap',
            discriminator: [98, 129, 61, 128, 68, 223, 5, 194],
            accounts: [
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [],
        },
        {
            name: 'enable_add_liquidity',
            discriminator: [14, 212, 247, 33, 36, 255, 16, 27],
            accounts: [
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [],
        },
        {
            name: 'enable_remove_liquidity',
            discriminator: [244, 63, 107, 38, 169, 136, 125, 87],
            accounts: [
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [],
        },
        {
            name: 'enable_swap',
            discriminator: [88, 176, 34, 26, 54, 192, 186, 91],
            accounts: [
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [],
        },
        {
            name: 'extend_liquidity_pool_lock',
            discriminator: [52, 19, 133, 193, 81, 251, 39, 207],
            accounts: [
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [
                {
                    name: 'value',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'lock_liquidity_pool_taxation',
            discriminator: [40, 173, 78, 151, 140, 47, 109, 8],
            accounts: [
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [],
        },
        {
            name: 'remove_liquidity',
            discriminator: [80, 85, 209, 72, 24, 206, 177, 108],
            accounts: [
                {
                    name: 'token_program',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'base_token_program',
                },
                {
                    name: 'quote_token_program',
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'associated_token_program',
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
                },
                {
                    name: 'authority',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'base_token_mint',
                },
                {
                    name: 'quote_token_mint',
                },
                {
                    name: 'lp_token_mint',
                    writable: true,
                },
                {
                    name: 'user_base_token_vault',
                    writable: true,
                },
                {
                    name: 'user_quote_token_vault',
                    writable: true,
                },
                {
                    name: 'user_lp_token_vault',
                    writable: true,
                },
                {
                    name: 'base_token_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'user_amm_stats',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    117, 115, 101, 114, 95, 97, 109, 109, 95,
                                    115, 116, 97, 116, 115,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'user',
                            },
                            {
                                kind: 'account',
                                path: 'liquidity_pool_state',
                            },
                        ],
                    },
                },
                {
                    name: 'quote_token_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'user_global_stats',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    117, 115, 101, 114, 95, 103, 108, 111, 98,
                                    97, 108, 95, 115, 116, 97, 116, 115,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'user',
                            },
                        ],
                    },
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: {
                            name: 'RemoveLiquidityParams',
                        },
                    },
                },
            ],
        },
        {
            name: 'swap_in',
            discriminator: [141, 172, 10, 208, 69, 9, 56, 154],
            accounts: [
                {
                    name: 'token_program',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'base_token_program',
                },
                {
                    name: 'quote_token_program',
                },
                {
                    name: 'associated_token_program',
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'authority',
                    docs: ['create pool fee account'],
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'base_token_mint',
                },
                {
                    name: 'quote_token_mint',
                },
                {
                    name: 'user_base_token_vault',
                    writable: true,
                },
                {
                    name: 'user_quote_token_vault',
                    writable: true,
                },
                {
                    name: 'base_token_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'quote_token_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'base_token_swap_tax_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'quote_token_swap_tax_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'protocol_base_token_swap_fee_vault',
                    writable: true,
                },
                {
                    name: 'protocol_quote_token_swap_fee_vault',
                    writable: true,
                },
                {
                    name: 'user_amm_stats',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    117, 115, 101, 114, 95, 97, 109, 109, 95,
                                    115, 116, 97, 116, 115,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'user',
                            },
                            {
                                kind: 'account',
                                path: 'liquidity_pool_state',
                            },
                        ],
                    },
                },
                {
                    name: 'user_global_stats',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    117, 115, 101, 114, 95, 103, 108, 111, 98,
                                    97, 108, 95, 115, 116, 97, 116, 115,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'user',
                            },
                        ],
                    },
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: {
                            name: 'SwapInParams',
                        },
                    },
                },
            ],
        },
        {
            name: 'swap_out',
            discriminator: [206, 36, 149, 14, 163, 132, 148, 1],
            accounts: [
                {
                    name: 'token_program',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'base_token_program',
                },
                {
                    name: 'quote_token_program',
                },
                {
                    name: 'associated_token_program',
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'authority',
                    docs: ['create pool fee account'],
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'base_token_mint',
                },
                {
                    name: 'quote_token_mint',
                },
                {
                    name: 'user_base_token_vault',
                    writable: true,
                },
                {
                    name: 'user_quote_token_vault',
                    writable: true,
                },
                {
                    name: 'base_token_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'quote_token_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'base_token_swap_tax_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'quote_token_swap_tax_vault',
                    docs: ['CHECK'],
                    writable: true,
                },
                {
                    name: 'protocol_base_token_swap_fee_vault',
                    writable: true,
                },
                {
                    name: 'protocol_quote_token_swap_fee_vault',
                    writable: true,
                },
                {
                    name: 'user_amm_stats',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    117, 115, 101, 114, 95, 97, 109, 109, 95,
                                    115, 116, 97, 116, 115,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'user',
                            },
                            {
                                kind: 'account',
                                path: 'liquidity_pool_state',
                            },
                        ],
                    },
                },
                {
                    name: 'user_global_stats',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    117, 115, 101, 114, 95, 103, 108, 111, 98,
                                    97, 108, 95, 115, 116, 97, 116, 115,
                                ],
                            },
                            {
                                kind: 'account',
                                path: 'user',
                            },
                        ],
                    },
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: {
                            name: 'SwapOutParams',
                        },
                    },
                },
            ],
        },
        {
            name: 'update_liquidity_pool',
            discriminator: [255, 60, 178, 169, 154, 62, 55, 243],
            accounts: [
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: {
                            name: 'UpdateLiquidityPoolParams',
                        },
                    },
                },
            ],
        },
        {
            name: 'update_liquidity_pool_buy_tax',
            discriminator: [202, 57, 18, 27, 23, 107, 163, 91],
            accounts: [
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [
                {
                    name: 'value',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'update_liquidity_pool_open_at',
            discriminator: [16, 119, 94, 174, 150, 168, 152, 79],
            accounts: [
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [
                {
                    name: 'value',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'update_liquidity_pool_protocol_config',
            discriminator: [22, 222, 244, 85, 120, 106, 67, 52],
            accounts: [
                {
                    name: 'owner',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'protocol_owner_state',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    112, 114, 111, 116, 111, 99, 111, 108, 95,
                                    111, 119, 110, 101, 114, 95, 115, 116, 97,
                                    116, 101,
                                ],
                            },
                            {
                                kind: 'arg',
                                path: 'version',
                            },
                        ],
                    },
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: {
                            name: 'UpdateLiquidityPoolProtocolConfigParams',
                        },
                    },
                },
            ],
        },
        {
            name: 'update_liquidity_pool_sell_tax',
            discriminator: [125, 22, 7, 164, 50, 14, 221, 4],
            accounts: [
                {
                    name: 'user',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'liquidity_pool_state',
                    writable: true,
                },
                {
                    name: 'system_program',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [
                {
                    name: 'value',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'update_protocol_config',
            discriminator: [197, 97, 123, 54, 221, 168, 11, 135],
            accounts: [
                {
                    name: 'owner',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'protocol_config_state',
                    writable: true,
                },
                {
                    name: 'protocol_owner_state',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    112, 114, 111, 116, 111, 99, 111, 108, 95,
                                    111, 119, 110, 101, 114, 95, 115, 116, 97,
                                    116, 101,
                                ],
                            },
                            {
                                kind: 'arg',
                                path: 'version',
                            },
                        ],
                    },
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
                        defined: {
                            name: 'ProtocolConfigParams',
                        },
                    },
                },
            ],
        },
    ],
    accounts: [
        {
            name: 'GlobalUserStats',
            discriminator: [156, 207, 33, 142, 82, 131, 21, 186],
        },
        {
            name: 'LiquidityPoolState',
            discriminator: [190, 158, 220, 130, 15, 162, 132, 252],
        },
        {
            name: 'LiquidityPoolUserStats',
            discriminator: [194, 126, 118, 57, 49, 157, 198, 182],
        },
        {
            name: 'ProtocolConfig',
            discriminator: [207, 91, 250, 28, 152, 179, 215, 209],
        },
        {
            name: 'ProtocolOwnerState',
            discriminator: [208, 64, 209, 204, 113, 226, 22, 98],
        },
    ],
    events: [
        {
            name: 'AddLiquidityEvent',
            discriminator: [27, 178, 153, 186, 47, 196, 140, 45],
        },
        {
            name: 'CreateLiquidityPoolEvent',
            discriminator: [116, 216, 239, 141, 207, 211, 178, 127],
        },
        {
            name: 'RemoveLiquidityEvent',
            discriminator: [141, 199, 182, 123, 159, 94, 215, 102],
        },
        {
            name: 'SwapInEvent',
            discriminator: [146, 253, 181, 79, 103, 71, 195, 125],
        },
        {
            name: 'SwapOutEvent',
            discriminator: [21, 117, 255, 136, 215, 209, 131, 32],
        },
        {
            name: 'UpdateLiquidityPoolEvent',
            discriminator: [73, 12, 110, 179, 184, 134, 20, 248],
        },
        {
            name: 'UserDefinedEvent',
            discriminator: [33, 21, 108, 20, 241, 244, 167, 131],
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
        {
            code: 6038,
            name: 'InvalidConfigVersion',
            msg: 'Invalid config version',
        },
        {
            code: 6039,
            name: 'CannotUpdateLockedTaxation',
            msg: 'Cannot update locked taxation',
        },
        {
            code: 6040,
            name: 'CannotClaimSwapFee',
            msg: 'Cannot claim swap fee',
        },
        {
            code: 6041,
            name: 'NonCreatorCannotAddLp',
            msg: 'This pool does not allow non-creator to add lp',
        },
    ],
    types: [
        {
            name: 'AddLiquidityEvent',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'liquidity_pool_id',
                        type: 'pubkey',
                    },
                    {
                        name: 'user',
                        type: 'pubkey',
                    },
                    {
                        name: 'base_token_input_amount',
                        type: 'u64',
                    },
                    {
                        name: 'quote_token_input_amount',
                        type: 'u64',
                    },
                    {
                        name: 'lp_token_output_amount',
                        type: 'u64',
                    },
                ],
            },
        },
        {
            name: 'AddLiquidityParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'max_base_token_amount',
                        type: 'u64',
                    },
                    {
                        name: 'max_quote_token_amount',
                        type: 'u64',
                    },
                    {
                        name: 'base_side',
                        type: {
                            defined: {
                                name: 'AddLiquiditySide',
                            },
                        },
                    },
                    {
                        name: 'encoded_user_defined_event_data',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'AddLiquiditySide',
            repr: {
                kind: 'rust',
            },
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
                        name: 'base_amount',
                        type: 'u64',
                    },
                    {
                        name: 'quote_amount',
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
                        name: 'quote_amount',
                        type: 'u64',
                    },
                    {
                        name: 'base_amount',
                        type: 'u64',
                    },
                    {
                        name: 'encoded_user_defined_event_data',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'CreateLiquidityPoolEvent',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'liquidity_pool_id',
                        type: 'pubkey',
                    },
                    {
                        name: 'user',
                        type: 'pubkey',
                    },
                    {
                        name: 'base_token_input_transfer_fee_amount',
                        type: 'u64',
                    },
                    {
                        name: 'quote_token_input_transfer_fee_amount',
                        type: 'u64',
                    },
                    {
                        name: 'base_token_input_amount',
                        type: 'u64',
                    },
                    {
                        name: 'quote_token_input_amount',
                        type: 'u64',
                    },
                    {
                        name: 'lp_token_output_amount',
                        type: 'u64',
                    },
                    {
                        name: 'locked_lp',
                        type: 'bool',
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
                        name: 'input_base_token_amount',
                        type: 'u64',
                    },
                    {
                        name: 'expected_base_token_balance_after_transfer_fee',
                        type: 'u64',
                    },
                    {
                        name: 'input_quote_token_amount',
                        type: 'u64',
                    },
                    {
                        name: 'expected_quote_token_balance_after_transfer_fee',
                        type: 'u64',
                    },
                    {
                        name: 'open_at',
                        type: 'u64',
                    },
                    {
                        name: 'lock_liquidity_provider_token_until',
                        type: 'u64',
                    },
                    {
                        name: 'buy_tax',
                        type: 'u64',
                    },
                    {
                        name: 'sell_tax',
                        type: 'u64',
                    },
                    {
                        name: 'encoded_user_defined_event_data',
                        type: 'string',
                    },
                    {
                        name: 'burn_lp_tokens',
                        type: 'bool',
                    },
                    {
                        name: 'disable_non_creator_add_liquidity',
                        type: 'bool',
                    },
                    {
                        name: 'extras',
                        type: {
                            option: {
                                array: ['u8', 8],
                            },
                        },
                    },
                ],
            },
        },
        {
            name: 'GlobalUserStats',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'sell_volume_wsol',
                        type: 'u128',
                    },
                    {
                        name: 'sell_volume_usdc',
                        type: 'u128',
                    },
                    {
                        name: 'sell_volume_usdt',
                        type: 'u128',
                    },
                    {
                        name: 'buy_volume_wsol',
                        type: 'u128',
                    },
                    {
                        name: 'buy_volume_usdc',
                        type: 'u128',
                    },
                    {
                        name: 'buy_volume_usdt',
                        type: 'u128',
                    },
                    {
                        name: 'first_sell_timestamp',
                        type: 'u64',
                    },
                    {
                        name: 'latest_sell_timestamp',
                        type: 'u64',
                    },
                    {
                        name: 'first_buy_timestamp',
                        type: 'u64',
                    },
                    {
                        name: 'latest_buy_timestamp',
                        type: 'u64',
                    },
                    {
                        name: 'first_sell_amount_wsol',
                        type: 'u128',
                    },
                    {
                        name: 'first_sell_amount_usdc',
                        type: 'u128',
                    },
                    {
                        name: 'first_sell_amount_usdt',
                        type: 'u128',
                    },
                    {
                        name: 'first_buy_amount_wsol',
                        type: 'u128',
                    },
                    {
                        name: 'first_buy_amount_usdc',
                        type: 'u128',
                    },
                    {
                        name: 'first_buy_amount_usdt',
                        type: 'u128',
                    },
                    {
                        name: 'sell_count',
                        type: 'u64',
                    },
                    {
                        name: 'buy_count',
                        type: 'u64',
                    },
                    {
                        name: 'liquidity_added_wsol',
                        type: 'u128',
                    },
                    {
                        name: 'liquidity_added_usdc',
                        type: 'u128',
                    },
                    {
                        name: 'liquidity_added_usdt',
                        type: 'u128',
                    },
                    {
                        name: 'liquidity_removed_wsol',
                        type: 'u128',
                    },
                    {
                        name: 'liquidity_removed_usdc',
                        type: 'u128',
                    },
                    {
                        name: 'liquidity_removed_usdt',
                        type: 'u128',
                    },
                    {
                        name: 'add_liquidity_count',
                        type: 'u64',
                    },
                    {
                        name: 'remove_liquidity_count',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_swap_fee_paid_wsol',
                        type: 'u128',
                    },
                    {
                        name: 'protocol_swap_fee_paid_usdc',
                        type: 'u128',
                    },
                    {
                        name: 'protocol_swap_fee_paid_usdt',
                        type: 'u128',
                    },
                    {
                        name: 'pool_swap_fee_paid_wsol',
                        type: 'u128',
                    },
                    {
                        name: 'pool_swap_fee_paid_usdc',
                        type: 'u128',
                    },
                    {
                        name: 'pool_swap_fee_paid_usdt',
                        type: 'u128',
                    },
                    {
                        name: 'pool_swap_tax_paid_wsol',
                        type: 'u128',
                    },
                    {
                        name: 'pool_swap_tax_paid_usdc',
                        type: 'u128',
                    },
                    {
                        name: 'pool_swap_tax_paid_usdt',
                        type: 'u128',
                    },
                    {
                        name: 'protocol_swap_tax_paid_wsol',
                        type: 'u128',
                    },
                    {
                        name: 'protocol_swap_tax_paid_usdc',
                        type: 'u128',
                    },
                    {
                        name: 'protocol_swap_tax_paid_usdt',
                        type: 'u128',
                    },
                ],
            },
        },
        {
            name: 'LiquidityPoolState',
            serialization: 'bytemuckunsafe',
            repr: {
                kind: 'rust',
                packed: true,
            },
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'base_token_mint',
                        type: 'pubkey',
                    },
                    {
                        name: 'base_token_mint_decimals',
                        type: 'u8',
                    },
                    {
                        name: 'base_token_vault',
                        type: 'pubkey',
                    },
                    {
                        name: 'base_token_swap_tax_vault',
                        type: 'pubkey',
                    },
                    {
                        name: 'quote_token_mint',
                        type: 'pubkey',
                    },
                    {
                        name: 'quote_token_mint_decimals',
                        type: 'u8',
                    },
                    {
                        name: 'quote_token_vault',
                        type: 'pubkey',
                    },
                    {
                        name: 'quote_token_swap_tax_vault',
                        type: 'pubkey',
                    },
                    {
                        name: 'protocol_base_token_swap_fee_vault',
                        type: 'pubkey',
                    },
                    {
                        name: 'protocol_quote_token_swap_fee_vault',
                        type: 'pubkey',
                    },
                    {
                        name: 'lp_token_mint',
                        type: 'pubkey',
                    },
                    {
                        name: 'lp_token_mint_decimals',
                        type: 'u8',
                    },
                    {
                        name: 'lp_token_current_supply',
                        type: 'u64',
                    },
                    {
                        name: 'swap_fee_numerator',
                        type: 'u64',
                    },
                    {
                        name: 'swap_fee_denominator',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_swap_fee_numerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_swap_fee_denominator',
                        type: 'u64',
                    },
                    {
                        name: 'buy_tax',
                        type: 'u64',
                    },
                    {
                        name: 'sell_tax',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_tax_numerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_tax_denominator',
                        type: 'u64',
                    },
                    {
                        name: 'creator',
                        type: 'pubkey',
                    },
                    {
                        name: 'authority_bump',
                        type: 'u8',
                    },
                    {
                        name: 'allow_swap',
                        type: 'bool',
                    },
                    {
                        name: 'allow_remove_liquidity',
                        type: 'bool',
                    },
                    {
                        name: 'allow_add_liquidity',
                        type: 'bool',
                    },
                    {
                        name: 'open_at',
                        type: 'u64',
                    },
                    {
                        name: 'created_at',
                        type: 'u64',
                    },
                    {
                        name: 'lock_until',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_config_version',
                        type: 'u16',
                    },
                    {
                        name: 'taxation_mode',
                        type: {
                            defined: {
                                name: 'TaxationMode',
                            },
                        },
                    },
                    {
                        name: 'swap_base_in_amount',
                        type: 'u128',
                    },
                    {
                        name: 'swap_quote_in_amount',
                        type: 'u128',
                    },
                    {
                        name: 'swap_base_out_amount',
                        type: 'u128',
                    },
                    {
                        name: 'swap_quote_out_amount',
                        type: 'u128',
                    },
                    {
                        name: 'swap_base_fee',
                        type: 'u128',
                    },
                    {
                        name: 'swap_quote_fee',
                        type: 'u128',
                    },
                    {
                        name: 'swap_base_to_quote_count',
                        type: 'u128',
                    },
                    {
                        name: 'swap_quote_to_base_count',
                        type: 'u128',
                    },
                    {
                        name: 'swap_in_count',
                        type: 'u128',
                    },
                    {
                        name: 'swap_out_count',
                        type: 'u128',
                    },
                    {
                        name: 'base_swap_tax_amount',
                        type: 'u128',
                    },
                    {
                        name: 'quote_swap_tax_amount',
                        type: 'u128',
                    },
                    {
                        name: 'first_swap_out_timestamp',
                        type: 'u64',
                    },
                    {
                        name: 'latest_swap_out_timestamp',
                        type: 'u64',
                    },
                    {
                        name: 'first_swap_in_timestamp',
                        type: 'u64',
                    },
                    {
                        name: 'latest_swap_in_timestamp',
                        type: 'u64',
                    },
                    {
                        name: 'first_base_to_quote_amount',
                        type: 'u128',
                    },
                    {
                        name: 'latest_base_to_quote_amount',
                        type: 'u128',
                    },
                    {
                        name: 'first_quote_to_base_amount',
                        type: 'u128',
                    },
                    {
                        name: 'latest_quote_to_base_amount',
                        type: 'u128',
                    },
                    {
                        name: 'locked_lp',
                        type: 'u64',
                    },
                    {
                        name: 'initial_lp',
                        type: 'u64',
                    },
                    {
                        name: 'liquidity_added',
                        type: 'u128',
                    },
                    {
                        name: 'liquidity_removed',
                        type: 'u128',
                    },
                    {
                        name: 'is_initial_lp_burned',
                        type: 'bool',
                    },
                    {
                        name: 'base_token_added',
                        type: 'u128',
                    },
                    {
                        name: 'base_token_removed',
                        type: 'u128',
                    },
                    {
                        name: 'quote_token_added',
                        type: 'u128',
                    },
                    {
                        name: 'quote_token_removed',
                        type: 'u128',
                    },
                    {
                        name: 'base_protocol_tax',
                        type: 'u128',
                    },
                    {
                        name: 'quote_protocol_tax',
                        type: 'u128',
                    },
                    {
                        name: 'base_protocol_fee',
                        type: 'u128',
                    },
                    {
                        name: 'quote_protocol_fee',
                        type: 'u128',
                    },
                    {
                        name: 'base_token_vault_balance',
                        type: 'u64',
                    },
                    {
                        name: 'quote_token_vault_balance',
                        type: 'u64',
                    },
                    {
                        name: 'min_price',
                        type: 'f64',
                    },
                    {
                        name: 'max_price',
                        type: 'f64',
                    },
                    {
                        name: 'curr_price',
                        type: 'f64',
                    },
                    {
                        name: 'curr_mc',
                        type: 'f64',
                    },
                    {
                        name: 'min_mc',
                        type: 'f64',
                    },
                    {
                        name: 'max_mc',
                        type: 'f64',
                    },
                    {
                        name: 'locked_taxation',
                        type: 'bool',
                    },
                    {
                        name: 'disable_non_creator_add_liquidity',
                        type: 'bool',
                    },
                    {
                        name: 'allow_creator_claim_swap_fee',
                        type: 'bool',
                    },
                    {
                        name: 'extras',
                        type: {
                            array: ['u8', 8],
                        },
                    },
                ],
            },
        },
        {
            name: 'LiquidityPoolUserStats',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'base_swap_in_count',
                        type: 'u64',
                    },
                    {
                        name: 'quote_swap_in_count',
                        type: 'u64',
                    },
                    {
                        name: 'base_swap_out_count',
                        type: 'u64',
                    },
                    {
                        name: 'quote_swap_out_count',
                        type: 'u64',
                    },
                    {
                        name: 'base_in_amount',
                        type: 'u128',
                    },
                    {
                        name: 'base_out_amount',
                        type: 'u128',
                    },
                    {
                        name: 'quote_in_amount',
                        type: 'u128',
                    },
                    {
                        name: 'quote_out_amount',
                        type: 'u128',
                    },
                    {
                        name: 'first_swap_out_timestamp',
                        type: 'u64',
                    },
                    {
                        name: 'latest_swap_out_timestamp',
                        type: 'u64',
                    },
                    {
                        name: 'first_swap_in_timestamp',
                        type: 'u64',
                    },
                    {
                        name: 'latest_swap_in_timestamp',
                        type: 'u64',
                    },
                    {
                        name: 'base_token_added',
                        type: 'u128',
                    },
                    {
                        name: 'base_token_removed',
                        type: 'u128',
                    },
                    {
                        name: 'quote_token_added',
                        type: 'u128',
                    },
                    {
                        name: 'quote_token_removed',
                        type: 'u128',
                    },
                    {
                        name: 'add_liquidity_count',
                        type: 'u64',
                    },
                    {
                        name: 'remove_liquidity_count',
                        type: 'u64',
                    },
                    {
                        name: 'initial_base_token_added',
                        type: 'u64',
                    },
                    {
                        name: 'initial_quote_token_added',
                        type: 'u64',
                    },
                    {
                        name: 'initial_liquidity_added_timestamp',
                        type: 'u64',
                    },
                    {
                        name: 'base_protocol_swap_fee_paid',
                        type: 'u128',
                    },
                    {
                        name: 'quote_protocol_swap_fee_paid',
                        type: 'u128',
                    },
                    {
                        name: 'base_pool_swap_fee_paid',
                        type: 'u128',
                    },
                    {
                        name: 'quote_pool_swap_fee_paid',
                        type: 'u128',
                    },
                    {
                        name: 'base_pool_swap_tax_paid',
                        type: 'u128',
                    },
                    {
                        name: 'quote_pool_swap_tax_paid',
                        type: 'u128',
                    },
                    {
                        name: 'base_protocol_tax_paid',
                        type: 'u128',
                    },
                    {
                        name: 'quote_protocol_tax_paid',
                        type: 'u128',
                    },
                ],
            },
        },
        {
            name: 'ProtocolConfig',
            docs: ['Holds the current owner of the factory'],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'protocol_config_state_bump',
                        type: 'u8',
                    },
                    {
                        name: 'allow_create_pool',
                        type: 'bool',
                    },
                    {
                        name: 'protocol_swap_fee_numerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_swap_fee_denominator',
                        type: 'u64',
                    },
                    {
                        name: 'swap_fee_numerator',
                        type: 'u64',
                    },
                    {
                        name: 'swap_fee_denominator',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_tax_numerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_tax_denominator',
                        type: 'u64',
                    },
                    {
                        name: 'create_pool_fee',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_owner',
                        type: 'pubkey',
                    },
                    {
                        name: 'version',
                        type: 'u16',
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
                        name: 'create_pool_fee',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_swap_fee_numerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_swap_fee_denominator',
                        type: 'u64',
                    },
                    {
                        name: 'swap_fee_numerator',
                        type: 'u64',
                    },
                    {
                        name: 'swap_fee_denominator',
                        type: 'u64',
                    },
                    {
                        name: 'allow_create_pool',
                        type: 'bool',
                    },
                    {
                        name: 'protocol_tax_numerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_tax_denominator',
                        type: 'u64',
                    },
                ],
            },
        },
        {
            name: 'ProtocolOwnerState',
            docs: ['Holds the current owner of the factory'],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'current_protocol_owner',
                        type: 'pubkey',
                    },
                ],
            },
        },
        {
            name: 'RemoveLiquidityEvent',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'liquidity_pool_id',
                        type: 'pubkey',
                    },
                    {
                        name: 'user',
                        type: 'pubkey',
                    },
                    {
                        name: 'base_token_amount',
                        type: 'u64',
                    },
                    {
                        name: 'quote_token_amount',
                        type: 'u64',
                    },
                    {
                        name: 'lp_token_amount',
                        type: 'u64',
                    },
                    {
                        name: 'base_token_transfer_fee_amount',
                        type: 'u64',
                    },
                    {
                        name: 'quote_token_transfer_fee_amount',
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
                        name: 'minimum_base_token_amount',
                        type: 'u64',
                    },
                    {
                        name: 'minimum_quote_token_amount',
                        type: 'u64',
                    },
                    {
                        name: 'encoded_user_defined_event_data',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'SwapDirection',
            repr: {
                kind: 'rust',
            },
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
            name: 'SwapInEvent',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'liquidity_pool_id',
                        type: 'pubkey',
                    },
                    {
                        name: 'user',
                        type: 'pubkey',
                    },
                    {
                        name: 'swap_direction',
                        type: {
                            defined: {
                                name: 'SwapDirection',
                            },
                        },
                    },
                    {
                        name: 'swap_amount_in',
                        type: 'u64',
                    },
                    {
                        name: 'swap_amount_out',
                        type: 'u64',
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
                        name: 'amount_in',
                        type: 'u64',
                    },
                    {
                        name: 'minimum_amount_out',
                        type: 'u64',
                    },
                    {
                        name: 'swap_direction',
                        type: {
                            defined: {
                                name: 'SwapDirection',
                            },
                        },
                    },
                    {
                        name: 'encoded_user_defined_event_data',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'SwapOutEvent',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'liquidity_pool_id',
                        type: 'pubkey',
                    },
                    {
                        name: 'user',
                        type: 'pubkey',
                    },
                    {
                        name: 'swap_direction',
                        type: {
                            defined: {
                                name: 'SwapDirection',
                            },
                        },
                    },
                    {
                        name: 'swap_amount_in',
                        type: 'u64',
                    },
                    {
                        name: 'swap_amount_out',
                        type: 'u64',
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
                        name: 'max_amount_in',
                        type: 'u64',
                    },
                    {
                        name: 'amount_out',
                        type: 'u64',
                    },
                    {
                        name: 'swap_direction',
                        type: {
                            defined: {
                                name: 'SwapDirection',
                            },
                        },
                    },
                    {
                        name: 'encoded_user_defined_event_data',
                        type: 'string',
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
            name: 'UpdateLiquidityPoolEvent',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'liquidity_pool_id',
                        type: 'pubkey',
                    },
                    {
                        name: 'user',
                        type: 'pubkey',
                    },
                    {
                        name: 'allow_swap',
                        type: 'bool',
                    },
                    {
                        name: 'allow_add_liquidity',
                        type: 'bool',
                    },
                    {
                        name: 'allow_remove_liquidity',
                        type: 'bool',
                    },
                    {
                        name: 'buy_tax',
                        type: 'u64',
                    },
                    {
                        name: 'sell_tax',
                        type: 'u64',
                    },
                    {
                        name: 'lock_until',
                        type: 'u64',
                    },
                    {
                        name: 'taxation_mode',
                        type: {
                            defined: {
                                name: 'TaxationMode',
                            },
                        },
                    },
                    {
                        name: 'open_at',
                        type: 'u64',
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
                        name: 'allow_swap',
                        type: 'bool',
                    },
                    {
                        name: 'allow_add_liquidity',
                        type: 'bool',
                    },
                    {
                        name: 'allow_remove_liquidity',
                        type: 'bool',
                    },
                    {
                        name: 'buy_tax',
                        type: 'u64',
                    },
                    {
                        name: 'sell_tax',
                        type: 'u64',
                    },
                    {
                        name: 'lock_until',
                        type: 'u64',
                    },
                    {
                        name: 'encoded_user_defined_event_data',
                        type: 'string',
                    },
                    {
                        name: 'open_at',
                        type: 'u64',
                    },
                ],
            },
        },
        {
            name: 'UpdateLiquidityPoolProtocolConfigParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'protocol_swap_fee_numerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_swap_fee_denominator',
                        type: 'u64',
                    },
                    {
                        name: 'swap_fee_numerator',
                        type: 'u64',
                    },
                    {
                        name: 'swap_fee_denominator',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_tax_numerator',
                        type: 'u64',
                    },
                    {
                        name: 'protocol_tax_denominator',
                        type: 'u64',
                    },
                    {
                        name: 'allow_creator_claim_swap_fee',
                        type: 'bool',
                    },
                ],
            },
        },
        {
            name: 'UserDefinedEvent',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'liquidity_pool_id',
                        type: 'pubkey',
                    },
                    {
                        name: 'instruction_name',
                        type: 'string',
                    },
                    {
                        name: 'base64_data',
                        type: 'string',
                    },
                ],
            },
        },
    ],
};
/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/heaven_anchor_amm.json`.
 */
export type HeavenAnchorAmm = {
    address: 'HEAVEnMX7RoaYCucpyFterLWzFJR8Ah26oNSnqBs5Jtn';
    metadata: {
        name: 'heavenAnchorAmm';
        version: '0.1.0';
        spec: '0.1.0';
        description: 'Created with Anchor';
    };
    instructions: [
        {
            name: 'addLiquidity';
            discriminator: [181, 157, 89, 67, 143, 182, 52, 72];
            accounts: [
                {
                    name: 'tokenProgram';
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
                },
                {
                    name: 'baseTokenProgram';
                },
                {
                    name: 'quoteTokenProgram';
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                },
                {
                    name: 'associatedTokenProgram';
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
                },
                {
                    name: 'authority';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'baseTokenMint';
                },
                {
                    name: 'quoteTokenMint';
                },
                {
                    name: 'lpTokenMint';
                    writable: true;
                },
                {
                    name: 'userBaseTokenVault';
                    writable: true;
                },
                {
                    name: 'userQuoteTokenVault';
                    writable: true;
                },
                {
                    name: 'userLpTokenVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'baseTokenVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'userAmmStats';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    117,
                                    115,
                                    101,
                                    114,
                                    95,
                                    97,
                                    109,
                                    109,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    115
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'user';
                            },
                            {
                                kind: 'account';
                                path: 'liquidityPoolState';
                            }
                        ];
                    };
                },
                {
                    name: 'quoteTokenVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'userGlobalStats';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    117,
                                    115,
                                    101,
                                    114,
                                    95,
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    115
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'user';
                            }
                        ];
                    };
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: {
                            name: 'addLiquidityParams';
                        };
                    };
                }
            ];
        },
        {
            name: 'claimLpTokens';
            discriminator: [233, 167, 205, 67, 124, 222, 169, 86];
            accounts: [
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'authority';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'lpTokenLockVault';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    108,
                                    105,
                                    113,
                                    117,
                                    105,
                                    100,
                                    105,
                                    116,
                                    121,
                                    95,
                                    112,
                                    111,
                                    111,
                                    108,
                                    95,
                                    116,
                                    111,
                                    107,
                                    101,
                                    110,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'user';
                            },
                            {
                                kind: 'account';
                                path: 'liquidityPoolState';
                            }
                        ];
                    };
                },
                {
                    name: 'userLpTokenVault';
                    writable: true;
                },
                {
                    name: 'tokenProgram';
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
                },
                {
                    name: 'lpTokenMint';
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: {
                            name: 'claimLpTokensParams';
                        };
                    };
                }
            ];
        },
        {
            name: 'claimProtocolSwapFee';
            discriminator: [149, 27, 138, 16, 12, 182, 118, 218];
            accounts: [
                {
                    name: 'owner';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'tokenProgram';
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
                },
                {
                    name: 'baseTokenProgram';
                },
                {
                    name: 'quoteTokenProgram';
                },
                {
                    name: 'associatedTokenProgram';
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'protocolBaseTokenSwapFeeVault';
                    writable: true;
                },
                {
                    name: 'ownerBaseTokenSwapFeeVault';
                    writable: true;
                },
                {
                    name: 'protocolQuoteTokenSwapFeeVault';
                    writable: true;
                },
                {
                    name: 'ownerQuoteTokenSwapFeeVault';
                    writable: true;
                },
                {
                    name: 'authority';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'baseTokenMint';
                },
                {
                    name: 'quoteTokenMint';
                },
                {
                    name: 'protocolOwnerState';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    112,
                                    114,
                                    111,
                                    116,
                                    111,
                                    99,
                                    111,
                                    108,
                                    95,
                                    111,
                                    119,
                                    110,
                                    101,
                                    114,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ];
                            }
                        ];
                    };
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: {
                            name: 'claimProtocolSwapFeeParams';
                        };
                    };
                }
            ];
        },
        {
            name: 'claimSwapFee';
            discriminator: [151, 78, 98, 61, 163, 87, 133, 33];
            accounts: [
                {
                    name: 'baseTokenProgram';
                },
                {
                    name: 'quoteTokenProgram';
                },
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'authority';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'baseTokenMint';
                },
                {
                    name: 'quoteTokenMint';
                },
                {
                    name: 'baseTokenVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'quoteTokenVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'userQuoteTokenVault';
                    writable: true;
                },
                {
                    name: 'userBaseTokenVault';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [
                {
                    name: 'baseAmount';
                    type: 'u64';
                },
                {
                    name: 'quoteAmount';
                    type: 'u64';
                }
            ];
        },
        {
            name: 'claimSwapTax';
            discriminator: [216, 30, 72, 117, 38, 125, 118, 215];
            accounts: [
                {
                    name: 'baseTokenProgram';
                },
                {
                    name: 'quoteTokenProgram';
                },
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'authority';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'baseTokenMint';
                },
                {
                    name: 'quoteTokenMint';
                },
                {
                    name: 'baseTokenSwapTaxVault';
                    docs: ['CHECK'];
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    108,
                                    112,
                                    95,
                                    115,
                                    119,
                                    97,
                                    112,
                                    95,
                                    116,
                                    97,
                                    120,
                                    95,
                                    116,
                                    111,
                                    107,
                                    101,
                                    110,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'liquidityPoolState';
                            },
                            {
                                kind: 'account';
                                path: 'baseTokenMint';
                            }
                        ];
                    };
                },
                {
                    name: 'quoteTokenSwapTaxVault';
                    docs: ['CHECK'];
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    108,
                                    112,
                                    95,
                                    115,
                                    119,
                                    97,
                                    112,
                                    95,
                                    116,
                                    97,
                                    120,
                                    95,
                                    116,
                                    111,
                                    107,
                                    101,
                                    110,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'liquidityPoolState';
                            },
                            {
                                kind: 'account';
                                path: 'quoteTokenMint';
                            }
                        ];
                    };
                },
                {
                    name: 'userQuoteTokenVault';
                    writable: true;
                },
                {
                    name: 'userBaseTokenVault';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: {
                            name: 'claimSwapTaxParams';
                        };
                    };
                }
            ];
        },
        {
            name: 'createExtrasAccount';
            discriminator: [232, 203, 133, 126, 114, 81, 33, 190];
            accounts: [
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                },
                {
                    name: 'data';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    101,
                                    120,
                                    116,
                                    114,
                                    97,
                                    115,
                                    95,
                                    97,
                                    99,
                                    99,
                                    111,
                                    117,
                                    110,
                                    116
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'user';
                            }
                        ];
                    };
                },
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                }
            ];
            args: [
                {
                    name: 'value';
                    type: {
                        defined: {
                            name: 'extrasAccountParams';
                        };
                    };
                }
            ];
        },
        {
            name: 'createLiquidityPool';
            discriminator: [175, 75, 181, 165, 224, 254, 6, 131];
            accounts: [
                {
                    name: 'tokenProgram';
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
                },
                {
                    name: 'baseTokenProgram';
                },
                {
                    name: 'quoteTokenProgram';
                },
                {
                    name: 'associatedTokenProgram';
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                },
                {
                    name: 'rent';
                    address: 'SysvarRent111111111111111111111111111111111';
                },
                {
                    name: 'poolCreationFeeWallet';
                    docs: ['create pool fee account'];
                    writable: true;
                    address: 'CYTDCTNLEaBFD5GLs6MyaoVh4nqozH2B4vNPWEBgNBsX';
                },
                {
                    name: 'authority';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'baseTokenMint';
                },
                {
                    name: 'quoteTokenMint';
                },
                {
                    name: 'lpTokenMint';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    108,
                                    105,
                                    113,
                                    117,
                                    105,
                                    100,
                                    105,
                                    116,
                                    121,
                                    95,
                                    112,
                                    114,
                                    111,
                                    118,
                                    105,
                                    100,
                                    101,
                                    114,
                                    95,
                                    116,
                                    111,
                                    107,
                                    101,
                                    110,
                                    95,
                                    109,
                                    105,
                                    110,
                                    116
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'liquidityPoolState';
                            }
                        ];
                    };
                },
                {
                    name: 'userBaseTokenVault';
                    writable: true;
                },
                {
                    name: 'userQuoteTokenVault';
                    writable: true;
                },
                {
                    name: 'baseTokenVault';
                    docs: ['CHECK'];
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    108,
                                    105,
                                    113,
                                    117,
                                    105,
                                    100,
                                    105,
                                    116,
                                    121,
                                    95,
                                    112,
                                    111,
                                    111,
                                    108,
                                    95,
                                    116,
                                    111,
                                    107,
                                    101,
                                    110,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'liquidityPoolState';
                            },
                            {
                                kind: 'account';
                                path: 'baseTokenMint';
                            }
                        ];
                    };
                },
                {
                    name: 'quoteTokenVault';
                    docs: ['CHECK'];
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    108,
                                    105,
                                    113,
                                    117,
                                    105,
                                    100,
                                    105,
                                    116,
                                    121,
                                    95,
                                    112,
                                    111,
                                    111,
                                    108,
                                    95,
                                    116,
                                    111,
                                    107,
                                    101,
                                    110,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'liquidityPoolState';
                            },
                            {
                                kind: 'account';
                                path: 'quoteTokenMint';
                            }
                        ];
                    };
                },
                {
                    name: 'baseTokenSwapTaxVault';
                    docs: ['CHECK'];
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    108,
                                    112,
                                    95,
                                    115,
                                    119,
                                    97,
                                    112,
                                    95,
                                    116,
                                    97,
                                    120,
                                    95,
                                    116,
                                    111,
                                    107,
                                    101,
                                    110,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'liquidityPoolState';
                            },
                            {
                                kind: 'account';
                                path: 'baseTokenMint';
                            }
                        ];
                    };
                },
                {
                    name: 'quoteTokenSwapTaxVault';
                    docs: ['CHECK'];
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    108,
                                    112,
                                    95,
                                    115,
                                    119,
                                    97,
                                    112,
                                    95,
                                    116,
                                    97,
                                    120,
                                    95,
                                    116,
                                    111,
                                    107,
                                    101,
                                    110,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'liquidityPoolState';
                            },
                            {
                                kind: 'account';
                                path: 'quoteTokenMint';
                            }
                        ];
                    };
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    108,
                                    105,
                                    113,
                                    117,
                                    105,
                                    100,
                                    105,
                                    116,
                                    121,
                                    95,
                                    112,
                                    111,
                                    111,
                                    108,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'user';
                            },
                            {
                                kind: 'account';
                                path: 'baseTokenMint';
                            },
                            {
                                kind: 'account';
                                path: 'quoteTokenMint';
                            }
                        ];
                    };
                },
                {
                    name: 'lpTokenLockVault';
                    writable: true;
                },
                {
                    name: 'protocolConfig';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    112,
                                    114,
                                    111,
                                    116,
                                    111,
                                    99,
                                    111,
                                    108,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ];
                            },
                            {
                                kind: 'arg';
                                path: 'protocolConfigVersion';
                            }
                        ];
                    };
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
                        defined: {
                            name: 'createLiquidityPoolParams';
                        };
                    };
                }
            ];
        },
        {
            name: 'createOrUpdateProtocolOwner';
            discriminator: [170, 124, 128, 40, 48, 105, 139, 148];
            accounts: [
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                },
                {
                    name: 'currentOwner';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'newOwner';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'protocolOwnerState';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    112,
                                    114,
                                    111,
                                    116,
                                    111,
                                    99,
                                    111,
                                    108,
                                    95,
                                    111,
                                    119,
                                    110,
                                    101,
                                    114,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ];
                            }
                        ];
                    };
                }
            ];
            args: [];
        },
        {
            name: 'createProtocolConfig';
            discriminator: [115, 114, 24, 111, 14, 53, 113, 254];
            accounts: [
                {
                    name: 'owner';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'protocolConfigState';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    112,
                                    114,
                                    111,
                                    116,
                                    111,
                                    99,
                                    111,
                                    108,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ];
                            },
                            {
                                kind: 'arg';
                                path: 'version';
                            }
                        ];
                    };
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                },
                {
                    name: 'protocolOwnerState';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    112,
                                    114,
                                    111,
                                    116,
                                    111,
                                    99,
                                    111,
                                    108,
                                    95,
                                    111,
                                    119,
                                    110,
                                    101,
                                    114,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ];
                            }
                        ];
                    };
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
                        defined: {
                            name: 'protocolConfigParams';
                        };
                    };
                }
            ];
        },
        {
            name: 'disableAddLiquidity';
            discriminator: [47, 199, 142, 71, 109, 51, 200, 162];
            accounts: [
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [];
        },
        {
            name: 'disableRemoveLiquidity';
            discriminator: [79, 197, 25, 109, 17, 125, 182, 61];
            accounts: [
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [];
        },
        {
            name: 'disableSwap';
            discriminator: [98, 129, 61, 128, 68, 223, 5, 194];
            accounts: [
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [];
        },
        {
            name: 'enableAddLiquidity';
            discriminator: [14, 212, 247, 33, 36, 255, 16, 27];
            accounts: [
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [];
        },
        {
            name: 'enableRemoveLiquidity';
            discriminator: [244, 63, 107, 38, 169, 136, 125, 87];
            accounts: [
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [];
        },
        {
            name: 'enableSwap';
            discriminator: [88, 176, 34, 26, 54, 192, 186, 91];
            accounts: [
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [];
        },
        {
            name: 'extendLiquidityPoolLock';
            discriminator: [52, 19, 133, 193, 81, 251, 39, 207];
            accounts: [
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [
                {
                    name: 'value';
                    type: 'u64';
                }
            ];
        },
        {
            name: 'lockLiquidityPoolTaxation';
            discriminator: [40, 173, 78, 151, 140, 47, 109, 8];
            accounts: [
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [];
        },
        {
            name: 'removeLiquidity';
            discriminator: [80, 85, 209, 72, 24, 206, 177, 108];
            accounts: [
                {
                    name: 'tokenProgram';
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
                },
                {
                    name: 'baseTokenProgram';
                },
                {
                    name: 'quoteTokenProgram';
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                },
                {
                    name: 'associatedTokenProgram';
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
                },
                {
                    name: 'authority';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'baseTokenMint';
                },
                {
                    name: 'quoteTokenMint';
                },
                {
                    name: 'lpTokenMint';
                    writable: true;
                },
                {
                    name: 'userBaseTokenVault';
                    writable: true;
                },
                {
                    name: 'userQuoteTokenVault';
                    writable: true;
                },
                {
                    name: 'userLpTokenVault';
                    writable: true;
                },
                {
                    name: 'baseTokenVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'userAmmStats';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    117,
                                    115,
                                    101,
                                    114,
                                    95,
                                    97,
                                    109,
                                    109,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    115
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'user';
                            },
                            {
                                kind: 'account';
                                path: 'liquidityPoolState';
                            }
                        ];
                    };
                },
                {
                    name: 'quoteTokenVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'userGlobalStats';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    117,
                                    115,
                                    101,
                                    114,
                                    95,
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    115
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'user';
                            }
                        ];
                    };
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: {
                            name: 'removeLiquidityParams';
                        };
                    };
                }
            ];
        },
        {
            name: 'swapIn';
            discriminator: [141, 172, 10, 208, 69, 9, 56, 154];
            accounts: [
                {
                    name: 'tokenProgram';
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
                },
                {
                    name: 'baseTokenProgram';
                },
                {
                    name: 'quoteTokenProgram';
                },
                {
                    name: 'associatedTokenProgram';
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'authority';
                    docs: ['create pool fee account'];
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'baseTokenMint';
                },
                {
                    name: 'quoteTokenMint';
                },
                {
                    name: 'userBaseTokenVault';
                    writable: true;
                },
                {
                    name: 'userQuoteTokenVault';
                    writable: true;
                },
                {
                    name: 'baseTokenVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'quoteTokenVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'baseTokenSwapTaxVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'quoteTokenSwapTaxVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'protocolBaseTokenSwapFeeVault';
                    writable: true;
                },
                {
                    name: 'protocolQuoteTokenSwapFeeVault';
                    writable: true;
                },
                {
                    name: 'userAmmStats';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    117,
                                    115,
                                    101,
                                    114,
                                    95,
                                    97,
                                    109,
                                    109,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    115
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'user';
                            },
                            {
                                kind: 'account';
                                path: 'liquidityPoolState';
                            }
                        ];
                    };
                },
                {
                    name: 'userGlobalStats';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    117,
                                    115,
                                    101,
                                    114,
                                    95,
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    115
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'user';
                            }
                        ];
                    };
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: {
                            name: 'swapInParams';
                        };
                    };
                }
            ];
        },
        {
            name: 'swapOut';
            discriminator: [206, 36, 149, 14, 163, 132, 148, 1];
            accounts: [
                {
                    name: 'tokenProgram';
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
                },
                {
                    name: 'baseTokenProgram';
                },
                {
                    name: 'quoteTokenProgram';
                },
                {
                    name: 'associatedTokenProgram';
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'authority';
                    docs: ['create pool fee account'];
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'baseTokenMint';
                },
                {
                    name: 'quoteTokenMint';
                },
                {
                    name: 'userBaseTokenVault';
                    writable: true;
                },
                {
                    name: 'userQuoteTokenVault';
                    writable: true;
                },
                {
                    name: 'baseTokenVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'quoteTokenVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'baseTokenSwapTaxVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'quoteTokenSwapTaxVault';
                    docs: ['CHECK'];
                    writable: true;
                },
                {
                    name: 'protocolBaseTokenSwapFeeVault';
                    writable: true;
                },
                {
                    name: 'protocolQuoteTokenSwapFeeVault';
                    writable: true;
                },
                {
                    name: 'userAmmStats';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    117,
                                    115,
                                    101,
                                    114,
                                    95,
                                    97,
                                    109,
                                    109,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    115
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'user';
                            },
                            {
                                kind: 'account';
                                path: 'liquidityPoolState';
                            }
                        ];
                    };
                },
                {
                    name: 'userGlobalStats';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    117,
                                    115,
                                    101,
                                    114,
                                    95,
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    115
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'user';
                            }
                        ];
                    };
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: {
                            name: 'swapOutParams';
                        };
                    };
                }
            ];
        },
        {
            name: 'updateLiquidityPool';
            discriminator: [255, 60, 178, 169, 154, 62, 55, 243];
            accounts: [
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: {
                            name: 'updateLiquidityPoolParams';
                        };
                    };
                }
            ];
        },
        {
            name: 'updateLiquidityPoolBuyTax';
            discriminator: [202, 57, 18, 27, 23, 107, 163, 91];
            accounts: [
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [
                {
                    name: 'value';
                    type: 'u64';
                }
            ];
        },
        {
            name: 'updateLiquidityPoolOpenAt';
            discriminator: [16, 119, 94, 174, 150, 168, 152, 79];
            accounts: [
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [
                {
                    name: 'value';
                    type: 'u64';
                }
            ];
        },
        {
            name: 'updateLiquidityPoolProtocolConfig';
            discriminator: [22, 222, 244, 85, 120, 106, 67, 52];
            accounts: [
                {
                    name: 'owner';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'protocolOwnerState';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    112,
                                    114,
                                    111,
                                    116,
                                    111,
                                    99,
                                    111,
                                    108,
                                    95,
                                    111,
                                    119,
                                    110,
                                    101,
                                    114,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ];
                            },
                            {
                                kind: 'arg';
                                path: 'version';
                            }
                        ];
                    };
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [
                {
                    name: 'params';
                    type: {
                        defined: {
                            name: 'updateLiquidityPoolProtocolConfigParams';
                        };
                    };
                }
            ];
        },
        {
            name: 'updateLiquidityPoolSellTax';
            discriminator: [125, 22, 7, 164, 50, 14, 221, 4];
            accounts: [
                {
                    name: 'user';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'liquidityPoolState';
                    writable: true;
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [
                {
                    name: 'value';
                    type: 'u64';
                }
            ];
        },
        {
            name: 'updateProtocolConfig';
            discriminator: [197, 97, 123, 54, 221, 168, 11, 135];
            accounts: [
                {
                    name: 'owner';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'protocolConfigState';
                    writable: true;
                },
                {
                    name: 'protocolOwnerState';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    112,
                                    114,
                                    111,
                                    116,
                                    111,
                                    99,
                                    111,
                                    108,
                                    95,
                                    111,
                                    119,
                                    110,
                                    101,
                                    114,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ];
                            },
                            {
                                kind: 'arg';
                                path: 'version';
                            }
                        ];
                    };
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
                        defined: {
                            name: 'protocolConfigParams';
                        };
                    };
                }
            ];
        }
    ];
    accounts: [
        {
            name: 'globalUserStats';
            discriminator: [156, 207, 33, 142, 82, 131, 21, 186];
        },
        {
            name: 'liquidityPoolState';
            discriminator: [190, 158, 220, 130, 15, 162, 132, 252];
        },
        {
            name: 'liquidityPoolUserStats';
            discriminator: [194, 126, 118, 57, 49, 157, 198, 182];
        },
        {
            name: 'protocolConfig';
            discriminator: [207, 91, 250, 28, 152, 179, 215, 209];
        },
        {
            name: 'protocolOwnerState';
            discriminator: [208, 64, 209, 204, 113, 226, 22, 98];
        }
    ];
    events: [
        {
            name: 'addLiquidityEvent';
            discriminator: [27, 178, 153, 186, 47, 196, 140, 45];
        },
        {
            name: 'createLiquidityPoolEvent';
            discriminator: [116, 216, 239, 141, 207, 211, 178, 127];
        },
        {
            name: 'removeLiquidityEvent';
            discriminator: [141, 199, 182, 123, 159, 94, 215, 102];
        },
        {
            name: 'swapInEvent';
            discriminator: [146, 253, 181, 79, 103, 71, 195, 125];
        },
        {
            name: 'swapOutEvent';
            discriminator: [21, 117, 255, 136, 215, 209, 131, 32];
        },
        {
            name: 'updateLiquidityPoolEvent';
            discriminator: [73, 12, 110, 179, 184, 134, 20, 248];
        },
        {
            name: 'userDefinedEvent';
            discriminator: [33, 21, 108, 20, 241, 244, 167, 131];
        }
    ];
    errors: [
        {
            code: 6000;
            name: 'unsupportedTokenMint';
            msg: 'Unsupported token mint';
        },
        {
            code: 6001;
            name: 'invalidTokenVaultBalance';
            msg: 'Invalid token vault balance';
        },
        {
            code: 6002;
            name: 'invalidUserToken';
            msg: 'Invalid user token';
        },
        {
            code: 6003;
            name: 'invalidTaxationMode';
            msg: 'Invalid taxation mode';
        },
        {
            code: 6004;
            name: 'invalidOwner';
            msg: 'Invalid owner';
        },
        {
            code: 6005;
            name: 'invalidLockLiquidityProviderTokenPercentage';
            msg: 'Invalid lock liquidity provider token percentage';
        },
        {
            code: 6006;
            name: 'cannotCreatePoolWithDisabledProtocolConfigVersion';
            msg: 'Cannot create pool with the a disabled protocol config version';
        },
        {
            code: 6007;
            name: 'invalidTokenInputAmount';
            msg: 'Invalid token input amount';
        },
        {
            code: 6008;
            name: 'invalidSwapTax';
            msg: 'Invalid swap tax';
        },
        {
            code: 6009;
            name: 'invalidFeeMode';
            msg: 'Invalid fee mode';
        },
        {
            code: 6010;
            name: 'invalidLiquidityProviderTokenLockVault';
            msg: 'Invalid liquidity provider token lock vault';
        },
        {
            code: 6011;
            name: 'invalidUserLiquidityProviderTokenVault';
            msg: 'Invalid liquidity provider token vault';
        },
        {
            code: 6012;
            name: 'insufficientBalance';
            msg: 'Insufficient balance';
        },
        {
            code: 6013;
            name: 'exceededSlippage';
            msg: 'Exceeded slippage';
        },
        {
            code: 6014;
            name: 'invalidAddLiquidityInput';
            msg: 'Invalid add liquidity input';
        },
        {
            code: 6015;
            name: 'invalidRemoveLiquidityInput';
            msg: 'Invalid remove liquidity input';
        },
        {
            code: 6016;
            name: 'addLiquidityDisabled';
            msg: 'Add liquidity is disabled';
        },
        {
            code: 6017;
            name: 'removeLiquidityDisabled';
            msg: 'Remove liquidity is disabled';
        },
        {
            code: 6018;
            name: 'swapDisabled';
            msg: 'Swap is disabled';
        },
        {
            code: 6019;
            name: 'liquidityPoolIsNotOpenYet';
            msg: 'Liquidity pool is not open yet';
        },
        {
            code: 6020;
            name: 'invalidSwapInInputs';
            msg: 'Invalid swap in inputs';
        },
        {
            code: 6021;
            name: 'invalidProtocolSwapFeeWallet';
            msg: 'Invalid protocol swap fee wallet';
        },
        {
            code: 6022;
            name: 'invalidSwapOutInputs';
            msg: 'Invalid swap out inputs';
        },
        {
            code: 6023;
            name: 'invalidPostFeeAmount';
            msg: 'Invalid post fee amount';
        },
        {
            code: 6024;
            name: 'exceededQuoteTokenSlippage';
            msg: 'Exceeded quote token slippage';
        },
        {
            code: 6025;
            name: 'exceededBaseTokenSlippage';
            msg: 'Exceeded base token slippage';
        },
        {
            code: 6026;
            name: 'lpTokensLocked';
            msg: 'Lp tokens locked';
        },
        {
            code: 6027;
            name: 'invalidProtocolBaseTokenSwapFeeVault';
            msg: 'Invalid protocol base token swap fee vault';
        },
        {
            code: 6028;
            name: 'invalidProtocolQuoteTokenSwapFeeVault';
            msg: 'Invalid protocol quote token swap fee vault';
        },
        {
            code: 6029;
            name: 'invalidUserPoolStatsAccount';
            msg: 'Invalid user pool stats account';
        },
        {
            code: 6030;
            name: 'invalidUserGlobalStatsAccount';
            msg: 'Invalid user global stats account';
        },
        {
            code: 6031;
            name: 'cannotUpdateLpLock';
            msg: 'Cannot update lp lock';
        },
        {
            code: 6032;
            name: 'zeroAmount';
            msg: 'Zero amount';
        },
        {
            code: 6033;
            name: 'cannotUpdateLpOpenTime';
            msg: 'Cannot update lp open time';
        },
        {
            code: 6034;
            name: 'cannotSetLockBurnLpTokens';
            msg: 'Cannot set lock burn lp tokens';
        },
        {
            code: 6035;
            name: 'invalidTax';
            msg: 'Invalid tax';
        },
        {
            code: 6036;
            name: 'invalidChainlinkFeedAccount';
            msg: 'Invalid chainlink feed account';
        },
        {
            code: 6037;
            name: 'invalidChainlinkProgram';
            msg: 'Invalid chainlink program';
        },
        {
            code: 6038;
            name: 'invalidConfigVersion';
            msg: 'Invalid config version';
        },
        {
            code: 6039;
            name: 'cannotUpdateLockedTaxation';
            msg: 'Cannot update locked taxation';
        },
        {
            code: 6040;
            name: 'cannotClaimSwapFee';
            msg: 'Cannot claim swap fee';
        },
        {
            code: 6041;
            name: 'nonCreatorCannotAddLp';
            msg: 'This pool does not allow non-creator to add lp';
        }
    ];
    types: [
        {
            name: 'addLiquidityEvent';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'liquidityPoolId';
                        type: 'pubkey';
                    },
                    {
                        name: 'user';
                        type: 'pubkey';
                    },
                    {
                        name: 'baseTokenInputAmount';
                        type: 'u64';
                    },
                    {
                        name: 'quoteTokenInputAmount';
                        type: 'u64';
                    },
                    {
                        name: 'lpTokenOutputAmount';
                        type: 'u64';
                    }
                ];
            };
        },
        {
            name: 'addLiquidityParams';
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
                            defined: {
                                name: 'addLiquiditySide';
                            };
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
            name: 'addLiquiditySide';
            repr: {
                kind: 'rust';
            };
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'base';
                    },
                    {
                        name: 'quote';
                    }
                ];
            };
        },
        {
            name: 'claimLpTokensParams';
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
            name: 'claimProtocolSwapFeeParams';
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
            name: 'claimSwapTaxParams';
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
            name: 'createLiquidityPoolEvent';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'liquidityPoolId';
                        type: 'pubkey';
                    },
                    {
                        name: 'user';
                        type: 'pubkey';
                    },
                    {
                        name: 'baseTokenInputTransferFeeAmount';
                        type: 'u64';
                    },
                    {
                        name: 'quoteTokenInputTransferFeeAmount';
                        type: 'u64';
                    },
                    {
                        name: 'baseTokenInputAmount';
                        type: 'u64';
                    },
                    {
                        name: 'quoteTokenInputAmount';
                        type: 'u64';
                    },
                    {
                        name: 'lpTokenOutputAmount';
                        type: 'u64';
                    },
                    {
                        name: 'lockedLp';
                        type: 'bool';
                    }
                ];
            };
        },
        {
            name: 'createLiquidityPoolParams';
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
                    },
                    {
                        name: 'disableNonCreatorAddLiquidity';
                        type: 'bool';
                    },
                    {
                        name: 'extras';
                        type: {
                            option: {
                                array: ['u8', 8];
                            };
                        };
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
            serialization: 'bytemuckunsafe';
            repr: {
                kind: 'rust';
                packed: true;
            };
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'baseTokenMint';
                        type: 'pubkey';
                    },
                    {
                        name: 'baseTokenMintDecimals';
                        type: 'u8';
                    },
                    {
                        name: 'baseTokenVault';
                        type: 'pubkey';
                    },
                    {
                        name: 'baseTokenSwapTaxVault';
                        type: 'pubkey';
                    },
                    {
                        name: 'quoteTokenMint';
                        type: 'pubkey';
                    },
                    {
                        name: 'quoteTokenMintDecimals';
                        type: 'u8';
                    },
                    {
                        name: 'quoteTokenVault';
                        type: 'pubkey';
                    },
                    {
                        name: 'quoteTokenSwapTaxVault';
                        type: 'pubkey';
                    },
                    {
                        name: 'protocolBaseTokenSwapFeeVault';
                        type: 'pubkey';
                    },
                    {
                        name: 'protocolQuoteTokenSwapFeeVault';
                        type: 'pubkey';
                    },
                    {
                        name: 'lpTokenMint';
                        type: 'pubkey';
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
                        type: 'pubkey';
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
                            defined: {
                                name: 'taxationMode';
                            };
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
                    },
                    {
                        name: 'lockedTaxation';
                        type: 'bool';
                    },
                    {
                        name: 'disableNonCreatorAddLiquidity';
                        type: 'bool';
                    },
                    {
                        name: 'allowCreatorClaimSwapFee';
                        type: 'bool';
                    },
                    {
                        name: 'extras';
                        type: {
                            array: ['u8', 8];
                        };
                    }
                ];
            };
        },
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
                        type: 'pubkey';
                    },
                    {
                        name: 'version';
                        type: 'u16';
                    }
                ];
            };
        },
        {
            name: 'protocolConfigParams';
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
            name: 'protocolOwnerState';
            docs: ['Holds the current owner of the factory'];
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'currentProtocolOwner';
                        type: 'pubkey';
                    }
                ];
            };
        },
        {
            name: 'removeLiquidityEvent';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'liquidityPoolId';
                        type: 'pubkey';
                    },
                    {
                        name: 'user';
                        type: 'pubkey';
                    },
                    {
                        name: 'baseTokenAmount';
                        type: 'u64';
                    },
                    {
                        name: 'quoteTokenAmount';
                        type: 'u64';
                    },
                    {
                        name: 'lpTokenAmount';
                        type: 'u64';
                    },
                    {
                        name: 'baseTokenTransferFeeAmount';
                        type: 'u64';
                    },
                    {
                        name: 'quoteTokenTransferFeeAmount';
                        type: 'u64';
                    }
                ];
            };
        },
        {
            name: 'removeLiquidityParams';
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
            name: 'swapDirection';
            repr: {
                kind: 'rust';
            };
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'quote2Base';
                    },
                    {
                        name: 'base2Quote';
                    }
                ];
            };
        },
        {
            name: 'swapInEvent';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'liquidityPoolId';
                        type: 'pubkey';
                    },
                    {
                        name: 'user';
                        type: 'pubkey';
                    },
                    {
                        name: 'swapDirection';
                        type: {
                            defined: {
                                name: 'swapDirection';
                            };
                        };
                    },
                    {
                        name: 'swapAmountIn';
                        type: 'u64';
                    },
                    {
                        name: 'swapAmountOut';
                        type: 'u64';
                    }
                ];
            };
        },
        {
            name: 'swapInParams';
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
                            defined: {
                                name: 'swapDirection';
                            };
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
            name: 'swapOutEvent';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'liquidityPoolId';
                        type: 'pubkey';
                    },
                    {
                        name: 'user';
                        type: 'pubkey';
                    },
                    {
                        name: 'swapDirection';
                        type: {
                            defined: {
                                name: 'swapDirection';
                            };
                        };
                    },
                    {
                        name: 'swapAmountIn';
                        type: 'u64';
                    },
                    {
                        name: 'swapAmountOut';
                        type: 'u64';
                    }
                ];
            };
        },
        {
            name: 'swapOutParams';
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
                            defined: {
                                name: 'swapDirection';
                            };
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
            name: 'taxationMode';
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'none';
                    },
                    {
                        name: 'base';
                    },
                    {
                        name: 'quote';
                    }
                ];
            };
        },
        {
            name: 'updateLiquidityPoolEvent';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'liquidityPoolId';
                        type: 'pubkey';
                    },
                    {
                        name: 'user';
                        type: 'pubkey';
                    },
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
                        name: 'taxationMode';
                        type: {
                            defined: {
                                name: 'taxationMode';
                            };
                        };
                    },
                    {
                        name: 'openAt';
                        type: 'u64';
                    }
                ];
            };
        },
        {
            name: 'updateLiquidityPoolParams';
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
            name: 'updateLiquidityPoolProtocolConfigParams';
            type: {
                kind: 'struct';
                fields: [
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
                        name: 'allowCreatorClaimSwapFee';
                        type: 'bool';
                    }
                ];
            };
        },
        {
            name: 'userDefinedEvent';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'liquidityPoolId';
                        type: 'pubkey';
                    },
                    {
                        name: 'instructionName';
                        type: 'string';
                    },
                    {
                        name: 'base64Data';
                        type: 'string';
                    }
                ];
            };
        }
    ];
};

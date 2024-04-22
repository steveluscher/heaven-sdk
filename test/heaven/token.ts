// import { MPL_TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata'
import * as spl from '@solana/spl-token';
import { NodeIrys } from '@irys/sdk';
import {
	Connection,
	Keypair,
	PublicKey,
	SystemProgram,
	Transaction,
} from '@solana/web3.js';
import { Currency, CurrencyAmount } from '@raydium-io/raydium-sdk';
import { BN } from 'bn.js';
import { SOL } from '@raydium-io/raydium-sdk';

export class SolanaToken {
	provider: Connection;
	payer: Keypair;
	baseDecimals: number;
	quoteDecimals: number;
	baseSupply: number;
	quoteSupply: number;
	minimumRentExemptMint?: number;
	minimumRentExemptAccount?: number;
	baseSymbol: string;
	baseMint: Keypair;
	baseToken: PublicKey;
	quoteToken: PublicKey;
	tokenATA: PublicKey;
	// metadataPDA: PublicKey
	liquidity: number;
	baseAmount: CurrencyAmount;
	quoteAmount: CurrencyAmount;
	metadataObject: any;
	metadata: any;
	metadataJSON: any;
	metadataURI?: string;
	keys: PublicKey[];
	#metadataInitialized = false;
	#tokenName: string;
	#tokenSymbol: string;
	#tokenImage: string;
	#tokenDesc: string;
	#tokenWebsite: string;
	#tokenTwitter: string;
	#tokenTelegram: string;
	#creatorName: string;
	#creatorSite: string;

	constructor(
		provider: Connection,
		payer: Keypair,
		supply: number,
		liquiditySupply: number,
		tokenName: string,
		tokenSymbol: string,
		tokenImage: string,
		tokenDesc: string,
		tokenWebsite: string,
		tokenTwitter: string,
		tokenTelegram: string,
		creatorName: string,
		creatorSite: string,
		baseMint = Keypair.generate(),
		metadataURI = ''
	) {
		this.provider = provider;
		this.payer = payer;

		/***************************************************
		 * TOKEN DATA
		 **************************************************/
		this.baseDecimals = 3;
		this.baseMint = baseMint;
		this.baseToken = this.baseMint.publicKey;
		this.baseSupply = supply;
		this.baseSymbol = tokenSymbol;
		this.baseAmount = new CurrencyAmount(
			new Currency(this.baseDecimals, this.baseSymbol),
			new BN(this.baseSupply * 10 ** this.baseDecimals)
		);

		this.quoteSupply = liquiditySupply;
		this.quoteDecimals = SOL.decimals;
		this.quoteToken = spl.NATIVE_MINT; // $SOL
		this.quoteAmount = new CurrencyAmount(
			new Currency(this.quoteDecimals, SOL.symbol),
			new BN(this.quoteSupply * 10 ** this.quoteDecimals)
		);

		this.liquidity = liquiditySupply;
		this.tokenATA = PublicKey.findProgramAddressSync(
			[
				this.payer.publicKey.toBuffer(),
				spl.TOKEN_PROGRAM_ID.toBuffer(),
				this.baseToken.toBuffer(),
			],
			spl.ASSOCIATED_TOKEN_PROGRAM_ID
		)[0];
		// this.metadataPDA = PublicKey.findProgramAddressSync(
		//   [Buffer.from('metadata'), MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(), this.baseToken.toBuffer()],
		//   MPL_TOKEN_METADATA_PROGRAM_ID,
		// )[0]

		this.metadataURI = metadataURI;

		this.#tokenName = tokenName;
		this.#tokenSymbol = tokenSymbol;
		this.#tokenImage = tokenImage;
		this.#tokenDesc = tokenDesc;
		this.#tokenWebsite = tokenWebsite;
		this.#tokenTwitter = tokenTwitter;
		this.#tokenTelegram = tokenTelegram;
		this.#creatorName = creatorName;
		this.#creatorSite = creatorSite;

		this.keys = [];
		this.keys.push(this.baseToken);
		this.keys.push(this.quoteToken);
		this.keys.push(this.payer.publicKey);
		this.keys.push(this.tokenATA);
		// this.keys.push(this.metadataPDA)
		this.keys.push(this.baseMint.publicKey);
		this.keys.push(spl.NATIVE_MINT);
		this.keys.push(SystemProgram.programId);
		this.keys.push(spl.TOKEN_PROGRAM_ID);
		this.keys.push(spl.ASSOCIATED_TOKEN_PROGRAM_ID);
		// this.keys.push(MPL_TOKEN_METADATA_PROGRAM_ID)
	}

	async #initMetadata(uploadMetadata = true) {
		this.minimumRentExemptMint =
			await spl.getMinimumBalanceForRentExemptMint(this.provider);
		this.minimumRentExemptAccount =
			await this.provider.getMinimumBalanceForRentExemption(165);
		this.metadataJSON = this.#createMetadataJSON(
			this.#tokenName,
			this.#tokenSymbol,
			this.#tokenImage,
			this.#tokenDesc,
			this.#tokenWebsite,
			this.#tokenTwitter,
			this.#tokenTelegram,
			this.#creatorName,
			this.#creatorSite
		);
		if (uploadMetadata) {
			if (this.metadataURI === null || this.metadataURI === '') {
				this.metadataURI = await this.#uploadMetadata(
					this.metadataJSON
				);
			}
		}
		this.metadataObject = this.#createMetadataObject(
			this.#tokenName,
			this.#tokenSymbol,
			this.metadataURI
		);
		this.metadata = {
			name: this.#tokenName,
			symbol: this.#tokenSymbol,
			image: this.#tokenImage,
			uri: this.metadataURI,
			description: this.#tokenDesc,
			website: this.#tokenWebsite,
			twitter: this.#tokenTwitter,
			telegram: this.#tokenTelegram,
			creatorName: this.#creatorName,
			creatorSite: this.#creatorSite,
		};
	}

	async initMetadata() {
		if (!this.#metadataInitialized) {
			await this.#initMetadata(false);
			this.#metadataInitialized = true;
		}
	}

	/***************************************************
	 * CREATE TOKEN
	 **************************************************/
	async getCreateInstructions() {
		try {
			if (!this.#metadataInitialized) {
				await this.#initMetadata(true);
				this.#metadataInitialized = true;
			}

			const transactionBuilder = new Transaction();

			//   if (update) {
			//     // Check if metadata already exists. If it does, update instead of creating new.
			//     const metadata = await mpl.Metadata.fromAccountAddress(
			//       this.provider,
			//       this.metadataPDA,
			//     )
			//     if (metadata && metadata.isMutable) {
			//       console.debug('token', 'Metadata already exists. Updating instead of creating new.')

			//       transactionBuilder.add(
			//         mpl.createUpdateMetadataAccountV2Instruction(
			//           {
			//             metadata: this.metadataPDA,
			//             updateAuthority: this.payer.publicKey,
			//           },
			//           {
			//             updateMetadataAccountArgsV2: {
			//               data: this.metadataObject,
			//               updateAuthority: this.payer.publicKey,
			//               primarySaleHappened: false,
			//               isMutable: true,
			//             },
			//           },
			//         ),
			//       )
			//       return transactionBuilder.instructions
			//     }
			//   }

			console.debug('token', 'Creating and initializing token..');
			transactionBuilder.add(
				SystemProgram.createAccount({
					fromPubkey: this.payer.publicKey,
					newAccountPubkey: this.baseToken,
					space: spl.MINT_SIZE,
					lamports: this.minimumRentExemptMint ?? 0,
					programId: spl.TOKEN_PROGRAM_ID,
				}),
				spl.createInitializeMintInstruction(
					this.baseToken,
					this.baseDecimals,
					this.payer.publicKey, // Mint authority
					this.payer.publicKey,
					spl.TOKEN_PROGRAM_ID
				),
				spl.createAssociatedTokenAccountInstruction(
					this.payer.publicKey, //Payer
					this.tokenATA, //Associated token account
					this.payer.publicKey, //token owner
					this.baseToken,
					spl.TOKEN_PROGRAM_ID,
					spl.ASSOCIATED_TOKEN_PROGRAM_ID
				),
				spl.createMintToCheckedInstruction(
					this.baseToken,
					this.tokenATA,
					this.payer.publicKey,
					this.baseSupply * Math.pow(10, this.baseDecimals),
					this.baseDecimals
				),
				// mpl.createCreateMetadataAccountV3Instruction(
				//     {
				//         metadata: this.metadataPDA,
				//         mint: this.baseToken,
				//         mintAuthority: this.payer.publicKey,
				//         payer: this.payer.publicKey,
				//         updateAuthority: this.payer.publicKey,
				//     },
				//     {
				//         createMetadataAccountArgsV3: {
				//             data: this.metadataObject,
				//             isMutable: true, // May be edited/updated later
				//             collectionDetails: null
				//         }
				//     }
				// ),
				spl.createSetAuthorityInstruction(
					this.baseToken,
					this.payer.publicKey, // current authority
					spl.AuthorityType.MintTokens,
					null
				),
				spl.createSetAuthorityInstruction(
					this.baseToken,
					this.payer.publicKey, // current authority
					spl.AuthorityType.FreezeAccount,
					null
				)
			);

			return transactionBuilder.instructions;
		} catch (e) {
			console.error('Error initializing accounts.', e);
			throw e;
		}
	}

	/***************************************************
	 * METADATA FUNCTIONS
	 * *************************************************/
	#createMetadataObject(name: string, symbol: string, uri?: string) {
		return {
			name,
			symbol,
			uri,
			sellerFeeBasisPoints: 0,
			creators: null,
			collection: null,
			uses: null,
		};
	}

	#createMetadataJSON(
		name: string,
		symbol: string,
		imageUrl: string,
		description: string,
		website: string,
		twitter: string,
		telegram: string,
		creatorName: string,
		creatorSite: string
	) {
		const metadata = {
			name, // "Doug the Pug",
			symbol, // "DOUG",
			image: imageUrl, // "https://pugaddicthome.files.wordpress.com/2019/08/dougthepugfeature.jpg",
			description, // "YO, THIS IS DOUG THE PUG, THE DEGEN DOGGO BEHIND $DOUG COIN. ME AND MY HOMIES REGGIE AND DEMARCUS, WE'RE JUST SOME STRAYS TRYNA MAKE IT OFF THE STREETS. BUY $DOUG",
			extensions: {
				website, // "https://www.dougthepug-ai.com/",
				twitter, // "https://twitter.com/DougThePugAI",
				x: twitter, // "https://twitter.com/DougThePugAI",
				telegram, // "https://t.me/DougThePugAI"
			},
			creator: {
				name: creatorName, // "DEXLAB MINTING LAB",
				site: creatorSite, // "https://www.dexlab.space"
			},
		};
		return JSON.stringify(metadata);
	}

	#getIrys = async (privateKey: Keypair) => {
		const url = 'https://devnet.irys.xyz'; //"https://node1.irys.xyz";

		// Devnet RPC URLs change often, use a recent one from https://chainlist.org/chain/80001
		const providerUrl =
			'https://endpoints.omniatech.io/v1/matic/mumbai/public';
		const token = 'solana';

		const irys = new NodeIrys({
			url, // URL of the node you want to connect to
			token, // Token used for payment
			key: privateKey, // ETH or SOL private key
			config: { providerUrl }, // Optional provider URL, only required when using Devnet
		});
		return irys;
	};

	#uploadMetadata = async (data: any) => {
		const irys = await this.#getIrys(this.payer);
		try {
			const receipt = await irys.upload(data);
			const url = 'https://gateway.irys.xyz/' + receipt.id;
			console.debug('irys', `Data uploaded ==> ${url}`);
			return url;
		} catch (e) {
			console.debug('irys', 'Error uploading data ', e);
		}
	};

	#fundNode = async (amount: number) => {
		const irys = await this.#getIrys(this.payer);
		try {
			const fundTx = await irys.fund(irys.utils.toAtomic(amount));
			console.debug(
				'irys',
				`Successfully funded ${irys.utils.fromAtomic(
					fundTx.quantity
				)} ${irys.token}`
			);
		} catch (e) {
			console.debug('irys', 'Error funding Irys: ', e);
		}
	};
}

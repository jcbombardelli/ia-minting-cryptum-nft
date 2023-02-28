import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import CryptumSDK from 'cryptum-sdk'
import { NftMetadata } from 'cryptum-sdk/dist/src/features/nft/entity'
import { TransactionResponse } from 'cryptum-sdk/dist/src/features/transaction/entity'
import { Wallet } from 'cryptum-sdk/dist/src/features/wallet/entity'

@Injectable()
export class CryptumService {
  private sdk: CryptumSDK
  private wallet: Wallet

  public constructor(private configService: ConfigService) {
    this.sdk = new CryptumSDK({
      apiKey: configService.get<string>('CRYPTUM_API_KEY'),
      environment: configService.get<string>('CRYPTUM_ENVIRONMENT') == 'prodction' ? 'mainnet' : 'testnet',
    })

    this.wallet = {
      privateKey: configService.get<string>('PRIVATE_KEY'),
      address: configService.get<string>('PUBLIC_ADDRESS'),
    } as Wallet
  }

  public async deployContractNFT(wallet = this.wallet): Promise<TransactionResponse> {
    if (!wallet) throw new Error('Wallet not Initialized')

    return await this.sdk.nft.create({
      name: 'Cryptum WebSummit',
      symbol: 'CWS',
      type: 'ERC721',
      protocol: this.configService.get<string>('PROTOCOL'),
      wallet: wallet,
      amount: '0',
    })
  }

  public async mintNFT(awardedAddress: string, fileUri: string): Promise<TransactionResponse> {
    console.log(awardedAddress, fileUri)
    const response = this.sdk.nft.mint({
      amount: '1',
      destination: awardedAddress,
      protocol: this.configService.get<string>('PROTOCOL'),
      token: this.configService.get<string>('SMART_CONTRACT'),
      wallet: this.wallet,
      uri: fileUri,
    })

    return response
  }

  // public async listNFT(tokenId: string): Promise<NftMetadata> {
  //   const response = await this.sdk.nft.getMetadata({
  //     protocol: this.configService.get<string>('PROTOCOL'),
  //     tokenAddress: this.configService.get<string>('SMART_CONTRACT'),
  //     tokenId: '7979089742858759',
  //   })
  //   return response
  // }

  public async listByAddress(address: string): Promise<TransactionResponse> {
    const r = await this.sdk.nft.
    return null
  }
}

import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'
import { NftMetadata } from 'cryptum-sdk/dist/src/features/nft/entity'
import { TransactionResponse } from 'cryptum-sdk/dist/src/features/transaction/entity'
import { CryptumService } from './cryptum.service'
import { INFT } from './NFT.dto'

@Controller('cryptum')
export class Cryptumontroller {
  constructor(private cryptumService: CryptumService) {}

  @Post('nft/deploy')
  public async deployNFT(): Promise<TransactionResponse> {
    const result = this.cryptumService.deployContractNFT()
    return result
  }

  @Post('nft/mint')
  public async mintNFT(@Body() nft: INFT): Promise<TransactionResponse> {
    return this.cryptumService.mintNFT(nft.address, nft.metadata)
  }

  @Get('nft/:id')
  public async listNFT(@Param() id: string): Promise<NftMetadata> {
    return this.cryptumService.listNFT(id)
  }

  @Get('balance/:address')
  public async getBalance(@Param() address: string): Promise<string> {
    return address
  }
}

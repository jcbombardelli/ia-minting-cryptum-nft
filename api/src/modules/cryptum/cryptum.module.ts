import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Cryptumontroller } from './cryptum.controller'
import { CryptumService } from './cryptum.service'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [Cryptumontroller],
  providers: [CryptumService],
  exports: [CryptumService],
})
export class CryptumModule {}

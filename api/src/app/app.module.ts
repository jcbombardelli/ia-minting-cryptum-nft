import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CryptumModule } from 'src/modules/cryptum/cryptum.module'

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    ConfigModule.forRoot(), 
    CryptumModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

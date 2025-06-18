import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import { databaseConnect } from './config/database.config';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env' , isGlobal: true})],
  controllers: [],
  providers: [...databaseConnect],
})
export class AppModule {}

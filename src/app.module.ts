import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import { databaseConnect } from './config/database.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env' , isGlobal: true}), UsersModule],
  controllers: [],
  providers: [...databaseConnect],
})
export class AppModule {}

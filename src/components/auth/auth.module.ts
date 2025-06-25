import { Module } from '@nestjs/common';
import { AccessService } from './auth.service';
import { AccessController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TokenVerifier } from './token-verifier.strategy';
import { DatabaseService } from '../../prisma/prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AccessController],
  providers: [AccessService, TokenVerifier, DatabaseService],
})
export class AuthModule {}

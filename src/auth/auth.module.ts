import { Module } from '@nestjs/common'
import { TokenHelper } from './helpers/token.helper'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../app/user/user.entity'
import { EncryptionHelper } from './helpers/encryption'
import { CommunicationModule } from 'src/app/communication/communication.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    CommunicationModule,
  ],
  controllers: [AuthController],
  providers: [TokenHelper, AuthService, LocalStrategy, JwtStrategy, EncryptionHelper],
  exports: [TokenHelper, AuthService],
})
export class AuthModule {}

import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { AuthModule } from '../../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule)],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

import { OmitType } from '@nestjs/swagger'
import { StoreUserDto } from './store-user.dto'

export class UpdateUserDto extends OmitType(StoreUserDto, ['password', 'confirmPassword']) {}

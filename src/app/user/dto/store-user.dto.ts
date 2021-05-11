import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator'
import { UserPasswordDto } from './user-password.dto'

export class StoreUserDto extends UserPasswordDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  @ApiProperty()
  firstName: string

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  @ApiProperty()
  lastName: string

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @ApiProperty()
  email: string
}

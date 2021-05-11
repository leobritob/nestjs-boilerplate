import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator'
import { SystemMessages } from 'src/constants/system-messages.constant'
import { Match } from '../../../decorators/match.decorator'

export class UserPasswordDto {
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^((?=.*[a-z])|(?=.*[A-Z]))(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message: SystemMessages.PASSWORD_NEED_NUMBER_AND_LETTERS,
  })
  @MaxLength(255)
  @ApiProperty()
  password: string

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  @Matches(/^((?=.*[a-z])|(?=.*[A-Z]))(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message: SystemMessages.PASSWORD_NEED_NUMBER_AND_LETTERS,
  })
  @Match('password', { message: SystemMessages.CONFIRM_PASSWORD_IS_WRONG })
  @ApiProperty()
  confirmPassword: string
}

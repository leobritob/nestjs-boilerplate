import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'

export class LoginDto {
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  email: string

  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  password: string

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  rememberMe?: boolean
}

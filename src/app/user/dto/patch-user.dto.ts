import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsIn, IsOptional } from 'class-validator'

export class PatchUserDto {
  @IsOptional()
  @IsIn([0, 1])
  @ApiPropertyOptional()
  isActive: number
}

import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsIn, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'
import { PaginationDto } from '../../../helpers/pagination.dto'

export class IndexQueryDto extends PaginationDto {
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiPropertyOptional()
  name?: string
}

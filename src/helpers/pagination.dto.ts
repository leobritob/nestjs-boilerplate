import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, Min } from 'class-validator'

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @ApiPropertyOptional()
  itemsPerPage?: number

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @ApiPropertyOptional()
  page?: number
}

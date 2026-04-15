import { IsIn, IsOptional, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindLeadsQueryDto {
  @ApiPropertyOptional({
    example: 'john',
    description: 'Search by name, email or company',
  })
  @IsOptional()
  q?: string;

  @ApiPropertyOptional({
    example: 'NEW',
    description: 'Filter by lead status',
  })
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Page number',
  })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Items per page',
  })
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @ApiPropertyOptional({
    enum: ['createdAt', 'updatedAt'],
    example: 'createdAt',
    description: 'Sort field',
  })
  @IsOptional()
  @IsIn(['createdAt', 'updatedAt'])
  sort?: 'createdAt' | 'updatedAt';

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    example: 'desc',
    description: 'Sort order',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}

import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { LeadStatus } from 'src/leads/schemas/lead.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLeadDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Lead full name',
  })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 'john@example.com',
    description: 'Lead email address',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'Acme Inc.',
    description: 'Company name',
  })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional({
    enum: LeadStatus,
    example: LeadStatus.NEW,
    description: 'Lead status',
  })
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @ApiPropertyOptional({
    example: 1000,
    description: 'Deal value',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  value?: number;

  @ApiPropertyOptional({
    example: 'Important client',
    description: 'Additional notes',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

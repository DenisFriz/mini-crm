import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 'This lead looks very promising',
    description: 'Comment text',
    minLength: 1,
    maxLength: 500,
  })
  @IsString()
  @Length(1, 500)
  text!: string;
}

import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('api/leads/:id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create comment for lead' })
  @ApiParam({ name: 'id', description: 'Lead ID' })
  @ApiResponse({ status: 201, description: 'Comment created' })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  create(@Param('id') leadId: string, @Body() dto: CreateCommentDto) {
    return this.commentsService.create(leadId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments for lead' })
  @ApiParam({ name: 'id', description: 'Lead ID' })
  @ApiResponse({ status: 200, description: 'List of comments' })
  findAll(@Param('id') leadId: string) {
    return this.commentsService.findByLead(leadId);
  }
}

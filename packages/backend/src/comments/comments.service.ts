import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Lead, LeadDocument } from 'src/leads/schemas/lead.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>,

    @InjectModel(Lead.name)
    private leadModel: Model<LeadDocument>,
  ) {}

  async create(leadId: string, dto: CreateCommentDto) {
    try {
      const lead = await this.leadModel.findById(leadId);
      if (!lead) throw new NotFoundException('Lead not found');

      const comment = await this.commentModel.create({
        leadId: new Types.ObjectId(leadId),
        text: dto.text,
      });

      return comment;
    } catch (err: any) {
      throw new BadRequestException({
        message: 'Failed to create comment',
        error: err.message,
      });
    }
  }

  async findByLead(leadId: string) {
    const lead = await this.leadModel.findById(leadId);
    if (!lead) throw new NotFoundException('Lead not found');

    try {
      return await this.commentModel
        .find({ leadId: new Types.ObjectId(leadId) })
        .sort({ createdAt: -1 })
        .lean();
    } catch (err: any) {
      throw new BadRequestException({
        message: 'Failed to fetch comments',
        error: err.message,
      });
    }
  }
}

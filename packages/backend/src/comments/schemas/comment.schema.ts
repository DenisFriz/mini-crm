import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Comment {
  @Prop({
    type: Types.ObjectId,
    ref: 'Lead',
    required: true,
  })
  leadId!: Types.ObjectId;

  @Prop({
    required: true,
    minlength: 1,
    maxlength: 500,
  })
  text!: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

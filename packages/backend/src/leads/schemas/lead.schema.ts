import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeadDocument = HydratedDocument<Lead>;

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  IN_PROGRESS = 'IN_PROGRESS',
  WON = 'WON',
  LOST = 'LOST',
}

@Schema({ timestamps: true })
export class Lead {
  @Prop({ required: true })
  name!: string;

  @Prop({
    required: false,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
  })
  email?: string;

  @Prop()
  company?: string;

  @Prop({
    enum: LeadStatus,
    default: LeadStatus.NEW,
  })
  status!: LeadStatus;

  @Prop()
  value?: number;

  @Prop()
  notes?: string;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);

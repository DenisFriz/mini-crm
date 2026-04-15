import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lead, LeadDocument } from './schemas/lead.schema';
import { Model } from 'mongoose';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { FindLeadsQueryDto } from './dto/find-leads.dto';

@Injectable()
export class LeadsService {
  constructor(@InjectModel(Lead.name) private leadModel: Model<LeadDocument>) {}

  async create(dto: CreateLeadDto) {
    try {
      return await this.leadModel.create(dto);
    } catch (err: any) {
      throw new BadRequestException({
        message: 'Validation error',
        error: err.message,
      });
    }
  }

  async findAll(query: FindLeadsQueryDto) {
    try {
      const page = Math.max(Number(query.page ?? 1), 1);
      const limit = Math.min(Math.max(Number(query.limit ?? 10), 1), 100);

      const filter: any = {};

      if (query.q) {
        filter.$or = [
          { name: { $regex: query.q, $options: 'i' } },
          { email: { $regex: query.q, $options: 'i' } },
          { company: { $regex: query.q, $options: 'i' } },
        ];
      }

      if (query.status) {
        filter.status = query.status;
      }

      const sortField = query.sort ?? 'createdAt';
      const sortOrder = query.order === 'asc' ? 1 : -1;

      const [data, total] = await Promise.all([
        this.leadModel
          .find(filter)
          .skip((page - 1) * limit)
          .limit(limit)
          .sort({ [sortField]: sortOrder }),
        this.leadModel.countDocuments(filter),
      ]);

      return {
        data,
        total,
        page,
        limit,
      };
    } catch (err: any) {
      throw new BadRequestException({
        message: 'Failed to fetch leads',
        error: err.message,
      });
    }
  }

  async findOne(id: string) {
    const lead = await this.leadModel.findById(id);
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async update(id: string, dto: UpdateLeadDto) {
    const lead = await this.leadModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });

    if (!lead) throw new NotFoundException('Lead not found');

    return lead;
  }

  async remove(id: string) {
    const lead = await this.leadModel.findByIdAndDelete(id);
    if (!lead) throw new NotFoundException('Lead not found');
    return { message: 'Deleted successfully' };
  }
}

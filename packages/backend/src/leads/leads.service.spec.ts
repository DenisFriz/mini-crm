import { Test, TestingModule } from '@nestjs/testing';
import { LeadsService } from './leads.service';
import { getModelToken } from '@nestjs/mongoose';
import { Lead } from './schemas/lead.schema';
import { NotFoundException } from '@nestjs/common';

describe('LeadsService', () => {
  let service: LeadsService;

  const mockQuery = {
    skip: jest.fn(),
    limit: jest.fn(),
    sort: jest.fn(),
  };

  const mockLeadModel = {
    create: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: getModelToken(Lead.name),
          useValue: mockLeadModel,
        },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a lead', async () => {
    const dto = { name: 'John' };
    const result = { _id: '1', ...dto };

    mockLeadModel.create.mockResolvedValue(result);

    const res = await service.create(dto as any);

    expect(res).toEqual(result);
    expect(mockLeadModel.create).toHaveBeenCalledWith(dto);
  });

  it('should return leads with filter + pagination', async () => {
    const leads = [{ name: 'A' }];

    mockQuery.sort.mockResolvedValue(leads);

    mockLeadModel.find.mockReturnValue({
      skip: mockQuery.skip,
    });

    mockQuery.skip.mockReturnValue({
      limit: mockQuery.limit,
    });

    mockQuery.limit.mockReturnValue({
      sort: mockQuery.sort,
    });

    mockLeadModel.countDocuments.mockResolvedValue(1);

    const result = await service.findAll({
      status: 'NEW',
      page: 1,
      limit: 10,
    } as any);

    expect(result).toEqual({
      data: leads,
      total: 1,
      page: 1,
      limit: 10,
    });

    expect(mockLeadModel.find).toHaveBeenCalled();
    expect(mockLeadModel.countDocuments).toHaveBeenCalled();
  });

  it('should return lead by id', async () => {
    const lead = { _id: '1', name: 'Test' };

    mockLeadModel.findById.mockResolvedValue(lead);

    const res = await service.findOne('1');

    expect(res).toEqual(lead);
    expect(mockLeadModel.findById).toHaveBeenCalledWith('1');
  });

  it('should throw if lead not found (findOne)', async () => {
    mockLeadModel.findById.mockResolvedValue(null);

    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('should update lead', async () => {
    const updated = { _id: '1', name: 'Updated' };

    mockLeadModel.findByIdAndUpdate.mockResolvedValue(updated);

    const res = await service.update('1', { name: 'Updated' } as any);

    expect(res).toEqual(updated);
  });

  it('should throw if update not found', async () => {
    mockLeadModel.findByIdAndUpdate.mockResolvedValue(null);

    await expect(service.update('1', { name: 'X' } as any)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should remove lead', async () => {
    mockLeadModel.findByIdAndDelete.mockResolvedValue({ _id: '1' });

    const res = await service.remove('1');

    expect(res).toEqual({ message: 'Deleted successfully' });
  });

  it('should throw if delete not found', async () => {
    mockLeadModel.findByIdAndDelete.mockResolvedValue(null);

    await expect(service.remove('1')).rejects.toThrow(NotFoundException);
  });
});

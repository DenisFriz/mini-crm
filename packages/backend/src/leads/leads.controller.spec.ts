import { Test, TestingModule } from '@nestjs/testing';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { LeadStatus } from './schemas/lead.schema';

describe('LeadsController', () => {
  let controller: LeadsController;
  let service: LeadsService;

  const mockLeadsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [
        {
          provide: LeadsService,
          useValue: mockLeadsService,
        },
      ],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
    service = module.get<LeadsService>(LeadsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a lead', async () => {
    const dto = {
      name: 'John Doe',
      email: 'john@test.com',
      company: 'Test Inc',
    };

    const result = { id: '1', ...dto };

    mockLeadsService.create.mockResolvedValue(result);

    expect(await controller.create(dto as any)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all leads', async () => {
    const leads = [
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
    ];

    mockLeadsService.findAll.mockResolvedValue(leads);

    expect(await controller.findAll({})).toEqual(leads);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one lead', async () => {
    const lead = {
      id: '1',
      name: 'John',
      status: LeadStatus.NEW,
    };

    mockLeadsService.findOne.mockResolvedValue(lead);

    expect(await controller.findOne('1')).toEqual(lead);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a lead', async () => {
    const dto = { name: 'Updated name' };
    const updated = { id: '1', ...dto };

    mockLeadsService.update.mockResolvedValue(updated);

    expect(await controller.update('1', dto as any)).toEqual(updated);
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should delete a lead', async () => {
    const result = { deleted: true };

    mockLeadsService.remove.mockResolvedValue(result);

    expect(await controller.remove('1')).toEqual(result);
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});

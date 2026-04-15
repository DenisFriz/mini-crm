import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  const mockCommentsService = {
    create: jest.fn(),
    findByLead: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: mockCommentsService,
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a comment', async () => {
    const leadId = 'lead123';

    const dto = {
      text: 'Great lead!',
    };

    const result = {
      id: 'comment1',
      leadId,
      ...dto,
    };

    mockCommentsService.create.mockResolvedValue(result);

    const response = await controller.create(leadId, dto as any);

    expect(response).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(leadId, dto);
  });

  it('should return comments for a lead', async () => {
    const leadId = 'lead123';

    const comments = [
      { id: '1', text: 'A', leadId },
      { id: '2', text: 'B', leadId },
    ];

    mockCommentsService.findByLead.mockResolvedValue(comments);

    const response = await controller.findAll(leadId);

    expect(response).toEqual(comments);
    expect(service.findByLead).toHaveBeenCalledWith(leadId);
  });
});

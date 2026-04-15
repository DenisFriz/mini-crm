import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema';
import { Lead } from 'src/leads/schemas/lead.schema';

describe('CommentsService', () => {
  let service: CommentsService;

  const mockCommentModel = {
    create: jest.fn(),
    find: jest.fn(),
  };

  const mockLeadModel = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getModelToken(Comment.name),
          useValue: mockCommentModel,
        },
        {
          provide: getModelToken(Lead.name),
          useValue: mockLeadModel,
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create comment when lead exists', async () => {
    const leadId = '507f1f77bcf86cd799439011';
    const dto = { text: 'Nice lead!' };

    mockLeadModel.findById.mockResolvedValue({ _id: leadId });

    const createdComment = {
      _id: 'c1',
      leadId,
      text: dto.text,
    };

    mockCommentModel.create.mockResolvedValue(createdComment);

    const result = await service.create(leadId, dto);

    expect(result).toEqual(createdComment);
    expect(mockLeadModel.findById).toHaveBeenCalledWith(leadId);
    expect(mockCommentModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        leadId: expect.any(Object),
        text: dto.text,
      }),
    );
  });

  it('should throw if lead not found', async () => {
    mockLeadModel.findById.mockResolvedValue(null);

    await expect(service.findByLead('invalid')).rejects.toThrow();
  });
});

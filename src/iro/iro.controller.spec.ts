import { Test, TestingModule } from '@nestjs/testing';
import { IroService } from './iro.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIRODto } from './dto/create-iro';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('IroService', () => {
  let iroService: IroService;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IroService,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() },
      ],
    }).compile();

    iroService = module.get<IroService>(IroService);
    prismaService = module.get<DeepMockProxy<PrismaService>>(PrismaService);
  });

  it('should be defined', () => {
    expect(iroService).toBeDefined();
  });

  describe('createIRO', () => {
    it('should create a new IRO', async () => {
      const createIRODto: CreateIRODto = {
        title: 'Test Title',
        description: 'Test Description',
        impactScore: 5,
      };
      const userId = 'user123';
      const createdIRO = {
        id: 'iro123',
        ...createIRODto,
        createdBy: userId,
        createdAt: new Date(),
      };

      prismaService.iRO.create.mockResolvedValue(createdIRO);

      const result = await iroService.createIRO(createIRODto, userId);
      expect(result).toEqual(createdIRO);
      expect(prismaService.iRO.create).toHaveBeenCalledWith({
        data: { ...createIRODto, createdBy: userId },
      });
    });
  });

  describe('getAllIROs', () => {
    it('should return an array of IROs', async () => {
      const iroArray = [
        {
          id: 'iro123',
          title: 'Test Title 1',
          description: 'Test Description 1',
          impactScore: 5,
          createdBy: 'user123',
          createdAt: new Date(),
        },
        {
          id: 'iro124',
          title: 'Test Title 2',
          description: 'Test Description 2',
          impactScore: 3,
          createdBy: 'user456',
          createdAt: new Date(),
        },
      ];

      prismaService.iRO.findMany.mockResolvedValue(iroArray);

      const result = await iroService.getAllIROs();
      expect(result).toEqual(iroArray);
      expect(prismaService.iRO.findMany).toHaveBeenCalled();
    });
  });
});

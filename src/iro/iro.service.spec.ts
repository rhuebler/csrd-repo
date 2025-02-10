import { Test, TestingModule } from '@nestjs/testing';
import { IroService } from './iro.service';
import { PrismaService } from '../prisma/prisma.service';
import { IRO } from '@prisma/client'; // Import the IRO type if available

describe('IroService', () => {
  let iroService: IroService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const mockPrismaService = {
      iRO: {
        create: jest.fn().mockResolvedValue({} as IRO), // Provide a default mockResolvedValue
        findMany: jest.fn().mockResolvedValue([] as IRO[]), // Provide a default mockResolvedValue
      },
    } as unknown as PrismaService; // Cast to PrismaService

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IroService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    iroService = module.get<IroService>(IroService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(iroService).toBeDefined();
  });

  describe('createIRO', () => {
    it('should create a new IRO', async () => {
      const createIRODto = { title: 'Test Title', description: 'Test Description', impactScore: 5 };
      const userId = 'user123';
      const createdIRO = { ...createIRODto, createdBy: userId };

      (prismaService.iRO.create as jest.Mock).mockResolvedValue(createdIRO);

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
        { title: 'Test Title 1', description: 'Test Description 1', impactScore: 5, createdBy: 'user123' },
        { title: 'Test Title 2', description: 'Test Description 2', impactScore: 3, createdBy: 'user456' },
      ];

      (prismaService.iRO.findMany as jest.Mock).mockResolvedValue(iroArray);

      const result = await iroService.getAllIROs();
      expect(result).toEqual(iroArray);
      expect(prismaService.iRO.findMany).toHaveBeenCalled();
    });
  });
});

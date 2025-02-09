import { Test, TestingModule } from '@nestjs/testing';
import { IroService } from './iro.service';
import { PrismaModule } from '../prisma/prisma.module'; // Adjust the import path as needed

describe('IroService', () => {
  let service: IroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule], // Import the module providing PrismaService
      providers: [IroService],
    }).compile();

    service = module.get<IroService>(IroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

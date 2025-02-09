import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { IroService } from '../src/iro/iro.service'

describe('IroService (PostgreSQL)', () => {
  let iroService: IroService;
  let prisma: PrismaService;

  beforeAll(async () => {
    process.env.DATABASE_URL = 'postgresql://test_user:test_password@localhost:5433/test_db?schema=public';

    const module: TestingModule = await Test.createTestingModule({
      providers: [IroService, PrismaService],
    }).compile();

    iroService = module.get<IroService>(IroService);
    prisma = module.get<PrismaService>(PrismaService);
    
    await prisma.$connect();
    await prisma.$executeRaw`TRUNCATE TABLE "Iro" RESTART IDENTITY CASCADE`; // Clear test data
  });

  it('should create an IRO entry', async () => {
    const newIro = await prisma.iro.create({
      data: { name: 'Test IRO', risk: 'High' },
    });

    expect(newIro).toHaveProperty('id');
    expect(newIro.name).toBe('Test IRO');
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});

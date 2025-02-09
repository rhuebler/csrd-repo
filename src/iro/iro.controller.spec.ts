import { Test, TestingModule } from '@nestjs/testing';
import { IroController } from './iro.controller';
import { IroService } from './iro.service';

describe('IroController', () => {
  let controller: IroController;
  let service: IroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IroController],
      providers: [
        IroService,
        {
          provide: IroService,
          useValue: {
            // Mock methods as needed
            // exampleMethod: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<IroController>(IroController);
    service = module.get<IroService>(IroService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
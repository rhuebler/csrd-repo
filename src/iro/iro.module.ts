import { Module } from '@nestjs/common';
import { IroController } from './iro.controller';
import { IroService } from './iro.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [IroController],
  providers: [IroService],
  exports: [IroService],
})
export class IroModule {}

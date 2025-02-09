import { Module } from '@nestjs/common';
import { IroService } from './iro.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [IroService],
  exports: [IroService],
})
export class IroModule {}
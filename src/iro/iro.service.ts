// src/iro/iro.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIRODto } from './dto/create-iro';

@Injectable()
export class IroService {
  constructor(private prisma: PrismaService) {}

  async createIRO(data: CreateIRODto, userId: string) {
    return this.prisma.iRO.create({
      data: {
        title: data.title,
        description: data.description,
        impactScore: data.impactScore,
        createdBy: userId,
      },
    });
  }

  async getAllIROs() {
    return this.prisma.iRO.findMany();
  }
}

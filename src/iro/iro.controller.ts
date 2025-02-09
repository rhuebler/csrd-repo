import { Controller, Post, Get, Body, Req, UseGuards } from "@nestjs/common";
import { IroService } from "./iro.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { CreateIRODto } from "./dto//create-iro";
@Controller("iro")
export class IroController {
  constructor(private readonly iroService: IroService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async create(@Body() data: CreateIRODto, @Req() req) {
    return this.iroService.createIRO(data, req.user.id);
  }

  @Get("all")
  async getAll() {
    return this.iroService.getAllIROs();
  }
}

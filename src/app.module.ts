import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IroModule } from './iro/iro.module';

@Module({
  imports: [IroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

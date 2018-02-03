import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CurriculumModule } from '../curriculum/curriculum.module';

import { BootService } from './services/boot.service';

@Module({
  imports: [CurriculumModule],
  controllers: [],
  components: [BootService],
})
export class ServerBootModule {}
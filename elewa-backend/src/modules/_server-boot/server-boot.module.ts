import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CurriculumFixture } from './fixtures/curriculum.fixture';

import { BootService } from './services/boot.service';


@Module({
  imports: [],
  controllers: [],
  components: [BootService,
               CurriculumFixture],
})
export class ServerBootModule {}
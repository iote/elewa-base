import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubjectController } from './controllers/subject.controller';
import { SubjectService } from './services/subject.service';
import { SubjectSchema } from './model/schemas/subject.schema';
import { SubjectRepository } from './model/repositories/subject.repository';
import { CurriculumFixture } from './model/fixtures/curriculum.fixture';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Subject', schema: SubjectSchema }])],
  components: [SubjectRepository, SubjectService, CurriculumFixture],
  controllers: [SubjectController],
  exports: [CurriculumFixture]
})
export class CurriculumModule {}
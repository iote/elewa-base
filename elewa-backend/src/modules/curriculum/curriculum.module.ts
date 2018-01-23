import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubjectController } from './controllers/subject.controller';
import { SubjectService } from './services/subject.service';
import { SubjectSchema } from './model/schemas/subject.schema';
import { SubjectRepository } from './model/repositories/subject.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Subject', schema: SubjectSchema }])],
  components: [SubjectRepository, SubjectService],
  controllers: [SubjectController],
})
export class CurriculumModule {}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectController } from './controllers/subject.controller';
import { SubjectService } from './services/subject.service';
import { SubjectSchema } from './model/schemas/subject.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Subject', schema: SubjectSchema }])],
  controllers: [SubjectController],
  components: [SubjectService],
})
export class CurriculumModule {}
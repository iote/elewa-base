import { Controller, Get, Post, Body, Param, ReflectMetadata } from '@nestjs/common';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../model/interfaces/subject.interface';
import { RequireClaim } from '../../auth/gaurds/claims.decorator';

@Controller('subject')
@RequireClaim('curriculum')
export class SubjectController {
  constructor(private readonly catsService: SubjectService) {}

  /*
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }*/

  @Get()
  async findAll(): Promise<Subject[]> {
    return this.catsService.findAll();
  }
}
import { Controller, Get, Post, Body, Param, ReflectMetadata } from '@nestjs/common';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../model/interfaces/subject.interface';
import { RequireClaims } from '../../auth/gaurds/claims.decorator';

@Controller('subject')
@RequireClaims('curriculum')
export class SubjectController {
  constructor(private readonly subjService: SubjectService) {}

  /*
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }*/

  @Get()
  async findAll(): Promise<Subject[]> {
    return this.subjService.findAll();
  }
}
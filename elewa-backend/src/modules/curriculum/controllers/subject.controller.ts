import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../model/interfaces/subject.interface';

@Controller('subject')
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
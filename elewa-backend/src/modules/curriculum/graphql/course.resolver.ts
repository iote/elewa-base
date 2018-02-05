import { Resolver, Query, ResolveProperty } from "@nestjs/graphql";
import { SubjectService } from '../services/subject.service';
import { Course } from '../model/interfaces/course.interface';

/**
 * Query Resolver for Course objects
 */
@Resolver('Course')
export class CourseResolver {
  
  constructor(private readonly _subjectService: SubjectService) {}

  @ResolveProperty('className')
  async getClassName(course :Course, args, context, info) {
    return "Form " + course.order;
  }
}
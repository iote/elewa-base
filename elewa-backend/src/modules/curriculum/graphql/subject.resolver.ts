import { Resolver, Query, ResolveProperty } from "@nestjs/graphql";
import { SubjectService } from '../services/subject.service';

/**
 * Base Query Resolver for Curriculum Queries
 * - https://docs.nestjs.com/graphql/resolvers-map
 */
@Resolver('Subject')
export class SubjectResolver {
  
  constructor(private readonly _subjectService: SubjectService) {}

  @Query('subjects')
  async subjects(obj, args, context, info) {
    return await this._subjectService.findAll();
  }
}
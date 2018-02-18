import { Resolver, Query, ResolveProperty } from "@nestjs/graphql";
import { SubjectService } from '../services/subject.service';
import { RequireClaims } from '../../auth/gaurds/claims.decorator';
import { UseGuards } from "@nestjs/common";
import { HttpClaimsGuard } from '../../auth/gaurds/http-claims.guard';

/**
 * Base Query Resolver for Curriculum Queries
 * - https://docs.nestjs.com/graphql/resolvers-map
 */
@Resolver('Query')
export class SubjectResolver {
  
  constructor(private readonly _subjectService: SubjectService) {}
  
  @Query('subjects')
  @RequireClaims('curriculum')
  async subjects(obj, args, context, info) {
    return await this._subjectService.findAll();
  }

  @Query('subject')
  async subject(obj, args, context, info) {
    return await this._subjectService.findSingle({ _id: args.id });
  }
}
import { ReflectMetadata } from '@nestjs/common';

export const RequireClaims = (...claims: string[]) => ReflectMetadata('claims', claims);
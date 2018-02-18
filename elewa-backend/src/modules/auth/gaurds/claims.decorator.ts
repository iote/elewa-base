import { ReflectMetadata } from '@nestjs/common';

export const RequireClaim = (...claims: string[]) => ReflectMetadata('claims', claims);
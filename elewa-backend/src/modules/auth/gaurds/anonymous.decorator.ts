import { ReflectMetadata } from '@nestjs/common';

export const Anonymous = () => ReflectMetadata('claims', ['none']);
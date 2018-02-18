import { Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';

@Module({
  components: [CacheService],
  exports: [CacheService]
})
export class CoreModule { }

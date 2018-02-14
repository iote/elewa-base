import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CurriculumModule } from '../curriculum/curriculum.module';

import { BootService } from './boot.service';
import { AuthModule } from '../auth/auth.module';
import { BootAuthService } from './module-boots/boot-auth.service';
import { BootCurriculumService } from './module-boots/boot-curriculum.service';
import { ConfigureCorsService } from './configure-server/configure-cors.service';


@Module({
  imports: [CurriculumModule, AuthModule],
  controllers: [],
  components: [ConfigureCorsService,
               BootAuthService, BootCurriculumService, 
                
               BootService],
})
export class ServerBootModule {}
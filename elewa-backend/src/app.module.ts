import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connString } from './base/config/db.connectionstring';

import { ServerBootModule } from './modules/_server-boot/server-boot.module';
import { CurriculumModule } from './modules/curriculum/curriculum.module';

import { AppController } from './app.controller';

@Module({
  imports: [ MongooseModule.forRoot(connString), 
             ServerBootModule,
             CurriculumModule ],
  controllers: [ AppController ],
  components: [],
})
export class ApplicationModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connString } from './base/config/db.connectionstring';

import { ServerBootModule } from './modules/_server-boot/server-boot.module';

import { AppController } from './app.controller';



@Module({
  imports: [ MongooseModule.forRoot(connString), ServerBootModule ],
  controllers: [ AppController ],
  components: [],
})
export class ApplicationModule {}

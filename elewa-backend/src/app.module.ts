import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { connString } from './base/config/db.connectionstring';

@Module({
  imports: [ MongooseModule.forRoot(connString) ],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}

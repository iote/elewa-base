import { Module,NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './model/schema/user.schema';

import { UserRepository } from './model/repositories/user-repository.interface';
import { UserService } from './model/services/user.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  components: [UserRepository, UserService],
  controllers: [],

  exports: [UserService]
})
export class UserModule { }
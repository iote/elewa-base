import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';

import { UserRepository } from '../repositories/user-repository.interface';
import { User } from '../interfaces/user.interface';
import { UserProfile } from '../interfaces/user-profile.interface';
import { ObjectId } from 'bson';


@Component()
export class UserService {

  constructor(private _userRepo: UserRepository) {}

  async findUserByLogin(username) : Promise<User | false> {
    return this._userRepo.trySingle({ login: username });  
  }

  async getProfile(_id: ObjectId) : Promise<UserProfile> {
    const user :User = await this._userRepo.single({ _id });
    return user.profile;
  }
}
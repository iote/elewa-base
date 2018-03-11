import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';

import { UserRepository } from '../repositories/user-repository.interface';
import { User } from '../interfaces/user.interface';
import { UserProfile } from 'elewa-shared/user/user-profile.interface';
import { ObjectId } from 'bson';
import { RegisterRequestDto } from 'elewa-shared/dto/auth/register-request.dto.interface';
import * as bcrypt from 'bcrypt';

@Component()
export class UserService {

  constructor(private _userRepo: UserRepository) {}

  async findUserByLogin(username) : Promise<User | false> {
    return this._userRepo.trySingle({ login: username });  
  }

  async findById(id) : Promise<User | false> {
    return this._userRepo.findById(id);  
  }

  async getProfile(_id: ObjectId) : Promise<UserProfile> {
    const user :User = await this._userRepo.single({ _id });
    return user.profile;
  }

  async userExists(login: String) : Promise<boolean> {
    return <Promise<boolean>> this.findUserByLogin(login);
  }

  async createFromRegistration(regReq: RegisterRequestDto): Promise<User> {

    const hashedPassword = await bcrypt.hash(regReq.login, 8);
    
    const user : User = {
      login: regReq.login,
      password: hashedPassword, // Never store plain text passwords

      active: true,
      createdOn: new Date(),

      profile: this._createProfile(regReq),

      role: regReq.role
    };

    let savedUser = await this._userRepo.insert(user);

    if(savedUser)
      return savedUser;
    else 
      throw new Error("Something went wrong saving user. Cannot create user.");
  }

  private _createProfile(regReq: RegisterRequestDto) : UserProfile {
    return {
      email: regReq.email,
      firstName: regReq.firstName,
      lastName: regReq.lastName,
      
      telephone: regReq.telephone,
    
      idNo: regReq.idNo,
      empNo: regReq.empNo
    }
  }
}
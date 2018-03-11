import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../interfaces/user.interface';
import { Subject } from 'rxjs/Subject';

export class UserService {

  private _user: Subject<User | false>;

  constructor() {
    this._user = new Subject<User | false>();
  }

  observeUser() {
    return this._user;
  }

  updateUser(user: User) {
    this._user.next(user);
  }

  flushUser() {
    this._user.next(false);
  }
}

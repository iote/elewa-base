import { User } from "../../interfaces/user.interface";
import { ObjectId } from "mongodb";

export const users: User[] = [
  {
    "login": "user", // password: 12345678
    "password": "$2a$04$NdebaP0WmP8BZWRCo8ck5uGkAADsIqdVl85iOsJBY3h1ZpkaP6ul6",
    "profile": {
      "firstName": "Bob",
      "lastName": "The Builder",

      "email": "bob@thebuilder.com",
      "telephone": "0702304230",

      "idNo": "2",
    },
    "role": "eta",
    "createdOn": new Date("2018-06-30T00:00:00.000Z"),
    "active": true,
    "isDisabled": false
  },
  {
    "login": "admin", // password: 12345678
    "password": "$2a$04$P6H9FDMLPOZJ1RtCqzDQZ.a.Fq/4eHUZLXjhmdGA9g7I7EvjCwvRK",
    "profile": {
      "firstName": "Homer",
      "lastName": "Simpson",

      "email": "homer@thesimpsons.com",
      "telephone": "0702304221",

      "idNo": "3",
    },
    "role": "admin",
    "createdOn": new Date("2018-06-30T00:00:00.000Z"),
    "active": true,
    "isDisabled": false
  }
];

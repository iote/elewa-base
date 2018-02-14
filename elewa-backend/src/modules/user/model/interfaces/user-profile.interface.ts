import { ObjectId } from "bson";


export interface UserProfile {

  firstName?: String;
  lastName? : String;

  email: String;
  telephone?: String;

  studentNo?: String;

  schoolId?: ObjectId;

}
import { ObjectId } from "bson";


export interface Role {
  _id?: ObjectId;

  /** Index used to retrieve role and foreign key to role. Must never change in live system!! 
   *    Since we don't have integretity checks on database (MongoDB), changing this value will cause a lot
   *    of users to fail to login. */
  slug: String;
  
  /** Display name of a role for admin display purposes. Can be subject to change. */
  name: String;

  /** List of claims for that role. 
   *  Currently we use a mongoose enum to describe all possible claims.
   *  Configure in @see ../schema/role.schema.ts
   */
  claims: String[];
}
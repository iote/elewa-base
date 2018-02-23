export interface RegisterRequestDto {

  /** Login with email, telephone, student No., ... */
  login: String;
  /** User password (Always hash before storing!) */
  password: String;

  firstName?: String;
  lastName? : String;

  email: String;
  telephone?: String;

  studentNo?: String;

  // schoolName: String; - TODO: Later add school. 
}
export interface RegisterRequestDto {

  /** Login with email, telephone, student No., ... */
  login: String;
  /** User password (Always hash before storing!) */
  password: String;

  firstName?: String;
  lastName? : String;

  email: String;
  telephone?: String;

  idNo?: String;
  empNo?: String;
  role: 'eta' | 'etf' | 'admin';

  // schoolName: String; - TODO?: Later add school. 

}

/**
 * The AuthConfig contains the configuration of the 
 *    Passport.js JWT Bearer Token Strategy.
 *    Extended with our own implementation of Refresh Tokens.  
 * 
 * Details:
 *  Refresh Token Secret - Used to sign the Refresh Tokens
 *  ExpiresIn  - Number of seconds before Refresh Token becomes invalid.
 * 
 * 
 *  Bearer Token Secret - Used to sign the Bearer Tokens. Is a constant as well because we want to avoid roundtrips to the database.
 *       - Refresh Token Secret is fixed. Bearer Token Secret Changes every day ~ TODO 
 * 
 *  Bearer Token Expires In  - Number of seconds before Bearer Token becomes invalid.
 */
export interface AuthConfig {

  /*  Number of minutes in which the Bearer Token expires.
   *    After this amount of time, the user wil have to log in again. 
   *  
   *  Usually set on a couple of weeks or a month. By default we use 60 days.
   *  
   *  Expressed in seconds or a string describing a time span. Eg: 60, "2 days", "10h", "7d"
   *    Uses zeit/ms - Full reference of options https://github.com/zeit/ms */
  refreshTokenSecret: String;
  
  refreshTokenExpiry: Number;

  /** Secret Key used for encryption of JSON Web Tokens. At least 25 characters long! */
  bearerTokenSecret: String;
  /** Number of minutes in which the Bearer Token expires. 
   *    After this amount of time, the user wil have to log in again. 
   *  
   *  The default we use is 10 minutes. */
  bearerTokenExpiry: Number;
}

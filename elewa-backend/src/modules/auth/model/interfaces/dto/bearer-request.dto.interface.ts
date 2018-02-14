/**
 * DTO used to request for a Bearer Token.
 * 
 * User will perform request for Bearer Token (automatically) when previous Bearer Token expired.
 * 
 * A user requests for a Bearer Token by sending his Refresh Token stored in local state 
 *  or on a cookie to the server. The Refresh Token was acquired by the user on login (through filling name + passwd).
 * 
 * If the refresh token is valid and not yet expired, the server will issue a new bearer token also containing the user claims.
 */
export interface BearerRequestDto {
  readonly refreshToken: String;
}

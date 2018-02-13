import { AuthConfig } from "../../interfaces/auth-config.interface";
import { uuid } from 'uuid/v4';

/**
 * Secure configuration of authentication.
 * 
 * Refresh token secrets can be replaced by your own imagination (at least 25 character secret). 
 *    uuid/v4 however uses a secure random generator, and thus provides solid random security. 
 */
export const authConfig : AuthConfig = {
  refreshTokenSecret: uuid(),
  // 30 days for production - 60 * 60 * 24 * 30
  // 1 day for development 60 * 60 * 24
  refreshTokenExpiry: 60 * 60 * 24,
  
  bearerTokenSecret: uuid(),
  // 10 minutes
  bearerTokenExpiry: 60 * 10
}
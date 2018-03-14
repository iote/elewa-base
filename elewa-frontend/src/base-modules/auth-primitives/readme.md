This is a standalone module (not included in core.module) that contains primitives for working with authentication / claims based authorisation in the system.

Contains the logic used for handling tokens and an interceptor that sends bearer token with every request (when available) to authenticate.

When the server notifies the frontend that a bearer token is invalid (expires every 10 minutes), this infrastructure will automatically uses the much longer stored refresh token to request a new bearer token.

If the Refresh token expires, the module logs out the user and redirects him/her to login.
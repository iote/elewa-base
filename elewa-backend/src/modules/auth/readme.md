# Application Authentication 

Authentication is done using a JSON Web Token (HTTP Bearer) claims based authentication strategy.
A refresh token strategy is followed for long term login.

Web Token validity is 10 minutes *= Time it takes before user browser asks for a new bearer token.*
Refresh Token Validity is 1 month *= Time it takes before the user needs to login again.*

More info about claims based authentication and also the difference with roles based: https://stackoverflow.com/questions/22814023/role-based-access-control-rbac-vs-claims-based-access-control-cbac-in-asp-n

More info about Refresh Tokens: https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/

## Getting started


## JWT Web Tokens


## Refresh Tokens


## Claims Based Authorisation


## Disabling a user


## Configuring user roles


## Security Measures
The bearer and refresh token strategy is secure when the following extra measures are taken:
  
  - Usage of a secure random number generator (SNRG) to generate the symmetric secret keys and refresh token re-authentication secret.

  This has been taken care of by using the npm package uuid - https://www.npmjs.com/package/uuid
  Security of uuid.v4() is confirmed by external source: https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba
  - Disable access to the server over HTTP. 
  
  All requests to the server need to be done over HTTPS, to avoid malicious parties from sniffing the bearer and refresh tokens. Sniffing tokens would allow them impersonate the user.
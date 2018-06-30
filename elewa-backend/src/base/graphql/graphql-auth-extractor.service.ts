
import * as jwt from "jsonwebtoken";
import { BearerToken } from "elewa-shared/token/bearer-token.interface";
import { Component } from "@nestjs/common";
import { AuthConfigService } from "../../modules/auth/services/auth-config.service";


@Component()
export class GraphqlAuthExtractorService {
  constructor(private  _authConfigService: AuthConfigService) {}

  public async extractToken(req): Promise<BearerToken | {}> {
    const headers = req.rawHeaders;
    for (let header of headers) {
      if (header.substring(0, 6) == "Bearer") {
        const token = header.split(" ")[1];
        const authConfig = await this._authConfigService.getAuthConfig();
        const bearer = <BearerToken>await jwt.verify(token, authConfig.bearerTokenSecret);
        return bearer;
      }
    }
    return {};
  }

}
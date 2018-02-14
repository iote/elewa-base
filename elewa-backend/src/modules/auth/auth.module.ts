import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';

import * as passport from 'passport';

import { AuthConfigSchema } from './model/schemas/auth-config.schema';
import { RefreshTokenSchema } from './model/schemas/refresh-token.schema';
import { RoleSchema } from './model/schemas/role.schema';

import { AuthConfigFixture } from './model/fixtures/auth-config.fixture';
import { RoleFixture } from './model/fixtures/role.fixture';

import { RolesService } from './services/roles.service';
import { AuthConfigService } from './services/auth-config.service';
import { BearerTokenService } from './services/bearer-token.service';
import { RefreshTokenService } from './services/refresh-token.service';

import { AuthConfigRepository } from './model/repositories/auth-config.repository';
import { RefreshTokenRepository } from './model/repositories/refresh-token.repository';
import { RoleRepository } from './model/repositories/role.repository';

import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature(
      [{ name: 'AuthConfig',    schema: AuthConfigSchema },
       { name: 'RefreshToken',  schema: RefreshTokenSchema },
       { name: 'Role',          schema: RoleSchema }])],
  
  components: [AuthConfigRepository, RefreshTokenRepository, RoleRepository,
               
               AuthConfigFixture, RoleFixture,
               
               AuthConfigService, 
               BearerTokenService, RefreshTokenService,
               RolesService],

  controllers: [AuthController],

  exports: [AuthConfigFixture, RoleFixture]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    /*consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes({ path: '/auth/authorized', method: RequestMethod.ALL });*/
  }
}
import * as passport from 'passport';

import { Module,NestModule,MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AuthConfigFixture } from './model/fixtures/auth-config.fixture';
import { AuthConfigService } from './services/auth-config.service';



@Module({
  components: [AuthConfigService, AuthConfigFixture],
  controllers: [],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes({ path: '/auth/authorized', method: RequestMethod.ALL });
  }
}
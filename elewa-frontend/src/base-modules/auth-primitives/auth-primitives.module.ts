import { Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './interceptors/auth.http-interceptor';
import { AuthTokenService } from './services/auth-token.service';
import { RefreshTokenService } from './services/refresh-token.service';

import { UserModule } from '../user/user.module';



@NgModule({
  imports: [ UserModule ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    AuthTokenService,
    RefreshTokenService
  ]
})
export class AuthPrimitivesModule { }

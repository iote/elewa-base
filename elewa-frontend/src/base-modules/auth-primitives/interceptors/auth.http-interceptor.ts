import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { AuthTokenService } from '../services/auth-token.service';
import { RefreshTokenService } from '../services/refresh-token.service';
import { Logger } from "../../../providers/logger/logger.service";
import { ObservableInput } from "rxjs/Observable";
import { Router } from "@angular/router";

/** 
 * Sets the Bearer Token as the authorisation header on each request.
 */
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor 
{
  constructor(private _http: HttpClient,
              private _router: Router,
              private _bearerService: AuthTokenService, 
              private _refreshService: RefreshTokenService,
              private _logger: Logger) { }

  /**
   * Interceptor that handles Authentication. 
   * 
   * On request, adds a bearer token if present.
   * On response, if fails because of 401 it tries to get a new bearer using the refresh token.
   *              It then retries all requests that where unauthorised. 
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    const interceptedReq = this._interceptRequest(req);
   
    return next.handle(interceptedReq)
                  // .map  ((event: HttpEvent<any>) => this._interceptResponse(event))
                  .catch((err: any, caught) => <ObservableInput<any>> this._handleFail(req, err));
  }


  /** 
   * Adds Authorisation Header to the request.
   */
  private _interceptRequest(req: HttpRequest<any>): HttpRequest<any> {
    const bearer = this._bearerService.getBearer();

    if(bearer) 
    {
      this._logger.log(() => "AuthRequestInterceptor: Setting Authorisation Header");

      const dupReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${ bearer }`) });
      return dupReq;
    }
      
    this._logger.log(() => "AuthRequestInterceptor: No Bearer Present. Sending Request.");
    return req;
  }

  /* If we need to handle some specific logic before returning event to user.
  private _interceptResponse(event: HttpEvent<any>) {
    return event;
  }*/

  /**
   * Handles the failing of a Bearer request.
   * 
   * Will try t
   */
  private _handleFail(req: HttpRequest<any>, err) :ObservableInput<any>
  {
    this._logger.log(() => 'AuthRequestInterceptor: Request failed. Investigating cause.');

    if (err instanceof HttpErrorResponse
      && err.status === 401) 
    {
      this._logger.log(() => 'AuthRequestInterceptor: Request failed due to Bearer Token expiry. Waiting for new token.'); 
      
      return this
        ._refreshService
            .getBearerFromRefresh()
            .map(bearer => {
              if(bearer) {
                this._logger.log(() => 'AuthRequestInterceptor: New bearer received. Retrying request..'); 
                return this._http.request(req.method, req.url, { body: req.body, headers: req.headers });
              }
              else { 
                this._logger.log(() => 'AuthRequestInterceptor: Refresh Token not working. Redirecting to Login'); 
                this._router.navigate(['/login']);
                return false;
              }
            });
      }

    return Observable.throw(err);
  }
}

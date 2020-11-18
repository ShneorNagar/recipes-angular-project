import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {exhaustMap, take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {UsersService} from './users.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private auth: UsersService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('interceptor started with request', req);
    return this.auth.userSub.pipe(take(1), exhaustMap( user =>{
      if (!user){
        return next.handle(req);
      }
      const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
      console.log('interceptor ended with request', modifiedReq);
      return next.handle(modifiedReq);
    }))
  }

}

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';

export interface AuthResponse{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  userSub = new BehaviorSubject<User>(null);

  signUp(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcnLmi8eKmcAhJ37D8hD0IgukX8RuYsws',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleErrors), tap(resData =>{
      this.handleUserData(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  signIn(email: string, password: string): Observable<AuthResponse>{
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcnLmi8eKmcAhJ37D8hD0IgukX8RuYsws',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleErrors), tap(resData =>{
      this.handleUserData(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }

  private handleUserData(email: string, id: string, token: string, expirationDate: number){
    const tokenExpirationDate = new Date(new Date().getTime() + +expirationDate * 1000);
    const user = new User(email, id, token, tokenExpirationDate);
    this.userSub.next(user);
  }

  private handleErrors(errorRes: HttpErrorResponse){

    let errorMessage: string;

    if (!errorRes.error || !errorRes.error.error){
      return throwError('unknown error')
    }
    else {
      switch (errorRes.error.error.message){

        case 'INVALID_PASSWORD':
          errorMessage = 'invalid password';
          break;

        case 'EMAIL_EXISTS':
          errorMessage = 'email already exists';
          break

        default:
          errorMessage = 'unknown error';
          break
      }
    }
    this.userSub.next(null);
    return throwError(errorMessage)
  }
}

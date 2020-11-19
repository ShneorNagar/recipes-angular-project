export class User {

  constructor(public email,
              public id,
              private _token,
              private _tokenExpirationData) {
  }

  get token() {
    return this._token;
  }

  get tokenExpirationDate(){
    return this._tokenExpirationData
  }
}

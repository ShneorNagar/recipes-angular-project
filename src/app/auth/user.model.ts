export class User {

  constructor(public email,
              public id,
              private _token,
              private tokenExpirationData) {
  }

  get token() {
    return this._token;
  }
}

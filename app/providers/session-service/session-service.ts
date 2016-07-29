import { Injectable } from '@angular/core';

/*
  Generated class for the SessionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SessionService {
  // sessionData -> { authenticated: true/false }

  constructor() {

  }

  public getSessionData(): any {
    return localStorage.getItem('session');
  }

  public setSessionData(sessionData: any): void {
    localStorage.setItem('session', sessionData);
  }

  public resetSessionData(): void {
    localStorage.setItem('session', null);
  }

}

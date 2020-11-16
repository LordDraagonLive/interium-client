import { UserCredentialsService } from './user-credentials.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../helpers/Config';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  public userCredentials: UserCredentialsService;
  public accounts: any[];

  constructor(
    private http: HttpClient,
    private _userCredentials: UserCredentialsService) {

    this.userCredentials = _userCredentials;
  }

  /**
   * getAccounts
   */
  public getAccounts() {

    const url = `${Config.authServerUri}/api/accounts`;

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Token', this.userCredentials.accessToken);

    return this.http.get(url, {headers})
  }

  /**
   * getAccountBalance
   */
  public getAccountBalance(id: string) {

    const url = `${Config.authServerUri}/api/accounts/GetAccountBalance`;
    const params = {
      id,
      token: this.userCredentials.accessToken
    }

    return this.http.get(url, {params})
  }

   /**
   * getAccountTransactions
   */
  public getAccountTransactions(id: string) {

    const url = `${Config.authServerUri}/api/accounts/GetAccountTransactions`;
    const params = {
      id,
      token: this.userCredentials.accessToken
    }

    return this.http.get(url, {params})
  }
}

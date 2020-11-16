import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ClientCredentials } from '../helpers/client-credentials';

import { Config } from '../helpers/Config';

const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class UserCredentialsService {

  public clientCredentials: ClientCredentials;
  public accessToken: any;
  public refreshToken: any;
  public credentialsId: any;
  public expirationDate: any;

  constructor(private http: HttpClient,
              clientCredentials: ClientCredentials) {

    this.clientCredentials = clientCredentials;
    this.accessToken = null;
    this.refreshToken = null;
    this.credentialsId = null;
    this.expirationDate = null;
  }

  /**
   * getFromAuthCode
   */
  // tslint:disable-next-line: typedef
  public async getFromAuthCode(authCode: string): Promise<void> {

    const response: any = await this.exchangeAuthCode(authCode).toPromise();
    this.accessToken = response.accessToken;
    this.refreshToken = response.refreshToken;
    this.expirationDate = response.expirationDate;

    // console.log('response from service auth func = ' + this.accessToken);
    // console.log('response from service auth func = ' + this.refreshToken);
    // console.log('response from service auth func = ' + this.expirationDate);
  }

  /**
   * extractTokenData
   */
  public extractTokenData(accessToken: any): void {
    // The JWT is base64 encoded. We decode it and extract the infos inside it
    const decoded = jwt.decodeToken(accessToken);
    this.credentialsId = decoded.sub;
    this.expirationDate = decoded.exp;
  }

  /**
   * exchangeAuthCode
   */
  public exchangeAuthCode(code: string): Observable<any> {

    const data = {
      ClientCredentials: this.clientCredentials,
      AccessToken: '',
      RefreshToken: '',
      CredentialsId: this.clientCredentials.clientId,
      ExpirationDate: '',
      ExchangeCode: code
    };

    // Initialize Params Object
    // let params = new HttpParams();
    const url = `${Config.authServerUri}/api/usercredentials`;
    // const url = 'https://localhost:44315/api/usercredentials';

    let headers = new HttpHeaders();
    // headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // console.log(url);
    // console.log(headers.get('Access-Control-Allow-Origin'));

    // Begin assigning parameters
    // params = params.append('grant_type', 'authorization_code');
    // params = params.append('client_id', this.clientCredentials.clientId);
    // params = params.append('client_secret', this.clientCredentials.clientSecret);
    // params = params.append('redirect_uri', this.clientCredentials.redirectUri);
    // params = params.append('code', code);

    // let response: any;
    const urlData = JSON.stringify(data);

    return this.http.post(url, urlData, { headers });

    //   .subscribe(res => {
    //     // console.log('data here' + res);
    //     response = res;
    //     console.log('response = ' + response.accessToken);


    //    },
    //     err => {
    //       console.log('Error here ' + err.message);
    // });

  }


}

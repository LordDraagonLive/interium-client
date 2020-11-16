import * as data from '../../../secrets.json';


export class ClientCredentials {
  public secrets: any = (data as any).default;
  public clientId = this.secrets.client_id;
  public clientSecret = this.secrets.client_secret;
  public redirectUri = this.secrets.redirect_uri;
}

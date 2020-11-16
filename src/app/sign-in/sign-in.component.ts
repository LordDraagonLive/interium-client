import { IdentityService } from './../shared/truelayer/identity.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientCredentials } from '../shared/helpers/client-credentials';
import { UserCredentialsService } from '../shared/truelayer/user-credentials.service';
import { BankProvider } from '../shared/models/bank-provider.model';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  identityService: IdentityService;
  authUri: any;
  bankAccounts: any;
  bankProviders: BankProvider[] = [];
  pageSize = 5;
  // tempList = [];


  constructor(
    private clientCredentials: ClientCredentials,
    private userCreds: UserCredentialsService,
    private identityServices: IdentityService) {

    this.identityService = identityServices;
  }

  ngOnInit(): void {
    this.getAuthLink();
    if (this.userCreds.accessToken != null) {
      this.getAllAccounts().then(
        () => this.getBankProviders()
      );

    }

  }

  getAuthLink(): void {

    // Initialize Params Object
    let params = new HttpParams();
    const url = `https://auth.truelayer-sandbox.com/`;
    // console.log( 'Link: ' + JSON.stringify(this.clientCredentials.secrets) );

    // Begin assigning parameters
    params = params.append('response_type', 'code');
    params = params.append('client_id', this.clientCredentials.clientId);
    // List of permissions https://docs.truelayer.com/#permissions
    params = params.append('scope', 'info cards accounts transactions balance offline_access direct_debits standing_orders products beneficiaries');
    params = params.append('nonce', Date.now().toString());
    params = params.append('redirect_uri', this.clientCredentials.redirectUri);
    params = params.append('enable_mock', 'true');
    params = params.append('enable_open_banking_providers', 'true');
    params = params.append('enable_credentials_sharing_providers', 'false');

    this.authUri = `${url}?${params.toString()}`;
  }

  /**
   * getAllAccounts
   */
  public async getAllAccounts(): Promise<void> {
    this.bankAccounts = await this.identityService.getAccounts().toPromise();

  }

  /**
   * getBankProviders
   */
  public getBankProviders(): any {

    const allBankProviders: BankProvider[] = [];

    // collect all providers
    this.bankAccounts.forEach(bankAccount => {
      allBankProviders.push(bankAccount.provider);
    });

    // remove duplicate providers
    allBankProviders.map(x => this.bankProviders.filter(a => a.provider_id === x.provider_id)
    .length > 0 ? null : this.bankProviders.push(x));

    // this.tempList = this.bankProviders.slice(0, this.pageSize);

    // console.log(this.bankProviders);
    // console.log(this.tempList);

    this.identityService.accounts = this.bankAccounts;
    console.log(this.identityService.accounts);

  }

  // onPageChange(e: any): any {
  //   if (this.userCreds.accessToken != null) {
  //     this.tempList = this.bankProviders.slice(e.pageIndex * e.pageSize, (e.pageIndex + 1) * e.pageSize);
  //   }
  // }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredentialsService } from '../shared/truelayer/user-credentials.service';

@Component({
  templateUrl: './signin-callback.component.html',
  styleUrls: ['./signin-callback.component.css']
})
export class SigninCallbackComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private userCreds: UserCredentialsService,
    private router: Router
    ) {
    this.handleSignInCallBack();
  }

  ngOnInit(): void {
  }

  /**
   * This is the endpoint that we told TrueLayer's AuthDialog to
   * call once the authentication flow is complete.
   * It will provide us with the `code` as a query parameter.
   * We can then exchange this code to get an access token.
   */
  async handleSignInCallBack(): Promise<void>{

    // Accessing query parameters in Flask
    const authorizationCode = this.route.snapshot.queryParams.code;
    // console.log(authorizationCode);

    // We exchange the authorization code with a token
    await this.userCreds.getFromAuthCode(authorizationCode);
    // console.log('The signin-callback response ' + this.userCreds.accessToken);
    this.router.navigate(['/signin']);

  }

}

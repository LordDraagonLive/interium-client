import { IdentityService } from './../shared/truelayer/identity.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../shared/models/Transaction.model';


@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})


export class AccountDetailComponent implements OnInit {
  @Input() accountDetail: any;
  accountBalance: any;
  accountTransactions: any;

  constructor(
    private route: ActivatedRoute,
    private identityService: IdentityService
  ) { }

  ngOnInit(): void {
    this.getAccount();
  }

  /**
   * getAccount
   */
  public getAccount(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const accounts = this.identityService.accounts;
    this.accountDetail = accounts.find(item => item.account_id === id);
    // console.log(this.accountDetail);

  }

  /**
   * getAccountBalance
   */
  public async getAccountBalance(): Promise<void>  {
    this.accountBalance = await this.identityService.getAccountBalance(this.accountDetail.account_id).toPromise();
  }

  /**
   * getAccountTransactions
   */
  public async getAccountTransactions(): Promise<void>  {
    this.accountTransactions = await this.identityService.getAccountTransactions(this.accountDetail.account_id).toPromise();
  }

}

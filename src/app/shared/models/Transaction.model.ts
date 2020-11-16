export class Transaction {
  transactionId: string;
  timestamp: string;
  description: string;
  transactionType: string;
  transactionCategory: string;
  transactionClassification: [string];
  merchantName?: [string];
  amount: number ;
  currency: string;
}


export interface Transaction {
  id: string;
  date: string;
  type: 'Deposit' | 'Fine' | 'Profit' | 'Cost' | 'Withdrawal';
  amount: number;
  description: string;
  userId: string;
  userName: string;
  status: 'Completed' | 'Pending' | 'Rejected';
}

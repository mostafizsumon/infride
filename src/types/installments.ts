export interface Installment {
  id: string;
  shareholderId: string;
  amount: number;
  month: string;
  year: number;
  date: string;
  status: 'Paid' | 'Due';
}

export interface Fine {
  id: string;
  shareholderId: string;
  amount: number;
  reason: string;
  date: string;
  status: 'Paid' | 'Unpaid';
}

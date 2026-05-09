export interface Project {
  id: string;
  name: string;
  details: string;
  investmentAmount: number;
  startDate: string;
  endDate?: string;
  timeline?: string;
  status: 'Running' | 'Completed' | 'Loss' | 'Closed';
  expectedProfit?: number;
  finalSettlement?: number;
  profitLoss?: number;
  documents?: string[];
  images?: string[];
}

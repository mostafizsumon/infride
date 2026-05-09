export interface Shareholder {
  id: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  joiningDate: string;
  status: 'Active' | 'Inactive';
  profileImage?: string;
  totalInstallments?: number;
  totalFine?: number;
  dueAmount?: number;
}

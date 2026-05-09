import { useState } from 'react';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Filter, 
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const transactions = [
  { id: '1', date: '2026-05-08', type: 'Deposit', user: 'Mostafizur Rahman', amount: 5000, status: 'Completed' },
  { id: '2', date: '2026-05-07', type: 'Cost', user: 'Admin', amount: -2500, status: 'Completed', description: 'Office Rent' },
  { id: '3', date: '2026-05-06', type: 'Deposit', user: 'Nuruzzaman', amount: 5000, status: 'Completed' },
  { id: '4', date: '2026-05-05', type: 'Profit', user: 'System', amount: 12000, status: 'Profit', description: 'Textile Project' },
  { id: '5', date: '2026-05-04', type: 'Fine', user: 'Joshim Uddin', amount: 500, status: 'Paid' },
];

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Transaction Ledger</h2>
          <p className="text-slate-500 font-medium">Complete history of all financial activities within the community.</p>
        </div>
        <Button variant="outline" className="rounded-xl border-slate-200 shadow-sm gap-2">
           <Download size={18} />
           Export CSV
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
        <CardHeader className="bg-white pb-6 border-b border-slate-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-3 text-slate-400" size={18} />
              <Input 
                placeholder="Filter transactions..." 
                className="pl-10 h-10 border-slate-200 rounded-xl bg-slate-50/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="ghost" className="rounded-lg gap-2 text-slate-500">
               <Filter size={16} />
               Advanced Filter
            </Button>
          </div>
        </CardHeader>
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-slate-100">
               <TableHead className="font-bold text-xs uppercase text-slate-500 py-4">Transaction ID</TableHead>
               <TableHead className="font-bold text-xs uppercase text-slate-500 py-4">Date</TableHead>
               <TableHead className="font-bold text-xs uppercase text-slate-500 py-4">Type</TableHead>
               <TableHead className="font-bold text-xs uppercase text-slate-500 py-4">User/Entity</TableHead>
               <TableHead className="font-bold text-xs uppercase text-slate-500 py-4 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                <TableCell className="py-4 font-mono text-xs text-slate-400">TXN-{tx.id.padStart(4, '0')}</TableCell>
                <TableCell className="py-4 font-semibold text-slate-600 text-sm">{tx.date}</TableCell>
                <TableCell className="py-4">
                   <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${tx.amount > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                         {tx.amount > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      </div>
                      <span className="font-bold text-slate-700">{tx.type}</span>
                   </div>
                </TableCell>
                <TableCell className="py-4">
                   <p className="font-bold text-slate-900">{tx.user}</p>
                   {tx.description && <p className="text-[10px] text-slate-400 font-medium">{tx.description}</p>}
                </TableCell>
                <TableCell className={`py-4 text-right font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} ৳
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

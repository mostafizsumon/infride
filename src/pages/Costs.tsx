import { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  Search, 
  Calendar as CalendarIcon, 
  Trash2, 
  Edit2, 
  Filter,
  ArrowDownRight,
  Pizza,
  Home,
  Zap,
  ShoppingBag,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const initialCosts = [
  { id: '1', date: '2026-05-01', title: 'Office Stationaries', amount: 1200, category: 'Admin', description: 'Papers, pens and folders' },
  { id: '2', date: '2026-04-28', title: 'Domain & Hosting', amount: 4500, category: 'Tech', description: 'Annual subscription' },
  { id: '3', date: '2026-04-15', title: 'Shareholder Meeting Snacks', amount: 2500, category: 'Entertainment', description: 'Monthly assembly' },
  { id: '4', date: '2026-04-05', title: 'Bank Service Charge', amount: 230, category: 'Finance', description: 'Standard maintenance' },
];

const categoryIcons: any = {
  Admin: <Zap size={14} />,
  Tech: <ShoppingBag size={14} />,
  Entertainment: <Pizza size={14} />,
  Finance: <Receipt size={14} />,
  Default: <Home size={14} />
};

export default function Costs() {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCosts = initialCosts.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Financial Expenses</h2>
          <p className="text-slate-500 font-medium">Detailed tracking of all operational and community costs.</p>
        </div>
        {user?.role === 'Admin' && (
          <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2">
            <Plus size={18} />
            Record Expense
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-3xl bg-white p-6 flex flex-col justify-between">
           <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl w-fit mb-4"><ArrowDownRight size={24} /></div>
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total cost this month</p>
             <p className="text-3xl font-black text-slate-900">৳ 8,430</p>
           </div>
        </Card>
        <Card className="border-none shadow-sm rounded-3xl bg-white p-6 flex flex-col justify-between">
           <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-4"><Receipt size={24} /></div>
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Uncategorized</p>
             <p className="text-3xl font-black text-slate-900">0 Items</p>
           </div>
        </Card>
        <Card className="border-none shadow-sm rounded-3xl bg-white p-6 flex flex-col justify-between">
           <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit mb-4"><Filter size={24} /></div>
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Highest Category</p>
             <p className="text-3xl font-black text-emerald-600">Administrative</p>
           </div>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
        <CardHeader className="bg-white pb-6 border-b border-slate-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <CardTitle className="text-xl font-bold tracking-tight">Expense Ledger</CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-3 text-slate-400" size={18} />
              <Input 
                placeholder="Search expenses..." 
                className="pl-10 h-10 border-slate-200 rounded-xl bg-slate-50/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-slate-100">
              <TableHead className="font-bold text-xs uppercase text-slate-500 py-4">Date</TableHead>
              <TableHead className="font-bold text-xs uppercase text-slate-500 py-4">Particulars</TableHead>
              <TableHead className="font-bold text-xs uppercase text-slate-500 py-4">Category</TableHead>
              <TableHead className="font-bold text-xs uppercase text-slate-500 py-4 text-right">Amount</TableHead>
              <TableHead className="font-bold text-xs uppercase text-slate-500 py-4 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCosts.map((cost) => (
              <TableRow key={cost.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                <TableCell className="py-4">
                  <div className="flex items-center gap-2 font-semibold text-slate-600 text-sm">
                    <CalendarIcon size={14} className="text-slate-400" />
                    {cost.date}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                   <div>
                     <p className="font-bold text-slate-900">{cost.title}</p>
                     <p className="text-xs text-slate-400 font-medium">{cost.description}</p>
                   </div>
                </TableCell>
                <TableCell className="py-4">
                  <Badge variant="outline" className="rounded-lg gap-1 border-slate-200 text-slate-600 bg-slate-50">
                    {categoryIcons[cost.category] || categoryIcons.Default}
                    {cost.category}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-right font-black text-rose-600">৳ {cost.amount.toLocaleString()}</TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center justify-center gap-1">
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                       <Edit2 size={16} />
                     </Button>
                     {user?.role === 'Admin' && (
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600">
                         <Trash2 size={16} />
                       </Button>
                     )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredCosts.length === 0 && (
          <div className="p-12 text-center text-slate-400 font-bold italic">
             No expense records found matching your search.
          </div>
        )}
      </Card>
    </div>
  );
}

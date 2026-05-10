import { useState, useEffect } from 'react';
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
  MoreHorizontal,
  Loader2
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { costService } from '@/services/costs';
import { Cost } from '@/types';
import { toast } from 'sonner';

const categoryIcons: any = {
  Admin: <Zap size={14} />,
  Tech: <ShoppingBag size={14} />,
  Entertainment: <Pizza size={14} />,
  Finance: <Receipt size={14} />,
  Default: <Home size={14} />
};

export default function Costs() {
  const { user } = useAuthStore();
  const [costs, setCosts] = useState<Cost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCost, setNewCost] = useState({
    title: '',
    amount: 0,
    category: 'Admin',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadCosts();
  }, []);

  const loadCosts = async () => {
    setLoading(true);
    try {
      const data = await costService.getAll();
      setCosts(data);
    } catch (error) {
      toast.error("Failed to load costs");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await costService.create(newCost);
      toast.success("Expense recorded successfully");
      setIsCreateOpen(false);
      loadCosts();
      setNewCost({
        title: '',
        amount: 0,
        category: 'Admin',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      toast.error("Failed to record expense");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    try {
      await costService.delete(id);
      toast.success("Expense deleted");
      loadCosts();
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  const filteredCosts = costs.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCost = costs.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Financial Expenses</h2>
          <p className="text-slate-500 font-medium">Detailed tracking of all operational and community costs.</p>
        </div>
        {user?.role === 'Admin' && (
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2">
                <Plus size={18} />
                Record Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-3xl">
              <DialogHeader>
                <DialogTitle>Record New Expense</DialogTitle>
                <DialogDescription>
                  Enter the details of the expenditure.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Particulars</Label>
                  <Input id="title" value={newCost.title} onChange={e => setNewCost({...newCost, title: e.target.value})} required placeholder="e.g. Office Supplies" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (৳)</Label>
                    <Input id="amount" type="number" value={newCost.amount} onChange={e => setNewCost({...newCost, amount: Number(e.target.value)})} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={newCost.category} onValueChange={v => setNewCost({...newCost, category: v})}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Tech">Tech</SelectItem>
                        <SelectItem value="Entertainment">Entertainment</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Description</Label>
                  <Input id="desc" value={newCost.description} onChange={e => setNewCost({...newCost, description: e.target.value})} placeholder="Optional notes..." />
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full">Save Expense</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-3xl bg-white p-6 flex flex-col justify-between">
           <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl w-fit mb-4"><ArrowDownRight size={24} /></div>
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total cost recorded</p>
             <p className="text-3xl font-black text-slate-900">৳ {totalCost.toLocaleString()}</p>
           </div>
        </Card>
        <Card className="border-none shadow-sm rounded-3xl bg-white p-6 flex flex-col justify-between">
           <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-4"><Receipt size={24} /></div>
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transactions</p>
             <p className="text-3xl font-black text-slate-900">{costs.length} Entries</p>
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
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="animate-spin mx-auto text-primary" size={32} />
          </div>
        ) : (
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
                  <TableCell className="py-4 text-right font-black text-rose-600">৳ {(cost.amount || 0).toLocaleString()}</TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center justify-center gap-1">
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                         <Edit2 size={16} />
                       </Button>
                       {user?.role === 'Admin' && (
                         <Button onClick={() => cost?.id && handleDelete(cost.id)} variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600">
                           <Trash2 size={16} />
                         </Button>
                       )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {!loading && filteredCosts.length === 0 && (
          <div className="p-12 text-center text-slate-400 font-bold italic">
             No expense records found matching your search.
          </div>
        )}
      </Card>
    </div>
  );
}

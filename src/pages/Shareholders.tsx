import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar as CalendarIcon,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  FileText,
  UserPlus,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
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
import { useAuthStore } from '@/store/useAuthStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { shareholderService } from '@/services/shareholders';
import { Shareholder } from '@/types';
import { toast } from 'sonner';

export default function Shareholders() {
  const { user } = useAuthStore();
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedUser, setSelectedUser] = useState<Shareholder | null>(null);
  
  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newShareholder, setNewShareholder] = useState({
    fullName: '',
    phone: '',
    joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    status: 'Active' as const,
    totalPaid: 0,
    due: 0
  });

  useEffect(() => {
    loadShareholders();
  }, []);

  const loadShareholders = async () => {
    setLoading(true);
    try {
      const data = await shareholderService.getAll();
      setShareholders(data);
    } catch (error) {
      toast.error("Failed to load shareholders");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await shareholderService.create(newShareholder);
      toast.success("Shareholder added successfully");
      setIsCreateOpen(false);
      loadShareholders();
      setNewShareholder({
        fullName: '',
        phone: '',
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        status: 'Active',
        totalPaid: 0,
        due: 0
      });
    } catch (error) {
      toast.error("Failed to add shareholder");
    }
  };

  const filteredShareholders = shareholders.filter(s => {
    const matchesSearch = s.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || s.status.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Community Shareholders</h2>
          <p className="text-slate-500 font-medium">Manage and view all shareholder profiles and history.</p>
        </div>
        {user?.role === 'Admin' && (
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2">
                <UserPlus size={18} />
                Add Shareholder
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
              <DialogHeader>
                <DialogTitle>Add New Shareholder</DialogTitle>
                <DialogDescription>
                  Enter the details of the new shareholder below.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={newShareholder.fullName} 
                    onChange={e => setNewShareholder({...newShareholder, fullName: e.target.value})} 
                    placeholder="Mostafizur Rahman" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={newShareholder.phone} 
                    onChange={e => setNewShareholder({...newShareholder, phone: e.target.value})} 
                    placeholder="017xxxx" 
                    required 
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full">Create Shareholder</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: List & Filters */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
             <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                <Input 
                  placeholder="Search by name..." 
                  className="pl-10 h-10 bg-white border-slate-200 rounded-xl focus:ring-primary shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             
             <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100/50 p-1 rounded-xl h-10 border border-slate-100">
                  <TabsTrigger value="all" className="rounded-lg px-4 font-bold text-xs uppercase tracking-wider">All</TabsTrigger>
                  <TabsTrigger value="active" className="rounded-lg px-4 font-bold text-xs uppercase tracking-wider">Active</TabsTrigger>
                  <TabsTrigger value="inactive" className="rounded-lg px-4 font-bold text-xs uppercase tracking-wider">Inactive</TabsTrigger>
                </TabsList>
             </Tabs>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredShareholders.map((s) => (
                  <motion.div
                    key={s.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -4 }}
                    className={`
                      group bg-white p-6 rounded-3xl border transition-all cursor-pointer shadow-sm
                      ${selectedUser?.id === s.id ? 'border-primary ring-1 ring-primary/20 shadow-xl' : 'border-slate-100 hover:shadow-lg'}
                    `}
                    onClick={() => setSelectedUser(s)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <Avatar className="w-14 h-14 rounded-2xl border-2 border-white shadow-sm">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.fullName}`} />
                        <AvatarFallback>{s.fullName[0]}</AvatarFallback>
                      </Avatar>
                      <DropdownMenu>
                        <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full -mr-2")}>
                          <MoreVertical size={18} className="text-slate-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl">
                          <DropdownMenuItem className="rounded-lg font-bold">Edit Profile</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg font-bold">Financial Logs</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="rounded-lg font-bold text-rose-600">Disable Access</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="space-y-1 mb-6">
                      <h4 className="font-black text-lg text-slate-900 tracking-tight leading-tight">{s.fullName}</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.joinDate}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Total Paid</p>
                        <p className="text-md font-black text-emerald-600">৳ {(s.totalPaid || 0).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Due Amount</p>
                        <p className={`text-md font-black ${(s.due || 0) > 0 ? 'text-rose-600' : 'text-slate-400'}`}>৳ {(s.due || 0).toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredShareholders.length === 0 && (
                <div className="col-span-full py-12 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
                   <Users className="mx-auto mb-2 opacity-20" size={48} />
                   <p className="font-bold">No shareholders found.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Detailed View */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedUser ? (
              <motion.div
                key={selectedUser.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="sticky top-8 space-y-6"
              >
                <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl bg-white overflow-hidden">
                  <div className="h-24 bg-gradient-to-br from-primary to-indigo-600 relative">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="absolute top-4 right-4 rounded-full w-8 h-8 opacity-50 hover:opacity-100"
                      onClick={() => setSelectedUser(null)}
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                  <CardContent className="px-6 pb-8 -mt-12 text-center relative z-10">
                    <Avatar className="w-24 h-24 rounded-3xl border-4 border-white shadow-xl mx-auto mb-4 bg-white">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.fullName}`} />
                      <AvatarFallback className="text-2xl font-black">{selectedUser.fullName[0]}</AvatarFallback>
                    </Avatar>
                    
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{selectedUser.fullName}</h3>
                    <Badge className="mt-2 rounded-lg py-1 px-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none">Active Shareholder</Badge>

                    <div className="grid grid-cols-1 gap-4 mt-8 text-left">
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <Phone size={16} className="text-primary" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone</p>
                          <p className="text-sm font-bold text-slate-700">{selectedUser.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <CalendarIcon size={16} className="text-primary" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member Since</p>
                          <p className="text-sm font-bold text-slate-700">{selectedUser.joinDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      <div className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp size={16} className="text-emerald-500" />
                          <span className="text-sm font-bold text-slate-600">Total Profits</span>
                        </div>
                        <span className="text-sm font-black text-emerald-600">৳ 0</span>
                      </div>
                      <div className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle size={16} className="text-rose-500" />
                          <span className="text-sm font-bold text-slate-600">Fine History</span>
                        </div>
                        <span className="text-sm font-black text-rose-600">৳ 0</span>
                      </div>
                    </div>

                    <Button className="w-full mt-8 h-12 rounded-xl shadow-lg shadow-primary/20 gap-2 font-bold">
                       <FileText size={18} />
                       Full Statement
                    </Button>
                  </CardContent>
                </Card>
                
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="rounded-xl border-slate-100 h-10 text-xs font-bold bg-slate-50/50">Record Pay</Button>
                    <Button variant="outline" className="rounded-xl border-slate-100 h-10 text-xs font-bold bg-slate-50/50">Add Fine</Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white/50 border-2 border-dashed border-slate-200 rounded-[32px] text-slate-400">
                <Users size={48} className="mb-4 opacity-20" />
                <p className="font-bold text-sm">Select a shareholder to view detailed financial insights and history.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

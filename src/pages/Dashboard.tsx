import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  AlertCircle,
  FileText
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';

const data = [
  { name: 'Jan', collection: 45000, profit: 5000 },
  { name: 'Feb', collection: 45000, profit: 8000 },
  { name: 'Mar', collection: 45000, profit: 12000 },
  { name: 'Apr', collection: 45000, profit: 7000 },
  { name: 'May', collection: 45000, profit: 15000 },
];

const StatCard = ({ title, value, icon: Icon, change, trend, subtitle }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-primary/5 rounded-2xl text-primary">
        <Icon size={24} />
      </div>
      {change && (
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}%
        </div>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-black text-slate-900 tracking-tight">৳ {value.toLocaleString()}</h3>
      {subtitle && <p className="text-[10px] text-slate-400 font-medium">{subtitle}</p>}
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Assalamu Alaikum, {user?.fullName.split(' ')[0]} 👋
          </h2>
          <p className="text-slate-500 font-medium">Here's your community investment overview for today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl border-slate-200 shadow-sm gap-2">
            <FileText size={18} />
            Export Report
          </Button>
          {user?.role === 'Admin' && (
            <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2">
              <Clock size={18} />
              Add Entry
            </Button>
          )}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Fund" value={450000} icon={Wallet} change={12} trend="up" subtitle="Total collected across all time" />
        <StatCard title="Project Investment" value={320000} icon={Briefcase} change={5} trend="up" subtitle="Currently locked in active projects" />
        <StatCard title="Total Profit" value={45000} icon={TrendingUp} change={8} trend="up" subtitle="Net profit distributed to users" />
        <StatCard title="Active Shareholders" value={9} icon={Users} subtitle="Verified members with active status" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl bg-white overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight">Monthly Collections & Profit</CardTitle>
            <CardDescription className="text-sm font-medium">Visualizing financial growth over the last 5 months</CardDescription>
          </CardHeader>
          <CardContent className="p-4 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorColl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="collection" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorColl)" />
                <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Small detail cards */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">Due Amount Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-rose-50 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                      <AlertCircle size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-rose-600 uppercase tracking-wider">Total Due</p>
                      <p className="text-xl font-black text-slate-900 tracking-tight">৳ 15,000</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-white text-rose-600 border-rose-200">3 Members</Badge>
                </div>
                
                <div className="space-y-3 pt-2">
                  {[
                    { name: 'Joshim Uddin', amount: 5000 },
                    { name: 'Tuhin Alam', amount: 5000 },
                    { name: 'Rasel Haider', amount: 5000 },
                  ].map((item) => (
                    <div key={item.name} className="flex justify-between items-center p-2 border-b border-slate-50 last:border-0">
                      <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                      <span className="text-sm font-black text-rose-600">৳ {item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 bg-white/10 w-32 h-32 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-100 mb-4 italic">Next Meeting</h4>
            <p className="text-2xl font-black tracking-tight mb-2 leading-tight">Investment Strategy Review 2026</p>
            <div className="flex items-center gap-2 text-indigo-100 text-sm font-medium">
              <Clock size={16} />
              May 15, 2026 • 04:00 PM
            </div>
            <Button variant="secondary" className="w-full mt-6 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 border-none">
              View Agenda
            </Button>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions placeholder */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold tracking-tight">Community Notices</CardTitle>
                <CardDescription className="text-sm font-medium">Official updates from management</CardDescription>
              </div>
              <Button variant="ghost" className="text-primary font-bold">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { date: 'May 05', text: 'New project "Green Valley Agri" investment phase started.', label: 'Project' },
                { date: 'Apr 30', text: 'Monthly deposit for May is now due. Please pay by 10th.', label: 'Billing' },
                { date: 'Apr 25', text: 'Annual profit distribution completed for Q1 2026.', label: 'Finance' },
              ].map((notice, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex flex-col items-center justify-center bg-slate-100 min-w-[50px] h-[50px] rounded-xl text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400">{notice.date.split(' ')[0]}</span>
                    <span className="text-lg font-black text-slate-700 leading-none">{notice.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-primary mb-1 inline-block">{notice.label}</span>
                    <p className="text-sm font-semibold text-slate-700 leading-snug">{notice.text}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold tracking-tight">Recent Transactions</CardTitle>
                <CardDescription className="text-sm font-medium">Latest ledger entries</CardDescription>
              </div>
              <Button variant="ghost" className="text-primary font-bold">Details</Button>
            </CardHeader>
            <CardContent className="space-y-4">
               {[
                 { user: 'Mostafizur Rahman', type: 'Deposit', amount: 5000, date: 'Today', status: 'Completed' },
                 { user: 'Admin', type: 'Office Rent', amount: -2500, date: 'Yesterday', status: 'Cost' },
                 { user: 'Nuruzzaman', type: 'Deposit', amount: 5000, date: '2 days ago', status: 'Completed' },
                 { user: 'System', type: 'Project Profit', amount: 12000, date: '3 days ago', status: 'Profit' },
               ].map((tx, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.amount > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                        {tx.amount > 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{tx.type} - {tx.user}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.date}</p>
                      </div>
                    </div>
                    <p className={`text-md font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} ৳
                    </p>
                 </div>
               ))}
            </CardContent>
          </Card>
       </div>
    </div>
  );
}

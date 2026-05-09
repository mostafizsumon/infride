import { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  MoreVertical,
  Calendar,
  ExternalLink,
  Target,
  IndianRupee,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const initialProjects = [
  { 
    id: '1', 
    name: 'Green Valley Agriculture', 
    description: 'Investment in seasonal organic vegetable production and distribution.',
    investment: 150000, 
    status: 'Running',
    startDate: '2026-03-10',
    timeline: '6 Months',
    expectedProfit: 25000,
    progress: 45
  },
  { 
    id: '2', 
    name: 'Main Town Commerical Plot', 
    description: 'A joint venture in purchasing a commercial land plot for future resale.',
    investment: 500000, 
    status: 'Running',
    startDate: '2026-01-15',
    timeline: '24 Months',
    expectedProfit: 120000,
    progress: 15
  },
  { 
    id: '3', 
    name: 'Textile Export Phase 1', 
    description: 'Bulk purchase and international shipping of high-quality local garments.',
    investment: 80000, 
    status: 'Completed',
    startDate: '2025-11-20',
    endDate: '2026-02-10',
    profit: 15000,
    progress: 100
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'Running':
      return <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-50 border-none font-bold py-1 px-3">Running</Badge>;
    case 'Completed':
      return <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none font-bold py-1 px-3">Completed</Badge>;
    case 'Loss':
      return <Badge className="bg-rose-50 text-rose-600 hover:bg-rose-50 border-none font-bold py-1 px-3">Loss</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Projects() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Projects</h2>
          <p className="text-slate-500 font-medium">Tracking community investments and their performance.</p>
        </div>
        {user?.role === 'Admin' && (
          <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2">
            <Plus size={18} />
            Initialize Project
          </Button>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Briefcase size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Projects</p>
            <p className="text-xl font-black text-slate-900">12</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><TrendingUp size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Profit Margin</p>
            <p className="text-xl font-black text-slate-900">18.5%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Activity size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Invested</p>
            <p className="text-xl font-black text-slate-900">৳ 8.5M</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-2xl"><Target size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Goals Achieved</p>
            <p className="text-xl font-black text-slate-900">85%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {initialProjects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -5 }}
            className="group bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all overflow-hidden flex flex-col"
          >
             <div className="p-8">
               <div className="flex justify-between items-start mb-6">
                 <StatusBadge status={project.status} />
                 <DropdownMenu>
                    <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}>
                       <MoreVertical size={18} className="text-slate-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl">
                      <DropdownMenuItem className="rounded-lg font-bold">Project Details</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg font-bold">Edit Timeline</DropdownMenuItem>
                      {user?.role === 'Admin' && (
                        <>
                          <DropdownMenuItem className="rounded-lg font-bold">Update Profit/Loss</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg font-bold text-rose-600">Close Project</DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
               </div>

               <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-2 group-hover:text-primary transition-colors">
                 {project.name}
               </h3>
               <p className="text-sm font-medium text-slate-500 line-clamp-2 mb-6">
                 {project.description}
               </p>

               <div className="space-y-4 pt-4 border-t border-slate-50">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Investment</span>
                    <span className="text-slate-900 font-black">৳ {project.investment.toLocaleString()}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Timeline Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2 rounded-full bg-slate-100" />
                  </div>
               </div>
             </div>

             <div className="mt-auto bg-slate-50/50 p-6 flex items-center justify-between border-t border-slate-50">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                  <Calendar size={14} />
                  <span>{project.startDate}</span>
                </div>
                <Button variant="ghost" className="text-primary font-bold text-xs gap-1 h-8 rounded-lg hover:bg-white border border-transparent hover:border-slate-100 transition-all">
                  Full Analytics
                  <ExternalLink size={12} />
                </Button>
             </div>
          </motion.div>
        ))}

        {/* Add Project Card */}
         {user?.role === 'Admin' && (
           <motion.div
            whileHover={{ y: -5 }}
            className="flex flex-col items-center justify-center p-8 rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50/20 text-slate-400 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all gap-4"
           >
              <div className="w-16 h-16 rounded-3xl bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                <Plus size={32} />
              </div>
              <div className="text-center">
                <h4 className="text-lg font-black text-slate-600">New Venture</h4>
                <p className="text-xs font-medium">Click to initialize a new investment project.</p>
              </div>
           </motion.div>
         )}
      </div>
    </div>
  );
}

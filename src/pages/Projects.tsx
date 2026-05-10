import { useState, useEffect } from 'react';
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
  Activity,
  Loader2
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
import { Input } from "@/components/ui/input";
import { projectService } from '@/services/projects';
import { Project } from '@/types';
import { toast } from 'sonner';

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    investmentAmount: 0,
    status: 'Running' as const,
    startDate: new Date().toISOString().split('T')[0],
    progress: 0
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await projectService.create(newProject);
      toast.success("Project initialized successfully");
      setIsCreateOpen(false);
      loadProjects();
      setNewProject({
        name: '',
        description: '',
        investmentAmount: 0,
        status: 'Running',
        startDate: new Date().toISOString().split('T')[0],
        progress: 0
      });
    } catch (error) {
      toast.error("Failed to initialize project");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Projects</h2>
          <p className="text-slate-500 font-medium">Tracking community investments and their performance.</p>
        </div>
        {user?.role === 'Admin' && (
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2">
                <Plus size={18} />
                Initialize Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-3xl">
              <DialogHeader>
                <DialogTitle>Initialize New Project</DialogTitle>
                <DialogDescription>
                  Define the core parameters of this community venture.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="pname">Project Name</Label>
                  <Input id="pname" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} required placeholder="e.g. Textile Export Phase 2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Short Description</Label>
                  <Input id="desc" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} placeholder="Brief overview of the project..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invest">Investment Amount (৳)</Label>
                  <Input id="invest" type="number" value={newProject.investmentAmount} onChange={e => setNewProject({...newProject, investmentAmount: Number(e.target.value)})} required />
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full">Start Project</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {loading ? (
         <div className="flex items-center justify-center h-64">
           <Loader2 className="animate-spin text-primary" size={32} />
         </div>
      ) : (
        <>
          {/* Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Briefcase size={24} /></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Projects</p>
                <p className="text-xl font-black text-slate-900">{projects.length}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
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
                        <span className="text-slate-900 font-black">৳ {(project.investmentAmount || 0).toLocaleString()}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                          <span>Timeline Progress</span>
                          <span>{project.progress || 0}%</span>
                        </div>
                        <Progress value={project.progress || 0} className="h-2 rounded-full bg-slate-100" />
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
               <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                 <DialogTrigger asChild>
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
                 </DialogTrigger>
               </Dialog>
             )}
          </div>
        </>
      )}
    </div>
  );
}

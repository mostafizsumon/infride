import { 
  Settings as SettingsIcon, 
  Upload, 
  Palette, 
  Database, 
  FileJson, 
  ShieldAlert, 
  Save,
  Globe,
  BellRing
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useSettingsStore } from '@/store/useSettingsStore';
import { toast } from 'sonner';

export default function Settings() {
  const { settings, setSettings } = useSettingsStore();

  const handleSave = () => {
    toast.success('App settings updated successfully');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Settings</h2>
          <p className="text-slate-500 font-medium">Control and customize the INFRIDE platform.</p>
        </div>
        <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2 h-12 px-8 font-bold" onClick={handleSave}>
          <Save size={18} />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <Globe className="text-primary" />
                <CardTitle className="text-xl font-bold tracking-tight">General Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">App Name</Label>
                   <Input 
                    value={settings.appName} 
                    onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
                    className="h-12 rounded-xl bg-slate-50 border-slate-100 px-4"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Slogan</Label>
                   <Input 
                    value={settings.slogan} 
                    onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
                    className="h-12 rounded-xl bg-slate-50 border-slate-100 px-4"
                   />
                 </div>
              </div>

              <div className="space-y-4 pt-4">
                 <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Company Logo</Label>
                 <div className="flex items-center gap-6 p-6 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary font-bold border border-slate-100">
                       <Upload />
                    </div>
                    <div>
                      <Button variant="outline" className="rounded-lg h-8 px-4 text-xs font-bold border-slate-200">Change Logo</Button>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium">Recommended size: 200x200px. formats: PNG, SVG.</p>
                    </div>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <BellRing className="text-primary" />
                <CardTitle className="text-xl font-bold tracking-tight">Notifications & Interaction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between p-2">
                <div>
                  <h5 className="font-bold text-slate-700">Push Notifications</h5>
                  <p className="text-xs font-medium text-slate-400">Receive alerts on new projects and deposits.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-slate-50" />
              <div className="flex items-center justify-between p-2">
                <div>
                  <h5 className="font-bold text-slate-700">Audit Logs</h5>
                  <p className="text-xs font-medium text-slate-400">Keep a recording of every administrative change.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
           <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 p-6 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <Database className="text-rose-500" />
                <CardTitle className="text-lg font-bold tracking-tight">Maintenance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
               <Button variant="outline" className="w-full h-12 rounded-xl border-slate-100 bg-slate-50/50 font-bold gap-2 text-slate-600">
                 <FileJson size={18} />
                 Backup Database
               </Button>
               <Button variant="outline" className="w-full h-12 rounded-xl border-slate-100 bg-slate-50/50 font-bold gap-2 text-slate-600">
                 <Upload size={18} />
                 Import CSV Data
               </Button>
               
               <div className="pt-6">
                  <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
                    <div className="flex items-center gap-2 text-rose-600 mb-2">
                      <ShieldAlert size={16} />
                      <span className="text-xs font-black uppercase tracking-wider">Danger Zone</span>
                    </div>
                    <Button variant="ghost" className="w-full h-10 rounded-lg text-rose-600 hover:text-white hover:bg-rose-600 font-bold text-xs uppercase tracking-widest">
                       Reset All Data
                    </Button>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden p-8 text-center bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Palette size={24} className="text-indigo-200" />
             </div>
             <h4 className="text-lg font-black tracking-tight mb-2">Custom Theme</h4>
             <p className="text-xs font-medium text-slate-300 mb-6">Experience INFRIDE in a different light. Multi-theme support arriving soon.</p>
             <Badge className="bg-white/10 text-white border-white/20 px-4 py-1">Coming Q3 2026</Badge>
          </Card>
        </div>
      </div>
    </div>
  );
}

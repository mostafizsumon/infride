import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Receipt, 
  ScrollText, 
  Settings, 
  LogOut,
  Menu,
  X,
  CreditCard
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { useSettingsStore } from '@/store/useSettingsStore';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, setUser } = useAuthStore();
  const { settings } = useSettingsStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Shareholders', path: '/shareholders', icon: Users },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Costs', path: '/costs', icon: Receipt },
    { name: 'Policies', path: '/policies', icon: ScrollText },
    { name: 'Transactions', path: '/transactions', icon: CreditCard },
  ];

  if (user?.role === 'Admin') {
    menuItems.push({ name: 'Settings', path: '/settings', icon: Settings });
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-bottom shadow-sm">
        <div className="flex items-center gap-2">
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt="Logo" className="w-8 h-8 rounded" />
          ) : (
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">
              I
            </div>
          )}
          <span className="font-bold text-lg">{settings.appName}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || true) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className={`
              fixed md:relative z-40 w-64 h-full bg-white border-r border-slate-200 flex flex-col
              ${isSidebarOpen ? 'block' : 'hidden md:flex'}
            `}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                {settings.logoUrl ? (
                  <img src={settings.logoUrl} alt="Logo" className="w-10 h-10 rounded shadow-sm" />
                ) : (
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                    I
                  </div>
                )}
                <div>
                  <h1 className="font-bold text-xl tracking-tight leading-none">{settings.appName}</h1>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold tracking-wider">{settings.slogan}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive 
                        ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-primary'}
                    `}
                  >
                    <item.icon size={20} />
                    <span className="font-medium text-sm">{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="mt-auto p-4 border-t border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3 p-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="User" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold bg-slate-100">
                      {user?.fullName?.[0] || 'U'}
                    </div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate text-slate-900">{user?.fullName || 'Guest User'}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.role || 'Viewer'}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full gap-2 rounded-xl border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
          {children}
        </div>
      </main>
    </div>
  );
}

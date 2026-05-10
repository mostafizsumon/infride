import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/useAuthStore';
import { UserRole } from '@/types';
import { Lock, Mail, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Fetch user profile from Firestore
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          fullName: userData.fullName || 'User',
          role: userData.role as UserRole || UserRole.USER,
          photoURL: firebaseUser.photoURL || undefined
        });
        toast.success(`Welcome back, ${userData.fullName || 'User'}!`);
      } else {
        // Fallback: Create a basic user doc if it doesn't exist
        const newUserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          fullName: firebaseUser.displayName || email.split('@')[0],
          role: UserRole.USER,
        };
        
        await setDoc(userDocRef, newUserProfile);
        setUser(newUserProfile);
        toast.success('Welcome! Your profile has been initialized.');
      }
      
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      let message = 'Invalid credentials. Please try again.';
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        message = 'Invalid email or password.';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many failed login attempts. Please try again later.';
      }
      
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30 rotate-3">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 italic">INFRIDE</h1>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">Transparent Community Investment</p>
          </div>
        </div>

        <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">
          <CardHeader className="bg-white pb-2 pt-8">
            <CardTitle className="text-2xl font-bold text-slate-900">Sign In</CardTitle>
            <CardDescription className="text-slate-500">Access your investment dashboard</CardDescription>
          </CardHeader>
          <CardContent className="bg-white p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2 text-left">
                <Label htmlFor="email" className="text-xs font-bold text-slate-600 uppercase tracking-wider px-1">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10 h-12 bg-slate-50 border-slate-100 rounded-xl focus:ring-primary focus:ring-offset-0"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 text-left">
                <Label htmlFor="password" className="text-xs font-bold text-slate-600 uppercase tracking-wider px-1">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-12 bg-slate-50 border-slate-100 rounded-xl focus:ring-primary focus:ring-offset-0"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl text-md font-bold shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Unlock Dashboard'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="bg-slate-50 border-t border-slate-100 p-6 flex flex-col gap-4">
            <div className="text-xs text-slate-400 text-center">
               Please use your registered email and password to sign in.
            </div>
          </CardFooter>
        </Card>
        
        <p className="text-xs text-slate-400">© 2026 INFRIDE Systems. All rights reserved.</p>
      </div>
    </div>
  );
}

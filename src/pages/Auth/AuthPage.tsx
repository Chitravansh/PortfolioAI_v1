import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/Auth';

interface AuthPageProps {
  onAuth: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuth }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await login({ email });
      onAuth();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/auth/${provider.toLowerCase()}/url`);
      const { url } = await response.json();

      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      window.open(
        url,
        `${provider} Login`,
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // We will rely on AuthContext's message listener to update the user state.
      // And we poll the AuthContext to see if user is set, or just let App.tsx handle the redirect to dashboard.
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 bg-primary p-20 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={32} />
            <h2 className="text-2xl font-bold">PortfoliAI</h2>
          </div>
        </div>
        <div className="z-10 space-y-6">
          <h1 className="text-6xl font-black leading-tight">Turn your resume into a stunning portfolio in seconds.</h1>
          <p className="text-xl text-white/80 max-w-md">Join over 50,000 professionals showcasing their work with AI-powered digital identities.</p>
        </div>
        <div className="z-10 flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="size-10 rounded-full border-2 border-primary bg-slate-200 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
              </div>
            ))}
          </div>
          <p className="text-sm font-medium">Trusted by top designers</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="text-slate-500">Please enter your details to sign in.</p>
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="w-full h-12" onClick={() => handleSocialLogin('Google')}>Continue with Google</Button>
            <Button variant="outline" className="w-full h-12" onClick={() => handleSocialLogin('GitHub')}>Continue with GitHub</Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-slate-500">Or continue with email</span></div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border-border bg-card px-4 py-3 focus:ring-primary focus:border-primary text-foreground"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-semibold">Password</label>
                <a href="#" className="text-xs font-bold text-primary">Forgot password?</a>
              </div>
              <input type="password" placeholder="••••••••" className="w-full rounded-xl border-border bg-card px-4 py-3 focus:ring-primary focus:border-primary text-foreground" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded text-primary focus:ring-primary" />
              <label htmlFor="remember" className="text-sm text-slate-500">Remember me for 30 days</label>
            </div>
            <Button className="w-full h-12" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in to your account'}
            </Button>
          </form>
          <p className="text-center text-sm text-slate-500">
            Don't have an account? <a href="#" className="font-bold text-primary">Start for free</a>
          </p>
        </div>
      </div>
    </div>
  );
};

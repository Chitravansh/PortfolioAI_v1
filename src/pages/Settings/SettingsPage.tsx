import React, { useState, useEffect } from 'react';
import { Camera, Save, User as UserIcon, Lock, Mail, Check, X, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/Auth';
import { Button } from '../../components/ui/Button';
import { cn } from "../../lib/utils";
 
export const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [emailStatus, setEmailStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  // Load existing user data into the form when the component mounts
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setProfilePicture(user.profilePicture || '');
    }
  }, [user]);

  // Real-time Email Availability Checker
  useEffect(() => {
    // Don't check if the field is empty, invalid, or if it's their current email
    if (!email || !user || email === user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailStatus('idle');
      return;
    }

    setEmailStatus('checking');

    // Wait 500ms after the user stops typing to ask the backend
    const timer = setTimeout(async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/user/check-email/${encodeURIComponent(email)}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        setEmailStatus(data.available ? 'available' : 'taken');
      } catch (error) {
        setEmailStatus('idle');
      }
    }, 500);

    // Cleanup the timer if the user types again before 500ms is up
    return () => clearTimeout(timer);
  }, [email, user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          profilePicture,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      // Update the global auth state instantly
      updateUser(data.user, data.token);
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Clear password fields after successful update
      setCurrentPassword('');
      setNewPassword('');

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div>
        <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your profile, email address, and security preferences.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-card p-8 rounded-2xl border border-border shadow-sm">
        
        {/* Profile Picture Section */}
        <div className="flex items-center gap-6 pb-8 border-b border-border">
          <label className="relative cursor-pointer group shrink-0">
            <div className="size-24 rounded-full border border-border flex items-center justify-center bg-slate-100 dark:bg-slate-800 overflow-hidden">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <UserIcon className="text-slate-400 size-8" />
              )}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white size-6" />
            </div>
          </label>
          <div>
            <h3 className="font-semibold text-foreground">Profile Picture</h3>
            <p className="text-sm text-muted-foreground">Click the avatar to upload a new image. (Max 2MB)</p>
          </div>
        </div>

        {/* Basic Info Section */}
        <div className="space-y-4 pb-8 border-b border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <UserIcon size={18} /> Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:ring-primary focus:border-primary text-foreground outline-none"
                required
              />
            </div>
            {/* <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 focus:ring-primary focus:border-primary text-foreground outline-none"
                  required
                />
              </div>
            </div> */}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "w-full rounded-xl border bg-background pl-10 pr-10 py-3 outline-none transition-colors",
                    emailStatus === 'taken' ? "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-600" :
                    emailStatus === 'available' ? "border-green-500 focus:ring-green-500 focus:border-green-500" :
                    "border-border focus:ring-primary focus:border-primary text-foreground"
                  )}
                  required
                />
                
                {/* 👇 Status Icons 👇 */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {emailStatus === 'checking' && <Loader2 className="size-4 animate-spin text-slate-400" />}
                  {emailStatus === 'available' && <Check className="size-4 text-green-500" />}
                  {emailStatus === 'taken' && <X className="size-4 text-red-500" />}
                </div>
              </div>
              
              {/* Optional Text Message */}
              {emailStatus === 'taken' && (
                <p className="text-xs text-red-500">This email is already taken.</p>
              )}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="space-y-4 pb-8 border-b border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Lock size={18} /> Security
          </h3>
          <p className="text-sm text-muted-foreground mb-4">Leave these fields blank if you do not want to change your password.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:ring-primary focus:border-primary text-foreground outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:ring-primary focus:border-primary text-foreground outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isLoading} className="gap-2 px-8">
            <Save size={18} />
            {isLoading ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </div>

      </form>
    </div>
  );
};
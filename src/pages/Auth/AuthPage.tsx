// // import React, { useState } from 'react';
// // import { Sparkles } from 'lucide-react';
// // import { Button } from '../../components/ui/Button';
// // import { useAuth } from '../../contexts/Auth';

// // interface AuthPageProps {
// //   onAuth: () => void;
// // }

// // export const AuthPage: React.FC<AuthPageProps> = ({ onAuth }) => {
// //   const { login } = useAuth();
// //   const [email, setEmail] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!email) return;

// //     setIsLoading(true);
// //     try {
// //       await login({ email });
// //       onAuth();
// //     } catch (error) {
// //       console.error(error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleSocialLogin = async (provider: string) => {
// //     setIsLoading(true);
// //     try {
// //       const response = await fetch(`/api/auth/${provider.toLowerCase()}/url`);
// //       const { url } = await response.json();

// //       const width = 500;
// //       const height = 600;
// //       const left = window.screen.width / 2 - width / 2;
// //       const top = window.screen.height / 2 - height / 2;

// //       window.open(
// //         url,
// //         `${provider} Login`,
// //         `width=${width},height=${height},left=${left},top=${top}`
// //       );

// //       // We will rely on AuthContext's message listener to update the user state.
// //       // And we poll the AuthContext to see if user is set, or just let App.tsx handle the redirect to dashboard.
// //     } catch (error) {
// //       console.error(error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex">
// //       <div className="hidden lg:flex flex-1 bg-primary p-20 flex-col justify-between text-white relative overflow-hidden">
// //         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
// //         <div className="z-10 space-y-4">
// //           <div className="flex items-center gap-2">
// //             <Sparkles size={32} />
// //             <h2 className="text-2xl font-bold">PortfoliAI</h2>
// //           </div>
// //         </div>
// //         <div className="z-10 space-y-6">
// //           <h1 className="text-6xl font-black leading-tight">Turn your resume into a stunning portfolio in seconds.</h1>
// //           <p className="text-xl text-white/80 max-w-md">Join over 50,000 professionals showcasing their work with AI-powered digital identities.</p>
// //         </div>
// //         <div className="z-10 flex items-center gap-4">
// //           <div className="flex -space-x-3">
// //             {[1, 2, 3].map(i => (
// //               <div key={i} className="size-10 rounded-full border-2 border-primary bg-slate-200 overflow-hidden">
// //                 <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
// //               </div>
// //             ))}
// //           </div>
// //           <p className="text-sm font-medium">Trusted by top designers</p>
// //         </div>
// //       </div>
// //       <div className="flex-1 flex items-center justify-center p-8 bg-background">
// //         <div className="w-full max-w-md space-y-8">
// //           <div className="space-y-2">
// //             <h2 className="text-3xl font-bold">Welcome back</h2>
// //             <p className="text-slate-500">Please enter your details to sign in.</p>
// //           </div>
// //           <div className="space-y-4">
// //             <Button variant="outline" className="w-full h-12" onClick={() => handleSocialLogin('Google')}>Continue with Google</Button>
// //             <Button variant="outline" className="w-full h-12" onClick={() => handleSocialLogin('GitHub')}>Continue with GitHub</Button>
// //           </div>
// //           <div className="relative">
// //             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
// //             <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-slate-500">Or continue with email</span></div>
// //           </div>
// //           <form className="space-y-4" onSubmit={handleSubmit}>
// //             <div className="space-y-2">
// //               <label className="text-sm font-semibold">Email Address</label>
// //               <input
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 placeholder="name@example.com"
// //                 className="w-full rounded-xl border-border bg-card px-4 py-3 focus:ring-primary focus:border-primary text-foreground"
// //                 required
// //               />
// //             </div>
// //             <div className="space-y-2">
// //               <div className="flex justify-between">
// //                 <label className="text-sm font-semibold">Password</label>
// //                 <a href="#" className="text-xs font-bold text-primary">Forgot password?</a>
// //               </div>
// //               <input type="password" placeholder="••••••••" className="w-full rounded-xl border-border bg-card px-4 py-3 focus:ring-primary focus:border-primary text-foreground" />
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <input type="checkbox" id="remember" className="rounded text-primary focus:ring-primary" />
// //               <label htmlFor="remember" className="text-sm text-slate-500">Remember me for 30 days</label>
// //             </div>
// //             <Button className="w-full h-12" type="submit" disabled={isLoading}>
// //               {isLoading ? 'Signing in...' : 'Sign in to your account'}
// //             </Button>
// //           </form>
// //           <p className="text-center text-sm text-slate-500">
// //             Don't have an account? <a href="#" className="font-bold text-primary">Start for free</a>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// import React, { useState } from 'react';
// import { Sparkles, Camera, ArrowLeft, Eye, EyeOff } from 'lucide-react';
// import { Button } from '../../components/ui/Button';
// import { useAuth } from '../../contexts/Auth';

// interface AuthPageProps {
//   onAuth: () => void;
// }

// export const AuthPage: React.FC<AuthPageProps> = ({ onAuth }) => {
//   const { login } = useAuth();
  
//   // UI State
//   const [mode, setMode] = useState<'login' | 'register' | 'verify'>('login');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Form State
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [name, setName] = useState('');
//   const [profilePicture, setProfilePicture] = useState<string>('');
//   const [otp, setOtp] = useState('');

//   /* ======================================================
//      HANDLERS
//      ====================================================== */

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setProfilePicture(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email || !password) return;

//     setIsLoading(true);
//     setError(null);
//     try {
//       // Assuming your AuthContext login handles the POST to /api/auth/login
//       await login({ email, password });
//       onAuth();
//     } catch (err: any) {
//       setError(err.message || 'Login failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRegisterSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await fetch('/api/auth/register-request', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password, confirmPassword, name, profilePicture }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || 'Registration failed');

//       // Move to verification screen
//       setMode('verify');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifySubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       const res = await fetch('/api/auth/verify-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || 'Verification failed');

//       // Save token and trigger auth success
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));

//       // Force the page to reload so AuthContext picks up the new user instantly
//       window.location.reload();
      
//       // If your AuthContext exposes a method to set the user directly, call it here.
//       // Otherwise, calling onAuth() assuming it triggers a refetch in App.tsx
//       onAuth();
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSocialLogin = async (provider: string) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`/api/auth/${provider.toLowerCase()}/url`);
//       const { url } = await response.json();

//       const width = 500;
//       const height = 600;
//       const left = window.screen.width / 2 - width / 2;
//       const top = window.screen.height / 2 - height / 2;

//       window.open(url, `${provider} Login`, `width=${width},height=${height},left=${left},top=${top}`);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /* ======================================================
//      RENDERERS
//      ====================================================== */

//   return (
//     <div className="min-h-screen flex">
//       {/* LEFT BRANDING PANEL */}
//       <div className="hidden lg:flex flex-1 bg-primary p-20 flex-col justify-between text-white relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
//         <div className="z-10 space-y-4">
//           <div className="flex items-center gap-2">
//             <Sparkles size={32} />
//             <h2 className="text-2xl font-bold">PortfoliAI</h2>
//           </div>
//         </div>
//         <div className="z-10 space-y-6">
//           <h1 className="text-6xl font-black leading-tight">Turn your resume into a stunning portfolio in seconds.</h1>
//           <p className="text-xl text-white/80 max-w-md">Join over 50,000 professionals showcasing their work with AI-powered digital identities.</p>
//         </div>
//         <div className="z-10 flex items-center gap-4">
//           <div className="flex -space-x-3">
//             {[1, 2, 3].map(i => (
//               <div key={i} className="size-10 rounded-full border-2 border-primary bg-slate-200 overflow-hidden">
//                 <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
//               </div>
//             ))}
//           </div>
//           <p className="text-sm font-medium">Trusted by top designers</p>
//         </div>
//       </div>

//       {/* RIGHT AUTH PANEL */}
//       <div className="flex-1 flex items-center justify-center p-8 bg-background overflow-y-auto">
//         <div className="w-full max-w-md space-y-8">
          
//           {error && (
//             <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg">
//               {error}
//             </div>
//           )}

//           {/* ================= LOGIN MODE ================= */}
//           {mode === 'login' && (
//             <>
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold">Welcome back</h2>
//                 <p className="text-slate-500">Please enter your details to sign in.</p>
//               </div>
              
//               <div className="space-y-4">
//                 <Button variant="outline" className="w-full h-12" onClick={() => handleSocialLogin('Google')}>Continue with Google</Button>
//                 <Button variant="outline" className="w-full h-12" onClick={() => handleSocialLogin('GitHub')}>Continue with GitHub</Button>
//               </div>
              
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
//                 <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-slate-500">Or continue with email</span></div>
//               </div>
              
//               <form className="space-y-4" onSubmit={handleLoginSubmit}>
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Email Address</label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="name@example.com"
//                     className="w-full rounded-xl border border-border bg-card px-4 py-3 focus:ring-primary focus:border-primary text-foreground outline-none"
//                     required
//                   />
//                 </div>
//                <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <label className="text-sm font-semibold">Password</label>
//                     <a href="#" className="text-xs font-bold text-primary">Forgot password?</a>
//                   </div>
//                   <div className="relative">
//                     <input 
//                       type={showPassword ? "text" : "password"} 
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="••••••••" 
//                       className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-10 focus:ring-primary focus:border-primary text-foreground outline-none" 
//                       required
//                     />
//                     <button 
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <input type="checkbox" id="remember" className="rounded text-primary focus:ring-primary" />
//                   <label htmlFor="remember" className="text-sm text-slate-500">Remember me for 30 days</label>
//                 </div>
//                 <Button className="w-full h-12" type="submit" disabled={isLoading}>
//                   {isLoading ? 'Signing in...' : 'Sign in to your account'}
//                 </Button>
//               </form>
              
//               <p className="text-center text-sm text-slate-500">
//                 Don't have an account? <button onClick={() => { setMode('register'); setError(null); }} className="font-bold text-primary">Start for free</button>
//               </p>
//             </>
//           )}

//           {/* ================= REGISTER MODE ================= */}
//           {mode === 'register' && (
//             <>
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold">Create an account</h2>
//                 <p className="text-slate-500">Enter your details to get started.</p>
//               </div>

//               <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                
//                 {/* Profile Picture Upload */}
//                 <div className="flex justify-center mb-6">
//                   <label className="relative cursor-pointer group">
//                     <div className="size-24 rounded-full border-2 border-dashed border-border flex items-center justify-center bg-slate-50 dark:bg-slate-900 overflow-hidden">
//                       {profilePicture ? (
//                         <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
//                       ) : (
//                         <Camera className="text-slate-400 group-hover:text-primary transition-colors" />
//                       )}
//                     </div>
//                     <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
//                     <div className="absolute -bottom-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                       Upload Photo
//                     </div>
//                   </label>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Full Name</label>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="John Doe"
//                     className="w-full rounded-xl border border-border bg-card px-4 py-3 focus:ring-primary focus:border-primary text-foreground outline-none"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Email Address</label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="name@example.com"
//                     className="w-full rounded-xl border border-border bg-card px-4 py-3 focus:ring-primary focus:border-primary text-foreground outline-none"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Password</label>
//                   <div className="relative">
//                     <input 
//                       type={showPassword ? "text" : "password"} 
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="••••••••" 
//                       className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-10 focus:ring-primary focus:border-primary text-foreground outline-none" 
//                       required
//                     />
//                     <button 
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Confirm Password</label>
//                   <div className="relative">
//                     <input 
//                       type={showConfirmPassword ? "text" : "password"} 
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       placeholder="••••••••" 
//                       className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-10 focus:ring-primary focus:border-primary text-foreground outline-none" 
//                       required
//                     />
//                     <button 
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
//                     >
//                       {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 </div>
                
//                 <Button className="w-full h-12 mt-4" type="submit" disabled={isLoading}>
//                   {isLoading ? 'Sending code...' : 'Create Account'}
//                 </Button>
//               </form>

//               <p className="text-center text-sm text-slate-500">
//                 Already have an account? <button onClick={() => { setMode('login'); setError(null); }} className="font-bold text-primary">Sign in</button>
//               </p>
//             </>
//           )}

//           {/* ================= VERIFY OTP MODE ================= */}
//           {mode === 'verify' && (
//             <>
//               <button 
//                 onClick={() => { setMode('register'); setError(null); }}
//                 className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-4"
//               >
//                 <ArrowLeft size={16} /> Back to register
//               </button>

//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold">Check your email</h2>
//                 <p className="text-slate-500">We sent a 6-digit verification code to <strong className="text-foreground">{email}</strong>.</p>
//               </div>

//               <form className="space-y-6" onSubmit={handleVerifySubmit}>
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Verification Code</label>
//                   <input
//                     type="text"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
//                     placeholder="000000"
//                     className="w-full rounded-xl border border-border bg-card px-4 py-3 focus:ring-primary focus:border-primary text-foreground outline-none text-center text-2xl tracking-[0.5em] font-mono"
//                     required
//                   />
//                 </div>
                
//                 <Button className="w-full h-12" type="submit" disabled={isLoading || otp.length < 6}>
//                   {isLoading ? 'Verifying...' : 'Verify & Continue'}
//                 </Button>
//               </form>

//               <p className="text-center text-sm text-slate-500">
//                 Didn't receive the code? <button onClick={handleRegisterSubmit} className="font-bold text-primary">Resend code</button>
//               </p>
//             </>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };




/**===========================================
 *   Version 2
 =============================================*/

 import React, { useState } from 'react';
import { Sparkles, Camera, ArrowLeft, Eye, EyeOff, Github } from 'lucide-react'; // 👈 Added Github icon
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/Auth';

// 👇 Tiny inline SVG component for the Google Icon 👇
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

interface AuthPageProps {
  onAuth: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuth }) => {
  const { login } = useAuth();
  
  // UI State
  const [mode, setMode] = useState<'login' | 'register' | 'verify'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [otp, setOtp] = useState('');

  /* ======================================================
     HANDLERS
     ====================================================== */

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setError(null);
    try {
      await login({ email, password });
      onAuth();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/register-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, confirmPassword, name, profilePicture }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setMode('verify');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      window.location.reload();
      onAuth();
    } catch (err: any) {
      setError(err.message);
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

      window.open(url, `${provider} Login`, `width=${width},height=${height},left=${left},top=${top}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /* ======================================================
     RENDERERS
     ====================================================== */

  return (
    <div className="min-h-screen flex">
      {/* LEFT BRANDING PANEL */}
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

      {/* RIGHT AUTH PANEL */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* ================= LOGIN MODE ================= */}
          {mode === 'login' && (
            <>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Welcome back</h2>
                <p className="text-slate-500">Please enter your details to sign in.</p>
              </div>
              
              {/* 👇 UPDATED: Added Icons to Login 👇 */}
              <div className="space-y-4">
                <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-2" onClick={() => handleSocialLogin('Google')}>
                  <GoogleIcon /> Continue with Google
                </Button>
                <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-2" onClick={() => handleSocialLogin('GitHub')}>
                  <Github size={18} /> Continue with GitHub
                </Button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-slate-500">Or continue with email</span></div>
              </div>
              
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 focus:ring-primary focus:border-primary text-foreground outline-none"
                    required
                  />
                </div>
               <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold">Password</label>
                    <a href="#" className="text-xs font-bold text-primary">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-10 focus:ring-primary focus:border-primary text-foreground outline-none" 
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
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
                Don't have an account? <button onClick={() => { setMode('register'); setError(null); }} className="font-bold text-primary">Start for free</button>
              </p>
            </>
          )}

          {/* ================= REGISTER MODE ================= */}
          {mode === 'register' && (
            <>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Create an account</h2>
                <p className="text-slate-500">Enter your details to get started.</p>
              </div>

              {/* 👇 NEW: Added Social Login Options to Register 👇 */}
              <div className="space-y-4">
                <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-2" onClick={() => handleSocialLogin('Google')}>
                  <GoogleIcon /> Continue with Google
                </Button>
                <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-2" onClick={() => handleSocialLogin('GitHub')}>
                  <Github size={18} /> Continue with GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-slate-500">Or register with email</span></div>
              </div>
              {/* 👆 NEW: Added Social Login Options to Register 👆 */}

              <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                
                {/* Profile Picture Upload */}
                <div className="flex justify-center mb-6">
                  <label className="relative cursor-pointer group">
                    <div className="size-24 rounded-full border-2 border-dashed border-border flex items-center justify-center bg-slate-50 dark:bg-slate-900 overflow-hidden">
                      {profilePicture ? (
                        <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="text-slate-400 group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    <div className="absolute -bottom-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Upload Photo
                    </div>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 focus:ring-primary focus:border-primary text-foreground outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 focus:ring-primary focus:border-primary text-foreground outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-10 focus:ring-primary focus:border-primary text-foreground outline-none" 
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Confirm Password</label>
                  <div className="relative">
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-10 focus:ring-primary focus:border-primary text-foreground outline-none" 
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <Button className="w-full h-12 mt-4" type="submit" disabled={isLoading}>
                  {isLoading ? 'Sending code...' : 'Create Account'}
                </Button>
              </form>

              <p className="text-center text-sm text-slate-500">
                Already have an account? <button onClick={() => { setMode('login'); setError(null); }} className="font-bold text-primary">Sign in</button>
              </p>
            </>
          )}

          {/* ================= VERIFY OTP MODE ================= */}
          {mode === 'verify' && (
            <>
              <button 
                onClick={() => { setMode('register'); setError(null); }}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-4"
              >
                <ArrowLeft size={16} /> Back to register
              </button>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Check your email</h2>
                <p className="text-slate-500">We sent a 6-digit verification code to <strong className="text-foreground">{email}</strong>.</p>
              </div>

              <form className="space-y-6" onSubmit={handleVerifySubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Verification Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    placeholder="000000"
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 focus:ring-primary focus:border-primary text-foreground outline-none text-center text-2xl tracking-[0.5em] font-mono"
                    required
                  />
                </div>
                
                <Button className="w-full h-12" type="submit" disabled={isLoading || otp.length < 6}>
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </Button>
              </form>

              <p className="text-center text-sm text-slate-500">
                Didn't receive the code? <button onClick={handleRegisterSubmit} className="font-bold text-primary">Resend code</button>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
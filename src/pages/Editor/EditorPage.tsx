// import React, { useState, useEffect } from 'react';
// import { ArrowRight, Sliders, Sun, Moon, Check, Plus, X, Loader2, Save, Globe } from 'lucide-react';
// import { Button } from '../../components/ui/Button';
// import { useTheme } from '../../contexts/Theme';
// import { cn } from '../../lib/utils';
// import { PortfolioData } from '../../services/geminiService';
// import { templateConfig } from '../../lib/templateConfig';

// interface EditorPageProps {
//   data: PortfolioData | null;
//   theme: string;
//   initialSlug: string;
//   onThemeChange: (theme: string) => void;
//   onDataChange: (data: PortfolioData) => void;
//   onSave: (data: PortfolioData, theme: string, status: 'draft' | 'active', slug: string) => void;
//   onBack: () => void;
// }

// export const EditorPage: React.FC<EditorPageProps> = ({ 
//   data, 
//   theme: selectedTheme, 
//   initialSlug,
//   onThemeChange, 
//   onDataChange,
//   onSave,
//   onBack
// }) => {
//   const { theme, toggleTheme } = useTheme();

//   const [slug, setSlug] = useState(initialSlug || '');
//   const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null);
//   const [isCheckingSlug, setIsCheckingSlug] = useState(false);

// // Start of Slug Logic
//   useEffect(() => {
//     if (!slug || slug === initialSlug) {
//       setIsSlugAvailable(null);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       setIsCheckingSlug(true);
//       try {
//         const res = await fetch(`/api/slug/check/${slug}`);
//         const result = await res.json();
//         setIsSlugAvailable(result.available);
//       } catch (error) {
//         console.error("Error checking slug", error);
//       } finally {
//         setIsCheckingSlug(false);
//       }
//     }, 500); 

//     return () => clearTimeout(timer);
//   }, [slug, initialSlug]);
//   // 👆 END OF NEW SLUG LOGIC

//   if (!data) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-background">
//         <div className="text-center space-y-4">
//           <p className="text-slate-500">No portfolio data found. Please upload a resume first.</p>
//           <Button onClick={onBack}>Back to Dashboard</Button>
//         </div>
//       </div>
//     );
//   }

//   const updateData = (field: keyof PortfolioData, value: any) => {
//     onDataChange({ ...data, [field]: value });
//   };

//   return (
//     <div className="flex h-screen bg-background">
//       <aside className="w-80 border-r border-border bg-card flex flex-col">

//         {/* <div className="p-6 border-b border-border flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Button variant="ghost" className="p-2" onClick={onBack}><ArrowRight className="rotate-180" size={20} /></Button>
//             <h2 className="font-bold">Editor</h2>
//           </div>
//           <div className="flex items-center gap-2">
//             <Button variant="ghost" className="p-2 rounded-full" onClick={toggleTheme}>
//               {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
//             </Button>
//             <Button className="px-4 py-2 text-xs" onClick={() => {
//               onSave(data, selectedTheme);
//             }}>Publish</Button>
//           </div>
//         </div> */}

//         {/* NEW HEADER WITH DRAFT/PUBLISH */}
//         <div className="p-4 border-b border-border flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-900/20">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Button variant="ghost" className="p-2" onClick={onBack}>
//                 <ArrowRight className="rotate-180" size={20} />
//               </Button>
//               <h2 className="font-bold">Editor</h2>
//             </div>
//             <Button variant="ghost" className="p-2 rounded-full" onClick={toggleTheme}>
//               {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
//             </Button>
//           </div>
          
//           <div className="grid grid-cols-2 gap-2">
//             <Button 
//               variant="secondary" 
//               className="text-xs font-bold gap-2"
//               disabled={isSlugAvailable === false}
//               onClick={() => onSave(data, selectedTheme, 'draft', slug || initialSlug)}
//             >
//               <Save size={14} /> Draft
//             </Button>
//             <Button 
//               className="text-xs font-bold gap-2 bg-green-600 hover:bg-green-700 text-white"
//               disabled={isSlugAvailable === false}
//               onClick={() => onSave(data, selectedTheme, 'active', slug || initialSlug)}
//             >
//               <Globe size={14} /> Publish
//             </Button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6 space-y-8">
//           {/* 👇 NEW PUBLIC URL EDITOR 👇 */}
//           <section className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Public URL</h3>
//             <div className="space-y-2">
//               <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-border rounded-lg px-3 py-2 focus-within:ring-2 ring-primary/20 transition-all">
//                 <span className="text-slate-400 text-xs hidden xl:block mr-1">/view/</span>
//                 <input 
//                   type="text" 
//                   value={slug}
//                   onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
//                   placeholder="custom-slug"
//                   className="bg-transparent border-none outline-none text-sm font-semibold flex-1 min-w-0 placeholder:text-slate-300"
//                 />
//                 {/* <div className="w-5 flex justify-center ml-2 shrink-0">
//                   {isCheckingSlug ? (
//                     <Loader2 size={14} className="text-slate-400 animate-spin" />
//                   ) : isSlugAvailable === true ? (
//                     <Check size={14} className="text-green-500" title="Available" />
//                   ) : isSlugAvailable === false ? (
//                     <X size={14} className="text-red-500" title="Taken" />
//                   ) : null}
//                 </div> */}
//                 <div 
//                   className="w-5 flex justify-center ml-2 shrink-0"
//                   title={
//                     isCheckingSlug ? "Checking availability..." : 
//                     isSlugAvailable === true ? "Available!" : 
//                     isSlugAvailable === false ? "Taken" : ""
//                   }
//                 >
//                   {isCheckingSlug ? (
//                     <Loader2 size={14} className="text-slate-400 animate-spin" />
//                   ) : isSlugAvailable === true ? (
//                     <Check size={14} className="text-green-500" />
//                   ) : isSlugAvailable === false ? (
//                     <X size={14} className="text-red-500" />
//                   ) : null}
//                 </div>
//               </div>
//               {isSlugAvailable === false && (
//                 <p className="text-[10px] text-red-500 font-bold">This slug is already taken.</p>
//               )}
//             </div>
//           </section>
//           {/* 👆 END OF PUBLIC URL EDITOR 👆 */}
//           <section className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Template</h3>
//             <div className="grid grid-cols-2 gap-3">
//               {['Minimalist', 'Creative', 'Modern', 'Classic'].map(t => (
//                 <div 
//                   key={t} 
//                   onClick={() => onThemeChange(t)}
//                   className={cn(
//                     "aspect-[3/4] rounded-lg border-2 flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all relative", 
//                     selectedTheme === t ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50 text-slate-400'
//                   )}
//                 >
//                   {t}
//                   {selectedTheme === t && <Check size={12} className="absolute top-1 right-1" />}
//                 </div>
//               ))}
//             </div>
//           </section>
//           <section className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Theme Colors</h3>
//             <div className="flex gap-3">
//               {['#1325ec', '#ec1313', '#13ec13', '#ec13ec'].map(c => (
//                 <div key={c} className="size-8 rounded-full cursor-pointer border-2 border-white shadow-sm" style={{ backgroundColor: c }} />
//               ))}
//             </div>
//           </section>
//           <section className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Content</h3>
//             <div className="space-y-4">
//               {/* 👇 NEW PORTFOLIO IMAGE UPLOAD 👇 */}
//               <div className="space-y-1">
//                 <label className="text-[10px] font-bold uppercase text-slate-400">Portfolio Profile Picture</label>

//                   <div className="flex items-center gap-3">
//                   {/* 👇 NEW THUMBNAIL PREVIEW 👇 */}
//                   {data.image && (
//                     <div className="shrink-0 size-10 rounded-full border border-border overflow-hidden bg-slate-100 dark:bg-slate-800">
//                       <img 
//                         src={data.image} 
//                         alt="Preview" 
//                         className="w-full h-full object-cover" 
//                       />
//                     </div>
//                   )}
//                   {/* 👆 END THUMBNAIL PREVIEW 👆 */}     
//                   </div>           
                
                
//                 <input 
//                   type="file" 
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) {
//                       const reader = new FileReader();
//                       reader.onloadend = () => {
//                         onDataChange({ ...data, image: reader.result as string });
//                       };
//                       reader.readAsDataURL(file);
//                     }
//                   }}
//                   className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
//                 />
//               </div>
//               {/* 👆 END PORTFOLIO IMAGE UPLOAD 👆 */}
//               <div className="space-y-1">
//                 <label className="text-[10px] font-bold uppercase text-slate-400">Name</label>
//                 <input 
//                   type="text" 
//                   value={data.name} 
//                   onChange={(e) => updateData('name', e.target.value)}
//                   className="w-full bg-slate-50  dark:bg-slate-800 border border-border rounded-lg px-3 py-2 text-sm"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-[10px] font-bold uppercase text-slate-400">Role</label>
//                 <input 
//                   type="text" 
//                   value={data.role} 
//                   onChange={(e) => updateData('role', e.target.value)}
//                   className="w-full bg-slate-50 dark:bg-slate-800 border border-border rounded-lg px-3 py-2 text-sm"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-[10px] font-bold uppercase text-slate-400">About</label>
//                 <textarea 
//                   value={data.about} 
//                   onChange={(e) => updateData('about', e.target.value)}
//                   className="w-full bg-slate-50 dark:bg-slate-800 border border-border rounded-lg px-3 py-2 text-sm h-24 resize-none"
//                 />
//               </div>
//             </div>
//           </section>

//           <section className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Experience</h3>
//               <Button variant="ghost" className="p-1 h-auto text-primary" onClick={() => {
//                 const newExp = { company: 'New Company', role: 'Role', period: '2024 - Present', desc: 'Description' };
//                 updateData('experience', [...(data.experience || []), newExp]);
//               }}>
//                 <Plus size={14} />
//               </Button>
//             </div>
//             <div className="space-y-4">
//               {data.experience?.map((exp, i) => (
//                 <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-border space-y-3 relative group">
//                   <button 
//                     className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
//                     onClick={() => {
//                       const newExp = [...data.experience];
//                       newExp.splice(i, 1);
//                       updateData('experience', newExp);
//                     }}
//                   >
//                     <X size={14} />
//                   </button>
//                   <input 
//                     type="text" 
//                     value={exp.role} 
//                     onChange={(e) => {
//                       const newExp = [...data.experience];
//                       newExp[i] = { ...exp, role: e.target.value };
//                       updateData('experience', newExp);
//                     }}
//                     placeholder="Role"
//                     className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0"
//                   />
//                   <input 
//                     type="text" 
//                     value={exp.company} 
//                     onChange={(e) => {
//                       const newExp = [...data.experience];
//                       newExp[i] = { ...exp, company: e.target.value };
//                       updateData('experience', newExp);
//                     }}
//                     placeholder="Company"
//                     className="w-full bg-transparent border-none p-0 text-xs text-slate-500 focus:ring-0"
//                   />
//                   <textarea 
//                     value={exp.desc} 
//                     onChange={(e) => {
//                       const newExp = [...data.experience];
//                       newExp[i] = { ...exp, desc: e.target.value };
//                       updateData('experience', newExp);
//                     }}
//                     placeholder="Description"
//                     className="w-full bg-transparent border-none p-0 text-xs text-slate-400 focus:ring-0 resize-none h-12"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Projects</h3>
//               <Button variant="ghost" className="p-1 h-auto text-primary" onClick={() => {
//                 const newProj = { name: 'New Project', desc: 'Description', tech: ['React'] };
//                 updateData('projects', [...(data.projects || []), newProj]);
//               }}>
//                 <Plus size={14} />
//               </Button>
//             </div>
//             <div className="space-y-4">
//               {data.projects?.map((proj, i) => (
//                 <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-border space-y-3 relative group">
//                   <button 
//                     className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
//                     onClick={() => {
//                       const newProj = [...data.projects];
//                       newProj.splice(i, 1);
//                       updateData('projects', newProj);
//                     }}
//                   >
//                     <X size={14} />
//                   </button>
//                   <input 
//                     type="text" 
//                     value={proj.name} 
//                     onChange={(e) => {
//                       const newProj = [...data.projects];
//                       newProj[i] = { ...proj, name: e.target.value };
//                       updateData('projects', newProj);
//                     }}
//                     placeholder="Project Name"
//                     className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0"
//                   />
//                   <textarea 
//                     value={proj.desc} 
//                     onChange={(e) => {
//                       const newProj = [...data.projects];
//                       newProj[i] = { ...proj, desc: e.target.value };
//                       updateData('projects', newProj);
//                     }}
//                     placeholder="Description"
//                     className="w-full bg-transparent border-none p-0 text-xs text-slate-400 focus:ring-0 resize-none h-12"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skills</h3>
//               <Button variant="ghost" className="p-1 h-auto text-primary" onClick={() => {
//                 const skill = prompt('Enter new skill:');
//                 if (skill) updateData('skills', [...(data.skills || []), skill]);
//               }}>
//                 <Plus size={14} />
//               </Button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {data.skills?.map((skill, i) => (
//                 <span key={i} className="group relative px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium border border-border">
//                   {skill}
//                   <button 
//                     className="absolute -top-1 -right-1 size-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                     onClick={() => {
//                       const newSkills = [...data.skills];
//                       newSkills.splice(i, 1);
//                       updateData('skills', newSkills);
//                     }}
//                   >
//                     <X size={10} />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </section>

//           <section className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact</h3>
//             <div className="space-y-3">
//               {['email', 'location', 'github', 'linkedin', 'twitter'].map(field => (
//                 <div key={field} className="space-y-1">
//                   <label className="text-[10px] font-bold uppercase text-slate-400">{field}</label>
//                   <input 
//                     type="text" 
//                     value={(data.contact as any)[field] || ''} 
//                     onChange={(e) => {
//                       const newContact = { ...data.contact, [field]: e.target.value };
//                       updateData('contact', newContact);
//                     }}
//                     className="w-full bg-slate-50 dark:bg-slate-800 border border-border rounded-lg px-3 py-2 text-sm"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sections</h3>
//             <div className="space-y-2">
//               {['Hero', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map(s => (
//                 <div key={s} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
//                   <span className="text-sm font-medium">{s}</span>
//                   <Sliders size={14} className="text-slate-400" />
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </aside>
//       <main className="flex-1 overflow-y-auto p-12 flex justify-center bg-background">
//         <div className={cn(
//           "w-full max-w-4xl bg-card shadow-2xl rounded-2xl min-h-[1200px] p-20 space-y-16 border border-border",
//           selectedTheme === 'Minimalist' && "font-sans",
//           selectedTheme === 'Creative' && "font-display",
//           selectedTheme === 'Classic' && "font-serif"
//         )}>
//           <header className="space-y-4">
//             <h1 className="text-6xl font-black tracking-tight">{data?.name || 'Your Name'}</h1>
//             <p className="text-2xl text-slate-500 font-medium">{data?.role || 'Your Role'}</p>
//           </header>
//           <section className="space-y-6">
//             <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">About</h2>
//             <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
//               {data?.about || 'Tell the world about yourself...'}
//             </p>
//           </section>
//           <section className="space-y-8">
//             <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Experience</h2>
//             <div className="space-y-12">
//               {data?.experience?.map((exp, i) => (
//                 <div key={i} className="flex justify-between items-start">
//                   <div className="space-y-2">
//                     <h3 className="text-2xl font-bold">{exp.role}</h3>
//                     <p className="text-slate-500 font-medium">{exp.company}</p>
//                     <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">{exp.desc}</p>
//                   </div>
//                   <span className="text-sm font-bold text-slate-400">{exp.period}</span>
//                 </div>
//               ))}
//               {(!data?.experience || data.experience.length === 0) && <p className="text-slate-400">No experience listed.</p>}
//             </div>
//           </section>
//           <section className="space-y-8">
//             <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Projects</h2>
//             <div className="grid grid-cols-2 gap-6">
//               {data?.projects?.map((proj, i) => (
//                 <div key={i} className="p-6 rounded-xl border border-border bg-background/50 space-y-4">
//                   <h3 className="text-xl font-bold">{proj.name}</h3>
//                   <p className="text-sm text-slate-600 dark:text-slate-400">{proj.desc}</p>
//                   <div className="flex flex-wrap gap-2">
//                     {proj.tech?.map(t => (
//                       <span key={t} className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded">{t}</span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//               {(!data?.projects || data.projects.length === 0) && <p className="text-slate-400">No projects listed.</p>}
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };





/***=============================================
 *  Version 2
 * ==============================================
 */

// import React, { useState, useEffect } from 'react';
// import { ArrowRight, Sliders, Sun, Moon, Check, Plus, X, Loader2, Save, Globe } from 'lucide-react';
// import { Button } from '../../components/ui/Button';
// import { useTheme } from '../../contexts/Theme';
// import { cn } from '../../lib/utils';
// import { PortfolioData } from '../../services/geminiService';
// import { templateConfig } from '../../lib/templateConfig';

// interface EditorPageProps {
//   data: PortfolioData | null;
//   theme: string;
//   initialSlug: string;
//   onThemeChange: (theme: string) => void;
//   onDataChange: (data: PortfolioData) => void;
//   onSave: (data: PortfolioData, theme: string, status: 'draft' | 'active', slug: string) => void;
//   onBack: () => void;
// }

// export const EditorPage: React.FC<EditorPageProps> = ({ 
//   data, 
//   theme: selectedTheme, 
//   initialSlug,
//   onThemeChange, 
//   onDataChange,
//   onSave,
//   onBack
// }) => {
//   const { theme, toggleTheme } = useTheme();

//   const [slug, setSlug] = useState(initialSlug || '');
//   const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null);
//   const [isCheckingSlug, setIsCheckingSlug] = useState(false);

//   // 👇 ADD THESE LINES 👇
//   const [currentTemplate, setCurrentTemplate] = useState(selectedTheme || 'Modern');

//   useEffect(() => {
//     if (selectedTheme) setCurrentTemplate(selectedTheme);
//   }, [selectedTheme]);



//   useEffect(() => {
//     if (!slug || slug === initialSlug) {
//       setIsSlugAvailable(null);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       setIsCheckingSlug(true);
//       try {
//         const res = await fetch(`/api/slug/check/${slug}`);
//         const result = await res.json();
//         setIsSlugAvailable(result.available);
//       } catch (error) {
//         console.error("Error checking slug", error);
//       } finally {
//         setIsCheckingSlug(false);
//       }
//     }, 500); 

//     return () => clearTimeout(timer);
//   }, [slug, initialSlug]);

//   if (!data) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-background">
//         <div className="text-center space-y-4">
//           <p className="text-slate-500">No portfolio data found. Please upload a resume first.</p>
//           <Button onClick={onBack}>Back to Dashboard</Button>
//         </div>
//       </div>
//     );
//   }

//   const updateData = (field: keyof PortfolioData, value: any) => {
//     onDataChange({ ...data, [field]: value });
//   };

//   // 👇 GRAB THE DYNAMIC STYLES FOR THE LIVE PREVIEW 👇
//   // const styles = templateConfig[selectedTheme] || templateConfig['Modern'];
//   const styles = templateConfig[currentTemplate] || templateConfig['Modern'];

//   return (
//     <div className="flex h-screen bg-background">
//       <aside className="w-80 border-r border-border bg-card flex flex-col overflow-hidden">
        
//         <div className="p-4 border-b border-border flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-900/20 shrink-0">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Button variant="ghost" className="p-2" onClick={onBack}>
//                 <ArrowRight className="rotate-180" size={20} />
//               </Button>
//               <h2 className="font-bold">Editor</h2>
//             </div>
//             <Button variant="ghost" className="p-2 rounded-full" onClick={toggleTheme}>
//               {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
//             </Button>
//           </div>
          
//           <div className="grid grid-cols-2 gap-2">
//             {/* <Button 
//               variant="secondary" 
//               className="text-xs font-bold gap-2"
//               disabled={isSlugAvailable === false}
//               onClick={() => onSave(data, selectedTheme, 'draft', slug || initialSlug)}
//             >
//               <Save size={14} /> Draft
//             </Button>
//             <Button 
//               className="text-xs font-bold gap-2 bg-green-600 hover:bg-green-700 text-white"
//               disabled={isSlugAvailable === false}
//               onClick={() => onSave(data, selectedTheme, 'active', slug || initialSlug)}
//             >
//               <Globe size={14} /> Publish
//             </Button> */}
//             <Button 
//               variant="secondary" 
//               className="text-xs font-bold gap-2"
//               disabled={isSlugAvailable === false}
//               onClick={() => onSave(data, currentTemplate, 'draft', slug || initialSlug)} // 👈 Updated here
//             >
//               <Save size={14} /> Draft
//             </Button>
//             <Button 
//               className="text-xs font-bold gap-2 bg-green-600 hover:bg-green-700 text-white"
//               disabled={isSlugAvailable === false}
//               onClick={() => onSave(data, currentTemplate, 'active', slug || initialSlug)} // 👈 Updated here
//             >
//               <Globe size={14} /> Publish
//             </Button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6 space-y-8">
//           <section className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Public URL</h3>
//             <div className="space-y-2">
//               <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-border rounded-lg px-3 py-2 focus-within:ring-2 ring-primary/20 transition-all">
//                 <span className="text-slate-400 text-xs hidden xl:block mr-1">/view/</span>
//                 <input 
//                   type="text" 
//                   value={slug}
//                   onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
//                   placeholder="custom-slug"
//                   className="bg-transparent border-none outline-none text-sm font-semibold flex-1 min-w-0 placeholder:text-slate-300"
//                 />
//                 <div 
//                   className="w-5 flex justify-center ml-2 shrink-0"
//                   title={
//                     isCheckingSlug ? "Checking availability..." : 
//                     isSlugAvailable === true ? "Available!" : 
//                     isSlugAvailable === false ? "Taken" : ""
//                   }
//                 >
//                   {isCheckingSlug ? (
//                     <Loader2 size={14} className="text-slate-400 animate-spin" />
//                   ) : isSlugAvailable === true ? (
//                     <Check size={14} className="text-green-500" />
//                   ) : isSlugAvailable === false ? (
//                     <X size={14} className="text-red-500" />
//                   ) : null}
//                 </div>
//               </div>
//               {isSlugAvailable === false && (
//                 <p className="text-[10px] text-red-500 font-bold">This slug is already taken.</p>
//               )}
//             </div>
//           </section>
          
//           <section className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Template</h3>
// <div className="grid grid-cols-2 gap-3">
//               {['Modern', 'Minimalist', 'Terminal', 'Creative', 'Executive'].map(t => (
//                 <div 
//                   key={t} 
//                   // 👇 UPDATE THE ONCLICK AND CLASSNAME CONDITIONS 👇
//                   onClick={() => {
//                     setCurrentTemplate(t);
//                     onThemeChange(t); // Keep parent in sync if it needs it
//                   }}
//                   className={cn(
//                     "py-3 rounded-lg border-2 flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all relative", 
//                     currentTemplate === t ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50 text-slate-400'
//                   )}
//                 >
//                   {t}
//                   {currentTemplate === t && <Check size={12} className="absolute top-1 right-1" />}
//                 </div>
                
//               ))}
//             </div>
//           </section>

// {/**
//  * 
//  */}
          
//           {/* Form Content Sections... (Kept identical to your original code) */}
//           <section className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Content</h3>
//             <div className="space-y-4">
//               <div className="space-y-1">
//                 <label className="text-[10px] font-bold uppercase text-slate-400">Portfolio Profile Picture</label>
//                   <div className="flex items-center gap-3">
//                   {data.image && (
//                     <div className="shrink-0 size-10 rounded-full border border-border overflow-hidden bg-slate-100 dark:bg-slate-800">
//                       <img 
//                         src={data.image} 
//                         alt="Preview" 
//                         className="w-full h-full object-cover" 
//                       />
//                     </div>
//                   )}
//                   </div>          
//                 <input 
//                   type="file" 
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) {
//                       const reader = new FileReader();
//                       reader.onloadend = () => {
//                         onDataChange({ ...data, image: reader.result as string });
//                       };
//                       reader.readAsDataURL(file);
//                     }
//                   }}
//                   className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
//                 />
//               </div>
              
//               <div className="space-y-1">
//                 <label className="text-[10px] font-bold uppercase text-slate-400">Name</label>
//                 <input 
//                   type="text" 
//                   value={data.name} 
//                   onChange={(e) => updateData('name', e.target.value)}
//                   className="w-full bg-slate-50  dark:bg-slate-800 border border-border rounded-lg px-3 py-2 text-sm"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-[10px] font-bold uppercase text-slate-400">Role</label>
//                 <input 
//                   type="text" 
//                   value={data.role} 
//                   onChange={(e) => updateData('role', e.target.value)}
//                   className="w-full bg-slate-50 dark:bg-slate-800 border border-border rounded-lg px-3 py-2 text-sm"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-[10px] font-bold uppercase text-slate-400">About</label>
//                 <textarea 
//                   value={data.about} 
//                   onChange={(e) => updateData('about', e.target.value)}
//                   className="w-full bg-slate-50 dark:bg-slate-800 border border-border rounded-lg px-3 py-2 text-sm h-24 resize-none"
//                 />
//               </div>
//             </div>
//           </section>

//           <section className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Experience</h3>
//               <Button variant="ghost" className="p-1 h-auto text-primary" onClick={() => {
//                 const newExp = { company: 'New Company', role: 'Role', period: '2024 - Present', desc: 'Description' };
//                 updateData('experience', [...(data.experience || []), newExp]);
//               }}>
//                 <Plus size={14} />
//               </Button>
//             </div>
//             <div className="space-y-4">
//               {data.experience?.map((exp, i) => (
//                 <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-border space-y-3 relative group">
//                   <button 
//                     className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
//                     onClick={() => {
//                       const newExp = [...data.experience];
//                       newExp.splice(i, 1);
//                       updateData('experience', newExp);
//                     }}
//                   >
//                     <X size={14} />
//                   </button>
//                   <input 
//                     type="text" 
//                     value={exp.role} 
//                     onChange={(e) => {
//                       const newExp = [...data.experience];
//                       newExp[i] = { ...exp, role: e.target.value };
//                       updateData('experience', newExp);
//                     }}
//                     placeholder="Role"
//                     className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0"
//                   />
//                   <input 
//                     type="text" 
//                     value={exp.company} 
//                     onChange={(e) => {
//                       const newExp = [...data.experience];
//                       newExp[i] = { ...exp, company: e.target.value };
//                       updateData('experience', newExp);
//                     }}
//                     placeholder="Company"
//                     className="w-full bg-transparent border-none p-0 text-xs text-slate-500 focus:ring-0"
//                   />
//                   <textarea 
//                     value={exp.desc} 
//                     onChange={(e) => {
//                       const newExp = [...data.experience];
//                       newExp[i] = { ...exp, desc: e.target.value };
//                       updateData('experience', newExp);
//                     }}
//                     placeholder="Description"
//                     className="w-full bg-transparent border-none p-0 text-xs text-slate-400 focus:ring-0 resize-none h-12"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Projects</h3>
//               <Button variant="ghost" className="p-1 h-auto text-primary" onClick={() => {
//                 const newProj = { name: 'New Project', desc: 'Description', tech: ['React'] };
//                 updateData('projects', [...(data.projects || []), newProj]);
//               }}>
//                 <Plus size={14} />
//               </Button>
//             </div>
//             <div className="space-y-4">
//               {data.projects?.map((proj, i) => (
//                 <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-border space-y-3 relative group">
//                   <button 
//                     className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
//                     onClick={() => {
//                       const newProj = [...data.projects];
//                       newProj.splice(i, 1);
//                       updateData('projects', newProj);
//                     }}
//                   >
//                     <X size={14} />
//                   </button>
//                   <input 
//                     type="text" 
//                     value={proj.name} 
//                     onChange={(e) => {
//                       const newProj = [...data.projects];
//                       newProj[i] = { ...proj, name: e.target.value };
//                       updateData('projects', newProj);
//                     }}
//                     placeholder="Project Name"
//                     className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0"
//                   />
//                   <textarea 
//                     value={proj.desc} 
//                     onChange={(e) => {
//                       const newProj = [...data.projects];
//                       newProj[i] = { ...proj, desc: e.target.value };
//                       updateData('projects', newProj);
//                     }}
//                     placeholder="Description"
//                     className="w-full bg-transparent border-none p-0 text-xs text-slate-400 focus:ring-0 resize-none h-12"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skills</h3>
//               <Button variant="ghost" className="p-1 h-auto text-primary" onClick={() => {
//                 const skill = prompt('Enter new skill:');
//                 if (skill) updateData('skills', [...(data.skills || []), skill]);
//               }}>
//                 <Plus size={14} />
//               </Button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {data.skills?.map((skill, i) => (
//                 <span key={i} className="group relative px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium border border-border">
//                   {skill}
//                   <button 
//                     className="absolute -top-1 -right-1 size-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                     onClick={() => {
//                       const newSkills = [...data.skills];
//                       newSkills.splice(i, 1);
//                       updateData('skills', newSkills);
//                     }}
//                   >
//                     <X size={10} />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </section>

//           <section className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact</h3>
//             <div className="space-y-3">
//               {['email', 'location', 'github', 'linkedin', 'twitter'].map(field => (
//                 <div key={field} className="space-y-1">
//                   <label className="text-[10px] font-bold uppercase text-slate-400">{field}</label>
//                   <input 
//                     type="text" 
//                     value={(data.contact as any)[field] || ''} 
//                     onChange={(e) => {
//                       const newContact = { ...data.contact, [field]: e.target.value };
//                       updateData('contact', newContact);
//                     }}
//                     className="w-full bg-slate-50 dark:bg-slate-800 border border-border rounded-lg px-3 py-2 text-sm"
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>

//         </div>
//       </aside>

//       {/* 👇 DYNAMIC LIVE PREVIEW SECTION 👇 */}
//       <main className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-100/50 dark:bg-[#09090b] relative">
//         <div className={cn(
//           "w-full max-w-4xl shadow-2xl min-h-[1200px] p-12 md:p-20 space-y-16 transition-all duration-500 relative z-10",
//           styles.wrapper,
//           currentTemplate === 'Minimalist' ? 'rounded-none' : 'rounded-2xl' //
//         )}>


          
//           <header className="flex flex-col md:flex-row items-start md:items-center gap-8">
//             {/* Show uploaded image if available */}
//             {data?.image && (
//               <div className={cn(
//                 "shrink-0 size-32 md:size-40 overflow-hidden shadow-lg", 
//                 selectedTheme === 'Minimalist' ? 'rounded-none' : 'rounded-full',
//                 selectedTheme === 'Terminal' ? 'grayscale opacity-80' : ''
//               )}>
//                 <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
//               </div>
//             )}
            
//             <div className="space-y-4">
//               <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">{data?.name || 'Your Name'}</h1>
//               <p className={cn("text-2xl font-medium", styles.accent)}>{data?.role || 'Your Role'}</p>
//             </div>
//           </header>

//           <section className="space-y-6">
//             {/* <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>About</h2> */}
//             <h2 
//               className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}
              
//             >
//               About
//             </h2>
//             <p className="text-xl leading-relaxed opacity-80">
//               {data?.about || 'Tell the world about yourself...'}
//             </p>
//           </section>

//           <section className="space-y-8">
//             <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>Experience</h2>
//             <div className="space-y-12">
//               {data?.experience?.map((exp, i) => (
//                 <div key={i} className="flex flex-col md:flex-row justify-between items-start gap-4">
//                   <div className="space-y-2">
//                     <h3 className="text-2xl font-bold">{exp.role}</h3>
//                     <p className="opacity-70 font-medium">{exp.company}</p>
//                     <p className="text-sm max-w-2xl opacity-80 leading-relaxed">{exp.desc}</p>
//                   </div>
//                   <span className="text-sm font-bold opacity-50 whitespace-nowrap">{exp.period}</span>
//                 </div>
//               ))}
//               {(!data?.experience || data.experience.length === 0) && <p className="opacity-50">No experience listed.</p>}
//             </div>
//           </section>

//           <section className="space-y-8">
//             <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>Projects</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {data?.projects?.map((proj, i) => (
//                 <div key={i} className={cn("p-8 space-y-4 transition-transform hover:-translate-y-1", styles.card)}>
//                   <h3 className="text-xl font-bold">{proj.name}</h3>
//                   <p className="text-sm opacity-80 leading-relaxed">{proj.desc}</p>
//                   <div className="flex flex-wrap gap-2 pt-4">
//                     {/* {proj.tech?.map(t => (
//                       <span key={t} className={cn("text-[10px] font-bold uppercase tracking-wider px-3 py-1", styles.button)}>{t}</span>
//                     ))} */}
//                     {proj.tech?.map(t => (
//                       <span 
//                         key={t} 
//                         className={cn("text-[10px] font-bold uppercase tracking-wider px-3 py-1", styles.button)}
//                         //style={data?.color ? { backgroundColor: data.color, borderColor: data.color, color: '#fff' } : {}}
//                       >
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//               {(!data?.projects || data.projects.length === 0) && <p className="opacity-50">No projects listed.</p>}
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { ArrowRight, Sliders, Sun, Moon, Check, Plus, X, Loader2, Save, Globe } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useTheme } from '../../contexts/Theme';
import { cn } from '../../lib/utils';
import { PortfolioData } from '../../services/geminiService';
import { templateConfig } from '../../lib/templateConfig';

interface EditorPageProps {
  data: PortfolioData | null;
  theme: string;
  initialSlug: string;
  onThemeChange: (theme: string) => void;
  onDataChange: (data: PortfolioData) => void;
  onSave: (data: PortfolioData, theme: string, status: 'draft' | 'active', slug: string) => void;
  onBack: () => void;
}

export const EditorPage: React.FC<EditorPageProps> = ({ 
  data, 
  theme: selectedTheme, 
  initialSlug,
  onThemeChange, 
  onDataChange,
  onSave,
  onBack
}) => {
  const { theme, toggleTheme } = useTheme();

  const [slug, setSlug] = useState(initialSlug || '');
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(selectedTheme || 'Modern');

  useEffect(() => {
    if (selectedTheme) setCurrentTemplate(selectedTheme);
  }, [selectedTheme]);

  useEffect(() => {
    if (!slug || slug === initialSlug) {
      setIsSlugAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsCheckingSlug(true);
      try {
        const res = await fetch(`/api/slug/check/${slug}`);
        const result = await res.json();
        setIsSlugAvailable(result.available);
      } catch (error) {
        console.error("Error checking slug", error);
      } finally {
        setIsCheckingSlug(false);
      }
    }, 500); 

    return () => clearTimeout(timer);
  }, [slug, initialSlug]);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">No portfolio data found. Please upload a resume first.</p>
          <Button onClick={onBack}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const updateData = (field: keyof PortfolioData, value: any) => {
    onDataChange({ ...data, [field]: value });
  };

  const styles = templateConfig[currentTemplate] || templateConfig['Modern'];

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-80 border-r border-border bg-card flex flex-col overflow-hidden">
        
        <div className="p-4 border-b border-border flex flex-col gap-4 bg-muted/30 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="p-2" onClick={onBack}>
                <ArrowRight className="rotate-180" size={20} />
              </Button>
              <h2 className="font-bold text-foreground">Editor</h2>
            </div>
            <Button variant="ghost" className="p-2 rounded-full text-foreground" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="secondary" 
              className="text-xs font-bold gap-2"
              disabled={isSlugAvailable === false}
              onClick={() => onSave(data, currentTemplate, 'draft', slug || initialSlug)}
            >
              <Save size={14} /> Draft
            </Button>
            <Button 
              className="text-xs font-bold gap-2 bg-green-600 hover:bg-green-700 text-white"
              disabled={isSlugAvailable === false}
              onClick={() => onSave(data, currentTemplate, 'active', slug || initialSlug)}
            >
              <Globe size={14} /> Publish
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Public URL</h3>
            <div className="space-y-2">
              <div className="flex items-center bg-background border border-border rounded-lg px-3 py-2 focus-within:ring-2 ring-primary/20 transition-all">
                <span className="text-muted-foreground text-xs hidden xl:block mr-1">/view/</span>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="custom-slug"
                  className="bg-transparent border-none outline-none text-sm font-semibold flex-1 min-w-0 placeholder:text-muted-foreground/50 text-foreground"
                />
                <div 
                  className="w-5 flex justify-center ml-2 shrink-0"
                  title={
                    isCheckingSlug ? "Checking availability..." : 
                    isSlugAvailable === true ? "Available!" : 
                    isSlugAvailable === false ? "Taken" : ""
                  }
                >
                  {isCheckingSlug ? (
                    <Loader2 size={14} className="text-muted-foreground animate-spin" />
                  ) : isSlugAvailable === true ? (
                    <Check size={14} className="text-green-500" />
                  ) : isSlugAvailable === false ? (
                    <X size={14} className="text-red-500" />
                  ) : null}
                </div>
              </div>
              {isSlugAvailable === false && (
                <p className="text-[10px] text-red-500 font-bold">This slug is already taken.</p>
              )}
            </div>
          </section>
          
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Template</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Modern', 'Minimalist', 'Terminal', 'Creative', 'Executive','Snow', 'Journal', 'Frost', 'Paper'].map(t => (
                <div 
                  key={t} 
                  onClick={() => {
                    setCurrentTemplate(t);
                    onThemeChange(t);
                  }}
                  className={cn(
                    "py-3 rounded-lg border-2 flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all relative", 
                    currentTemplate === t ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50 text-muted-foreground'
                  )}
                >
                  {t}
                  {currentTemplate === t && <Check size={12} className="absolute top-1 right-1" />}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Content</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-muted-foreground">Portfolio Profile Picture</label>
                  <div className="flex items-center gap-3">
                  {data.image && (
                    <div className="shrink-0 size-10 rounded-full border border-border overflow-hidden bg-background">
                      <img 
                        src={data.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                  </div>          
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        onDataChange({ ...data, image: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full text-xs text-muted-foreground file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-muted-foreground">Name</label>
                <input 
                  type="text" 
                  value={data.name} 
                  onChange={(e) => updateData('name', e.target.value)}
                  className="w-full bg-background text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-muted-foreground">Role</label>
                <input 
                  type="text" 
                  value={data.role} 
                  onChange={(e) => updateData('role', e.target.value)}
                  className="w-full bg-background text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-muted-foreground">About</label>
                <textarea 
                  value={data.about} 
                  onChange={(e) => updateData('about', e.target.value)}
                  className="w-full bg-background text-foreground border border-border rounded-lg px-3 py-2 text-sm h-24 resize-none focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Experience</h3>
              <Button variant="ghost" className="p-1 h-auto text-primary" onClick={() => {
                const newExp = { company: 'New Company', role: 'Role', period: '2024 - Present', desc: 'Description' };
                updateData('experience', [...(data.experience || []), newExp]);
              }}>
                <Plus size={14} />
              </Button>
            </div>
            <div className="space-y-4">
              {data.experience?.map((exp, i) => (
                <div key={i} className="p-3 rounded-xl bg-background border border-border space-y-3 relative group focus-within:ring-2 ring-primary/20 transition-all">
                  <button 
                    className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const newExp = [...data.experience];
                      newExp.splice(i, 1);
                      updateData('experience', newExp);
                    }}
                  >
                    <X size={14} />
                  </button>
                  <input 
                    type="text" 
                    value={exp.role} 
                    onChange={(e) => {
                      const newExp = [...data.experience];
                      newExp[i] = { ...exp, role: e.target.value };
                      updateData('experience', newExp);
                    }}
                    placeholder="Role"
                    className="w-full bg-transparent border-none p-0 text-sm font-bold text-foreground focus:ring-0 placeholder:text-muted-foreground/50 outline-none"
                  />
                  <input 
                    type="text" 
                    value={exp.company} 
                    onChange={(e) => {
                      const newExp = [...data.experience];
                      newExp[i] = { ...exp, company: e.target.value };
                      updateData('experience', newExp);
                    }}
                    placeholder="Company"
                    className="w-full bg-transparent border-none p-0 text-xs text-muted-foreground focus:ring-0 placeholder:text-muted-foreground/50 outline-none"
                  />
                  <textarea 
                    value={exp.desc} 
                    onChange={(e) => {
                      const newExp = [...data.experience];
                      newExp[i] = { ...exp, desc: e.target.value };
                      updateData('experience', newExp);
                    }}
                    placeholder="Description"
                    className="w-full bg-transparent border-none p-0 text-xs text-muted-foreground focus:ring-0 resize-none h-12 placeholder:text-muted-foreground/50 outline-none"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Projects</h3>
              <Button variant="ghost" className="p-1 h-auto text-primary" onClick={() => {
                const newProj = { name: 'New Project', desc: 'Description', tech: ['React'] };
                updateData('projects', [...(data.projects || []), newProj]);
              }}>
                <Plus size={14} />
              </Button>
            </div>
            <div className="space-y-4">
              {data.projects?.map((proj, i) => (
                <div key={i} className="p-3 rounded-xl bg-background border border-border space-y-3 relative group focus-within:ring-2 ring-primary/20 transition-all">
                  <button 
                    className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const newProj = [...data.projects];
                      newProj.splice(i, 1);
                      updateData('projects', newProj);
                    }}
                  >
                    <X size={14} />
                  </button>
                  <input 
                    type="text" 
                    value={proj.name} 
                    onChange={(e) => {
                      const newProj = [...data.projects];
                      newProj[i] = { ...proj, name: e.target.value };
                      updateData('projects', newProj);
                    }}
                    placeholder="Project Name"
                    className="w-full bg-transparent border-none p-0 text-sm font-bold text-foreground focus:ring-0 placeholder:text-muted-foreground/50 outline-none"
                  />
                  <textarea 
                    value={proj.desc} 
                    onChange={(e) => {
                      const newProj = [...data.projects];
                      newProj[i] = { ...proj, desc: e.target.value };
                      updateData('projects', newProj);
                    }}
                    placeholder="Description"
                    className="w-full bg-transparent border-none p-0 text-xs text-muted-foreground focus:ring-0 resize-none h-12 placeholder:text-muted-foreground/50 outline-none"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Skills</h3>
              <Button variant="ghost" className="p-1 h-auto text-primary" onClick={() => {
                const skill = prompt('Enter new skill:');
                if (skill) updateData('skills', [...(data.skills || []), skill]);
              }}>
                <Plus size={14} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill, i) => (
                <span key={i} className="group relative px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium border border-border">
                  {skill}
                  <button 
                    className="absolute -top-1 -right-1 size-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const newSkills = [...data.skills];
                      newSkills.splice(i, 1);
                      updateData('skills', newSkills);
                    }}
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Contact</h3>
            <div className="space-y-3">
              {['email', 'location', 'github', 'linkedin', 'twitter'].map(field => (
                <div key={field} className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground">{field}</label>
                  <input 
                    type="text" 
                    value={(data.contact as any)[field] || ''} 
                    onChange={(e) => {
                      const newContact = { ...data.contact, [field]: e.target.value };
                      updateData('contact', newContact);
                    }}
                    className="w-full bg-background text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              ))}
            </div>
          </section>

        </div>
      </aside>

      {/* 👇 DYNAMIC LIVE PREVIEW SECTION 👇 */}
      <main className="flex-1 overflow-y-auto p-4 md:p-12 flex justify-center bg-secondary/30 dark:bg-black relative">
        <div className={cn(
          "w-full max-w-4xl shadow-2xl min-h-[1200px] p-12 md:p-20 space-y-16 transition-all duration-500 relative z-10",
          styles.wrapper,
          currentTemplate === 'Minimalist' ? 'rounded-none border border-border/50' : 'rounded-2xl border border-border/20'
        )}>
          
          <header className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Show uploaded image if available */}
            {data?.image && (
              <div className={cn(
                "shrink-0 size-32 md:size-40 overflow-hidden shadow-lg", 
                selectedTheme === 'Minimalist' ? 'rounded-none' : 'rounded-full',
                selectedTheme === 'Terminal' ? 'grayscale opacity-80' : ''
              )}>
                <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">{data?.name || 'Your Name'}</h1>
              <p className={cn("text-2xl font-medium", styles.accent)}>{data?.role || 'Your Role'}</p>
            </div>
          </header>

          <section className="space-y-6">
            <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>About</h2>
            <p className="text-xl leading-relaxed opacity-80">
              {data?.about || 'Tell the world about yourself...'}
            </p>
          </section>

          <section className="space-y-8">
            <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>Experience</h2>
            <div className="space-y-12">
              {data?.experience?.map((exp, i) => (
                <div key={i} className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <p className="opacity-70 font-medium">{exp.company}</p>
                    <p className="text-sm max-w-2xl opacity-80 leading-relaxed">{exp.desc}</p>
                  </div>
                  <span className="text-sm font-bold opacity-50 whitespace-nowrap">{exp.period}</span>
                </div>
              ))}
              {(!data?.experience || data.experience.length === 0) && <p className="opacity-50">No experience listed.</p>}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data?.projects?.map((proj, i) => (
                <div key={i} className={cn("p-8 space-y-4 transition-transform hover:-translate-y-1", styles.card)}>
                  <h3 className="text-xl font-bold">{proj.name}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {proj.tech?.map(t => (
                      <span 
                        key={t} 
                        className={cn("text-[10px] font-bold uppercase tracking-wider px-3 py-1", styles.button)}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {(!data?.projects || data.projects.length === 0) && <p className="opacity-50">No projects listed.</p>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
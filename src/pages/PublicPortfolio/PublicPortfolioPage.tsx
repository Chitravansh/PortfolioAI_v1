// import React from "react";
// import {
//   ArrowLeft,
//   Globe,
//   Mail,
//   MapPin,
//   Briefcase,
//   GraduationCap,
//   Github,
//   Linkedin,
//   Twitter,
//   Sun, // 👈 New
//   Moon,
// } from "lucide-react";
// import { Button } from "../../components/ui/Button";
// import { Card } from "../../components/ui/Card";
// import { PortfolioData } from "../../services/geminiService";
// import { cn } from "../../lib/utils";
// import { useTheme } from "../../contexts/Theme";

// interface PublicPortfolioPageProps {
//   data: PortfolioData | null;
//   theme: string;
//   onBack: () => void;
// }

// export const PublicPortfolioPage: React.FC<PublicPortfolioPageProps> = ({
//   data,
//   theme: selectedTheme,
//   onBack,
// }) => {
//   const { theme, toggleTheme } = useTheme();

//   if (!data) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-background">
//         <div className="text-center space-y-4">
//           <p className="text-slate-500">No portfolio data found.</p>
//           <Button onClick={onBack}>Back to Dashboard</Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={cn(
//         "min-h-screen bg-background text-foreground transition-all",
//         "print:bg-white print:text-black",
//         selectedTheme === "Minimalist" && "font-sans",
//         selectedTheme === "Creative" && "font-display",
//         selectedTheme === "Classic" && "font-serif",
//       )}
//     >
//       <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex justify-between items-center print:hidden">
//         <Button variant="ghost" onClick={onBack} className="gap-2">
//           <ArrowLeft size={18} /> Back to Dashboard
//         </Button>
//         <div className="flex items-center gap-4">
//           {/* 👇 Theme Toggle Button */}
//           <Button
//             variant="ghost"
//             className="p-2 rounded-full"
//             onClick={toggleTheme}
//           >
//             {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//           </Button>

//           <Button
//             variant="secondary"
//             className="text-xs py-2"
//             onClick={() => window.print()}
//           >
//             Download Resume
//           </Button>
//           <Button
//             className="text-xs py-2"
//             onClick={() => {
//               window.location.href = `mailto:${data.contact.email}?subject=Interested in working together! (via PortfoliAI)`;
//             }}
//           >
//             Hire Me
//           </Button>
//         </div>
//       </nav>

//       <main
//         className={cn(
//           "pt-32 pb-20 px-6 mx-auto space-y-24 print:pt-8 print:pb-0 print:space-y-8 print:px-0",
//           selectedTheme === "Minimalist" ? "max-w-3xl" : "max-w-5xl",
//         )}
//       >
//         {/* Hero */}
//         <section className="text-center space-y-6 print:space-y-3">
//           <div className="size-32 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto overflow-hidden border-4 border-card shadow-xl">
// <img
//               src={data.image || `https://ui-avatars.com/api/?name=${data.name}&background=random&size=150`}
//               alt={data.name}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="space-y-2">
//             <h1
//               className={cn(
//                 "font-black tracking-tight",
//                 selectedTheme === "Minimalist" ? "text-4xl" : "text-5xl",
//               )}
//             >
//               {data.name}
//             </h1>
//             <p className="text-xl text-primary font-bold">{data.role}</p>
//           </div>
//           <div className="flex justify-center gap-4 text-slate-500 dark:text-slate-400">
//             {data.contact.github && (
//               <a
//                 href={
//                   data.contact.github.startsWith("http")
//                     ? data.contact.github
//                     : `https://${data.contact.github}`
//                 }
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-primary transition-colors"
//               >
//                 <Github size={20} />
//               </a>
//             )}
//             {data.contact.linkedin && (
//               <a
//                 href={
//                   data.contact.linkedin.startsWith("http")
//                     ? data.contact.github
//                     : `https://${data.contact.linkedin}`
//                 }
//                 target="_blank"
//                 rel=" noopener noreferrer"
//                 className="hover:text-primary transition-colors"
//               >
//                 <Linkedin size={20} />
//               </a>
//             )}
//             {data.contact.twitter && (
//               <a
//                 href={
//                   data.contact.twitter.startsWith("http")
//                     ? data.contact.github
//                     : `https://${data.contact.twitter}`
//                 }
//                 target="_blank"
//                 rel=" noopener noreferrer"
//                 className="hover:text-primary transition-colors"
//               >
//                 <Twitter size={20} />
//               </a>
//             )}
//           </div>
//         </section>

//         {/* About */}
//         <section className="space-y-8">
//           <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary text-center">
//             About
//           </h2>
//           <p
//             className={cn(
//               "text-center text-slate-600 dark:text-slate-400 leading-relaxed mx-auto",
//               selectedTheme === "Minimalist" ? "text-lg" : "text-2xl max-w-3xl",
//             )}
//           >
//             {data.about}
//           </p>
//         </section>

//         {/* Experience */}
//         <section className="space-y-12 print:space-y-4">
//           <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
//             Experience
//           </h2>
//           <div className="space-y-8">
//             {data.experience.map((exp, i) => (
//               <Card key={i} className="p-8 hover:shadow-lg transition-shadow">
//                 <div className="flex flex-col md:flex-row justify-between gap-4">
//                   <div className="space-y-2">
//                     <h3 className="text-xl font-bold">{exp.role}</h3>
//                     <p className="text-primary font-bold flex items-center gap-2">
//                       <Briefcase size={16} /> {exp.company}
//                     </p>
//                     <p className="text-slate-600 dark:text-slate-400">
//                       {exp.desc}
//                     </p>
//                   </div>
//                   <span className="text-sm font-bold text-slate-800 dark:text-slate-400 px-3 py-1 rounded-full h-fit">
//                     {exp.period}
//                   </span>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* Projects */}
//         <section className="space-y-12">
//           <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
//             Featured Projects
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {data.projects.map((proj, i) => (
//               <Card key={i} className="overflow-hidden group">
//                 {/* <div className="aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
//                   <img
//                     src={`https://picsum.photos/seed/${proj.name}/800/450`}
//                     alt={proj.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                 </div> */}
//                 <div className="p-6 space-y-4">
//                   <h3 className="text-xl font-bold">{proj.name}</h3>
//                   <p className="text-slate-600 dark:text-slate-400">
//                     {proj.desc}
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {proj.tech.map((t) => (
//                       <span
//                         key={t}
//                         className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded"
//                       >
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* Contact */}
//         <section className="space-y-12">
//           <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary text-center print:hidden">
//             Get In Touch
//           </h2>
//           <Card className="p-12 text-center space-y-8 max-w-2xl mx-auto">
//             <p className="text-xl text-slate-600 dark:text-slate-400">
//               Interested in working together? Let's have a chat about your next
//               project.
//             </p>
//             <div className="flex flex-col md:flex-row justify-center gap-8">
//               <div className="flex items-center gap-3 justify-center">
//                 <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
//                   <Mail size={20} />
//                 </div>
//                 <span className="font-bold">{data.contact.email}</span>
//               </div>
//               <div className="flex items-center gap-3 justify-center">
//                 <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
//                   <MapPin size={20} />
//                 </div>
//                 <span className="font-bold">{data.contact.location}</span>
//               </div>
//             </div>
//             <Button
//               className="w-full h-14 text-lg print:hidden"
//               onClick={() => {
//                 window.location.href = `mailto:${data.contact.email}?subject=Interested in Having Conversation (via PortfoliAI)`;
//               }}
//             >
//               Send a Message
//             </Button>
//           </Card>
//         </section>
//       </main>

//       <footer className="py-10 text-center border-t border-border text-slate-400 text-sm">
//         <p>
//           © {new Date().getFullYear()} {data.name}. Built with PortfoliAI.
//         </p>
//       </footer>
//     </div>
//   );
// };



/**======================================================
 *                   Version 3
 ========================================================*/


// import React from "react";
// import {
//   ArrowLeft,
//   Globe,
//   Mail,
//   MapPin,
//   Briefcase,
//   GraduationCap,
//   Github,
//   Linkedin,
//   Twitter,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { Button } from "../../components/ui/Button";
// import { PortfolioData } from "../../services/geminiService";
// import { cn } from "../../lib/utils";
// import { useTheme } from "../../contexts/Theme";
// import { templateConfig } from "../../lib/templateConfig";

// interface PublicPortfolioPageProps {
//   data: PortfolioData | null;
//   theme: string;
//   onBack: () => void;
// }

// export const PublicPortfolioPage: React.FC<PublicPortfolioPageProps> = ({
//   data,
//   theme: selectedTheme,
//   onBack,
// }) => {
//   const { theme, toggleTheme } = useTheme();

//   if (!data) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-background">
//         <div className="text-center space-y-4">
//           <p className="text-muted-foreground">No portfolio data found.</p>
//           <Button onClick={onBack}>Back to Dashboard</Button>
//         </div>
//       </div>
//     );
//   }

//   // 👇 Grab the dynamic styles for the selected template
//   const styles = templateConfig[selectedTheme] || templateConfig['Modern'];

//   return (
//     <div
//       className={cn(
//         "min-h-screen transition-all duration-500",
//         "print:bg-white print:text-black",
//         styles.wrapper // 👈 Applies the template's fonts, backgrounds, and text colors globally!
//       )}
//     >
//       <nav className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-md border-b border-border/50 px-6 py-4 flex justify-between items-center print:hidden">
//         <Button variant="ghost" onClick={onBack} className="gap-2">
//           <ArrowLeft size={18} /> Back to Dashboard
//         </Button>
//         <div className="flex items-center gap-4">
//           <Button
//             variant="ghost"
//             className="p-2 rounded-full"
//             onClick={toggleTheme}
//           >
//             {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//           </Button>

//           <Button
//             variant="secondary"
//             className="text-xs py-2 hidden sm:flex"
//             onClick={() => window.print()}
//           >
//             Download Resume
//           </Button>
//           <Button
//             className="text-xs py-2"
//             onClick={() => {
//               window.location.href = `mailto:${data.contact.email}?subject=Interested in working together! (via PortfoliAI)`;
//             }}
//           >
//             Hire Me
//           </Button>
//         </div>
//       </nav>

//       <main
//         className={cn(
//           "pt-32 pb-20 px-6 mx-auto space-y-24 print:pt-8 print:pb-0 print:space-y-12 print:px-0 relative z-10",
//           selectedTheme === "Minimalist" ? "max-w-3xl" : "max-w-5xl",
//         )}
//       >
//         {/* Hero Section */}
//         <section className="text-center space-y-6 print:space-y-3">
//           <div className={cn(
//             "size-32 md:size-40 mx-auto overflow-hidden shadow-xl border-4 border-background/50 bg-foreground/5",
//             selectedTheme === "Minimalist" ? "rounded-none" : "rounded-full",
//             selectedTheme === "Terminal" ? "grayscale opacity-80 border-green-500/30" : ""
//           )}>
//             <img
//               src={data.image || `https://ui-avatars.com/api/?name=${data.name}&background=random&size=150`}
//               alt={data.name}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="space-y-3">
//             <h1 className="font-black tracking-tight text-5xl md:text-7xl">
//               {data.name}
//             </h1>
//             <p className={cn("text-xl md:text-2xl font-bold", styles.accent)}>{data.role}</p>
//           </div>
          
//           <div className="flex justify-center gap-6 opacity-70">
//             {data.contact.github && (
//               <a
//                 href={data.contact.github.startsWith("http") ? data.contact.github : `https://${data.contact.github}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={cn("hover:opacity-100 transition-opacity hover:scale-110", styles.accent)}
//               >
//                 <Github size={24} />
//               </a>
//             )}
//             {data.contact.linkedin && (
//               <a
//                 href={data.contact.linkedin.startsWith("http") ? data.contact.linkedin : `https://${data.contact.linkedin}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={cn("hover:opacity-100 transition-opacity hover:scale-110", styles.accent)}
//               >
//                 <Linkedin size={24} />
//               </a>
//             )}
//             {data.contact.twitter && (
//               <a
//                 href={data.contact.twitter.startsWith("http") ? data.contact.twitter : `https://${data.contact.twitter}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={cn("hover:opacity-100 transition-opacity hover:scale-110", styles.accent)}
//               >
//                 <Twitter size={24} />
//               </a>
//             )}
//           </div>
//         </section>

//         {/* About */}
//         <section className="space-y-8">
//           <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em] text-center", styles.accent)}>
//             About
//           </h2>
//           <p
//             className={cn(
//               "text-center opacity-80 leading-relaxed mx-auto",
//               selectedTheme === "Minimalist" ? "text-lg" : "text-xl md:text-2xl max-w-4xl",
//             )}
//           >
//             {data.about}
//           </p>
//         </section>

//         {/* Skills - New Section using GraduationCap */}
//         {data.skills && data.skills.length > 0 && (
//           <section className="space-y-8">
//             <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2", styles.accent)}>
//               <GraduationCap size={18} /> Core Competencies
//             </h2>
//             <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
//               {data.skills.map((skill) => (
//                 <span key={skill} className={cn("px-5 py-2 text-sm font-bold tracking-wide", styles.card)}>
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Experience */}
//         <section className="space-y-12 print:space-y-6">
//           <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>
//             Experience
//           </h2>
//           <div className="space-y-6">
//             {data.experience?.map((exp, i) => (
//               <div key={i} className={cn("p-8 hover:-translate-y-1 transition-transform duration-300", styles.card)}>
//                 <div className="flex flex-col md:flex-row justify-between gap-4">
//                   <div className="space-y-3">
//                     <h3 className="text-2xl font-bold">{exp.role}</h3>
//                     <p className={cn("font-bold flex items-center gap-2", styles.accent)}>
//                       <Briefcase size={16} /> {exp.company}
//                     </p>
//                     <p className="opacity-80 leading-relaxed max-w-3xl pt-2">
//                       {exp.desc}
//                     </p>
//                   </div>
//                   <span className="text-sm font-bold opacity-50 px-3 py-1 h-fit whitespace-nowrap">
//                     {exp.period}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Projects */}
//         <section className="space-y-12 print:space-y-8">
//           <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>
//             Featured Projects
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {data.projects?.map((proj, i) => (
//               <div key={i} className={cn("p-8 space-y-5 flex flex-col hover:-translate-y-1 transition-transform duration-300", styles.card)}>
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-2xl font-bold">{proj.name}</h3>
//                   {/* 👇 Added Globe icon for web projects 👇 */}
//                   <Globe size={20} className="opacity-30" />
//                 </div>
//                 <p className="opacity-80 leading-relaxed flex-1">
//                   {proj.desc}
//                 </p>
//                 <div className="flex flex-wrap gap-2 pt-4 border-t border-foreground/10">
//                   {proj.tech?.map((t) => (
//                     <span
//                       key={t}
//                       className={cn("text-[10px] font-bold uppercase tracking-wider px-3 py-1", styles.button)}
//                     >
//                       {t}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Contact */}
//         <section className="space-y-12 pb-20">
//           <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em] text-center print:hidden", styles.accent)}>
//             Get In Touch
//           </h2>
//           <div className={cn("p-12 text-center space-y-10 max-w-2xl mx-auto", styles.card)}>
//             <p className="text-xl md:text-2xl opacity-80 leading-relaxed">
//               Interested in working together? Let's have a chat about your next project.
//             </p>
//             <div className="flex flex-col md:flex-row justify-center gap-8 text-lg">
//               <div className="flex items-center gap-3 justify-center">
//                 <div className={cn("size-12 rounded-full flex items-center justify-center", styles.button)}>
//                   <Mail size={20} />
//                 </div>
//                 <span className="font-bold opacity-90">{data.contact.email}</span>
//               </div>
//               <div className="flex items-center gap-3 justify-center">
//                 <div className={cn("size-12 rounded-full flex items-center justify-center", styles.button)}>
//                   <MapPin size={20} />
//                 </div>
//                 <span className="font-bold opacity-90">{data.contact.location}</span>
//               </div>
//             </div>
//             <button
//               className={cn("w-full py-4 text-lg font-bold print:hidden shadow-lg", styles.button)}
//               onClick={() => {
//                 window.location.href = `mailto:${data.contact.email}?subject=Interested in Having Conversation (via PortfoliAI)`;
//               }}
//             >
//               Send a Message
//             </button>
//           </div>
//         </section>
//       </main>

//       <footer className="py-10 text-center opacity-50 text-sm pb-12 font-medium print:hidden">
//         <p>
//           © {new Date().getFullYear()} {data.name}. Built with PortfoliAI.
//         </p>
//       </footer>
//     </div>
//   );
// };

/**==================================================
 *  Version 4
===================================================== */

// import React from "react";
// import {
//   ArrowLeft,
//   Globe,
//   Mail,
//   MapPin,
//   Briefcase,
//   GraduationCap,
//   Github,
//   Linkedin,
//   Twitter,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { Button } from "../../components/ui/Button"; // Kept only for the "No data found" fallback
// import { PortfolioData } from "../../services/geminiService";
// import { cn } from "../../lib/utils";
// import { useTheme } from "../../contexts/Theme";
// import { templateConfig } from "../../lib/templateConfig";

// interface PublicPortfolioPageProps {
//   data: PortfolioData | null;
//   theme: string;
//   onBack: () => void;
// }

// export const PublicPortfolioPage: React.FC<PublicPortfolioPageProps> = ({
//   data,
//   theme: selectedTheme,
//   onBack,
// }) => {
//   const { theme, toggleTheme } = useTheme();

//   if (!data) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-background">
//         <div className="text-center space-y-4">
//           <p className="text-muted-foreground">No portfolio data found.</p>
//           <Button onClick={onBack}>Back to Dashboard</Button>
//         </div>
//       </div>
//     );
//   }

//   // 👇 Grab the dynamic styles for the selected template
//   const styles = templateConfig[selectedTheme] || templateConfig['Modern'];

//   return (
//     <div
//       className={cn(
//         "min-h-screen transition-all duration-500",
//         "print:bg-white print:text-black",
//         styles.wrapper // 👈 Applies the template's fonts, backgrounds, and text colors globally!
//       )}
//     >
//       {/* 👇 OPTIMIZED NAVBAR: Inherits template colors using `text-inherit` and `border-current` */}
//       <nav className="fixed top-0 w-full z-50 bg-inherit backdrop-blur-md border-b border-current/10 px-6 py-4 flex justify-between items-center print:hidden">
//         <button onClick={onBack} className="flex items-center gap-2 hover:opacity-70 transition-opacity font-medium text-inherit">
//           <ArrowLeft size={18} /> Back to Dashboard
//         </button>
        
//         <div className="flex items-center gap-4">
//           <button
//             className="p-2 rounded-full hover:bg-current/10 transition-colors text-inherit"
//             onClick={toggleTheme}
//           >
//             {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//           </button>

//           <button
//             className="px-4 py-2 text-xs font-bold border border-current/30 hover:bg-current/10 transition-colors rounded-md hidden sm:block text-inherit"
//             onClick={() => window.print()}
//           >
//             Download Resume
//           </button>
          
//           {/* 👇 Uses the exact button style from the Template Config! 👇 */}
//           <button
//             className={cn("px-4 py-2 text-xs font-bold transition-all", styles.button)}
//             onClick={() => {
//               window.location.href = `mailto:${data.contact.email}?subject=Interested in working together! (via PortfoliAI)`;
//             }}
//           >
//             Hire Me
//           </button>
//         </div>
//       </nav>

//       <main
//         className={cn(
//           "pt-32 pb-20 px-6 mx-auto space-y-24 print:pt-8 print:pb-0 print:space-y-12 print:px-0 relative z-10",
//           selectedTheme === "Minimalist" ? "max-w-3xl" : "max-w-5xl",
//         )}
//       >
//         {/* Hero Section */}
//         <section className="text-center space-y-6 print:space-y-3">
//           <div className={cn(
//             "size-32 md:size-40 mx-auto overflow-hidden shadow-xl border-4 border-current/10 bg-current/5",
//             selectedTheme === "Minimalist" ? "rounded-none" : "rounded-full",
//             selectedTheme === "Terminal" ? "grayscale opacity-80" : ""
//           )}>
//             <img
//               src={data.image || `https://ui-avatars.com/api/?name=${data.name}&background=random&size=150`}
//               alt={data.name}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="space-y-3">
//             <h1 className="font-black tracking-tight text-5xl md:text-7xl">
//               {data.name}
//             </h1>
//             <p className={cn("text-xl md:text-2xl font-bold", styles.accent)}>{data.role}</p>
//           </div>
          
//           <div className="flex justify-center gap-6 opacity-70">
//             {data.contact.github && (
//               <a
//                 href={data.contact.github.startsWith("http") ? data.contact.github : `https://${data.contact.github}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={cn("hover:opacity-100 transition-opacity hover:scale-110", styles.accent)}
//               >
//                 <Github size={24} />
//               </a>
//             )}
//             {data.contact.linkedin && (
//               <a
//                 href={data.contact.linkedin.startsWith("http") ? data.contact.linkedin : `https://${data.contact.linkedin}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={cn("hover:opacity-100 transition-opacity hover:scale-110", styles.accent)}
//               >
//                 <Linkedin size={24} />
//               </a>
//             )}
//             {data.contact.twitter && (
//               <a
//                 href={data.contact.twitter.startsWith("http") ? data.contact.twitter : `https://${data.contact.twitter}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={cn("hover:opacity-100 transition-opacity hover:scale-110", styles.accent)}
//               >
//                 <Twitter size={24} />
//               </a>
//             )}
//           </div>
//         </section>

//         {/* About */}
//         <section className="space-y-8">
//           <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em] text-center", styles.accent)}>
//             About
//           </h2>
//           <p
//             className={cn(
//               "text-center opacity-80 leading-relaxed mx-auto",
//               selectedTheme === "Minimalist" ? "text-lg" : "text-xl md:text-2xl max-w-4xl",
//             )}
//           >
//             {data.about}
//           </p>
//         </section>

//         {/* Skills - New Section using GraduationCap */}
//         {data.skills && data.skills.length > 0 && (
//           <section className="space-y-8">
//             <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2", styles.accent)}>
//               <GraduationCap size={18} /> Core Competencies
//             </h2>
//             <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
//               {data.skills.map((skill) => (
//                 <span key={skill} className={cn("px-5 py-2 text-sm font-bold tracking-wide", styles.card)}>
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Experience */}
//         <section className="space-y-12 print:space-y-6">
//           <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>
//             Experience
//           </h2>
//           <div className="space-y-6">
//             {data.experience?.map((exp, i) => (
//               <div key={i} className={cn("p-8 hover:-translate-y-1 transition-transform duration-300", styles.card)}>
//                 <div className="flex flex-col md:flex-row justify-between gap-4">
//                   <div className="space-y-3">
//                     <h3 className="text-2xl font-bold">{exp.role}</h3>
//                     <p className={cn("font-bold flex items-center gap-2", styles.accent)}>
//                       <Briefcase size={16} /> {exp.company}
//                     </p>
//                     <p className="opacity-80 leading-relaxed max-w-3xl pt-2">
//                       {exp.desc}
//                     </p>
//                   </div>
//                   <span className="text-sm font-bold opacity-50 px-3 py-1 h-fit whitespace-nowrap">
//                     {exp.period}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Projects */}
//         <section className="space-y-12 print:space-y-8">
//           <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>
//             Featured Projects
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {data.projects?.map((proj, i) => (
//               <div key={i} className={cn("p-8 space-y-5 flex flex-col hover:-translate-y-1 transition-transform duration-300", styles.card)}>
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-2xl font-bold">{proj.name}</h3>
//                   <Globe size={20} className="opacity-30" />
//                 </div>
//                 <p className="opacity-80 leading-relaxed flex-1">
//                   {proj.desc}
//                 </p>
//                 <div className="flex flex-wrap gap-2 pt-4 border-t border-current/10 mt-auto">
//                   {proj.tech?.map((t) => (
//                     <span
//                       key={t}
//                       className={cn("text-[10px] font-bold uppercase tracking-wider px-3 py-1 mt-4", styles.button)}
//                     >
//                       {t}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Contact */}
//         <section className="space-y-12 pb-20">
//           <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em] text-center print:hidden", styles.accent)}>
//             Get In Touch
//           </h2>
//           <div className={cn("p-12 text-center space-y-10 max-w-2xl mx-auto", styles.card)}>
//             <p className="text-xl md:text-2xl opacity-80 leading-relaxed">
//               Interested in working together? Let's have a chat about your next project.
//             </p>
//             <div className="flex flex-col md:flex-row justify-center gap-8 text-lg">
//               <div className="flex items-center gap-3 justify-center">
//                 <div className={cn("size-12 rounded-full flex items-center justify-center", styles.button)}>
//                   <Mail size={20} />
//                 </div>
//                 <span className="font-bold opacity-90">{data.contact.email}</span>
//               </div>
//               <div className="flex items-center gap-3 justify-center">
//                 <div className={cn("size-12 rounded-full flex items-center justify-center", styles.button)}>
//                   <MapPin size={20} />
//                 </div>
//                 <span className="font-bold opacity-90">{data.contact.location}</span>
//               </div>
//             </div>
//             {/* 👇 Matching Action Button 👇 */}
//             <button
//               className={cn("w-full py-4 text-lg font-bold print:hidden shadow-lg transition-all hover:-translate-y-1", styles.button)}
//               onClick={() => {
//                 window.location.href = `mailto:${data.contact.email}?subject=Interested in Having Conversation (via PortfoliAI)`;
//               }}
//             >
//               Send a Message
//             </button>
//           </div>
//         </section>
//       </main>

//       {/* Footer using inherited colors */}
//       <footer className="py-10 text-center opacity-50 text-sm pb-12 font-medium print:hidden text-inherit">
//         <p>
//           © {new Date().getFullYear()} {data.name}. Built with PortfoliAI.
//         </p>
//       </footer>
//     </div>
//   );
// };

/**=============================================
 * Version 5
 ===============================================*/

//  import React from "react";
// import {
//   ArrowLeft,
//   Globe,
//   Mail,
//   MapPin,
//   Briefcase,
//   GraduationCap,
//   Github,
//   Linkedin,
//   Twitter,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { Button } from "../../components/ui/Button"; // Kept ONLY for the "No data found" fallback
// import { PortfolioData } from "../../services/geminiService";
// import { cn } from "../../lib/utils";
// import { useTheme } from "../../contexts/Theme";
// import { templateConfig } from "../../lib/templateConfig";

// interface PublicPortfolioPageProps {
//   data: PortfolioData | null;
//   theme: string;
//   onBack: () => void;
// }

// export const PublicPortfolioPage: React.FC<PublicPortfolioPageProps> = ({
//   data,
//   theme: selectedTheme,
//   onBack,
// }) => {
//   const { theme, toggleTheme } = useTheme();

//   if (!data) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-background">
//         <div className="text-center space-y-4">
//           <p className="text-muted-foreground">No portfolio data found.</p>
//           <Button onClick={onBack}>Back to Dashboard</Button>
//         </div>
//       </div>
//     );
//   }

//   // Grab the dynamic styles for the selected template
//   const styles = templateConfig[selectedTheme] || templateConfig['Modern'];

//   return (
//     <div
//       className={cn(
//         "min-h-screen transition-all duration-500",
//         "print:bg-white print:text-black",
//         styles.wrapper // 👈 Controls everything!
//       )}
//     >
//       {/* 👇 OPTIMIZED NAVBAR: Inherits template colors and hides borders beautifully */}
//       <nav className="fixed top-0 w-full z-50 bg-inherit backdrop-blur-md border-b border-current/10 px-6 py-4 flex justify-between items-center print:hidden">
//         <button onClick={onBack} className="flex items-center gap-2 hover:opacity-70 transition-opacity font-medium text-inherit">
//           <ArrowLeft size={18} /> Back to Dashboard
//         </button>
        
//         <div className="flex items-center gap-4">
//           <button
//             className="p-2 rounded-full hover:bg-current/10 transition-colors text-inherit"
//             onClick={toggleTheme}
//           >
//             {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//           </button>

//           <button
//             className="px-4 py-2 text-xs font-bold border border-current/30 hover:bg-current/10 transition-colors rounded-md hidden sm:block text-inherit"
//             onClick={() => window.print()}
//           >
//             Download Resume
//           </button>
          
//           {/* 👇 Uses the EXACT button style from the Template Config! 👇 */}
//           <button
//             className={cn("px-4 py-2 text-xs font-bold transition-all", styles.button)}
//             onClick={() => {
//               window.location.href = `mailto:${data.contact.email}?subject=Interested in working together! (via PortfoliAI)`;
//             }}
//           >
//             Hire Me
//           </button>
//         </div>
//       </nav>

//       <main
//         className={cn(
//           "pt-32 pb-20 px-6 mx-auto space-y-24 print:pt-8 print:pb-0 print:space-y-12 print:px-0 relative z-10",
//           selectedTheme === "Minimalist" ? "max-w-3xl" : "max-w-5xl",
//         )}
//       >
//         <section className="text-center space-y-6 print:space-y-3">
//           <div className={cn(
//             "size-32 md:size-40 mx-auto overflow-hidden shadow-xl border-4 border-current/10 bg-current/5",
//             selectedTheme === "Minimalist" ? "rounded-none" : "rounded-full",
//             selectedTheme === "Terminal" ? "grayscale opacity-80" : ""
//           )}>
//             <img
//               src={data.image || `https://ui-avatars.com/api/?name=${data.name}&background=random&size=150`}
//               alt={data.name}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="space-y-3">
//             <h1 className="font-black tracking-tight text-5xl md:text-7xl">
//               {data.name}
//             </h1>
//             <p className={cn("text-xl md:text-2xl font-bold", styles.accent)}>{data.role}</p>
//           </div>
          
//           <div className="flex justify-center gap-6 opacity-70">
//             {data.contact.github && (
//               <a href={data.contact.github.startsWith("http") ? data.contact.github : `https://${data.contact.github}`} target="_blank" rel="noopener noreferrer" className={cn("hover:opacity-100 transition-opacity hover:scale-110", styles.accent)}>
//                 <Github size={24} />
//               </a>
//             )}
//             {data.contact.linkedin && (
//               <a href={data.contact.linkedin.startsWith("http") ? data.contact.linkedin : `https://${data.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className={cn("hover:opacity-100 transition-opacity hover:scale-110", styles.accent)}>
//                 <Linkedin size={24} />
//               </a>
//             )}
//             {data.contact.twitter && (
//               <a href={data.contact.twitter.startsWith("http") ? data.contact.twitter : `https://${data.contact.twitter}`} target="_blank" rel="noopener noreferrer" className={cn("hover:opacity-100 transition-opacity hover:scale-110", styles.accent)}>
//                 <Twitter size={24} />
//               </a>
//             )}
//           </div>
//         </section>

//         <section className="space-y-8">
//           <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em] text-center", styles.accent)}>About</h2>
//           <p className={cn("text-center opacity-80 leading-relaxed mx-auto", selectedTheme === "Minimalist" ? "text-lg" : "text-xl md:text-2xl max-w-4xl")}>
//             {data.about}
//           </p>
//         </section>

//         {data.skills && data.skills.length > 0 && (
//           <section className="space-y-8">
//             <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2", styles.accent)}>
//               <GraduationCap size={18} /> Core Competencies
//             </h2>
//             <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
//               {data.skills.map((skill) => (
//                 <span key={skill} className={cn("px-5 py-2 text-sm font-bold tracking-wide", styles.card)}>
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </section>
//         )}

//         <section className="space-y-12 print:space-y-6">
//           <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>Experience</h2>
//           <div className="space-y-6">
//             {data.experience?.map((exp, i) => (
//               <div key={i} className={cn("p-8 hover:-translate-y-1 transition-transform duration-300", styles.card)}>
//                 <div className="flex flex-col md:flex-row justify-between gap-4">
//                   <div className="space-y-3">
//                     <h3 className="text-2xl font-bold">{exp.role}</h3>
//                     <p className={cn("font-bold flex items-center gap-2", styles.accent)}>
//                       <Briefcase size={16} /> {exp.company}
//                     </p>
//                     <p className="opacity-80 leading-relaxed max-w-3xl pt-2">{exp.desc}</p>
//                   </div>
//                   <span className="text-sm font-bold opacity-50 px-3 py-1 h-fit whitespace-nowrap">{exp.period}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="space-y-12 print:space-y-8">
//           <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>Featured Projects</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {data.projects?.map((proj, i) => (
//               <div key={i} className={cn("p-8 space-y-5 flex flex-col hover:-translate-y-1 transition-transform duration-300", styles.card)}>
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-2xl font-bold">{proj.name}</h3>
//                   <Globe size={20} className="opacity-30" />
//                 </div>
//                 <p className="opacity-80 leading-relaxed flex-1">{proj.desc}</p>
//                 <div className="flex flex-wrap gap-2 pt-4 border-t border-current/10 mt-auto">
//                   {proj.tech?.map((t) => (
//                     <span key={t} className={cn("text-[10px] font-bold uppercase tracking-wider px-3 py-1 mt-4", styles.button)}>
//                       {t}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="space-y-12 pb-20">
//           <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em] text-center print:hidden", styles.accent)}>Get In Touch</h2>
//           <div className={cn("p-12 text-center space-y-10 max-w-2xl mx-auto", styles.card)}>
//             <p className="text-xl md:text-2xl opacity-80 leading-relaxed">
//               Interested in working together? Let's have a chat about your next project.
//             </p>
//             <div className="flex flex-col md:flex-row justify-center gap-8 text-lg">
//               <div className="flex items-center gap-3 justify-center">
//                 <div className={cn("size-12 rounded-full flex items-center justify-center", styles.button)}>
//                   <Mail size={20} />
//                 </div>
//                 <span className="font-bold opacity-90">{data.contact.email}</span>
//               </div>
//               <div className="flex items-center gap-3 justify-center">
//                 <div className={cn("size-12 rounded-full flex items-center justify-center", styles.button)}>
//                   <MapPin size={20} />
//                 </div>
//                 <span className="font-bold opacity-90">{data.contact.location}</span>
//               </div>
//             </div>
//             <button
//               className={cn("w-full py-4 text-lg font-bold print:hidden shadow-lg transition-all hover:-translate-y-1", styles.button)}
//               onClick={() => { window.location.href = `mailto:${data.contact.email}`; }}
//             >
//               Send a Message
//             </button>
//           </div>
//         </section>
//       </main>

//       <footer className="py-10 text-center opacity-50 text-sm pb-12 font-medium print:hidden text-inherit">
//         <p>© {new Date().getFullYear()} {data.name}. Built with PortfoliAI.</p>
//       </footer>
//     </div>
//   );
// };


/**==================================================
 *         Version 6
 ====================================================*/

 import React from "react";
import {
  ArrowLeft,
  Globe,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Github,
  Linkedin,
  Twitter,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { PortfolioData } from "../../services/geminiService";
import { cn } from "../../lib/utils";
import { useTheme } from "../../contexts/Theme";
import { templateConfig } from "../../lib/templateConfig";

interface PublicPortfolioPageProps {
  data: PortfolioData | null;
  theme: string;
  onBack: () => void;
}

export const PublicPortfolioPage: React.FC<PublicPortfolioPageProps> = ({
  data,
  theme: selectedTheme,
  onBack,
}) => {
  const { theme, toggleTheme } = useTheme();

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">No portfolio data found.</p>
          <Button onClick={onBack}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const styles = templateConfig[selectedTheme] || templateConfig['Modern'];

  return (
    // 👇 THIS IS THE MAGIC FIX: We forcefully wrap the page in the 'dark' class if the theme is dark!
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div
        className={cn(
          "min-h-screen transition-all duration-500",
          "print:bg-white print:text-black",
          styles.wrapper 
        )}
      >
        <nav className="fixed top-0 w-full z-50 bg-inherit backdrop-blur-md border-b border-current/10 px-6 py-4 flex justify-between items-center print:hidden">
          <button onClick={onBack} className="flex items-center gap-2 hover:opacity-70 transition-opacity font-medium text-inherit">
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
          
          <div className="flex items-center gap-4">
            {/* <button
              className="p-2 rounded-full hover:bg-current/10 transition-colors text-inherit"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button> */}

            

            <button
              className="px-4 py-2 text-xs font-bold border border-current/30 hover:bg-current/10 transition-colors rounded-md hidden sm:block text-inherit"
              onClick={() => window.print()}
            >
              Download Resume
            </button>
            
            <button
              className={cn("px-4 py-2 text-xs font-bold transition-all", styles.button)}
              onClick={() => {
                window.location.href = `mailto:${data.contact.email}?subject=Interested in working together! (via PortfoliAI)`;
              }}
            >
              Hire Me
            </button>
          </div>
        </nav>

        <main
          className={cn(
            "pt-32 pb-20 px-6 mx-auto space-y-24 print:pt-8 print:pb-0 print:space-y-12 print:px-0 relative z-10",
            selectedTheme === "Minimalist" ? "max-w-3xl" : "max-w-5xl",
          )}
        >
          {/* Hero Section */}
          <section className="text-center space-y-6 print:space-y-3">
            <div className={cn(
              "size-32 md:size-40 mx-auto overflow-hidden shadow-xl border-4 border-current/10 bg-current/5",
              selectedTheme === "Minimalist" ? "rounded-none" : "rounded-full",
              selectedTheme === "Terminal" ? "grayscale opacity-80" : ""
            )}>
              <img
                src={data.image || `https://ui-avatars.com/api/?name=${data.name}&background=random&size=150`}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <h1 className="font-black tracking-tight text-5xl md:text-7xl">
                {data.name}
              </h1>
              <p className={cn("text-xl md:text-2xl font-bold", styles.accent)}>{data.role}</p>
            </div>
            
            <div className="flex justify-center gap-6 opacity-70">
              {data.contact.github && (
                <a href={data.contact.github.startsWith("http") ? data.contact.github : `https://${data.contact.github}`} target="_blank" rel="noopener noreferrer" className={cn("hover:opacity-100 transition-opacity hover:scale-110", styles.accent)}>
                  <Github size={24} />
                </a>
              )}
              {data.contact.linkedin && (
                <a href={data.contact.linkedin.startsWith("http") ? data.contact.linkedin : `https://${data.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className={cn("hover:opacity-100 transition-opacity hover:scale-110", styles.accent)}>
                  <Linkedin size={24} />
                </a>
              )}
              {data.contact.twitter && (
                <a href={data.contact.twitter.startsWith("http") ? data.contact.twitter : `https://${data.contact.twitter}`} target="_blank" rel="noopener noreferrer" className={cn("hover:opacity-100 transition-opacity hover:scale-110", styles.accent)}>
                  <Twitter size={24} />
                </a>
              )}
            </div>
          </section>

          {/* About */}
          <section className="space-y-8">
            <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em] text-center", styles.accent)}>About</h2>
            <p className={cn("text-center opacity-80 leading-relaxed mx-auto", selectedTheme === "Minimalist" ? "text-lg" : "text-xl md:text-2xl max-w-4xl")}>
              {data.about}
            </p>
          </section>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section className="space-y-8">
              <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2", styles.accent)}>
                <GraduationCap size={18} /> Core Competencies
              </h2>
              <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                {data.skills.map((skill) => (
                  <span key={skill} className={cn("px-5 py-2 text-sm font-bold tracking-wide", styles.card)}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          <section className="space-y-12 print:space-y-6">
            <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>Experience</h2>
            <div className="space-y-6">
              {data.experience?.map((exp, i) => (
                <div key={i} className={cn("p-8 hover:-translate-y-1 transition-transform duration-300", styles.card)}>
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold">{exp.role}</h3>
                      <p className={cn("font-bold flex items-center gap-2", styles.accent)}>
                        <Briefcase size={16} /> {exp.company}
                      </p>
                      <p className="opacity-80 leading-relaxed max-w-3xl pt-2">{exp.desc}</p>
                    </div>
                    <span className="text-sm font-bold opacity-50 px-3 py-1 h-fit whitespace-nowrap">{exp.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="space-y-12 print:space-y-8">
            <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em]", styles.accent)}>Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.projects?.map((proj, i) => (
                <div key={i} className={cn("p-8 space-y-5 flex flex-col hover:-translate-y-1 transition-transform duration-300", styles.card)}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold">{proj.name}</h3>
                    <Globe size={20} className="opacity-30" />
                  </div>
                  <p className="opacity-80 leading-relaxed flex-1">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-current/10 mt-auto">
                    {proj.tech?.map((t) => (
                      <span key={t} className={cn("text-[10px] font-bold uppercase tracking-wider px-3 py-1 mt-4", styles.button)}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="space-y-12 pb-20">
            <h2 className={cn("text-sm font-bold uppercase tracking-[0.2em] text-center print:hidden", styles.accent)}>Get In Touch</h2>
            <div className={cn("p-12 text-center space-y-10 max-w-2xl mx-auto", styles.card)}>
              <p className="text-xl md:text-2xl opacity-80 leading-relaxed">
                Interested in working together? Let's have a chat about your next project.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-8 text-lg">
                <div className="flex items-center gap-3 justify-center">
                  <div className={cn("size-12 rounded-full flex items-center justify-center", styles.button)}>
                    <Mail size={20} />
                  </div>
                  <span className="font-bold opacity-90">{data.contact.email}</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <div className={cn("size-12 rounded-full flex items-center justify-center", styles.button)}>
                    <MapPin size={20} />
                  </div>
                  <span className="font-bold opacity-90">{data.contact.location}</span>
                </div>
              </div>
              <button
                className={cn("w-full py-4 text-lg font-bold print:hidden shadow-lg transition-all hover:-translate-y-1", styles.button)}
                onClick={() => { window.location.href = `mailto:${data.contact.email}`; }}
              >
                Send a Message
              </button>
            </div>
          </section>
        </main>

        <footer className="py-10 text-center opacity-50 text-sm pb-12 font-medium print:hidden text-inherit">
          <p>© {new Date().getFullYear()} {data.name}. Built with PortfoliAI.</p>
        </footer>
      </div>
    </div>
  );
};
// import React from 'react';
// import { Sparkles } from 'lucide-react';
// import { Card } from '../../components/ui/Card';
// import { Button } from '../../components/ui/Button';
// import { cn } from '../../lib/utils';

// export const PORTFOLIO_TEMPLATES = [
//   { id: 'Modern', name: 'Modern', description: 'Clean and balanced with a professional edge. Perfect for most industries.', bg: 'bg-blue-600 dark:bg-blue-800' },
//   { id: 'Minimalist', name: 'Minimalist', description: 'Whitespace-heavy, crisp typography, and zero clutter. Let your work speak.', bg: 'bg-slate-100 dark:bg-slate-800 border-b border-border' },
//   { id: 'Terminal', name: 'Terminal', description: 'Dark mode, monospace fonts, and a command-line aesthetic. Built for devs.', bg: 'bg-zinc-950 border-b border-zinc-800' },
//   { id: 'Creative', name: 'Creative', description: 'Bold colors and dynamic layouts to make your visual work pop.', bg: 'bg-fuchsia-500 dark:bg-fuchsia-700' },
//   { id: 'Executive', name: 'Executive', description: 'Classic serif typography with muted, sophisticated corporate tones.', bg: 'bg-emerald-800 dark:bg-emerald-950' },
// ];

// interface TemplatesPageProps {
//   selectedTemplate: string;
//   onSelect: (templateId: string) => void;
// }

// export const TemplatesPage: React.FC<TemplatesPageProps> = ({ selectedTemplate, onSelect }) => {
//   return (
//     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <div className="mb-8">
//         <h2 className="text-3xl font-black tracking-tight text-foreground">Template Gallery</h2>
//         <p className="text-slate-500 mt-2">Choose a starting layout for your next AI-generated portfolio.</p>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {PORTFOLIO_TEMPLATES.map((tmpl) => (
//           <Card key={tmpl.id} className="overflow-hidden group flex flex-col border border-border bg-card hover:shadow-xl transition-all duration-300">
            
//             {/* Visual Preview Window (CSS Mockup) */}
//             <div className={cn("aspect-video relative p-6 flex flex-col justify-between overflow-hidden", tmpl.bg)}>
//               <div className="w-1/3 h-3 bg-white/20 dark:bg-black/20 rounded-full mb-2 backdrop-blur-sm"></div>
//               <div className="space-y-3 relative z-10">
//                 <div className="w-3/4 h-8 bg-white/40 dark:bg-black/40 rounded-lg backdrop-blur-sm"></div>
//                 <div className="w-1/2 h-3 bg-white/20 dark:bg-black/20 rounded-md backdrop-blur-sm"></div>
//                 <div className="w-2/3 h-3 bg-white/20 dark:bg-black/20 rounded-md backdrop-blur-sm"></div>
//               </div>
//               <div className="mt-4 flex gap-2">
//                 <div className="size-8 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm"></div>
//                 <div className="size-8 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm"></div>
//               </div>

//               {/* Hover Overlay with Button */}
//               <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/40 dark:group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center backdrop-blur-[0px] group-hover:backdrop-blur-sm">
//                 <Button 
//                   variant="white" 
//                   className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 shadow-2xl"
//                   onClick={() => onSelect(tmpl.id)} // 👈 Tells Dashboard which one was clicked
//                 >
//                   <Sparkles size={16} className="mr-2 text-primary" />
//                   Use {tmpl.name}
//                 </Button>
//               </div>
//             </div>

//             {/* Template Info */}
//             <div className="p-5 flex-1 flex flex-col">
//               <h3 className="font-bold text-lg text-foreground flex items-center justify-between">
//                 {tmpl.name}
//                 {selectedTemplate === tmpl.id && (
//                   <span className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded-full">Selected</span>
//                 )}
//               </h3>
//               <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">
//                 {tmpl.description}
//               </p>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };


import React from 'react';
import { Sparkles, Briefcase } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';
import { templateConfig } from '../../lib/templateConfig';

export const PORTFOLIO_TEMPLATES = [
  { id: 'Modern', name: 'Modern', description: 'Clean and balanced with a professional edge. Perfect for most industries.' },
  { id: 'Minimalist', name: 'Minimalist', description: 'Whitespace-heavy, crisp typography, and zero clutter. Let your work speak.' },
  { id: 'Terminal', name: 'Terminal', description: 'Dark mode, monospace fonts, and a command-line aesthetic. Built for devs.' },
  { id: 'Creative', name: 'Creative', description: 'Bold colors and dynamic layouts to make your visual work pop.' },
  { id: 'Executive', name: 'Executive', description: 'Classic serif typography with muted, sophisticated corporate tones.' },
  // 👇 ADD THESE TWO NEW TEMPLATES 👇
  { id: 'Snow', name: 'Snow', description: 'Ultra-clean, pure white aesthetics with soft sky-blue accents. Highly modern.' },
  { id: 'Journal', name: 'Journal', description: 'A crisp, elegant paper-like cream background with sophisticated typography.' },
  { id: 'Frost', name: 'Frost', description: 'A pure, brilliant white aesthetic with sharp slate text. Always bright.' },
  { id: 'Paper', name: 'Paper', description: 'A classic, unyielding white paper background with elegant serif typography.' },
];

interface TemplatesPageProps {
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ selectedTemplate, onSelect }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tight text-foreground">Template Gallery</h2>
        <p className="text-slate-500 mt-2">Choose a starting layout for your next AI-generated portfolio.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PORTFOLIO_TEMPLATES.map((tmpl) => {
          const styles = templateConfig[tmpl.id]; // Grab the CSS for this specific template

          return (
            <Card key={tmpl.id} className="overflow-hidden group flex flex-col border border-border bg-card hover:shadow-xl transition-all duration-300">
              
              {/* Visual Preview Window (Actual Sample!) */}
              <div className="aspect-video relative overflow-hidden border-b border-border">
                
                {/* 👇 The Mini Sample Resume 👇 */}
                <div className={cn("absolute inset-0 p-4 flex flex-col gap-3 text-xs select-none pointer-events-none", styles.wrapper)}>
                  <div className="flex items-center gap-3">
                    <div className={cn("size-10 shrink-0 flex items-center justify-center overflow-hidden", styles.card, tmpl.id === 'Creative' ? 'rounded-full' : '')}>
                      <img src="https://ui-avatars.com/api/?name=Alex+Dev&background=random" alt="avatar" className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div>
                      <div className={cn("font-bold text-sm", styles.accent)}>Alex Developer</div>
                      <div className="opacity-70 text-[10px]">Senior Software Engineer</div>
                    </div>
                  </div>
                  
                  <div className={cn("p-2 px-3 border-transparent", styles.card)}>
                    <div className={cn("font-bold mb-1 text-[10px]", styles.accent)}>About Me</div>
                    <div className="opacity-80 text-[9px] line-clamp-2 leading-relaxed">
                      I build scalable web applications and love creating beautiful user experiences. Specialized in React and Node.js.
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-auto">
                    <div className={cn("px-3 py-1 text-[9px] flex items-center gap-1", styles.button)}>
                      <Briefcase size={10} /> View Projects
                    </div>
                  </div>
                </div>
                {/* 👆 End Mini Sample 👆 */}

                {/* Hover Overlay with Button */}
                <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/40 dark:group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center backdrop-blur-[0px] group-hover:backdrop-blur-sm">
                  <Button 
                    variant="white" 
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 shadow-2xl"
                    onClick={() => onSelect(tmpl.id)}
                  >
                    <Sparkles size={16} className="mr-2 text-primary" />
                    Use {tmpl.name}
                  </Button>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-foreground flex items-center justify-between">
                  {tmpl.name}
                  {selectedTemplate === tmpl.id && (
                    <span className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">Selected</span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">
                  {tmpl.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
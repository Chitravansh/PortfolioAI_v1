import React from 'react';
import { ArrowRight, Sliders, Sun, Moon, Check, Plus, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useTheme } from '../../contexts/Theme';
import { cn } from '../../lib/utils';
import { PortfolioData } from '../../services/geminiService';

interface EditorPageProps {
  data: PortfolioData | null;
  theme: string;
  onThemeChange: (theme: string) => void;
  onDataChange: (data: PortfolioData) => void;
  onSave: (data: PortfolioData, theme: string) => void;
  onBack: () => void;
}

export const EditorPage: React.FC<EditorPageProps> = ({ 
  data, 
  theme: selectedTheme, 
  onThemeChange, 
  onDataChange,
  onSave,
  onBack
}) => {
  const { theme, toggleTheme } = useTheme();

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-slate-500">No portfolio data found. Please upload a resume first.</p>
          <Button onClick={onBack}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const updateData = (field: keyof PortfolioData, value: any) => {
    onDataChange({ ...data, [field]: value });
  };

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-80 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="p-2" onClick={onBack}><ArrowRight className="rotate-180" size={20} /></Button>
            <h2 className="font-bold">Editor</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="p-2 rounded-full" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button className="px-4 py-2 text-xs" onClick={() => {
              onSave(data, selectedTheme);
            }}>Publish</Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Template</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Minimalist', 'Creative', 'Modern', 'Classic'].map(t => (
                <div 
                  key={t} 
                  onClick={() => onThemeChange(t)}
                  className={cn(
                    "aspect-[3/4] rounded-lg border-2 flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all relative", 
                    selectedTheme === t ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50 text-slate-400'
                  )}
                >
                  {t}
                  {selectedTheme === t && <Check size={12} className="absolute top-1 right-1" />}
                </div>
              ))}
            </div>
          </section>
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Theme Colors</h3>
            <div className="flex gap-3">
              {['#1325ec', '#ec1313', '#13ec13', '#ec13ec'].map(c => (
                <div key={c} className="size-8 rounded-full cursor-pointer border-2 border-white shadow-sm" style={{ backgroundColor: c }} />
              ))}
            </div>
          </section>
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Content</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Name</label>
                <input 
                  type="text" 
                  value={data.name} 
                  onChange={(e) => updateData('name', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Role</label>
                <input 
                  type="text" 
                  value={data.role} 
                  onChange={(e) => updateData('role', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">About</label>
                <textarea 
                  value={data.about} 
                  onChange={(e) => updateData('about', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-border rounded-lg px-3 py-2 text-sm h-24 resize-none"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Experience</h3>
              <Button variant="ghost" className="p-1 h-auto text-primary" onClick={() => {
                const newExp = { company: 'New Company', role: 'Role', period: '2024 - Present', desc: 'Description' };
                updateData('experience', [...(data.experience || []), newExp]);
              }}>
                <Plus size={14} />
              </Button>
            </div>
            <div className="space-y-4">
              {data.experience?.map((exp, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-border space-y-3 relative group">
                  <button 
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
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
                    className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0"
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
                    className="w-full bg-transparent border-none p-0 text-xs text-slate-500 focus:ring-0"
                  />
                  <textarea 
                    value={exp.desc} 
                    onChange={(e) => {
                      const newExp = [...data.experience];
                      newExp[i] = { ...exp, desc: e.target.value };
                      updateData('experience', newExp);
                    }}
                    placeholder="Description"
                    className="w-full bg-transparent border-none p-0 text-xs text-slate-400 focus:ring-0 resize-none h-12"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Projects</h3>
              <Button variant="ghost" className="p-1 h-auto text-primary" onClick={() => {
                const newProj = { name: 'New Project', desc: 'Description', tech: ['React'] };
                updateData('projects', [...(data.projects || []), newProj]);
              }}>
                <Plus size={14} />
              </Button>
            </div>
            <div className="space-y-4">
              {data.projects?.map((proj, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-border space-y-3 relative group">
                  <button 
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
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
                    className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0"
                  />
                  <textarea 
                    value={proj.desc} 
                    onChange={(e) => {
                      const newProj = [...data.projects];
                      newProj[i] = { ...proj, desc: e.target.value };
                      updateData('projects', newProj);
                    }}
                    placeholder="Description"
                    className="w-full bg-transparent border-none p-0 text-xs text-slate-400 focus:ring-0 resize-none h-12"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skills</h3>
              <Button variant="ghost" className="p-1 h-auto text-primary" onClick={() => {
                const skill = prompt('Enter new skill:');
                if (skill) updateData('skills', [...(data.skills || []), skill]);
              }}>
                <Plus size={14} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill, i) => (
                <span key={i} className="group relative px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium border border-border">
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
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact</h3>
            <div className="space-y-3">
              {['email', 'location', 'github', 'linkedin', 'twitter'].map(field => (
                <div key={field} className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">{field}</label>
                  <input 
                    type="text" 
                    value={(data.contact as any)[field] || ''} 
                    onChange={(e) => {
                      const newContact = { ...data.contact, [field]: e.target.value };
                      updateData('contact', newContact);
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sections</h3>
            <div className="space-y-2">
              {['Hero', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map(s => (
                <div key={s} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="text-sm font-medium">{s}</span>
                  <Sliders size={14} className="text-slate-400" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-12 flex justify-center bg-background">
        <div className={cn(
          "w-full max-w-4xl bg-card shadow-2xl rounded-2xl min-h-[1200px] p-20 space-y-16 border border-border",
          selectedTheme === 'Minimalist' && "font-sans",
          selectedTheme === 'Creative' && "font-display",
          selectedTheme === 'Classic' && "font-serif"
        )}>
          <header className="space-y-4">
            <h1 className="text-6xl font-black tracking-tight">{data?.name || 'Your Name'}</h1>
            <p className="text-2xl text-slate-500 font-medium">{data?.role || 'Your Role'}</p>
          </header>
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">About</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              {data?.about || 'Tell the world about yourself...'}
            </p>
          </section>
          <section className="space-y-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Experience</h2>
            <div className="space-y-12">
              {data?.experience?.map((exp, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <p className="text-slate-500 font-medium">{exp.company}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">{exp.desc}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-400">{exp.period}</span>
                </div>
              ))}
              {(!data?.experience || data.experience.length === 0) && <p className="text-slate-400">No experience listed.</p>}
            </div>
          </section>
          <section className="space-y-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Projects</h2>
            <div className="grid grid-cols-2 gap-6">
              {data?.projects?.map((proj, i) => (
                <div key={i} className="p-6 rounded-xl border border-border bg-background/50 space-y-4">
                  <h3 className="text-xl font-bold">{proj.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tech?.map(t => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
              {(!data?.projects || data.projects.length === 0) && <p className="text-slate-400">No projects listed.</p>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

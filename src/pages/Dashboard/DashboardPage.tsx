// import React, { useState, useRef } from 'react';
// import {
//   Sparkles,
//   LayoutDashboard,
//   Briefcase,
//   Palette,
//   Settings,
//   Bell,
//   Plus,
//   Eye,
//   Share2,
//   Zap,
//   Edit3,
//   ExternalLink,
//   MoreVertical,
//   Clock,
//   Search,
//   Sun,
//   Moon,
//   Globe,
//   Trash2
// } from 'lucide-react';

// import type { LucideIcon } from 'lucide-react';

// import { Button } from '../../components/ui/Button';
// import { Card } from '../../components/ui/Card';
// import { useTheme } from '../../contexts/Theme';
// import { useAuth } from '../../contexts/Auth';
// import { cn } from '../../lib/utils';
// import { Portfolio } from '../../App';

// interface DashboardPageProps {
//   portfolios: Portfolio[];
//   onUpload: (file: File) => void;
//   onEdit: (id: string) => void;
//   onView: (id: string) => void;
//   onDelete: (id: string) => void;
// }

// export const DashboardPage: React.FC<DashboardPageProps> = ({
//   portfolios,
//   onUpload,
//   onEdit,
//   onView,
//   onDelete,
// }) => {
//   const { theme, toggleTheme } = useTheme();
//   const { user, logout } = useAuth();

//   const [activeTab, setActiveTab] =
//     useState<'dashboard' | 'portfolios' | 'templates' | 'settings'>('dashboard');

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   /* =============================
//      FILE UPLOAD (CREATE NEW)
//      ============================= */
//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) onUpload(file);
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   const triggerUpload = () => {
//     fileInputRef.current?.click();
//   };

//   /* =============================
//      CARD ACTIONS
//      ============================= */
//   const handleEditClick = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation();
//     onEdit(id);
//   };

//   const handleViewClick = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation();
//     onView(id);
//   };

//   const handleDeleteClick = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation();
//     if (confirm('Delete this portfolio permanently?')) {
//       onDelete(id);
//     }
//   };

//   const handleCopyUrl = (e: React.MouseEvent, url: string) => {
//     e.stopPropagation();
//     navigator.clipboard.writeText(url);
//     alert('Link copied!');
//   };

//   const NAV_ITEMS: Array<{
//   key: 'dashboard' | 'portfolios' | 'templates' | 'settings';
//   icon: LucideIcon;
//   label: string;
// }> = [
//   { key: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
//   { key: 'portfolios', icon: Briefcase, label: 'My Portfolios' },
//   { key: 'templates', icon: Palette, label: 'Templates' },
//   { key: 'settings', icon: Settings, label: 'Settings' },
// ];

//   /* =============================
//      UI
//      ============================= */
//   return (
//     <div className="flex h-screen bg-background text-foreground">
//       {/* SIDEBAR */}
//       <aside className="w-64 border-r border-border bg-card flex flex-col p-6">
//         <div className="flex items-center gap-3 mb-10">
//           <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
//             <Sparkles size={20} />
//           </div>
//           <h1 className="text-xl font-bold">PortfoliAI</h1>
//         </div>

//         {/* <nav className="flex-1 space-y-2">
//           {[
//             ['dashboard', LayoutDashboard, 'Dashboard'],
//             ['portfolios', Briefcase, 'My Portfolios'],
//             ['templates', Palette, 'Templates'],
//             ['settings', Settings, 'Settings'],
//           ].map(([key, Icon, label]) => (
//             <button
//               key={key}
//               onClick={() => setActiveTab(key as any)}
//               className={cn(
//                 'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium',
//                 activeTab === key
//                   ? 'bg-primary/10 text-primary'
//                   : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
//               )}
//             >
//               <Icon size={20} />
//               {label}
//             </button>
//           ))}
//         </nav> */}

//         <nav className="flex-1 space-y-2">
//   {NAV_ITEMS.map(({ key, icon: Icon, label }) => (
//     <button
//       key={key}
//       onClick={() => setActiveTab(key)}
//       className={cn(
//         'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium',
//         activeTab === key
//           ? 'bg-primary/10 text-primary'
//           : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
//       )}
//     >
//       <Icon size={20} />
//       {label}
//     </button>
//   ))}
// </nav>

//         <Button
//           variant="ghost"
//           className="justify-start text-red-500"
//           onClick={logout}
//         >
//           Logout
//         </Button>
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 overflow-y-auto p-8">
//         {/* HEADER */}
//         <header className="flex items-center justify-between mb-8">
//           <div className="relative w-96">
//             <Search
//               size={18}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//             />
//             <input
//               placeholder="Search portfolios..."
//               className="w-full bg-card border border-border rounded-xl py-2 pl-10 pr-4"
//             />
//           </div>

//           <div className="flex items-center gap-4">
//             <Button variant="ghost" onClick={toggleTheme}>
//               {theme === 'dark' ? <Sun /> : <Moon />}
//             </Button>

//             <div className="flex items-center gap-3">
//               <p className="text-sm font-bold">{user?.name}</p>
//               <img
//                 src={`https://i.pravatar.cc/150?u=${user?.email}`}
//                 className="size-9 rounded-full"
//               />
//             </div>
//           </div>
//         </header>

//         {/* DASHBOARD TAB */}
//         {activeTab === 'dashboard' && (
//           <>
//             <div className="flex justify-between items-center mb-8">
//               <div>
//                 <h2 className="text-3xl font-black">
//                   Welcome back, {user?.name?.split(' ')[0]}
//                 </h2>
//                 <p className="text-slate-500">
//                   Manage your portfolios here.
//                 </p>
//               </div>

//               <Button onClick={triggerUpload}>
//                 <Plus size={18} /> Create New Portfolio
//               </Button>

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 className="hidden"
//                 accept=".pdf,.docx,.txt"
//                 onChange={handleFileUpload}
//               />
//             </div>

//             {/* PORTFOLIO GRID */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {portfolios.map((p) => (
//                 <Card
//                   key={p.id}
//                   className="cursor-pointer group"
//                   onClick={() => onEdit(p.id)}
//                 >
//                   <div className="aspect-video bg-slate-100 relative">
//                     <img
//                       src={`https://picsum.photos/seed/${p.id}/800/450`}
//                       className="w-full h-full object-cover"
//                     />

//                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
//                       <Button
//                         variant="white"
//                         onClick={(e) => handleEditClick(e, p.id)}
//                       >
//                         <Edit3 size={14} /> Edit
//                       </Button>
//                       <Button
//                         variant="white"
//                         onClick={(e) => handleViewClick(e, p.id)}
//                       >
//                         <ExternalLink size={14} /> View
//                       </Button>
//                     </div>
//                   </div>

//                   <div className="p-4 space-y-2">
//                     <h4 className="font-bold">{p.name}</h4>
//                     <p className="text-xs text-slate-500 flex items-center gap-1">
//                       <Clock size={12} /> {p.lastEdited}
//                     </p>

//                     <div className="flex justify-between items-center">
//                       <span className="text-xs font-bold text-primary">
//                         {p.status.toUpperCase()}
//                       </span>

//                       <div className="flex gap-2">
//                         <Button
//                           variant="ghost"
//                           onClick={(e) => handleCopyUrl(e, p.url)}
//                         >
//                           <Share2 size={14} />
//                         </Button>

//                         <Button
//                           variant="ghost"
//                           className="text-red-500"
//                           onClick={(e) => handleDeleteClick(e, p.id)}
//                         >
//                           <Trash2 size={14} />
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </>
//         )}



// {/* /**============================
//            My Portfolio Tab
// =====================================
//  */ }

//         {/* MY PORTFOLIOS TAB */}
// {activeTab === 'portfolios' && (
//   <>
//     <h2 className="text-3xl font-black mb-6">My Portfolios</h2>

//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//       {portfolios.map((p) => (
//         <Card
//           key={p.id}
//           className="cursor-pointer group"
//           onClick={() => onEdit(p.id)}
//         >
//           {/* SAME CARD UI AS DASHBOARD */}
//           {/* copy-paste from dashboard grid */}
//                             <div className="aspect-video bg-slate-100 relative">
//                     <img
//                       src={`https://picsum.photos/seed/${p.id}/800/450`}
//                       className="w-full h-full object-cover"
//                     />

//                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
//                       <Button
//                         variant="white"
//                         onClick={(e) => handleEditClick(e, p.id)}
//                       >
//                         <Edit3 size={14} /> Edit
//                       </Button>
//                       <Button
//                         variant="white"
//                         onClick={(e) => handleViewClick(e, p.id)}
//                       >
//                         <ExternalLink size={14} /> View
//                       </Button>
//                     </div>
//                   </div>

//                   <div className="p-4 space-y-2">
//                     <h4 className="font-bold">{p.name}</h4>
//                     <p className="text-xs text-slate-500 flex items-center gap-1">
//                       <Clock size={12} /> {p.lastEdited}
//                     </p>

//                     <div className="flex justify-between items-center">
//                       <span className="text-xs font-bold text-primary">
//                         {p.status.toUpperCase()}
//                       </span>

//                       <div className="flex gap-2">
//                         <Button
//                           variant="ghost"
//                           onClick={(e) => handleCopyUrl(e, p.url)}
//                         >
//                           <Share2 size={14} />
//                         </Button>

//                         <Button
//                           variant="ghost"
//                           className="text-red-500"
//                           onClick={(e) => handleDeleteClick(e, p.id)}
//                         >
//                           <Trash2 size={14} />
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//         </Card>
//       ))}
//     </div>
//   </>
// )}





//       </main>
//     </div>
//   );
// };

//9:50 4-03-2026

import React, { useState, useRef } from 'react';
import {
  Sparkles,
  LayoutDashboard,
  Briefcase,
  Palette,
  Settings,
  Plus,
  Share2,
  Edit3,
  ExternalLink,
  Clock,
  Search,
  Sun,
  Moon,
  Trash2,
  X, // 👈 New icon for closing the modal
  ArrowRight // 👈 New icon for the modal buttons
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useTheme } from '../../contexts/Theme';
import { useAuth } from '../../contexts/Auth';
import { cn } from '../../lib/utils';
import { Portfolio } from '../../App';
import { PortfolioCard } from '@/src/components/PortfolioCard/PortfolioCard';
import { SettingsPage } from '../Settings/SettingsPage'; // <-- Adjust the path if you saved it in a different folder!
import { TemplatesPage } from '../Templates/TemplatesPage';
// /* ======================================================
//    SUB-COMPONENT: PortfolioCard
//    ====================================================== */
// interface PortfolioCardProps {
//   portfolio: Portfolio;
//   onEdit: (id: string) => void;
//   onView: (id: string) => void;
//   onDelete: (id: string) => void;
// }

// const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio: p, onEdit, onView, onDelete }) => {
//   const handleCopyUrl = (e: React.MouseEvent, url: string) => {
//     e.stopPropagation();
//     navigator.clipboard.writeText(url);
//     alert('Link copied!');
//   };

//   return (
//     <Card className="cursor-pointer group overflow-hidden" onClick={() => onEdit(p.id)}>
//       <div className="aspect-video bg-slate-100 relative">
//         <img
//           src={`https://picsum.photos/seed/${p.id}/800/450`}
//           className="w-full h-full object-cover transition-transform group-hover:scale-105"
//           alt={p.name}
//         />
//         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
//           <Button variant="white" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(p.id); }}>
//             <Edit3 size={14} className="mr-1" /> Edit
//           </Button>
//           <Button variant="white" size="sm" onClick={(e) => { e.stopPropagation(); onView(p.id); }}>
//             <ExternalLink size={14} className="mr-1" /> View
//           </Button>
//         </div>
//       </div>

//       <div className="p-4 space-y-2">
//         <h4 className="font-bold truncate">{p.name}</h4>
//         <p className="text-xs text-slate-500 flex items-center gap-1">
//           <Clock size={12} /> {p.lastEdited}
//         </p>

//         <div className="flex justify-between items-center pt-2">
//           <span className={cn(
//             "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase",
//             p.status === 'active' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
//           )}>
//             {p.status}
//           </span>

//           <div className="flex gap-1">
//             <Button variant="ghost" size="sm" onClick={(e) => handleCopyUrl(e, p.url || '')}>
//               <Share2 size={14} />
//             </Button>
//             <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); onDelete(p.id); }}>
//               <Trash2 size={14} />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

/* ======================================================
   MAIN COMPONENT: DashboardPage
   ====================================================== */
interface DashboardPageProps {
  portfolios: Portfolio[];
  onUpload: (file: File) => void;
  onEdit: (id: string, template?: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  portfolios,
  onUpload,
  onEdit,
  onView,
  onDelete,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'portfolios' | 'templates' | 'settings'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('Modern');

  // 👇 NEW STATE FOR THE MODAL 👇
  const [templateActionModal, setTemplateActionModal] = useState<string | null>(null);

  // Filter portfolios based on search
  const filteredPortfolios = portfolios.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const NAV_ITEMS: Array<{ key: typeof activeTab; icon: LucideIcon; label: string }> = [
    { key: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { key: 'portfolios', icon: Briefcase, label: 'My Portfolios' },
    { key: 'templates', icon: Palette, label: 'Templates' },
    { key: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-border bg-card flex flex-col p-6 hidden md:flex">
        <div className="flex items-center gap-3 mb-10">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Sparkles size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">PortfoliAI</h1>
        </div>

        {/* <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all',
                activeTab === key
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </nav> */}

        <nav className="flex-1 space-y-2 pt-4">
          {NAV_ITEMS.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200',
                activeTab === key
                  ? 'bg-primary/10 text-primary font-bold' // 👈 Soft tint, perfect contrast!
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground' // 👈 Semantic inactive states
              )}
            >
              <Icon 
                size={20} 
                className={activeTab === key ? "text-primary" : "text-muted-foreground"} 
              />
              {label}
            </button>
          ))}
          </nav>

        <Button variant="ghost" className="justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30" onClick={logout}>
          Logout
        </Button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search portfolios..."
              className="w-full bg-card border border-border rounded-xl py-2 pl-10 pr-4 focus:ring-2 ring-primary/20 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">{user?.name}</p>
                <p className="text-[10px] text-slate-500">{user?.email}</p>
              </div>
              {/* <img src={`https://i.pravatar.cc/150?u=${user?.email}`} className="size-9 rounded-full border-2 border-primary/10" alt="avatar" /> */}
              <img 
              src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
              alt={user?.name} 
              className="size-9 rounded-full border-2 border-primary/10"
              referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* TAB CONTENT */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-black tracking-tight">Welcome, {user?.name?.split(' ')[0]}!</h2>
                  <p className="text-slate-500">You have {portfolios.length} active projects.</p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()} className="shadow-lg shadow-primary/20">
                  <Plus size={18} className="mr-2" /> Create New
                </Button>
                <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileUpload} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPortfolios.slice(0, 3).map((p) => (
                  <PortfolioCard key={p.id} portfolio={p} onEdit={onEdit} onView={onView} onDelete={onDelete} />
                ))}
              </div>
            </>
          )}

          {activeTab === 'portfolios' && (
            <>
              <h2 className="text-3xl font-black mb-6">My Portfolios</h2>
              {filteredPortfolios.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPortfolios.map((p) => (
                    <PortfolioCard key={p.id} portfolio={p} onEdit={onEdit} onView={onView} onDelete={onDelete} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-card border border-dashed border-border rounded-3xl">
                  <Briefcase size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500">No portfolios found matching your search.</p>
                </div>
              )}
            </>
          )}

          {/* 👇 NEW SETTINGS TAB 👇 */}
          {activeTab === 'settings' && (
            <SettingsPage />
          )}

          {/* 👇 NEW TEMPLATES TAB (Placeholder) 👇 */}
{/* ================= TEMPLATES TAB ================= */}
          {/* {activeTab === 'templates' && (
            <TemplatesPage 
              selectedTemplate={selectedTemplate} 
              onSelect={(templateId) => {
                setSelectedTemplate(templateId);
                fileInputRef.current?.click(); // 👈 Triggers the file upload instantly!
              }} 
            />
          )} */}

          {activeTab === 'templates' && (
            <TemplatesPage 
              selectedTemplate={selectedTemplate} 
              onSelect={(templateId) => {
                setSelectedTemplate(templateId);
                // 👇 If they have portfolios, show the modal. Otherwise, just open file upload!
                if (portfolios.length > 0) {
                  setTemplateActionModal(templateId);
                } else {
                  fileInputRef.current?.click();
                }
              }} 
            />
          )}          

        </div>
      </main>

      {/* =========================================================
          👇 NEW TEMPLATE SELECTION MODAL 👇
          ========================================================= */}
      {templateActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-6">
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">Use {templateActionModal} Template</h3>
                <p className="text-sm text-muted-foreground mt-1">How would you like to apply this template?</p>
              </div>
              <button onClick={() => setTemplateActionModal(null)} className="p-1 hover:bg-secondary rounded-full text-muted-foreground transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Option 1: Upload a fresh resume */}
              <Button 
                className="w-full justify-start h-12 text-base shadow-sm" 
                onClick={() => {
                  setTemplateActionModal(null);
                  fileInputRef.current?.click();
                }}
              >
                <Plus size={18} className="mr-3" /> Upload New Resume
              </Button>
              
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground font-bold">Or apply to existing</span></div>
              </div>

              {/* Option 2: Apply to an existing portfolio */}
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {portfolios.map(p => (
                  <button
                    key={p.id}
                    className="w-full text-left px-4 py-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-between group"
                    onClick={() => {
                      setTemplateActionModal(null);
                      // 👇 Passes the portfolio ID AND the newly selected template to the App!
                      onEdit(p.id, templateActionModal); 
                    }}
                  >
                    <span className="font-medium text-sm truncate pr-4">{p.name}</span>
                    <ArrowRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}


    </div>
  );
};
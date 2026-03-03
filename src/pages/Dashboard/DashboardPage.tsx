import React, { useState, useRef } from 'react';
import {
  Sparkles,
  LayoutDashboard,
  Briefcase,
  Palette,
  Settings,
  Bell,
  Plus,
  Eye,
  Share2,
  Zap,
  Edit3,
  ExternalLink,
  MoreVertical,
  Clock,
  Search,
  Sun,
  Moon,
  Globe,
  Trash2
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useTheme } from '../../contexts/Theme';
import { useAuth } from '../../contexts/Auth';
import { cn } from '../../lib/utils';
import { Portfolio } from '../../App';

interface DashboardPageProps {
  portfolios: Portfolio[];
  onUpload: (file: File) => void;
  onEdit: (id: string) => void;
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

  const [activeTab, setActiveTab] =
    useState<'dashboard' | 'portfolios' | 'templates' | 'settings'>('dashboard');

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* =============================
     FILE UPLOAD (CREATE NEW)
     ============================= */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  /* =============================
     CARD ACTIONS
     ============================= */
  const handleEditClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onEdit(id);
  };

  const handleViewClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onView(id);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Delete this portfolio permanently?')) {
      onDelete(id);
    }
  };

  const handleCopyUrl = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    alert('Link copied!');
  };

  const NAV_ITEMS: Array<{
  key: 'dashboard' | 'portfolios' | 'templates' | 'settings';
  icon: LucideIcon;
  label: string;
}> = [
  { key: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { key: 'portfolios', icon: Briefcase, label: 'My Portfolios' },
  { key: 'templates', icon: Palette, label: 'Templates' },
  { key: 'settings', icon: Settings, label: 'Settings' },
];

  /* =============================
     UI
     ============================= */
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-border bg-card flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <h1 className="text-xl font-bold">PortfoliAI</h1>
        </div>

        {/* <nav className="flex-1 space-y-2">
          {[
            ['dashboard', LayoutDashboard, 'Dashboard'],
            ['portfolios', Briefcase, 'My Portfolios'],
            ['templates', Palette, 'Templates'],
            ['settings', Settings, 'Settings'],
          ].map(([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium',
                activeTab === key
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
              )}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </nav> */}

        <nav className="flex-1 space-y-2">
  {NAV_ITEMS.map(({ key, icon: Icon, label }) => (
    <button
      key={key}
      onClick={() => setActiveTab(key)}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium',
        activeTab === key
          ? 'bg-primary/10 text-primary'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
      )}
    >
      <Icon size={20} />
      {label}
    </button>
  ))}
</nav>

        <Button
          variant="ghost"
          className="justify-start text-red-500"
          onClick={logout}
        >
          Logout
        </Button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative w-96">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              placeholder="Search portfolios..."
              className="w-full bg-card border border-border rounded-xl py-2 pl-10 pr-4"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun /> : <Moon />}
            </Button>

            <div className="flex items-center gap-3">
              <p className="text-sm font-bold">{user?.name}</p>
              <img
                src={`https://i.pravatar.cc/150?u=${user?.email}`}
                className="size-9 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-black">
                  Welcome back, {user?.name?.split(' ')[0]}
                </h2>
                <p className="text-slate-500">
                  Manage your portfolios here.
                </p>
              </div>

              <Button onClick={triggerUpload}>
                <Plus size={18} /> Create New Portfolio
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
              />
            </div>

            {/* PORTFOLIO GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((p) => (
                <Card
                  key={p.id}
                  className="cursor-pointer group"
                  onClick={() => onEdit(p.id)}
                >
                  <div className="aspect-video bg-slate-100 relative">
                    <img
                      src={`https://picsum.photos/seed/${p.id}/800/450`}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
                      <Button
                        variant="white"
                        onClick={(e) => handleEditClick(e, p.id)}
                      >
                        <Edit3 size={14} /> Edit
                      </Button>
                      <Button
                        variant="white"
                        onClick={(e) => handleViewClick(e, p.id)}
                      >
                        <ExternalLink size={14} /> View
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="font-bold">{p.name}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock size={12} /> {p.lastEdited}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-primary">
                        {p.status.toUpperCase()}
                      </span>

                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          onClick={(e) => handleCopyUrl(e, p.url)}
                        >
                          <Share2 size={14} />
                        </Button>

                        <Button
                          variant="ghost"
                          className="text-red-500"
                          onClick={(e) => handleDeleteClick(e, p.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}



{/* /**============================
           My Portfolio Tab
=====================================
 */ }

        {/* MY PORTFOLIOS TAB */}
{activeTab === 'portfolios' && (
  <>
    <h2 className="text-3xl font-black mb-6">My Portfolios</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {portfolios.map((p) => (
        <Card
          key={p.id}
          className="cursor-pointer group"
          onClick={() => onEdit(p.id)}
        >
          {/* SAME CARD UI AS DASHBOARD */}
          {/* copy-paste from dashboard grid */}
                            <div className="aspect-video bg-slate-100 relative">
                    <img
                      src={`https://picsum.photos/seed/${p.id}/800/450`}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
                      <Button
                        variant="white"
                        onClick={(e) => handleEditClick(e, p.id)}
                      >
                        <Edit3 size={14} /> Edit
                      </Button>
                      <Button
                        variant="white"
                        onClick={(e) => handleViewClick(e, p.id)}
                      >
                        <ExternalLink size={14} /> View
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="font-bold">{p.name}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock size={12} /> {p.lastEdited}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-primary">
                        {p.status.toUpperCase()}
                      </span>

                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          onClick={(e) => handleCopyUrl(e, p.url)}
                        >
                          <Share2 size={14} />
                        </Button>

                        <Button
                          variant="ghost"
                          className="text-red-500"
                          onClick={(e) => handleDeleteClick(e, p.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
        </Card>
      ))}
    </div>
  </>
)}





      </main>
    </div>
  );
};
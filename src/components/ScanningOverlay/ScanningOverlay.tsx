import React from 'react';
import { motion } from 'motion/react';
import { Network, CheckCircle2, Clock, Brain, AlertCircle, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface ScanningOverlayProps {
  progress: number;
  status: string;
  error?: string | null;
  onClose?: () => void;
}

export const ScanningOverlay: React.FC<ScanningOverlayProps> = ({ progress, status, error, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card w-full max-w-xl rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center border border-border relative"
    >
      {error && onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={24} />
        </button>
      )}

      <div className="relative size-48 mb-8 flex items-center justify-center">
        <div className={cn(
          "absolute inset-0 rounded-full animate-pulse",
          error ? "bg-red-500/10" : "bg-primary/10"
        )} />
        <div className={cn(
          "relative z-10 flex flex-col items-center",
          error ? "text-red-500" : "text-primary"
        )}>
          {error ? <AlertCircle size={64} /> : <Network size={64} className="animate-pulse" />}
        </div>
        {!error && (
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full"
          />
        )}
      </div>

      <div className="text-center w-full space-y-2 mb-10">
        <h2 className="text-2xl font-bold">{error ? 'Analysis Failed' : 'AI Scanning in Progress'}</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          {error ? error : 'Our AI is currently parsing your skills, experience, and projects to build your digital portfolio.'}
        </p>
      </div>

      {!error ? (
        <div className="w-full space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Current Task</span>
              <p className="font-medium text-sm">{status}</p>
            </div>
            <span className="text-2xl font-black text-primary">{progress}%</span>
          </div>
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </motion.div>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider pt-4 border-t border-border">
            <div className="flex items-center gap-1 text-primary"><CheckCircle2 size={12} /> Text Extraction</div>
            <div className="flex items-center gap-1"><Clock size={12} /> Structure Analysis</div>
            <div className="flex items-center gap-1"><Brain size={12} /> Skill Mapping</div>
          </div>
        </div>
      ) : (
        <div className="w-full pt-4 border-t border-border flex justify-center">
          <Button onClick={onClose} variant="outline" className="px-8">Try Again</Button>
        </div>
      )}
    </motion.div>
  </div>
);

// Helper for conditional classes since we don't have it imported here
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

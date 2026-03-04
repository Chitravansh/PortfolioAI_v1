import React from 'react';
import { 
  Clock, 
  Edit3, 
  ExternalLink, 
  Share2, 
  Trash2 
} from 'lucide-react';

// Double-check these paths match your actual folder structure!
import { Button } from '../ui/Button'; 
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';
import { Portfolio } from '../../App';

interface PortfolioCardProps {
  portfolio: Portfolio;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ 
  portfolio: p, 
  onEdit, 
  onView, 
  onDelete 
}) => {
  
  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}/view/${p.slug}`;

    if (!p.slug) {
    alert("Slug missing. Please save this portfolio again.");
    return;
  }

    navigator.clipboard.writeText(fullUrl)
      .then(() => alert(`Link copied: ${fullUrl}`))
      .catch((err) => console.error('Error copying:', err));
  };

  return (
    <Card 
      className="group overflow-hidden border border-border bg-card hover:shadow-md transition-all"
      onClick={() => onEdit(p.id)}
    >
      {/* IMAGE SECTION */}
        <div className="aspect-video bg-slate-50 dark:bg-slate-900 relative p-4 flex items-center justify-center border-b border-border">
        <img
          src={p.data?.image || `https://ui-avatars.com/api/?name=${p.name}&background=random&size=400`}
          alt={p.name}
          className="max-w-full max-h-full object-contain drop-shadow-sm rounded-sm"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button variant="white" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(p.id); }}>
            <Edit3 size={14} className="mr-1" /> Edit
          </Button>
          <Button variant="white" size="sm" onClick={(e) => { e.stopPropagation(); onView(p.id); }}>
            <ExternalLink size={14} className="mr-1" /> View
          </Button>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className="p-4">
        <h4 className="font-bold truncate text-foreground">{p.name}</h4>
        <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
          <Clock size={10} /> {p.lastEdited}
        </p>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
          {/* Status Label */}
          <span className={cn(
            "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
            p.status === 'active' 
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
          )}>
            {p.status}
          </span>

          {/* Action Buttons - Forced Visibility */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
              onClick={handleCopyUrl}
            >
              <Share2 size={16} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={(e) => { e.stopPropagation(); onDelete(p.id); }}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
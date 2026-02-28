import React from 'react';
import { cn } from '../../../lib/utils';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={cn('bg-card text-card-foreground rounded-2xl border border-border shadow-sm', className)} {...props}>
    {children}
  </div>
);

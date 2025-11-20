import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

const GlassPanel = ({ children, className }: GlassPanelProps) => {
  return (
    <div
      className={cn(
        'backdrop-blur-2xl bg-white/5 border border-white/10 shadow-xl rounded-xl',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPanel;

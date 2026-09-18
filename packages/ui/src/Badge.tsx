import React from 'react';
export const Badge: React.FC<{ variant?: 'sky' | 'emerald' | 'amber' | 'rose'; children: React.ReactNode }> = ({
  variant = 'sky',
  children,
}) => {
  const styles = {
    sky: 'bg-sky-50 text-sky-700 border-sky-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[variant]}`}>
      {children}
    </span>
  );
};
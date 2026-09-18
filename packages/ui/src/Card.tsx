import React from 'react';
export const Card: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({
  title,
  children,
  className = '',
}) => (
  <div className={`p-6 bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>
    {title && <h3 className="font-bold text-base text-slate-900 mb-4">{title}</h3>}
    {children}
  </div>
);
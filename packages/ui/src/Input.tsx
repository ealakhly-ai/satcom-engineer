import React from 'react';
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }> = ({
  label,
  error,
  className = '',
  ...props
}) => (
  <div className="space-y-1 text-right">
    {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
    <input
      className={`w-full p-2.5 rounded-xl border ${error ? 'border-rose-500' : 'border-slate-200'} text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 ${className}`}
      {...props}
    />
    {error && <span className="text-[10px] text-rose-600">{error}</span>}
  </div>
);
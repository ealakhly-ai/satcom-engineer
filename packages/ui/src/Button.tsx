import React from 'react';
export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'outline' }
> = ({ variant = 'primary', children, className = '', ...props }) => {
  const base = 'px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2';
  const vars = {
    primary: 'bg-sky-700 hover:bg-sky-800 text-white shadow-sm',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white',
    outline: 'border border-slate-200 text-slate-700 hover:bg-slate-50',
  };
  return (
    <button className={`${base} ${vars[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
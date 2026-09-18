import React from 'react';
export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({
  label,
  className = '',
  ...props
}) => (
  <div className="space-y-1 text-right">
    {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
    <textarea
      className={`w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 ${className}`}
      {...props}
    />
  </div>
);
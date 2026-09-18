import React from 'react';
export const Alert: React.FC<{ type?: 'info' | 'success' | 'warning' | 'error'; message: string }> = ({
  type = 'info',
  message,
}) => {
  const styles = {
    info: 'bg-sky-50 text-sky-800 border-sky-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-900 border-amber-200',
    error: 'bg-rose-50 text-rose-900 border-rose-200',
  };
  return <div className={`p-4 rounded-xl border text-xs font-medium ${styles[type]}`}>{message}</div>;
};
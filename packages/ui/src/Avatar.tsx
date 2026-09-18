import React from 'react';
export const Avatar: React.FC<{ name: string; src?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  name,
  src,
  size = 'md',
}) => {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-12 h-12 text-base', lg: 'w-20 h-20 text-2xl' };
  return (
    <div
      className={`${sizes[size]} rounded-2xl bg-sky-100 text-sky-800 font-bold flex items-center justify-center shrink-0 border border-sky-200`}
    >
      {src ? <img src={src} alt={name} className="w-full h-full rounded-2xl object-cover" /> : name.charAt(0)}
    </div>
  );
};
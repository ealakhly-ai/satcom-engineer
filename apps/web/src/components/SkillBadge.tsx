import React from 'react';
export const SkillBadge: React.FC<{ name: string }> = ({ name }) => ( <span className='px-2.5 py-1 bg-sky-50 text-sky-700 rounded-lg text-xs font-semibold'>{name}</span> );
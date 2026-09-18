import React from 'react';
export const Tabs: React.FC<{ tabs: string[]; activeIndex: number; onSelect: (index: number) => void }> = ({
  tabs,
  activeIndex,
  onSelect,
}) => (
  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
    {tabs.map((tab, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeIndex === i ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
      >
        {tab}
      </button>
    ))}
  </div>
);
'use client';
import React, { useState } from 'react';
import { Globe, DollarSign } from 'lucide-react';

export const LanguageCurrencySelector = () => {
  const [currency, setCurrency] = useState('USD');
  const [lang, setLang] = useState('ar');

  return (
    <div className="flex items-center gap-2 text-xs">
      {/* Currency Switcher */}
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="p-1.5 rounded-lg border border-slate-200 bg-white font-bold text-slate-700 text-xs focus:outline-none"
      >
        <option value="USD">USD ($)</option>
        <option value="SAR">SAR (ر.س)</option>
        <option value="AED">AED (د.إ)</option>
        <option value="EUR">EUR (€)</option>
        <option value="GBP">GBP (£)</option>
      </select>

      {/* Language Switcher */}
      <button
        onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 transition flex items-center gap-1"
      >
        <Globe className="w-3.5 h-3.5 text-sky-600" />
        <span>{lang === 'ar' ? 'العربية' : 'English'}</span>
      </button>
    </div>
  );
};
'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { User, Save, Trash2, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfileSettingsPage() {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [bio, setBio] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('satcom_client_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name) setName(parsed.name);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.company) setCompany(parsed.company);
        if (parsed.bio) setBio(parsed.bio);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('satcom_client_profile', JSON.stringify({ name, email, company }));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAccount = () => {
    if (confirm(isAr ? 'هل أنت متأكد من رغبتك في حذف الحساب نهائياً وإعادة تعيين البيانات؟' : 'Are you sure you want to permanently delete your account and reset all data?')) {
      localStorage.removeItem('satcom_client_profile');
      localStorage.removeItem('satcom_active_role');
      router.push('/register');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8" dir={dir}>
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <User className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black text-white">
            {isAr ? 'إعدادات الملف الشخصي' : 'Profile Settings'}
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          {isAr
            ? 'تحديث بيانات الحساب والاسم والمسمى الوظيفي وإدارة الهوية'
            : 'Update your personal profile, company details, and manage account identity.'}
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-300 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>{isAr ? 'تم حفظ التعديلات وتحديث الملف الشخصي بنجاح!' : 'Profile changes saved successfully!'}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 space-y-5 shadow-xl">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            {isAr ? 'الاسم الكامل' : 'Full Name'}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            {isAr ? 'البريد الإلكتروني' : 'Email Address'}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            {isAr ? 'الشركة / المؤسسة الهندسية' : 'Company / Organization'}
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            {isAr ? 'نبذة عن العمل أو التخصص' : 'Bio / Specialization Overview'}
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isAr ? 'حفظ التغييرات' : 'Save Changes'}</span>
        </button>
      </form>

      {/* Danger Zone: Account Deletion */}
      <div className="p-6 bg-rose-950/20 border border-rose-900/40 rounded-3xl space-y-3">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <ShieldAlert className="w-4 h-4" />
          <span>{isAr ? 'منطقة حذف الحساب وإعادة التعيين' : 'Danger Zone: Account Deletion'}</span>
        </div>
        <p className="text-xs text-slate-400">
          {isAr
            ? 'سيؤدي حذف الحساب إلى مسح بيانات الملف الشخصي المحفوظة محلياً وإعادتك لصفحة التسجيل.'
            : 'Permanently remove your local client account data and reset your active session.'}
        </p>
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>{isAr ? 'حذف الحساب نهائياً' : 'Permanently Delete Account'}</span>
        </button>
      </div>

      {/* Brand Footer */}
      <div className="text-center pt-6 text-[11px] text-slate-500 border-t border-slate-800/60">
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'} • Satcom Engineers</span>
      </div>
    </div>
  );
}
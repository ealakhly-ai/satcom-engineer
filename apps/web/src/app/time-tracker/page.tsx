'use client';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Play, Pause, Clock, Camera, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function TimeTrackerPage() {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';

  const [tracking, setTracking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [memo, setMemo] = useState('');
  const [screenshots, setScreenshots] = useState<any[]>([]);

  useEffect(() => {
    let interval: any;
    if (tracking) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [tracking]);

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8" dir={dir}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white">
            {isAr ? 'برنامج تتبع الوقت للعقود بالساعة (Work Diary)' : 'Hourly Contract Time Tracker & Work Diary'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isAr
              ? 'تسجيل ساعات العمل المعتمدة مع توثيق النشاط الفعلي لضمان حقوق المهندس والعميل.'
              : 'Log verified billable hours with automated work diary activity tracking for complete client-freelancer trust.'}
          </p>
        </div>
        <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 font-bold text-xs rounded-full border border-cyan-500/30">
          {isAr ? 'جاهز للتتبع' : 'Ready for Tracking'}
        </span>
      </div>

      {/* Tracker Control Card */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTracking(!tracking)}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white transition shadow-lg cursor-pointer ${
                tracking ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20' : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-emerald-500/20'
              }`}
            >
              {tracking ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </button>
            <div>
              <div className="text-4xl font-black tracking-widest text-white font-mono">
                {formatTime(seconds)}
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {tracking
                  ? (isAr ? 'جاري تتبع الوقت والنشاط الآن...' : 'Tracking time & keystroke activity...')
                  : (isAr ? 'المؤقت متوقف' : 'Timer stopped')}
              </span>
            </div>
          </div>

          <div className={isAr ? 'text-right' : 'text-left'}>
            <span className="text-xs text-slate-400 block">{isAr ? 'سعر الساعة المعتمد' : 'Contract Hourly Rate'}</span>
            <span className="text-2xl font-black text-white font-mono">$0.00 / hr</span>
            <span className="text-[11px] text-slate-500 font-bold block">
              {isAr ? 'لا يوجد عقد بالساعة نشط حالياً' : 'No active hourly contract'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2">
            {isAr ? 'مذكرة العمل الحالية (تظهر في كشف العميل)' : 'Work Memo (Visible on Client Invoice)'}
          </label>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder={isAr ? 'اكتب تفاصيل المهمة الحالية التي تعمل عليها...' : 'Describe the task you are currently working on...'}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Work Diary Screenshots Timeline */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'لقطات الشاشة ومستوى النشاط (Work Diary)' : 'Screenshots & Activity Level'}</span>
          </h3>
          {screenshots.length > 0 && (
            <span className="text-xs text-slate-400">{isAr ? 'متوسط النشاط: 0%' : 'Avg Activity: 0%'}</span>
          )}
        </div>

        {screenshots.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mx-auto mb-3 text-slate-500">
              <Camera className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {isAr ? 'لا توجد لقطات شاشة أو سجل نشاط مسجل' : 'No Screenshots or Activity Recorded Yet'}
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {isAr
                ? 'عند بدء تتبع الوقت في عقد نشط، سيتم أخذ لقطات شاشة دورية وتوثيق حركة لوحة المفاتيح والماوس لضمان استحقاق الأجر وحماية كلا الطرفين.'
                : 'When time tracking starts on an active contract, periodic screenshots and activity levels will be logged automatically to guarantee payment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {screenshots.map((s, idx) => (
              <div key={idx} className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
                <div className="h-32 bg-slate-900 rounded-xl flex items-center justify-center text-cyan-400 text-xs font-mono border border-slate-800">
                  {s.title}
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{s.time}</span>
                  <span className="text-emerald-400 font-bold">{s.activity}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Brand Footer */}
      <div className="text-center pt-6 text-[11px] text-slate-500 border-t border-slate-800/60">
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'} • Satcom Engineers</span>
      </div>
    </div>
  );
}
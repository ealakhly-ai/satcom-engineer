'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, ShieldAlert, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function PostJobPage() {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('هندسة الهوائيات ومصفوفات الأقمار الصناعية');
  const [desc, setDesc] = useState('');
  const [skills, setSkills] = useState('CST Studio, RF Design, Ka-Band');
  const [timeline, setTimeline] = useState('من أسبوعين إلى شهر');
  const [budget, setBudget] = useState(750);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob = {
      id: `job-${Date.now()}`,
      titleAr: title,
      titleEn: title,
      clientName: isAr ? 'صاحب عمل معتمد' : 'Verified Enterprise Client',
      clientLocation: isAr ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, UAE',
      clientSpent: '$0',
      clientRating: 5.0,
      paymentVerified: true,
      budget: Number(budget),
      jobTypeAr: 'سعر ثابت (Escrow محمي)',
      jobTypeEn: 'Fixed-Price (Escrow Protected)',
      durationAr: timeline,
      durationEn: timeline,
      experienceLevelAr: 'خبير ($$$)',
      experienceLevelEn: 'Expert ($$$)',
      band: category.includes('SDR') ? 'SDR / L-Band' : category.includes('Link') ? 'Ku-Band' : 'Ka-Band',
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      proposalsCount: 0,
      createdAtAr: 'الآن',
      createdAtEn: 'Just now',
      descAr: desc,
      descEn: desc,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('satcom_posted_jobs') || '[]');
      existing.unshift(newJob);
      localStorage.setItem('satcom_posted_jobs', JSON.stringify(existing));
      setSubmitted(true);
      setTimeout(() => {
        router.push('/jobs');
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir={dir}>
      <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
        <div>
          <h1 className="text-2xl font-black text-white">
            {isAr ? 'نشر مشروع هندسي جديد' : 'Post a New Engineering Job'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isAr
              ? 'املأ تفاصيل المشروع لاستقبال عروض المتخصصين في أنظمة الاتصالات والترددات الفضائية.'
              : 'Provide project specifications to receive competitive proposals from vetted satellite & RF engineers.'}
          </p>
        </div>

        {submitted ? (
          <div className="p-8 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">
              {isAr ? 'تم نشر المشروع بنجاح!' : 'Project Published Successfully!'}
            </h3>
            <p className="text-xs text-slate-300">
              {isAr ? 'جاري تحويلك إلى صفحة المشاريع لمشاهدة مشروعك...' : 'Redirecting to jobs feed...'}
            </p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                {isAr ? 'عنوان المشروع' : 'Project Title'}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isAr ? 'مثال: تصميم مرشح نطاق ترددي X-band Waveguide Filter' : 'e.g. X-Band Waveguide Bandpass Filter Design'}
                className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                {isAr ? 'التصنيف التخصصي' : 'Specialization & Domain'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
              >
                <option value="هندسة الهوائيات ومصفوفات الأقمار الصناعية">{isAr ? 'هندسة الهوائيات ومصفوفات الأقمار الصناعية (Phased Arrays)' : 'Antenna Engineering & Satellite Phased Arrays'}</option>
                <option value="ميزانية الوصلة وحساب الترددات">{isAr ? 'ميزانية الوصلة وحساب الترددات (Link Budget / DVB-S2X)' : 'Link Budget Simulation (DVB-S2X / ITU-R)'}</option>
                <option value="الراديو البرمجي ومعالجة الإشارات">{isAr ? 'الراديو البرمجي ومعالجة الإشارات (SDR / DSP)' : 'Software Defined Radio & Telemetry (SDR / DSP)'}</option>
                <option value="محطات أرضية وأجهزة ميكروويف">{isAr ? 'محطات أرضية وأجهزة ميكروويف (Earth Stations & RF Hardware)' : 'Earth Stations & RF Hardware'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                {isAr ? 'تفاصيل ومخرجات المشروع المطلوبة' : 'Deliverables & Requirements'}
              </label>
              <textarea
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={isAr ? 'صف مخرجات التصميم والمحاكاة المطلوبة بدقة...' : 'Describe technical requirements and deliverable files...'}
                className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                {isAr ? 'المهارات والبرمجيات المطلوبة (مفصولة بفواصل)' : 'Required Skills & Tools (comma separated)'}
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="CST Studio, MATLAB, Ka-Band, RF Design"
                className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  {isAr ? 'المدة الزمنية المتوقعة' : 'Expected Timeline'}
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                >
                  <option value="أقل من أسبوع">{isAr ? 'أقل من أسبوع' : 'Less than 1 week'}</option>
                  <option value="من أسبوع إلى أسبوعين">{isAr ? 'من أسبوع إلى أسبوعين' : '1 to 2 weeks'}</option>
                  <option value="من أسبوعين إلى شهر">{isAr ? 'من أسبوعين إلى شهر' : '2 to 4 weeks'}</option>
                  <option value="أكثر من شهر">{isAr ? 'أكثر من شهر' : 'More than 1 month'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  {isAr ? 'ميزانية المشروع المقترحة ($)' : 'Proposed Project Budget ($)'}
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  min={50}
                  className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-mono"
                  required
                />
              </div>
            </div>

            {/* Clean Escrow Protection Card */}
            <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 space-y-3">
              <h3 className="font-bold text-cyan-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'ضمان حماية حقوق العقد (100% Escrow Protection)' : '100% Escrow Milestone Protection Guarantee'}</span>
              </h3>
              <div className="text-xs space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>{isAr ? 'ميزانية المشروع المحددة للعمل:' : 'Project Working Budget:'}</span>
                  <span className="font-black text-white font-mono">${budget}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>{isAr ? 'حالة الحساب المالي:' : 'Escrow Deposit Status:'}</span>
                  <span className="text-emerald-400 font-bold">{isAr ? 'محمي ومؤمن في حساب الضمان' : 'Fully Secured in Escrow Vault'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{isAr ? 'المعالجة والتسوية المالية:' : 'Backend Settlement Engine:'}</span>
                  <span className="text-cyan-300 font-medium">{isAr ? 'مؤتمتة بالكامل في الخلفية (Backend)' : '100% Automated Backend Execution'}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal border-t border-slate-800/80 pt-2.5">
                {isAr
                  ? 'تضمن المنصة حجز المبلغ بأمان تام، ولا يتم تحرير أي دفعة للمهندس إلا بعد استلامك المخرجات الهندسية وموافقتك النهائية عليها.'
                  : 'Funds remain securely locked in Escrow and are only disbursed after you inspect and approve verified engineering deliverables.'}
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black rounded-xl text-sm shadow-xl shadow-cyan-500/20 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isAr ? 'نشر المشروع وتلقي العروض' : 'Publish Job & Receive Proposals'}</span>
            </button>
          </form>
        )}

        {/* Emadsoft Branding Tag */}
        <div className="pt-4 border-t border-slate-800 flex justify-center items-center text-xs text-slate-400 font-semibold gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}</span>
        </div>
      </div>
    </div>
  );
}
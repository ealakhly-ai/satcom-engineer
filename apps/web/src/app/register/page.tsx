'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, 
  Satellite, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  Globe, 
  Compass, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function RegisterPage() {
  const router = useRouter();
  const { t, locale, toggleLocale, dir } = useLanguage();
  const isAr = locale === 'ar';

  // Step 1: Choose Persona (Upwork-Style: Client vs Freelancer)
  // Step 2: Fill tailored registration form
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<'client' | 'freelancer'>('client');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Client Form State
  const [clientForm, setClientForm] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
    country: isAr ? 'الإمارات العربية المتحدة' : 'United Arab Emirates',
    projectScope: 'Ka-Band Phased Array',
    agreeEscrow: true,
  });

  // Freelancer Form State
  const [freelancerForm, setFreelancerForm] = useState({
    fullName: '',
    prefix: 'Eng.',
    specialty: 'Satellite Communications (Satcom)',
    hourlyRate: '',
    email: '',
    password: '',
    country: isAr ? 'السعودية' : 'Saudi Arabia',
    tools: '',
    agreeEscrow: true,
  });

  const handleSelectRoleAndProceed = () => {
    setStep(2);
  };

  const handleSubmitClient = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (typeof window !== 'undefined') {
        const fullName = `${clientForm.firstName} ${clientForm.lastName}`.trim();
        const clientData = {
          name: fullName || (isAr ? 'صاحب العمل' : 'Enterprise Client'),
          companyAr: clientForm.companyName,
          companyEn: clientForm.companyName,
          email: clientForm.email,
          tierAr: 'حساب مؤسسي معتمد (Enterprise Gold)',
          tierEn: 'Enterprise Gold Certified Client',
          phone: clientForm.country,
          currency: 'USD ($)',
          twoFactor: true,
        };
        localStorage.setItem('satcom_client_profile', JSON.stringify(clientData));
      }
    } catch (err) {}
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(true);
      setTimeout(() => {
        router.push('/client/dashboard');
      }, 1200);
    }, 800);
  };

  const handleSubmitFreelancer = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (typeof window !== 'undefined') {
        const fullName = `${freelancerForm.prefix} ${freelancerForm.fullName}`.trim();
        const rate = Number(freelancerForm.hourlyRate) || 50;
        const skillsList = freelancerForm.tools
          ? freelancerForm.tools.split(',').map((s) => s.trim()).filter(Boolean)
          : ['Satcom', 'RF Systems'];

        const freelancerData = {
          id: 'tal-' + Date.now(),
          nameAr: fullName,
          nameEn: fullName,
          titleAr: freelancerForm.specialty,
          titleEn: freelancerForm.specialty,
          locationAr: freelancerForm.country,
          locationEn: freelancerForm.country,
          hourlyRate: rate,
          totalEarned: '$0.00',
          jobSuccess: 100,
          topRated: false,
          verifiedEngineer: true,
          bioAr: `${freelancerForm.specialty} - مهندس اتصالات فضائية معتمد.`,
          bioEn: `${freelancerForm.specialty} - Certified Satcom Engineer.`,
          skills: skillsList,
          completedJobs: 0,
          hoursWorked: '0 hrs',
          avatarBg: 'bg-indigo-600',
        };

        const existing = JSON.parse(localStorage.getItem('satcom_registered_freelancers') || '[]');
        existing.unshift(freelancerData);
        localStorage.setItem('satcom_registered_freelancers', JSON.stringify(existing));
        localStorage.setItem('satcom_freelancer_profile', JSON.stringify(freelancerData));
      }
    } catch (err) {}
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(true);
      setTimeout(() => {
        router.push('/freelancer/dashboard');
      }, 1200);
    }, 800);
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 py-12 bg-transparent" dir={dir}>
      {/* Radiant Cosmic Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/20 to-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-10 space-y-8 relative z-10 hover:border-cyan-500/30 transition duration-300">
        
        {/* Top Header & Language Switcher */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg border border-cyan-500/40 bg-[#070b19] flex-shrink-0 p-0.5">
              <img src="/logo.png" alt="Satcom Engineers" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white leading-tight">Satcom Engineers</h2>
              <span className="text-[10px] text-cyan-300 font-bold bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/40">
                {isAr ? 'سوق العمل الهندسي الفضائي' : 'SPACE & RF TELECOM MARKETPLACE'}
              </span>
            </div>
          </div>

          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 hover:border-cyan-400 bg-slate-800/80 text-cyan-200 text-xs font-bold transition cursor-pointer shadow-xs"
            title="تبديل اللغة / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('switchLang')}</span>
          </button>
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>
                {isAr 
                  ? 'تم إنشاء حسابك بنجاح! جاري توجيهك إلى مساحة العمل الخاصة بك...' 
                  : 'Account created successfully! Redirecting to your workspace...'}
              </span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 1: UPWORK-STYLE PERSONA SELECTION (CLIENT OR FREELANCER)              */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="px-3.5 py-1 rounded-full text-[11px] font-black bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 inline-block shadow-xs">
                {isAr ? 'الخطوة 1 من 2 • تحديد صفة الحساب' : 'Step 1 of 2 • Choose Your Role'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {isAr 
                  ? 'انضم إلى Satcom Engineers كصاحب عمل أو كمهندس مستقل' 
                  : 'Join as a Client Hiring Talent or as a Freelance Engineer'}
              </h1>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {isAr
                  ? 'اختر طبيعة حسابك للاستفادة من واجهات مخصصة وحماية مالية كاملة 100% عبر Escrow'
                  : 'Select your account role to experience tailored workflows with 100% Escrow security'}
              </p>
            </div>

            {/* Upwork Interactive Two-Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Card 1: Client / Employer */}
              <div
                onClick={() => setRole('client')}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 relative group flex flex-col justify-between ${
                  role === 'client'
                    ? 'bg-gradient-to-b from-cyan-950/40 to-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/15 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                {/* Radio indicator */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
                    role === 'client' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Briefcase className="w-6 h-6" />
                  </div>

                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                    role === 'client' ? 'border-cyan-400 bg-cyan-500 text-white' : 'border-slate-600'
                  }`}>
                    {role === 'client' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition">
                    {isAr ? 'أنا عميل / صاحب عمل، أبحث عن مهندسين' : "I'm a client, hiring for a project"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isAr
                      ? 'نشر مشاريع فضائية، توظيف نخبة مهندسي الأقمار الصناعية و RF، وتأمين الدفع 100% في حساب Escrow حتى اعتماد المخرجات.'
                      : 'Post satellite jobs, contract vetted space & RF engineers, and fund milestone payments safely through Escrow vaults.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-bold text-cyan-400">
                  <span>{isAr ? '✓ نشر مشاريع فورية' : '✓ Instant Job Publishing'}</span>
                  <span>•</span>
                  <span>{isAr ? '✓ فواتير ضريبية معتمدة' : '✓ Certified Invoices'}</span>
                </div>
              </div>

              {/* Card 2: Freelancer / Satellite Engineer */}
              <div
                onClick={() => setRole('freelancer')}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 relative group flex flex-col justify-between ${
                  role === 'freelancer'
                    ? 'bg-gradient-to-b from-indigo-950/40 to-slate-900 border-indigo-400 shadow-xl shadow-indigo-500/15 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                {/* Radio indicator */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
                    role === 'freelancer' ? 'bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Satellite className="w-6 h-6" />
                  </div>

                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                    role === 'freelancer' ? 'border-indigo-400 bg-indigo-500 text-white' : 'border-slate-600'
                  }`}>
                    {role === 'freelancer' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-black text-white group-hover:text-indigo-300 transition">
                    {isAr ? 'أنا مهندس مستقل، أبحث عن مشاريع' : "I'm a freelancer, looking for work"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isAr
                      ? 'التقديم على عقود تصميم الهوائيات، المحطات الأرضية، ونظم SDR مع استلام 100% كاملة من أتعابك بدون أي خصم نسبي من المنصة.'
                      : 'Browse Satcom, RF antenna, and SDR contracts, submit proposals, and collect 100% of your earnings with 0% platform fee cut.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-bold text-indigo-400">
                  <span>{isAr ? '✓ 0% استقطاع نسبي' : '✓ 0% Freelancer Fee'}</span>
                  <span>•</span>
                  <span>{isAr ? '✓ سحب فوري متعدد البوابات' : '✓ Global Payouts'}</span>
                </div>
              </div>

            </div>

            {/* Step 1 Action Button */}
            <div className="pt-2 flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={handleSelectRoleAndProceed}
                className="w-full sm:w-80 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm shadow-xl shadow-cyan-500/25 transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {role === 'client' 
                    ? (isAr ? 'المتابعة كصاحب عمل (Client)' : 'Apply as a Client')
                    : (isAr ? 'المتابعة كمهندس مستقل (Freelancer)' : 'Apply as a Freelancer')}
                </span>
                {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="text-xs text-slate-400">
                {isAr ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
                <Link href="/login" className="text-cyan-400 font-bold hover:underline">
                  {isAr ? 'تسجيل الدخول' : 'Log In'}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: TAILORED REGISTRATION FORMS (CLIENT OR FREELANCER)                 */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Step 2 Subheader with Role Badge and Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer mb-1"
                >
                  {dir === 'rtl' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                  <span>{isAr ? 'تغيير صفة الحساب' : 'Change account type'}</span>
                </button>
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {role === 'client'
                    ? (isAr ? 'إنشاء حساب عميل ومؤسسة هندسية' : 'Create Client & Enterprise Account')
                    : (isAr ? 'إنشاء حساب مهندس اتصالات فضائية' : 'Create Satellite Engineer Profile')}
                </h1>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-xs font-bold text-slate-300 border border-slate-700 self-start">
                {role === 'client' ? <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> : <Satellite className="w-3.5 h-3.5 text-indigo-400" />}
                <span>{role === 'client' ? (isAr ? 'وضع العميل' : 'Client Mode') : (isAr ? 'وضع المهندس المستقل' : 'Freelancer Mode')}</span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* FORM A: CLIENT REGISTRATION                                   */}
            {/* ------------------------------------------------------------- */}
            {role === 'client' && (
              <form onSubmit={handleSubmitClient} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'الاسم الأول' : 'First Name'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isAr ? 'أحمد' : 'Ahmed'}
                      value={clientForm.firstName}
                      onChange={(e) => setClientForm({ ...clientForm, firstName: e.target.value })}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'اسم العائلة' : 'Last Name'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isAr ? 'المنصوري' : 'Al-Mansouri'}
                      value={clientForm.lastName}
                      onChange={(e) => setClientForm({ ...clientForm, lastName: e.target.value })}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isAr ? 'اسم الشركة أو المؤسسة الهندسية' : 'Company or Enterprise Name'}
                  </label>
                  <div className="relative">
                    <Building2 className={`w-4 h-4 text-slate-400 absolute top-3.5 ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'}`} />
                    <input
                      type="text"
                      required
                      placeholder={isAr ? 'شركة مدارات الفضاء المتقدمة' : 'Orbital Space Systems Ltd'}
                      value={clientForm.companyName}
                      onChange={(e) => setClientForm({ ...clientForm, companyName: e.target.value })}
                      className={`w-full py-2.5 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 ${
                        dir === 'rtl' ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'البريد الإلكتروني للعمل' : 'Work Email Address'}
                    </label>
                    <div className="relative">
                      <Mail className={`w-4 h-4 text-slate-400 absolute top-3.5 ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'}`} />
                      <input
                        type="email"
                        required
                        placeholder="contact@company.com"
                        value={clientForm.email}
                        onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                        className={`w-full py-2.5 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 ${
                          dir === 'rtl' ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'كلمة المرور' : 'Password'}
                    </label>
                    <div className="relative">
                      <Lock className={`w-4 h-4 text-slate-400 absolute top-3.5 ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'}`} />
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={clientForm.password}
                        onChange={(e) => setClientForm({ ...clientForm, password: e.target.value })}
                        className={`w-full py-2.5 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 ${
                          dir === 'rtl' ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'الدولة / المقر' : 'Country / Headquarters'}
                    </label>
                    <input
                      type="text"
                      value={clientForm.country}
                      onChange={(e) => setClientForm({ ...clientForm, country: e.target.value })}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'المجال الهندسي المطلوب للمشاريع' : 'Primary Project Domain'}
                    </label>
                    <select
                      value={clientForm.projectScope}
                      onChange={(e) => setClientForm({ ...clientForm, projectScope: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Ka-Band Phased Array">هوائيات المصفوفة الطورية Ka/Ku-Band</option>
                      <option value="Ground Station VSAT">محطات أرضية وأطباق تتبع VSAT</option>
                      <option value="Link Budget Simulation">حساب ميزانية الوصلات (Link Budget)</option>
                      <option value="SDR & Telemetry DSP">معالجة الإشارات وراديو برمجي SDR</option>
                      <option value="CubeSat Payload">حمولات الأقمار النانوية CubeSat</option>
                    </select>
                  </div>
                </div>

                {/* Escrow Guarantee Checkbox */}
                <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="clientAgree"
                    checked={clientForm.agreeEscrow}
                    onChange={(e) => setClientForm({ ...clientForm, agreeEscrow: e.target.checked })}
                    className="mt-1 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-400 cursor-pointer"
                    required
                  />
                  <label htmlFor="clientAgree" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
                    <span className="font-bold text-cyan-300">
                      {isAr ? 'حماية الضمان المالي 100% Escrow: ' : '100% Escrow Protection: '}
                    </span>
                    {isAr
                      ? 'أوافق على شروط الخدمة وتأمين أموال العقود في حساب الضمان Escrow حتى اكتمال واعتماد مخرجات المشروع الهندسية.'
                      : 'I agree to the Terms of Service and escrow security policies protecting project milestone funds.'}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black rounded-xl text-xs shadow-lg shadow-cyan-500/25 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>{isAr ? 'جاري إنشاء الحساب...' : 'Creating Client Account...'}</span>
                  ) : (
                    <>
                      <Briefcase className="w-4 h-4" />
                      <span>{isAr ? 'إنشاء حساب صاحب العمل والدخول' : 'Create Client Account'}</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ------------------------------------------------------------- */}
            {/* FORM B: FREELANCER (ENGINEER) REGISTRATION                    */}
            {/* ------------------------------------------------------------- */}
            {role === 'freelancer' && (
              <form onSubmit={handleSubmitFreelancer} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'اللقب المهني' : 'Title Prefix'}
                    </label>
                    <select
                      value={freelancerForm.prefix}
                      onChange={(e) => setFreelancerForm({ ...freelancerForm, prefix: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Eng.">م. (مهندس)</option>
                      <option value="Dr.">د. (دكتوراه)</option>
                      <option value="Prof.">أ.د (بروفيسور)</option>
                      <option value="Senior Arch.">كبير مهندسين</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'الاسم الكامل واللقب' : 'Full Name'}
                    </label>
                    <div className="relative">
                      <User className={`w-4 h-4 text-slate-400 absolute top-3.5 ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'}`} />
                      <input
                        type="text"
                        required
                        placeholder={isAr ? 'م. أحمد المنصوري' : 'Eng. Ahmed Al-Mansouri'}
                        value={freelancerForm.fullName}
                        onChange={(e) => setFreelancerForm({ ...freelancerForm, fullName: e.target.value })}
                        className={`w-full py-2.5 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs focus:outline-none focus:border-cyan-400 ${
                          dir === 'rtl' ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'التخصص الهندسي الدقيق' : 'Engineering Specialty'}
                    </label>
                    <select
                      value={freelancerForm.specialty}
                      onChange={(e) => setFreelancerForm({ ...freelancerForm, specialty: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Satellite Communications (Satcom)">اتصالات الأقمار الصناعية (Satcom)</option>
                      <option value="RF & Microwave Antenna Engineering">هندسة هوائيات الترددات RF والميكروويف</option>
                      <option value="SDR & Digital Signal Processing">الراديو البرمجي SDR ومعالجة الإشارات</option>
                      <option value="Link Budget & Earth Station">المحطات الأرضية وميزانية الوصلات</option>
                      <option value="Spacecraft Payload Architecture">أنظمة حمولات الأقمار الصناعية</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'الأجر المقترح بالساعة ($/hr)' : 'Hourly Rate ($/hr)'}
                    </label>
                    <div className="relative">
                      <span className={`absolute top-2.5 text-emerald-400 font-mono font-bold text-sm ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'}`}>$</span>
                      <input
                        type="number"
                        required
                        min="15"
                        max="500"
                        value={freelancerForm.hourlyRate}
                        onChange={(e) => setFreelancerForm({ ...freelancerForm, hourlyRate: e.target.value })}
                        className={`w-full py-2.5 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs font-mono font-bold focus:outline-none focus:border-cyan-400 ${
                          dir === 'rtl' ? 'pr-9 pl-3.5' : 'pl-9 pr-3.5'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'البريد الإلكتروني المهني' : 'Professional Email'}
                    </label>
                    <div className="relative">
                      <Mail className={`w-4 h-4 text-slate-400 absolute top-3.5 ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'}`} />
                      <input
                        type="email"
                        required
                        placeholder="engineer@satcom.com"
                        value={freelancerForm.email}
                        onChange={(e) => setFreelancerForm({ ...freelancerForm, email: e.target.value })}
                        className={`w-full py-2.5 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs focus:outline-none focus:border-cyan-400 ${
                          dir === 'rtl' ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'كلمة المرور' : 'Password'}
                    </label>
                    <div className="relative">
                      <Lock className={`w-4 h-4 text-slate-400 absolute top-3.5 ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'}`} />
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={freelancerForm.password}
                        onChange={(e) => setFreelancerForm({ ...freelancerForm, password: e.target.value })}
                        className={`w-full py-2.5 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs focus:outline-none focus:border-cyan-400 ${
                          dir === 'rtl' ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isAr ? 'المهارات والبرمجيات الهندسية المتقنة' : 'Engineering Tools & Skills'}
                  </label>
                  <input
                    type="text"
                    value={freelancerForm.tools}
                    onChange={(e) => setFreelancerForm({ ...freelancerForm, tools: e.target.value })}
                    placeholder="CST Studio, MATLAB, GNU Radio, HFSS, Phased Array, Link Budget"
                    className="w-full py-2.5 px-3.5 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Escrow Guarantee Checkbox */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="engineerAgree"
                    checked={freelancerForm.agreeEscrow}
                    onChange={(e) => setFreelancerForm({ ...freelancerForm, agreeEscrow: e.target.checked })}
                    className="mt-1 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-400 cursor-pointer"
                    required
                  />
                  <label htmlFor="engineerAgree" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
                    <span className="font-bold text-emerald-300">
                      {isAr ? 'استلام 100% كاملة من الأرباح: ' : '100% Net Earnings Payout: '}
                    </span>
                    {isAr
                      ? 'أوافق على استلام كامل مستحقاتي بدون أي خصم نسبة مئوية، وبحماية كاملة 100% عبر حساب الضمان Escrow.'
                      : 'I agree to receive 100% of my contract earnings with zero percentage cut under Escrow guarantee.'}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-500/25 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>{isAr ? 'جاري تسجيل المهندس...' : 'Creating Engineer Account...'}</span>
                  ) : (
                    <>
                      <Satellite className="w-4 h-4" />
                      <span>{isAr ? 'إنشاء حساب المهندس المستقل والدخول' : 'Create Freelancer Account'}</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
              {isAr ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
              <Link href="/login" className="text-cyan-400 font-bold hover:underline">
                {isAr ? 'تسجيل الدخول' : 'Sign In'}
              </Link>
            </div>
          </div>
        )}

        {/* Footer Branding Credit */}
        <div className="pt-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-cyan-400 font-extrabold">تصميم وتطوير Emadsoft</span>
          </div>
        </div>

      </div>
    </div>
  );
}
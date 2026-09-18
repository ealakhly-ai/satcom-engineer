'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Clock, 
  DollarSign, 
  Search, 
  Filter, 
  ShieldCheck, 
  Star, 
  Bookmark, 
  MapPin, 
  CheckCircle2, 
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function JobsPage() {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  const [activeTab, setActiveTab] = useState<'matches' | 'recent' | 'saved'>('matches');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBand, setSelectedBand] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [savedJobs, setSavedJobs] = useState<string[]>(['job-1']);

  const toggleSave = (id: string) => {
    setSavedJobs((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const [jobsList, setJobsList] = useState<any[]>([]);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('satcom_posted_jobs');
      if (stored) {
        setJobsList(JSON.parse(stored));
      } else {
        setJobsList([]);
      }
    } catch (e) {
      setJobsList([]);
    }
  }, []);

  // Filtering logic
  const filteredJobs = jobsList.filter((job) => {
    if (activeTab === 'saved' && !savedJobs.includes(job.id)) return false;
    if (selectedBand !== 'all' && job.band !== selectedBand) return false;
    if (selectedType !== 'all') {
      if (selectedType === 'fixed' && !job.jobTypeEn?.includes('Fixed')) return false;
      if (selectedType === 'hourly' && !job.jobTypeEn?.includes('Hourly')) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = (job.titleAr + job.titleEn).toLowerCase().includes(q);
      const skillMatch = job.skills && job.skills.some((s: string) => s.toLowerCase().includes(q));
      return titleMatch || skillMatch;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir={dir}>
      {/* Job Search Bar & Header with Dark Cosmic Glass */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Briefcase className="w-6 h-6 text-cyan-400" />
              <span>{t('jobFeedTitle')}</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">{t('jobFeedSubtitle')}</p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-cyan-950/70 text-cyan-300 rounded-xl text-xs font-bold border border-cyan-800/50 self-start">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? '100% تسليم أتعاب للمهندس وضمان مالي مشفر' : '100% Payout to Engineers with Escrow Protection'}</span>
          </div>
        </div>

        {/* Global Big Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن مشاريع بالكلمات المفتاحية: Ka-Band, CST, SDR, Link Budget...' : 'Search for projects by keywords: Ka-Band, CST, SDR, Link Budget...'}
            className={`w-full py-3.5 rounded-2xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm text-white bg-slate-800/80 shadow-xs placeholder-slate-400 ${
              dir === 'rtl' ? 'pr-12 pl-24' : 'pl-12 pr-24'
            }`}
          />
          <Search className={`w-5 h-5 text-slate-400 absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'}`} />
          <button
            className={`absolute top-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black rounded-xl text-xs transition cursor-pointer shadow-md ${
              dir === 'rtl' ? 'left-2' : 'right-2'
            }`}
          >
            {isAr ? 'بحث' : 'Search'}
          </button>
        </div>
      </div>

      {/* Main Content Layout (Sidebar Filters + Feed) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar: Filters in Cosmic Dark */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-extrabold text-sm text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                <span>{isAr ? 'فلاتر المشاريع' : 'Job Filters'}</span>
              </span>
              <button 
                onClick={() => { setSelectedBand('all'); setSelectedType('all'); setSearchQuery(''); }}
                className="text-[11px] font-bold text-cyan-400 hover:underline cursor-pointer"
              >
                {isAr ? 'إعادة ضبط' : 'Reset'}
              </button>
            </div>

            {/* Specialty / Band Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-2.5">
                {t('filterSpecialty')}
              </label>
              <div className="space-y-1.5 text-xs text-slate-300">
                {['all', 'Ka-Band', 'Ku-Band', 'C-Band', 'SDR'].map((band) => (
                  <label 
                    key={band} 
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="bandFilter"
                        checked={selectedBand === band}
                        onChange={() => setSelectedBand(band)}
                        className="text-cyan-500 focus:ring-cyan-400"
                      />
                      <span>{band === 'all' ? (isAr ? 'كافة النطاقات' : 'All Bands') : band}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div className="border-t border-slate-800 pt-4">
              <label className="block text-xs font-bold text-slate-200 mb-2.5">
                {t('filterExperience')}
              </label>
              <div className="space-y-1.5 text-xs text-slate-300">
                <label className="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded-lg cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-cyan-500 focus:ring-cyan-400" />
                  <span>{t('expExpert')}</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded-lg cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-cyan-500 focus:ring-cyan-400" />
                  <span>{t('expIntermediate')}</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded-lg cursor-pointer">
                  <input type="checkbox" className="rounded text-cyan-500 focus:ring-cyan-400" />
                  <span>{t('expEntry')}</span>
                </label>
              </div>
            </div>

            {/* Client Reliability */}
            <div className="border-t border-slate-800 pt-4">
              <label className="block text-xs font-bold text-slate-200 mb-2.5">
                {t('filterClientInfo')}
              </label>
              <div className="space-y-1.5 text-xs text-slate-300">
                <label className="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded-lg cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-cyan-500 focus:ring-cyan-400" />
                  <span className="text-emerald-400 font-bold">{t('clientVerified')}</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded-lg cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-cyan-500 focus:ring-cyan-400" />
                  <span>{isAr ? 'أنفق أكثر من $10,000+' : '$10k+ Spent'}</span>
                </label>
              </div>
            </div>

            {/* Escrow Guarantee Highlight Card */}
            <div className="p-4 bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-800/40 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-extrabold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'ضمان Escrow المالي 100%' : '100% Escrow Protection'}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isAr 
                  ? 'يتم حجز قيمة المشروع كاملة في حساب الضمان قبل بدء العمل، والمهندس يستلم 100% من أتعابه كاملة دون أي استقطاع.' 
                  : 'Project funds are safely locked in Escrow before work begins. Engineers receive 100% of agreed earnings with zero freelancer cut.'}
              </p>
            </div>
          </div>
        </aside>

        {/* Right Area: Job Feed in Cosmic Dark */}
        <main className="lg:col-span-3 space-y-4">
          
          {/* Feed Tabs */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-2 flex items-center justify-between shadow-lg backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('matches')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === 'matches'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {t('tabBestMatches')}
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === 'recent'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {t('tabMostRecent')}
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'saved'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{t('tabSavedJobs')}</span>
                <span className="px-1.5 py-0.2 bg-white/20 text-white rounded-full text-[10px]">
                  {savedJobs.length}
                </span>
              </button>
            </div>

            <div className="text-xs text-slate-400 px-3 hidden sm:block">
              {filteredJobs.length} {isAr ? 'مشروع متاح' : 'jobs found'}
            </div>
          </div>

          {/* Job Feed Cards */}
          {filteredJobs.length === 0 ? (
            <div className="p-12 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-3">
              <Briefcase className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">
                {isAr ? 'لم يتم العثور على مشاريع تطابق بحثك' : 'No jobs found matching your criteria'}
              </h3>
              <p className="text-xs text-slate-400">
                {isAr ? 'جرّب تغيير كلمات البحث أو إعادة ضبط الفلاتر' : 'Try adjusting your search keywords or resetting filters.'}
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isSaved = savedJobs.includes(job.id);
              return (
                <article
                  key={job.id}
                  className="rounded-3xl bg-slate-900/85 border border-slate-800 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/10 transition p-6 sm:p-7 space-y-4"
                >
                  {/* Top line: posted time & save bookmark */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isAr ? `نُشر ${job.createdAtAr}` : `Posted ${job.createdAtEn}`}</span>
                      <span>•</span>
                      <span className="font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800/40">
                        {job.band}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleSave(job.id)}
                      className={`p-2 rounded-xl transition cursor-pointer ${
                        isSaved ? 'text-rose-400 bg-rose-950/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                      title={isSaved ? 'إزالة من المحفوظات' : 'حفظ المشروع'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Job Title */}
                  <div>
                    <h2 className="text-lg font-black text-white hover:text-cyan-400 transition leading-snug">
                      <Link href={`/jobs/${job.id}`}>
                        {isAr ? job.titleAr : job.titleEn}
                      </Link>
                    </h2>

                    {/* Meta pills: Price, Experience, Duration */}
                    <div className="flex flex-wrap items-center gap-3 text-xs mt-2">
                      <span className="font-extrabold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800/50 flex items-center gap-1 font-mono">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>${job.budget}</span>
                        <span className="text-[10px] font-medium text-emerald-300">({isAr ? job.jobTypeAr : job.jobTypeEn})</span>
                      </span>

                      <span className="bg-slate-800 px-3 py-1 rounded-xl font-medium text-slate-300 border border-slate-700">
                        {isAr ? job.experienceLevelAr : job.experienceLevelEn}
                      </span>

                      <span className="bg-slate-800 px-3 py-1 rounded-xl font-medium text-slate-300 border border-slate-700">
                        {isAr ? `المدة: ${job.durationAr}` : `Est. Time: ${job.durationEn}`}
                      </span>
                    </div>
                  </div>

                  {/* Job Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isAr ? job.descAr : job.descEn}
                  </p>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-slate-800 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-800/50 rounded-xl text-xs font-semibold transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Client Info & Apply Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800 text-xs">
                    {/* Client Reliability Badges */}
                    <div className="flex flex-wrap items-center gap-3 text-slate-400">
                      {job.paymentVerified && (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isAr ? 'دفع معتمد' : 'Payment Verified'}</span>
                        </span>
                      )}

                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{job.clientRating.toFixed(1)}</span>
                      </span>

                      <span>{job.clientSpent} {isAr ? 'إجمالي الإنفاق' : 'spent'}</span>

                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{job.clientLocation}</span>
                      </span>

                      <span>•</span>
                      <span className="text-cyan-400 font-bold">
                        {job.proposalsCount} {t('proposals')}
                      </span>
                    </div>

                    {/* Apply Button */}
                    <Link
                      href={`/jobs/${job.id}`}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold rounded-xl text-xs shadow-md shadow-cyan-500/20 transition flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer"
                    >
                      <span>{t('applyNow')}</span>
                      {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </Link>
                  </div>
                </article>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
}
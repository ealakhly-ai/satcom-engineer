'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Star, 
  ShieldCheck, 
  MapPin, 
  CheckCircle, 
  Award, 
  Mail, 
  Sparkles, 
  Briefcase,
  DollarSign,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function FreelancersPage() {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [talentList, setTalentList] = useState<any[]>([]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('satcom_registered_freelancers');
        if (saved) {
          setTalentList(JSON.parse(saved));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const filteredTalent = talentList.filter((talent) => {
    if (selectedTag !== 'all' && (!talent.skills || !talent.skills.some((s: string) => s.toLowerCase() === selectedTag.toLowerCase()))) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (isAr ? talent.nameAr || talent.nameEn : talent.nameEn || talent.nameAr)?.toLowerCase().includes(q);
      const matchTitle = (isAr ? talent.titleAr || talent.titleEn : talent.titleEn || talent.titleAr)?.toLowerCase().includes(q);
      const matchSkills = talent.skills && talent.skills.some((s: string) => s.toLowerCase().includes(q));
      if (!matchName && !matchTitle && !matchSkills) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir={dir}>
      {/* Talent Search Header with Cosmic Dark Glass */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Users className="w-6 h-6 text-cyan-400" />
              <span>{t('talentTitle')}</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">{t('talentSubtitle')}</p>
          </div>

          {/* Guarantee Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-950/70 text-emerald-300 rounded-xl text-xs font-bold border border-emerald-800/50 self-start">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'كفاءات معتمدة 100% بدون عمولات مقتطعة' : '100% Vetted Talent • 0% Cut on Earnings'}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن مهندس بالاسم أو المهارة (مثل: CST Studio, SDR, Link Budget)...' : 'Search engineers by name or specialty (e.g., CST Studio, SDR, Link Budget)...'}
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

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-xs font-bold text-slate-400 mr-2">{isAr ? 'التصنيفات الرائجة:' : 'Popular Tags:'}</span>
          {['all', 'Ka-Band', 'CST Studio', 'SDR', 'Link Budget', 'GNU Radio', 'CubeSat'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tag === 'all' ? (isAr ? 'الكل' : 'All') : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Talent Cards Grid in Cosmic Dark */}
      <div className="space-y-6">
        {talentList.length === 0 ? (
          <div className="p-16 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">
              {isAr ? 'لا يوجد مهندسون مسجلون حالياً' : 'No Registered Engineers Yet'}
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {isAr
                ? 'كن أول مهندس ينضم إلى نخبة خبراء الاتصالات الفضائية وسجل حسابك الآن لتلقي العروض الهندسية.'
                : 'Be the first engineer to join the elite satcom talent pool and register your profile to receive project offers.'}
            </p>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition"
              >
                <span>{isAr ? 'تسجيل حساب مهندس جديد' : 'Register as Engineer'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        ) : filteredTalent.length === 0 ? (
          <div className="p-12 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-3">
            <Users className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">
              {isAr ? 'لم يتم العثور على مهندسين بهذه المواصفات' : 'No engineers found matching your search'}
            </h3>
            <p className="text-xs text-slate-400">
              {isAr ? 'يرجى تجربة كلمات بحث أخرى أو اختيار تصنيف مختلف' : 'Try searching different keywords or selecting another tag.'}
            </p>
          </div>
        ) : (
          filteredTalent.map((engineer) => (
            <article
              key={engineer.id}
              className="rounded-3xl bg-slate-900/85 border border-slate-800 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/10 transition p-6 sm:p-8 space-y-5"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                
                {/* Left: Avatar & Info */}
                <div className="flex items-start gap-4">
                  {/* Avatar with Online Status */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl ${engineer.avatarBg} text-white font-black text-xl flex items-center justify-center shadow-lg border-2 border-slate-700`}>
                      {(isAr ? engineer.nameAr : engineer.nameEn).slice(0, 2).toUpperCase()}
                    </div>
                    <span 
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-slate-900 rounded-full"
                      title="متاح للعمل الآن / Available now"
                    />
                  </div>

                  {/* Name, Title, Location, Badges */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-black text-white hover:text-cyan-400 transition">
                        {isAr ? engineer.nameAr : engineer.nameEn}
                      </h2>
                      
                      {/* Top Rated Badge */}
                      {engineer.topRated && (
                        <span className="flex items-center gap-1 bg-amber-950/70 text-amber-300 border border-amber-700/50 px-3 py-0.5 rounded-full text-[11px] font-bold">
                          <Star className="w-3 h-3 fill-current text-amber-400" />
                          <span>{t('topRated')}</span>
                        </span>
                      )}

                      {/* Verified Engineer Badge */}
                      {engineer.verifiedEngineer && (
                        <span className="flex items-center gap-1 bg-cyan-950/70 text-cyan-300 border border-cyan-700/50 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                          <ShieldCheck className="w-3 h-3 text-cyan-400" />
                          <span>{isAr ? 'مهندس معتمد' : 'Verified'}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-bold text-slate-300 leading-snug">
                      {isAr ? engineer.titleAr : engineer.titleEn}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{isAr ? engineer.locationAr : engineer.locationEn}</span>
                      </span>
                      <span>•</span>
                      <span>{engineer.completedJobs} {isAr ? 'عقد مكتمل' : 'contracts'}</span>
                      <span>•</span>
                      <span>{engineer.hoursWorked}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Metrics (Rate, JSS, Earned) */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4 p-3 bg-slate-800/60 md:bg-transparent rounded-2xl md:p-0">
                  <div>
                    <div className="text-2xl font-black text-white md:text-right font-mono">
                      ${engineer.hourlyRate} <span className="text-xs font-semibold text-slate-400">/ {isAr ? 'ساعة' : 'hr'}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-bold md:text-right font-mono">
                      {engineer.totalEarned} {isAr ? 'إجمالي الأرباح' : 'earned'}
                    </div>
                  </div>

                  {/* Job Success Score */}
                  <div className="flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 px-3 py-1 rounded-xl text-xs font-black">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{engineer.jobSuccess}% {isAr ? 'نسبة النجاح' : 'Job Success'}</span>
                  </div>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                {isAr ? engineer.bioAr : engineer.bioEn}
              </p>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2">
                {engineer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>{isAr ? 'متاح للعمل على مشاريع بالساعة أو بسعر ثابت (Escrow)' : 'Available for hourly or fixed-price (Escrow) contracts'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{t('sendMessage')}</span>
                  </button>

                  <button
                    className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-extrabold shadow-md shadow-cyan-500/20 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{t('inviteToJob')}</span>
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
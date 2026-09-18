'use client';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Users, Award, Briefcase, PlusCircle, CheckCircle2, Building2, UserPlus, Sparkles } from 'lucide-react';

export default function AgencyPortalPage() {
  const { lang, dir } = useLanguage();
  const isAr = lang === 'ar';

  const [agency, setAgency] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('satcom_agency');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return {
      name: '',
      tagline: '',
      membersCount: 0,
      completedJobs: 0,
      totalEarnings: '$0.00',
      jobSuccessScore: 0,
      members: [],
    };
  });

  const [showSetup, setShowSetup] = useState(false);
  const [setupName, setSetupName] = useState('');
  const [setupTagline, setSetupTagline] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [memberTitle, setMemberTitle] = useState('');
  const [memberRole, setMemberRole] = useState(isAr ? 'مهندس شريك' : 'Partner Engineer');

  const handleCreateAgency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!setupName.trim()) return;
    const newAgency = {
      name: setupName,
      tagline: setupTagline || (isAr ? 'وكالة هندسية معتمدة لحلول الاتصالات الفضائية' : 'Certified Satellite & RF Engineering Agency'),
      membersCount: 0,
      completedJobs: 0,
      totalEarnings: '$0.00',
      jobSuccessScore: 0,
      members: [],
    };
    setAgency(newAgency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('satcom_agency', JSON.stringify(newAgency));
    }
    setShowSetup(false);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;
    const updatedMembers = [
      ...agency.members,
      {
        name: memberName,
        title: memberTitle || (isAr ? 'مهندس اتصالات وفضاء' : 'Satcom Engineer'),
        role: memberRole,
      },
    ];
    const updatedAgency = {
      ...agency,
      members: updatedMembers,
      membersCount: updatedMembers.length,
    };
    setAgency(updatedAgency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('satcom_agency', JSON.stringify(updatedAgency));
    }
    setMemberName('');
    setMemberTitle('');
    setShowAddMember(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8" dir={dir}>
      {!agency.name ? (
        <div className="bg-slate-900/90 backdrop-blur-xl p-12 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10">
            <Building2 className="w-10 h-10" />
          </div>
          <div className="max-w-xl mx-auto space-y-2">
            <h1 className="text-2xl font-black text-white">
              {isAr ? 'بوابة الوكالات الهندسية والفرق المشتركة' : 'Engineering Agency & Team Portal'}
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? 'أنشئ وكالتك الهندسية لتوظيف فريق عمل متكامل، وتقديم عروض مشتركة على عقود الأقمار الصناعية ومحطات الميكروويف، وإدارة المحفظة والضمان Escrow مركزياً.'
                : 'Create your engineering agency to build a specialized team, submit collaborative proposals on satellite and RF missions, and manage escrow disbursements in one place.'}
            </p>
          </div>

          {!showSetup ? (
            <button
              onClick={() => setShowSetup(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-cyan-500/20 cursor-pointer inline-flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isAr ? 'تأسيس وكالة هندسية جديدة' : 'Establish New Engineering Agency'}</span>
            </button>
          ) : (
            <form onSubmit={handleCreateAgency} className="max-w-md mx-auto bg-slate-950/80 p-6 rounded-2xl border border-slate-800 text-right space-y-4">
              <h3 className="text-sm font-bold text-white text-center">
                {isAr ? 'بيانات الوكالة الهندسية' : 'Agency Details'}
              </h3>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {isAr ? 'اسم الوكالة أو الفريق الهندسي' : 'Agency / Team Name'}
                </label>
                <input
                  type="text"
                  required
                  value={setupName}
                  onChange={(e) => setSetupName(e.target.value)}
                  placeholder={isAr ? 'مثال: مدار سات للحلول الميكروية' : 'e.g. OrbitSat Microwave Solutions'}
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {isAr ? 'نبذة مختصرة عن التخصص' : 'Specialization Summary'}
                </label>
                <input
                  type="text"
                  value={setupTagline}
                  onChange={(e) => setSetupTagline(e.target.value)}
                  placeholder={isAr ? 'مثال: تصميم مصفوفات الهوائيات ومحطات التحكم الأرضية' : 'e.g. Phased array antenna design & ground control'}
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowSetup(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
                >
                  {isAr ? 'تأكيد وحفظ' : 'Save & Establish'}
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <>
          <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-2xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
                🛰️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-white">{agency.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                    {isAr ? 'وكالة هندسية معتمدة' : 'Engineering Agency'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{agency.tagline}</p>
              </div>
            </div>

            <button
              onClick={() => setShowAddMember(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isAr ? 'إضافة مهندس للفريق' : 'Add Team Member'}</span>
            </button>
          </div>

          {/* Agency Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl">
              <span className="text-xs text-slate-400 block">{isAr ? 'فريق العمل' : 'Team Members'}</span>
              <span className="text-2xl font-black text-white font-mono">
                {agency.members?.length || 0} {isAr ? 'مهندسين' : 'Engineers'}
              </span>
            </div>
            <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl">
              <span className="text-xs text-slate-400 block">{isAr ? 'معدل النجاح (JSS)' : 'Job Success (JSS)'}</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {agency.jobSuccessScore > 0 ? `${agency.jobSuccessScore}%` : (isAr ? 'جديد' : 'New')}
              </span>
            </div>
            <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl">
              <span className="text-xs text-slate-400 block">{isAr ? 'مشاريع الوكالة المنجزة' : 'Completed Projects'}</span>
              <span className="text-2xl font-black text-white font-mono">
                {agency.completedJobs || 0} {isAr ? 'مشروع' : 'Projects'}
              </span>
            </div>
            <div className="p-5 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl">
              <span className="text-xs text-slate-400 block">{isAr ? 'إجمالي أرباح الفريق' : 'Total Earnings'}</span>
              <span className="text-2xl font-black text-cyan-400 font-mono">{agency.totalEarnings || '$0.00'}</span>
            </div>
          </div>

          {showAddMember && (
            <form onSubmit={handleAddMember} className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white">{isAr ? 'إضافة مهندس جديد لفريق الوكالة' : 'Add New Engineer to Team'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'اسم المهندس' : 'Engineer Name'}
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder={isAr ? 'المسمى الهندسي (مثل: RF Specialist)' : 'Specialty (e.g. RF Specialist)'}
                  value={memberTitle}
                  onChange={(e) => setMemberTitle(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                <select
                  value={memberRole}
                  onChange={(e) => setMemberRole(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value={isAr ? 'مهندس شريك' : 'Partner Engineer'}>{isAr ? 'مهندس شريك' : 'Partner Engineer'}</option>
                  <option value={isAr ? 'عضو فريق' : 'Team Member'}>{isAr ? 'عضو فريق' : 'Team Member'}</option>
                  <option value={isAr ? 'استشاري خارجي' : 'External Consultant'}>{isAr ? 'استشاري خارجي' : 'External Consultant'}</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold"
                >
                  {isAr ? 'إضافة' : 'Add'}
                </button>
              </div>
            </form>
          )}

          {/* Members List */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-white">{isAr ? 'أعضاء الفريق الهندسي' : 'Engineering Team Members'}</h3>
            {!agency.members || agency.members.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mx-auto mb-3 text-slate-500">
                  <UserPlus className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {isAr ? 'لا يوجد أعضاء في الفريق حتى الآن' : 'No Team Members Added Yet'}
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {isAr
                    ? 'قم بإضافة مهندسي الفريق لتوزيع المهام وتقديم العروض الجماعية باسم الوكالة.'
                    : 'Add engineers to your agency team to assign tasks and submit joint proposals.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {agency.members.map((m: any, i: number) => (
                  <div key={i} className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-sm text-white block">{m.name}</span>
                      <span className="text-xs text-slate-400">{m.title}</span>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                      {m.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Brand Footer */}
      <div className="text-center pt-6 text-[11px] text-slate-500 border-t border-slate-800/60 flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'} • Satcom Engineers</span>
      </div>
    </div>
  );
}
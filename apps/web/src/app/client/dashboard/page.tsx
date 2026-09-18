'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Home,
  Bell,
  Briefcase,
  Users,
  DollarSign,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  PlusCircle,
  Phone,
  Check,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon,
  ExternalLink,
  Lock,
  ArrowRight,
  User,
  Settings,
  X,
  FileText,
  Download,
  AlertCircle,
  Clock,
  Sparkles,
  CreditCard,
  Building,
  Mail,
  Shield,
  FileCheck,
  Layers,
  Send,
  Globe,
  Radio,
  Satellite,
  Compass,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export default function ClientDashboard() {
  const { t, locale, toggleLocale, dir } = useLanguage();
  const isAr = locale === 'ar';

  // Theme mode: 'light' (Satcom Day) or 'dark' (Satcom Night)
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');

  // Sidebar collapsed state on desktop
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Active navigation tab in sidebar
  const [activeTab, setActiveTab] = useState<'home' | 'jobs' | 'freelancers' | 'finances' | 'messages'>('home');

  // Client Profile State (Bilingual & Loaded dynamically from user registration)
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [clientProfile, setClientProfile] = useState({
    name: isAr ? 'صاحب العمل' : 'Enterprise Client',
    companyAr: 'مؤسسة الفضاء والاتصالات المعتمدة',
    companyEn: 'Enterprise Space Telecom Ltd',
    email: 'client@satcom-space.com',
    tierAr: 'حساب مؤسسي معتمد (Enterprise Gold)',
    tierEn: 'Enterprise Gold Certified Client',
    phone: '+966 50 000 0000',
    currency: 'USD ($)',
    twoFactor: true,
  });
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // Dynamic Avatar Initials Calculator
  const getInitials = (fullName: string) => {
    if (!fullName || !fullName.trim()) return isAr ? 'عم' : 'EC';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  };

  // Sync with user's actual registered profile from localStorage & purge any legacy 'Emad' mock data
  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('satcom_client_profile');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.name && /emad/i.test(parsed.name)) {
            localStorage.removeItem('satcom_client_profile');
            setClientProfile({
              name: isAr ? 'صاحب العمل' : 'Enterprise Client',
              companyAr: 'مؤسسة الفضاء والاتصالات المعتمدة',
              companyEn: 'Enterprise Space Telecom Ltd',
              email: 'client@satcom-space.com',
              tierAr: 'حساب مؤسسي معتمد (Enterprise Gold)',
              tierEn: 'Enterprise Gold Certified Client',
              phone: '+966 50 000 0000',
              currency: 'USD ($)',
              twoFactor: true,
            });
          } else {
            setClientProfile(parsed);
          }
        }
      }
    } catch (e) {}
  }, [isAr]);

  // Global Search Modal State
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications State (Bilingual)
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Phone verification state
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [phoneNumberInput, setPhoneNumberInput] = useState(clientProfile.phone);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verificationSuccessMsg, setVerificationSuccessMsg] = useState(false);

  // Filters state
  const [activityFilter, setActivityFilter] = useState<'your' | 'team'>('your');
  const [spendFilter, setSpendFilter] = useState<'this_week' | 'this_month' | 'all_time'>('this_week');
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [showSpendDropdown, setShowSpendDropdown] = useState(false);

  // Timesheets Modal & Financial Summary Modal
  const [timesheetModalOpen, setTimesheetModalOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);

  // Help & Dispute Modal
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  // Contract Details & Release Modals
  const [selectedContract, setSelectedContract] = useState<any | null>(null);
  const [releaseConfirmModalOpen, setReleaseConfirmModalOpen] = useState(false);
  const [contractDetailsModalOpen, setContractDetailsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active contracts (Clean state initialized to empty)
  const [contracts, setContracts] = useState<any[]>([]);

  // Posted Jobs & Freelancers dynamically loaded
  const [postedJobs, setPostedJobs] = useState<any[]>([]);
  const [contractedFreelancers, setContractedFreelancers] = useState<any[]>([]);

  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const jobsSaved = localStorage.getItem('satcom_posted_jobs');
        if (jobsSaved) {
          setPostedJobs(JSON.parse(jobsSaved));
        }
        const contractsSaved = localStorage.getItem('satcom_contracts');
        if (contractsSaved) {
          setContracts(JSON.parse(contractsSaved));
        }
      }
    } catch (e) {}
  }, []);

  // Timesheets Data (Clean state initialized to empty)
  const timesheetEntries: any[] = [];

  // Search Items (Empty clean state)
  const searchItems: any[] = [];

  const searchResults = searchItems.filter(item => {
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title[locale].toLowerCase().includes(q) ||
      item.role[locale].toLowerCase().includes(q)
    );
  });

  // Phone Verification Handler
  const handleVerifyPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumberInput.trim().length > 5) {
      setClientProfile(prev => ({ ...prev, phone: phoneNumberInput }));
      setIsPhoneVerified(true);
      setVerificationSuccessMsg(true);
      setPhoneModalOpen(false);
      triggerToast(isAr ? 'تم تأكيد رقم هاتفك بنجاح وتفعيل النشر المؤسسي!' : 'Phone verified successfully! Account enabled for enterprise jobs.');
      setTimeout(() => setVerificationSuccessMsg(false), 5000);
    }
  };

  // Toast Handler
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Notifications Handlers
  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    triggerToast(isAr ? 'تم تحديد جميع الإشعارات كمقروءة' : 'All notifications marked as read');
  };

  // Profile Save Handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('satcom_client_profile', JSON.stringify(clientProfile));
      }
    } catch (err) {}
    setProfileSaveSuccess(true);
    triggerToast(isAr ? 'تم حفظ وتحديث بيانات الحساب بنجاح!' : 'Profile information updated successfully!');
    setTimeout(() => {
      setProfileSaveSuccess(false);
      setProfileModalOpen(false);
    }, 1200);
  };

  // Delete Account & Reset Data Handler
  const handleDeleteAccount = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('satcom_client_profile');
        localStorage.removeItem('satcom_client_user');
      }
    } catch (err) {}
    setClientProfile({
      name: isAr ? 'صاحب العمل' : 'Enterprise Client',
      companyAr: 'مؤسسة الفضاء والاتصالات المعتمدة',
      companyEn: 'Enterprise Space Telecom Ltd',
      email: 'client@satcom-space.com',
      tierAr: 'حساب مؤسسي معتمد (Enterprise Gold)',
      tierEn: 'Enterprise Gold Certified Client',
      phone: '+966 50 000 0000',
      currency: 'USD ($)',
      twoFactor: true,
    });
    setProfileModalOpen(false);
    triggerToast(isAr ? 'تم حذف بيانات الحساب بنجاح، جاري التحويل...' : 'Account data deleted successfully, redirecting...');
    setTimeout(() => {
      window.location.href = '/register';
    }, 1000);
  };

  // Release Milestone Handler
  const handleConfirmRelease = () => {
    if (!selectedContract) return;
    setContracts(prev =>
      prev.map(c =>
        c.id === selectedContract.id
          ? {
              ...c,
              released: true,
              progress: 100,
            }
          : c
      )
    );
    setReleaseConfirmModalOpen(false);
    triggerToast(
      isAr
        ? `تم اعتماد مخرجات المشروع وتحرير مبلغ ${selectedContract.amount} للمهندس ${selectedContract.engineer[locale]}`
        : `Milestone approved and ${selectedContract.amount} released to ${selectedContract.engineer[locale]}`
    );
  };

  const getSpendAmount = () => {
    return '$0.00';
  };

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  const isLight = themeMode === 'light';

  // Distinctive Visual Palette
  const containerBg = isLight
    ? 'bg-gradient-to-b from-[#f4f7fb] via-[#eef3f9] to-[#e8eef6] text-[#0f172a]'
    : 'bg-[#040712] text-slate-100';

  const sidebarBg = isLight
    ? 'bg-white/85 backdrop-blur-2xl border-r border-slate-200/90 shadow-xl shadow-slate-200/40'
    : 'bg-slate-900/80 backdrop-blur-2xl border-r border-slate-800/90 shadow-2xl shadow-cyan-950/20';

  const cardBg = isLight
    ? 'bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-lg shadow-sky-500/5 hover:border-cyan-400/50 hover:shadow-cyan-500/10'
    : 'bg-slate-900/75 backdrop-blur-2xl border border-slate-800/90 shadow-2xl shadow-cyan-500/5 hover:border-cyan-500/40';

  const subTextColor = isLight ? 'text-slate-500' : 'text-slate-400';
  const dividerColor = isLight ? 'border-slate-200/90' : 'border-slate-800/90';
  const activeNavItemBg = isLight
    ? 'bg-gradient-to-r from-cyan-500/15 to-sky-500/10 text-cyan-800 font-extrabold border-l-4 border-cyan-500 shadow-sm'
    : 'bg-gradient-to-r from-cyan-950/80 to-sky-950/40 text-cyan-300 font-extrabold border-l-4 border-cyan-400 shadow-inner';

  const navItemHover = isLight ? 'hover:bg-slate-100/90 text-slate-700' : 'hover:bg-slate-800/80 text-slate-300';
  const pillBtn = isLight
    ? 'border border-cyan-600 text-cyan-700 hover:bg-cyan-50 shadow-sm'
    : 'border border-cyan-400 text-cyan-300 hover:bg-cyan-950/60 shadow-xs';

  const ChevronIcon = isAr ? ChevronLeft : ChevronRight;

  return (
    <div className={`min-h-screen ${containerBg} relative overflow-x-hidden transition-colors duration-500`} dir={dir}>
      
      {/* 🌌 DISTINCTIVE COSMIC BACKGROUND LAYERS 🌌 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep Radiant Nodes */}
        <div
          className={`absolute -top-40 right-[-10%] w-[600px] h-[600px] rounded-full filter blur-[120px] transition-opacity duration-700 ${
            isLight ? 'bg-cyan-400/15 opacity-80' : 'bg-cyan-500/18 opacity-100'
          }`}
        />
        <div
          className={`absolute top-[40%] left-[-10%] w-[550px] h-[550px] rounded-full filter blur-[130px] transition-opacity duration-700 ${
            isLight ? 'bg-indigo-400/10 opacity-70' : 'bg-indigo-600/15 opacity-90'
          }`}
        />
        <div
          className={`absolute -bottom-20 right-[25%] w-[500px] h-[500px] rounded-full filter blur-[120px] transition-opacity duration-700 ${
            isLight ? 'bg-emerald-400/10 opacity-60' : 'bg-emerald-500/12 opacity-80'
          }`}
        />

        {/* High-Tech Orbital Track Rings & Constellation Coordinates (SVG) */}
        <svg
          className={`absolute inset-0 w-full h-full ${
            isLight ? 'opacity-20 stroke-slate-400' : 'opacity-25 stroke-cyan-400/40'
          } transition-opacity duration-700`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="mesh-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="0.75" fill="currentColor" />
              <path d="M 60 0 L 0 0 0 60" fill="none" strokeWidth="0.5" strokeDasharray="2,6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-grid)" />

          {/* Satellite Orbit Rings */}
          <ellipse cx="65%" cy="25%" rx="380" ry="140" fill="none" strokeWidth="1" strokeDasharray="6,8" className="animate-spin-slow" />
          <ellipse cx="30%" cy="75%" rx="480" ry="180" fill="none" strokeWidth="1" strokeDasharray="4,10" />
          <circle cx="65%" cy="11%" r="3" fill="#22d3ee" className="animate-ping" />
        </svg>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 left-5 sm:left-auto sm:w-96 z-50 p-4 rounded-2xl bg-cyan-950/95 border border-cyan-500/50 text-white text-xs font-bold shadow-2xl flex items-center justify-between animate-fadeIn backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Bar with Mode Switch, Language Switch, Status & Branding */}
      <div className={`relative z-10 px-4 sm:px-8 py-3 border-b ${dividerColor} ${isLight ? 'bg-white/60' : 'bg-slate-900/60'} backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 text-xs`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-xl border ${dividerColor} ${isLight ? 'bg-white/90 text-slate-700' : 'bg-slate-800/80 text-slate-300'} hover:opacity-80 transition cursor-pointer shadow-xs`}
            title={sidebarOpen ? (isAr ? 'طي القائمة' : 'Collapse Sidebar') : (isAr ? 'توسيع القائمة' : 'Expand Sidebar')}
          >
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse"></span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
              {isAr ? 'لوحة تحكم العميل المؤسسية • Satcom Enterprise' : 'Satcom Enterprise Client Dashboard'}
            </span>
          </div>

          <button
            onClick={() => setProfileModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-400/40 hover:bg-amber-500/20 transition cursor-pointer"
          >
            <Shield className="w-3 h-3 text-amber-500" />
            <span>{isAr ? clientProfile.tierAr : clientProfile.tierEn}</span>
          </button>
        </div>

        {/* Right Utility Controls: Language Switch, Theme Mode, and Branding */}
        <div className="flex items-center gap-2.5">
          
          {/* Instant Language Switcher (100% Dynamic Synchronization) */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-extrabold text-xs shadow-xs transition cursor-pointer"
            title={isAr ? 'التبديل إلى الإنجليزية / Switch to English' : 'Switch to Arabic / التبديل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-500" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          {/* Theme Switcher: Day / Night */}
          <div className="flex items-center gap-1 p-1 rounded-full border border-slate-300/80 dark:border-slate-700/80 bg-slate-200/60 dark:bg-slate-800/70 backdrop-blur-md">
            <button
              onClick={() => setThemeMode('light')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                isLight ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>{isAr ? 'النمط النهاري' : 'Day'}</span>
            </button>
            <button
              onClick={() => setThemeMode('dark')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                !isLight ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-600 hover:text-black'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-cyan-200" />
              <span>{isAr ? 'النمط الليلي' : 'Night'}</span>
            </button>
          </div>

          {/* Emadsoft Luxury Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-indigo-500/10 border border-cyan-500/40 text-[11px] font-black text-cyan-600 dark:text-cyan-300 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}</span>
          </div>
        </div>
      </div>

      {/* Verification Success Toast Banner */}
      {verificationSuccessMsg && (
        <div className="relative z-10 mx-4 sm:mx-8 mt-4 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-sm flex items-center justify-between animate-fadeIn backdrop-blur-md">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="font-bold">
              {isAr ? 'تم تأكيد رقم الهاتف بنجاح! حسابك المؤسسي موثق وجاهز لإطلاق المشاريع.' : 'Phone verified successfully! Account is ready to publish aerospace jobs.'}
            </span>
          </div>
          <button onClick={() => setVerificationSuccessMsg(false)} className="text-xs font-bold hover:underline cursor-pointer">
            {isAr ? 'إغلاق' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* Layout Wrapper: Sidebar + Main Content */}
      <div className="relative z-10 flex max-w-[1440px] mx-auto min-h-[calc(100vh-100px)]">
        
        {/* Left / Right Sidebar (Fully Activated & Bilingual) */}
        {sidebarOpen && (
          <aside
            className={`w-64 shrink-0 transition-all duration-300 p-4 ${sidebarBg} flex flex-col justify-between hidden md:flex`}
          >
            <div className="space-y-4">
              {/* Profile Card Button (Opens Profile Settings) */}
              <div
                onClick={() => setProfileModalOpen(true)}
                className={`p-3 rounded-2xl border ${dividerColor} ${
                  isLight ? 'bg-slate-50/90 hover:bg-slate-100' : 'bg-slate-800/60 hover:bg-slate-800'
                } transition flex items-center justify-between cursor-pointer group shadow-sm`}
                title={isAr ? 'انقر لإدارة إعدادات الملف الشخصي والشركة' : 'Click to manage account settings'}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-md">
                    {getInitials(clientProfile.name)}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm flex items-center gap-1.5">
                      <span>{clientProfile.name}</span>
                    </div>
                    <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
                      {isAr ? 'حساب مؤسسي معتمد' : 'Enterprise Gold'}
                    </div>
                  </div>
                </div>
                <ChevronIcon className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
              </div>

              {/* Sidebar Navigation Items */}
              <nav className="space-y-1 text-sm font-medium">
                
                {/* 1. Search */}
                <button
                  onClick={() => setSearchModalOpen(true)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl ${navItemHover} transition text-left cursor-pointer`}
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>{isAr ? 'بحث في المنصة' : 'Search Platform'}</span>
                </button>

                {/* 2. Home Tab */}
                <button
                  onClick={() => setActiveTab('home')}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition text-left cursor-pointer ${
                    activeTab === 'home' ? activeNavItemBg : navItemHover
                  }`}
                >
                  <Home className={`w-4 h-4 ${activeTab === 'home' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500'}`} />
                  <span>{isAr ? 'الرئيسية' : 'Home'}</span>
                </button>

                {/* 3. Notifications with Badge */}
                <button
                  onClick={() => setNotificationsOpen(true)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl ${navItemHover} transition text-left cursor-pointer`}
                >
                  <div className="flex items-center gap-3.5">
                    <Bell className="w-4 h-4 text-slate-500" />
                    <span>{isAr ? 'الإشعارات' : 'Notifications'}</span>
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-md">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                {/* 4. Jobs Tab */}
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-left cursor-pointer ${
                    activeTab === 'jobs' ? activeNavItemBg : navItemHover
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Briefcase className="w-4 h-4 text-slate-500" />
                    <span>{isAr ? 'المشاريع المنشورة' : 'Job Posts'}</span>
                  </div>
                  <ChevronIcon className="w-4 h-4 text-slate-400" />
                </button>

                {/* 5. Freelancers Tab */}
                <button
                  onClick={() => setActiveTab('freelancers')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-left cursor-pointer ${
                    activeTab === 'freelancers' ? activeNavItemBg : navItemHover
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span>{isAr ? 'المهندسون المتعاقد معهم' : 'My Engineers'}</span>
                  </div>
                  <ChevronIcon className="w-4 h-4 text-slate-400" />
                </button>

                {/* 6. Finances Tab */}
                <button
                  onClick={() => setActiveTab('finances')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-left cursor-pointer ${
                    activeTab === 'finances' ? activeNavItemBg : navItemHover
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <DollarSign className="w-4 h-4 text-slate-500" />
                    <span>{isAr ? 'المالية وحساب الضمان' : 'Finances & Escrow'}</span>
                  </div>
                  <ChevronIcon className="w-4 h-4 text-slate-400" />
                </button>

                {/* 7. Messages */}
                <Link
                  href="/messages"
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl ${navItemHover} transition text-left`}
                >
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <span>{isAr ? 'الرسائل الفورية' : 'Messages'}</span>
                </Link>
              </nav>
            </div>

            {/* Bottom Help & Developer Section */}
            <div className="space-y-3 pt-4 border-t ${dividerColor}">
              <button
                onClick={() => setHelpModalOpen(true)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl ${navItemHover} transition text-left text-sm font-medium cursor-pointer`}
              >
                <div className="flex items-center gap-3.5">
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span>{isAr ? 'المساعدة والتحكيم' : 'Help & Arbitration'}</span>
                </div>
                <ChevronIcon className="w-4 h-4 text-slate-400" />
              </button>

              <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-sky-500/5 to-indigo-500/10 border border-cyan-500/30 text-[11px] text-center font-medium shadow-xs">
                <span className="block font-black text-cyan-600 dark:text-cyan-300">
                  {isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}
                </span>
              </div>
            </div>
          </aside>
        )}

        {/* Main Dashboard Body */}
        <main className="flex-1 p-4 sm:p-8 space-y-6 max-w-5xl">
          
          {/* Welcome Header Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {isAr ? `مرحباً، ${clientProfile.name}` : `Welcome back, ${clientProfile.name}`}
              </h1>
              <p className={`text-xs ${subTextColor} mt-1`}>
                {isAr
                  ? 'إدارة مشاريع الأقمار الصناعية، متابعة العقود، وحسابات الضمان Escrow Vault'
                  : 'Manage satellite projects, oversee engineering contracts, and monitor Escrow vaults'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/post-job"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 hover:opacity-95 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/25 transition cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isAr ? 'نشر مشروع جديد' : 'Post a Job'}</span>
              </Link>
            </div>
          </div>

          {/* VIEW 1: HOME TAB (DEFAULT) */}
          {activeTab === 'home' && (
            <>
              {/* 1. Summary Card */}
              <div className={`p-6 rounded-3xl ${cardBg} space-y-6 transition duration-300`}>
                {/* Header: Summary & Dropdown */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Compass className="w-5 h-5 text-cyan-500" />
                    <span>{isAr ? 'ملخص النشاط' : 'Summary'}</span>
                  </h2>

                  <div className="relative">
                    <button
                      onClick={() => setShowActivityDropdown(!showActivityDropdown)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border ${dividerColor} ${navItemHover} transition cursor-pointer`}
                    >
                      <span>
                        {activityFilter === 'your'
                          ? isAr
                            ? 'نشاطك المؤسسي'
                            : 'Your activity'
                          : isAr
                          ? 'نشاط الفريق كاملاً'
                          : 'All team activity'}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {showActivityDropdown && (
                      <div
                        className={`absolute right-0 mt-1 w-48 rounded-xl border ${dividerColor} ${
                          isLight ? 'bg-white shadow-xl' : 'bg-slate-800 shadow-2xl'
                        } py-1 z-20 text-xs`}
                      >
                        <button
                          onClick={() => {
                            setActivityFilter('your');
                            setShowActivityDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium cursor-pointer"
                        >
                          {isAr ? 'نشاطك المؤسسي (Your activity)' : 'Your activity'}
                        </button>
                        <button
                          onClick={() => {
                            setActivityFilter('team');
                            setShowActivityDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium cursor-pointer"
                        >
                          {isAr ? 'نشاط الفريق (All team activity)' : 'All team activity'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3 Metric Columns with Dividers (Job post, Offers, Contracts) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {/* Column 1: Job post */}
                  <div
                    onClick={() => setActiveTab('jobs')}
                    className="space-y-1 p-3 rounded-2xl hover:bg-cyan-500/5 transition cursor-pointer"
                    title={isAr ? 'انقر لإدارة المشاريع المنشورة' : 'Click to view jobs'}
                  >
                    <div className={`text-xs font-medium ${subTextColor}`}>{isAr ? 'المشاريع المنشورة' : 'Job post'}</div>
                    <div className="text-2xl font-bold tracking-tight text-cyan-600 dark:text-cyan-400 font-mono">
                      {postedJobs.length} <span className="text-base font-normal text-slate-500 font-sans">{isAr ? 'مفتوح' : 'open'}</span>
                    </div>
                  </div>

                  {/* Column 2: Offers */}
                  <div
                    onClick={() => {
                      setNotificationsOpen(true);
                      triggerToast(isAr ? 'لا توجد عروض عمل جديدة حالياً' : 'No new proposals at this time');
                    }}
                    className={`space-y-1 p-3 rounded-2xl hover:bg-indigo-500/5 transition cursor-pointer md:border-l ${dividerColor} md:pl-6 ${
                      isAr ? 'md:border-r md:pr-6 md:border-l-0 md:pl-0' : ''
                    }`}
                    title={isAr ? 'انقر لعرض العروض' : 'Click to view proposals'}
                  >
                    <div className={`text-xs font-medium ${subTextColor}`}>{isAr ? 'العروض المقدمة' : 'Offers'}</div>
                    <div className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400 font-mono">
                      0 <span className="text-base font-normal text-slate-500 font-sans">{isAr ? 'عرض قيد المراجعة' : 'offer'}</span>
                    </div>
                  </div>

                  {/* Column 3: Contracts */}
                  <div
                    onClick={() => {
                      const el = document.getElementById('active-contracts-sec');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`space-y-1 p-3 rounded-2xl hover:bg-emerald-500/5 transition cursor-pointer md:border-l ${dividerColor} md:pl-6 ${
                      isAr ? 'md:border-r md:pr-6 md:border-l-0 md:pl-0' : ''
                    }`}
                    title={isAr ? 'انقر للذهاب إلى العقود النشطة' : 'Click to view active contracts'}
                  >
                    <div className={`text-xs font-medium ${subTextColor}`}>{isAr ? 'العقود النشطة' : 'Contracts'}</div>
                    <div className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 font-mono">
                      {contracts.length} <span className="text-base font-normal text-slate-500 font-sans">{isAr ? 'نشطة في الضمان' : 'active in escrow'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Team Spend Card */}
              <div className={`p-6 rounded-3xl ${cardBg} space-y-4 transition duration-300`}>
                {/* Header: Team spend & Dropdown */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-500" />
                    <span>{isAr ? 'إنفاق الفريق وحساب الضمان' : 'Team spend'}</span>
                  </h2>

                  <div className="relative">
                    <button
                      onClick={() => setShowSpendDropdown(!showSpendDropdown)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border ${dividerColor} ${navItemHover} transition cursor-pointer`}
                    >
                      <span>
                        {spendFilter === 'this_week'
                          ? isAr
                            ? 'هذا الأسبوع'
                            : 'This week'
                          : spendFilter === 'this_month'
                          ? isAr
                            ? 'هذا الشهر'
                            : 'This month'
                          : isAr
                          ? 'كامل الوقت'
                          : 'All time'}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {showSpendDropdown && (
                      <div
                        className={`absolute right-0 mt-1 w-44 rounded-xl border ${dividerColor} ${
                          isLight ? 'bg-white shadow-xl' : 'bg-slate-800 shadow-2xl'
                        } py-1 z-20 text-xs`}
                      >
                        <button
                          onClick={() => {
                            setSpendFilter('this_week');
                            setShowSpendDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium cursor-pointer"
                        >
                          {isAr ? 'هذا الأسبوع (This week)' : 'This week'}
                        </button>
                        <button
                          onClick={() => {
                            setSpendFilter('this_month');
                            setShowSpendDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium cursor-pointer"
                        >
                          {isAr ? 'هذا الشهر (This month)' : 'This month'}
                        </button>
                        <button
                          onClick={() => {
                            setSpendFilter('all_time');
                            setShowSpendDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium cursor-pointer"
                        >
                          {isAr ? 'كامل الوقت (All time)' : 'All time'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Big Amount (Dynamic from filter) */}
                <div className="text-3xl sm:text-4xl font-black tracking-tight font-mono text-emerald-600 dark:text-emerald-400">
                  {getSpendAmount()}
                </div>

                {/* Subtext and Links */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
                  <p className={`text-xs ${subTextColor}`}>
                    {isAr
                      ? 'المبلغ الإجمالي يشمل المبالغ المحجوزة في الضمان Escrow وساعات العمل المعتمدة'
                      : 'Total amount can include other spend, i.e., bonuses and escrow funded reserves'}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <button
                      onClick={() => setSummaryModalOpen(true)}
                      className="underline text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition cursor-pointer"
                    >
                      {isAr ? 'عرض الملخص المالي' : 'View summary'}
                    </button>
                    <button
                      onClick={() => setTimesheetModalOpen(true)}
                      className="underline text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition cursor-pointer"
                    >
                      {isAr ? 'عرض سجلات الساعات' : 'View timesheets'}
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Overview Section (Verification) */}
              <div className="space-y-4">
                <h2 className="text-2xl font-black">{isAr ? 'نظرة عامة وإعداد الحساب' : 'Overview'}</h2>

                <div className={`p-5 rounded-3xl ${cardBg} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}>
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                        isPhoneVerified
                          ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                          : isLight
                          ? 'bg-slate-100 text-slate-600 border border-slate-200'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {isPhoneVerified ? <Check className="w-5 h-5 text-emerald-500" /> : <ChevronIcon className="w-5 h-5" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-extrabold text-sm sm:text-base">
                          {isAr ? 'تأكيد رقم هاتف الشركة' : 'Verify company phone number'}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                            isPhoneVerified
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {isPhoneVerified
                            ? isAr
                              ? 'حساب موثق ✓'
                              : 'Account Verified ✓'
                            : isAr
                            ? 'إعداد الحساب'
                            : 'Account setup'}
                        </span>
                      </div>
                      <p className={`text-xs ${subTextColor}`}>
                        {isPhoneVerified
                          ? isAr
                            ? `تم التحقق بنجاح (${clientProfile.phone}) ✓ حسابك مهيأ بالكامل لنشر المشاريع وإجراء التعاقدات.`
                            : `Phone verified (${clientProfile.phone}) ✓ Ready to publish aerospace contracts.`
                          : isAr
                          ? 'مطلوب. قم بتأكيد هويتك المؤسسية لنشر أول مشروع فضائي والتعاقد مع المهندسين'
                          : 'Required. Confirm your identity to publish your first job'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isPhoneVerified ? (
                      <button
                        onClick={() => setPhoneModalOpen(true)}
                        className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                      >
                        {isAr ? 'تعديل الرقم' : 'Edit Number'}
                      </button>
                    ) : (
                      <button
                        onClick={() => setPhoneModalOpen(true)}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs transition cursor-pointer ${pillBtn}`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{isAr ? 'إضافة رقم الهاتف' : 'Add phone number'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 4. Active Satcom Engineering Contracts (Escrow Vault) */}
              <div id="active-contracts-sec" className={`p-6 rounded-3xl ${cardBg} space-y-6 transition duration-300`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b ${dividerColor}">
                  <div>
                    <h2 className="text-lg font-black flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      <span>{isAr ? 'عقود الأقمار الصناعية النشطة (Escrow Vault)' : 'Active Space Contracts in Escrow Vault'}</span>
                    </h2>
                    <p className={`text-xs ${subTextColor} mt-0.5`}>
                      {isAr
                        ? 'أموالك محجوزة بأمان 100% في حساب الضمان، ولا يتم تحريرها للمهندس إلا بعد موافقتك الصريحة'
                        : '100% Escrow security: Funds are only released to engineers upon your explicit milestone approval'}
                    </p>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-black">
                    100% Escrow Protection
                  </span>
                </div>

                <div className="space-y-4">
                  {contracts.length === 0 ? (
                    <div className="p-12 text-center space-y-3 rounded-2xl bg-slate-800/20 border border-slate-700/30">
                      <ShieldCheck className="w-10 h-10 text-slate-500 mx-auto" />
                      <h3 className="text-base font-bold">
                        {isAr ? 'لا توجد عقود نشطة حالياً في حساب الضمان' : 'No Active Contracts in Escrow Vault'}
                      </h3>
                      <p className={`text-xs ${subTextColor} max-w-sm mx-auto`}>
                        {isAr
                          ? 'عند توظيف مهندس واعتماد مرحلة العمل، ستظهر بيانات العقد والضمان المالي هنا.'
                          : 'When you hire an engineer and fund a milestone, contract details and escrow status will appear here.'}
                      </p>
                      <div className="pt-2">
                        <Link
                          href="/post-job"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md transition"
                        >
                          <PlusCircle className="w-4 h-4" />
                          <span>{isAr ? 'نشر مشروع جديد أو استكشاف المهندسين' : 'Post a Job or Browse Engineers'}</span>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    contracts.map(c => (
                      <div
                        key={c.id}
                        className={`p-5 rounded-2xl border ${dividerColor} ${
                          isLight ? 'bg-slate-50/70 hover:bg-slate-100/90' : 'bg-slate-950/60 hover:bg-slate-800/60'
                        } transition space-y-4 shadow-xs`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <h3 className="font-extrabold text-sm sm:text-base">{c.title[locale]}</h3>
                            <div className="flex items-center gap-3 text-xs mt-1">
                              <span className="font-bold text-cyan-600 dark:text-cyan-400">{c.engineer[locale]}</span>
                              <span>•</span>
                              <span className="px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                                {c.specialty[locale]}
                              </span>
                            </div>
                          </div>
                          <div className="text-right sm:text-left">
                            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{c.amount}</span>
                            <span className="block text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 mt-0.5 text-center">
                              {c.escrowStatus[locale]}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between text-xs font-semibold mb-1.5">
                            <span className={subTextColor}>{c.released ? c.releasedStatus[locale] : c.status[locale]}</span>
                            <span className="text-emerald-600 dark:text-cyan-400 font-mono font-bold">{c.progress}%</span>
                          </div>
                          <div className={`w-full h-2 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}>
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                              style={{ width: `${c.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                          <button
                            onClick={() => {
                              setSelectedContract(c);
                              setContractDetailsModalOpen(true);
                            }}
                            className={`px-4 py-2 rounded-xl border ${dividerColor} text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center gap-1.5`}
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{isAr ? 'تفاصيل المخرجات' : 'Deliverables'}</span>
                          </button>

                          <Link
                            href="/messages"
                            className={`px-4 py-2 rounded-xl border ${dividerColor} text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5`}
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{isAr ? 'مراسلة' : 'Chat'}</span>
                          </Link>

                          {c.released ? (
                            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>{isAr ? 'تم تحرير المستحقات ✓' : 'Escrow Released ✓'}</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedContract(c);
                                setReleaseConfirmModalOpen(true);
                              }}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-90 text-white text-xs font-bold shadow-md shadow-emerald-500/25 transition cursor-pointer flex items-center gap-1.5"
                            >
                              <Lock className="w-3.5 h-3.5" />
                              <span>{isAr ? 'اعتماد الدفعة وتحرير المبلغ' : 'Approve Milestone & Release'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {/* VIEW 2: JOBS TAB */}
          {activeTab === 'jobs' && (
            <div className={`p-6 rounded-3xl ${cardBg} space-y-6 animate-fadeIn`}>
              <div className="flex justify-between items-center pb-4 border-b ${dividerColor}">
                <div>
                  <h2 className="text-xl font-bold">{isAr ? 'إدارة المشاريع المنشورة والمسودات' : 'My Job Postings & Drafts'}</h2>
                  <p className={`text-xs ${subTextColor} mt-0.5`}>
                    {isAr ? 'متابعة وتحديث متطلبات مشاريعك الهندسية وتلقي عروض المهندسين' : 'Manage your posted engineering jobs and inspect proposals'}
                  </p>
                </div>
                <Link
                  href="/post-job"
                  className="px-4 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isAr ? 'نشر مشروع جديد' : 'Post New Job'}</span>
                </Link>
              </div>

              <div className="space-y-4">
                {postedJobs.length === 0 ? (
                  <div className="text-center py-16 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-4">
                    <Briefcase className="w-12 h-12 text-slate-500 mx-auto" />
                    <div className="text-base font-bold">{isAr ? 'لا توجد مشاريع منشورة حالياً' : 'No Published Jobs Yet'}</div>
                    <p className={`text-xs ${subTextColor} max-w-sm mx-auto`}>
                      {isAr ? 'انشر مشروعك الأول في مجال الاتصالات والأقمار الصناعية لاستقبال عروض المهندسين المتخصصين.' : 'Post your first satellite communications project to start receiving proposals from certified engineers.'}
                    </p>
                    <Link
                      href="/post-job"
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold transition shadow-md shadow-cyan-500/20"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{isAr ? 'نشر مشروع جديد الآن' : 'Post a Job Now'}</span>
                    </Link>
                  </div>
                ) : (
                  postedJobs.map((job: any) => (
                    <div key={job.id} className={`p-5 rounded-2xl border ${dividerColor} bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{job.titleAr || job.titleEn || job.title}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                            {isAr ? 'مشروع نشط' : 'Active'}
                          </span>
                        </div>
                        <p className={`text-xs ${subTextColor} mt-1`}>
                          {isAr ? 'الميزانية:' : 'Budget:'} {job.budget ? `$${job.budget}` : (job.budgetType === 'fixed' ? `$${job.fixedPrice || 0}` : `$${job.hourlyMin || 0}-$${job.hourlyMax || 0}/hr`)} • {job.category || (isAr ? 'أنظمة فضائية' : 'Space Systems')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href="/jobs"
                          className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500 transition"
                        >
                          {isAr ? 'عرض في سوق المشاريع' : 'View in Jobs Feed'}
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* VIEW 3: FREELANCERS / ENGINEERS TAB */}
          {activeTab === 'freelancers' && (
            <div className={`p-6 rounded-3xl ${cardBg} space-y-6 animate-fadeIn`}>
              <div className="flex justify-between items-center pb-4 border-b ${dividerColor}">
                <div>
                  <h2 className="text-xl font-bold">{isAr ? 'المهندسون المتعاقد معهم (فريق العمل الفضائي)' : 'My Contracted Engineers'}</h2>
                  <p className={`text-xs ${subTextColor} mt-0.5`}>
                    {isAr ? 'نخبة المهندسين المتعاقد معهم حالياً على مشاريع الأقمار الصناعية و RF' : 'Verified RF and satellite systems engineers currently on active contracts'}
                  </p>
                </div>
                <Link
                  href="/freelancers"
                  className="px-4 py-2 rounded-full border border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Users className="w-4 h-4" />
                  <span>{isAr ? 'استكشاف مهندسين جدد' : 'Explore Talent'}</span>
                </Link>
              </div>

              {contractedFreelancers.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-4">
                  <Users className="w-12 h-12 text-slate-500 mx-auto" />
                  <div className="text-base font-bold">{isAr ? 'لا يوجد مهندسون متعاقد معهم حالياً' : 'No Contracted Engineers Yet'}</div>
                  <p className={`text-xs ${subTextColor} max-w-sm mx-auto`}>
                    {isAr ? 'استكشف قائمة مهندسي الاتصالات الفضائية المعتمدين وتواصل معهم للتعاقد.' : 'Browse the verified satcom and RF engineering talent pool to hire for your missions.'}
                  </p>
                  <Link
                    href="/freelancers"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold transition shadow-md shadow-cyan-500/20"
                  >
                    <Users className="w-4 h-4" />
                    <span>{isAr ? 'استكشاف المهندسين المعتمدين' : 'Browse Engineers'}</span>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {contractedFreelancers.map((eng, idx) => (
                    <div key={idx} className={`p-5 rounded-2xl border ${dividerColor} bg-slate-50/60 dark:bg-slate-800/40 space-y-4 shadow-xs`}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                          {eng.initials || 'ENG'}
                        </div>
                        <div>
                          <div className="font-extrabold text-sm">{eng.name[locale] || eng.name}</div>
                          <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">{eng.title[locale] || eng.title}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href="/messages"
                          className="flex-1 py-2 text-center rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition"
                        >
                          {isAr ? 'مراسلة فورية' : 'Chat'}
                        </Link>
                        <Link
                          href="/freelancers"
                          className={`px-3 py-2 rounded-xl border ${dividerColor} hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold transition`}
                        >
                          {isAr ? 'الملف' : 'Profile'}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIEW 4: FINANCES / ESCROW TAB */}
          {activeTab === 'finances' && (
            <div className={`p-6 rounded-3xl ${cardBg} space-y-6 animate-fadeIn`}>
              <div className="flex justify-between items-center pb-4 border-b ${dividerColor}">
                <div>
                  <h2 className="text-xl font-bold">{isAr ? 'المالية وخزينة الضمان Escrow Vault' : 'Finances & Escrow Vault'}</h2>
                  <p className={`text-xs ${subTextColor} mt-0.5`}>
                    {isAr ? 'تأمين كامل مستحقات العقود مع بوابات الدفع المشفرة وبطاقات الائتمان' : '100% Escrow protected funds and multi-channel payment records'}
                  </p>
                </div>
                <button
                  onClick={() => triggerToast(isAr ? 'تم تصدير كشف الحساب الضريبي كملف PDF' : 'Financial Statement PDF generated')}
                  className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تصدير كشف الحساب' : 'Export Statement'}</span>
                </button>
              </div>

              {/* Finance Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                  <div className="text-xs text-slate-400 font-bold">{isAr ? 'المحجوز حالياً في خزينة الضمان Escrow' : 'Currently in Escrow Vault'}</div>
                  <div className="text-2xl font-black text-emerald-500 font-mono">$0.00</div>
                  <div className="text-[10px] text-emerald-400">{isAr ? '0 عقود نشطة ومؤمنة 100%' : '0 active protected contracts'}</div>
                </div>

                <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-1">
                  <div className="text-xs text-slate-400 font-bold">{isAr ? 'إجمالي الدفعات المحررة' : 'Total Released to Engineers'}</div>
                  <div className="text-2xl font-black text-cyan-500 font-mono">$0.00</div>
                  <div className="text-[10px] text-cyan-400">{isAr ? '0 مراحل هندسية معتمدة' : '0 milestones approved'}</div>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-1">
                  <div className="text-xs text-slate-400 font-bold">{isAr ? 'قنوات الدفع النشطة' : 'Active Payment Methods'}</div>
                  <div className="text-2xl font-black text-indigo-500 font-mono">4 {isAr ? 'بوابات' : 'Gateways'}</div>
                  <div className="text-[10px] text-indigo-400">Stripe • PayPal • Wire • USDT</div>
                </div>
              </div>

              {/* Transactions History */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm">{isAr ? 'سجل العمليات المالية الأخيرة:' : 'Recent Transactions:'}</h3>
                <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-2">
                  <DollarSign className="w-8 h-8 mx-auto text-slate-500" />
                  <p className="text-xs font-bold text-slate-300">{isAr ? 'لا توجد عمليات مالية سابقة حالياً' : 'No Transactions Recorded Yet'}</p>
                  <p className="text-[11px] text-slate-500">{isAr ? 'ستظهر سجلات الإيداع وتحرير الدفعات هنا بمجرد بدء العقود.' : 'Deposit and milestone release records will be logged here.'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Branding Credit */}
          <div className="pt-6 pb-2 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <span>Satcom Engineers Platform</span>
            <span>•</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}
            </span>
          </div>
        </main>
      </div>

      {/* 1. Profile & Company Settings Modal (Bilingual) */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-lg rounded-3xl p-6 ${isLight ? 'bg-white text-slate-900 shadow-2xl' : 'bg-slate-900 text-white border border-slate-800 shadow-2xl'} space-y-5 max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center pb-3 border-b ${dividerColor}">
              <div className="flex items-center gap-2.5">
                <Settings className="w-5 h-5 text-cyan-500" />
                <h3 className="font-bold text-lg">{isAr ? 'إعدادات الحساب وبيانات الشركة' : 'Account & Company Settings'}</h3>
              </div>
              <button onClick={() => setProfileModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">{isAr ? 'اسم العميل الرئيسي' : 'Client Full Name'}</label>
                <input
                  type="text"
                  value={clientProfile.name}
                  onChange={e => setClientProfile({ ...clientProfile, name: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${isLight ? 'border-slate-300 bg-slate-50' : 'border-slate-700 bg-slate-800'} focus:outline-none focus:border-cyan-500`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">{isAr ? 'اسم المنشأة / الشركة' : 'Company / Organization'}</label>
                <input
                  type="text"
                  value={isAr ? clientProfile.companyAr : clientProfile.companyEn}
                  onChange={e => {
                    if (isAr) setClientProfile({ ...clientProfile, companyAr: e.target.value });
                    else setClientProfile({ ...clientProfile, companyEn: e.target.value });
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${isLight ? 'border-slate-300 bg-slate-50' : 'border-slate-700 bg-slate-800'} focus:outline-none focus:border-cyan-500`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">{isAr ? 'البريد الإلكتروني المؤسسي' : 'Corporate Email'}</label>
                <input
                  type="email"
                  value={clientProfile.email}
                  onChange={e => setClientProfile({ ...clientProfile, email: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${isLight ? 'border-slate-300 bg-slate-50' : 'border-slate-700 bg-slate-800'} focus:outline-none focus:border-cyan-500`}
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'رتبة الحساب' : 'Account Tier'}</label>
                  <input
                    type="text"
                    disabled
                    value={isAr ? clientProfile.tierAr : clientProfile.tierEn}
                    className="w-full px-4 py-2 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{isAr ? 'عملة السداد' : 'Currency'}</label>
                  <input
                    type="text"
                    disabled
                    value={clientProfile.currency}
                    className={`w-full px-4 py-2 rounded-xl border ${dividerColor} opacity-75`}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="font-bold">{isAr ? 'المصادقة الثنائية (2FA)' : 'Two-Factor Authentication'}</div>
                    <div className="text-[10px] text-slate-400">{isAr ? 'مفعلة لحماية حساب الضمان المالي' : 'Active for Escrow vault protection'}</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px]">
                  {isAr ? 'مفعل ✓' : 'Active ✓'}
                </span>
              </div>

              {/* Danger Zone: Delete Account */}
              <div className="pt-2">
                <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-red-400 text-xs">{isAr ? 'حذف الحساب وإعادة التعيين' : 'Delete Account & Reset'}</div>
                    <div className="text-[10px] text-slate-400">
                      {isAr ? 'حذف بيانات الحساب بالكامل وتفريغ مساحة العمل' : 'Permanently remove account data and sign out'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="px-3 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span>🗑️</span>
                    <span>{isAr ? 'حذف الحساب' : 'Delete Account'}</span>
                  </button>
                </div>
              </div>

              <div className={`flex items-center justify-end gap-3 pt-3 border-t ${dividerColor}`}>
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className={`px-4 py-2 rounded-xl border ${dividerColor} font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer`}
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  {profileSaveSuccess ? (isAr ? 'تم الحفظ ✓' : 'Saved ✓') : (isAr ? 'حفظ التغييرات' : 'Save Changes')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Global Search Modal (Bilingual) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-xl rounded-3xl p-6 ${isLight ? 'bg-white text-slate-900 shadow-2xl' : 'bg-slate-900 text-white border border-slate-800 shadow-2xl'} space-y-4`}>
            <div className="flex justify-between items-center pb-2 border-b ${dividerColor}">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-cyan-500" />
                <h3 className="font-bold text-base">{isAr ? 'البحث الذكي في منصة Satcom Engineers' : 'Global Platform Search'}</h3>
              </div>
              <button onClick={() => setSearchModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                autoFocus
                placeholder={isAr ? 'ابحث عن مهندس، نطاق تردد (Ka-Band)، CST Studio، أو عقد...' : 'Search engineer, antenna frequency, CST Studio, or contract...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm ${isLight ? 'border-slate-300 bg-slate-50' : 'border-slate-700 bg-slate-800'} focus:outline-none focus:border-cyan-500`}
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pt-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{isAr ? 'نتائج البحث السريعة:' : 'Quick Results:'}</div>
              {searchResults.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500">{isAr ? 'لا توجد نتائج مطابقة لبحثك.' : 'No matching results found.'}</div>
              ) : (
                searchResults.map((res, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSearchModalOpen(false);
                      triggerToast(isAr ? `تم اختيار: ${res.title[locale]}` : `Selected: ${res.title[locale]}`);
                    }}
                    className={`p-3 rounded-xl border ${dividerColor} hover:bg-slate-100 dark:hover:bg-slate-800 transition flex justify-between items-center cursor-pointer text-xs`}
                  >
                    <div>
                      <div className="font-bold">{res.title[locale]}</div>
                      <div className="text-[11px] text-cyan-600 dark:text-cyan-400">{res.role[locale]}</div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{res.rating}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Notifications Modal (Bilingual) */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-md rounded-3xl p-6 ${isLight ? 'bg-white text-slate-900 shadow-2xl' : 'bg-slate-900 text-white border border-slate-800 shadow-2xl'} space-y-4`}>
            <div className="flex justify-between items-center pb-2 border-b ${dividerColor}">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-cyan-500" />
                <h3 className="font-bold text-lg">{isAr ? 'مركز الإشعارات والتنبيهات' : 'Notifications Center'}</h3>
              </div>
              <button onClick={() => setNotificationsOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">{unreadNotificationsCount} {isAr ? 'إشعارات غير مقروءة' : 'unread notifications'}</span>
              <button
                onClick={handleMarkAllNotificationsRead}
                className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline cursor-pointer"
              >
                {isAr ? 'تحديد الكل كمقروء' : 'Mark all as read'}
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500 space-y-2">
                  <Bell className="w-8 h-8 mx-auto text-slate-500" />
                  <p className="font-bold text-slate-300">{isAr ? 'لا توجد إشعارات جديدة' : 'No New Notifications'}</p>
                  <p className="text-[11px] text-slate-500">{isAr ? 'ستصلك التنبيهات حول العروض ومراحل العمل هنا.' : 'Notifications regarding job proposals and milestones will appear here.'}</p>
                </div>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    className={`p-3.5 rounded-2xl border ${dividerColor} ${
                      n.unread
                        ? isLight
                          ? 'bg-cyan-50/70 border-cyan-200'
                          : 'bg-cyan-950/30 border-cyan-500/40'
                        : isLight
                        ? 'bg-slate-50'
                        : 'bg-slate-800/40'
                    } space-y-1 text-xs`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold flex items-center gap-1.5">
                        {n.unread && <span className="w-2 h-2 rounded-full bg-cyan-500"></span>}
                        {n.title[locale]}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.time[locale]}</span>
                    </div>
                    <p className={subTextColor}>{n.desc[locale]}</p>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setNotificationsOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold hover:opacity-80 transition cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Phone Verification Modal */}
      {phoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-md rounded-3xl p-6 ${isLight ? 'bg-white text-slate-900 shadow-2xl' : 'bg-slate-900 text-white border border-slate-800 shadow-2xl'} space-y-5`}>
            <div className="flex justify-between items-center pb-2 border-b ${dividerColor}">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-lg">{isAr ? 'تأكيد رقم الهاتف المؤسسي' : 'Verify Corporate Phone'}</h3>
              </div>
              <button onClick={() => setPhoneModalOpen(false)} className="text-slate-400 hover:text-white text-xl font-bold cursor-pointer">
                ×
              </button>
            </div>

            <p className={`text-xs ${subTextColor}`}>
              {isAr
                ? 'أدخل رقم هاتفك لتأكيد هويتك وتمكين نشر المشاريع الهندسية والتعاقد بنظام الضمان Escrow.'
                : 'Enter your phone number to verify your identity and enable publishing aerospace & telecom engineering jobs.'}
            </p>

            <form onSubmit={handleVerifyPhone} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">{isAr ? 'رقم الهاتف مع رمز الدولة' : 'Phone Number with Country Code'}</label>
                <input
                  type="tel"
                  required
                  placeholder="+967 770 000 000"
                  value={phoneNumberInput}
                  onChange={e => setPhoneNumberInput(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono ${
                    isLight ? 'border-slate-300 bg-slate-50 focus:bg-white' : 'border-slate-700 bg-slate-800 focus:bg-slate-700'
                  } focus:outline-none focus:border-cyan-500 transition`}
                  dir="ltr"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPhoneModalOpen(false)}
                  className={`px-4 py-2 rounded-xl border ${dividerColor} text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer`}
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  {isAr ? 'تأكيد وحفظ الرقم' : 'Verify & Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Timesheets & Working Hours Modal (Bilingual) */}
      {timesheetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-xl rounded-3xl p-6 ${isLight ? 'bg-white text-slate-900 shadow-2xl' : 'bg-slate-900 text-white border border-slate-800 shadow-2xl'} space-y-4`}>
            <div className="flex justify-between items-center pb-2 border-b ${dividerColor}">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-500" />
                <h3 className="font-bold text-lg">{isAr ? 'سجلات الساعات ومراحل العمل الهندسية' : 'Timesheets & Logged Hours'}</h3>
              </div>
              <button onClick={() => setTimesheetModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {timesheetEntries.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500 space-y-2">
                  <Clock className="w-8 h-8 mx-auto text-slate-500" />
                  <p className="font-bold text-slate-300">{isAr ? 'لا توجد سجلات ساعات مسجلة حالياً' : 'No Logged Hours'}</p>
                  <p className="text-[11px] text-slate-500">{isAr ? 'ستظهر هنا تفاصيل ساعات العمل بعد بدء العقود.' : 'Engineer logged work hours will appear here.'}</p>
                </div>
              ) : (
                timesheetEntries.map((row, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${dividerColor} bg-slate-50/60 dark:bg-slate-800/40 text-xs space-y-1`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-cyan-600 dark:text-cyan-400">{row.engineer[locale]}</span>
                      <span className="font-mono font-bold">{row.hours}</span>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 font-medium">{row.task[locale]}</div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                      <span>{row.period[locale]}</span>
                      <span className="text-emerald-500 font-bold">{row.status[locale]}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setTimesheetModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500 transition cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Financial Summary Modal (Bilingual) */}
      {summaryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-lg rounded-3xl p-6 ${isLight ? 'bg-white text-slate-900 shadow-2xl' : 'bg-slate-900 text-white border border-slate-800 shadow-2xl'} space-y-5`}>
            <div className="flex justify-between items-center pb-2 border-b ${dividerColor}">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-lg">{isAr ? 'الملخص المالي الشامل (Escrow Vault Statement)' : 'Financial Summary Statement'}</h3>
              </div>
              <button onClick={() => setSummaryModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-200 dark:divide-slate-800">
              <div className="flex justify-between py-2">
                <span>{isAr ? 'إجمالي المبالغ المحجوزة في الضمان Escrow:' : 'Total Held in Escrow Vault:'}</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">$0.00</span>
              </div>
              <div className="flex justify-between py-2">
                <span>{isAr ? 'المبالغ المحررة والمعتمدة سابقاً:' : 'Previously Released Funds:'}</span>
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">$0.00</span>
              </div>
              <div className="flex justify-between py-2">
                <span>{isAr ? 'رسوم العضوية والاشتراك:' : 'Membership Fees:'}</span>
                <span className="font-mono font-bold text-emerald-500">$0.00 (مجاناً 0%)</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-bold">
                <span>{isAr ? 'الرصيد المتاح للتعاقد:' : 'Available Balance:'}</span>
                <span className="font-mono font-black text-emerald-500">$0.00</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => {
                  setSummaryModalOpen(false);
                  triggerToast(isAr ? 'تم تحميل الفاتورة الضريبية بصيغة PDF' : 'Invoice downloaded successfully');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500 transition cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isAr ? 'تحميل كشف الحساب PDF' : 'Download PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Milestone Approval Confirmation Modal */}
      {releaseConfirmModalOpen && selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-md rounded-3xl p-6 ${isLight ? 'bg-white text-slate-900 shadow-2xl' : 'bg-slate-900 text-white border border-slate-800 shadow-2xl'} space-y-5`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base">{isAr ? 'اعتماد المرحلة وتحرير المبلغ' : 'Approve Milestone & Release'}</h3>
                <div className="text-xs text-slate-400">{selectedContract.title[locale]}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
              <div className="flex justify-between">
                <span>{isAr ? 'المهندس المستفيد:' : 'Beneficiary Engineer:'}</span>
                <span className="font-bold">{selectedContract.engineer[locale]}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'المبلغ المحرر من الضمان:' : 'Amount to Release:'}</span>
                <span className="font-bold text-emerald-500 font-mono text-base">{selectedContract.amount}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>{isAr ? 'حماية الضمان Escrow:' : 'Escrow Protection:'}</span>
                <span className="text-emerald-500 font-bold">100% Guaranteed</span>
              </div>
            </div>

            <p className={`text-xs ${subTextColor}`}>
              {isAr
                ? 'عند الضغط على تأكيد، سيتم تحويل المبلغ المحجوز فوراً وبشكل نهائي إلى الحساب البنكي للمهندس، وتوليد الفاتورة الضريبية الرسمية.'
                : 'By clicking confirm, funds will be released from the Escrow vault directly to the engineer.'}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setReleaseConfirmModalOpen(false)}
                className={`px-4 py-2 rounded-xl border ${dividerColor} text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer`}
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleConfirmRelease}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                {isAr ? 'تأكيد تحرير المبلغ' : 'Confirm Release'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Contract Details & Deliverables Modal */}
      {contractDetailsModalOpen && selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-lg rounded-3xl p-6 ${isLight ? 'bg-white text-slate-900 shadow-2xl' : 'bg-slate-900 text-white border border-slate-800 shadow-2xl'} space-y-4`}>
            <div className="flex justify-between items-center pb-2 border-b ${dividerColor}">
              <div>
                <h3 className="font-bold text-base">{selectedContract.title[locale]}</h3>
                <div className="text-xs text-cyan-600 dark:text-cyan-400">{selectedContract.engineer[locale]} • {selectedContract.specialty[locale]}</div>
              </div>
              <button onClick={() => setContractDetailsModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border ${dividerColor} space-y-2">
                <div className="flex justify-between">
                  <span className={subTextColor}>{isAr ? 'حالة العقد:' : 'Contract Status:'}</span>
                  <span className="font-bold text-emerald-500">{selectedContract.released ? selectedContract.releasedStatus[locale] : selectedContract.status[locale]}</span>
                </div>
                <div className="flex justify-between">
                  <span className={subTextColor}>{isAr ? 'القيمة الإجمالية في الضمان:' : 'Escrow Value:'}</span>
                  <span className="font-mono font-bold text-emerald-400">{selectedContract.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className={subTextColor}>{isAr ? 'نسبة الإنجاز:' : 'Progress:'}</span>
                  <span className="font-mono font-bold text-cyan-400">{selectedContract.progress}%</span>
                </div>
              </div>

              <div>
                <div className="font-bold mb-2">{isAr ? 'الملفات والمخرجات المرفوعة من المهندس:' : 'Delivered Files:'}</div>
                <div className="space-y-2">
                  {selectedContract.files.map((file: string, idx: number) => (
                    <div key={idx} className={`p-2.5 rounded-xl border ${dividerColor} flex justify-between items-center`}>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-cyan-500" />
                        <span className="font-mono">{file}</span>
                      </div>
                      <button
                        onClick={() => triggerToast(isAr ? `جاري تحميل الملف: ${file}` : `Downloading ${file}`)}
                        className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>{isAr ? 'تحميل' : 'Download'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setContractDetailsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold hover:opacity-80 transition cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Help & Dispute Resolution Modal */}
      {helpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-lg rounded-3xl p-6 ${isLight ? 'bg-white text-slate-900 shadow-2xl' : 'bg-slate-900 text-white border border-slate-800 shadow-2xl'} space-y-4`}>
            <div className="flex justify-between items-center pb-2 border-b ${dividerColor}">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-500" />
                <h3 className="font-bold text-lg">{isAr ? 'مركز الدعم الفني والتحكيم الهندسي' : 'Support & Dispute Arbitration'}</h3>
              </div>
              <button onClick={() => setHelpModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-2">
                <div className="font-bold text-sm text-cyan-400">{isAr ? 'حماية النزاعات والتحكيم بنظام Escrow' : 'Escrow Dispute Protection'}</div>
                <p className="leading-relaxed text-slate-300">
                  {isAr
                    ? 'في حال وجود أي اختلاف في المواصفات الهندسية أو نتائج المحاكاة، تضمن المنصة تجميد أموال الضمان وتعيين لجنة تحكيم هندسية متخصصة للفصل الفني في المخرجات.'
                    : 'If specifications differ, Satcom Engineers provides certified technical arbitration before funds are released.'}
                </p>
                <button
                  onClick={() => {
                    setHelpModalOpen(false);
                    triggerToast(isAr ? 'تم فتح طلب تحكيم رسمي وتم توجيهه إلى اللجنة الهندسية' : 'Arbitration ticket submitted');
                  }}
                  className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition cursor-pointer"
                >
                  {isAr ? 'فتح طلب تحكيم هندسي' : 'Open Arbitration Ticket'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/messages"
                  className={`p-3.5 rounded-2xl border ${dividerColor} hover:bg-slate-100 dark:hover:bg-slate-800 transition block`}
                >
                  <div className="font-bold">{isAr ? 'المحادثة المباشرة' : 'Live Chat'}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{isAr ? 'دعم فني متاح 24/7' : '24/7 Technical support'}</div>
                </Link>

                <div
                  onClick={() => {
                    setHelpModalOpen(false);
                    setSummaryModalOpen(true);
                  }}
                  className={`p-3.5 rounded-2xl border ${dividerColor} hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer`}
                >
                  <div className="font-bold">{isAr ? 'سياسة الضمان المالي' : 'Escrow Policy'}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{isAr ? '100% حماية تعاقدية' : '100% Contractual protection'}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setHelpModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold hover:opacity-80 transition cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
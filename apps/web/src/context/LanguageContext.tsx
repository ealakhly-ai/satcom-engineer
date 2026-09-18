'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Locale = 'ar' | 'en';

export interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export const translations: Translations = {
  // Brand & Nav
  brandTitle: { ar: 'Satcom Engineers', en: 'Satcom Engineers' },
  brandSubtitle: { ar: 'سوق العمل لمهندسي الأقمار الصناعية والاتصالات', en: 'Space & RF Telecom Engineering Marketplace' },
  navJobs: { ar: 'تصفح المشاريع', en: 'Find Work' },
  navFreelancers: { ar: 'نخبة المهندسين', en: 'Find Talent' },
  navMyJobs: { ar: 'مشاريعي وعقودي', en: 'My Jobs' },
  navReports: { ar: 'التقارير المالية', en: 'Reports' },
  navMessages: { ar: 'الرسائل', en: 'Messages' },
  navHowItWorks: { ar: 'كيف تعمل المنصة', en: 'How It Works' },
  navPricing: { ar: 'الضمان المالي والبوابات', en: 'Escrow & Gateways' },
  navPostJob: { ar: 'نشر مشروع', en: 'Post a Job' },
  navLogin: { ar: 'تسجيل الدخول', en: 'Sign In' },
  navDashboard: { ar: 'لوحة التحكم', en: 'Dashboard' },
  navAdmin: { ar: 'لوحة التحكم', en: 'Control Panel' },
  switchLang: { ar: 'English', en: 'العربية' },
  switchToClient: { ar: 'التحويل لوضع العميل', en: 'Switch to Client' },
  switchToFreelancer: { ar: 'التحويل لوضع المهندس', en: 'Switch to Freelancer' },

  // Search in header
  searchPlaceholderHeader: { ar: 'ابحث عن مشاريع أو مهندسي فضاء...', en: 'Search projects or engineers...' },

  // Hero
  heroBadge: { ar: 'مجتمع خبراء ومهندسي الاتصالات الفضائية والراديو', en: 'Premier Network for Satellite & RF Communications Engineers' },
  heroTitle1: { ar: 'وظّف نخبة مهندسي', en: 'Hire Elite Engineers in' },
  heroTitle2: { ar: 'الاتصالات الفضائية و RF', en: 'Satellite Comms & RF' },
  heroSubtitle: {
    ar: 'منصة تخصصية تجمع مهندسي الأقمار الصناعية، أنظمة RF، وشبكات الاتصالات مع العملاء، بحماية مالية كاملة 100% عبر حساب الضمان Escrow وبوابات دفع عالمية مرنة.',
    en: 'A specialized marketplace connecting satellite, RF, and aerospace engineers with global clients. 100% Escrow security and flexible global payment gateways.',
  },
  exploreJobs: { ar: 'استكشف المشاريع المتاحة', en: 'Explore Open Projects' },
  postNewJob: { ar: 'انشر مشروع جديد', en: 'Post a Job' },

  // Escrow Banner
  fee50: { ar: '100% حماية', en: '100% Protected' },
  fee50Sub: { ar: 'أموال العقد مؤمنة في Escrow', en: 'Funds secured in Escrow' },
  escrow100: { ar: '0% اشتراك', en: '0% Subscription' },
  escrow100Sub: { ar: 'بدون أي رسوم عضوية شهرية', en: 'No monthly membership fees' },
  zeroPercent: { ar: 'بوابات دولية', en: 'Global Gateways' },
  zeroPercentSub: { ar: 'سداد وسحب فوري متعدد الخيارات', en: 'Instant multi-channel payouts' },

  // Satellite Job Feed
  jobFeedTitle: { ar: 'موجز المشاريع والفرص الهندسية', en: 'Browse Jobs & Contracts' },
  jobFeedSubtitle: { ar: 'مشاريع حصرية في مجالات الأقمار الصناعية، هوائيات الميكروويف، ومعالجة الإشارات SDR', en: 'Specialized aerospace, satellite, and RF engineering opportunities' },
  tabBestMatches: { ar: 'أفضل تطابق', en: 'Best Matches' },
  tabMostRecent: { ar: 'الأحدث', en: 'Most Recent' },
  tabSavedJobs: { ar: 'المحفوظة', en: 'Saved Jobs' },
  filterSpecialty: { ar: 'التخصص والتردد', en: 'Band & Specialty' },
  filterExperience: { ar: 'مستوى الخبرة', en: 'Experience Level' },
  filterJobType: { ar: 'نوع التعاقد', en: 'Job Type' },
  filterClientInfo: { ar: 'موثوقية العميل', en: 'Client History' },
  filterProposals: { ar: 'عدد العروض', en: 'Proposals Count' },
  expEntry: { ar: 'مبتدئ ($)', en: 'Entry Level ($)' },
  expIntermediate: { ar: 'متوسط ($$)', en: 'Intermediate ($$)' },
  expExpert: { ar: 'خبير ($$$)', en: 'Expert ($$$)' },
  typeFixed: { ar: 'سعر ثابت (Fixed-Price)', en: 'Fixed-Price' },
  typeHourly: { ar: 'بالساعة (Hourly)', en: 'Hourly' },
  clientVerified: { ar: 'عميل معتمد الدفع ✓', en: 'Payment Verified ✓' },
  client5Stars: { ar: 'تقييم 5 نجوم', en: '5-Star Rated' },
  applyNow: { ar: 'تقديم عرض', en: 'Apply Now' },
  saveJob: { ar: 'حفظ', en: 'Save' },
  proposals: { ar: 'عروض مقدمة', en: 'proposals' },
  estBudget: { ar: 'الميزانية التقديرية', en: 'Est. Budget' },
  hourlyRate: { ar: 'الأجر بالساعة', en: 'Hourly Rate' },

  // Satellite Talent Directory
  talentTitle: { ar: 'نخبة مهندسي الاتصالات الفضائية', en: 'Top Satellite & RF Engineers' },
  talentSubtitle: { ar: 'وظف مهندسين معتمدين بدرجة نجاح 100% وخبرات في CST Studio, SDR, Link Budget', en: 'Hire verified space systems architects with 100% Job Success Scores' },
  topRated: { ar: 'أعلى تقييم (Top Rated)', en: 'Top Rated' },
  jobSuccessScore: { ar: 'نسبة نجاح المشاريع', en: 'Job Success Score' },
  totalEarnedLabel: { ar: 'أرباح سابقة', en: 'Total Earned' },
  inviteToJob: { ar: 'دعوة لمشروع', en: 'Invite to Job' },
  sendMessage: { ar: 'مراسلة فورية', en: 'Send Message' },
  viewProfile: { ar: 'الملف الشخصي', en: 'View Profile' },

  // Login Page & Authentication
  loginTitle: { ar: 'تسجيل الدخول إلى المنصة', en: 'Sign In to Satcom Engineers' },
  loginSubtitle: { ar: 'أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى مساحة عملك', en: 'Enter your credentials to access your workspace' },
  emailLabel: { ar: 'البريد الإلكتروني', en: 'Email Address' },
  passwordLabel: { ar: 'كلمة المرور', en: 'Password' },
  rememberMe: { ar: 'تذكر بياناتي', en: 'Remember me' },
  forgotPassword: { ar: 'نسيت كلمة المرور؟', en: 'Forgot password?' },
  signInBtn: { ar: 'تسجيل الدخول', en: 'Sign In' },
  noAccount: { ar: 'ليس لديك حساب بعد؟', en: "Don't have an account yet?" },
  signUp: { ar: 'إنشاء حساب جديد', en: 'Sign Up' },

  // Dashboards
  clientDashTitle: { ar: 'لوحة تحكم صاحب العمل (العميل)', en: 'Client Workspace Dashboard' },
  clientDashSub: { ar: 'إدارة مشاريعك، متابعة حسابات الضمان Escrow، واعتماد التسليمات', en: 'Manage projects, inspect Escrow vault balances, and approve deliveries' },
  engineerDashTitle: { ar: 'لوحة عمل المهندس المستقل', en: 'Satellite Engineer Workspace' },
  engineerDashSub: { ar: 'العقود النشطة، مراحل العمل الهندسية، والأرباح المحصلة 100%', en: 'Active contracts, engineering milestones, and 100% earned payouts' },
  adminDashTitle: { ar: 'لوحة إدارة منصة Satcom Engineers', en: 'Mission Control Admin Dashboard' },
  adminDashSub: { ar: 'متابعة الإيرادات التراكمية، العقود النشطة، وحسابات الضمان', en: 'Real-time revenue monitoring, active contracts, and Escrow assurance' },

  // Metrics
  activeContracts: { ar: 'العقود النشطة', en: 'Active Contracts' },
  totalSpent: { ar: 'إجمالي الإنفاق في Escrow', en: 'Total Escrow Funded' },
  totalEarned: { ar: 'صافي الأرباح (100% كاملة)', en: 'Net Earnings (100% Payout)' },
  openProposals: { ar: 'العروض المقدمة', en: 'Active Proposals' },
  platformFeeStat: { ar: 'المشاريع المنجزة بنجاح', en: 'Projects Completed' },

  // Footer
  allRights: { ar: 'جميع الحقوق محفوظة © 2026 Satcom Engineers', en: 'All rights reserved © 2026 Satcom Engineers' },
  aboutPlatform: { ar: 'عن المنصة', en: 'About Platform' },
  supportSecurity: { ar: 'الدعم والأمان', en: 'Support & Security' },
  disputeResolution: { ar: 'حل النزاعات والتحكيم', en: 'Dispute Arbitration' },
  designedByTeam: { ar: 'تصميم وتطوير Emadsoft', en: 'Designed & Developed by Emadsoft' },
};

interface LanguageContextType {
  locale: Locale;
  lang: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'ar',
  lang: 'ar',
  setLocale: () => {},
  toggleLocale: () => {},
  t: (key: string) => key,
  dir: 'rtl',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('satcom_locale') as Locale;
    if (saved === 'ar' || saved === 'en') {
      setLocaleState(saved);
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('satcom_locale', newLocale);
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
  };

  const toggleLocale = () => {
    const next = locale === 'ar' ? 'en' : 'ar';
    setLocale(next);
  };

  const t = (key: string): string => {
    const item = translations[key];
    if (!item) return key;
    return item[locale] || item.ar || key;
  };

  const dir: 'rtl' | 'ltr' = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ locale, lang: locale, setLocale, toggleLocale, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

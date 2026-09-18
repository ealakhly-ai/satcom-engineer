'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Locale = 'ar' | 'en';

export interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export const adminTranslations: Translations = {
  // Brand & Shell
  brandTitle: { ar: 'Satcom Engineers', en: 'Satcom Engineers' },
  brandSubtitle: { ar: 'Mission Control Admin', en: 'Mission Control Admin' },
  missionControl: { ar: 'منطقة الإدارة العليا • Mission Control', en: 'Mission Control • Super Admin' },
  coreBadge: { ar: 'Satcom Engineers Platform Core', en: 'Satcom Engineers Platform Core' },
  viewPublicPlatform: { ar: 'عرض المنصة الرئيسية', en: 'View Live Platform' },
  adminUserTitle: { ar: 'مدير النظام (Admin)', en: 'System Administrator' },
  rootAccount: { ar: 'حساب المدير العام', en: 'Root Admin Account' },
  fullRootPrivileges: { ar: 'صلاحيات كاملة (Full Root)', en: 'Full Root Privileges' },
  lockAndLogout: { ar: 'قفل اللوحة وتسجيل الخروج', en: 'Lock & Sign Out' },
  switchLang: { ar: 'English', en: 'العربية' },
  emadsoftBranding: { ar: 'تصميم وتطوير Emadsoft', en: 'Designed & Developed by Emadsoft' },

  // Sidebar Menu
  menuDashboard: { ar: 'لوحة التحكم الرئيسية', en: 'Mission Control' },
  menuJobs: { ar: 'مشاريع المنصة', en: 'Platform Jobs' },
  menuContracts: { ar: 'العقود وحسابات Escrow', en: 'Contracts & Escrow Vault' },
  menuUsers: { ar: 'المهندسون والعملاء', en: 'Engineers & Clients' },
  menuDisputes: { ar: 'إدارة النزاعات والتحكيم', en: 'Disputes & Arbitration' },
  menuFinance: { ar: 'التقارير المالية والعمولات', en: 'Financial Reports & Gateways' },
  menuSettings: { ar: 'إعدادات النظام والأمان', en: 'Gateway & System Settings' },

  // Login Gate
  loginGateTitle: { ar: 'لوحة إدارة المنصة', en: 'Admin Mission Control' },
  loginGateSubtitle: {
    ar: 'منطقة مشفرة ومحمية بالكامل. لا يُسمح بالدخول إلا لمدير النظام عبر اسم المستخدم وكلمة المرور.',
    en: 'Fully encrypted and restricted area. Access permitted to authorized system administrators only.',
  },
  usernameLabel: { ar: 'اسم المستخدم للمدير أو البريد الإلكتروني', en: 'Admin Username or Email' },
  usernamePlaceholder: { ar: 'اسم المدير (Admin Username)', en: 'Admin Username' },
  passwordLabel: { ar: 'كلمة المرور السرية للمدير', en: 'Admin Secret Password' },
  loginBtn: { ar: 'التحقق والدخول إلى لوحة الإدارة', en: 'Authenticate & Enter Console' },
  verifyingBtn: { ar: 'جاري التحقق من صلاحيات المدير...', en: 'Verifying admin credentials...' },
  returnToMain: { ar: 'العودة إلى المنصة الرئيسية (Satcom Engineers)', en: 'Return to Public Platform' },
  loginError: {
    ar: 'اسم المستخدم أو كلمة المرور غير صحيحة. هذا القسم محمي ومخصص لمدير النظام فقط.',
    en: 'Invalid username or password. This portal is restricted to authorized administrators only.',
  },

  // Dashboard Overview
  superAdminBadge: { ar: 'مدير النظام الرئيسي • Super Admin', en: 'Super Administrator • Root' },
  dashHeaderTitle: { ar: 'لوحة الإدارة والتحكم العليا (Mission Control)', en: 'Mission Control Executive Console' },
  dashHeaderSub: {
    ar: 'متابعة إيرادات المنصة ($20 لكل $300)، تدفق أموال الضمان Escrow، والاعتماد الفني للمهندسين',
    en: 'Real-time tracking of platform revenue ($20 per $300 tier), Escrow vault liquidity, and technical talent vetting.',
  },

  // Metric Cards
  metricRevenue: { ar: 'إجمالي إيراد المنصة ($20 لكل $300)', en: 'Total Platform Revenue ($20 / $300)' },
  metricRevenueSub: { ar: 'محسوبة آلياً من العقود المكتملة', en: 'Auto-calculated from completed contracts' },
  metricEscrow: { ar: 'أموال الضمان المحجوزة (Escrow)', en: 'Escrow Vault Locked Funds' },
  metricEscrowSub: { ar: 'عقود جارية مؤمنة ومحمية بنسبة 100%', en: 'Active contracts protected 100%' },
  metricEngineers: { ar: 'المهندسون المعتمدون', en: 'Verified Satellite Engineers' },
  metricEngineersSub: { ar: 'سجل الخبراء الموثقين بالمنصة', en: 'Directory of vetted aerospace engineers' },
  metricDisputes: { ar: 'حالات النزاع والتحكيم', en: 'Disputes & Arbitration Cases' },
  metricDisputesSub: { ar: 'كافة المعاملات تسير بسلام', en: 'All transactions running smoothly' },

  // Escrow Vault Table
  escrowTableTitle: { ar: 'آخر تحويلات الضمان المالي (Escrow Vault)', en: 'Recent Escrow Vault Transactions' },
  escrowTableSub: {
    ar: 'حماية حقوق الطرفين بنسبة 100% مع احتساب العمولة آلياً في الخلفية ($20 لكل $300)',
    en: '100% dual-party financial protection with automated backend commission calculation ($20 per $300 tier)',
  },
  liveUpdateBadge: { ar: 'تحديث فوري ✓', en: 'Live Real-Time ✓' },
  colProject: { ar: 'المشروع', en: 'Project' },
  colParties: { ar: 'الطرفان', en: 'Parties' },
  colAmount: { ar: 'مبلغ العقد', en: 'Contract Amount' },
  colFee: { ar: 'رسم المنصة', en: 'Platform Fee' },
  colStatus: { ar: 'حالة الضمان', en: 'Escrow Status' },
  colActions: { ar: 'إجراءات المدير', en: 'Admin Actions' },
  colGateway: { ar: 'بوابة الدفع', en: 'Payment Gateway' },

  // Empty States
  emptyEscrowTitle: { ar: 'لا توجد تحويلات ضمان مسجلة حالياً', en: 'No Escrow Transactions Yet' },
  emptyEscrowDesc: {
    ar: 'عند إنشاء وتمويل أي عقد جديد من قبل العملاء، ستظهر المعاملات وتدفقات الضمان المالي هنا فوراً.',
    en: 'Once new contracts are created and funded by clients, secured escrow movements will appear here automatically.',
  },
  emptyVettingTitle: { ar: 'لا توجد طلبات اعتماد معلقة', en: 'No Pending Vetting Requests' },
  emptyVettingDesc: {
    ar: 'كافة طلبات التوثيق الفني للمهندسين وفحص الشهادات تمت مراجعتها بالكامل.',
    en: 'All engineer technical verification requests and credentials have been reviewed.',
  },
  vettingHeader: { ar: 'طلبات اعتماد المهندسين', en: 'Engineer Vetting Queue' },
  pendingCount: { ar: '0 في الانتظار', en: '0 Pending' },

  // Backend Engine Card
  backendEngineTitle: { ar: 'محرك العمولة في الخلفية ($20 لكل $300)', en: 'Backend Commission Engine ($20 per $300)' },
  backendEngineDesc: {
    ar: 'تُحسب العمولة تلقائياً في السيرفر بقاعدة $20 بعد كل $300 من قيمة العقد. وتظل مخفية تماماً عن واجهات المستخدمين لضمان تجربة سلسة وتوريد 100% من الأتعاب للمهندسين.',
    en: 'Commission is automatically calculated on the server at $20 for every $300 contract tier. It is completely concealed from user interfaces to deliver 100% net earnings to engineers.',
  },

  // Contracts Page
  contractsHeaderTitle: { ar: 'إدارة العقود وحسابات الضمان (Escrow Contracts Manager)', en: 'Contracts & Escrow Vault Manager' },
  contractsHeaderSub: {
    ar: 'صلاحيات كاملة للمدير: إضافة عقود جديدة، تعديل الشروط والمبالغ، وتحرير الدفعات أو استردادها',
    en: 'Full administrator controls: create contracts, adjust terms, release milestone funds, or issue refunds.',
  },
  addContractBtn: { ar: '+ إضافة عقد جديد', en: '+ Create New Contract' },
  statTotalContracts: { ar: 'إجمالي العقود المسجلة', en: 'Total Registered Contracts' },
  statActiveEscrow: { ar: 'مبالغ الضمان النشطة (Escrow Vault)', en: 'Active Escrow Vault Funds' },
  statFeesEarned: { ar: 'رسوم المنصة المحصلة ($20 لكل $300)', en: 'Platform Fees Earned ($20 / $300)' },
  statGateways: { ar: 'بوابات الدفع المستخدمة', en: 'Active Payment Gateways' },
  searchPlaceholder: { ar: 'ابحث برقم العقد، اسم العميل، المهندس، أو التخصص...', en: 'Search by contract ID, client, engineer, or specialty...' },
  allFilter: { ar: 'الكل', en: 'All' },
  filterFunded: { ar: 'محجوز في الضمان', en: 'Funded in Escrow' },
  filterInProgress: { ar: 'قيد التنفيذ', en: 'In Progress' },
  filterSubmitted: { ar: 'بانتظار الاعتماد', en: 'Under Review' },
  filterApproved: { ar: 'مكتمل ومعتمد', en: 'Approved & Released' },
  filterDisputed: { ar: 'نزاع', en: 'Disputed' },
  emptyContractsTitle: { ar: 'لا توجد عقود مسجلة حالياً في النظام', en: 'No Contracts Recorded Yet' },
  emptyContractsDesc: {
    ar: 'يمكنك إنشاء عقد جديد وتأمينه في الضمان المالي بالضغط على زر إضافة عقد جديد أعلاه.',
    en: 'You can create a new contract and secure it in the escrow vault by clicking the button above.',
  },

  // Finance Page
  financeHeaderTitle: { ar: 'التقارير المالية وحصيلة بوابات الدفع', en: 'Financial Reports & Payment Gateways' },
  financeHeaderSub: {
    ar: 'سجل المدفوعات العالمية عبر Stripe، PayPal، الحوالات البنكية، وعمولات المنصة المحسوبة آلياً في الخلفية ($20 لكل $300)',
    en: 'Global payment logs via Stripe, PayPal, SWIFT, and backend auto-calculated platform fees ($20 per $300 tier).',
  },
  exportCsvBtn: { ar: 'تصدير كشف حساب (CSV / Excel)', en: 'Export Statement (CSV / Excel)' },
  stripeCardTitle: { ar: 'مدفوعات Stripe', en: 'Stripe Payments' },
  paypalCardTitle: { ar: 'مدفوعات PayPal', en: 'PayPal Payments' },
  swiftCardTitle: { ar: 'حوالات SWIFT البنكية', en: 'SWIFT Wire Transfers' },
  cryptoCardTitle: { ar: 'محافظ العملات USDT', en: 'USDT Escrow Wallets' },
  zeroOps: { ar: '0 عمليات مسجلة', en: '0 transactions logged' },
  emptyFinanceTitle: { ar: 'لا توجد معاملات مالية مسجلة حالياً', en: 'No Financial Transactions Recorded Yet' },
  emptyFinanceDesc: {
    ar: 'ستظهر جميع عمليات التمويل والسحب عبر Stripe و PayPal و SWIFT و USDT هنا فور تسجيلها.',
    en: 'All funding and payout movements via Stripe, PayPal, SWIFT, and USDT will display here automatically.',
  },

  // Settings Page
  settingsHeaderTitle: { ar: 'إعدادات بوابات الدفع العالمية والمنصة', en: 'Global Payment Gateways & Platform Settings' },
  settingsHeaderSub: {
    ar: 'إدارة مفاتيح وتفعيل بوابات الدفع الدولية: Stripe، PayPal، الحوالات البنكية SWIFT، ومحافظ الكريبتو',
    en: 'Manage API credentials and activation for Stripe, PayPal, SWIFT Wire, and Escrow Crypto Wallets.',
  },
  saveSettingsBtn: { ar: 'حفظ التعديلات', en: 'Save Configuration' },
  stripeSectionTitle: { ar: 'بوابة Stripe (البطاقات البنكية Visa / MasterCard / Amex)', en: 'Stripe Gateway (Visa / MasterCard / Amex)' },
  stripeSectionSub: { ar: 'معالجة فورية للمدفوعات العالمية وحجز أموال الضمان Escrow تلقائياً', en: 'Instant global card processing with automated Escrow vault holding' },
  paypalSectionTitle: { ar: 'بوابة PayPal العالمية', en: 'PayPal Global Gateway' },
  paypalSectionSub: { ar: 'تمكين العملاء والمهندسين من الدفع والسحب عبر حسابات PayPal حول العالم', en: 'Enable clients and engineers to pay and withdraw via global PayPal accounts' },
  wireSectionTitle: { ar: 'حساب الحوالات البنكية المباشرة (Wire Transfer / SWIFT)', en: 'Direct Bank Wire / SWIFT Vault' },
  wireSectionSub: { ar: 'مخصص للمؤسسات الفضائية والشركات الكبرى لإيداع مبالغ العقود الضخمة في حساب الضمان', en: 'Dedicated to aerospace enterprises for high-value contract deposits into Escrow' },
  cryptoSectionTitle: { ar: 'بوابة الضمان بالعملات الرقمية (USDT / USDC Escrow)', en: 'Cryptocurrency Escrow Gateway (USDT / USDC)' },
  cryptoSectionSub: { ar: 'تمكين المهندسين في مختلف الدول من استلام أتعابهم فوراً بالعملات المستقرة دون قيود بنكية', en: 'Empower engineers globally to receive instant payouts in stablecoins without banking friction' },
  enabledBadge: { ar: 'مفعلة ✓', en: 'Enabled ✓' },
  disabledBadge: { ar: 'معطلة', en: 'Disabled' },
};

interface AdminLanguageContextType {
  locale: Locale;
  lang: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const AdminLanguageContext = createContext<AdminLanguageContextType>({
  locale: 'ar',
  lang: 'ar',
  setLocale: () => {},
  toggleLocale: () => {},
  t: (key: string) => key,
  dir: 'rtl',
});

export const AdminLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('ar');

  useEffect(() => {
    try {
      const saved = (localStorage.getItem('satcom_admin_locale') || localStorage.getItem('satcom_locale')) as Locale;
      if (saved === 'ar' || saved === 'en') {
        setLocaleState(saved);
        if (typeof document !== 'undefined') {
          document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = saved;
        }
      }
    } catch {
      // safe fallback
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('satcom_admin_locale', newLocale);
    } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLocale;
    }
  };

  const toggleLocale = () => {
    const next = locale === 'ar' ? 'en' : 'ar';
    setLocale(next);
  };

  const t = (key: string): string => {
    const item = adminTranslations[key];
    if (!item) return key;
    return item[locale] || item.ar || key;
  };

  const dir: 'rtl' | 'ltr' = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <AdminLanguageContext.Provider value={{ locale, lang: locale, setLocale, toggleLocale, t, dir }}>
      {children}
    </AdminLanguageContext.Provider>
  );
};

export const useAdminLanguage = () => useContext(AdminLanguageContext);

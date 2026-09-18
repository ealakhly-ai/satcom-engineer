'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CreditCard, 
  Globe, 
  Building2, 
  Coins, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  DollarSign,
  Sparkles,
  Calculator,
  Lock,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function PricingPage() {
  const { locale, dir } = useLanguage();
  const isAr = locale === 'ar';

  const [projectBudget, setProjectBudget] = useState(1500);

  // Commission model: $20 for every $300 (or fraction thereof)
  const calculatePlatformFee = (amount: number) => {
    if (!amount || amount <= 0) return 0;
    return Math.max(20, Math.ceil(amount / 300) * 20);
  };

  const satcomFee = calculatePlatformFee(projectBudget);
  const satcomTiers = Math.max(1, Math.ceil(projectBudget / 300));
  const satcomClientTotal = projectBudget + satcomFee;
  const satcomEngineerGets = projectBudget;

  const standardFreelancerFee = projectBudget * 0.10; // 10%
  const standardClientFee = projectBudget * 0.05; // 5%
  const standardTotalFees = standardFreelancerFee + standardClientFee;
  const standardEngineerGets = projectBudget - standardFreelancerFee;

  const savings = standardTotalFees - satcomFee;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-100" dir={dir}>
      
      {/* Hero Header in Deep Space */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-950/70 text-cyan-300 rounded-full text-xs font-bold border border-cyan-800/50 shadow-lg shadow-cyan-500/10">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{isAr ? 'حماية مالية متكاملة وبوابات دفع عالمية' : '100% Escrow Protection & Global Gateways'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {isAr ? (
            <>
              حماية الضمان المالي <span className="text-emerald-400">100% Escrow</span> وبوابات دفع عالمية
            </>
          ) : (
            <>
              Certified Escrow Security & <span className="text-emerald-400">Global Gateways</span>
            </>
          )}
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed">
          {isAr
            ? 'نضمن حقوق المهندسين والشركات بأعلى معايير الأمان المالي الدولي. المهندس يتسلم 100% من أتعابه كاملة دون أي استقطاع، مع معالجة مالية مؤتمتة في الخلفية (Backend) وبوابات دفع عالمية مشفرة بضمان بنكي.'
            : 'We safeguard client and engineer funds with international bank-grade security. Engineers receive 100% of agreed earnings with zero freelancer cut, while financial processing is handled automatically in the background.'}
        </p>
      </div>

      {/* GLOBAL PAYMENT GATEWAYS SHOWCASE in Deep Space */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2.5">
              <CreditCard className="w-6 h-6 text-cyan-400" />
              <span>{isAr ? 'بوابات الدفع العالمية المدعومة' : 'Supported Global Payment Gateways'}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isAr 
                ? 'خيارات مرنة ومؤمنة بأعلى معايير التشفير البنكي لتمويل العقود وسحب الأرباح' 
                : 'Flexible, PCI-DSS Level 1 compliant gateways to fund contracts and withdraw earnings'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/70 px-3 py-1.5 rounded-xl border border-emerald-800/50 self-start">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isAr ? 'حماية مشفرة 256-bit SSL' : '256-bit SSL Encrypted'}</span>
          </div>
        </div>

        {/* Gateways Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* 1. Stripe */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-indigo-400/60 hover:shadow-lg hover:shadow-indigo-500/10 transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950 text-indigo-400 flex items-center justify-center font-bold border border-indigo-800/40">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white">Stripe Global</h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {isAr 
                  ? 'دفع فوري ببطاقات الائتمان والخصم (Visa, MasterCard, Amex, JCB) من أكثر من 135 دولة.' 
                  : 'Instant checkout with credit & debit cards (Visa, MasterCard, Amex) across 135+ countries.'}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center gap-1 text-[10px] font-extrabold text-indigo-400">
              <span>Visa • MasterCard • Amex</span>
            </div>
          </div>

          {/* 2. PayPal */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10 transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold border border-cyan-800/40">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white">PayPal Express</h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {isAr 
                  ? 'تمويل فوري للعقود وسحب الأرباح لحساب PayPal الخاص بك بضغطة زر واحدة.' 
                  : 'Fast 1-click contract funding and automated payouts to your international PayPal balance.'}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center gap-1 text-[10px] font-extrabold text-cyan-400">
              <span>PayPal Balance • Linked Bank</span>
            </div>
          </div>

          {/* 3. Wire Transfer / SWIFT */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-500/10 transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold border border-emerald-800/40">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white">Wire Transfer (SWIFT)</h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {isAr 
                  ? 'حوالات بنكية رسمية للمؤسسات والشركات الفضائية الكبرى مع إصدار فواتير ضريبية معتمدة.' 
                  : 'Corporate direct wire transfers for aerospace labs and defense agencies with certified tax invoices.'}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center gap-1 text-[10px] font-extrabold text-emerald-400">
              <span>SWIFT / BIC • SEPA • ACH</span>
            </div>
          </div>

          {/* 4. Crypto Escrow */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10 transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-950 text-amber-400 flex items-center justify-center font-bold border border-amber-800/40">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white">Crypto Escrow (USDT)</h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {isAr 
                  ? 'محافظ رقمية لتمكين مهندسي الأقمار الصناعية حول العالم من سحب أرباحهم فوراً دون قيود تحويل دولية.' 
                  : 'Stablecoin escrow payouts (TRC20 / ERC20) providing zero cross-border friction for engineers worldwide.'}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center gap-1 text-[10px] font-extrabold text-amber-400">
              <span>USDT (TRC-20) • USDC (ERC-20)</span>
            </div>
          </div>

        </div>
      </div>

      {/* INTERACTIVE COMPARISON CALCULATOR */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0a1226] to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-800/50 px-3 py-1 rounded-full">
              {isAr ? 'حاسبة المقارنة التفاعلية' : 'Interactive Savings Calculator'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-2">
              {isAr ? 'قارن أرباحك وتكاليفك مع المنصات التقليدية' : 'Compare Your Earnings with Other Platforms'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isAr 
                ? 'حرّك المؤشر لتشاهد الفرق الضخم في المبالغ التي توفرها المنصة لكلا الطرفين' 
                : 'Slide the budget to see massive savings for both clients and engineers.'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex items-center gap-3">
            <Calculator className="w-6 h-6 text-emerald-400" />
            <div>
              <div className="text-[11px] text-slate-400 font-bold">{isAr ? 'وفورات الصفقة' : 'Total Savings'}</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">+${savings.toFixed(0)}</div>
            </div>
          </div>
        </div>

        {/* Budget Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm font-bold">
            <span className="text-slate-300">{isAr ? 'قيمة ميزانية المشروع الهندسية:' : 'Project Budget:'}</span>
            <span className="text-2xl font-black text-cyan-400 font-mono">${projectBudget.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={200}
            max={10000}
            step={100}
            value={projectBudget}
            onChange={(e) => setProjectBudget(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>$200</span>
            <span>$2,500</span>
            <span>$5,000</span>
            <span>$7,500</span>
            <span>$10,000+</span>
          </div>
        </div>

        {/* Side-by-Side Comparison Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Satcom Engineers Column */}
          <div className="bg-cyan-950/40 border-2 border-cyan-500/80 rounded-3xl p-6 space-y-4 relative overflow-hidden shadow-xl shadow-cyan-500/5">
            <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full">
              {isAr ? 'الخيار الأوفر 100%' : '100% Best Value'}
            </div>

            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <span>Satcom Engineers</span>
            </h3>

            <div className="space-y-2 text-xs divide-y divide-slate-800">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-300">{isAr ? 'نظام الحماية والأمان المالي:' : 'Escrow Protection System:'}</span>
                <span className="font-bold text-emerald-400 font-mono">100% Escrow Vault</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-300">{isAr ? 'نسبة الاستقطاع من أتعاب المهندس:' : 'Engineer Commission Cut:'}</span>
                <span className="font-bold text-emerald-400 font-mono">0% (يستلم أتعابه كاملة 100%)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-300">{isAr ? 'المعالجة المالية والفوترة:' : 'Financial Settlements:'}</span>
                <span className="font-medium text-cyan-300 text-[11px]">{isAr ? 'مؤتمتة بالكامل في الخلفية' : 'Automated Backend Processing'}</span>
              </div>
              <div className="flex justify-between py-1.5 text-sm font-bold">
                <span className="text-slate-200">{isAr ? 'صافي ما يستلمه المهندس في حسابه:' : 'Engineer Net Payout:'}</span>
                <span className="font-black text-emerald-400 text-base font-mono">${satcomEngineerGets.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 text-xs font-bold text-slate-400">
                <span>{isAr ? 'رسوم اشتراك شهرية:' : 'Monthly Subscription:'}</span>
                <span className="font-mono text-white">$0.00 (مجاناً)</span>
              </div>
            </div>
          </div>

          {/* Traditional Platforms Column */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-400">
              {isAr ? 'المنصات العامة التقليدية' : 'Traditional Platforms'}
            </h3>

            <div className="space-y-2 text-xs divide-y divide-slate-800 text-slate-400">
              <div className="flex justify-between py-1.5">
                <span>{isAr ? 'عمولة اقتطاع من المهندس (10%):' : 'Freelancer Cut (10%):'}</span>
                <span className="font-bold text-rose-400 font-mono">-${standardFreelancerFee.toFixed(0)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>{isAr ? 'رسوم معالجة من العميل (5%):' : 'Client Processing Fee (5%):'}</span>
                <span className="font-bold text-rose-400 font-mono">+${standardClientFee.toFixed(0)}</span>
              </div>
              <div className="flex justify-between py-1.5 text-sm">
                <span>{isAr ? 'صافي ما يستلمه المهندس:' : 'Engineer Net Payout:'}</span>
                <span className="font-black text-slate-300 text-base font-mono">${standardEngineerGets.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 text-xs text-slate-500">
                <span>{isAr ? 'إجمالي العمولات المفقودة:' : 'Total Lost in Fees:'}</span>
                <span className="font-mono text-rose-400 font-bold">${standardTotalFees.toFixed(0)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center pt-2">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black rounded-2xl text-xs shadow-lg shadow-cyan-500/25 transition"
          >
            <span>{isAr ? 'ابدأ الآن وتصفح الفرص الهندسية' : 'Start Now & Browse Projects'}</span>
            {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <span>{isAr ? 'الأسئلة الشائعة حول بوابات الدفع والضمان' : 'Frequently Asked Questions'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-300">
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-1.5">
            <h3 className="font-bold text-white text-sm">
              {isAr ? 'كيف يتم احتساب وتسوية المعاملات المالية؟' : 'How are financial settlements processed?'}
            </h3>
            <p>
              {isAr
                ? 'تتم كافة العمليات الحسابية والرسوم التشغيلية آلياً في الخلفية (Backend) دون أي استقطاعات من أرباح المهندس، حيث يستلم المهندس 100% من أتعابه المتفق عليها فور اعتماد العميل للعمل.'
                : 'All operational settlements are handled automatically in the background with zero commission deducted from the engineer, who receives 100% of agreed earnings.'}
            </p>
          </div>

          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-1.5">
            <h3 className="font-bold text-white text-sm">
              {isAr ? 'كيف يتم تأمين أموال العقد (Escrow)؟' : 'How does Escrow protection work?'}
            </h3>
            <p>
              {isAr
                ? 'يتم حجز كامل قيمة العمل في حساب الضمان المحمي قبل أن يبدأ المهندس. ولا تفرج المنصة عن الدفعة إلا بعد مراجعة العميل واعتماده للمخرجات الهندسية.'
                : 'Project funds are securely locked in the Escrow vault before the engineer starts. Funds are only released after the client reviews and approves deliverables.'}
            </p>
          </div>

          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-1.5">
            <h3 className="font-bold text-white text-sm">
              {isAr ? 'ما هي سرعة استلام المهندس لأرباحه؟' : 'How fast do engineers get paid?'}
            </h3>
            <p>
              {isAr
                ? 'فورية عبر Stripe Connect والعملات الرقمية (USDT)، وخلال 24 ساعة عبر PayPal، و1 إلى 3 أيام عمل عبر الحوالات البنكية الدولية SWIFT.'
                : 'Instant via Stripe Connect & Crypto (USDT), within 24 hours via PayPal, and 1-3 business days via SWIFT wire.'}
            </p>
          </div>

          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-1.5">
            <h3 className="font-bold text-white text-sm">
              {isAr ? 'هل تتوفر فواتير ضريبية رسمية للمؤسسات؟' : 'Are official corporate invoices provided?'}
            </h3>
            <p>
              {isAr
                ? 'نعم، يتم إصدار فاتورة ضريبية رسمية معتمدة لكل صفقة تشتمل على تفاصيل العقد ومراحله وبيانات الاعتماد المؤسسي ورقم التسجيل التجاري.'
                : 'Yes, certified commercial tax invoices with contract milestones and enterprise compliance details are issued automatically.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
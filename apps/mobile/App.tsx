import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

type TabType = 'jobs' | 'contracts' | 'messages' | 'register' | 'profile';

export default function App() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [activeTab, setActiveTab] = useState<TabType>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Client vs Freelancer Registration State (Upwork-Style)
  const [regRole, setRegRole] = useState<'client' | 'freelancer'>('client');
  const [regSuccess, setRegSuccess] = useState(false);
  const [regForm, setRegForm] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    specialty: '',
    hourlyRate: '',
  });

  const isAr = locale === 'ar';

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  // Production-Ready Clean State (No Demo Data)
  const [jobsList, setJobsList] = useState<any[]>([]);
  const [contractsList, setContractsList] = useState<any[]>([]);
  const [messagesList, setMessagesList] = useState<any[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Top Cosmic Header Bar */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.brandRow}>
            <View style={styles.logoContainer}>
              <Image source={require('./assets/icon.png')} style={styles.logoImage} resizeMode="cover" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Satcom Engineers</Text>
              <Text style={styles.headerSubtitle}>
                {isAr ? 'سوق العمل الفضائي المتخصص' : 'Satellite Engineering Network'}
              </Text>
            </View>
          </View>

          {/* Language Toggle */}
          <TouchableOpacity activeOpacity={0.8} onPress={toggleLanguage} style={styles.langBtn}>
            <Text style={styles.langBtnText}>{isAr ? '🌐 English' : '🌐 العربية'}</Text>
          </TouchableOpacity>
        </View>

        {/* Radiant Escrow & Fee Guarantee Strip */}
        <View style={styles.guaranteeStrip}>
          <Text style={styles.guaranteeText}>
            {isAr 
              ? '⭐ رسم المنصة 50$ فقط • ضمان Escrow 100% • دفع وسحب دولي' 
              : '⭐ Flat $50 Fee • 100% Escrow Protection • Global Payouts'}
          </Text>
        </View>
      </View>

      {/* Main Tab Content View */}
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* TAB 1: JOBS FEED */}
        {activeTab === 'jobs' && (
          <View style={styles.tabContent}>
            {/* Search Box */}
            <View style={styles.searchBox}>
              <TextInput
                placeholder={isAr ? 'ابحث عن مشاريع (CST, Ka-Band, SDR)...' : 'Search jobs (CST, Ka-Band, SDR)...'}
                placeholderTextColor="#94a3b8"
                style={[styles.searchInput, { textAlign: isAr ? 'right' : 'left' }]}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Specialty Pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsRow}>
              {['all', 'Ka-Band', 'CST Studio', 'Link Budget', 'SDR'].map((pill) => (
                <TouchableOpacity
                  key={pill}
                  onPress={() => setActiveFilter(pill)}
                  style={[styles.pill, activeFilter === pill && styles.pillActive]}
                >
                  <Text style={[styles.pillText, activeFilter === pill && styles.pillTextActive]}>
                    {pill === 'all' ? (isAr ? 'كافة المشاريع' : 'All Jobs') : pill}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Jobs List */}
            <View style={styles.jobsList}>
              {jobsList.length === 0 ? (
                <View style={styles.emptyStateBox}>
                  <Text style={styles.emptyStateIcon}>🛰️</Text>
                  <Text style={styles.emptyStateTitle}>
                    {isAr ? 'لا توجد مشاريع منشورة حالياً' : 'No Open Projects Yet'}
                  </Text>
                  <Text style={styles.emptyStateSub}>
                    {isAr
                      ? 'كن أول من ينشر مشروعاً فضائياً أو هندسياً لاستقطاب نخبة المهندسين المعتمدين.'
                      : 'Be the first client to publish an aerospace or RF project to hire top engineers.'}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setActiveTab('register')}
                    style={styles.emptyActionBtn}
                  >
                    <Text style={styles.emptyActionBtnText}>
                      {isAr ? 'نشر مشروع / تسجيل جديد' : 'Post Project / Register'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                jobsList.map((job) => (
                  <View key={job.id} style={styles.jobCard}>
                    <View style={styles.jobTopRow}>
                      <View style={styles.bandBadge}>
                        <Text style={styles.bandBadgeText}>{job.band}</Text>
                      </View>
                      <Text style={styles.jobBudget}>{job.budget}</Text>
                    </View>

                    <Text style={[styles.jobTitle, { textAlign: isAr ? 'right' : 'left' }]}>
                      {isAr ? job.titleAr : job.titleEn}
                    </Text>

                    <Text style={[styles.jobDesc, { textAlign: isAr ? 'right' : 'left' }]}>
                      {isAr ? job.descAr : job.descEn}
                    </Text>

                    {/* Skills tags */}
                    <View style={styles.skillsRow}>
                      {job.skills.map((skill: string) => (
                        <View key={skill} style={styles.skillBadge}>
                          <Text style={styles.skillBadgeText}>{skill}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.jobFooter}>
                      <Text style={styles.jobClient}>
                        {isAr ? job.clientAr : job.clientEn}
                      </Text>

                      <TouchableOpacity activeOpacity={0.8} style={styles.applyBtn}>
                        <Text style={styles.applyBtnText}>
                          {isAr ? 'تقديم عرض' : 'Apply'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
        )}

        {/* TAB 2: CONTRACTS & ESCROW */}
        {activeTab === 'contracts' && (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionHeading, { textAlign: isAr ? 'right' : 'left' }]}>
              {isAr ? 'عقودي النشطة وحسابات الضمان Escrow' : 'Active Contracts & Escrow Rooms'}
            </Text>

            {contractsList.length === 0 ? (
              <View style={styles.emptyStateBox}>
                <Text style={styles.emptyStateIcon}>📜</Text>
                <Text style={styles.emptyStateTitle}>
                  {isAr ? 'لا توجد عقود نشطة حالياً' : 'No Active Contracts'}
                </Text>
                <Text style={styles.emptyStateSub}>
                  {isAr
                    ? 'تبدأ العقود وتُحجز مبالغها 100% في Escrow فور قبول عروض المشاريع بين الطرفين.'
                    : 'Contracts are created and funded 100% in Escrow upon proposal acceptance.'}
                </Text>
              </View>
            ) : (
              contractsList.map((ctr) => (
                <View key={ctr.id} style={styles.contractCard}>
                  <View style={styles.contractHeader}>
                    <Text style={styles.contractId}>{ctr.id}</Text>
                    <Text style={styles.contractAmount}>{ctr.amount}</Text>
                  </View>

                  <Text style={[styles.contractTitle, { textAlign: isAr ? 'right' : 'left' }]}>
                    {isAr ? ctr.titleAr : ctr.titleEn}
                  </Text>

                  <View style={styles.milestoneBox}>
                    <Text style={styles.milestoneLabel}>{isAr ? 'المرحلة الحالية:' : 'Current Milestone:'}</Text>
                    <Text style={styles.milestoneText}>{isAr ? ctr.milestoneAr : ctr.milestoneEn}</Text>
                  </View>

                  <View style={styles.contractStatusRow}>
                    <Text style={styles.contractStatusText}>{isAr ? ctr.statusAr : ctr.statusEn}</Text>
                    <TouchableOpacity style={styles.submitWorkBtn}>
                      <Text style={styles.submitWorkBtnText}>{isAr ? 'تسليم المخرجات' : 'Submit Work'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {/* TAB 3: MESSAGES */}
        {activeTab === 'messages' && (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionHeading, { textAlign: isAr ? 'right' : 'left' }]}>
              {isAr ? 'محادثات العملاء والملفات الهندسية' : 'Client Messages & Workrooms'}
            </Text>

            {messagesList.length === 0 ? (
              <View style={styles.emptyStateBox}>
                <Text style={styles.emptyStateIcon}>💬</Text>
                <Text style={styles.emptyStateTitle}>
                  {isAr ? 'لا توجد محادثات جارية حالياً' : 'No Active Conversations'}
                </Text>
                <Text style={styles.emptyStateSub}>
                  {isAr
                    ? 'ستظهر هنا رسائل النقاش الفني ومشاركة ملفات المحاكاة بمجرد التواصل.'
                    : 'Technical workroom chats and CAD/simulation file exchanges will appear here.'}
                </Text>
              </View>
            ) : (
              messagesList.map((msg) => (
                <TouchableOpacity key={msg.id} style={styles.messageCard} activeOpacity={0.7}>
                  <View style={styles.messageTop}>
                    <Text style={styles.messageSender}>{msg.sender}</Text>
                    <Text style={styles.messageTime}>{isAr ? msg.timeAr : msg.timeEn}</Text>
                  </View>
                  <Text style={[styles.messagePreview, { textAlign: isAr ? 'right' : 'left' }]}>
                    {isAr ? msg.previewAr : msg.previewEn}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {/* TAB 4: PROFILE & EARNINGS & GLOBAL GATEWAYS */}
        {activeTab === 'profile' && (
          <View style={styles.tabContent}>
            {/* Engineer Identity Card */}
            <View style={styles.profileCard}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>SE</Text>
              </View>
              <Text style={styles.profileName}>
                {isAr ? 'الملف الشخصي والمهني' : 'Engineering Profile'}
              </Text>
              <Text style={styles.profileRole}>
                {isAr ? 'مهندس اتصالات فضائية وراديو (Satcom & RF)' : 'Satcom & RF Telecom Architect'}
              </Text>

              {/* Satcom Verified Engineering Badges */}
              <View style={styles.profileBadgesRow}>
                <View style={styles.topRatedBadge}>
                  <Text style={styles.topRatedText}>{isAr ? 'حساب موثق ✓' : 'Verified Member ✓'}</Text>
                </View>
                <View style={styles.jssBadge}>
                  <Text style={styles.jssText}>{isAr ? 'ضمان Escrow 100%' : '100% Escrow Protected'}</Text>
                </View>
              </View>
            </View>

            {/* Earnings & Wallet Card with Attractive Gradient Background */}
            <View style={styles.walletCard}>
              <Text style={styles.walletTitle}>
                {isAr ? 'محفظة الأرباح وضمان Escrow' : 'Wallet & Escrow Balance'}
              </Text>
              <Text style={styles.walletAmount}>$0.00</Text>
              <Text style={styles.walletSub}>
                {isAr 
                  ? 'رصيد المحفظة متاح للسحب فور تحرير دفعات مراحل المشاريع 100%' 
                  : 'Available balance ready for withdrawal upon project milestone release'}
              </Text>

              <TouchableOpacity style={styles.withdrawBtn} activeOpacity={0.85}>
                <Text style={styles.withdrawBtnText}>
                  {isAr ? 'طلب سحب الأرباح' : 'Withdraw Earnings'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Global Gateways Card */}
            <View style={styles.gatewaysCard}>
              <Text style={styles.gatewaysTitle}>
                {isAr ? 'بوابات الدفع والسحب العالمية المعتمدة' : 'Accepted Global Gateways'}
              </Text>
              <View style={styles.gatewaysGrid}>
                <View style={styles.gwBadge}>
                  <Text style={styles.gwBadgeText}>💳 Stripe</Text>
                </View>
                <View style={styles.gwBadge}>
                  <Text style={styles.gwBadgeText}>🅿️ PayPal</Text>
                </View>
                <View style={styles.gwBadge}>
                  <Text style={styles.gwBadgeText}>🏛️ SWIFT Wire</Text>
                </View>
                <View style={styles.gwBadge}>
                  <Text style={styles.gwBadgeText}>🪙 USDT Crypto</Text>
                </View>
              </View>
            </View>

            {/* Escrow Guarantee Explainer */}
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxTitle}>
                {isAr ? 'حماية الضمان المالي 100% Escrow' : '100% Escrow Protection'}
              </Text>
              <Text style={styles.infoBoxText}>
                {isAr
                  ? 'المهندس يستلم أتعابه كاملة 100% بحماية حساب الضمان دون أي استقطاعات نسبية، وتتم المعالجة المالية آلياً في الخلفية بأعلى معايير الأمان.'
                  : 'Engineers receive 100% of proposal earnings backed by Escrow with zero percentage cuts and automated backend settlement.'}
              </Text>
            </View>

            {/* Emadsoft Credit Badge */}
            <View style={styles.creditCard}>
              <View style={styles.creditBadge}>
                <Text style={styles.creditTeamText}>
                  {isAr ? 'تصميم وتطوير Emadsoft' : 'Designed & Developed by Emadsoft'}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* TAB 5: UPWORK-STYLE CLIENT & FREELANCER REGISTRATION */}
        {activeTab === 'register' && (
          <View style={styles.tabContent}>
            <View style={styles.regHeader}>
              <Text style={[styles.regMainTitle, { textAlign: isAr ? 'right' : 'left' }]}>
                {isAr ? 'إنشاء حساب جديد (عميل / مهندس)' : 'Join Satcom Engineers'}
              </Text>
              <Text style={[styles.regSubTitle, { textAlign: isAr ? 'right' : 'left' }]}>
                {isAr 
                  ? 'انضم كصاحب عمل يوظف لمشاريع فضائية أو كمهندس مستقل' 
                  : 'Join as a client hiring space talent or as a freelance engineer'}
              </Text>
            </View>

            {/* Persona Selection Cards */}
            <View style={styles.regCardsCol}>
              {/* Client Card */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => { setRegRole('client'); setRegSuccess(false); }}
                style={[
                  styles.regPersonaCard,
                  regRole === 'client' && styles.regPersonaCardActive
                ]}
              >
                <View style={styles.regCardTop}>
                  <Text style={styles.regCardIcon}>💼</Text>
                  <View style={[styles.regRadio, regRole === 'client' && styles.regRadioActive]}>
                    {regRole === 'client' && <Text style={styles.regRadioDot}>✓</Text>}
                  </View>
                </View>
                <Text style={[styles.regCardTitle, { textAlign: isAr ? 'right' : 'left' }]}>
                  {isAr ? 'أنا عميل / صاحب عمل، أبحث عن مهندسين' : "I'm a client, hiring for a project"}
                </Text>
                <Text style={[styles.regCardDesc, { textAlign: isAr ? 'right' : 'left' }]}>
                  {isAr 
                    ? 'نشر مشاريع الأقمار الصناعية و RF وحماية أموال العقود 100% في Escrow.' 
                    : 'Post satellite jobs, hire vetted engineers, and secure payments via Escrow.'}
                </Text>
              </TouchableOpacity>

              {/* Freelancer Card */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => { setRegRole('freelancer'); setRegSuccess(false); }}
                style={[
                  styles.regPersonaCard,
                  regRole === 'freelancer' && styles.regPersonaCardActiveIndigo
                ]}
              >
                <View style={styles.regCardTop}>
                  <Text style={styles.regCardIcon}>🛰️</Text>
                  <View style={[styles.regRadio, regRole === 'freelancer' && styles.regRadioActiveIndigo]}>
                    {regRole === 'freelancer' && <Text style={styles.regRadioDot}>✓</Text>}
                  </View>
                </View>
                <Text style={[styles.regCardTitle, { textAlign: isAr ? 'right' : 'left' }]}>
                  {isAr ? 'أنا مهندس مستقل، أبحث عن مشاريع' : "I'm a freelancer, looking for work"}
                </Text>
                <Text style={[styles.regCardDesc, { textAlign: isAr ? 'right' : 'left' }]}>
                  {isAr 
                    ? 'التقديم على عقود Satcom & RF واستلام 100% من أتعابك بدون خصم نسبة مئوية.' 
                    : 'Submit proposals to aerospace jobs and receive 100% payout with 0% fee.'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Registration Success Banner */}
            {regSuccess && (
              <View style={styles.regSuccessBox}>
                <Text style={styles.regSuccessText}>
                  {isAr ? '✓ تم إنشاء الحساب بنجاح! تم حفظ البيانات.' : '✓ Account created successfully! Details saved.'}
                </Text>
              </View>
            )}

            {/* Form Fields */}
            <View style={styles.regFormCard}>
              <Text style={[styles.regFormHeading, { textAlign: isAr ? 'right' : 'left' }]}>
                {regRole === 'client' 
                  ? (isAr ? 'بيانات صاحب العمل والمؤسسة' : 'Client & Company Information') 
                  : (isAr ? 'بيانات المهندس المستقل' : 'Engineer Profile Information')}
              </Text>

              {/* Field 1: Name */}
              <Text style={[styles.regInputLabel, { textAlign: isAr ? 'right' : 'left' }]}>
                {regRole === 'client' ? (isAr ? 'اسم المسؤول' : 'Full Name') : (isAr ? 'اسم المهندس واللقب' : 'Full Name & Title')}
              </Text>
              <TextInput
                placeholder={regRole === 'client' ? (isAr ? 'أحمد المنصوري' : 'Ahmed Al-Mansouri') : (isAr ? 'م. طارق الفضلي' : 'Eng. Tariq Al-Fadhli')}
                placeholderTextColor="#64748b"
                value={regForm.name}
                onChangeText={(text) => setRegForm({ ...regForm, name: text })}
                style={[styles.regInput, { textAlign: isAr ? 'right' : 'left' }]}
              />

              {/* Field 2: Company or Specialty */}
              {regRole === 'client' ? (
                <>
                  <Text style={[styles.regInputLabel, { textAlign: isAr ? 'right' : 'left' }]}>
                    {isAr ? 'اسم الشركة أو المؤسسة' : 'Company Name'}
                  </Text>
                  <TextInput
                    placeholder={isAr ? 'شركة مدارات الفضاء المتقدمة' : 'Orbital Space Systems Ltd'}
                    placeholderTextColor="#64748b"
                    value={regForm.company}
                    onChangeText={(text) => setRegForm({ ...regForm, company: text })}
                    style={[styles.regInput, { textAlign: isAr ? 'right' : 'left' }]}
                  />
                </>
              ) : (
                <>
                  <Text style={[styles.regInputLabel, { textAlign: isAr ? 'right' : 'left' }]}>
                    {isAr ? 'التخصص الهندسي الدقيق' : 'Engineering Specialty'}
                  </Text>
                  <TextInput
                    placeholder={isAr ? 'تصميم هوائيات Ka-Band و CST Studio' : 'Ka-Band Antenna Design & CST'}
                    placeholderTextColor="#64748b"
                    value={regForm.specialty}
                    onChangeText={(text) => setRegForm({ ...regForm, specialty: text })}
                    style={[styles.regInput, { textAlign: isAr ? 'right' : 'left' }]}
                  />
                  <Text style={[styles.regInputLabel, { textAlign: isAr ? 'right' : 'left' }]}>
                    {isAr ? 'الأجر المطلوب بالساعة ($/hr)' : 'Hourly Rate ($/hr)'}
                  </Text>
                  <TextInput
                    placeholder="$75"
                    placeholderTextColor="#64748b"
                    keyboardType="numeric"
                    value={regForm.hourlyRate}
                    onChangeText={(text) => setRegForm({ ...regForm, hourlyRate: text })}
                    style={[styles.regInput, { textAlign: isAr ? 'right' : 'left' }]}
                  />
                </>
              )}

              {/* Field 3: Email */}
              <Text style={[styles.regInputLabel, { textAlign: isAr ? 'right' : 'left' }]}>
                {isAr ? 'البريد الإلكتروني' : 'Email Address'}
              </Text>
              <TextInput
                placeholder={regRole === 'client' ? 'contact@spacetech.com' : 'engineer@satcom.com'}
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                autoCapitalize="none"
                value={regForm.email}
                onChangeText={(text) => setRegForm({ ...regForm, email: text })}
                style={[styles.regInput, { textAlign: isAr ? 'right' : 'left' }]}
              />

              {/* Field 4: Password */}
              <Text style={[styles.regInputLabel, { textAlign: isAr ? 'right' : 'left' }]}>
                {isAr ? 'كلمة المرور' : 'Password'}
              </Text>
              <TextInput
                placeholder="••••••••••••"
                placeholderTextColor="#64748b"
                secureTextEntry
                value={regForm.password}
                onChangeText={(text) => setRegForm({ ...regForm, password: text })}
                style={[styles.regInput, { textAlign: isAr ? 'right' : 'left' }]}
              />

              {/* Escrow Badge */}
              <View style={styles.regEscrowBox}>
                <Text style={styles.regEscrowText}>
                  {regRole === 'client'
                    ? (isAr ? '🛡️ حماية Escrow: تجميد مبالغ العقود حتى اعتماد التسليمات بنجاح.' : '🛡️ Escrow Protected: Funds secured until deliverables are verified.')
                    : (isAr ? '🛡️ استلام 100% كامل: بدون أي اقتطاع نسبة مئوية للمهندس.' : '🛡️ 100% Payout: Zero platform percentage cut for engineers.')}
                </Text>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setRegSuccess(true)}
                style={regRole === 'client' ? styles.regSubmitBtnClient : styles.regSubmitBtnFreelancer}
              >
                <Text style={styles.regSubmitBtnText}>
                  {regRole === 'client'
                    ? (isAr ? 'إنشاء حساب العميل والانطلاق 🚀' : 'Create Client Account 🚀')
                    : (isAr ? 'إنشاء حساب المهندس المستقل 🛰️' : 'Create Engineer Profile 🛰️')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

      </ScrollView>

      {/* Satcom Mobile Bottom Tab Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('jobs')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabIcon, activeTab === 'jobs' && styles.tabActiveText]}>🔍</Text>
          <Text style={[styles.tabLabel, activeTab === 'jobs' && styles.tabActiveText]}>
            {isAr ? 'المشاريع' : 'Jobs'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('contracts')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabIcon, activeTab === 'contracts' && styles.tabActiveText]}>📑</Text>
          <Text style={[styles.tabLabel, activeTab === 'contracts' && styles.tabActiveText]}>
            {isAr ? 'عقودي' : 'Contracts'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('register')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabIcon, activeTab === 'register' && styles.tabActiveText]}>✨</Text>
          <Text style={[styles.tabLabel, activeTab === 'register' && styles.tabActiveText]}>
            {isAr ? 'تسجيل جديد' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('messages')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabIcon, activeTab === 'messages' && styles.tabActiveText]}>💬</Text>
          <Text style={[styles.tabLabel, activeTab === 'messages' && styles.tabActiveText]}>
            {isAr ? 'الرسائل' : 'Messages'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('profile')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabIcon, activeTab === 'profile' && styles.tabActiveText]}>👤</Text>
          <Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabActiveText]}>
            {isAr ? 'الملف' : 'Profile'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050814', // Luxury deep space cosmic midnight
  },
  header: {
    backgroundColor: '#070f26', // Deep cosmic header
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(56, 189, 248, 0.35)', // Radiant cyan accent
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoContainer: {
    width: 46,
    height: 46,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#38bdf8',
    backgroundColor: '#070b19',
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
  },
  langBtn: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  langBtnText: {
    color: '#e0f2fe',
    fontSize: 11,
    fontWeight: 'bold',
  },
  guaranteeStrip: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.35)',
  },
  guaranteeText: {
    color: '#6ee7b7',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    paddingBottom: 90,
  },
  tabContent: {
    gap: 14,
  },
  searchBox: {
    backgroundColor: '#0c1630',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    fontSize: 13,
    color: '#f8fafc',
    fontWeight: '600',
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 2,
  },
  pill: {
    backgroundColor: '#0d1838',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  pillActive: {
    backgroundColor: '#0284c7',
    borderColor: '#38bdf8',
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  pillText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  pillTextActive: {
    color: '#ffffff',
    fontWeight: '900',
  },
  jobsList: {
    gap: 12,
  },
  jobCard: {
    backgroundColor: '#0d1733',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.18)',
    gap: 9,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  jobTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bandBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  bandBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  jobBudget: {
    fontSize: 17,
    fontWeight: '900',
    color: '#10b981',
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#f8fafc',
    lineHeight: 20,
  },
  jobDesc: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingVertical: 4,
  },
  skillBadge: {
    backgroundColor: '#122046',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  skillBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#cbd5e1',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.07)',
  },
  jobClient: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  applyBtn: {
    backgroundColor: '#0284c7',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
  },
  applyBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 4,
  },
  contractCard: {
    backgroundColor: '#0d1733',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.18)',
    gap: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  contractHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contractId: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  contractAmount: {
    fontSize: 16,
    fontWeight: '900',
    color: '#10b981',
  },
  contractTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  milestoneBox: {
    backgroundColor: '#070f24',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  milestoneLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: 'bold',
  },
  milestoneText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
    marginTop: 2,
  },
  contractStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contractStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#34d399',
  },
  submitWorkBtn: {
    backgroundColor: '#0284c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  submitWorkBtnText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  messageCard: {
    backgroundColor: '#0d1733',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.18)',
    gap: 6,
  },
  messageTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageSender: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  messageTime: {
    fontSize: 10,
    color: '#94a3b8',
  },
  messagePreview: {
    fontSize: 11,
    color: '#94a3b8',
    lineHeight: 16,
  },
  profileCard: {
    backgroundColor: '#0d1733',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#071129',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#38bdf8',
  },
  profileAvatarText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
  },
  profileName: {
    fontSize: 17,
    fontWeight: '900',
    color: '#ffffff',
  },
  profileRole: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  profileBadgesRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  topRatedBadge: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.4)',
  },
  topRatedText: {
    color: '#fbbf24',
    fontSize: 10,
    fontWeight: 'bold',
  },
  jssBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  jssText: {
    color: '#34d399',
    fontSize: 10,
    fontWeight: 'bold',
  },
  walletCard: {
    backgroundColor: '#091838', // Rich cosmic blue
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  walletTitle: {
    color: '#7dd3fc',
    fontSize: 12,
    fontWeight: 'bold',
  },
  walletAmount: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '900',
  },
  walletSub: {
    color: '#bae6fd',
    fontSize: 11,
    textAlign: 'center',
  },
  withdrawBtn: {
    backgroundColor: '#0284c7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 8,
    shadowColor: '#0284c7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  withdrawBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
  gatewaysCard: {
    backgroundColor: '#0d1733',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.18)',
    gap: 10,
  },
  gatewaysTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#ffffff',
  },
  gatewaysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  gwBadge: {
    backgroundColor: '#070f24',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  gwBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#e2e8f0',
  },
  infoBox: {
    backgroundColor: '#0d1733',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.18)',
    gap: 6,
  },
  infoBoxTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  infoBoxText: {
    fontSize: 11,
    color: '#94a3b8',
    lineHeight: 16,
  },
  creditCard: {
    backgroundColor: '#070d1e',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.22)',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  creditTitle: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '600',
  },
  creditBadge: {
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  creditTeamText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#38bdf8',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#070c1b',
    flexDirection: 'row',
    height: 72,
    borderTopWidth: 1.5,
    borderTopColor: 'rgba(56, 189, 248, 0.25)',
    paddingBottom: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 18,
    color: '#64748b',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
    marginTop: 2,
  },
  tabActiveText: {
    color: '#38bdf8',
    fontWeight: '900',
  },
  // Upwork-Style Registration Styles
  regHeader: {
    marginBottom: 16,
  },
  regMainTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 4,
  },
  regSubTitle: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },
  regCardsCol: {
    gap: 12,
    marginBottom: 16,
  },
  regPersonaCard: {
    backgroundColor: '#0d1733',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.18)',
  },
  regPersonaCardActive: {
    borderColor: '#38bdf8',
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
  },
  regPersonaCardActiveIndigo: {
    borderColor: '#818cf8',
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
  },
  regCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  regCardIcon: {
    fontSize: 28,
  },
  regRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
  },
  regRadioActive: {
    borderColor: '#38bdf8',
    backgroundColor: '#38bdf8',
  },
  regRadioActiveIndigo: {
    borderColor: '#818cf8',
    backgroundColor: '#818cf8',
  },
  regRadioDot: {
    color: '#070c1b',
    fontSize: 13,
    fontWeight: '900',
  },
  regCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  regCardDesc: {
    fontSize: 11,
    color: '#94a3b8',
    lineHeight: 16,
  },
  regSuccessBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: '#10b981',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
  },
  regSuccessText: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  regFormCard: {
    backgroundColor: '#0d1733',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)',
    gap: 10,
  },
  regFormHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#38bdf8',
    marginBottom: 4,
  },
  regInputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#cbd5e1',
    marginTop: 4,
  },
  regInput: {
    backgroundColor: '#070f24',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 12,
  },
  regEscrowBox: {
    backgroundColor: 'rgba(14, 165, 233, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)',
    borderRadius: 12,
    padding: 10,
    marginTop: 6,
  },
  regEscrowText: {
    fontSize: 11,
    color: '#38bdf8',
    lineHeight: 16,
  },
  regSubmitBtnClient: {
    backgroundColor: '#0284c7',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  regSubmitBtnFreelancer: {
    backgroundColor: '#4f46e5',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  regSubmitBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
  emptyStateBox: {
    backgroundColor: '#0c1630',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    marginVertical: 12,
  },
  emptyStateIcon: {
    fontSize: 44,
    marginBottom: 10,
  },
  emptyStateTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyStateSub: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 14,
  },
  emptyActionBtn: {
    backgroundColor: '#0284c7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  emptyActionBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
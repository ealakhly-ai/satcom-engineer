import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput,
  Modal,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

type TabType = 'jobs' | 'contracts' | 'messages' | 'register' | 'profile';

interface Milestone {
  id: string;
  titleAr: string;
  titleEn: string;
  amount: number;
  status: 'pending' | 'completed';
}

interface Contract {
  id: string;
  titleAr: string;
  titleEn: string;
  clientAr: string;
  clientEn: string;
  totalAmount: number;
  milestones: Milestone[];
  statusAr: string;
  statusEn: string;
}

interface ChatMessage {
  id: string;
  sender: 'client' | 'engineer';
  senderNameAr: string;
  senderNameEn: string;
  textAr: string;
  textEn: string;
  time: string;
}

export default function App() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [activeTab, setActiveTab] = useState<TabType>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const isAr = locale === 'ar';

  const defaultLetterAr = 'أنا مهندس اتصالات فضائية وراديو بخبرة 8 سنوات في CST Studio و HFSS، يسعدني تنفيذ محاكاة الهوائي واختبار أنماط الإشعاع وحساب ميزانية الرابط بدقة متناهية.';
  const defaultLetterEn = 'I am a satellite & RF telecom engineer with 8 years experience in CST Studio & HFSS, eager to deliver antenna simulations, radiation patterns, and accurate link budgets.';

  const toggleLanguage = () => {
    setLocale((prev) => {
      const next = prev === 'ar' ? 'en' : 'ar';
      setProposalLetter((cur) => {
        if (cur === defaultLetterAr) return defaultLetterEn;
        if (cur === defaultLetterEn) return defaultLetterAr;
        return cur;
      });
      return next;
    });
  };

  // Wallet State
  const [walletBalance, setWalletBalance] = useState<number>(600);
  const [escrowLocked, setEscrowLocked] = useState<number>(300);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('300');
  const [withdrawChannel, setWithdrawChannel] = useState<'swift' | 'usdt' | 'paypal' | 'stripe'>('usdt');
  const [withdrawDestination, setWithdrawDestination] = useState<string>('TXYZ9876543210SatcomWallet');
  const [withdrawSuccessMsg, setWithdrawSuccessMsg] = useState<string>('');

  // Proposal Submission Modal State
  const [selectedJobForProposal, setSelectedJobForProposal] = useState<any | null>(null);
  const [proposalBid, setProposalBid] = useState<string>('300');
  const [proposalMilestone1, setProposalMilestone1] = useState<string>('150');
  const [proposalMilestone2, setProposalMilestone2] = useState<string>('150');
  const [proposalLetter, setProposalLetter] = useState<string>(
    'أنا مهندس اتصالات فضائية وراديو بخبرة 8 سنوات في CST Studio و HFSS، يسعدني تنفيذ محاكاة الهوائي واختبار أنماط الإشعاع وحساب ميزانية الرابط بدقة متناهية.'
  );
  const [proposalSuccessMsg, setProposalSuccessMsg] = useState<string>('');

  // Satcom Engineering Jobs
  const [jobsList, setJobsList] = useState<any[]>([
    {
      id: 'JOB-SAT-101',
      titleAr: 'محاكاة هوائي Ka-Band Phased Array عبر CST Studio',
      titleEn: 'Ka-Band Phased Array Antenna Simulation (CST Studio)',
      band: 'Ka-Band',
      budget: '$300',
      clientAr: 'شركة مدارات الفضاء المتقدمة (دبي)',
      clientEn: 'Advanced Orbital Space Systems (Dubai)',
      descAr: 'مطلوب مهندس متخصص لتصميم ومحاكاة مصفوفة هوائيات في نطاق Ka-Band 28-30 GHz واستخراج مخططات S-Parameters ونمط الإشعاع 3D Far-Field.',
      descEn: 'Seeking a specialized engineer to design & simulate a 28-30 GHz Ka-Band antenna array, providing S-Parameters and 3D radiation patterns in CST.',
      skills: ['CST Studio', 'Ka-Band', 'Phased Array', 'Far-Field']
    },
    {
      id: 'JOB-SAT-102',
      titleAr: 'حساب ميزانية الرابط Link Budget لكوكبة أقمار LEO',
      titleEn: 'LEO Constellation Link Budget & Rain Attenuation Analysis',
      band: 'Link Budget',
      budget: '$300',
      clientAr: 'المركز الإقليمي لتقنيات الأقمار الصناعية',
      clientEn: 'Regional Center for Satellite Tech',
      descAr: 'إعداد Link Budget كامل مع نمذجة تلاشي الأمطار (Rain Fade ITU-R P.618) ومحاكاة هوامش Eb/N0 لكوكبة أقمار في مدار أرضي منخفض LEO.',
      descEn: 'Prepare full uplink/downlink link budgets with ITU-R P.618 rain attenuation modeling and Eb/N0 margins for LEO constellation.',
      skills: ['Link Budget', 'MATLAB', 'LEO', 'ITU-R', 'Rain Fade']
    },
    {
      id: 'JOB-SAT-103',
      titleAr: 'تصميم مرشح موجي دليلي Waveguide Diplexer لنطاق C-Band',
      titleEn: 'C-Band Waveguide Diplexer & BPF Filter Prototyping',
      band: 'CST Studio',
      budget: '$300',
      clientAr: 'مؤسسة أفق الفضاء للاتصالات',
      clientEn: 'Horizon Space Telecom Corp',
      descAr: 'تصميم مرشح تجويف موجي بنطاق ترددات الاستقبال والإرسال C-Band مع تحقيق عزل أعلى من 60dB وفقد إدخال أقل من 0.3dB.',
      descEn: 'Design a cavity waveguide diplexer for C-Band Tx/Rx with >60dB isolation and <0.3dB insertion loss using CST Microwave Studio.',
      skills: ['C-Band', 'Waveguide', 'BPF Filter', 'RF Microwave']
    }
  ]);

  // Contracts & Milestones State (Escrow)
  const [contractsList, setContractsList] = useState<Contract[]>([
    {
      id: 'CTR-SAT-902',
      titleAr: 'تصميم ومحاكاة هوائي المحطة الأرضية Ka-Band Ground Station',
      titleEn: 'Ka-Band Ground Station Antenna Design & Simulation',
      clientAr: 'د. فارس النعيمي (شركة OrbitSat Aerospace)',
      clientEn: 'Dr. Faris Al-Nuaimi (OrbitSat Aerospace)',
      totalAmount: 300,
      statusAr: 'جاري العمل • مرحلة 2 قيد الاعتماد',
      statusEn: 'In Progress • Milestone 2 Submitted',
      milestones: [
        {
          id: 'M1',
          titleAr: 'المرحلة 1: بناء النموذج في CST واستخراج معايير S11 ($150)',
          titleEn: 'Milestone 1: CST Model Setup & S11 S-Parameters ($150)',
          amount: 150,
          status: 'completed'
        },
        {
          id: 'M2',
          titleAr: 'المرحلة 2: تقرير نمط الإشعاع ثلاثي الأبعاد والربح 3D Gain ($150)',
          titleEn: 'Milestone 2: 3D Radiation Pattern & Far-Field Gain ($150)',
          amount: 150,
          status: 'pending'
        }
      ]
    }
  ]);

  // Messages / Technical Workroom State
  const [messagesList, setMessagesList] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'client',
      senderNameAr: 'د. فارس النعيمي (OrbitSat)',
      senderNameEn: 'Dr. Faris Al-Nuaimi (OrbitSat)',
      textAr: 'مرحباً مهندس، هل قمت بتحديث ملف المحاكاة الخاص بهوائي Ka-Band واستخراج مخططات الـ Far-Field؟',
      textEn: 'Hello engineer, did you update the Ka-Band simulation files and export the 3D Far-Field patterns?',
      time: '10:15 AM'
    },
    {
      id: 'msg-2',
      sender: 'engineer',
      senderNameAr: 'أنا (المهندس المعتمد)',
      senderNameEn: 'Me (Verified Engineer)',
      textAr: 'أهلاً دكتور فارس، نعم تم الانتهاء بنجاح! تم تحقيق كسب 38.5 dBi عند تردد 29.5 GHz ونسبة VSWR أقل من 1.25. لقد رفعت الملفات لاعتماد المرحلة 2.',
      textEn: 'Hello Dr. Faris, yes completed! Achieved 38.5 dBi gain at 29.5 GHz with VSWR < 1.25. I uploaded the .cst bundle for Milestone 2 approval.',
      time: '10:30 AM'
    }
  ]);
  const [chatInputText, setChatInputText] = useState<string>('');

  // Client vs Freelancer Registration State
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

  // Action: Release Milestone Escrow
  const handleReleaseMilestone = (contractId: string, milestoneId: string) => {
    setContractsList((prev) =>
      prev.map((ctr) => {
        if (ctr.id === contractId) {
          const updatedMilestones = ctr.milestones.map((m) => {
            if (m.id === milestoneId && m.status === 'pending') {
              setWalletBalance((curr) => curr + m.amount);
              setEscrowLocked((curr) => Math.max(0, curr - m.amount));
              return { ...m, status: 'completed' as const };
            }
            return m;
          });
          return {
            ...ctr,
            milestones: updatedMilestones,
            statusAr: 'مكتمل بنجاح • تم تحرير كامل الـ Escrow',
            statusEn: 'Completed • 100% Escrow Released'
          };
        }
        return ctr;
      })
    );

    Alert.alert(
      isAr ? 'تم تحرير دفعة المرحلة بنجاح! 🚀' : 'Milestone Escrow Released! 🚀',
      isAr 
        ? 'تم تحرير 150$ من حساب الضمان وإيداعها مباشرة في محفظتك المتاحة للسحب.' 
        : '$150 has been safely released from Escrow into your available wallet balance.'
    );
  };

  // Action: Send Chat Message
  const handleSendMessage = () => {
    if (!chatInputText.trim()) return;

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'engineer',
      senderNameAr: 'أنا (المهندس المعتمد)',
      senderNameEn: 'Me (Verified Engineer)',
      textAr: chatInputText,
      textEn: chatInputText,
      time: isAr ? 'الآن' : 'Just now'
    };

    setMessagesList((prev) => [...prev, newMsg]);
    setChatInputText('');

    // Simulated automated client reply
    setTimeout(() => {
      const clientReply: ChatMessage = {
        id: 'msg-reply-' + Date.now(),
        sender: 'client',
        senderNameAr: 'د. فارس النعيمي (OrbitSat)',
        senderNameEn: 'Dr. Faris Al-Nuaimi (OrbitSat)',
        textAr: 'تم استلام ردك ومخرجات المشروع بنجاح. نقوم حالياً بفحص نتائج المحاكاة في غرفة العمليات لاعتماد تحرير المبلغ من Escrow فوراً.',
        textEn: 'Received your project deliverable updates. We are reviewing the CST simulation curves right now to release the Escrow milestone payout.',
        time: isAr ? 'الآن' : 'Just now'
      };
      setMessagesList((prev) => [...prev, clientReply]);
    }, 1200);
  };

  // Action: Submit Proposal
  const handleSubmitProposal = () => {
    if (!selectedJobForProposal) return;

    const newContract: Contract = {
      id: 'CTR-SAT-' + Math.floor(100 + Math.random() * 900),
      titleAr: selectedJobForProposal.titleAr,
      titleEn: selectedJobForProposal.titleEn,
      clientAr: selectedJobForProposal.clientAr,
      clientEn: selectedJobForProposal.clientEn,
      totalAmount: parseFloat(proposalBid) || 300,
      statusAr: 'عقد نشط حديثاً • تم حجز Escrow بنسبة 100%',
      statusEn: 'Active Contract • 100% Escrow Secured',
      milestones: [
        {
          id: 'M1',
          titleAr: `مرحلة 1: المتطلبات والنمذجة ($${proposalMilestone1})`,
          titleEn: `Milestone 1: Setup & Modeling ($${proposalMilestone1})`,
          amount: parseFloat(proposalMilestone1) || 150,
          status: 'pending'
        },
        {
          id: 'M2',
          titleAr: `مرحلة 2: المحاكاة والتحقق النهائي ($${proposalMilestone2})`,
          titleEn: `Milestone 2: Final Verification & Plots ($${proposalMilestone2})`,
          amount: parseFloat(proposalMilestone2) || 150,
          status: 'pending'
        }
      ]
    };

    setContractsList((prev) => [newContract, ...prev]);
    setProposalSuccessMsg(
      isAr 
        ? 'تم تقديم العرض واعتماد حجز Escrow بنجاح! تم نقل المشروع إلى قائمة عقودك.'
        : 'Proposal submitted! 100% Escrow secured and contract created.'
    );

    setTimeout(() => {
      setSelectedJobForProposal(null);
      setProposalSuccessMsg('');
      setActiveTab('contracts');
    }, 1500);
  };

  // Action: Submit Withdrawal Request
  const handleExecuteWithdrawal = () => {
    const amt = parseFloat(withdrawAmount) || 0;
    if (amt <= 0 || amt > walletBalance) {
      Alert.alert(
        isAr ? 'تنبيه' : 'Alert',
        isAr ? 'المبلغ المدخل غير صالح أو يتجاوز الرصيد المتاح' : 'Invalid amount or exceeds available balance'
      );
      return;
    }

    setWalletBalance((prev) => prev - amt);
    setWithdrawSuccessMsg(
      isAr 
        ? `✓ تم إرسال طلب سحب بقيمة $${amt.toFixed(2)} بنجاح إلى حساب ${withdrawChannel.toUpperCase()}`
        : `✓ Withdrawal request of $${amt.toFixed(2)} sent successfully via ${withdrawChannel.toUpperCase()}`
    );

    setTimeout(() => {
      setShowWithdrawModal(false);
      setWithdrawSuccessMsg('');
    }, 1800);
  };

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
              ? '⭐ رسم المنصة 20$ لكل شريحة 300$ • ضمان Escrow 100% • دفع وسحب دولي' 
              : '⭐ $20 Tier Fee per $300 • 100% Escrow Protected • Global Payouts'}
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
              {['all', 'Ka-Band', 'CST Studio', 'Link Budget', 'C-Band'].map((pill) => (
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
              {jobsList
                .filter((job) => activeFilter === 'all' || job.skills.includes(activeFilter) || job.band === activeFilter)
                .map((job) => (
                  <View key={job.id} style={styles.jobCard}>
                    <View style={styles.jobTopRow}>
                      <View style={styles.bandBadge}>
                        <Text style={styles.bandBadgeText}>{job.band}</Text>
                      </View>
                      <View style={styles.escrowPill}>
                        <Text style={styles.escrowPillText}>{isAr ? 'ضمان Escrow 100%' : '100% Escrow'}</Text>
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

                      <TouchableOpacity 
                        activeOpacity={0.8} 
                        style={styles.applyBtn}
                        onPress={() => setSelectedJobForProposal(job)}
                      >
                        <Text style={styles.applyBtnText}>
                          {isAr ? 'تقديم عرض هندسي' : 'Submit Proposal'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        )}

        {/* TAB 2: CONTRACTS & ESCROW */}
        {activeTab === 'contracts' && (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>
                {isAr ? 'عقودي وغرف الضمان المالي 100% Escrow' : 'Active Contracts & Escrow Rooms'}
              </Text>
              <View style={styles.secureEscrowBadge}>
                <Text style={styles.secureEscrowText}>🛡️ {isAr ? 'أموالك محمية' : 'Funds Secured'}</Text>
              </View>
            </View>

            {contractsList.map((ctr) => (
              <View key={ctr.id} style={styles.contractCard}>
                <View style={styles.contractHeader}>
                  <Text style={styles.contractId}>#{ctr.id}</Text>
                  <Text style={styles.contractAmount}>${ctr.totalAmount.toFixed(2)}</Text>
                </View>

                <Text style={[styles.contractTitle, { textAlign: isAr ? 'right' : 'left' }]}>
                  {isAr ? ctr.titleAr : ctr.titleEn}
                </Text>

                <Text style={[styles.contractClient, { textAlign: isAr ? 'right' : 'left' }]}>
                  👤 {isAr ? ctr.clientAr : ctr.clientEn}
                </Text>

                {/* Milestones Breakdown */}
                <View style={styles.milestonesContainer}>
                  <Text style={[styles.milestoneSectionTitle, { textAlign: isAr ? 'right' : 'left' }]}>
                    {isAr ? 'مراحل المشروع والدفعات المالية:' : 'Project Milestones & Deliverables:'}
                  </Text>
                  {ctr.milestones.map((m, idx) => (
                    <View key={m.id} style={styles.milestoneRowCard}>
                      <View style={styles.milestoneInfo}>
                        <Text style={[styles.milestoneIndex, { textAlign: isAr ? 'right' : 'left' }]}>
                          {isAr ? `المرحلة ${idx + 1}` : `Milestone ${idx + 1}`}
                        </Text>
                        <Text style={[styles.milestoneTitleText, { textAlign: isAr ? 'right' : 'left' }]}>
                          {isAr ? m.titleAr : m.titleEn}
                        </Text>
                      </View>
                      
                      <View style={styles.milestoneActions}>
                        {m.status === 'completed' ? (
                          <View style={styles.releasedPill}>
                            <Text style={styles.releasedPillText}>✓ {isAr ? 'تم التحرير للمحفظة' : 'Released'}</Text>
                          </View>
                        ) : (
                          <TouchableOpacity
                            style={styles.releaseEscrowBtn}
                            onPress={() => handleReleaseMilestone(ctr.id, m.id)}
                          >
                            <Text style={styles.releaseEscrowBtnText}>
                              {isAr ? `تحرير $${m.amount} Escrow` : `Release $${m.amount}`}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.contractFooterRow}>
                  <Text style={styles.contractStatusText}>
                    {isAr ? ctr.statusAr : ctr.statusEn}
                  </Text>
                  <TouchableOpacity 
                    style={styles.openWorkroomBtn}
                    onPress={() => setActiveTab('messages')}
                  >
                    <Text style={styles.openWorkroomBtnText}>
                      💬 {isAr ? 'غرفة المحادثة الهندسية' : 'Workroom Chat'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* TAB 3: MESSAGES / WORKROOM */}
        {activeTab === 'messages' && (
          <View style={styles.tabContent}>
            <View style={styles.chatRoomHeader}>
              <View>
                <Text style={styles.chatClientName}>
                  {isAr ? 'د. فارس النعيمي (OrbitSat Aerospace)' : 'Dr. Faris Al-Nuaimi (OrbitSat)'}
                </Text>
                <Text style={styles.chatContractRef}>
                  {isAr ? 'العقد #CTR-SAT-902 • هوائي Ka-Band ($300 Escrow)' : 'Contract #CTR-SAT-902 • Ka-Band Antenna ($300 Escrow)'}
                </Text>
              </View>
              <View style={styles.onlineBadge}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>{isAr ? 'نشط الآن' : 'Active'}</Text>
              </View>
            </View>

            {/* Chat Thread */}
            <View style={styles.chatThreadBox}>
              {messagesList.map((msg) => (
                <View 
                  key={msg.id} 
                  style={[
                    styles.chatBubble,
                    msg.sender === 'engineer' ? styles.chatBubbleEngineer : styles.chatBubbleClient
                  ]}
                >
                  <View style={styles.bubbleTop}>
                    <Text style={styles.bubbleSender}>
                      {isAr ? msg.senderNameAr : msg.senderNameEn}
                    </Text>
                    <Text style={styles.bubbleTime}>{msg.time}</Text>
                  </View>
                  <Text style={[styles.bubbleContent, { textAlign: isAr ? 'right' : 'left' }]}>
                    {isAr ? msg.textAr : msg.textEn}
                  </Text>
                </View>
              ))}
            </View>

            {/* Interactive Chat Input */}
            <View style={styles.chatInputContainer}>
              <TouchableOpacity style={styles.attachBtn} activeOpacity={0.7}>
                <Text style={styles.attachBtnIcon}>📎</Text>
              </TouchableOpacity>

              <TextInput
                placeholder={isAr ? 'اكتب رسالة فنية أو أرسل استفساراً...' : 'Type engineering message or update...'}
                placeholderTextColor="#64748b"
                style={[styles.chatTextInput, { textAlign: isAr ? 'right' : 'left' }]}
                value={chatInputText}
                onChangeText={setChatInputText}
              />

              <TouchableOpacity 
                style={styles.sendChatBtn} 
                onPress={handleSendMessage}
                activeOpacity={0.8}
              >
                <Text style={styles.sendChatBtnText}>{isAr ? 'إرسال ➤' : 'Send ➤'}</Text>
              </TouchableOpacity>
            </View>
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
                {isAr ? 'م. عماد الفضلي (Satcom Architect)' : 'Eng. Emad Al-Fadhli (Satcom Architect)'}
              </Text>
              <Text style={styles.profileRole}>
                {isAr ? 'مهندس اتصالات فضائية وراديو (Satcom & RF)' : 'Satcom & RF Telecom Architect'}
              </Text>

              {/* Satcom Verified Engineering Badges */}
              <View style={styles.profileBadgesRow}>
                <View style={styles.topRatedBadge}>
                  <Text style={styles.topRatedText}>⭐ {isAr ? 'Top Rated أعلى تقييم' : 'Top Rated'}</Text>
                </View>
                <View style={styles.jssBadge}>
                  <Text style={styles.jssText}>✓ {isAr ? 'موثق الهوية والترخيص' : 'KYC Verified'}</Text>
                </View>
                <View style={styles.escrowProofBadge}>
                  <Text style={styles.escrowProofText}>🛡️ {isAr ? 'ضمان Escrow 100%' : '100% Escrow'}</Text>
                </View>
              </View>
            </View>

            {/* Earnings & Wallet Card with Attractive Cosmic Gradient */}
            <View style={styles.walletCard}>
              <Text style={styles.walletTitle}>
                {isAr ? 'الرصيد المتاح للسحب في المحفظة' : 'Available Wallet Balance'}
              </Text>
              <Text style={styles.walletAmount}>${walletBalance.toFixed(2)}</Text>

              <View style={styles.walletStatsRow}>
                <View style={styles.walletStatItem}>
                  <Text style={styles.statLabel}>{isAr ? 'محجوز في Escrow:' : 'In Escrow Protection:'}</Text>
                  <Text style={styles.statValue}>${escrowLocked.toFixed(2)}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.walletStatItem}>
                  <Text style={styles.statLabel}>{isAr ? 'إجمالي الأرباح:' : 'Total Earned:'}</Text>
                  <Text style={styles.statValue}>${(walletBalance + 600).toFixed(2)}</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.withdrawBtn} 
                activeOpacity={0.85}
                onPress={() => setShowWithdrawModal(true)}
              >
                <Text style={styles.withdrawBtnText}>
                  💳 {isAr ? 'طلب سحب الأرباح الآن' : 'Withdraw Earnings Now'}
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
                  <Text style={styles.gwBadgeText}>🪙 USDT (TRC20)</Text>
                </View>
              </View>
            </View>

            {/* Escrow Guarantee Explainer */}
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxTitle}>
                🛡️ {isAr ? 'حماية الضمان المالي 100% Escrow' : '100% Escrow Protection'}
              </Text>
              <Text style={styles.infoBoxText}>
                {isAr
                  ? 'يستلم المهندس 100% من قيمة العرض دون اقتطاع أي نسبة مئوية، وتُدفع رسوم المنصة الشفافة ($20 لكل شريحة $300) آلياً في الخلفية مع ضمان كامل للطرفين.'
                  : 'Engineers receive 100% of proposal bid with zero percent cut. The flat transparent fee ($20 per $300 tier) is handled automatically.'}
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

        {/* TAB 5: SATCOM CLIENT & FREELANCER REGISTRATION */}
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

      {/* MODAL 1: SATCOM PROPOSAL SUBMISSION */}
      <Modal
        visible={selectedJobForProposal !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedJobForProposal(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isAr ? 'تقديم عرض هندسي' : 'Submit Proposal'}
              </Text>
              <TouchableOpacity onPress={() => setSelectedJobForProposal(null)}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll}>
              {selectedJobForProposal && (
                <>
                  <Text style={[styles.proposalJobTitle, { textAlign: isAr ? 'right' : 'left' }]}>
                    {isAr ? selectedJobForProposal.titleAr : selectedJobForProposal.titleEn}
                  </Text>
                  <Text style={[styles.proposalClientName, { textAlign: isAr ? 'right' : 'left' }]}>
                    👤 {isAr ? selectedJobForProposal.clientAr : selectedJobForProposal.clientEn}
                  </Text>

                  {/* Pricing & Escrow Breakdown */}
                  <View style={styles.termsBox}>
                    <Text style={[styles.termsBoxTitle, { textAlign: isAr ? 'right' : 'left' }]}>
                      {isAr ? 'بنود التعاقد وحساب الضمان Escrow' : 'Contract Terms & Escrow Breakdown'}
                    </Text>

                    <View style={styles.termRow}>
                      <Text style={styles.termLabel}>{isAr ? 'قيمة العقد الإجمالية:' : 'Total Proposal Bid:'}</Text>
                      <TextInput
                        value={proposalBid}
                        onChangeText={setProposalBid}
                        keyboardType="numeric"
                        style={styles.termInput}
                      />
                    </View>

                    <View style={styles.termRow}>
                      <Text style={styles.termLabel}>{isAr ? 'المرحلة 1 ($):' : 'Milestone 1 ($):'}</Text>
                      <TextInput
                        value={proposalMilestone1}
                        onChangeText={setProposalMilestone1}
                        keyboardType="numeric"
                        style={styles.termInput}
                      />
                    </View>

                    <View style={styles.termRow}>
                      <Text style={styles.termLabel}>{isAr ? 'المرحلة 2 ($):' : 'Milestone 2 ($):'}</Text>
                      <TextInput
                        value={proposalMilestone2}
                        onChangeText={setProposalMilestone2}
                        keyboardType="numeric"
                        style={styles.termInput}
                      />
                    </View>

                    <View style={styles.netPayoutCard}>
                      <Text style={styles.netPayoutLabel}>
                        {isAr ? 'صافي مستحقاتك كمهندس (100% بدون خصم):' : 'Your Net Payout (100% 0% Cut):'}
                      </Text>
                      <Text style={styles.netPayoutValue}>${proposalBid}.00</Text>
                      <Text style={styles.netPayoutSub}>
                        {isAr ? '⭐ رسم المنصة 20$ يُدفع آلياً في الخلفية' : '⭐ Flat $20 platform fee processed automatically'}
                      </Text>
                    </View>
                  </View>

                  {/* Cover Letter */}
                  <Text style={[styles.inputHeading, { textAlign: isAr ? 'right' : 'left' }]}>
                    {isAr ? 'رسالة العرض (Cover Letter):' : 'Cover Letter:'}
                  </Text>
                  <TextInput
                    multiline
                    numberOfLines={4}
                    value={proposalLetter}
                    onChangeText={setProposalLetter}
                    style={[styles.coverLetterInput, { textAlign: isAr ? 'right' : 'left' }]}
                  />

                  {proposalSuccessMsg ? (
                    <View style={styles.proposalSuccessBox}>
                      <Text style={styles.proposalSuccessText}>{proposalSuccessMsg}</Text>
                    </View>
                  ) : null}

                  <TouchableOpacity
                    style={styles.confirmProposalBtn}
                    onPress={handleSubmitProposal}
                  >
                    <Text style={styles.confirmProposalBtnText}>
                      {isAr ? 'تأكيد وحجز العقد في Escrow 🚀' : 'Confirm & Secure in Escrow 🚀'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL 2: WITHDRAWAL REQUEST */}
      <Modal
        visible={showWithdrawModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowWithdrawModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isAr ? 'طلب سحب الأرباح' : 'Withdraw Earnings'}
              </Text>
              <TouchableOpacity onPress={() => setShowWithdrawModal(false)}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll}>
              <View style={styles.availableBalanceBox}>
                <Text style={styles.availLabel}>{isAr ? 'الرصيد المتاح للسحب:' : 'Available to Withdraw:'}</Text>
                <Text style={styles.availAmount}>${walletBalance.toFixed(2)}</Text>
              </View>

              {/* Channel Selector */}
              <Text style={[styles.inputHeading, { textAlign: isAr ? 'right' : 'left' }]}>
                {isAr ? 'اختر قناة السحب المعتمدة:' : 'Select Payout Channel:'}
              </Text>
              <View style={styles.channelRow}>
                {(['usdt', 'swift', 'paypal', 'stripe'] as const).map((ch) => (
                  <TouchableOpacity
                    key={ch}
                    style={[styles.channelBtn, withdrawChannel === ch && styles.channelBtnActive]}
                    onPress={() => setWithdrawChannel(ch)}
                  >
                    <Text style={[styles.channelBtnText, withdrawChannel === ch && styles.channelBtnTextActive]}>
                      {ch === 'usdt' ? '🪙 USDT' : ch === 'swift' ? '🏛️ SWIFT' : ch === 'paypal' ? '🅿️ PayPal' : '💳 Stripe'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Amount */}
              <Text style={[styles.inputHeading, { textAlign: isAr ? 'right' : 'left' }]}>
                {isAr ? 'مبلغ السحب ($):' : 'Withdrawal Amount ($):'}
              </Text>
              <TextInput
                value={withdrawAmount}
                onChangeText={setWithdrawAmount}
                keyboardType="numeric"
                style={styles.termInputWide}
              />

              {/* Destination */}
              <Text style={[styles.inputHeading, { textAlign: isAr ? 'right' : 'left' }]}>
                {isAr ? 'عنوان المحفظة أو رقم الحساب البنكي:' : 'Wallet Address or Bank IBAN:'}
              </Text>
              <TextInput
                value={withdrawDestination}
                onChangeText={setWithdrawDestination}
                style={styles.termInputWide}
              />

              {withdrawSuccessMsg ? (
                <View style={styles.proposalSuccessBox}>
                  <Text style={styles.proposalSuccessText}>{withdrawSuccessMsg}</Text>
                </View>
              ) : null}

              <TouchableOpacity
                style={styles.confirmProposalBtn}
                onPress={handleExecuteWithdrawal}
              >
                <Text style={styles.confirmProposalBtnText}>
                  {isAr ? 'تأكيد السحب الفوري 💳' : 'Confirm Immediate Payout 💳'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#050814',
  },
  header: {
    backgroundColor: '#070f26',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(56, 189, 248, 0.35)',
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
  escrowPill: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  escrowPillText: {
    color: '#34d399',
    fontSize: 9,
    fontWeight: 'bold',
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
    flex: 1,
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '900',
    color: '#ffffff',
  },
  secureEscrowBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  secureEscrowText: {
    color: '#34d399',
    fontSize: 10,
    fontWeight: 'bold',
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
    fontSize: 18,
    fontWeight: '900',
    color: '#10b981',
  },
  contractTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  contractClient: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },
  milestonesContainer: {
    backgroundColor: '#070f24',
    borderRadius: 14,
    padding: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  milestoneSectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  milestoneRowCard: {
    backgroundColor: '#0c1630',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.15)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneIndex: {
    fontSize: 9,
    color: '#64748b',
    fontWeight: 'bold',
  },
  milestoneTitleText: {
    fontSize: 11,
    color: '#e2e8f0',
    fontWeight: '700',
    marginTop: 2,
  },
  milestoneActions: {
    alignItems: 'flex-end',
  },
  releasedPill: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  releasedPillText: {
    color: '#34d399',
    fontSize: 9,
    fontWeight: 'bold',
  },
  releaseEscrowBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  releaseEscrowBtnText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  contractFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  contractStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#38bdf8',
    flex: 1,
  },
  openWorkroomBtn: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  openWorkroomBtnText: {
    color: '#38bdf8',
    fontSize: 10,
    fontWeight: 'bold',
  },
  chatRoomHeader: {
    backgroundColor: '#0d1733',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)',
  },
  chatClientName: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  chatContractRef: {
    color: '#38bdf8',
    fontSize: 10,
    marginTop: 2,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  onlineText: {
    color: '#10b981',
    fontSize: 10,
    fontWeight: 'bold',
  },
  chatThreadBox: {
    gap: 10,
    marginVertical: 4,
  },
  chatBubble: {
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    maxWidth: '90%',
  },
  chatBubbleClient: {
    backgroundColor: '#0c1630',
    borderColor: 'rgba(56, 189, 248, 0.25)',
    alignSelf: 'flex-start',
  },
  chatBubbleEngineer: {
    backgroundColor: '#03346e',
    borderColor: 'rgba(56, 189, 248, 0.5)',
    alignSelf: 'flex-end',
  },
  bubbleTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 4,
  },
  bubbleSender: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#7dd3fc',
  },
  bubbleTime: {
    fontSize: 9,
    color: '#94a3b8',
  },
  bubbleContent: {
    fontSize: 12,
    color: '#ffffff',
    lineHeight: 18,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0c1630',
    borderRadius: 16,
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  attachBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  attachBtnIcon: {
    fontSize: 18,
  },
  chatTextInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 12,
    paddingVertical: 6,
  },
  sendChatBtn: {
    backgroundColor: '#0284c7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  sendChatBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
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
    fontSize: 16,
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
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
  },
  topRatedBadge: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  jssText: {
    color: '#34d399',
    fontSize: 10,
    fontWeight: 'bold',
  },
  escrowProofBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  escrowProofText: {
    color: '#38bdf8',
    fontSize: 10,
    fontWeight: 'bold',
  },
  walletCard: {
    backgroundColor: '#091838',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    gap: 8,
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
    fontSize: 32,
    fontWeight: '900',
  },
  walletStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#050f24',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  walletStatItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 9,
    fontWeight: 'bold',
  },
  statValue: {
    color: '#34d399',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  withdrawBtn: {
    backgroundColor: '#0284c7',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 4,
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
  // Modals Styling
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#0c1630',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#38bdf8',
    maxHeight: '85%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(56, 189, 248, 0.2)',
    backgroundColor: '#070f26',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalCloseText: {
    color: '#94a3b8',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 4,
  },
  modalScroll: {
    padding: 16,
    gap: 12,
  },
  proposalJobTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  proposalClientName: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '600',
  },
  termsBox: {
    backgroundColor: '#070f24',
    borderRadius: 16,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)',
  },
  termsBoxTitle: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  termRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  termLabel: {
    color: '#cbd5e1',
    fontSize: 11,
    fontWeight: '600',
  },
  termInput: {
    backgroundColor: '#0c1630',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    width: 90,
    textAlign: 'center',
  },
  termInputWide: {
    backgroundColor: '#070f24',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#ffffff',
    fontSize: 12,
  },
  netPayoutCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: '#10b981',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  netPayoutLabel: {
    color: '#a7f3d0',
    fontSize: 10,
    fontWeight: 'bold',
  },
  netPayoutValue: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 2,
  },
  netPayoutSub: {
    color: '#6ee7b7',
    fontSize: 9,
    marginTop: 2,
  },
  inputHeading: {
    color: '#cbd5e1',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 4,
  },
  coverLetterInput: {
    backgroundColor: '#070f24',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    padding: 10,
    color: '#ffffff',
    fontSize: 11,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  confirmProposalBtn: {
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmProposalBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  proposalSuccessBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  proposalSuccessText: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  availableBalanceBox: {
    backgroundColor: '#070f24',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  availLabel: {
    color: '#7dd3fc',
    fontSize: 11,
    fontWeight: 'bold',
  },
  availAmount: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 4,
  },
  channelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  channelBtn: {
    backgroundColor: '#070f24',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  channelBtnActive: {
    backgroundColor: '#0284c7',
    borderColor: '#38bdf8',
  },
  channelBtnText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: 'bold',
  },
  channelBtnTextActive: {
    color: '#ffffff',
  },
});

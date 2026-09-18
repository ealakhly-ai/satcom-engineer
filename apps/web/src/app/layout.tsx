import './globals.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { LanguageProvider } from '../context/LanguageContext';

export const metadata = {
  title: 'Satcom Engineers | منصة العمل الحر لهندسة الاتصالات والأنظمة الفضائية',
  description: 'المنصة العالمية الرائدة لربط مهندسي الاتصالات والأقمار الصناعية بالمشاريع والشركات الاحترافية بنظام الضمان المالي 100% Escrow وبوابات دفع معتمدة.',
  authors: [{ name: 'تصميم وتطوير Emadsoft' }],
  creator: 'تصميم وتطوير Emadsoft',
  publisher: 'Satcom Engineers Platform',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="min-h-screen flex flex-col bg-[#050811] text-slate-100 selection:bg-cyan-500 selection:text-white">
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
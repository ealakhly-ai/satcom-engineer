import './globals.css';
import { AdminLanguageProvider } from '../context/AdminLanguageContext';
import { AdminAuthGuard } from '../components/AdminAuthGuard';

export const metadata = {
  title: 'Satcom Engineers | لوحة تحكم الإدارة العليا (Mission Control)',
  description: 'غرفة العمليات والإدارة المركزية لمنصة Satcom Engineers الدولية.',
  authors: [{ name: 'تصميم وتطوير Emadsoft' }],
  creator: 'تصميم وتطوير Emadsoft',
  publisher: 'Satcom Engineers Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="min-h-screen bg-[#050811] text-slate-100 selection:bg-cyan-500 selection:text-white">
        <AdminLanguageProvider>
          <AdminAuthGuard>{children}</AdminAuthGuard>
        </AdminLanguageProvider>
      </body>
    </html>
  );
}

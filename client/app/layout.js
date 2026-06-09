import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'AI Builders Africa — Build. Connect. Scale.',
    template: '%s | AI Builders Africa',
  },
  description: 'The premier community for AI engineers, founders, and innovators across Africa.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

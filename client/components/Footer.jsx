import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-surface mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 font-bold text-white mb-3">
              <span className="text-xl">🌍</span>
              <span>AI Builders Africa</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The premier community for AI engineers, founders, and innovators
              building Africa's tech future.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
                <li><Link href="/members" className="hover:text-gray-300 transition-colors">Members</Link></li>
                <li><Link href="/projects" className="hover:text-gray-300 transition-colors">Projects</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-300 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Twitter / X</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-brand-border text-center text-xs text-gray-600">
          © {new Date().getFullYear()} AI Builders Africa. Built with ❤️ across the continent.
        </div>
      </div>
    </footer>
  );
}

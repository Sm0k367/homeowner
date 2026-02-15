import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HG</span>
              </div>
              <span className="text-lg font-bold text-white">HomeGuard Pro</span>
            </div>
            <p className="text-sm">AI-powered home maintenance for post-warranty homeowners. Protect your biggest investment.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Product</h4>
            <div className="space-y-2 text-sm">
              <Link href="/maintenance" className="block hover:text-white">Maintenance</Link>
              <Link href="/emergency" className="block hover:text-white">Emergency Guide</Link>
              <Link href="/warranties" className="block hover:text-white">Warranties</Link>
              <Link href="/costs" className="block hover:text-white">Cost Optimizer</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <div className="space-y-2 text-sm">
              <Link href="/pricing" className="block hover:text-white">Pricing</Link>
              <a href="#" className="block hover:text-white">About</a>
              <a href="#" className="block hover:text-white">Blog</a>
              <a href="#" className="block hover:text-white">Careers</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-white">Help Center</a>
              <a href="#" className="block hover:text-white">Contact Us</a>
              <a href="#" className="block hover:text-white">Privacy Policy</a>
              <a href="#" className="block hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 HomeGuard Pro by Epic Tech AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

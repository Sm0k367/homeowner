import Link from 'next/link';
import { useRouter } from 'next/router';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/maintenance', label: 'Maintenance', icon: '🔧' },
  { href: '/emergency', label: 'Emergency Guide', icon: '🚨' },
  { href: '/warranties', label: 'Warranties', icon: '📋' },
  { href: '/costs', label: 'Cost Optimizer', icon: '💰' },
  { href: '/contractors', label: 'Contractors', icon: '👷' },
  { href: '/pricing', label: 'Upgrade Plan', icon: '⭐' },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-gray-900 min-h-screen fixed left-0 top-0 pt-4 hidden lg:block z-40">
      <Link href="/" className="flex items-center gap-2 px-6 py-4 mb-4">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">HG</span>
        </div>
        <span className="text-lg font-bold text-white">HomeGuard <span className="text-blue-400">Pro</span></span>
      </Link>

      <nav className="px-3 space-y-1">
        {links.map(link => (
          <Link key={link.href} href={link.href}
            className={router.pathname === link.href ? 'sidebar-link-active' : 'sidebar-link'}>
            <span className="text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-xs mb-2">Need help?</p>
          <p className="text-white text-sm font-medium">support@homeguard.pro</p>
        </div>
      </div>
    </aside>
  );
}

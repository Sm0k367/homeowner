import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('hg_user');
    if (u) setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    localStorage.removeItem('hg_user');
    router.push('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HG</span>
            </div>
            <span className="text-xl font-bold text-gray-900">HomeGuard <span className="text-blue-600">Pro</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {!user ? (
              <>
                <Link href="/#features" className="text-gray-600 hover:text-blue-600 font-medium">Features</Link>
                <Link href="/pricing" className="text-gray-600 hover:text-blue-600 font-medium">Pricing</Link>
                <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Log In</Link>
                <Link href="/signup" className="btn-cta text-sm !py-2 !px-5">Get Started Free</Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
                <div className="relative">
                  <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">{user.email?.[0]?.toUpperCase()}</span>
                    </div>
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2">
                      <p className="px-4 py-2 text-sm text-gray-500">{user.email}</p>
                      <hr />
                      <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Log Out</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          {!user ? (
            <>
              <Link href="/pricing" className="block text-gray-600">Pricing</Link>
              <Link href="/login" className="block text-gray-600">Log In</Link>
              <Link href="/signup" className="block btn-cta text-center text-sm">Get Started</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="block text-gray-600">Dashboard</Link>
              <button onClick={logout} className="block text-red-600">Log Out</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

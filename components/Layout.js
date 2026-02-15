import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useRouter } from 'next/router';

const authPages = ['/dashboard', '/maintenance', '/emergency', '/warranties', '/costs', '/contractors'];

export default function Layout({ children }) {
  const router = useRouter();
  const hasSidebar = authPages.includes(router.pathname);

  if (hasSidebar) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="lg:ml-64">
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
            <h1 className="text-xl font-bold text-gray-900 capitalize">{router.pathname.slice(1) || 'Dashboard'}</h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

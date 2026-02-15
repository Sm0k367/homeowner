import Link from 'next/link';
import SEO from '../components/SEO';

export default function Custom404() {
  return (
    <>
      <SEO
        title="Page Not Found | HomeGuard Pro"
        description="The page you're looking for doesn't exist."
        path="/404"
      />
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-6">🏚️</div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Looks like this page has moved out. Let&apos;s get you back home.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

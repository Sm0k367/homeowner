import Link from 'next/link';
import Head from 'next/head';
import FeatureCard from '../components/FeatureCard';
import PricingCard from '../components/PricingCard';
import SEO from '../components/SEO';
import { useRouter } from 'next/router';

const features = [
  { icon: '🔧', title: 'Smart Maintenance', description: 'AI-generated maintenance schedules tailored to your home systems, age, and climate. Never miss a critical task again.' },
  { icon: '🚨', title: 'Emergency Guide', description: 'Instant step-by-step guidance for any home emergency. Know exactly what to do when disaster strikes.' },
  { icon: '📋', title: 'Warranty Tracker', description: 'Track all your warranties in one place. Get alerts before they expire so you never miss a claim.' },
  { icon: '💰', title: 'Cost Optimizer', description: 'Compare DIY vs professional costs. Get money-saving tips and track your home maintenance budget.' },
  { icon: '👷', title: 'Contractor Finder', description: 'Find vetted, top-rated contractors in your area. Read reviews, compare prices, and request quotes.' },
  { icon: '📊', title: 'Home Dashboard', description: 'Everything about your home in one place. Systems, maintenance history, spending, and upcoming tasks.' },
];

const testimonials = [
  { name: 'Sarah M.', role: 'Homeowner, Austin TX', text: "HomeGuard Pro saved me $3,000 by alerting me to an HVAC issue before it became a full replacement. The maintenance scheduler is a game-changer.", rating: 5 },
  { name: 'James K.', role: 'First-time Homeowner, Denver CO', text: "As a new homeowner, I had no idea what maintenance to do. HomeGuard Pro gave me a complete schedule the day I signed up. Incredible value.", rating: 5 },
  { name: 'Maria L.', role: 'Homeowner, Tampa FL', text: "The emergency guide walked me through a burst pipe at 2am. I knew exactly what to do. This app has paid for itself 10x over.", rating: 5 },
];

const plans = [
  { name: 'Basic', price: '19.99', features: ['Maintenance scheduler', 'Up to 5 systems', 'Emergency guide', 'Email support', 'Basic cost estimates'] },
  { name: 'Pro', price: '39.99', popular: true, features: ['Everything in Basic', 'Unlimited systems', 'Warranty tracker', 'Cost optimizer', 'Contractor finder', 'Priority support', 'Budget tracking'] },
  { name: 'Premium', price: '79.99', features: ['Everything in Pro', 'Multi-property support', 'Insurance integration', 'Dedicated account manager', 'Custom maintenance plans', 'Annual home assessment', 'Phone support'] },
];

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <SEO
        title="HomeGuard Pro - AI-Powered Home Maintenance | Never Miss a Repair Again"
        description="AI-powered home maintenance companion. Smart scheduling, emergency guidance, cost optimization — everything you need to protect your biggest investment."
        path="/"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  name: 'HomeGuard Pro',
                  url: 'https://homeowner1-beryl.vercel.app',
                  logo: 'https://homeowner1-beryl.vercel.app/favicon.svg',
                  description: 'AI-Powered Home Maintenance Platform',
                },
                {
                  '@type': 'SoftwareApplication',
                  name: 'HomeGuard Pro',
                  applicationCategory: 'UtilitiesApplication',
                  operatingSystem: 'Web',
                  offers: {
                    '@type': 'AggregateOffer',
                    lowPrice: '19.99',
                    highPrice: '79.99',
                    priceCurrency: 'USD',
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.9',
                    ratingCount: '10000',
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            🏠 Trusted by 10,000+ homeowners
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Your Home's Warranty<br />Expired. Now What?
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10">
            HomeGuard Pro is your AI-powered home maintenance companion. Smart scheduling, emergency guidance, cost optimization — everything you need to protect your biggest investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-cta text-lg !py-4 !px-10">Start Free Trial →</Link>
            <Link href="#features" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-10 rounded-lg transition-all text-lg">See How It Works</Link>
          </div>
          <p className="mt-6 text-blue-200 text-sm">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '10,000+', label: 'Active Homeowners' },
            { value: '$2.4M', label: 'Saved in Repairs' },
            { value: '50,000+', label: 'Tasks Completed' },
            { value: '4.9/5', label: 'User Rating' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-extrabold text-blue-600">{s.value}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Everything Your Home Needs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Six powerful modules working together to keep your home running perfectly.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '1', title: 'Add Your Home', desc: 'Tell us about your home — age, systems, appliances, and location. Takes under 5 minutes.' },
              { step: '2', title: 'Get Your Plan', desc: 'Our AI generates a personalized maintenance schedule, warranty tracking, and cost projections.' },
              { step: '3', title: 'Stay Protected', desc: 'Follow your schedule, get alerts, and handle emergencies with confidence. Your home stays healthy.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">{s.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-16">What Homeowners Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="card">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-gray-600 mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your home. Upgrade or cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((p, i) => (
              <PricingCard key={i} {...p} onSelect={() => router.push('/signup')} ctaText={p.popular ? 'Start Free Trial' : 'Get Started'} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Protect Your Home?</h2>
          <p className="text-xl text-blue-100 mb-8">Join 10,000+ homeowners who trust HomeGuard Pro to keep their homes running smoothly.</p>
          <Link href="/signup" className="btn-cta text-lg !py-4 !px-10 inline-block">Start Your Free Trial →</Link>
        </div>
      </section>
    </div>
  );
}

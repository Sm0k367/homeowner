import { useState } from 'react';
import PricingCard from '../components/PricingCard';
import { useRouter } from 'next/router';

const plans = [
  { name: 'Basic', price: '19.99', features: ['Maintenance scheduler for up to 5 systems', 'Emergency troubleshooting guide', 'Basic cost estimates', 'Email support (48hr response)', 'Single property'] },
  { name: 'Pro', price: '39.99', popular: true, features: ['Unlimited systems & appliances', 'Emergency guide with AI chat', 'Full warranty tracker', 'Advanced cost optimizer', 'Contractor finder & quotes', 'Priority email support (24hr)', 'Budget tracking & reports', 'Up to 3 properties'] },
  { name: 'Premium', price: '79.99', features: ['Everything in Pro', 'Unlimited properties', 'Insurance integration', 'Dedicated account manager', 'Custom maintenance plans', 'Annual professional home assessment', 'Phone & chat support', 'Early access to new features', 'Family member accounts (up to 5)'] },
];

const faqs = [
  { q: 'Can I cancel anytime?', a: 'Yes! All plans are month-to-month with no contracts. Cancel anytime from your dashboard. No questions asked.' },
  { q: 'Is there a free trial?', a: 'Absolutely! Every plan comes with a 14-day free trial. No credit card required to start. You can upgrade, downgrade, or cancel during the trial period.' },
  { q: 'Do I need any smart home devices?', a: 'No! HomeGuard Pro works entirely through our web app. No special hardware or smart home devices required. Just a web browser.' },
  { q: 'How does the AI maintenance scheduler work?', a: 'You tell us about your home systems (HVAC, water heater, roof, etc.), their age, and your location. Our AI generates a customized maintenance schedule with tasks, frequencies, and seasonal timing based on expert knowledge.' },
  { q: 'Can I use HomeGuard Pro for multiple properties?', a: 'Yes! The Pro plan supports up to 3 properties, and Premium supports unlimited properties. Perfect for homeowners with rental properties or vacation homes.' },
  { q: 'What if I need help with a real emergency?', a: 'Our Emergency Guide provides instant step-by-step instructions for common home emergencies. For life-threatening situations, always call 911 first. Our guide helps you take the right immediate actions while waiting for professional help.' },
];

export default function Pricing() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Protect your home for less than a cup of coffee a day. All plans include a 14-day free trial.</p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {plans.map((p, i) => (
            <PricingCard key={i} {...p} onSelect={() => router.push('/signup')} ctaText={p.popular ? 'Start Free Trial' : 'Get Started'} />
          ))}
        </div>

        {/* Comparison */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-900 font-bold">Feature</th>
                  <th className="text-center py-3 px-4 text-gray-900 font-bold">Basic</th>
                  <th className="text-center py-3 px-4 text-blue-600 font-bold">Pro</th>
                  <th className="text-center py-3 px-4 text-gray-900 font-bold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Maintenance Scheduler', '5 systems', 'Unlimited', 'Unlimited'],
                  ['Emergency Guide', '✅', '✅ + AI Chat', '✅ + AI Chat'],
                  ['Warranty Tracker', '❌', '✅', '✅'],
                  ['Cost Optimizer', 'Basic', 'Advanced', 'Advanced'],
                  ['Contractor Finder', '❌', '✅', '✅'],
                  ['Budget Tracking', '❌', '✅', '✅'],
                  ['Properties', '1', 'Up to 3', 'Unlimited'],
                  ['Support', 'Email (48hr)', 'Email (24hr)', 'Phone + Chat'],
                  ['Home Assessment', '❌', '❌', 'Annual'],
                  ['Family Accounts', '❌', '❌', 'Up to 5'],
                ].map(([feature, basic, pro, premium], i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{feature}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{basic}</td>
                    <td className="py-3 px-4 text-center text-blue-600 font-medium bg-blue-50/50">{pro}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-4 text-left">
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && <div className="px-4 pb-4 text-gray-600">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

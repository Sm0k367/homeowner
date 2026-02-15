export default function PricingCard({ name, price, features, popular, ctaText, onSelect }) {
  return (
    <div className={`card relative ${popular ? 'border-2 border-blue-600 scale-105' : 'border border-gray-200'}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <div className="mt-4">
          <span className="text-4xl font-extrabold text-gray-900">${price}</span>
          <span className="text-gray-500">/month</span>
        </div>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-600 text-sm">{f}</span>
          </li>
        ))}
      </ul>
      <button onClick={onSelect} className={`w-full py-3 rounded-lg font-semibold transition-all ${popular ? 'btn-cta' : 'btn-secondary'}`}>
        {ctaText || 'Get Started'}
      </button>
    </div>
  );
}

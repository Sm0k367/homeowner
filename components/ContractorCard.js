import { useState } from 'react';

export default function ContractorCard({ contractor, onSave, saved }) {
  const [showQuote, setShowQuote] = useState(false);

  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{contractor.name}</h3>
          <p className="text-sm text-gray-500">{contractor.specialty}</p>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < Math.floor(contractor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-600 ml-1">{contractor.rating} ({contractor.reviews} reviews)</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-blue-600">{contractor.priceRange}</p>
          <p className="text-xs text-gray-500">{contractor.distance}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-3">{contractor.description}</p>

      <div className="flex gap-2 mt-4">
        <button onClick={() => setShowQuote(!showQuote)} className="btn-primary text-sm !py-2 !px-4 flex-1">
          {showQuote ? 'Hide Form' : 'Request Quote'}
        </button>
        <button onClick={() => onSave(contractor.id)}
          className={`text-sm !py-2 !px-4 rounded-lg border font-semibold transition-all ${saved ? 'bg-blue-50 border-blue-300 text-blue-600' : 'border-gray-300 text-gray-600 hover:border-blue-300'}`}>
          {saved ? '★ Saved' : '☆ Save'}
        </button>
      </div>

      {showQuote && (
        <div className="mt-4 bg-gray-50 rounded-lg p-4 space-y-3">
          <input placeholder="Your name" className="input-field" />
          <input placeholder="Phone number" className="input-field" />
          <textarea placeholder="Describe the work needed..." rows={3} className="input-field" />
          <button onClick={() => { setShowQuote(false); alert('Quote request sent! (Demo)'); }} className="btn-cta text-sm !py-2">
            Send Quote Request
          </button>
        </div>
      )}
    </div>
  );
}

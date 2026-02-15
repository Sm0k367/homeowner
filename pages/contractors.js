import { useState, useEffect } from 'react';
import ContractorCard from '../components/ContractorCard';
import SEO from '../components/SEO';
import { useAuth } from '../lib/AuthContext';
import { getFavoriteContractors, saveFavoriteContractors } from '../lib/database';

const mockContractors = [
  { id: '1', name: 'Elite HVAC Solutions', specialty: 'HVAC Installation & Repair', rating: 4.9, reviews: 247, priceRange: '$85-$150/hr', distance: '2.3 mi', description: 'Family-owned HVAC company with 20+ years of experience. Licensed, bonded, and insured. Specializing in energy-efficient installations and emergency repairs. Same-day service available.', services: ['hvac'] },
  { id: '2', name: 'ProPlumb Masters', specialty: 'Plumbing & Water Systems', rating: 4.8, reviews: 183, priceRange: '$75-$130/hr', distance: '3.1 mi', description: 'Full-service plumbing company. From leaky faucets to complete repiping. 24/7 emergency service. Free estimates on jobs over $500. All work guaranteed for 2 years.', services: ['plumbing'] },
  { id: '3', name: 'TopShield Roofing', specialty: 'Roofing & Gutters', rating: 4.7, reviews: 156, priceRange: '$200-$400/sq', distance: '4.8 mi', description: 'Commercial and residential roofing experts. Shingle, metal, and flat roof specialists. Free inspections. Insurance claim assistance. 10-year workmanship warranty on all installations.', services: ['roofing'] },
  { id: '4', name: 'BrightWire Electric', specialty: 'Electrical Services', rating: 4.9, reviews: 312, priceRange: '$90-$160/hr', distance: '1.7 mi', description: 'Licensed master electricians. Panel upgrades, EV charger installation, whole-home generators, smart home wiring. Available for emergency service. 100% satisfaction guarantee.', services: ['electrical'] },
  { id: '5', name: 'PerfectCoat Painters', specialty: 'Interior & Exterior Painting', rating: 4.6, reviews: 98, priceRange: '$2-$6/sq ft', distance: '5.2 mi', description: 'Professional painting crew with attention to detail. Premium paints and materials. Color consultation included. Furniture moving and surface prep included in all quotes.', services: ['painting'] },
  { id: '6', name: 'AllHome Handyman Services', specialty: 'General Repairs & Maintenance', rating: 4.5, reviews: 209, priceRange: '$65-$95/hr', distance: '2.9 mi', description: 'Your go-to for all small-to-medium home repairs. Drywall, doors, windows, shelving, fixture installation, and more. No job too small. 2-hour minimum.', services: ['general', 'hvac', 'plumbing', 'electrical', 'painting', 'roofing'] },
  { id: '7', name: 'AquaGuard Waterproofing', specialty: 'Basement & Foundation', rating: 4.8, reviews: 74, priceRange: '$3,000-$15,000', distance: '6.1 mi', description: 'Basement waterproofing, foundation repair, and crawl space encapsulation specialists. Free inspection and estimate. Transferable lifetime warranty.', services: ['plumbing', 'general'] },
  { id: '8', name: 'GreenScape Landscaping', specialty: 'Landscaping & Hardscaping', rating: 4.7, reviews: 134, priceRange: '$50-$100/hr', distance: '3.4 mi', description: 'Full-service landscaping including design, installation, and maintenance. Patios, retaining walls, drainage solutions, and seasonal cleanups. Weekly maintenance plans available.', services: ['general'] },
];

const serviceTypes = ['All Services', 'HVAC', 'Plumbing', 'Roofing', 'Electrical', 'Painting', 'General'];

export default function Contractors() {
  const { user, loading: authLoading } = useAuth();
  const [search, setSearch] = useState('All Services');
  const [zip, setZip] = useState('');
  const [saved, setSaved] = useState([]);

  const userId = user?.id || user?.email;

  useEffect(() => {
    if (!user) return;
    getFavoriteContractors(userId).then(setSaved);
  }, [user]);

  const toggleSave = async (id) => {
    const updated = saved.includes(id) ? saved.filter(s => s !== id) : [...saved, id];
    setSaved(updated);
    await saveFavoriteContractors(userId, updated);
  };

  const filtered = search === 'All Services'
    ? mockContractors
    : mockContractors.filter(c => c.services.includes(search.toLowerCase()));

  const [showSaved, setShowSaved] = useState(false);
  const displayed = showSaved ? filtered.filter(c => saved.includes(c.id)) : filtered;

  if (authLoading || !user) return null;

  return (
    <div className="space-y-6">
      <div>
        <SEO title="Find Contractors | HomeGuard Pro" description="Find vetted, top-rated contractors in your area. Read reviews, compare prices, and request quotes." path="/contractors" />
        <h1 className="text-2xl font-bold text-gray-900">Contractor Finder</h1>
        <p className="text-gray-500">Find top-rated, vetted contractors in your area</p>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3">
          <select value={search} onChange={e => setSearch(e.target.value)} className="input-field flex-1">
            {serviceTypes.map(s => <option key={s}>{s}</option>)}
          </select>
          <input value={zip} onChange={e => setZip(e.target.value)} className="input-field w-full sm:w-40" placeholder="Zip code (optional)" />
          <button className="btn-primary whitespace-nowrap">🔍 Search</button>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setShowSaved(false)} className={`px-4 py-2 rounded-lg text-sm font-medium ${!showSaved ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>All Results ({filtered.length})</button>
        <button onClick={() => setShowSaved(true)} className={`px-4 py-2 rounded-lg text-sm font-medium ${showSaved ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>❤️ Saved ({saved.length})</button>
      </div>

      <div className="space-y-4">
        {displayed.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-4xl mb-3">👷</p>
            <p className="text-gray-500">{showSaved ? 'No saved contractors yet. Save some from the search results!' : 'No contractors found for this service type.'}</p>
          </div>
        ) : displayed.map(c => (
          <ContractorCard key={c.id} contractor={c} saved={saved.includes(c.id)} onSave={toggleSave} />
        ))}
      </div>
    </div>
  );
}

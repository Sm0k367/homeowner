import { useState, useEffect } from 'react';
import WarrantyCard from '../components/WarrantyCard';
import Modal from '../components/Modal';

export default function Warranties() {
  const [warranties, setWarranties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ itemName: '', purchaseDate: '', warrantyYears: '1', provider: '' });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('hg_warranties');
    if (saved) setWarranties(JSON.parse(saved));
  }, []);

  const save = (updated) => {
    setWarranties(updated);
    localStorage.setItem('hg_warranties', JSON.stringify(updated));
  };

  const addWarranty = () => {
    if (!form.itemName || !form.purchaseDate) return;
    const purchase = new Date(form.purchaseDate);
    const expiry = new Date(purchase);
    expiry.setFullYear(expiry.getFullYear() + parseInt(form.warrantyYears));

    const newWarranty = {
      id: Date.now().toString(),
      itemName: form.itemName,
      purchaseDate: form.purchaseDate,
      expiryDate: expiry.toISOString().split('T')[0],
      warrantyYears: form.warrantyYears,
      provider: form.provider,
    };
    save([...warranties, newWarranty]);
    setShowModal(false);
    setForm({ itemName: '', purchaseDate: '', warrantyYears: '1', provider: '' });
  };

  const deleteWarranty = (id) => save(warranties.filter(w => w.id !== id));

  const now = new Date();
  const active = warranties.filter(w => new Date(w.expiryDate) > now);
  const expired = warranties.filter(w => new Date(w.expiryDate) <= now);
  const expiring = warranties.filter(w => {
    const days = Math.ceil((new Date(w.expiryDate) - now) / (1000*60*60*24));
    return days > 0 && days <= 30;
  });

  const filtered = filter === 'all' ? warranties : filter === 'active' ? active : filter === 'expired' ? expired : expiring;

  const exportList = () => {
    const csv = 'Item,Provider,Purchase Date,Expiry Date,Status\n' +
      warranties.map(w => `${w.itemName},${w.provider},${w.purchaseDate},${w.expiryDate},${new Date(w.expiryDate) > now ? 'Active' : 'Expired'}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'warranties.csv'; a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Warranty Tracker</h1>
          <p className="text-gray-500">Track all your home warranties in one place</p>
        </div>
        <div className="flex gap-2">
          {warranties.length > 0 && <button onClick={exportList} className="btn-secondary text-sm !py-2">📤 Export CSV</button>}
          <button onClick={() => setShowModal(true)} className="btn-cta">+ Add Warranty</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: warranties.length, color: 'blue' },
          { label: 'Active', value: active.length, color: 'green' },
          { label: 'Expiring Soon', value: expiring.length, color: 'yellow' },
          { label: 'Expired', value: expired.length, color: 'red' },
        ].map((s, i) => (
          <div key={i} className={`card border-t-4 border-t-${s.color}-500`}>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {expiring.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Warranties Expiring Soon</h3>
          {expiring.map(w => (
            <p key={w.id} className="text-sm text-yellow-700">• {w.itemName} — expires {w.expiryDate}</p>
          ))}
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'active', 'expiring', 'expired'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{f}</button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-gray-500 mb-4">No warranties tracked yet. Add your first warranty to get started!</p>
            <button onClick={() => setShowModal(true)} className="btn-primary">Add Your First Warranty</button>
          </div>
        ) : filtered.map(w => <WarrantyCard key={w.id} warranty={w} onDelete={deleteWarranty} />)}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Warranty">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input value={form.itemName} onChange={e => setForm({...form, itemName: e.target.value})} className="input-field" placeholder="e.g. Samsung Refrigerator" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
            <input value={form.provider} onChange={e => setForm({...form, provider: e.target.value})} className="input-field" placeholder="e.g. Best Buy, Samsung" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
            <input type="date" value={form.purchaseDate} onChange={e => setForm({...form, purchaseDate: e.target.value})} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Length (years)</label>
            <select value={form.warrantyYears} onChange={e => setForm({...form, warrantyYears: e.target.value})} className="input-field">
              {[1,2,3,4,5,7,10].map(y => <option key={y} value={y}>{y} year{y > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-400 text-sm">📎 Receipt upload — coming soon</p>
          </div>
          <button onClick={addWarranty} className="btn-cta w-full">Add Warranty</button>
        </div>
      </Modal>
    </div>
  );
}

import { useState, useEffect } from 'react';
import CostEstimate from '../components/CostEstimate';
import SEO from '../components/SEO';
import { useAuth } from '../lib/AuthContext';
import { getExpenses, saveExpenses as dbSaveExpenses } from '../lib/database';

const commonTasks = ['HVAC Repair', 'HVAC Replacement', 'Roof Repair', 'Plumbing Repair', 'Electrical Work', 'Painting', 'Water Heater'];
const categories = ['Maintenance', 'Repair', 'Improvement', 'Emergency', 'Other'];

const seasonalTips = [
  { season: '🌱 Spring', tips: ['Schedule HVAC tune-up before summer rush', 'Clean gutters after winter', 'Inspect roof for winter damage', 'Best time to negotiate contractor rates'] },
  { season: '☀️ Summer', tips: ['AC repairs are most expensive now — prevent with spring maintenance', 'Great time for exterior painting', 'Check attic ventilation', 'Water your foundation in drought areas'] },
  { season: '🍂 Fall', tips: ['HVAC tune-up before winter', 'Seal windows and doors for energy savings', 'Clean chimney/fireplace', 'Winterize outdoor plumbing'] },
  { season: '❄️ Winter', tips: ['Monitor pipe insulation', 'Contractors offer discounts in slow season', 'Plan spring projects now for better rates', 'Check smoke/CO detectors'] },
];

export default function Costs() {
  const { user, loading: authLoading } = useAuth();
  const [task, setTask] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expForm, setExpForm] = useState({ description: '', amount: '', category: 'Maintenance', date: new Date().toISOString().split('T')[0] });

  const userId = user?.id || user?.email;

  useEffect(() => {
    if (!user) return;
    getExpenses(userId).then(setExpenses);
  }, [user]);

  const saveExpenses = async (updated) => {
    setExpenses(updated);
    await dbSaveExpenses(userId, updated);
  };

  const getEstimateHandler = async () => {
    if (!task) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai-cost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, zipCode }),
      });
      setEstimate(await res.json());
    } catch { alert('Failed to get estimate.'); }
    setLoading(false);
  };

  const addExpense = async () => {
    if (!expForm.description || !expForm.amount) return;
    await saveExpenses([...expenses, { ...expForm, id: Date.now().toString() }]);
    setExpForm({ description: '', amount: '', category: 'Maintenance', date: new Date().toISOString().split('T')[0] });
    setShowExpenseForm(false);
  };

  const deleteExpense = async (id) => await saveExpenses(expenses.filter(e => e.id !== id));

  const totalSpent = expenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
  const byCategory = {};
  expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + (parseFloat(e.amount) || 0); });

  const currentMonth = new Date().getMonth();
  const seasonIndex = currentMonth < 3 ? 3 : currentMonth < 6 ? 0 : currentMonth < 9 ? 1 : 2;

  if (authLoading || !user) return null;

  return (
    <div className="space-y-6">
      <div>
        <SEO title="Cost Optimizer | HomeGuard Pro" description="Compare DIY vs professional costs, get money-saving tips, and track your home maintenance budget." path="/costs" />
        <h1 className="text-2xl font-bold text-gray-900">Cost Optimizer</h1>
        <p className="text-gray-500">Compare costs, get savings tips, and track your home maintenance budget</p>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 mb-4">💡 Get Cost Estimate</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <select value={task} onChange={e => setTask(e.target.value)} className="input-field">
              <option value="">Select a task...</option>
              {commonTasks.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <input value={zipCode} onChange={e => setZipCode(e.target.value)} className="input-field w-full sm:w-32" placeholder="Zip code" />
          <button onClick={getEstimateHandler} disabled={loading || !task} className="btn-primary whitespace-nowrap">
            {loading ? 'Getting...' : 'Get Estimate'}
          </button>
        </div>
      </div>

      {estimate && <CostEstimate estimate={estimate} />}

      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 mb-4">💲 Seasonal Money-Saving Tips</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {seasonalTips.map((s, i) => (
            <div key={i} className={`rounded-lg p-4 ${i === seasonIndex ? 'bg-blue-50 border-2 border-blue-300' : 'bg-gray-50'}`}>
              <h3 className="font-bold text-gray-900 mb-2">{s.season} {i === seasonIndex && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full ml-1">Current</span>}</h3>
              <ul className="space-y-1">
                {s.tips.map((tip, j) => <li key={j} className="text-sm text-gray-600">• {tip}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">📊 Budget Tracker</h2>
          <button onClick={() => setShowExpenseForm(!showExpenseForm)} className="btn-primary text-sm !py-2">
            {showExpenseForm ? 'Cancel' : '+ Log Expense'}
          </button>
        </div>

        {showExpenseForm && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
            <input placeholder="Description" value={expForm.description} onChange={e => setExpForm({...expForm, description: e.target.value})} className="input-field" />
            <div className="grid grid-cols-3 gap-3">
              <input type="number" placeholder="Amount ($)" value={expForm.amount} onChange={e => setExpForm({...expForm, amount: e.target.value})} className="input-field" />
              <select value={expForm.category} onChange={e => setExpForm({...expForm, category: e.target.value})} className="input-field">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <input type="date" value={expForm.date} onChange={e => setExpForm({...expForm, date: e.target.value})} className="input-field" />
            </div>
            <button onClick={addExpense} className="btn-cta text-sm !py-2">Add Expense</button>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium">Total Spent</p>
            <p className="text-2xl font-bold text-blue-700">${totalSpent.toFixed(2)}</p>
          </div>
          {Object.entries(byCategory).slice(0, 3).map(([cat, amount]) => (
            <div key={cat} className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 font-medium">{cat}</p>
              <p className="text-2xl font-bold text-gray-900">${amount.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {expenses.length === 0 ? (
          <p className="text-center text-gray-400 py-6">No expenses logged yet. Start tracking to see your spending patterns.</p>
        ) : (
          <div className="space-y-2">
            {expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(e => (
              <div key={e.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">{e.description}</p>
                  <p className="text-xs text-gray-500">{e.category} · {e.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900">${parseFloat(e.amount).toFixed(2)}</span>
                  <button onClick={() => deleteExpense(e.id)} className="text-gray-400 hover:text-red-500">✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

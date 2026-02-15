import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ address: '', sqft: '', yearBuilt: '', systems: [] });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('hg_user');
    if (!u) { router.push('/login'); return; }
    setUser(JSON.parse(u));
    const p = localStorage.getItem('hg_profile');
    if (p) setProfile(JSON.parse(p));
  }, []);

  const saveProfile = () => {
    localStorage.setItem('hg_profile', JSON.stringify(profile));
    setEditing(false);
  };

  const maintenanceTasks = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('hg_maintenance') || '[]' : '[]');
  const warranties = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('hg_warranties') || '[]' : '[]');
  const expenses = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('hg_expenses') || '[]' : '[]');

  const upcomingTasks = maintenanceTasks.filter(t => !t.completed).slice(0, 5);
  const activeWarranties = warranties.filter(w => new Date(w.expiryDate) > new Date());
  const expiringWarranties = warranties.filter(w => {
    const days = Math.ceil((new Date(w.expiryDate) - new Date()) / (1000*60*60*24));
    return days > 0 && days <= 30;
  });
  const totalSpent = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

  const quickActions = [
    { label: 'Add System', icon: '🔧', href: '/maintenance' },
    { label: 'Emergency Help', icon: '🚨', href: '/emergency' },
    { label: 'Add Warranty', icon: '📋', href: '/warranties' },
    { label: 'Find Contractor', icon: '👷', href: '/contractors' },
  ];

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back{user.name ? `, ${user.name}` : ''}! 👋</h1>
        <p className="text-blue-100 mt-1">Here's what's happening with your home.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Upcoming Tasks', value: upcomingTasks.length, icon: '🔧', color: 'blue', href: '/maintenance' },
          { label: 'Active Warranties', value: activeWarranties.length, icon: '📋', color: 'green', href: '/warranties' },
          { label: 'Expiring Soon', value: expiringWarranties.length, icon: '⚠️', color: 'yellow', href: '/warranties' },
          { label: 'Total Spent', value: `$${totalSpent.toFixed(0)}`, icon: '💰', color: 'purple', href: '/costs' },
        ].map((s, i) => (
          <Link key={i} href={s.href} className="card hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${s.color}-100 text-${s.color}-700`}>View</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((a, i) => (
          <Link key={i} href={a.href} className="card text-center hover:scale-105 transition-transform cursor-pointer">
            <span className="text-3xl block mb-2">{a.icon}</span>
            <span className="font-semibold text-gray-900">{a.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Home Profile */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">🏠 Home Profile</h2>
            <button onClick={() => editing ? saveProfile() : setEditing(true)} className="text-sm text-blue-600 font-semibold hover:underline">
              {editing ? 'Save' : 'Edit'}
            </button>
          </div>
          {editing ? (
            <div className="space-y-3">
              <input placeholder="Address" value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} className="input-field" />
              <input placeholder="Square Footage" value={profile.sqft} onChange={e => setProfile({...profile, sqft: e.target.value})} className="input-field" />
              <input placeholder="Year Built" value={profile.yearBuilt} onChange={e => setProfile({...profile, yearBuilt: e.target.value})} className="input-field" />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Address</span>
                <span className="font-medium text-gray-900">{profile.address || 'Not set'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Square Footage</span>
                <span className="font-medium text-gray-900">{profile.sqft || 'Not set'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Year Built</span>
                <span className="font-medium text-gray-900">{profile.yearBuilt || 'Not set'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Systems Tracked</span>
                <span className="font-medium text-gray-900">{maintenanceTasks.length > 0 ? `${new Set(maintenanceTasks.map(t => t.system)).size} systems` : 'None yet'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Tasks */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">📅 Upcoming Tasks</h2>
            <Link href="/maintenance" className="text-sm text-blue-600 font-semibold hover:underline">View All</Link>
          </div>
          {upcomingTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">🔧</p>
              <p>No maintenance tasks yet.</p>
              <Link href="/maintenance" className="text-blue-600 text-sm font-semibold">Add your first system →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingTasks.map((t, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{t.task}</p>
                    <p className="text-xs text-gray-500">{t.system} • {t.dueDate}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${t.urgency === 'high' ? 'bg-red-100 text-red-700' : t.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {t.urgency}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Activity / Alerts */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 mb-4">🔔 Recent Alerts</h2>
        <div className="space-y-3">
          {expiringWarranties.length > 0 ? expiringWarranties.map((w, i) => (
            <div key={i} className="flex items-center gap-3 bg-yellow-50 p-3 rounded-lg">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="text-sm font-medium text-yellow-800">Warranty expiring soon: {w.itemName}</p>
                <p className="text-xs text-yellow-600">Expires {w.expiryDate}</p>
              </div>
            </div>
          )) : (
            <div className="text-center py-6 text-gray-400">
              <p>No alerts right now. Your home is in good shape! ✅</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

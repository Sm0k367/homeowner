import { useState, useEffect } from 'react';
import MaintenanceItem from '../components/MaintenanceItem';
import Modal from '../components/Modal';
import SEO from '../components/SEO';
import { useAuth } from '../lib/AuthContext';
import { getMaintenance, saveMaintenance, updateMaintenanceTask } from '../lib/database';

const systemTypes = ['HVAC', 'Water Heater', 'Roof', 'Plumbing', 'Electrical', 'Appliances'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function Maintenance() {
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: 'HVAC', age: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState([]);
  const [ageNote, setAgeNote] = useState('');
  const [view, setView] = useState('list');
  const [filter, setFilter] = useState('all');

  const userId = user?.id || user?.email;

  useEffect(() => {
    if (!user) return;
    getMaintenance(userId).then(setTasks);
  }, [user]);

  const save = async (updated) => {
    setTasks(updated);
    await saveMaintenance(userId, updated);
  };

  const addSystem = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai-maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemType: form.type, age: form.age, location: form.location }),
      });
      const data = await res.json();
      await save([...tasks, ...data.tasks]);
      setTips(data.tips || []);
      setAgeNote(data.ageNote || '');
      setShowModal(false);
      setForm({ type: 'HVAC', age: '', location: '' });
    } catch (e) {
      alert('Failed to generate schedule. Please try again.');
    }
    setLoading(false);
  };

  const toggleComplete = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
      setTasks(updated);
      await updateMaintenanceTask(userId, id, { completed: !task.completed });
    }
  };

  const deleteTask = async (id) => {
    await save(tasks.filter(t => t.id !== id));
  };

  const filtered = filter === 'all' ? tasks : filter === 'pending' ? tasks.filter(t => !t.completed) : tasks.filter(t => t.completed);

  const calendarTasks = tasks.filter(t => !t.completed);
  const tasksByMonth = {};
  calendarTasks.forEach(t => {
    const d = new Date(t.dueDate);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!tasksByMonth[key]) tasksByMonth[key] = [];
    tasksByMonth[key].push(t);
  });

  if (authLoading || !user) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <SEO title="Smart Maintenance Scheduler | HomeGuard Pro" description="AI-powered maintenance schedules tailored to your home systems, age, and climate." path="/maintenance" />
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Scheduler</h1>
          <p className="text-gray-500">AI-powered maintenance schedules for your home systems</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-cta">+ Add System</button>
      </div>

      {tips.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2">💡 AI Recommendations</h3>
          {ageNote && <p className="text-sm text-blue-700 mb-2 font-medium">{ageNote}</p>}
          <ul className="space-y-1">
            {tips.map((tip, i) => <li key={i} className="text-sm text-blue-700">• {tip}</li>)}
          </ul>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <button onClick={() => setView('list')} className={`px-4 py-2 rounded-lg text-sm font-medium ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>📋 List</button>
          <button onClick={() => setView('calendar')} className={`px-4 py-2 rounded-lg text-sm font-medium ${view === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>📅 Calendar</button>
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${filter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>{f}</button>
          ))}
        </div>
      </div>

      {view === 'list' ? (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-4xl mb-3">🔧</p>
              <p className="text-gray-500 mb-4">No maintenance tasks yet. Add a home system to get started!</p>
              <button onClick={() => setShowModal(true)} className="btn-primary">Add Your First System</button>
            </div>
          ) : filtered.map(task => (
            <MaintenanceItem key={task.id} item={task} onComplete={toggleComplete} onDelete={deleteTask} />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(tasksByMonth).sort().map(([key, monthTasks]) => {
            const [year, month] = key.split('-');
            return (
              <div key={key} className="card">
                <h3 className="font-bold text-gray-900 mb-3">{months[parseInt(month)]} {year}</h3>
                <div className="space-y-2">
                  {monthTasks.map(t => (
                    <div key={t.id} className="flex items-center gap-2 text-sm">
                      <span className={`w-2 h-2 rounded-full ${t.urgency === 'high' ? 'bg-red-500' : t.urgency === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                      <span className="text-gray-700">{t.task}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {Object.keys(tasksByMonth).length === 0 && (
            <div className="col-span-full card text-center py-8 text-gray-400">No upcoming tasks to display.</div>
          )}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Home System">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">System Type</label>
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="input-field">
              {systemTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
            <input type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} className="input-field" placeholder="e.g. 5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location / Climate</label>
            <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="input-field" placeholder="e.g. Southeast, humid" />
          </div>
          <button onClick={addSystem} disabled={loading} className="btn-cta w-full">
            {loading ? 'Generating Schedule...' : '✨ Generate Maintenance Schedule'}
          </button>
          <p className="text-xs text-gray-400 text-center">Our AI will create a customized maintenance plan for this system.</p>
        </div>
      </Modal>
    </div>
  );
}

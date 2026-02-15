import { useState } from 'react';

export default function EmergencyChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "🚨 I'm your HomeGuard Emergency Assistant. Describe your emergency or select a common issue below, and I'll guide you through it step by step." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickIssues = [
    { label: '💧 Burst Pipe', category: 'burst_pipe' },
    { label: '⚡ Power Outage', category: 'power_outage' },
    { label: '🔥 Gas Smell', category: 'gas_smell' },
    { label: '❄️ HVAC Failure', category: 'hvac_failure' },
    { label: '🏠 Roof Leak', category: 'roof_leak' },
    { label: '🌊 Flooding', category: 'flooding' },
  ];

  const sendMessage = async (text, category) => {
    const userMsg = text || input;
    if (!userMsg.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: userMsg, category: category || 'general' }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, something went wrong. For life-threatening emergencies, always call 911.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
              <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
              <div className="flex gap-1"><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0.1s'}}></span><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0.2s'}}></span></div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickIssues.map(q => (
            <button key={q.category} onClick={() => sendMessage(q.label.split(' ').slice(1).join(' '), q.category)}
              className="text-xs bg-red-50 text-red-700 px-3 py-1.5 rounded-full hover:bg-red-100 font-medium transition-colors">
              {q.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Describe your emergency..."
            className="input-field flex-1" />
          <button onClick={() => sendMessage()} className="btn-primary !py-2 !px-4">Send</button>
        </div>
      </div>
    </div>
  );
}

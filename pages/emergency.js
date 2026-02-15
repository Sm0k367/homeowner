import EmergencyChat from '../components/EmergencyChat';

export default function Emergency() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Emergency Guide</h1>
        <p className="text-gray-500">Get instant step-by-step guidance for any home emergency</p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-red-800 font-semibold text-sm">⚠️ For life-threatening emergencies, always call 911 first. This guide is for home system emergencies and troubleshooting.</p>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 p-4">
          <h2 className="text-white font-bold text-lg">🚨 Emergency Assistant</h2>
          <p className="text-red-100 text-sm">Describe your issue or select a common emergency below</p>
        </div>
        <EmergencyChat />
      </div>
    </div>
  );
}

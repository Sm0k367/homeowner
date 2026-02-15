export default function MaintenanceItem({ item, onComplete, onDelete }) {
  const urgencyColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  };

  return (
    <div className={`card flex items-center justify-between ${item.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-4">
        <button onClick={() => onComplete(item.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-blue-500'}`}>
          {item.completed && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
        </button>
        <div>
          <h4 className={`font-semibold ${item.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>{item.task}</h4>
          <p className="text-sm text-gray-500">{item.system} • Due: {item.dueDate}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${urgencyColors[item.urgency] || urgencyColors.low}`}>
          {item.urgency}
        </span>
        <button onClick={() => onDelete(item.id)} className="text-gray-400 hover:text-red-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </div>
  );
}

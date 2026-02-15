export default function Alert({ type = 'info', message, onClose }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    error: 'bg-red-50 border-red-200 text-red-700',
  };
  const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };

  return (
    <div className={`border rounded-lg px-4 py-3 flex items-center justify-between ${styles[type]}`}>
      <span className="flex items-center gap-2">
        <span>{icons[type]}</span>
        <span className="text-sm font-medium">{message}</span>
      </span>
      {onClose && <button onClick={onClose} className="text-current opacity-50 hover:opacity-100">&times;</button>}
    </div>
  );
}

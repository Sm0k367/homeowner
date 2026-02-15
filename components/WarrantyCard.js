export default function WarrantyCard({ warranty, onDelete }) {
  const now = new Date();
  const expiry = new Date(warranty.expiryDate);
  const daysLeft = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
  const isExpired = daysLeft < 0;
  const isExpiring = daysLeft >= 0 && daysLeft <= 30;

  return (
    <div className={`card border-l-4 ${isExpired ? 'border-l-red-500' : isExpiring ? 'border-l-yellow-500' : 'border-l-green-500'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{warranty.itemName}</h3>
          <p className="text-sm text-gray-500 mt-1">Provider: {warranty.provider}</p>
          <p className="text-sm text-gray-500">Purchased: {warranty.purchaseDate}</p>
          <p className="text-sm text-gray-500">Expires: {warranty.expiryDate}</p>
        </div>
        <div className="text-right">
          {isExpired ? (
            <span className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full">Expired</span>
          ) : isExpiring ? (
            <span className="bg-yellow-100 text-yellow-700 text-sm font-semibold px-3 py-1 rounded-full">{daysLeft} days left</span>
          ) : (
            <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">{daysLeft} days left</span>
          )}
          <button onClick={() => onDelete(warranty.id)} className="block mt-3 text-gray-400 hover:text-red-500 ml-auto">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

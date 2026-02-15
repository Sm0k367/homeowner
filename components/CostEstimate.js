export default function CostEstimate({ estimate }) {
  if (!estimate) return null;
  return (
    <div className="card border border-blue-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{estimate.task}</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-600 font-medium">DIY Cost</p>
          <p className="text-2xl font-bold text-green-700">${estimate.diyCost}</p>
          <p className="text-xs text-green-600 mt-1">{estimate.diyTime}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium">Professional Cost</p>
          <p className="text-2xl font-bold text-blue-700">${estimate.proCost}</p>
          <p className="text-xs text-blue-600 mt-1">{estimate.proTime}</p>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">💡 Money-Saving Tips</h4>
        <ul className="space-y-1">
          {estimate.tips?.map((tip, i) => (
            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-yellow-500">•</span>{tip}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-purple-50 rounded-lg p-3">
        <p className="text-sm text-purple-700"><strong>Recommendation:</strong> {estimate.recommendation}</p>
      </div>
    </div>
  );
}

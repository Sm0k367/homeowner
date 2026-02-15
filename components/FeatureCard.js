export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="card text-center group hover:scale-105 transition-transform duration-200">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

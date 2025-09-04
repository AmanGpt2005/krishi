// components/CropCard.js
export default function CropCard({ crop }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105">
      <img src={crop.image} alt={crop.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-semibold text-green-800">{crop.name}</h4>
        <p className="text-sm text-gray-600 mt-2">{crop.rationale}</p>
      </div>
    </div>
  )
}

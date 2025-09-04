import Link from "next/link";

export default function Products() {
  const products = [
    { id: 1, name: "Hybrid Seeds", details: "High-yield wheat & rice seeds", supplier: "AgriGrow Ltd.", price: "₹500/bag" },
    { id: 2, name: "Fertilizers", details: "NPK balanced fertilizer for crops", supplier: "FarmaCare", price: "₹1200/50kg" },
    { id: 3, name: "Pesticides", details: "Eco-friendly pest control solutions", supplier: "AgroShield", price: "₹800/lt" },
    { id: 4, name: "Tractor Tools", details: "Ploughs, harrows, seeders", supplier: "Kisan Equipments", price: "₹15,000/set" },
    { id: 5, name: "Irrigation System", details: "Drip irrigation & sprinklers", supplier: "JalSetu Systems", price: "₹25,000/unit" },
    { id: 6, name: "Soil Testing Kit", details: "Quick soil pH & nutrient check", supplier: "AgriTest Labs", price: "₹2,500/kit" },
    { id: 7, name: "Crop Protection Nets", details: "Protects from birds & insects", supplier: "SafeHarvest", price: "₹1,200/roll" },
    { id: 8, name: "Greenhouse Setup", details: "Small-scale polyhouse structure", supplier: "EcoFarms", price: "₹50,000/unit" },
    { id: 9, name: "Organic Compost", details: "Nutrient-rich natural compost", supplier: "BioFert Solutions", price: "₹600/25kg" },
    { id: 10, name: "Water Pumps", details: "Diesel & electric pumps", supplier: "AgriPump India", price: "₹12,000/unit" },
    { id: 11, name: "Weather Sensors", details: "IoT sensors for rainfall & temp", supplier: "SmartAgri Tech", price: "₹8,000/unit" },
    { id: 12, name: "Grain Storage Bags", details: "Moisture-proof storage sacks", supplier: "SafeGrain", price: "₹80/bag" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* 🌱 Heading */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700">
          🌱 Farmer’s Products & Essentials
        </h1>
        <p className="text-lg text-green-800 mt-3 max-w-2xl mx-auto">
          Explore essential farming products and modern solutions – everything farmers need, from seeds to smart tools.
        </p>
      </div>

      {/* Product Cards */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div
              className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-green-600 to-green-700 
                         border border-green-200 hover:shadow-2xl transform transition duration-300 
                         hover:-translate-y-2 cursor-pointer group"
            >
              <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-yellow-300">
                {product.name}
              </h3>
              <p className="text-green-50 mt-2 transition-colors duration-300 group-hover:text-yellow-200">
                <span className="font-semibold">Details:</span> {product.details}
              </p>
              <p className="text-green-50 transition-colors duration-300 group-hover:text-yellow-200">
                <span className="font-semibold">Supplier:</span> {product.supplier}
              </p>
              <p className="text-lg font-bold text-green-100 transition-colors duration-300 group-hover:text-yellow-200">
                <span className="font-semibold">Price:</span> {product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

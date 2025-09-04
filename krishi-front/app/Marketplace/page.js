import Link from "next/link";

export default function Marketplace() {
  const crops = [
    { id: 1, name: "Wheat", quantity: "500 kg", location: "Lucknow, Uttar Pradesh", price: "₹22/kg" },
    { id: 2, name: "Rice", quantity: "1200 kg", location: "Guntur, Andhra Pradesh", price: "₹30/kg" },
    { id: 3, name: "Sugarcane", quantity: "800 kg", location: "Meerut, Uttar Pradesh", price: "₹18/kg" },
    { id: 4, name: "Cotton", quantity: "300 kg", location: "Nagpur, Maharashtra", price: "₹55/kg" },
    { id: 5, name: "Maize", quantity: "600 kg", location: "Patna, Bihar", price: "₹20/kg" },
    { id: 6, name: "Pulses", quantity: "400 kg", location: "Indore, Madhya Pradesh", price: "₹70/kg" },
    { id: 7, name: "Groundnut", quantity: "350 kg", location: "Rajkot, Gujarat", price: "₹65/kg" },
    { id: 8, name: "Soybean", quantity: "900 kg", location: "Bhopal, Madhya Pradesh", price: "₹40/kg" },
    { id: 9, name: "Tea", quantity: "200 kg", location: "Darjeeling, West Bengal", price: "₹150/kg" },
    { id: 10, name: "Coffee", quantity: "150 kg", location: "Coorg, Karnataka", price: "₹200/kg" },
    { id: 11, name: "Bananas", quantity: "700 kg", location: "Salem, Tamil Nadu", price: "₹12/kg" },
    { id: 12, name: "Apples", quantity: "500 kg", location: "Shimla, Himachal Pradesh", price: "₹90/kg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* 🌾 Heading */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700">
          🌾 Farmer&apos;s Marketplace
        </h1>
        <p className="text-lg text-green-800 mt-3 max-w-2xl mx-auto">
          Sell and buy fresh crops directly from farmers – transparent, fair, and sustainable.
        </p>
      </div>

      {/* Cards */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {crops.map((crop) => (
          <Link key={crop.id} href={`/marketplace/${crop.id}`}>
            <div
              className="p-6 rounded-xl shadow-lg bg-white border border-green-200 
                         hover:bg-gradient-to-r hover:from-green-600 hover:to-green-800 
                         hover:shadow-2xl transform transition duration-300 
                         hover:-translate-y-2 cursor-pointer group"
            >
              <h3 className="text-2xl font-bold text-green-700 transition-colors duration-300 group-hover:text-yellow-300">
                {crop.name}
              </h3>
              <p className="text-green-800 mt-2 transition-colors duration-300 group-hover:text-yellow-200">
                <span className="font-semibold">Quantity:</span> {crop.quantity}
              </p>
              <p className="text-green-800 transition-colors duration-300 group-hover:text-yellow-200">
                <span className="font-semibold">Location:</span> {crop.location}
              </p>
              <p className="text-lg font-bold text-green-900 transition-colors duration-300 group-hover:text-yellow-200">
                <span className="font-semibold">Price:</span> {crop.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

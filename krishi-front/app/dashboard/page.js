// app/dashboard/page.js
'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import CropCard from '../../components/Cropcard'


const DISTRICTS = {
  'Andhra Pradesh': [
    'Anakapalli',
    'Ananthapuramu',
    'Annamayya',
    'Bapatla',
    'Chittoor',
    'East Godavari',
    'Eluru',
    'Guntur',
    'Kakinada',
    'Konaseema',
    'Krishna',
    'Kurnool',
    'Nandyal',
    'NTR',
    'Palnadu',
    'Parvathipuram Manyam',
    'Prakasam',
    'Srikakulam',
    'Sri Potti Sriramulu Nellore',
    'Sri Sathya Sai',
    'Tirupati',
    'Visakhapatnam',
    'Vizianagaram',
    'West Godavari',
    'YSR Kadapa'
  ],
  'Maharashtra': ['Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Uttar Pradesh': [
  'Agra',
  'Aligarh',
  'Ayodhya',
  'Azamgarh',
  'Ballia',
  'Banda',
  'Barabanki',
  'Bareilly',
  'Basti',
  'Bhadohi',
  'Bijnor',
  'Bulandshahr',
  'Deoria',
  'Etah',
  'Etawah',
  'Farrukhabad',
  'Fatehpur',
  'Firozabad',
  'Gautam Buddha Nagar (Noida)',
  'Ghaziabad',
  'Ghazipur',
  'Gonda',
  'Gorakhpur',
  'Hardoi',
  'Hathras',
  'Jaunpur',
  'Jhansi',
  'Kannauj',
  'Kanpur',
  'Kasganj',
  'Kaushambi',
  'Kushinagar',
  'Lakhimpur Kheri',
  'Lalitpur',
  'Lucknow',
  'Mathura',
  'Mau',
  'Meerut',
  'Mirzapur',
  'Moradabad',
  'Muzaffarnagar',
  'Pilibhit',
  'Pratapgarh',
  'Prayagraj (Allahabad)',
  'Raebareli',
  'Rampur',
  'Saharanpur',
  'Shahjahanpur',
  'Sitapur',
  'Sultanpur',
  'Varanasi'
],

  Punjab: ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala'],
}

const MOCK_RESULTS = {
  'Red Soil': {
    soilType: 'Red Soil',
    confidence: '98%',
    marketTrend: 'Consistently strong for Groundnut.',
    soilMoisture: 'Moderate. Plan for supplementary irrigation.',
    recommendations: [
      { name: 'Groundnut', image: 'https://placehold.co/400x250/F4A460/FFFFFF?text=Groundnut', rationale: 'Excellent drainage prevents waterlogging. Strong market price.' },
      { name: 'Pulses', image: 'https://placehold.co/400x250/8B4513/FFFFFF?text=Pulses', rationale: 'Well-suited for red soil and improves soil fertility.' },
      { name: 'Millets (Ragi)', image: 'https://placehold.co/400x250/CD853F/FFFFFF?text=Ragi', rationale: 'Drought-resistant and grows well in nutrient-poor soil.' },
    ],
  },
  'Black Soil': {
    soilType: 'Black Soil',
    confidence: '95%',
    marketTrend: 'Stable for Cotton and Soybean.',
    soilMoisture: 'High moisture retention, good for rainfed crops.',
    recommendations: [
      { name: 'Cotton', image: 'https://placehold.co/400x250/F5F5DC/000000?text=Cotton', rationale: 'High moisture retention is critical for cotton cultivation.' },
      { name: 'Soybean', image: 'https://placehold.co/400x250/9ACD32/FFFFFF?text=Soybean', rationale: 'Thrives in black soil and has high market demand.' },
      { name: 'Sugarcane', image: 'https://placehold.co/400x250/3CB371/FFFFFF?text=Sugarcane', rationale: 'Requires high moisture, which black soil provides.' },
    ],
  },
  'Alluvial Soil': {
    soilType: 'Alluvial Soil',
    confidence: '97%',
    marketTrend: 'Strong demand for staple food grains.',
    soilMoisture: 'Good water retention, supports multiple irrigation cycles.',
    recommendations: [
      { name: 'Rice', image: 'https://placehold.co/400x250/F0E68C/000000?text=Rice', rationale: 'High fertility and water retention are ideal for rice paddies.' },
      { name: 'Wheat', image: 'https://placehold.co/400x250/DEB887/FFFFFF?text=Wheat', rationale: 'Loamy texture and balanced pH are perfect for wheat.' },
      { name: 'Maize', image: 'https://placehold.co/400x250/FFD700/000000?text=Maize', rationale: 'Benefits from the rich potash in alluvial soil.' },
    ],
  },
  'Laterite Soil': {
    soilType: 'Laterite Soil',
    confidence: '94%',
    marketTrend: 'Excellent for high-value plantation crops.',
    soilMoisture: 'Good drainage, requires careful water management.',
    recommendations: [
      { name: 'Tea', image: 'https://placehold.co/400x250/006400/FFFFFF?text=Tea', rationale: 'Thrives in acidic, well-drained soil conditions.' },
      { name: 'Coffee', image: 'https://placehold.co/400x250/6f4e37/FFFFFF?text=Coffee', rationale: 'Perfect for plantation on hilly slopes with laterite soil.' },
      { name: 'Cashew Nuts', image: 'https://placehold.co/400x250/d2b48c/000000?text=Cashew', rationale: 'Adapts well to laterite soil, a profitable choice.' },
    ],
  },
}

export default function DashboardPage() {
  const router = useRouter()

  // small auth guard
  useEffect(() => {
    if (typeof window === 'undefined') return
    const ok = localStorage.getItem('loggedIn') === 'true'
    if (!ok) router.replace('/login')
  }, [router])

  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const districtOptions = useMemo(() => DISTRICTS[state] || [], [state])

  const onFileChange = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const analyze = () => {
    if (!state || !district || !file) {
      alert('Please select a location and upload a soil image.')
      return
    }
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const keys = Object.keys(MOCK_RESULTS)
      const randKey = keys[Math.floor(Math.random() * keys.length)]
      setResult(MOCK_RESULTS[randKey])
      setLoading(false)
    }, 1500)
  }

  const logout = () => {
    localStorage.removeItem('loggedIn')
    router.push('/')
  }

  return (
  <div 
    className="min-h-screen bg-cover bg-center" 
    style={{ backgroundImage: "url('/farm1.jpg')" }}
  >
    <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-5xl">
      <header className="text-center mb-10 relative">
        <h1 className="text-4xl sm:text-5xl font-bold text-yellow-300">
          Smart Crop Advisory System
        </h1>
        <p className="text-md sm:text-lg text-green-200 mt-3">
          Empowering Farmers with AI-Powered, Data-Driven Insights
        </p>
        <button 
          onClick={logout} 
          className="absolute top-0 right-0 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 text-sm"
        >
          Logout
        </button>
      </header>

      {!loading && !result && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <div className="grid md:grid-cols-3 gap-6 text-center mb-8 border-b pb-8">
            <Step title="1. Select Location" subtitle="Choose your state and district." />
            <Step title="2. Upload Soil Image" subtitle="Provide a clear picture of your soil." />
            <Step title="3. Get Advisory" subtitle="Receive instant, personalized advice." />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Farms Location</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select
                    value={state}
                    onChange={(e) => { setState(e.target.value); setDistrict('') }}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  >
                    <option value="">Select State</option>
                    {Object.keys(DISTRICTS).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  >
                    <option value="">Select District</option>
                    {districtOptions.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Soil Image</h2>
                <label className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer hover:border-green-500 transition-colors duration-300">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-sm text-gray-600">Upload a file or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                  <input type="file" accept="image/*" onChange={onFileChange} className="sr-only" />
                </label>
              </div>
            </div>

            {preview && (
              <div className="mt-4 text-center lg:mt-0">
                <img src={preview} alt="Image Preview" className="max-h-80 w-auto mx-auto rounded-lg shadow-md" />
              </div>
            )}
          </div>

          <div className="text-center mt-8 pt-8 border-t">
            <button
              onClick={analyze}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-12 rounded-lg hover:from-green-700 hover:to-green-800 transition duration-300 transform hover:scale-105 shadow-md disabled:bg-gray-400"
              disabled={!state || !district || !file}
            >
              Get Advisory
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center p-8">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-700" />
          <p className="mt-4 text-gray-600 text-lg">Analyzing your soil, please wait a moment...</p>
        </div>
      )}

      {result && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mt-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Smart Crop Advisory</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-5 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-green-800">Soil Analysis</h3>
              <div className="space-y-2">
                <p className="text-gray-700"><strong>Predicted Soil Type:</strong> <span className="font-medium text-black bg-green-100 py-1 px-2 rounded">{result.soilType}</span></p>
                <p className="text-gray-700"><strong>Confidence:</strong> <span className="font-medium text-black">{result.confidence}</span></p>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-green-800">Local Insights</h3>
              <div className="space-y-2">
                <p className="text-gray-700"><strong>Market Trend:</strong> <span className="font-medium text-black">{result.marketTrend}</span></p>
                <p className="text-gray-700"><strong>Soil Moisture:</strong> <span className="font-medium text-black">{result.soilMoisture}</span></p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Top Crop Recommendations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.recommendations.map((crop, i) => (
              <CropCard key={i} crop={crop} />
            ))}
          </div>

          <div className="text-center mt-10">
            <button 
              onClick={() => { setResult(null); setLoading(false); }} 
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Start New Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
)

}

function Step({ title, subtitle }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-green-100 rounded-full p-4 mb-3" />
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  )
}

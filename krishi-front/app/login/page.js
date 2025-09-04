// app/login/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('farmer@test.com')
  const [password, setPassword] = useState('password')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) return alert('Please enter your credentials.')
    // mock auth
    localStorage.setItem('loggedIn', 'true')
    router.push('/')
    setTimeout(() => {
    window.location.reload()
  }, 50)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4"
    style={{ backgroundImage: "url('/farm.jpg')" , backgroundSize: "cover"}}>
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Login to access the Smart Crop Advisor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition duration-300 transform hover:scale-105 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

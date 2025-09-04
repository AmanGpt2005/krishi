'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/product' },
  { name: 'Test', href: '/dashboard' }, 
  { name: 'Weather', href: '/Weather' },
  { name: 'Marketplace', href: '/Marketplace' },
  { name: 'About', href: '/About' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoggedIn(localStorage.getItem('loggedIn') === 'true')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedIn')
    setLoggedIn(false)
    router.push('/login')
  }

  return (
    <div className="bg-gray-900 fixed w-full z-50">
      <header className="inset-x-0 top-0">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center">
              <img alt="Krishi Sahay" src="/logo.png" className="h-8 w-auto" />
              <span className="ml-2 text-white font-semibold">Krishi Sahay</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-white hover:text-indigo-400 transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side (Login / Profile) */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {loggedIn ? (
              <div className="flex items-center space-x-4">
                <img
                  src="/profile.png" // ✅ put profile.png inside /public
                  alt="Profile"
                  className="h-8 w-8 rounded-full border border-white"
                />
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-white hover:text-red-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-sm font-semibold text-white">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile sidebar */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                <img alt="Krishi Sahay" src="/logo.png" className="h-8 w-auto" />
                <span className="ml-2 text-white font-semibold">
                  Krishi Sahay
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {loggedIn ? (
                    <div className="flex items-center space-x-3">
                      <img
                        src="/profile.png"
                        alt="Profile"
                        className="h-8 w-8 rounded-full border border-white"
                      />
                      <button
                        onClick={handleLogout}
                        className="text-base font-semibold text-white hover:text-red-400"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-white/5"
                    >
                      Log in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  )
}

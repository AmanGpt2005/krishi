import Navbar from '@/components/Navbar'

export default function MarketplacePage() {
  return (
    <div
      className="h-screen bg-cover bg-center text-white flex flex-col justify-between"
      style={{ backgroundImage: "url('forest.jpg')" }}
    >
      {/* Top Navbar */}
      {/* <Navbar /> */}

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center text-center mt-30">
        <h1 className="text-6xl font-bold animate-bounce mb-4">COMING SOON</h1>
        <hr className="border-gray-300 w-2/5 my-4" />
        <p className="text-xl">Test will be available soon</p>
      </div>

      {/* Bottom Left Footer */}
      <div className="p-6 text-sm">
        Powered by{" "}
        <a
          href="https://www.w3schools.com/w3css/default.asp"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          KrishiSahay
        </a>
      </div>
    </div>
  )
}

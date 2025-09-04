import './globals.css'
import Navbar from '../components/Navbar'
// import Example from '../components/Example'



export const metadata = {
  title: 'Krishi Sahay',
  description: 'Smart Crop Management App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />  
        <main className="pt-20"> 
          {children}
        </main>
      </body>
    </html>
  )
}

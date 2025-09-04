import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './user/components/Navbar'
import Footer from './user/components/Footer'
import { Toaster } from 'react-hot-toast'

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="relative min-h-screen bg-[#1E1B2E] text-white overflow-hidden">
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <main className="relative z-0 min-h-screen">
        <Outlet />
      </main>
      {!isHome && <Footer />}
    </div>
  )
}

export default App

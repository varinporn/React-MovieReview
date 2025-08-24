import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './user/components/Navbar'
import Footer from './user/components/Footer'

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="relative min-h-screen bg-[#1E1B2E] text-white overflow-hidden">
      <Navbar />
      <main className="relative z-0">
        <Outlet />
      </main>
      {!isHome && <Footer />}
    </div>
  )
}

export default App

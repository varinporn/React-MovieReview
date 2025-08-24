import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './user/components/Navbar'
import Footer from './user/components/Footer'

function App() {
  return (
    <div className="relative min-h-screen bg-[#1E1B2E] text-white overflow-hidden">
      <Navbar />
      <main className="relative z-0">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default App

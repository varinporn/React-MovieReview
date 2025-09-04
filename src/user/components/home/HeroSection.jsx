import React from 'react'
import { Link } from 'react-router-dom'
const bgImage =
  'https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 px-6 py-1.5 w-max inline-block border border-white rounded-full text-base text-white bg-white/20 backdrop-blur-sm">
          Trusted Review By 10,000+ users
        </div>

        <h1 className="text-5xl font-bold leading-tight text-white mb-6">
          The Voice <br /> Behind the Screen.
        </h1>
        <Link to={'/all'} className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition active:bg-gray-400">
          Explore More
        </Link>
      </div>
    </div>
  )
}

export default HeroSection

import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

const Navbar = () => {
  const location = useLocation()
  const [selectedMenu, setSelectedMenu] = useState('Menu')

  const menu = [
    { link: 'All Shows', path: '/all' },
    { link: 'Movies', path: '/movies' },
    { link: 'TV Shows', path: '/tv-show' },
  ]

  useEffect(() => {
    const found = menu.find((item) => item.path === location.pathname)
    setSelectedMenu(found ? found.link : 'Menu')
  }, [location.pathname])

  return (
    <nav className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl bg-white/50 backdrop-blur-md rounded-full px-8 py-4 flex items-center justify-between shadow-md z-10">
      {/* Left Section */}
      <div className="flex items-center space-x-12 ml-8">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-900 cursor-pointer">
          StreamTeller.
        </Link>

        <div className="relative group">
          <button className="text-gray-900 font-medium flex items-center space-x-1 cursor-pointer">
            <span>{selectedMenu}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          <div className="absolute left-0 top-full mt-2 w-40 bg-white text-black rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
            {menu.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setSelectedMenu(link)}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* watch list btn */}
        <Link
          to="/watch-list"
          className="text-gray-900 font-medium cursor-pointer"
        >
          Watch List
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-12 mr-8">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-6 pr-10 py-1 rounded-full bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF79C6]"
          />
          <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
        </div>

        {/* Sign Up */}
        <button className="px-6 py-1 bg-white border border-black text-black font-semibold rounded-full hover:bg-gray-100 transition">
          Sign Up
        </button>
      </div>
    </nav>
  )
}

export default Navbar

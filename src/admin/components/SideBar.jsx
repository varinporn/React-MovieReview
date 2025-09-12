import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div>
      <aside
        id="logo-sidebar"
        className="sticky top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#E3DDFF]">
          <a href="#" className="flex items-center ps-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-[#1E1B2E]">
              StreamTeller.
            </span>
          </a>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={'/admin/manage-shows'}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <svg
                  className="shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 22"
                >
                  <path d="M4 4L6 8H9L7 4H9L11 8H14L12 4H14L16 8H19L17 4H20C20.55 4 21.021 4.196 21.413 4.588C21.805 4.98 22.0007 5.45067 22 6V18C22 18.55 21.8043 19.021 21.413 19.413C21.0217 19.805 20.5507 20.0007 20 20H4C3.45 20 2.97933 19.8043 2.588 19.413C2.19667 19.0217 2.00067 18.5507 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.98 4.19667 3.45067 4.00067 4 4Z" />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Shows</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default SideBar

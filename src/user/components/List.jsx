import React, { useState,useEffect } from 'react'
import GridView from './GridView'
import ListView from './ListView'

const List = ({ selectedMenu, shows }) => {
  const result = shows.length

  const [selectedView, setSelectedView] = useState(() => {
    return localStorage.getItem('selectedView') || 'gallery'
  })

  useEffect(() => {
    localStorage.setItem('selectedView', selectedView)
  }, [selectedView])

  return (
    <div className="text-[#1E1B2E] space-y-6">
      <h3 className="font-semibold text-4xl pt-6">{selectedMenu}</h3>

      {/* Header section */}
      <div className="flex items-center justify-between">
        <span className="font-medium text-lg">{result} Results</span>

        {/* View toggle */}
        <div className="space-x-4 font-medium text-sm">
          <button
            onClick={() => setSelectedView('list')}
            className={`p-1 cursor-pointer ${
              selectedView === 'list' ? 'bg-gray-200 rounded-full' : ''
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H3.01M3 18H3.01M3 6H3.01M8 12H21M8 18H21M8 6H21"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={() => setSelectedView('gallery')}
            className={`p-1 cursor-pointer ${
              selectedView === 'gallery' ? 'bg-gray-200 rounded-full' : ''
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 13C9.53043 13 10.0391 13.2107 10.4142 13.5858C10.7893 13.9609 11 14.4696 11 15V19C11 19.5304 10.7893 20.0391 10.4142 20.4142C10.0391 20.7893 9.53043 21 9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15C3 14.4696 3.21071 13.9609 3.58579 13.5858C3.96086 13.2107 4.46957 13 5 13H9ZM19 13C19.5046 12.9998 19.9906 13.1904 20.3605 13.5335C20.7305 13.8766 20.9572 14.3468 20.995 14.85L21 15V19C21.0002 19.5046 20.8096 19.9906 20.4665 20.3605C20.1234 20.7305 19.6532 20.9572 19.15 20.995L19 21H15C14.4954 21.0002 14.0094 20.8096 13.6395 20.4665C13.2695 20.1234 13.0428 19.6532 13.005 19.15L13 19V15C12.9998 14.4954 13.1904 14.0094 13.5335 13.6395C13.8766 13.2695 14.3468 13.0428 14.85 13.005L15 13H19ZM9 15H5V19H9V15ZM19 15H15V19H19V15ZM19 3C19.5046 2.99984 19.9906 3.19041 20.3605 3.5335C20.7305 3.87659 20.9572 4.34684 20.995 4.85L21 5V9C21.0002 9.50458 20.8096 9.99057 20.4665 10.3605C20.1234 10.7305 19.6532 10.9572 19.15 10.995L19 11H15C14.4954 11.0002 14.0094 10.8096 13.6395 10.4665C13.2695 10.1234 13.0428 9.65315 13.005 9.15L13 9V5C12.9998 4.49542 13.1904 4.00943 13.5335 3.63945C13.8766 3.26947 14.3468 3.04284 14.85 3.005L15 3H19ZM9 3C9.50458 2.99984 9.99057 3.19041 10.3605 3.5335C10.7305 3.87659 10.9572 4.34684 10.995 4.85L11 5V9C11.0002 9.50458 10.8096 9.99057 10.4665 10.3605C10.1234 10.7305 9.65315 10.9572 9.15 10.995L9 11H5C4.49542 11.0002 4.00943 10.8096 3.63945 10.4665C3.26947 10.1234 3.04284 9.65315 3.005 9.15L3 9V5C2.99984 4.49542 3.19041 4.00943 3.5335 3.63945C3.87659 3.26947 4.34684 3.04284 4.85 3.005L5 3H9ZM19 5H15V9H19V5ZM9 5H5V9H9V5Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Conditional rendering */}
      <div>
        {selectedView === 'gallery' ? (
          <GridView shows={shows} page="list" />
        ) : (
          <ListView shows={shows} />
        )}
      </div>
    </div>
  )
}

export default List

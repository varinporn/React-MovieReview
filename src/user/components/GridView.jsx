import React from 'react'
import { Link } from 'react-router-dom'

const MovieGallery = ({ shows, page }) => {
  return (
    <div>
      {/* card */}
      <div className="grid grid-cols-4 gap-5">
        {shows.map((show) => (
          <div
            key={show.id}
            className="rounded-2xl py-4 space-y-2 px-4 shadow-md"
            style={{
              backgroundColor: page === 'landing' ? '#302E3D' : '#FFFFFF',
            }}
          >
            {/* image */}
            <div className="h-80 mb-4">
              <img
                src={show.imageUrl}
                alt={show.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* star */}
            <div className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.36875 16.5L5.5875 11.2313L1.5 7.6875L6.9 7.21875L9 2.25L11.1 7.21875L16.5 7.6875L12.4125 11.2313L13.6313 16.5L9 13.7063L4.36875 16.5Z"
                  fill="#DFB51F"
                />
              </svg>
              <span>{show.rating || '-'}</span>
            </div>
            {/* title */}
            <h3 className="font-medium text-base">{show.title}</h3>

            <div className="font-medium text-[#B1B1B1]">
              {/* year */}
              <h5>{show.year || '-'}</h5>
            </div>

            {/* detail btn */}
            <div className="flex justify-center pt-2">
              <Link
                to={`/title/${show.id}`}
                className={`w-[90%] px-12 py-1.5 rounded-full cursor-pointer text-center ${
                  page === 'landing'
                    ? 'bg-[#454255] text-[#BD93F9] hover:bg-[#63616D] hover:text-[#1E1B2E] active:bg-[#817F90] active:text-[#1E1B2E]'
                    : 'bg-[#E6E6E6] text-[#A363FF] hover:bg-[#F1F1F1] hover:text-[#C09BF5] active:bg-[#F9F9F9]'
                }`}
              >
                Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieGallery

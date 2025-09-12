import React from 'react'
import { Star } from 'lucide-react'

const RatePopup = ({
  title,
  newRating,
  setNewRating,
  hover,
  setHover,
  handleRateSubmit,
  existingReview,
}) => {
  return (
    <div className="text-center flex flex-col">
      <h4 className="uppercase text-[#FF79C6] font-semibold tracking-wide">
        Rate this
      </h4>
      <h2 className="text-2xl md:text-3xl font-bold text-[#1E1B2E] mt-2 mb-6">
        {title}
      </h2>
      <div className="flex justify-center gap-1 mb-6">
        {Array.from({ length: 10 }).map((_, i) => {
          const starValue = i + 1
          return (
            <button
              key={i}
              type="button"
              onClick={() => setNewRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              className="focus:outline-none transform hover:scale-110 transition-transform"
            >
              <Star
                size={28}
                fill={starValue <= (hover || newRating) ? '#FF79C6' : 'none'}
                stroke={
                  starValue <= (hover || newRating) ? '#FF79C6' : '#C4C4C4'
                }
              />
            </button>
          )
        })}
      </div>
      <button
        onClick={() => handleRateSubmit(newRating)}
        className={`py-2 bg-[#FF79C6] hover:bg-[#e657b5] text-white font-semibold rounded-lg transition-colors
    ${
      existingReview?.rating && existingReview.rating === newRating
        ? 'opacity-50 cursor-not-allowed'
        : 'cursor-pointer'
    }
  `}
        disabled={existingReview?.rating && existingReview.rating === newRating}
      >
        Rate
      </button>
    </div>
  )
}

export default RatePopup

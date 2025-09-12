import React from 'react'
import { Star } from 'lucide-react'

const ReviewPopup = ({
  newRating,
  setNewRating,
  hover,
  setHover,
  reviewTitle,
  setReviewTitle,
  reviewMessage,
  setReviewMessage,
  handleRateSubmit,
  onClose,
}) => {
  const isFormValid = () => {
    return (
      reviewMessage.trim().length >= 200 &&
      reviewMessage.trim().length <= 800 &&
      reviewTitle &&
      newRating
    )
  }

  return (
    <div className="text-[#1E1B2E]">
      <h1 className="text-lg font-semibold mb-6">Add Your Review</h1>
      <div className="flex flex-col space-y-4">
        {/* Rating */}
        <div>
          <div className="flex justify-between items-center">
            <h3 className="font-semibold mb-4">Your Rating</h3>
            <p>
              {newRating || '?'} <span className="text-[#AAAAAA]">/10</span>
            </p>
          </div>
          <div className="flex justify-center gap-1">
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
                    fill={
                      starValue <= (hover || newRating) ? '#FF79C6' : 'none'
                    }
                    stroke={
                      starValue <= (hover || newRating) ? '#FF79C6' : '#C4C4C4'
                    }
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="font-semibold">Title of review</h3>
          <input
            type="text"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            className="py-2 px-4 border rounded-md w-full border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#FF79C6]"
          />
        </div>

        {/* Review Message */}
        <div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Review</h3>
              <p className="text-[#AAAAAA] text-sm">
                Minimum 200 characters required.
              </p>
            </div>
            <textarea
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              className="py-2 px-4 border rounded-md w-full border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#FF79C6] h-[150px]"
            />
          </div>
          <div className="flex justify-end text-[#AAAAAA] text-sm">
            {reviewMessage.length}/800
          </div>
        </div>

        <button
          onClick={() =>
            handleRateSubmit(newRating, reviewMessage, reviewTitle)
          }
          disabled={!isFormValid()}
          className={`py-2 font-semibold bg-[#FF79C6] hover:bg-[#e657b5] text-white rounded-lg transition-colors ${
            isFormValid() ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="py-2 bg-[#EBEBEB] hover:bg-[#C6C6C6] text-[#1E1B2E] font-semibold rounded-lg transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ReviewPopup

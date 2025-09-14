import React from 'react'
import ReviewCard from './ReviewCard'

const ReviewLayout = ({ reviews, page }) => {
  return (
    <div className="flex overflow-x-auto gap-4 p-4 scrollbar-hide">
      {reviews.map((review) => (
        <ReviewCard key={review.id} reviews={[review]} page={page} />
      ))}
    </div>
  )
}

export default ReviewLayout

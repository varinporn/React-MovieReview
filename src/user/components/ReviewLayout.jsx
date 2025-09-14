import React from 'react'
import ReviewCard from './ReviewCard'

const ReviewLayout = ({ reviews }) => {
  return (
    <div className="flex overflow-x-auto gap-4 p-4 scrollbar-hide">
      {reviews.map((review) => (
        <ReviewCard key={review.id} reviews={[review]} />
      ))}
    </div>
  )
}

export default ReviewLayout

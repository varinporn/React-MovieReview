import React from 'react'
import ReviewCard from './ReviewCard'

const LatestReview = ({ reviews }) => {
  return (
    <div className="grid grid-cols-3 gap-y-8">
      {reviews.map((review) => (
        <ReviewCard key={review.id} reviews={[review]} />
      ))}
    </div>
  )
}

export default LatestReview

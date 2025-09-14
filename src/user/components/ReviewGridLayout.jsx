import React from 'react'
import ReviewCard from './ReviewCard'

const ReviewGridLayout = ({ reviews }) => {
  return (
    <div className="flex flex-col gap-4 p-4 scrollbar-hide">
      {reviews.map((review) => (
        <ReviewCard key={review.id} reviews={[review]} width='w-2/3' messageLength=''/>
      ))}
    </div>
  )
}

export default ReviewGridLayout

import React from 'react'
import ReviewCard from '../ReviewCard'

const LatestReview = () => {
  return (
    <div className="w-[full] h-screen pt-16 pb-10 px-20 bg-[#F8F8F2]">
      <h2 className='font-semibold text-4xl mb-10 text-center text-[#1E1B2E]'> Latest Review </h2>
      <ReviewCard/>
    </div>
  )
}

export default LatestReview

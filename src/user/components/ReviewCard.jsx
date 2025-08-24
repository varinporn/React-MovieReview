import React from 'react'
import { FaStar } from 'react-icons/fa6'

const ReviewCard = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="shadow-lg bg-white py-8 px-4 md:m-5 rounded-lg">
        <div className="space-y-6">
          <div className="text-amber-400 flex gap-2 items-center">
            <FaStar />
            <span>7.0</span>
          </div>

          {/* text */}
          <div className="mt-8 text-black">
            <p className="mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              eos cupiditate laborum vitae reprehenderit ullam, voluptatem
              voluptatibus aut assumenda! Fugit, nesciunt quidem cumque porro
              quis laboriosam quisquam totam pariatur voluptas.
            </p>

            <h5 className="text-lg font-medium">Mark Lee</h5>
            <p className="text-base">CEO, SM Company</p>
          </div>
        </div>
      </div>

      <div className="shadow-lg bg-white py-8 px-4 md:m-5 rounded-lg">
        <div className="space-y-6">
          <div className="text-amber-400 flex gap-2 items-center">
            <FaStar />
            <span>7.0</span>
          </div>

          {/* text */}
          <div className="mt-8 text-black">
            <p className="mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              eos cupiditate laborum vitae reprehenderit ullam, voluptatem
              voluptatibus aut assumenda! Fugit, nesciunt quidem cumque porro
              quis laboriosam quisquam totam pariatur voluptas.
            </p>

            <h5 className="text-lg font-medium">Mark Lee</h5>
            <p className="text-base">CEO, SM Company</p>
          </div>
        </div>
      </div>

      <div className="shadow-lg bg-white py-8 px-4 md:m-5 rounded-lg">
        <div className="space-y-6">
          <div className="text-amber-400 flex gap-2 items-center">
            <FaStar />
            <span>7.0</span>
          </div>

          {/* text */}
          <div className="mt-8 text-black">
            <p className="mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              eos cupiditate laborum vitae reprehenderit ullam, voluptatem
              voluptatibus aut assumenda! Fugit, nesciunt quidem cumque porro
              quis laboriosam quisquam totam pariatur voluptas.
            </p>

            <h5 className="text-lg font-medium">Mark Lee</h5>
            <p className="text-base">CEO, SM Company</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard

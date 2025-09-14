import React, { useState, useEffect } from 'react'
import { FaStar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const ReviewCard = ({
  reviews,
  width = 'w-100',
  messageLength = 'line-clamp-4',
  page = '',
}) => {
  const API_URL = import.meta.env.VITE_API_URL
  const [users, setUsers] = useState([])
  const [shows, setShows] = useState([])

  const getUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`)
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error('Failed to fetch shows:', error)
    }
  }

  const getShows = async () => {
    try {
      const res = await fetch(`${API_URL}/shows`)
      const data = await res.json()
      setShows(data)
    } catch (error) {
      console.error('Failed to fetch shows:', error)
    }
  }

  useEffect(() => {
    getShows()
    getUsers()
  }, [])

  const getUsername = (userId) => {
    const user = users.find((u) => String(u.id) === userId)
    return user ? user.username : 'Unknown'
  }

  const getTitle = (showId) => {
    const show = shows.find((s) => String(s.id) === showId)
    return show ? show.title : 'Unknown'
  }

  const review = reviews[0]

  return (
    <div
      className={`${width} flex-shrink-0 shadow-lg bg-white py-6 px-4 rounded-lg`}
    >
      <div className="space-y-2">
        <div className="text-amber-400 flex gap-2 items-center">
          <FaStar />
          <span>{review.rating}</span>
        </div>
        <div className="text-black">
          <h3 className="mb-2 font-medium text-lg">{review.title}</h3>
          <p className={`mb-5 ${messageLength}`}>{review.message}</p>

          <div className="flex justify-between items-center">
            {page === 'detail' ? (
              <div className="flex items-center space-x-2">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="30" height="30" rx="15" fill="#EADDFF" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.5002 12C19.5002 14.4853 17.4855 16.5 15.0002 16.5C12.5149 16.5 10.5002 14.4853 10.5002 12C10.5002 9.51472 12.5149 7.5 15.0002 7.5C17.4855 7.5 19.5002 9.51472 19.5002 12ZM18.0002 12C18.0002 13.6569 16.657 15 15.0002 15C13.3433 15 12.0002 13.6569 12.0002 12C12.0002 10.3431 13.3433 9 15.0002 9C16.657 9 18.0002 10.3431 18.0002 12Z"
                    fill="#4F378A"
                  />
                  <path
                    d="M15.0002 18.75C10.1444 18.75 6.00714 21.6213 4.43115 25.644C4.81507 26.0253 5.21951 26.3859 5.64265 26.724C6.8162 23.0308 10.4977 20.25 15.0002 20.25C19.5027 20.25 23.1842 23.0308 24.3577 26.7241C24.7809 26.3859 25.1853 26.0253 25.5692 25.644C23.9932 21.6213 19.856 18.75 15.0002 18.75Z"
                    fill="#4F378A"
                  />
                </svg>

                <h5 className="text-base font-medium">
                  {getUsername(review.userId)}
                </h5>
              </div>
            ) : (
              <Link to={`/title/${review.showId}`}>
                <h5 className="font-semibold">{getTitle(review.showId)}</h5>
              </Link>
            )}
            <span className="text-sm text-[#C8C8C8]">{review.date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard

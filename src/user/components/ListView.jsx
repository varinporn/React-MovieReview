import React, { useState, useEffect } from 'react'
import { useUser } from '../../context/UserContext.jsx'
import { Link } from 'react-router-dom'
import WatchlistButton from './WatchListButton'

const ListView = ({ shows }) => {
  const { user, setUser } = useUser()

  // แยก state added สำหรับแต่ละ show
  const [addedList, setAddedList] = useState({})

  useEffect(() => {
    if (user?.watchlist) {
      const newAddedList = {}
      shows.forEach((show) => {
        newAddedList[show.id] = user.watchlist.includes(show.id)
      })
      setAddedList(newAddedList)
    }
  }, [user, shows])

  const setAddedForShow = (id, value) => {
    setAddedList((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <div className="space-y-3">
      {shows.map((show) => (
        <div
          key={show.id}
          className="w-[90%] max-w-5xl shadow-md rounded-xl px-6 py-4 flex items-start gap-6 bg-white"
        >
          {/* Image */}
          <div className="w-[160px] h-[220px] overflow-hidden rounded-lg">
            <img
              src={show.imageUrl}
              alt={show.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info section */}
          <div className="flex-1 space-y-2 mt-4">
            {/* Title and Year */}
            <div className="flex items-center justify-between pr-10">
              <Link to={`/title/${show.id}`}>
                <h3 className="text-xl font-semibold">{show.title}</h3>
              </Link>
              <span className="text-gray-500">{show.year || '-'}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 text-lg font-medium">
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.36875 17.8334L5.5875 12.1849L1.5 8.38573L6.9 7.88319L9 2.55634L11.1 7.88319L16.5 8.38573L12.4125 12.1849L13.6313 17.8334L9 14.8383L4.36875 17.8334Z"
                  fill="#DFB51F"
                />
              </svg>
              <span>{show.rating}</span>

              <WatchlistButton
                id={show.id}
                title={show.title}
                user={user}
                setUser={setUser}
                added={addedList[show.id] || false}
                setAdded={(value) => setAddedForShow(show.id, value)}
                variant="list"
              />
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm pr-10">{show.description}</p>

            {/* Tags */}
            <div className="flex gap-2 pt-1">
              {show.genres?.map((genre) => (
                <span className="bg-gray-200 text-sm text-gray-700 px-3 py-1 rounded-md">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Info Icon */}
          <div className="pt-1.5">
            <Link to={`/title/${show.id}`}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9999 15.5833C11.2596 15.5833 11.4775 15.4953 11.6535 15.3193C11.8295 15.1433 11.9172 14.9258 11.9166 14.6666V11C11.9166 10.7403 11.8286 10.5227 11.6526 10.3473C11.4766 10.1719 11.259 10.0839 10.9999 10.0833C10.7408 10.0827 10.5233 10.1707 10.3473 10.3473C10.1713 10.5239 10.0833 10.7415 10.0833 11V14.6666C10.0833 14.9264 10.1713 15.1442 10.3473 15.3202C10.5233 15.4962 10.7408 15.5839 10.9999 15.5833ZM10.9999 8.24998C11.2596 8.24998 11.4775 8.16198 11.6535 7.98598C11.8295 7.80998 11.9172 7.59242 11.9166 7.33331C11.916 7.0742 11.828 6.85665 11.6526 6.68065C11.4772 6.50465 11.2596 6.41665 10.9999 6.41665C10.7402 6.41665 10.5226 6.50465 10.3473 6.68065C10.1719 6.85665 10.0839 7.0742 10.0833 7.33331C10.0826 7.59242 10.1706 7.81029 10.3473 7.9869C10.5239 8.16351 10.7414 8.2512 10.9999 8.24998ZM10.9999 20.1666C9.73186 20.1666 8.5402 19.9259 7.42492 19.4443C6.30964 18.9628 5.3395 18.3098 4.5145 17.4854C3.6895 16.661 3.03653 15.6909 2.55559 14.575C2.07464 13.4591 1.83386 12.2674 1.83325 11C1.83264 9.73254 2.07342 8.54087 2.55559 7.42498C3.03775 6.30909 3.69073 5.33895 4.5145 4.51456C5.33828 3.69017 6.30842 3.0372 7.42492 2.55565C8.54142 2.07409 9.73309 1.83331 10.9999 1.83331C12.2668 1.83331 13.4584 2.07409 14.5749 2.55565C15.6914 3.0372 16.6616 3.69017 17.4853 4.51456C18.3091 5.33895 18.9624 6.30909 19.4452 7.42498C19.9279 8.54087 20.1684 9.73254 20.1666 11C20.1648 12.2674 19.924 13.4591 19.4443 14.575C18.9645 15.6909 18.3116 16.661 17.4853 17.4854C16.6591 18.3098 15.689 18.9631 14.5749 19.4452C13.4609 19.9274 12.2692 20.1679 10.9999 20.1666ZM10.9999 18.3333C13.0471 18.3333 14.7812 17.6229 16.202 16.2021C17.6228 14.7812 18.3333 13.0472 18.3333 11C18.3333 8.95276 17.6228 7.21873 16.202 5.7979C14.7812 4.37706 13.0471 3.66665 10.9999 3.66665C8.9527 3.66665 7.21867 4.37706 5.79784 5.7979C4.377 7.21873 3.66659 8.95276 3.66659 11C3.66659 13.0472 4.377 14.7812 5.79784 16.2021C7.21867 17.6229 8.9527 18.3333 10.9999 18.3333Z"
                  fill="#574AA0"
                />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListView

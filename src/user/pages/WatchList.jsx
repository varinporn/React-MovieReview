import React, { useState, useEffect } from 'react'
import { useUser } from '../../context/UserContext.jsx'
import List from '../components/List'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

const WatchList = () => {
  const API_URL = import.meta.env.VITE_API_URL

  const { user } = useUser()
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllMovies = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/shows`)
      const data = await res.json()
      setShows(data)
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllMovies()
  }, [user])

  const watchlistShows = user?.watchlist
    ? shows.filter((show) => user.watchlist.includes(show.id))
    : []

  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : user ? (
        watchlistShows.length > 0 ? (
          <div className="my-[150px] min-h-screen mx-auto bg-[#F8F8F2] rounded-2xl max-w-7xl px-18 py-10">
            <List shows={watchlistShows} />
          </div>
        ) : (
          <div className="min-h-screen mx-auto rounded-2xl max-w-7xl flex items-center justify-center">
            <h2 className="text-xl font-semibold text-center">
              Your watchlist is empty.
            </h2>
          </div>
        )
      ) : (
        <div className="min-h-screen mx-auto rounded-2xl max-w-7xl flex items-center justify-center">
          <h2 className="text-xl font-semibold text-center">
            Sign in for more access.
          </h2>
        </div>
      )}
    </div>
  )
}

export default WatchList

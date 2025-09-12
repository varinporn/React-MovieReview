import React, { useState, useEffect } from 'react'
import List from '../components/List'
import LoadingSpinner from '../components/LoadingSpinner'

const Show = () => {
  const API_URL = import.meta.env.VITE_API_URL

  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(false)

  const getAllMovies = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/shows`)
      const data = await res.json()
      setShows(data.filter((item) => item.category === 'TV Shows'))
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllMovies()
  }, [])

  return (
    <div className="w-full">
      <div className="my-[150px] mx-auto bg-[#F8F8F2] rounded-2xl max-w-7xl px-18 py-10">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <List selectedMenu="TV Shows" shows={shows} />
        )}
      </div>
    </div>
  )
}

export default Show

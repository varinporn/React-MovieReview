import React, { useState, useEffect } from 'react'
import List from '../components/List'

const AllList = () => {
  const [shows, setShows] = useState([])
  const getAllMovies = async () => {
    try {
      const res = await fetch('http://localhost:5001/shows')
      const data = await res.json()
      setShows(data)
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    }
  }

  useEffect(() => {
    getAllMovies()
  }, [])

  return (
    <div className="w-full">
      <div className="my-[150px] mx-auto bg-[#F8F8F2] rounded-2xl max-w-7xl px-18 py-10">
        <List selectedMenu="All Shows" shows={shows} />
      </div>
    </div>
  )
}

export default AllList

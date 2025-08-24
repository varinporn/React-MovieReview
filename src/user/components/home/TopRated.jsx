import React, { useState, useEffect } from 'react'
import GridView from '../GridView'

const TopRated = () => {
  const [shows, setShows] = useState([])
  useEffect(() => {
    fetch('http://localhost:5001/shows')
      .then((res) => res.json())
      .then((data) => setShows(data.slice(0, 4)))
  }, [])

  return (
    <div className="w-[full] h-screen pt-34 px-20">
      <h2 className="font-semibold text-4xl mb-12 text-center">
        Top Rated Shows
      </h2>

      <GridView shows={shows} page='landing' />
    </div>
  )
}

export default TopRated

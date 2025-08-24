import React, { useState, useEffect } from 'react'
import List from '../components/List'

const AllList = () => {
  const [shows, setShows] = useState([])
  useEffect(() => {
    fetch('http://localhost:5001/shows')
      .then((res) => res.json())
      .then((data) =>
        setShows(data)
      )
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

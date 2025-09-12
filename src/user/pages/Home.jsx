import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GridView from '../components/GridView'
import ReviewCard from '../components/ReviewCard'
import { motion } from 'framer-motion'

const Home = () => {
  const API_URL = import.meta.env.VITE_API_URL

  const bgImage =
    'https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  const [shows, setShows] = useState([])

  const getShows = async () => {
    try {
      const res = await fetch(`${API_URL}/shows`)
      const data = await res.json()
      setShows(data.slice(0, 4))
    } catch (error) {
      console.error('Failed to fetch shows:', error)
    }
  }

  useEffect(() => {
    getShows()
  }, [])

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* Hero Section */}
      <section
        className="h-screen snap-start relative w-full flex flex-col items-center justify-center text-center px-4"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="mb-4 px-6 py-1.5 w-max inline-block border border-white rounded-full text-base text-white bg-white/20 backdrop-blur-sm">
            Trusted Review By 10,000+ users
          </div>
          <h1 className="text-5xl font-bold leading-tight text-white mb-6">
            The Voice <br /> Behind the Screen.
          </h1>
          <Link
            to={'/all'}
            className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition active:bg-gray-400"
          >
            Explore More
          </Link>
        </motion.div>
        <div className="absolute inset-0 bg-black/60 z-0" />
      </section>

      {/* Top Rated Section */}
      <section className="h-screen snap-start w-full pt-34 px-20 bg-[#1E1B2E]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-full"
        >
          <h2 className="font-semibold text-4xl mb-12 text-center">
            Top Rated Shows
          </h2>
          <GridView shows={shows} page="landing" />
        </motion.div>
      </section>

      <section className="h-screen snap-start w-full pt-34 px-20 bg-[#F8F8F2]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-full"
        >
          <h2 className="font-semibold text-4xl mb-12 text-center text-[#1E1B2E]">
            Top Rated Shows
          </h2>
        </motion.div>
      </section>
    </div>
  )
}

export default Home

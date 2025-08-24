import React from 'react'
import HeroSection from '../components/home/HeroSection'
import TopRated from '../components/home/TopRated'
import LatestReview from '../components/home/LatestReview'
import Special from '../components/home/Special'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <TopRated/>
      <LatestReview/>
      <Special/>
    </div>
  )
}

export default Home
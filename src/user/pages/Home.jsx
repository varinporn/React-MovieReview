import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TopRated from '../components/home/TopRated';
import LatestReview from '../components/home/LatestReview';
import Special from '../components/home/Special';

const Home = () => {
  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
      }}
    >
      <section style={{ height: '100vh', scrollSnapAlign: 'start' }}>
        <HeroSection />
      </section>
      <section style={{ height: '100vh', scrollSnapAlign: 'start' }}>
        <TopRated />
      </section>
      <section style={{ height: '100vh', scrollSnapAlign: 'start' }}>
        <LatestReview />
      </section>
      <section style={{ height: '100vh', scrollSnapAlign: 'start' }}>
        <Special />
      </section>
    </div>
  );
};

export default Home;

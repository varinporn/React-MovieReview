import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TopRated from '../components/home/TopRated';
import LatestReview from '../components/home/LatestReview';
import Special from '../components/home/Special';
import { motion } from 'framer-motion';

const sections = [
  { id: 1, SectionComponent: HeroSection },
  { id: 2, SectionComponent: TopRated },
  { id: 3, SectionComponent: LatestReview },
  { id: 4, SectionComponent: Special },
];

const Home = () => {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {sections.map(({ id, SectionComponent }) => (
        <section key={id} className="h-screen snap-start">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-full"
          >
            <SectionComponent />
          </motion.div>
        </section>
      ))}
    </div>
  );
};

export default Home;

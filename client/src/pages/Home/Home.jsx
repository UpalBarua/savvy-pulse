import React from 'react';
import Footer from '../../components/Footer/Footer';
import Advertisement from './Advertisement/Advertisement';
import Categories from './Categories/Categories';
import Hero from './Hero/Hero';
import Newsletter from './Newsletter/Newsletter';

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Advertisement />
      <Newsletter />
    </>
  );
};

export default Home;

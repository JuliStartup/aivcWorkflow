import React from 'react';
import Products from 'src/pages/Services/Products';
import '../../App.css';
import Footer from '../Footer/Footer';
import HeroSection from '../HeroSection';
import Navbar from '../Navbar/Navbar';

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Products />
      <Footer />
    </>
  );
}

export default Home;

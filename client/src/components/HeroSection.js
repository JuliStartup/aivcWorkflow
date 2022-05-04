import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimeVideo from 'src/pages/AnimeVideo';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  const history = useNavigate();
  const goToServices = (e) => {
    e.preventDefault();
    history('/services');
  };
  return (
    <div className="hero-container">
      <AnimeVideo />
      <h2>Allrise Immigration & Visa Consultancy Ltd.</h2>
      <p>(AIVC)</p>
      <p>
        <em>Making Dreams Come Alive</em>
      </p>
      <div className="hero-btns">
        <Button
          className="btns"
          onClick={goToServices}
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;

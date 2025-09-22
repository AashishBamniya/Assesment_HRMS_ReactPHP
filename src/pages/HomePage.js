import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import FeedScroll from '../components/FeedScroll'; // Import the new component
import './css/HomePage.css';

const HomePage = () => {
  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <ImageCarousel />
        <FeedScroll /> {/* Use the new component here */}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
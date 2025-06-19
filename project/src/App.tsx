import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Loader from './components/Loader';
import TextIntro from './components/TextIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import EmbodiedCarbon from './components/EmbodiedCarbon';
import Carousel from './components/Carousel';
import Testimonials from './components/Testimonials';
import Features from './components/Features';
import Footer from './components/Footer';
import CursorWaterEffect from './components/CursorWaterEffect';
import WaterBackground3D from './components/WaterBackground3D';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showTextIntro, setShowTextIntro] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    // Hide loader after 6 seconds
    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
      setShowTextIntro(true);
    }, 6000);

    return () => clearTimeout(loaderTimer);
  }, []);

  const handleTextIntroComplete = () => {
    setShowTextIntro(false);
    setShowMainContent(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 relative">
        {/* 3D Water Background */}
        <WaterBackground3D />
        
        {/* Cursor Water Effect */}
        <CursorWaterEffect />
        
        <Loader isLoading={isLoading} />
        
        <TextIntro 
          isVisible={showTextIntro} 
          onComplete={handleTextIntroComplete} 
        />

        {showMainContent && (
          <div className="relative z-10">
            <Navbar />
            <main>
              <Hero />
              <Stats />
              <EmbodiedCarbon />
              <Carousel />
              <Testimonials />
              <Features />
            </main>
            <Footer />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
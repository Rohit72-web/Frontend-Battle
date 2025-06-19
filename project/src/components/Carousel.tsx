import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BarChart3, Users, Zap } from 'lucide-react';

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const cards = [
    {
      id: 1,
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive data visualization with real-time metrics and insights.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      icon: Users,
      title: 'Team Collaboration',
      description: 'Seamless teamwork with advanced sharing and communication tools.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Lightning-fast processing with optimized algorithms and caching.',
      color: 'from-green-500 to-green-600'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <section id="carousel" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Our Solutions
          </h2>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Cards Container */}
          <div className="flex items-center space-x-8 overflow-hidden">
            {cards.map((card, index) => {
              const Icon = card.icon;
              const position = (index - currentIndex + cards.length) % cards.length;
              let scale = 'scale-75';
              let opacity = 'opacity-50';
              let zIndex = 'z-0';

              if (position === 0) {
                scale = 'scale-100';
                opacity = 'opacity-100';
                zIndex = 'z-20';
              } else if (position === 1 || position === cards.length - 1) {
                scale = 'scale-90';
                opacity = 'opacity-75';
                zIndex = 'z-10';
              }

              return (
                <div
                  key={card.id}
                  className={`relative transform transition-all duration-500 ${scale} ${opacity} ${zIndex} ${
                    position === 0 ? 'translate-x-0' : 
                    position === 1 ? 'translate-x-4' : 
                    position === cards.length - 1 ? '-translate-x-4' : 'translate-x-0'
                  }`}
                >
                  <div className="w-80 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-center">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center mb-6`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {card.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
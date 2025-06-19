import React, { useEffect, useState } from 'react';
import { ArrowRight, BarChart3, Zap, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Trigger animations in sequence
    const timeouts = [
      setTimeout(() => setAnimationPhase(1), 300),  // Headline
      setTimeout(() => setAnimationPhase(2), 800),  // Subheading
      setTimeout(() => setAnimationPhase(3), 1300), // CTA Button
      setTimeout(() => setAnimationPhase(4), 1800), // Feature cards
      setTimeout(() => setAnimationPhase(5), 2300), // Stats cards
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Live data visualization'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '50K+', label: 'Users' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-600/10 animate-pulse"></div>
      </div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-float"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px)`,
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-200/30 rounded-full blur-xl animate-float"
          style={{ 
            transform: `translateY(${scrollY * 0.2}px)`,
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-200/30 rounded-full blur-xl animate-float"
          style={{ 
            transform: `translateY(${scrollY * 0.4}px)`,
            animationDelay: '4s'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Animated Headline */}
        <div className="mb-8">
          <h1 
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight transition-all duration-1000 ${
              animationPhase >= 1 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 -translate-y-12 scale-95'
            }`}
          >
            Frontend Metrics
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
              Dashboard
            </span>
          </h1>
        </div>
        
        {/* Animated Subheading */}
        <p 
          className={`text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-12 font-light max-w-3xl mx-auto transition-all duration-1000 ${
            animationPhase >= 2 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          Built for innovation and clarity. Transform your data into actionable insights with our cutting-edge analytics platform.
        </p>
        
        {/* Animated CTA Button */}
        <div 
          className={`mb-16 transition-all duration-1000 ${
            animationPhase >= 3 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-bounce-subtle">
            <span className="mr-2">Explore More</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
          </button>
        </div>

        {/* Feature Cards - Slide in from different directions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const directions = ['translate-x-12', 'translate-y-12', '-translate-x-12'];
            
            return (
              <div
                key={feature.title}
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-1000 hover:scale-105 ${
                  animationPhase >= 4 
                    ? 'opacity-100 translate-x-0 translate-y-0' 
                    : `opacity-0 ${directions[index]}`
                }`}
                style={{ transitionDelay: `${600 + index * 150}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Cards - Slide up from bottom */}
        <div className="flex justify-center space-x-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-1000 ${
                animationPhase >= 5 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${1000 + index * 100}ms` }}
            >
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          animationPhase >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '1500ms' }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center animate-pulse">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
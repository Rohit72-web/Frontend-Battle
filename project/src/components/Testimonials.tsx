import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Testimonials: React.FC = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (!hasIntersected) return;

    const phases = [
      { delay: 0, phase: 1 },     // Profile image
      { delay: 1000, phase: 2 },  // Text
      { delay: 4000, phase: 3 },  // Name and role
    ];

    phases.forEach(({ delay, phase }) => {
      setTimeout(() => setAnimationPhase(phase), delay);
    });
  }, [hasIntersected]);

  const testimonial = {
    text: "RippleDash has completely transformed how we visualize and understand our performance metrics. The intuitive interface and powerful analytics have made data-driven decisions effortless.",
    name: "Sarah Johnson",
    role: "Head of Analytics",
    company: "TechCorp Inc.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Users Say
          </h2>
        </div>

        <div ref={elementRef} className="relative">
          {/* Background Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 dark:bg-pink-900 rounded-full opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20"></div>
          </div>

          <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 text-center">
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div
                className={`w-20 h-20 rounded-full overflow-hidden transition-all duration-1000 ${
                  animationPhase >= 1
                    ? 'opacity-100 translate-x-0 scale-100'
                    : 'opacity-0 -translate-x-20 scale-50'
                }`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Testimonial Text with Typewriter Effect */}
            <div className="mb-8">
              <blockquote
                className={`text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed italic transition-opacity duration-1000 ${
                  animationPhase >= 2 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                "{animationPhase >= 2 ? (
                  <TypewriterText text={testimonial.text} speed={30} />
                ) : (
                  testimonial.text
                )}"
              </blockquote>
            </div>

            {/* Name and Role */}
            <div
              className={`transition-all duration-1000 ${
                animationPhase >= 3
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <cite className="not-italic">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {testimonial.role}, {testimonial.company}
                </div>
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Typewriter component
const TypewriterText: React.FC<{ text: string; speed: number }> = ({ text, speed }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

export default Testimonials;
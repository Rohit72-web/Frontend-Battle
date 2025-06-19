import React, { useState, useEffect } from 'react';

interface TextIntroProps {
  isVisible: boolean;
  onComplete: () => void;
}

const TextIntro: React.FC<TextIntroProps> = ({ isVisible, onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const lines = ['ANY SIMPLE OBJECT', 'CAN BE USED'];

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      if (currentLine < lines.length - 1) {
        setCurrentLine(currentLine + 1);
      } else {
        setTimeout(onComplete, 2000);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentLine, isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-1000">
      <div className="text-center space-y-8">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`text-4xl md:text-6xl lg:text-8xl font-black transition-all duration-1000 ${
              index <= currentLine
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-50 translate-y-8'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextIntro;
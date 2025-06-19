import React from 'react';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900 transition-opacity duration-1000">
      <div className="relative">
        <div className="ripple-container">
          <div className="ripple-1"></div>
          <div className="ripple-2"></div>
          <div className="ripple-3"></div>
          <div className="ripple-4"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">RippleDash</h1>
        </div>
      </div>
      
      <style jsx>{`
        .ripple-container {
          position: relative;
          width: 300px;
          height: 300px;
        }
        
        .ripple-1, .ripple-2, .ripple-3, .ripple-4 {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          border: 2px solid #3b82f6;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: ripple 6s infinite;
          opacity: 0;
        }
        
        .ripple-2 { animation-delay: 1.5s; }
        .ripple-3 { animation-delay: 3s; }
        .ripple-4 { animation-delay: 4.5s; }
        
        @keyframes ripple {
          0% {
            width: 20px;
            height: 20px;
            opacity: 1;
            box-shadow: 0 0 20px #3b82f6;
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
            box-shadow: 0 0 0 #3b82f6;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
import React from 'react';
import { Download } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const EmbodiedCarbon: React.FC = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  // Data from the graph image
  const chartData = [
    { value: 549, type: 'refurbishment' },
    { value: 278, type: 'refurbishment' },
    { value: 875, type: 'new' },
    { value: 617, type: 'new' },
    { value: 506, type: 'new' },
    { value: 36, type: 'new' },
    { value: 185, type: 'refurbishment' },
    { value: 191, type: 'refurbishment' },
    { value: 122, type: 'refurbishment' },
    { value: 550, type: 'new' },
    { value: 881, type: 'new' },
    { value: 539, type: 'new' },
    { value: 269, type: 'refurbishment' },
    { value: 29, type: 'refurbishment' },
    { value: 82, type: 'refurbishment' },
    { value: 44, type: 'refurbishment' },
    { value: 109, type: 'refurbishment' },
    { value: 106, type: 'refurbishment' },
    { value: 607, type: 'new' },
    { value: 528, type: 'new' }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <section className="py-20 bg-stone-100 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={elementRef} className="bg-stone-100 dark:bg-gray-700 p-8">
          <div className="flex justify-between items-start mb-8">
            {/* Left side - Filters */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-3">Filter by</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Type</div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-white dark:bg-gray-600 border border-stone-400 dark:border-gray-500 rounded-full text-sm flex items-center space-x-2">
                        <div className="w-3 h-3 bg-stone-500 rounded-full"></div>
                        <span>Refurbishment</span>
                      </button>
                      <button className="px-4 py-2 bg-white dark:bg-gray-600 border border-stone-400 dark:border-gray-500 rounded-full text-sm flex items-center space-x-2">
                        <div className="w-3 h-3 bg-stone-600 rounded-full"></div>
                        <span>New build</span>
                      </button>
                      <button className="px-4 py-2 bg-stone-500 text-white rounded-full text-sm">
                        All
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Status</div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-stone-500 text-white rounded-full text-sm">
                        Complete
                      </button>
                      <button className="px-4 py-2 bg-white dark:bg-gray-600 border border-stone-400 dark:border-gray-500 rounded-full text-sm">
                        Estimate
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div>
                <h4 className="text-sm text-gray-700 dark:text-gray-300 mb-3">Key</h4>
                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-0.5 border-t-2 border-dashed border-gray-400"></div>
                    <span>500 kgCO₂e/m² - Embodied Carbon Target 2030</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-0.5 bg-gray-600"></div>
                    <span>600 kgCO₂e/m² - Embodied Carbon Target 2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Title and Download */}
            <div className="text-right">
              <h2 className="text-4xl font-light text-gray-800 dark:text-gray-200 mb-2">
                EMBODIED<br />
                <span className="text-stone-600 dark:text-stone-400">CARBON<br />
                EMISSIONS</span>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Intensity measured by kgCO₂e/m²
              </p>
              <button className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 ml-auto">
                <span className="mr-2">Download the data</span>
                <Download size={16} />
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-80 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 -ml-8">
              <span>1200</span>
              <span>1000</span>
              <span>800</span>
              <span>600</span>
              <span>400</span>
              <span>200</span>
              <span>0</span>
            </div>

            {/* Target lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute w-full border-t-2 border-dashed border-gray-400" style={{ bottom: '40%' }}></div>
              <div className="absolute w-full border-t border-gray-600" style={{ bottom: '50%' }}></div>
            </div>

            {/* Chart bars */}
            <div className="flex items-end justify-between h-80 ml-4">
              {chartData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / chartData.length}%` }}
                >
                  <div className="relative flex-1 flex items-end justify-center w-full px-1">
                    <div
                      className={`w-full transition-all duration-1000 ${
                        item.type === 'refurbishment' 
                          ? 'bg-stone-400 dark:bg-stone-500' 
                          : 'bg-stone-600 dark:bg-stone-700'
                      }`}
                      style={{
                        height: hasIntersected ? `${(item.value / maxValue) * 100}%` : '0%',
                        transitionDelay: `${index * 50}ms`
                      }}
                    >
                      {/* Value label on top of bar */}
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 dark:text-gray-300">
                        {item.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Y-axis label */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500 dark:text-gray-400 -ml-16">
              Embodied carbon intensity (kgCO₂e/m²)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmbodiedCarbon;
import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Stats: React.FC = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  const statsData = [
    {
      title: 'Managed portfolio carbon footprint',
      value: '45,048',
      unit: 'tCO₂e',
      change: '16%',
      trend: 'up',
      fromYear: 'from 2019',
      data: [
        { year: '2022', value: 45048, percentage: 100 },
        { year: '2021', value: 14111, percentage: 31 },
        { year: '2020', value: 32813, percentage: 73 },
        { year: '2019', value: 38673, percentage: 86 }
      ],
      actionText: 'See full breakdown of carbon footprint'
    },
    {
      title: 'Managed portfolio energy intensity',
      value: '123',
      unit: 'kWh/m²',
      change: '22%',
      trend: 'down',
      fromYear: 'from 2019',
      data: [
        { year: '2022', value: 123, percentage: 78 },
        { year: '2021', value: 128, percentage: 82 },
        { year: '2020', value: 135, percentage: 86 },
        { year: '2019', value: 157, percentage: 100 }
      ],
      actionText: 'Download the data'
    },
    {
      title: 'Managed portfolio energy consumption',
      value: '47,790,662',
      unit: 'kWh',
      change: '27%',
      trend: 'down',
      fromYear: 'from 2019',
      data: [
        { year: '2022', value: 47790662, percentage: 73 },
        { year: '2021', value: 49324077, percentage: 76 },
        { year: '2020', value: 48784205, percentage: 75 },
        { year: '2019', value: 65198706, percentage: 100 }
      ],
      actionText: 'Download the data'
    }
  ];

  return (
    <section id="stats" className="py-20 bg-stone-100 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={elementRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.title}
              className={`bg-stone-100 dark:bg-gray-700 rounded-none p-8 transition-all duration-500 ${
                hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 200}ms`,
              }}
            >
              {/* Header */}
              <div className="mb-8">
                <h3 className="text-base font-normal text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {stat.title}
                </h3>
                
                <div className="flex items-end justify-between mb-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-light text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {stat.unit}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {stat.fromYear}
                    </div>
                    <div className={`flex items-center text-sm font-medium ${
                      stat.trend === 'up' ? 'text-gray-700' : 'text-gray-700'
                    }`}>
                      <span className="mr-1">
                        {stat.trend === 'up' ? '↑' : '↓'}
                      </span>
                      {stat.change}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="space-y-4 mb-8">
                {stat.data.map((item, i) => (
                  <div key={item.year} className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-10">
                      {item.year}
                    </span>
                    <div className="flex-1 flex items-center space-x-3">
                      <div className="flex-1 bg-gray-300 dark:bg-gray-600 rounded-none h-3">
                        <div
                          className="h-3 rounded-none bg-stone-500 dark:bg-stone-400 transition-all duration-1000"
                          style={{
                            width: hasIntersected ? `${item.percentage}%` : '0%',
                            transitionDelay: `${(index * 200) + (i * 100)}ms`
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300 w-16 text-right">
                        {item.value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 group">
                <span className="mr-2">{stat.actionText}</span>
                {stat.actionText.includes('breakdown') ? (
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                ) : (
                  <Download size={16} className="transition-transform duration-200 group-hover:translate-y-0.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
import React, { useState, useEffect } from 'react';
import { Bot, Cloud, Smartphone, ArrowRight, Star } from 'lucide-react';

interface ProductsProps {
  darkMode: boolean;
}

const Products: React.FC<ProductsProps> = ({ darkMode }) => {
  const [activeHighlight, setActiveHighlight] = useState(0);

  const highlights = [
    {
      title: 'Unmatched Innovation',
      description: 'Softqueen pioneers industry-first solutions with patented AI algorithms and seamless integrations.',
    },
    {
      title: 'Global Impact',
      description: 'Our products empower businesses in 50+ countries, driving efficiency and growth.',
    },
    {
      title: 'Tailored Excellence',
      description: 'Custom-built solutions designed to adapt to your unique business challenges.',
    },
  ];

  // Auto-rotate highlights every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % highlights.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [highlights.length]);

  const productCategories = [
    {
      name: 'AI Solutions',
      description: 'Revolutionary AI tools that redefine automation and analytics with unparalleled precision.',
      icon: Bot,
      image: 'https://img.freepik.com/free-vector/robotic-artificial-intelligence-technology-smart-lerning-from-bigdata_1150-48136.jpg?semt=ais_hybrid&w=740',
      demos: [
        {
          title: 'Smart Analytics Dashboard',
          url: 'https://sais-hyjv.onrender.com',
          description: 'Real-time insights powered by our proprietary AI engine, delivering 99.9% accuracy.',
          badge: 'Award-Winning',
        },
        {
          title: 'Chatbot Framework',
          url: 'https://cbot-ohr9.onrender.com',
          description: 'Engage customers with a fully customizable AI chatbot featuring natural language processing.',
          badge: 'Industry-First',
        },
      ],
    },
    {
      name: 'Cloud Platforms',
      description: 'Future-proof cloud solutions with unmatched scalability and zero-downtime architecture.',
      icon: Cloud,
      image: 'https://img.freepik.com/free-photo/saas-concept-collage_23-2149399281.jpg',
      demos: [
        {
          title: 'CloudSync Platform',
          url: 'https://cloudsync.softqueen-demo.com',
          description: 'Sync data across multiple clouds with our patented synchronization technology.',
          badge: 'Enterprise-Grade',
        },
        {
          title: 'Serverless Compute',
          url: 'https://serverless.softqueen-demo.com',
          description: 'Scale dynamically with our serverless framework, optimized for high-performance workloads.',
          badge: 'High-Performance',
        },
      ],
    },
    {
      name: 'Mobile Apps',
      description: 'Next-generation mobile apps crafted for seamless performance and immersive experiences.',
      icon: Smartphone,
      image: 'https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg',
      demos: [
        {
          title: 'Productivity Suite',
          url: 'https://productivity.softqueen-demo.com',
          description: 'Boost team efficiency with our all-in-one mobile app for task management and collaboration.',
          badge: 'Top-Rated',
        },
        {
          title: 'AR Experience',
          url: 'https://ar.softqueen-demo.com',
          description: 'Immerse users in augmented reality with our cutting-edge mobile AR platform.',
          badge: 'Innovative',
        },
      ],
    },
  ];

  return (
    <section
      className={`py-20 px-4 min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <div className="container mx-auto">
        {/* Why Softqueen Section */}
        <div className="text-center mb-20">
          <h2
            className={`text-5xl font-bold mb-8 ${
              darkMode ? 'text-white' : 'text-gray-800'
            } animate-slide-in`}
          >
            Why Softqueen Stands Out
          </h2>
          <div className="relative max-w-4xl mx-auto min-h-[120px]">
            {highlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className={`absolute w-full transition-all duration-500 ease-in-out transform ${
                  activeHighlight === index
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <h3
                  className={`text-2xl font-semibold mb-4 ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  {highlight.title}
                </h3>
                <p
                  className={`text-lg ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Categories */}
        <div className="text-center mb-16">
          <h2
            className={`text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-800'
            } animate-slide-in`}
          >
            Our Innovative Products
          </h2>
          <p
            className={`text-xl max-w-4xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            } animate-slide-in delay-100`}
          >
            Discover our transformative software solutions, engineered to empower businesses with cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <div
              key={category.name}
              className={`relative rounded-xl shadow-lg group transition-all duration-300 overflow-hidden ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-50'
              } animate-slide-in delay-${(index + 1) * 100}`}
            >
              {/* Category Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={category.image}
                  alt={`${category.name} preview`}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                  <category.icon
                    className={`w-10 h-10 ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  />
                  <h3
                    className={`text-3xl font-bold ${
                      darkMode ? 'text-white' : 'text-white'
                    }`}
                  >
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <p
                  className={`mb-6 text-base font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {category.description}
                </p>
                <div className="space-y-6">
                  {category.demos.map((demo) => (
                    <div
                      key={demo.title}
                      className="border-t border-gray-200 dark:border-gray-700 pt-4 group/demo transition-all duration-200 hover:pl-2"
                    >
                      <div className="flex items-start space-x-3">
                        <Star
                          className={`w-5 h-5 mt-1 ${
                            darkMode ? 'text-yellow-400' : 'text-yellow-500'
                          } group-hover/demo:text-yellow-300 transition-colors duration-200`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4
                              className={`text-xl font-semibold ${
                                darkMode ? 'text-white' : 'text-gray-800'
                              }`}
                            >
                              {demo.title}
                            </h4>
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-full ${
                                darkMode
                                  ? 'bg-blue-900 text-blue-300'
                                  : 'bg-blue-100 text-blue-600'
                              }`}
                            >
                              {demo.badge}
                            </span>
                          </div>
                          <p
                            className={`text-sm mt-1 ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {demo.description}
                          </p>
                          <a
                            href={demo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center mt-3 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                              darkMode
                                ? 'bg-blue-600 text-white hover:bg-blue-500'
                                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            }`}
                          >
                            Explore Demo
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
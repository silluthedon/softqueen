import React from 'react';
import { ExternalLink, Globe, Star } from 'lucide-react';

interface ProjectsProps {
  darkMode: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ darkMode }) => {
  const projects = [
    {
      id: 1,
      name: 'Kacchi Prime',
      url: 'https://www.kacchiprime.com/',
      description: 'A premium food ordering and delivery platform featuring authentic traditional cuisine with modern convenience.',
      features: ['Online Ordering', 'Real-time Tracking', 'Payment Integration', 'Customer Reviews'],
      category: 'Authentic Kacchi & Delivery',
      status: 'Live'
    },
    {
      id: 2,
      name: 'Zerotreat',
      url: 'https://zerotreat.onrender.com/',
      description: 'An innovative healthcare management system designed to streamline patient care and medical processes.',
      features: ['Healthy Food', 'Sugar Free', 'Diety', 'Analytics Dashboard'],
      category: 'Healthcare Snacks and Treats',
      status: 'Live'
    }
  ];

  return (
    <section className={`py-20 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Our <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className={`text-xl ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-3xl mx-auto`}>
              Showcasing our latest innovations and successful implementations across various industries
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`p-8 rounded-xl ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg hover:shadow-xl transition-all duration-300 border ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                } group`}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className={`text-2xl font-bold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {project.name}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.category}
                      </span>
                      <span className="flex items-center text-green-500">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    } transition-all duration-200 group-hover:scale-110`}
                  >
                    <ExternalLink className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`} size={20} />
                  </a>
                </div>

                {/* Project Description */}
                <p className={`text-lg mb-6 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className={`text-lg font-semibold mb-3 ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className={`flex items-center ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <Star className="text-yellow-500 mr-2" size={16} />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visit Project Button */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Globe size={20} />
                  <span>Visit Project</span>
                </a>
              </div>
            ))}
          </div>

          {/* Future Projects Section */}
          <div className={`p-8 rounded-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">+</span>
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              More Projects Coming Soon
            </h3>
            <p className={`text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-2xl mx-auto`}>
              We're continuously working on exciting new projects that will push the boundaries 
              of technology and deliver exceptional value to our clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
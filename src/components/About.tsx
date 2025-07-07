import React from 'react';
import { MapPin, Target, Eye, Users } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  return (
    <section className={`py-20 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              About <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Softqueen</span>
            </h2>
            <p className={`text-xl ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-3xl mx-auto`}>
              We are a forward-thinking software company dedicated to creating innovative solutions 
              that transform businesses and enhance user experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Mission & Vision */}
            <div className="space-y-8">
              <div className={`p-8 rounded-xl ${
                darkMode ? 'bg-gray-900' : 'bg-gray-50'
              } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <Target className="text-white" size={24} />
                  </div>
                  <h3 className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Our Mission
                  </h3>
                </div>
                <p className={`text-lg ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  To deliver exceptional software solutions that empower businesses to achieve their goals 
                  while providing seamless and intuitive user experiences.
                </p>
              </div>

              <div className={`p-8 rounded-xl ${
                darkMode ? 'bg-gray-900' : 'bg-gray-50'
              } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <Eye className="text-white" size={24} />
                  </div>
                  <h3 className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Our Vision
                  </h3>
                </div>
                <p className={`text-lg ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  To become a leading software development company recognized for innovation, 
                  quality, and customer satisfaction across global markets.
                </p>
              </div>
            </div>

            {/* CEO & Company Info */}
            <div className="space-y-8">
              <div className={`p-8 rounded-xl ${
                darkMode ? 'bg-gray-900' : 'bg-gray-50'
              } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">DZ</span>
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      Dilara Zaman Sylvie
                    </h3>
                    <p className={`text-lg ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Chief Executive Officer
                    </p>
                  </div>
                </div>
                <p className={`text-lg ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Leading Softqueen with a vision for innovation and excellence in software development. 
                  With plans to expand our talented team, we're building the future of digital solutions.
                </p>
              </div>

              <div className={`p-8 rounded-xl ${
                darkMode ? 'bg-gray-900' : 'bg-gray-50'
              } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <h3 className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Our Location
                  </h3>
                </div>
                <p className={`text-lg ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Iqbal Road, Mohammadpur<br />
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Team Expansion */}
          <div className={`p-8 rounded-xl ${
            darkMode ? 'bg-gray-900' : 'bg-gray-50'
          } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="text-white" size={32} />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Growing Team
            </h3>
            <p className={`text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-2xl mx-auto`}>
              We're actively expanding our team with talented developers, designers, and innovators 
              who share our passion for creating exceptional software solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
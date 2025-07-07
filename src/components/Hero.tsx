import React from 'react';
import { ArrowRight, Code, Zap, Globe } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ darkMode, setActiveSection }) => {
  return (
    <section className={`min-h-screen flex items-center justify-center ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    } pt-20`}>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Softqueen
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Crafting exceptional digital experiences with cutting-edge technology
          </p>
          
          <p className={`text-lg mb-12 max-w-2xl mx-auto ${
            darkMode ? 'text-gray-400' : 'text-gray-700'
          }`}>
            We specialize in creating innovative software solutions that drive business growth 
            and deliver outstanding user experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => setActiveSection('projects')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>View Our Projects</span>
              <ArrowRight size={20} />
            </button>
            
            <button
              onClick={() => setActiveSection('contact')}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 border-2 ${
                darkMode
                  ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Get In Touch
            </button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg hover:shadow-xl transition-all duration-200`}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Code className="text-white" size={24} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Clean Code
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Well-structured, maintainable code that scales with your business
              </p>
            </div>

            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg hover:shadow-xl transition-all duration-200`}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Fast Performance
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Optimized applications that deliver lightning-fast user experiences
              </p>
            </div>

            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg hover:shadow-xl transition-all duration-200`}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Globe className="text-white" size={24} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Global Reach
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Applications built for worldwide accessibility and scalability
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
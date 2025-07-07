import React from 'react';
import { Heart, MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`py-12 ${
      darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SQ</span>
                </div>
                <span className={`text-xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Softqueen
                </span>
              </div>
              <p className={`text-sm mb-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              } max-w-md`}>
                Crafting exceptional digital experiences with cutting-edge technology. 
                We specialize in creating innovative software solutions that drive business growth.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-blue-500" size={16} />
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Dhaka, Bangladesh
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Quick Links
              </h3>
              <ul className="space-y-2">
                {['Home', 'About', 'Projects', 'Contact', 'Reviews'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className={`text-sm transition-colors duration-200 ${
                        darkMode
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Contact Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="text-blue-500" size={16} />
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    hello@softqueen.com
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="text-blue-500" size={16} />
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    +880 1234-567890
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="text-blue-500 mt-0.5" size={16} />
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Iqbal Road, Mohammadpur<br />
                    Dhaka, Bangladesh
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`mt-8 pt-8 border-t ${
            darkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                © 2024 Softqueen. All rights reserved.
              </p>
              <div className="flex items-center space-x-1 mt-4 md:mt-0">
                <span className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Made with
                </span>
                <Heart className="text-red-500 fill-current" size={16} />
                <span className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  by Softqueen Team
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  language?: string; // Optional: for language toggle
  setLanguage?: (lang: string) => void; // Optional
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  activeSection,
  setActiveSection,
  language = 'en',
  setLanguage,
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Handle scroll for shrink effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        darkMode
          ? 'bg-gray-900/80 backdrop-blur-xl'
          : 'bg-white/80 backdrop-blur-xl'
      } shadow-lg ${isScrolled ? 'py-2' : 'py-4'}`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className={`flex items-center space-x-2 transition-all duration-300 ${
              isScrolled ? 'scale-90' : ''
            }`}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center relative overflow-hidden group">
              <span className="text-white font-bold text-sm z-10">SQ</span>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <span
              className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              Softqueen
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 group ${
                  activeSection === item.id
                    ? darkMode
                      ? 'text-blue-400'
                      : 'text-blue-600'
                    : darkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                )}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-600/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            ))}
          </nav>

          {/* Dark Mode Toggle, Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle (Optional) */}
            {setLanguage && (
              <button
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Toggle language"
              >
                <Globe size={20} />
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 animate-slide-up"
            role="navigation"
          >
            <div className="flex flex-col space-y-2 mt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-left text-sm font-medium transition-all duration-200 rounded-lg group relative ${
                    activeSection === item.id
                      ? darkMode
                        ? 'bg-blue-900 text-blue-400'
                        : 'bg-blue-50 text-blue-600'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                  <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
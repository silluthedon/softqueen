import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import Toast from './components/Toast';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('softqueen_darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    // Save dark mode preference to localStorage
    localStorage.setItem('softqueen_darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const showToast = (message: string) => {
    setToast({ show: true, message });
  };

  const closeToast = () => {
    setToast({ show: false, message: '' });
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero darkMode={darkMode} setActiveSection={setActiveSection} />;
      case 'about':
        return <About darkMode={darkMode} />;
      case 'products':
        return <Products darkMode={darkMode} />;
      case 'projects':
        return <Projects darkMode={darkMode} />;
      case 'contact':
        return <Contact darkMode={darkMode} showToast={showToast} />;
      case 'reviews':
        return <Reviews darkMode={darkMode} showToast={showToast} />;
      default:
        return <Hero darkMode={darkMode} setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        
        <main>
          {renderActiveSection()}
        </main>
        
        <Footer darkMode={darkMode} />
        
        <Toast
          message={toast.message}
          show={toast.show}
          onClose={closeToast}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;
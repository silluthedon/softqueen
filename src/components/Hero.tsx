import React from 'react';
import { ArrowRight, Code, Zap, Globe, ChevronDown } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
  setActiveSection: (section: string) => void;
  language?: string;
}

const Hero: React.FC<HeroProps> = ({ darkMode, setActiveSection, language = 'en' }) => {
  const [typedText, setTypedText] = React.useState('');
  const fullText = 'Softqueen';

  // Typewriter effect
  React.useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  // 3D Tilt effect for feature icons
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  // Content based on language
  const content = {
    en: {
      subtitle: 'Crafting exceptional digital experiences with cutting-edge technology',
      description: 'We specialize in creating innovative software solutions that drive business growth and deliver outstanding user experiences.',
      cta1: 'View Our Projects',
      cta2: 'Get In Touch',
      feature1: { title: 'Clean Code', desc: 'Well-structured, maintainable code that scales with your business' },
      feature2: { title: 'Fast Performance', desc: 'Optimized applications that deliver lightning-fast user experiences' },
      feature3: { title: 'Global Reach', desc: 'Applications built for worldwide accessibility and scalability' },
    },
    bn: {
      subtitle: 'অত্যাধুনিক প্রযুক্তির মাধ্যমে অসাধারণ ডিজিটাল অভিজ্ঞতা তৈরি',
      description: 'আমরা উদ্ভাবনী সফটওয়্যার সমাধান তৈরিতে বিশেষজ্ঞ যা ব্যবসার উন্নতি ঘটায় এবং অসাধারণ ব্যবহারকারী অভিজ্ঞতা প্রদান করে।',
      cta1: 'আমাদের প্রকল্পগুলো দেখুন',
      cta2: 'যোগাযোগ করুন',
      feature1: { title: 'পরিচ্ছন্ন কোড', desc: 'আপনার ব্যবসার সাথে স্কেল করার জন্য সুসংগঠিত, রক্ষণাবেক্ষণযোগ্য কোড' },
      feature2: { title: 'দ্রুত পারফরম্যান্স', desc: 'অপ্টিমাইজড অ্যাপ্লিকেশন যা দ্রুত ব্যবহারকারী অভিজ্ঞতা প্রদান করে' },
      feature3: { title: 'বৈশ্বিক প্রভাব', desc: 'বিশ্বব্যাপী অ্যাক্সেসযোগ্যতা এবং স্কেলেবিলিটির জন্য তৈরি অ্যাপ্লিকেশন' },
    },
  };

  const currentContent = content[language];

  return (
    <section
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        darkMode
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-blue-50 to-purple-50 animate-gradient-bg'
      } pt-20 transition-all duration-500`}
      role="region"
      aria-label="Hero Section"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 animate-pulse opacity-50"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading with Typewriter Effect */}
          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-800'
            } transform transition-all duration-500 hover:scale-105`}
            style={{ transform: 'translateY(0)' }}
            data-parallax="0.2"
          >
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            } transform transition-all duration-500 animate-slide-up`}
          >
            {currentContent.subtitle}
          </p>

          <p
            className={`text-lg mb-12 max-w-2xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-700'
            } animate-slide-up delay-100`}
          >
            {currentContent.description}
          </p>

          {/* CTA Buttons with Ripple Effect */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => setActiveSection('projects')}
              className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 overflow-hidden group"
              aria-label={currentContent.cta1}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>{currentContent.cta1}</span>
                <ArrowRight size={20} />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
            </button>

            <button
              onClick={() => setActiveSection('contact')}
              className={`relative px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 border-2 overflow-hidden group ${
                darkMode
                  ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              aria-label={currentContent.cta2}
            >
              <span className="relative z-10">{currentContent.cta2}</span>
              <span className="absolute inset-0 bg-gray-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>

          {/* Feature Icons with 3D Tilt and Glow Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Code, ...currentContent.feature1 },
              { icon: Zap, ...currentContent.feature2 },
              { icon: Globe, ...currentContent.feature3 },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg hover:shadow-2xl transition-all duration-300 group animate-slide-up delay-${100 * (index + 2)}`}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s' }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto relative overflow-hidden animate-glow`}
                >
                  <feature.icon className="text-white z-10" size={32} style={{ transform: 'translateZ(20px)' }} />
                  <span className="absolute inset-0 bg-gradient-to-t from-blue-600 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {feature.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => setActiveSection('about')}
            className={`p-3 rounded-full ${
              darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
            } shadow-lg hover:shadow-xl transition-all duration-200`}
            aria-label="Scroll to next section"
          >
            <ChevronDown size={24} />
          </button>
        </div>
      </div>

      {/* CSS for Glow Animation */}
      <style jsx>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(147, 51, 234, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(147, 51, 234, 0.8);
          }
          100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(147, 51, 234, 0.5);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
import React, { useState } from 'react';
import { ExternalLink, Globe, Star, ArrowRight } from 'lucide-react';

// ইমেজ ইমপোর্ট
import kacchiPrimeImg from '../assets/kacchiprime.png';
import zerotreatImg from '../assets/zerotreat.png';

interface ProjectsProps {
  darkMode: boolean;
  language?: string;
}

const Projects: React.FC<ProjectsProps> = ({ darkMode, language = 'en' }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projects = [
    {
      id: 1,
      name: 'Kacchi Prime',
      url: 'https://www.kacchiprime.com/',
      description: {
        en: 'A premium food ordering and delivery platform featuring authentic traditional cuisine with modern convenience.',
        bn: 'একটি প্রিমিয়াম ফুড অর্ডারিং এবং ডেলিভারি প্ল্যাটফর্ম যা আধুনিক সুবিধার সাথে খাঁটি ঐতিহ্যবাহী খাবার সরবরাহ করে।',
      },
      features: {
        en: ['Online Ordering', 'Real-time Tracking', 'Payment Integration', 'Customer Reviews'],
        bn: ['অনলাইন অর্ডারিং', 'রিয়েল-টাইম ট্র্যাকিং', 'পেমেন্ট ইন্টিগ্রেশন', 'গ্রাহক রিভিউ'],
      },
      category: 'Food & Delivery',
      status: 'Live',
      image: kacchiPrimeImg, // ইমপোর্ট করা ইমেজ
    },
    {
      id: 2,
      name: 'Zerotreat',
      url: 'https://zerotreat.onrender.com/',
      description: {
        en: 'An innovative healthcare management system designed to streamline patient care and medical processes.',
        bn: 'একটি উদ্ভাবনী স্বাস্থ্যসেবা ব্যবস্থাপনা সিস্টেম যা রোগীর যত্ন এবং চিকিৎসা প্রক্রিয়াকে সহজতর করার জন্য ডিজাইন করা হয়েছে।',
      },
      features: {
        en: ['Healthy Food', 'Sugar Free', 'Diety', 'Analytics Dashboard'],
        bn: ['স্বাস্থ্যকর খাবার', 'চিনি মুক্ত', 'ডায়েটি', 'অ্যানালিটিক্স ড্যাশবোর্ড'],
      },
      category: 'Healthcare',
      status: 'Live',
      image: zerotreatImg, // ইমপোর্ট করা ইমেজ
    },
  ];

  const content = {
    en: {
      title: 'Our Projects',
      subtitle: 'Showcasing our latest innovations and successful implementations across various industries.',
      futureProjects: {
        title: 'More Projects Coming Soon',
        desc: 'We’re continuously working on exciting new projects that will push the boundaries of technology and deliver exceptional value to our clients.',
        cta: 'Collaborate With Us',
      },
      filter: {
        all: 'All',
        categories: ['Food & Delivery', 'Healthcare'],
      },
    },
    bn: {
      title: 'আমাদের প্রকল্প',
      subtitle: 'বিভিন্ন শিল্পে আমাদের সর্বশেষ উদ্ভাবন এবং সফল বাস্তবায়ন প্রদর্শন।',
      futureProjects: {
        title: 'আরও প্রকল্প শীঘ্রই আসছে',
        desc: 'আমরা ক্রমাগত উত্তেজনাপূর্ণ নতুন প্রকল্পে কাজ করছি যা প্রযুক্তির সীমানা প্রসারিত করবে এবং আমাদের ক্লায়েন্টদের জন্য ব্যতিক্রমী মূল্য প্রদান করবে।',
        cta: 'আমাদের সাথে সহযোগিতা করুন',
      },
      filter: {
        all: 'সব',
        categories: ['খাদ্য ও ডেলিভারি', 'স্বাস্থ্যসেবা'],
      },
    },
  };

  const currentContent = content[language];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      className={`py-20 relative overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      } font-poppins`}
      role="region"
      aria-label="Projects Section"
    >
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v4h2v-4h4V2h-4V0h-2v2h-4v2h4zM6 34v4h4v-4h2v-2h-2v-4H6v2H2v2h4zm0-30v2H2v2h4v4h2V6h4V2H8V0H6z' fill='%239C92AC' fill-opacity='0.4'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-800'
              } drop-shadow-lg`}
            >
              {currentContent.title}{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p
              className={`text-xl ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              } max-w-3xl mx-auto animate-slide-up delay-100`}
            >
              {currentContent.subtitle}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center space-x-4 mb-12 animate-slide-up delay-200">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                selectedCategory === 'All'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {currentContent.filter.all}
            </button>
            {currentContent.filter.categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`p-8 rounded-xl ${
                  darkMode ? 'bg-gray-800/80' : 'bg-white/80'
                } shadow-lg hover:shadow-xl transition-all duration-300 border ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                } backdrop-blur-md group animate-slide-up delay-${300 + index * 100}`}
                role="article"
              >
                {/* Project Image */}
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={`${project.name} Preview`}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={() => console.error(`Failed to load image for ${project.name}`)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Project Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      {project.name}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                        }`}
                      >
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
                    aria-label={`Visit ${project.name}`}
                  >
                    <ExternalLink
                      className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                      size={20}
                    />
                  </a>
                </div>

                {/* Project Description */}
                <p
                  className={`text-lg mb-6 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {project.description[language]}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4
                    className={`text-lg font-semibold mb-3 ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {language === 'en' ? 'Key Features' : 'মূল বৈশিষ্ট্য'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features[language].map((feature, index) => (
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
                  className="relative w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 overflow-hidden group"
                  aria-label={`Visit ${project.name}`}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Globe size={20} />
                    <span>{language === 'en' ? 'Visit Project' : 'প্রকল্প দেখুন'}</span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                </a>
              </div>
            ))}
          </div>

          {/* Future Projects Section */}
          <div
            className={`p-8 rounded-xl ${
              darkMode ? 'bg-gray-800/80' : 'bg-white/80'
            } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md text-center animate-slide-up delay-500`}
            role="article"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden group">
              <span className="text-white font-bold text-2xl z-10">+</span>
              <span className="absolute inset-0 bg-gradient-to-t from-blue-600 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
            </div>
            <h3
              className={`text-2xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              {currentContent.futureProjects.title}
            </h3>
            <p
              className={`text-lg ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              } max-w-2xl mx-auto mb-6`}
            >
              {currentContent.futureProjects.desc}
            </p>
            <a
              href="mailto:collaborate@softqueen.com"
              className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden group inline-flex items-center space-x-2"
              aria-label={currentContent.futureProjects.cta}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <ArrowRight size={20} />
                <span>{currentContent.futureProjects.cta}</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
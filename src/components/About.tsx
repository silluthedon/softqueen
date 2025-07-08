import React from 'react';
import { MapPin, Target, Eye, Users, ArrowRight } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
  language?: string;
}

const About: React.FC<AboutProps> = ({ darkMode, language = 'en' }) => {
  // Content based on language
  const content = {
    en: {
      title: 'About',
      subtitle: 'We are a forward-thinking software company dedicated to creating innovative solutions that transform businesses and enhance user experiences.',
      mission: {
        title: 'Our Mission',
        desc: 'To deliver exceptional software solutions that empower businesses to achieve their goals while providing seamless and intuitive user experiences.',
      },
      vision: {
        title: 'Our Vision',
        desc: 'To become a leading software development company recognized for innovation, quality, and customer satisfaction across global markets.',
      },
      ceo: {
        name: 'Dilara Zaman Sylvie',
        title: 'Chief Executive Officer',
        desc: 'Leading Softqueen with a vision for innovation and excellence in software development. With plans to expand our talented team, we’re building the future of digital solutions.',
      },
      location: {
        title: 'Our Location',
        desc: 'Iqbal Road, Mohammadpur, Dhaka, Bangladesh',
      },
      team: {
        title: 'Growing Team',
        desc: 'We’re actively expanding our team with talented developers, designers, and innovators who share our passion for creating exceptional software solutions.',
        cta: 'Join Our Team',
      },
    },
    bn: {
      title: 'সফটকুইন সম্পর্কে',
      subtitle: 'আমরা একটি ভবিষ্যৎ-চিন্তাশীল সফটওয়্যার কোম্পানি, যারা ব্যবসার রূপান্তর এবং ব্যবহারকারীর অভিজ্ঞতা উন্নত করার জন্য উদ্ভাবনী সমাধান তৈরিতে নিবেদিত।',
      mission: {
        title: 'আমাদের লক্ষ্য',
        desc: 'ব্যবসাগুলোকে তাদের লক্ষ্য অর্জনে সহায়তা করার জন্য অসাধারণ সফটওয়্যার সমাধান প্রদান করা এবং স্বজ্ঞাত ব্যবহারকারী অভিজ্ঞতা নিশ্চিত করা।',
      },
      vision: {
        title: 'আমাদের দৃষ্টিভঙ্গি',
        desc: 'উদ্ভাবন, গুণগত মান, এবং গ্রাহক সন্তুষ্টির জন্য বিশ্বব্যাপী স্বীকৃত নেতৃস্থানীয় সফটওয়্যার ডেভেলপমেন্ট কোম্পানি হওয়া।',
      },
      ceo: {
        name: 'দিলারা জামান সিলভি',
        title: 'প্রধান নির্বাহী কর্মকর্তা',
        desc: 'উদ্ভাবন এবং শ্রেষ্ঠত্বের দৃষ্টিভঙ্গি নিয়ে সফটকুইনকে নেতৃত্ব দিচ্ছেন। আমাদের প্রতিভাবান দলকে সম্প্রসারণের পরিকল্পনা নিয়ে আমরা ডিজিটাল সমাধানের ভবিষ্যৎ গড়ছি।',
      },
      location: {
        title: 'আমাদের অবস্থান',
        desc: 'ইকবাল রোড, মোহাম্মদপুর, ঢাকা, বাংলাদেশ',
      },
      team: {
        title: 'বর্ধনশীল দল',
        desc: 'আমরা আমাদের দলকে প্রতিভাবান ডেভেলপার, ডিজাইনার এবং উদ্ভাবকদের সাথে সম্প্রসারণ করছি, যারা অসাধারণ সফটওয়্যার সমাধান তৈরির জন্য আমাদের আবেগ ভাগ করে নেয়।',
        cta: 'আমাদের দলে যোগ দিন',
      },
    },
  };

  const currentContent = content[language];

  return (
    <section
      className={`py-20 relative overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      } font-poppins`}
      role="region"
      aria-label="About Section"
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
                Softqueen
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Mission & Vision */}
            <div className="space-y-8">
              <div
                className={`p-8 rounded-xl ${
                  darkMode ? 'bg-gray-900/80' : 'bg-white/80'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-slide-up delay-200`}
                role="article"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 relative overflow-hidden">
                    <Target className="text-white z-10" size={24} />
                    <span className="absolute inset-0 bg-gradient-to-t from-blue-600 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                  </div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {currentContent.mission.title}
                  </h3>
                </div>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {currentContent.mission.desc}
                </p>
              </div>

              <div
                className={`p-8 rounded-xl ${
                  darkMode ? 'bg-gray-900/80' : 'bg-white/80'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-slide-up delay-300`}
                role="article"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 relative overflow-hidden">
                    <Eye className="text-white z-10" size={24} />
                    <span className="absolute inset-0 bg-gradient-to-t from-blue-600 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                  </div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {currentContent.vision.title}
                  </h3>
                </div>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {currentContent.vision.desc}
                </p>
              </div>
            </div>

            {/* CEO & Company Info */}
            <div className="space-y-8">
              <div
                className={`p-8 rounded-xl ${
                  darkMode ? 'bg-gray-900/80' : 'bg-white/80'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-slide-up delay-400`}
                role="article"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 relative overflow-hidden">
                    <span className="text-white font-bold text-xl z-10">DZ</span>
                    <span className="absolute inset-0 bg-gradient-to-t from-blue-600 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {currentContent.ceo.name}
                    </h3>
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentContent.ceo.title}
                    </p>
                  </div>
                </div>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {currentContent.ceo.desc}
                </p>
              </div>

              <div
                className={`p-8 rounded-xl ${
                  darkMode ? 'bg-gray-900/80' : 'bg-white/80'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-slide-up delay-500`}
                role="article"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 relative overflow-hidden">
                    <MapPin className="text-white z-10" size={24} />
                    <span className="absolute inset-0 bg-gradient-to-t from-blue-600 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                  </div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {currentContent.location.title}
                  </h3>
                </div>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {currentContent.location.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Team Expansion with CTA */}
          <div
            className={`p-8 rounded-xl ${
              darkMode ? 'bg-gray-900/80' : 'bg-white/80'
            } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 text-center animate-slide-up delay-600`}
            role="article"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden group">
              <Users className="text-white z-10" size={32} />
              <span className="absolute inset-0 bg-gradient-to-t from-blue-600 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {currentContent.team.title}
            </h3>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mb-6`}>
              {currentContent.team.desc}
            </p>
            <button
              onClick={() => window.location.href = 'mailto:careers@softqueen.com'}
              className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden group"
              aria-label={currentContent.team.cta}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>{currentContent.team.cta}</span>
                <ArrowRight size={20} />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
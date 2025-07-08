import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Linkedin, Twitter, Github } from 'lucide-react';

interface ContactProps {
  darkMode: boolean;
  showToast: (message: string) => void;
  language?: string;
}

const Contact: React.FC<ContactProps> = ({ darkMode, showToast, language = 'en' }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  // Content based on language
  const content = {
    en: {
      title: 'Get In Touch',
      subtitle: 'Ready to start your next project? We’d love to hear from you and discuss how we can help bring your ideas to life.',
      contactInfo: {
        title: 'Contact Information',
        location: { title: 'Office Location', desc: 'Iqbal Road, Mohammadpur, Dhaka' },
        email: { title: 'Email Address', desc: 'hello@softqueen.com' },
        phone: { title: 'Phone Number', desc: '+880 1234-567890' },
      },
      businessHours: {
        title: 'Business Hours',
        days: [
          { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
          { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
          { day: 'Sunday', time: 'Closed' },
        ],
      },
      form: {
        title: 'Send Us a Message',
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        submit: 'Send Message',
      },
      social: {
        title: 'Connect With Us',
        links: [
          { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
          { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
          { name: 'GitHub', icon: Github, url: 'https://github.com' },
        ],
      },
      philosophy: {
        title: 'Our Philosophy',
        quote: '"A leader is one who knows the way, goes the way, and shows the way."',
      },
    },
    bn: {
      title: 'যোগাযোগ করুন',
      subtitle: 'আপনার পরবর্তী প্রকল্প শুরু করতে প্রস্তুত? আমরা আপনার কাছ থেকে শুনতে এবং আপনার ধারণাগুলো বাস্তবায়নের জন্য আলোচনা করতে চাই।',
      contactInfo: {
        title: 'যোগাযোগের তথ্য',
        location: { title: 'অফিসের অবস্থান', desc: 'ইকবাল রোড, মোহাম্মদপুর, ঢাকা' },
        email: { title: 'ইমেইল ঠিকানা', desc: 'hello@softqueen.com' },
        phone: { title: 'ফোন নম্বর', desc: '+৮৮০ ১২৩৪-৫৬৭৮৯০' },
      },
      businessHours: {
        title: 'ব্যবসার সময়',
        days: [
          { day: 'সোমবার - শুক্রবার', time: 'সকাল ৯:০০ - সন্ধ্যা ৬:০০' },
          { day: 'শনিবার', time: 'সকাল ১০:০০ - বিকেল ৪:০০' },
          { day: 'রবিবার', time: 'বন্ধ' },
        ],
      },
      form: {
        title: 'আমাদের একটি বার্তা পাঠান',
        name: 'আপনার নাম',
        email: 'আপনার ইমেইল',
        message: 'আপনার বার্তা',
        submit: 'বার্তা পাঠান',
      },
      social: {
        title: 'আমাদের সাথে সংযোগ করুন',
        links: [
          { name: 'লিঙ্কডইন', icon: Linkedin, url: 'https://linkedin.com' },
          { name: 'টুইটার', icon: Twitter, url: 'https://twitter.com' },
          { name: 'গিটহাব', icon: Github, url: 'https://github.com' },
        ],
      },
      philosophy: {
        title: 'আমাদের দর্শন',
        quote: '"একজন নেতা তিনি, যিনি পথ জানেন, পথে চলেন এবং পথ দেখান।"',
      },
    },
  };

  const currentContent = content[language];

  // Form handling
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.message) newErrors.message = 'Message is required';

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      showToast('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <section
      className={`py-20 relative overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      } font-poppins`}
      role="region"
      aria-label="Contact Section"
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
                Touch
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div
                className={`p-8 rounded-xl ${
                  darkMode ? 'bg-gray-900/80' : 'bg-white/80'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-slide-up delay-200`}
                role="article"
              >
                <h3
                  className={`text-2xl font-bold mb-6 ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {currentContent.contactInfo.title}
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, ...currentContent.contactInfo.location },
                    { icon: Mail, ...currentContent.contactInfo.email },
                    { icon: Phone, ...currentContent.contactInfo.phone },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 relative overflow-hidden">
                        <item.icon className="text-white z-10" size={20} />
                        <span className="absolute inset-0 bg-gradient-to-t from-blue-600 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                      </div>
                      <div>
                        <h4
                          className={`font-semibold ${
                            darkMode ? 'text-white' : 'text-gray-800'
                          }`}
                        >
                          {item.title}
                        </h4>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Social Media Links */}
                <div className="mt-6">
                  <h4
                    className={`font-semibold mb-4 ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {currentContent.social.title}
                  </h4>
                  <div className="flex space-x-4">
                    {currentContent.social.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full ${
                          darkMode
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        } transition-all duration-200 hover:scale-110`}
                        aria-label={link.name}
                      >
                        <link.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div
                className={`p-8 rounded-xl ${
                  darkMode ? 'bg-gray-900/80' : 'bg-white/80'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-slide-up delay-300`}
                role="article"
              >
                <h3
                  className={`text-2xl font-bold mb-6 ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {currentContent.businessHours.title}
                </h3>
                <div className="space-y-2">
                  {currentContent.businessHours.days.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.day}
                      </span>
                      <span
                        className={`${
                          darkMode ? 'text-white' : 'text-gray-800'
                        } font-semibold`}
                      >
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form & Philosophy */}
            <div className="space-y-8">
              {/* Contact Form */}
              <div
                className={`p-8 rounded-xl ${
                  darkMode ? 'bg-gray-900/80' : 'bg-white/80'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up delay-400`}
                role="form"
              >
                <h3
                  className={`text-2xl font-bold mb-6 ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {currentContent.form.title}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {currentContent.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`mt-1 w-full p-3 rounded-lg border ${
                        darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {currentContent.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`mt-1 w-full p-3 rounded-lg border ${
                        darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {currentContent.form.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className={`mt-1 w-full p-3 rounded-lg border ${
                        darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden group"
                    aria-label={currentContent.form.submit}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>{currentContent.form.submit}</span>
                      <ArrowRight size={20} />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                  </button>
                </form>
              </div>

              {/* Philosophy */}
              <div
                className={`p-8 rounded-xl ${
                  darkMode ? 'bg-gray-900/80' : 'bg-white/80'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up delay-500`}
                role="article"
              >
                <h3
                  className={`text-2xl font-bold mb-6 ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {currentContent.philosophy.title}
                </h3>
                <blockquote
                  className={`text-2xl md:text-3xl font-semibold italic ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  } border-l-4 border-blue-500 pl-6 py-4 leading-relaxed`}
                >
                  {currentContent.philosophy.quote}
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
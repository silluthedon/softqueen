import React, { useState } from 'react';
import { Heart, MapPin, Mail, Phone, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface FooterProps {
  darkMode: boolean;
  language?: string;
}

const Footer: React.FC<FooterProps> = ({ darkMode, language = 'en' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const content = {
    en: {
      company: {
        name: 'Softqueen',
        description: 'Crafting exceptional digital experiences with cutting-edge technology. We specialize in creating innovative software solutions that drive business growth.',
        location: 'Dhaka, Bangladesh',
        address: 'Iqbal Road, Mohammadpur, Dhaka, Bangladesh',
      },
      quickLinks: {
        title: 'Quick Links',
        links: ['Home', 'About', 'Projects', 'Contact', 'Reviews'],
      },
      contact: {
        title: 'Contact Info',
        email: 'hello@softqueen.com',
        phone: '+880 1234-567890',
      },
      newsletter: {
        title: 'Stay Updated',
        description: 'Subscribe to our newsletter for the latest updates and insights.',
        placeholder: 'Enter your email',
        submit: 'Subscribe',
        success: 'Thank you for subscribing!',
        error: 'Failed to subscribe. Please try again.',
        invalidEmail: 'Please enter a valid email address.',
        duplicateEmail: 'This email is already subscribed.',
      },
      social: {
        title: 'Follow Us',
      },
      footer: {
        copyright: '© {year} Softqueen. All rights reserved.',
        madeWith: 'Made with',
        by: 'by Softqueen Team',
      },
    },
    bn: {
      company: {
        name: 'সফটকুইন',
        description: 'অত্যাধুনিক প্রযুক্তির সাথে ব্যতিক্রমী ডিজিটাল অভিজ্ঞতা তৈরি। আমরা ব্যবসায়িক উন্নয়নের জন্য উদ্ভাবনী সফটওয়্যার সমাধানে বিশেষজ্ঞ।',
        location: 'ঢাকা, বাংলাদেশ',
        address: 'ইকবাল রোড, মোহাম্মদপুর, ঢাকা, বাংলাদেশ',
      },
      quickLinks: {
        title: 'দ্রুত লিঙ্ক',
        links: ['হোম', 'আমাদের সম্পর্কে', 'প্রকল্প', 'যোগাযোগ', 'রিভিউ'],
      },
      contact: {
        title: 'যোগাযোগের তথ্য',
        email: 'hello@softqueen.com',
        phone: '+৮৮০ ১২৩৪-৫৬৭৮৯০',
      },
      newsletter: {
        title: 'আপডেট থাকুন',
        description: 'সর্বশেষ আপডেট এবং তথ্যের জন্য আমাদের নিউজলেটারে সাবস্ক্রাইব করুন।',
        placeholder: 'আপনার ইমেইল লিখুন',
        submit: 'সাবস্ক্রাইব করুন',
        success: 'সাবস্ক্রাইব করার জন্য ধন্যবাদ!',
        error: 'সাবস্ক্রাইব করতে ব্যর্থ। আবার চেষ্টা করুন।',
        invalidEmail: 'অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা লিখুন।',
        duplicateEmail: 'এই ইমেইল ইতিমধ্যে সাবস্ক্রাইব করা আছে।',
      },
      social: {
        title: 'আমাদের অনুসরণ করুন',
      },
      footer: {
        copyright: '© {year} সফটকুইন। সর্বস্বত্ব সংরক্ষিত।',
        madeWith: 'প্রেমের সাথে তৈরি',
        by: 'সফটকুইন টিম দ্বারা',
      },
    },
  };

  const currentContent = content[language];
  const currentYear = new Date().getFullYear();

  // Validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle newsletter subscription
  const handleSubscribe = async () => {
    if (!email) {
      setEmailError(currentContent.newsletter.error);
      return;
    }
    if (!validateEmail(email)) {
      setEmailError(currentContent.newsletter.invalidEmail);
      return;
    }

    // Check for duplicate email
    const { data: existingEmails, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', email);

    if (checkError) {
      console.error('Error checking email:', checkError);
      setMessage(currentContent.newsletter.error);
      setEmailError('');
      return;
    }

    if (existingEmails && existingEmails.length > 0) {
      setEmailError(currentContent.newsletter.duplicateEmail);
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, subscribed_at: new Date().toISOString() }]);

    setIsSubmitting(false);
    if (error) {
      console.error('Error subscribing:', error);
      setMessage(currentContent.newsletter.error);
      setEmailError('');
    } else {
      setEmail('');
      setMessage(currentContent.newsletter.success);
      setEmailError('');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <footer
      className={`py-12 relative ${
        darkMode
          ? 'bg-gradient-to-b from-gray-900 to-gray-800'
          : 'bg-gradient-to-b from-gray-50 to-gray-100'
      } font-poppins`}
      role="contentinfo"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="sm:col-span-2 md:col-span-1 animate-slide-up">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center relative overflow-hidden group">
                  <span className="text-white font-bold text-sm z-10">SQ</span>
                  <span className="absolute inset-0 bg-gradient-to-t from-blue-600 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                </div>
                <span
                  className={`text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {currentContent.company.name}
                </span>
              </div>
              <p
                className={`text-sm mb-6 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                } max-w-md animate-slide-up delay-100`}
              >
                {currentContent.company.description}
              </p>
              <div className="flex items-center space-x-4 animate-slide-up delay-200">
                <div className="flex items-center space-x-2 group">
                  <MapPin
                    className={`text-blue-500 transition-transform duration-200 group-hover:scale-110`}
                    size={16}
                  />
                  <span
                    className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {currentContent.company.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links and Contact Info */}
            <div className="space-y-8 sm:col-span-2 md:col-span-1">
              {/* Quick Links */}
              <div className="animate-slide-up delay-300">
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {currentContent.quickLinks.title}
                </h3>
                <ul className="space-y-2">
                  {currentContent.quickLinks.links.map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className={`text-sm relative transition-all duration-200 ${
                          darkMode
                            ? 'text-gray-300 hover:text-white'
                            : 'text-gray-600 hover:text-gray-800'
                        } inline-block group`}
                        aria-label={`Go to ${item} section`}
                      >
                        {item}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="animate-slide-up delay-400">
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {currentContent.contact.title}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 group">
                    <Mail
                      className={`text-blue-500 transition-transform duration-200 group-hover:scale-110`}
                      size={16}
                    />
                    <a
                      href={`mailto:${currentContent.contact.email}`}
                      className={`text-sm relative ${
                        darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                      } inline-block group`}
                    >
                      {currentContent.contact.email}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 group">
                    <Phone
                      className={`text-blue-500 transition-transform duration-200 group-hover:scale-110`}
                      size={16}
                    />
                    <a
                      href={`tel:${currentContent.contact.phone}`}
                      className={`text-sm relative ${
                        darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                      } inline-block group`}
                    >
                      {currentContent.contact.phone}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </div>
                  <div className="flex items-start space-x-2 group">
                    <MapPin
                      className={`text-blue-500 mt-0.5 transition-transform duration-200 group-hover:scale-110`}
                      size={16}
                    />
                    <span
                      className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {currentContent.company.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup and Social Media */}
            <div className="space-y-8 sm:col-span-2 md:col-span-1 animate-slide-up delay-500">
              {/* Newsletter Signup */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {currentContent.newsletter.title}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {currentContent.newsletter.description}
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    placeholder={currentContent.newsletter.placeholder}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      emailError ? 'border-red-500' : ''
                    }`}
                    aria-label="Email for newsletter subscription"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-error' : undefined}
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={isSubmitting}
                    className={`relative p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    } overflow-hidden group`}
                    aria-label={currentContent.newsletter.submit}
                  >
                    <span className="relative z-10">
                      <Send size={16} />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                  </button>
                </div>
                {(emailError || message) && (
                  <p
                    className={`text-sm mt-2 ${
                      emailError || message === currentContent.newsletter.error
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >
                    {emailError || message}
                  </p>
                )}
              </div>

              {/* Social Media Links */}
              <div className="animate-slide-up delay-600">
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {currentContent.social.title}
                </h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: 'https://facebook.com/softqueen', label: 'Facebook' },
                    { icon: Twitter, href: 'https://twitter.com/softqueen', label: 'Twitter' },
                    { icon: Instagram, href: 'https://instagram.com/softqueen', label: 'Instagram' },
                    { icon: Linkedin, href: 'https://linkedin.com/company/softqueen', label: 'LinkedIn' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative p-2 rounded-full transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-800 text-gray-300 hover:text-white'
                          : 'bg-gray-100 text-gray-600 hover:text-gray-800'
                      } group`}
                      aria-label={`Follow us on ${label}`}
                    >
                      <Icon className="group-hover:scale-110 transition-transform duration-200" size={20} />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className={`mt-8 pt-8 border-t ${
              darkMode ? 'border-gray-800' : 'border-gray-200'
            } animate-slide-up delay-700`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {currentContent.footer.copyright.replace('{year}', currentYear.toString())}
              </p>
              <div className="flex items-center space-x-1">
                <span
                  className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {currentContent.footer.madeWith}
                </span>
                <Heart
                  className="text-red-500 fill-current animate-pulse"
                  size={16}
                />
                <span
                  className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {currentContent.footer.by}
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
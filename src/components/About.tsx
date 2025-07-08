import React, { useState, useRef } from 'react';
import { MapPin, Target, Eye, Users, ArrowRight, X, Code as CodeIcon, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';
import Toast from './Toast'; // Assuming Toast.tsx is in the same directory or adjust the import path

interface AboutProps {
  darkMode: boolean;
  language?: string;
}

const About: React.FC<AboutProps> = ({ darkMode, language = 'en' }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    codeSubmission: '',
    designFile: null as File | null,
  });
  const [errors, setErrors] = useState({ name: '', email: '', position: '', codeSubmission: '', designFile: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'warning' | 'info' }>({
    show: false,
    message: '',
    type: 'success',
  });

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
      form: {
        title: 'Apply to Join Our Team',
        name: 'Your Name',
        email: 'Your Email',
        position: 'Select Position',
        positionOptions: [
          { value: '', label: 'Select a position' },
          { value: 'web_developer', label: 'Web Developer' },
          { value: 'designer', label: 'Designer' },
        ],
        codeSubmission: 'Code Submission (Bug Fix)',
        designFile: 'Design File Upload',
        submit: 'Submit Application',
        success: 'Application submitted successfully! We will review your submission soon.',
        error: 'Failed to submit application. Please try again.',
        duplicate: 'You have already applied.',
        requiredName: 'Name is required',
        requiredEmail: 'Valid email is required',
        requiredPosition: 'Please select a position',
        requiredCode: 'Code submission is required for Web Developer',
        requiredDesign: 'Design file is required for Designer',
        fileSizeError: 'File size must be under 5MB',
        fileTypeError: 'Only PNG, JPG, JPEG, or PDF files are allowed',
        codeChallengeTitle: 'Web Developer Bug Fix Challenge',
        codeChallengeDesc:
          'Fix the following bug in a React component: The button click event does not update the state correctly. Submit your corrected code below.\n\n```jsx\nconst Counter = () => {\n  let count = 0;\n  const increment = () => {\n    count++;\n    console.log(count);\n  };\n  return <button onClick={increment}>Count: {count}</button>;\n};\n```',
        designChallengeTitle: 'Designer UI Challenge',
        designChallengeDesc:
          'Design a landing page for a modern SaaS product. Requirements:\n- Clean, minimalistic design\n- Responsive layout for mobile and desktop\n- Use blue and purple gradient colors\n- Include a hero section, feature cards, and CTA button\nSubmit your design as a PNG, JPG, JPEG, or PDF file.',
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
      form: {
        title: 'আমাদের দলে যোগ দেওয়ার জন্য আবেদন করুন',
        name: 'আপনার নাম',
        email: 'আপনার ইমেইল',
        position: 'পজিশন নির্বাচন করুন',
        positionOptions: [
          { value: '', label: 'একটি পজিশন নির্বাচন করুন' },
          { value: 'web_developer', label: 'ওয়েব ডেভেলপার' },
          { value: 'designer', label: 'ডিজাইনার' },
        ],
        codeSubmission: 'কোড সাবমিশন (বাগ ফিক্স)',
        designFile: 'ডিজাইন ফাইল আপলোড',
        submit: 'আবেদন জমা দিন',
        success: 'আবেদন সফলভাবে জমা দেওয়া হয়েছে! আমরা শীঘ্রই আপনার সাবমিশন রিভিউ করব।',
        error: 'আবেদন জমা দিতে ব্যর্থ। আবার চেষ্টা করুন।',
        duplicate: 'আপনি ইতিমধ্যে আবেদন করেছেন।',
        requiredName: 'নাম প্রয়োজন',
        requiredEmail: 'বৈধ ইমেইল প্রয়োজন',
        requiredPosition: 'অনুগ্রহ করে একটি পজিশন নির্বাচন করুন',
        requiredCode: 'ওয়েব ডেভেলপারের জন্য কোড সাবমিশন প্রয়োজন',
        requiredDesign: 'ডিজাইনারের জন্য ডিজাইন ফাইল প্রয়োজন',
        fileSizeError: 'ফাইলের আকার ৫ এমবি-এর নিচে হতে হবে',
        fileTypeError: 'শুধুমাত্র PNG, JPG, JPEG, বা PDF ফাইল গ্রহণযোগ্য',
        codeChallengeTitle: 'ওয়েব ডেভেলপার বাগ ফিক্স চ্যালেঞ্জ',
        codeChallengeDesc:
          'নিচের React কম্পোনেন্টে একটি বাগ ফিক্স করুন: বাটন ক্লিক ইভেন্ট সঠিকভাবে স্টেট আপডেট করছে না। নিচে আপনার সংশোধিত কোড জমা দিন।\n\n```jsx\nconst Counter = () => {\n  let count = 0;\n  const increment = () => {\n    count++;\n    console.log(count);\n  };\n  return <button onClick={increment}>Count: {count}</button>;\n};\n```',
        designChallengeTitle: 'ডিজাইনার UI চ্যালেঞ্জ',
        designChallengeDesc:
          'একটি আধুনিক SaaS প্রোডাক্টের জন্য ল্যান্ডিং পেজ ডিজাইন করুন। প্রয়োজনীয়তা:\n- পরিষ্কার, মিনিমালিস্টিক ডিজাইন\n- মোবাইল এবং ডেস্কটপের জন্য রেসপন্সিভ লেআউট\n- নীল এবং বেগুনি গ্র্যাডিয়েন্ট রঙ ব্যবহার করুন\n- হিরো সেকশন, ফিচার কার্ড, এবং CTA বাটন অন্তর্ভুক্ত করুন\nআপনার ডিজাইন PNG, JPG, JPEG, বা PDF ফাইল হিসেবে জমা দিন।',
      },
    },
  };

  const currentContent = content[language];

  // Form handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = { name: '', email: '', position: '', codeSubmission: '', designFile: '' };

    // Form validation
    if (!formData.name) newErrors.name = currentContent.form.requiredName;
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = currentContent.form.requiredEmail;
    if (!formData.position) newErrors.position = currentContent.form.requiredPosition;
    if (formData.position === 'web_developer' && !formData.codeSubmission)
      newErrors.codeSubmission = currentContent.form.requiredCode;
    if (formData.position === 'designer' && !formData.designFile)
      newErrors.designFile = currentContent.form.requiredDesign;
    if (formData.designFile && formData.designFile.size > 5 * 1024 * 1024)
      newErrors.designFile = currentContent.form.fileSizeError;
    if (
      formData.designFile &&
      !['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(formData.designFile.type)
    )
      newErrors.designFile = currentContent.form.fileTypeError;

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      try {
        let filePath = null;
        if (formData.designFile) {
          const fileExt = formData.designFile.name.split('.').pop();
          const fileName = `${Date.now()}_${formData.email}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from('job-applications')
            .upload(fileName, formData.designFile);
          if (uploadError) throw uploadError;
          filePath = fileName;
        }

        const { data: existingApplications } = await supabase
          .from('job_applications')
          .select('email')
          .eq('email', formData.email);
        if (existingApplications && existingApplications.length > 0) {
          setToast({
            show: true,
            message: currentContent.form.duplicate,
            type: 'error',
          });
          setIsSubmitting(false);
          return;
        }

        const { error } = await supabase.from('job_applications').insert([
          {
            name: formData.name,
            email: formData.email,
            position: formData.position,
            code_submission: formData.codeSubmission,
            design_file: filePath,
          },
        ]);

        if (error) throw error;

        setToast({
          show: true,
          message: currentContent.form.success,
          type: 'success',
        });

        setFormData({ name: '', email: '', position: '', codeSubmission: '', designFile: null });
        setFilePreview(null);
        setShowModal(false);
      } catch (error) {
        console.error('Error submitting application:', error);
        setToast({
          show: true,
          message: currentContent.form.error,
          type: 'error',
        });
      }
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, designFile: currentContent.form.fileSizeError });
        return;
      }
      if (!['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type)) {
        setErrors({ ...errors, designFile: currentContent.form.fileTypeError });
        return;
      }
      setFormData({ ...formData, designFile: file });
      setErrors({ ...errors, designFile: '' });
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, designFile: null });
      setFilePreview(null);
    }
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, designFile: null });
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section
      className={`py-20 relative overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      } font-poppins`}
      role="region"
      aria-label="About Section"
    >
      {/* Custom Toast component */}
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        darkMode={darkMode}
        type={toast.type}
        position="bottom-right"
        duration={4000}
        language={language}
      />

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
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-slide-up delay-200 cursor-pointer`}
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
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-slide-up delay-300 cursor-pointer`}
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
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-slide-up delay-400 cursor-pointer`}
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
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-slide-up delay-500 cursor-pointer`}
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
            } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 text-center animate-slide-up delay-600 cursor-pointer`}
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
              onClick={() => setShowModal(true)}
              className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden group cursor-pointer"
              aria-label={currentContent.team.cta}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>{currentContent.team.cta}</span>
                <ArrowRight size={20} />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
            </button>
          </div>

          {/* Enhanced Modal for Job Application Form */}
          {showModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-y-auto py-8">
              <div
                className={`p-8 rounded-2xl ${
                  darkMode ? 'bg-gray-900/95' : 'bg-white/95'
                } max-w-2xl w-full relative shadow-2xl animate-slide-up backdrop-blur-lg border ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                } transition-all duration-500 max-h-[90vh] overflow-y-auto`}
              >
                <button
                  onClick={() => {
                    setShowModal(false);
                    setFilePreview(null);
                    setFormData({ name: '', email: '', position: '', codeSubmission: '', designFile: null });
                    setErrors({ name: '', email: '', position: '', codeSubmission: '', designFile: '' });
                  }}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={28} />
                </button>
                <h3
                  className={`text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}
                >
                  {currentContent.form.title}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        } mb-1`}
                      >
                        {currentContent.form.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg border ${
                          darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md cursor-text`}
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
                        } mb-1`}
                      >
                        {currentContent.form.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg border ${
                          darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md cursor-text`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="position"
                      className={`block text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      } mb-1`}
                    >
                      {currentContent.form.position}
                    </label>
                    <div className="relative">
                      <select
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={(e) => {
                          handleInputChange(e);
                          setFilePreview(null);
                          setFormData({ ...formData, position: e.target.value, codeSubmission: '', designFile: null });
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className={`w-full p-3 rounded-lg border appearance-none ${
                          darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md cursor-pointer`}
                        aria-invalid={!!errors.position}
                        aria-describedby={errors.position ? 'position-error' : undefined}
                      >
                        {currentContent.form.positionOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ArrowRight
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                        size={20}
                      />
                    </div>
                    {errors.position && (
                      <p id="position-error" className="text-red-500 text-sm mt-1">
                        {errors.position}
                      </p>
                    )}
                  </div>
                  {formData.position === 'web_developer' && (
                    <div>
                      <h4
                        className={`text-lg font-semibold mb-2 ${
                          darkMode ? 'text-white' : 'text-gray-800'
                        } flex items-center`}
                      >
                        <CodeIcon size={20} className="mr-2" />
                        {currentContent.form.codeChallengeTitle}
                      </h4>
                      <p
                        className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 whitespace-pre-wrap`}
                      >
                        {currentContent.form.codeChallengeDesc}
                      </p>
                      <label
                        htmlFor="codeSubmission"
                        className={`block text-sm font-medium ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        } mb-1`}
                      >
                        {currentContent.form.codeSubmission}
                      </label>
                      <textarea
                        id="codeSubmission"
                        name="codeSubmission"
                        value={formData.codeSubmission}
                        onChange={handleInputChange}
                        rows={6}
                        className={`w-full p-3 rounded-lg border font-mono text-sm ${
                          darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md cursor-text`}
                        aria-invalid={!!errors.codeSubmission}
                        aria-describedby={errors.codeSubmission ? 'codeSubmission-error' : undefined}
                      />
                      {formData.codeSubmission && (
                        <div className="mt-2 p-4 bg-gray-800/50 rounded-lg">
                          <h5 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {language === 'en' ? 'Code Preview' : 'কোড প্রিভিউ'}
                          </h5>
                          <pre className="text-sm text-gray-300 mt-2 overflow-x-auto">
                            <code>{formData.codeSubmission}</code>
                          </pre>
                        </div>
                      )}
                      {errors.codeSubmission && (
                        <p id="codeSubmission-error" className="text-red-500 text-sm mt-1">
                          {errors.codeSubmission}
                        </p>
                      )}
                    </div>
                  )}
                  {formData.position === 'designer' && (
                    <div>
                      <h4
                        className={`text-lg font-semibold mb-2 ${
                          darkMode ? 'text-white' : 'text-gray-800'
                        } flex items-center`}
                      >
                        <ImageIcon size={20} className="mr-2" />
                        {currentContent.form.designChallengeTitle}
                      </h4>
                      <p
                        className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 whitespace-pre-wrap`}
                      >
                        {currentContent.form.designChallengeDesc}
                      </p>
                      <label
                        htmlFor="designFile"
                        className={`block text-sm font-medium ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        } mb-1`}
                      >
                        {currentContent.form.designFile}
                      </label>
                      <div
                        className={`relative flex items-center justify-center p-4 border-2 border-dashed rounded-lg ${
                          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-100'
                        } hover:bg-opacity-80 transition-all duration-200 cursor-pointer`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          type="file"
                          id="designFile"
                          name="designFile"
                          accept=".png,.jpg,.jpeg,.pdf"
                          onChange={handleFileChange}
                          className="hidden"
                          ref={fileInputRef}
                          aria-invalid={!!errors.designFile}
                          aria-describedby={errors.designFile ? 'designFile-error' : undefined}
                        />
                        <p
                          className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center flex items-center`}
                        >
                          <ImageIcon size={20} className="mr-2" />
                          {formData.designFile
                            ? formData.designFile.name
                            : language === 'en'
                            ? 'Drag and drop or click to upload'
                            : 'ড্র্যাগ এবং ড্রপ করুন বা ক্লিক করে আপলোড করুন'}
                        </p>
                      </div>
                      {filePreview && (
                        <div className="mt-4">
                          <h5 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {language === 'en' ? 'File Preview' : 'ফাইল প্রিভিউ'}
                          </h5>
                          <div className="relative mt-2 p-4 bg-gray-800/50 rounded-lg">
                            {formData.designFile?.type.startsWith('image/') ? (
                              <img
                                src={filePreview}
                                alt="Design preview"
                                className="max-w-full h-auto rounded-lg max-h-64 mx-auto"
                              />
                            ) : (
                              <a
                                href={filePreview}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-blue-500 hover:underline flex items-center cursor-pointer`}
                              >
                                <ImageIcon size={20} className="mr-2" />
                                {language === 'en' ? 'View PDF' : 'PDF দেখুন'}
                              </a>
                            )}
                            <button
                              onClick={handleRemoveFile}
                              className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer"
                              aria-label="Remove file"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      )}
                      {errors.designFile && (
                        <p id="designFile-error" className="text-red-500 text-sm mt-1">
                          {errors.designFile}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden group cursor-pointer ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      aria-label={currentContent.form.submit}
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>{currentContent.form.submit}</span>
                        <ArrowRight size={20} />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default About;
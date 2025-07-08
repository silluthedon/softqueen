import React, { useState, useEffect } from 'react';
import { Star, User, MessageSquare, ArrowRight } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface Review {
  id: number;
  name: string;
  project: string;
  comment: string;
  rating: number;
  date: string;
}

interface ReviewsProps {
  darkMode: boolean;
  showToast: (message: string) => void;
  language?: string;
}

const Reviews: React.FC<ReviewsProps> = ({ darkMode, showToast, language = 'en' }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    project: '',
    comment: '',
    rating: 0,
  });
  const [errors, setErrors] = useState({ name: '', project: '', comment: '', rating: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');
  const [filterProject, setFilterProject] = useState<string>('All');

  const projects = ['Kacchi Prime', 'Zerotreat'];

  const content = {
    en: {
      title: 'Client Reviews',
      subtitle: 'See what our clients are saying about our projects and services.',
      form: {
        title: 'Leave a Review',
        name: 'Your Name',
        project: 'Project',
        rating: 'Rating',
        comment: 'Your Review',
        submit: 'Submit Review',
        placeholder: {
          name: 'Enter your name',
          project: 'Select a project',
          comment: 'Tell us about your experience...',
        },
        errors: {
          name: 'Name is required',
          project: 'Please select a project',
          comment: 'Review is required',
          rating: 'Please select a rating',
        },
      },
      recentReviews: {
        title: 'Recent Reviews',
        noReviews: 'No reviews yet. Be the first to leave a review!',
      },
      filters: {
        all: 'All',
        sortBy: {
          date: 'Sort by Date',
          rating: 'Sort by Rating',
        },
      },
    },
    bn: {
      title: 'ক্লায়েন্ট রিভিউ',
      subtitle: 'আমাদের প্রকল্প এবং পরিষেবা সম্পর্কে আমাদের ক্লায়েন্টরা কী বলছেন তা দেখুন।',
      form: {
        title: 'একটি রিভিউ দিন',
        name: 'আপনার নাম',
        project: 'প্রকল্প',
        rating: 'রেটিং',
        comment: 'আপনার রিভিউ',
        submit: 'রিভিউ জমা দিন',
        placeholder: {
          name: 'আপনার নাম লিখুন',
          project: 'একটি প্রকল্প নির্বাচন করুন',
          comment: 'আপনার অভিজ্ঞতা সম্পর্কে বলুন...',
        },
        errors: {
          name: 'নাম প্রয়োজন',
          project: 'অনুগ্রহ করে একটি প্রকল্প নির্বাচন করুন',
          comment: 'রিভিউ প্রয়োজন',
          rating: 'অনুগ্রহ করে একটি রেটিং নির্বাচন করুন',
        },
      },
      recentReviews: {
        title: 'সাম্প্রতিক রিভিউ',
        noReviews: 'এখনও কোনো রিভিউ নেই। প্রথম রিভিউ দিন!',
      },
      filters: {
        all: 'সব',
        sortBy: {
          date: 'তারিখ অনুযায়ী সাজান',
          rating: 'রেটিং অনুযায়ী সাজান',
        },
      },
    },
  };

  const currentContent = content[language];

  // Fetch reviews from Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: sortBy === 'date' ? false : true });

      if (error) {
        console.error('Error fetching reviews:', error);
        showToast(currentContent.form.errors.rating);
      } else {
        setReviews(data || []);
      }
    };

    fetchReviews();
  }, [sortBy, showToast, language]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReviewForm({ ...reviewForm, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  // Handle review submission
  const handleSubmitReview = async () => {
    const newErrors = { name: '', project: '', comment: '', rating: '' };

    if (!reviewForm.name) newErrors.name = currentContent.form.errors.name;
    if (!reviewForm.project) newErrors.project = currentContent.form.errors.project;
    if (!reviewForm.comment) newErrors.comment = currentContent.form.errors.comment;
    if (reviewForm.rating === 0) newErrors.rating = currentContent.form.errors.rating;

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      showToast(currentContent.form.errors.rating);
      return;
    }

    setIsSubmitting(true);
    const newReview = {
      name: reviewForm.name,
      project: reviewForm.project,
      comment: reviewForm.comment,
      rating: reviewForm.rating,
      date: new Date().toLocaleDateString(),
    };

    const { data, error } = await supabase
      .from('reviews')
      .insert([newReview])
      .select();

    setIsSubmitting(false);
    if (error) {
      console.error('Error saving review:', error);
      showToast(language === 'en' ? 'Failed to submit review. Please try again.' : 'রিভিউ জমা দিতে ব্যর্থ। আবার চেষ্টা করুন।');
    } else {
      setReviews([data[0], ...reviews]);
      setReviewForm({ name: '', project: '', comment: '', rating: 0 });
      showToast(language === 'en' ? 'Thank you for your review!' : 'আপনার রিভিউর জন্য ধন্যবাদ!');
    }
  };

  // Render star ratings
  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={24}
            className={`${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : darkMode
                ? 'text-gray-600'
                : 'text-gray-300'
            } ${
              interactive
                ? 'cursor-pointer transition-colors duration-200 hover:text-yellow-400 hover:fill-current'
                : ''
            }`}
            onClick={() => interactive && setReviewForm({ ...reviewForm, rating: star })}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
          />
        ))}
      </div>
    );
  };

  // Sort and filter reviews
  const sortedAndFilteredReviews = reviews
    .filter((review) => (filterProject === 'All' ? true : review.project === filterProject))
    .sort((a, b) => (sortBy === 'rating' ? b.rating - a.rating : new Date(b.date).getTime() - new Date(a.date).getTime()));

  return (
    <section
      className={`py-20 relative overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      } font-poppins`}
      role="region"
      aria-label="Reviews Section"
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
                Reviews
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
            {/* Review Form */}
            <div
              className={`p-8 rounded-xl ${
                darkMode ? 'bg-gray-800/80' : 'bg-white/80'
              } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up delay-200 h-fit`}
              role="form"
            >
              <div className="flex items-center mb-6">
                <MessageSquare className="text-blue-500 mr-3" size={24} />
                <h3
                  className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {currentContent.form.title}
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {currentContent.form.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={reviewForm.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder={currentContent.form.placeholder.name}
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
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {currentContent.form.project}
                  </label>
                  <select
                    name="project"
                    value={reviewForm.project}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-800'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.project ? 'border-red-500' : ''
                    }`}
                    aria-invalid={!!errors.project}
                    aria-describedby={errors.project ? 'project-error' : undefined}
                  >
                    <option value="">{currentContent.form.placeholder.project}</option>
                    {projects.map((project) => (
                      <option key={project} value={project}>
                        {project}
                      </option>
                    ))}
                  </select>
                  {errors.project && (
                    <p id="project-error" className="text-red-500 text-sm mt-1">
                      {errors.project}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {currentContent.form.rating}
                  </label>
                  {renderStars(reviewForm.rating, true)}
                  {errors.rating && (
                    <p className="text-red-500 text-sm mt-2">{errors.rating}</p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {currentContent.form.comment}
                  </label>
                  <textarea
                    name="comment"
                    value={reviewForm.comment}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.comment ? 'border-red-500' : ''
                    }`}
                    placeholder={currentContent.form.placeholder.comment}
                    aria-invalid={!!errors.comment}
                    aria-describedby={errors.comment ? 'comment-error' : undefined}
                  />
                  {errors.comment && (
                    <p id="comment-error" className="text-red-500 text-sm mt-1">
                      {errors.comment}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting}
                  className={`relative w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 overflow-hidden group ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  aria-label={currentContent.form.submit}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>{currentContent.form.submit}</span>
                    <ArrowRight size={20} />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                  {isSubmitting && (
                    <svg
                      className="animate-spin h-5 w-5 text-white absolute z-10"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6 animate-slide-up delay-300">
                <h3
                  className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {currentContent.recentReviews.title} ({sortedAndFilteredReviews.length})
                </h3>
                <div className="flex space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'rating')}
                    className={`px-4 py-2 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-800'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="date">{currentContent.filters.sortBy.date}</option>
                    <option value="rating">{currentContent.filters.sortBy.rating}</option>
                  </select>
                  <select
                    value={filterProject}
                    onChange={(e) => setFilterProject(e.target.value)}
                    className={`px-4 py-2 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-800'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="All">{currentContent.filters.all}</option>
                    {projects.map((project) => (
                      <option key={project} value={project}>
                        {project}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {sortedAndFilteredReviews.length === 0 ? (
                <div
                  className={`p-8 rounded-xl ${
                    darkMode ? 'bg-gray-800/80' : 'bg-white/80'
                  } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md text-center animate-slide-up delay-400`}
                >
                  <MessageSquare
                    className={`mx-auto mb-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                    size={48}
                  />
                  <p
                    className={`text-lg ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {currentContent.recentReviews.noReviews}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                  {sortedAndFilteredReviews.map((review, index) => (
                    <div
                      key={review.id}
                      className={`p-6 rounded-xl ${
                        darkMode ? 'bg-gray-800/80' : 'bg-white/80'
                      } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up delay-${
                        500 + index * 100
                      }`}
                      role="article"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative overflow-hidden group">
                            <User className="text-white z-10" size={20} />
                            <span className="absolute inset-0 bg-gradient-to-t from-blue-600 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                          </div>
                          <div>
                            <h4
                              className={`font-semibold ${
                                darkMode ? 'text-white' : 'text-gray-800'
                              }`}
                            >
                              {review.name}
                            </h4>
                            <p
                              className={`text-sm ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              {review.project}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {renderStars(review.rating)}
                          <span
                            className={`text-sm ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {review.date}
                          </span>
                        </div>
                      </div>
                      <p
                        className={`${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
import React, { useState, useEffect } from 'react';
import { Star, User, MessageSquare } from 'lucide-react';
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
}

const Reviews: React.FC<ReviewsProps> = ({ darkMode, showToast }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    project: '',
    comment: '',
    rating: 0 // Default rating set to 0 to encourage user selection
  });

  const projects = ['Kacchi Prime', 'Zerotreat'];

  // Fetch reviews from Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        showToast('Failed to load reviews. Please try again.');
      } else {
        setReviews(data || []);
      }
    };

    fetchReviews();
  }, [showToast]);

  // Handle review submission
  const handleSubmitReview = async () => {
    if (!reviewForm.name || !reviewForm.project || !reviewForm.comment || reviewForm.rating === 0) {
      showToast('Please fill in all fields and select a rating.');
      return;
    }

    const newReview = {
      name: reviewForm.name,
      project: reviewForm.project,
      comment: reviewForm.comment,
      rating: reviewForm.rating,
      date: new Date().toLocaleDateString()
    };

    const { data, error } = await supabase
      .from('reviews')
      .insert([newReview])
      .select();

    if (error) {
      console.error('Error saving review:', error);
      showToast('Failed to submit review. Please try again.');
    } else {
      setReviews([data[0], ...reviews]);
      setReviewForm({
        name: '',
        project: '',
        comment: '',
        rating: 0
      });
      showToast('Thank you for your review!');
    }
  };

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
            onClick={() => interactive && setReviewForm({...reviewForm, rating: star})}
          />
        ))}
      </div>
    );
  };

  return (
    <section className={`py-20 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Client <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Reviews</span>
            </h2>
            <p className={`text-xl ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-3xl mx-auto`}>
              See what our clients are saying about our projects and services
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Review Form */}
            <div className={`p-8 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} h-fit`}>
              <div className="flex items-center mb-6">
                <MessageSquare className="text-blue-500 mr-3" size={24} />
                <h3 className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Leave a Review
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Project
                  </label>
                  <select
                    value={reviewForm.project}
                    onChange={(e) => setReviewForm({...reviewForm, project: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-800'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select a project</option>
                    {projects.map((project) => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Rating
                  </label>
                  {renderStars(reviewForm.rating, true)}
                  {reviewForm.rating === 0 && (
                    <p className={`text-sm ${
                      darkMode ? 'text-red-400' : 'text-red-500'
                    } mt-2`}>
                      Please select a rating
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Your Review
                  </label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Tell us about your experience..."
                  />
                </div>

                <button
                  onClick={handleSubmitReview}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  Submit Review
                </button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              <h3 className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Recent Reviews ({reviews.length})
              </h3>

              {reviews.length === 0 ? (
                <div className={`p-8 rounded-xl ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
                  <MessageSquare className={`mx-auto mb-4 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} size={48} />
                  <p className={`text-lg ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    No reviews yet. Be the first to leave a review!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className={`p-6 rounded-xl ${
                        darkMode ? 'bg-gray-800' : 'bg-white'
                      } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="text-white" size={20} />
                          </div>
                          <div>
                            <h4 className={`font-semibold ${
                              darkMode ? 'text-white' : 'text-gray-800'
                            }`}>
                              {review.name}
                            </h4>
                            <p className={`text-sm ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {review.project}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {renderStars(review.rating)}
                          <span className={`text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {review.date}
                          </span>
                        </div>
                      </div>
                      <p className={`${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
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
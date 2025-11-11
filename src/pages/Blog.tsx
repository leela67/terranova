import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import terranovaAPI from '@/services/api';
import type { APIError, Blog } from '@/types/api';

const Blog = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showNewsletterSuccess, setShowNewsletterSuccess] = useState(false);
  const [showNewsletterError, setShowNewsletterError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogError, setBlogError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setBlogError(null);
        const blogs = await terranovaAPI.getBlogs({ page: 1, limit: 100 });
        setBlogPosts(blogs);
      } catch (err: any) {
        setBlogError(err.error || 'Failed to load blog posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset states
    setShowNewsletterError(false);
    setShowNewsletterSuccess(false);
    setIsSubmitting(true);

    try {
      // Submit to API
      await terranovaAPI.subscribeNewsletter(newsletterEmail);

      // Success
      setSubmittedEmail(newsletterEmail);
      setShowNewsletterSuccess(true);
      setNewsletterEmail('');

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowNewsletterSuccess(false);
      }, 5000);
    } catch (error) {
      // Error handling
      const apiError = error as APIError;
      setErrorMessage(apiError.error || 'Failed to subscribe. Please try again.');
      setShowNewsletterError(true);

      // Hide error message after 5 seconds
      setTimeout(() => {
        setShowNewsletterError(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[100svh] md:min-h-[100dvh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
              alt="Real estate market insights and trends"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/60 via-neutral-900/40 to-neutral-900/60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-overline text-text-inverse/80 mb-4 tracking-widest">
                Latest Insights & Market Trends
              </p>
              <h1 className="heading-section text-text-inverse mb-6">
                Real Estate Tips & Expert Advice
              </h1>
              <p className="text-subtitle text-text-inverse/90 max-w-2xl mx-auto">
                Discover expert insights, market trends, and valuable tips for your real estate journey
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                <p className="mt-4 text-text-secondary">Loading blog posts...</p>
              </div>
            )}

            {blogError && (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-800 font-medium mb-4">{blogError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="btn-primary"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {!loading && !blogError && blogPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg">No blog posts available at the moment.</p>
              </div>
            )}

            {!loading && !blogError && blogPosts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => {
                  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  });

                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                    >
                      <Link to={`/blog/${post.slug}`} className="group block">
                        <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
                          <img
                            src={post.cover_image_url || '/images/placeholder.jpg'}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-4 text-sm text-text-muted">
                            <span className="bg-neutral-100 px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                            <span>{formattedDate}</span>
                          </div>

                          <h2 className="text-xl font-semibold text-text-primary group-hover:text-primary-600 transition-colors">
                            {post.title}
                          </h2>

                          <p className="text-text-secondary leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="pt-2">
                            <span className="text-primary-600 font-medium group-hover:underline inline-flex items-center gap-1">
                              Read More →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-neutral-50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="heading-lg text-text-primary mb-4">
              Stay Updated on the Market
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Get exclusive real estate insights, market trends, and property updates straight to your inbox.
            </p>

            {/* Success/Error Messages */}
            <AnimatePresence>
              {showNewsletterSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg max-w-md mx-auto"
                >
                  <p className="text-green-800 font-medium">
                    Thank you! You have successfully subscribed with {submittedEmail}
                  </p>
                </motion.div>
              )}
              {showNewsletterError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto"
                >
                  <p className="text-red-800 font-medium">
                    {errorMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-text-primary text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;

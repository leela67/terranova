import { Link } from 'react-router-dom';
import logoWhite from '@/assets/logo/terranova-logo-white.svg';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { terranovaAPI } from '@/services/api';
import type { APIError } from '@/types/api';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showNewsletterSuccess, setShowNewsletterSuccess] = useState(false);
  const [showNewsletterError, setShowNewsletterError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl section-padding">
        {/* Newsletter Section */}
        <div className="py-8 lg:py-16 border-b border-neutral-700">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="heading-section text-white content-spacing">
                Stay Updated on the Market
              </h3>
              <p className="text-body text-neutral-300">
                Get exclusive real estate insights, market trends, and property updates straight to your inbox.
              </p>
            </div>

            <div>
              {/* Success/Error Messages */}
              <AnimatePresence>
                {showNewsletterSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg"
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
                    className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <p className="text-red-800 font-medium">
                      {errorMessage}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Contact Information */}
            <div>
              <h4 className="text-body-lg font-semibold content-spacing text-white">Contact Information</h4>
              <div className="space-y-2 text-caption text-neutral-300">
                <p>+9121223335</p>
                <p>Contact@terranovadeveloper.in</p>
                <p>Terranova- 3rd floors, Arafath Complex, beside mugadha, road number 10, Barjara hills <br/> Hyderabad- 500034</p>
              </div>
            </div>

            {/* Pages */}
            <div>
              <h4 className="text-body-lg font-semibold content-spacing text-white">Pages</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-caption text-neutral-300 hover:text-white transition-colors">
                  Home
                </Link>
                <Link to="/about" className="block text-caption text-neutral-300 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link to="/contact" className="block text-caption text-neutral-300 hover:text-white transition-colors">
                  Let's Connect
                </Link>
              </div>
            </div>

            {/* CMS */}
            <div>
              <h4 className="text-body-lg font-semibold content-spacing text-white">CMS</h4>
              <div className="space-y-2">
                <Link to="/featured-properties" className="block text-caption text-neutral-300 hover:text-white transition-colors">
                  Featured Properties
                </Link>
                <Link to="/featured-properties" className="block text-caption text-neutral-300 hover:text-white transition-colors">
                  Past Transactions
                </Link>
                <Link to="/blog" className="block text-caption text-neutral-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </div>
            </div>

            {/* Utility */}
            <div>
              <h4 className="text-body-lg font-semibold content-spacing text-white">Utility</h4>
              <div className="space-y-2">
                <Link to="/404" className="block text-caption text-neutral-300 hover:text-white transition-colors">
                  404
                </Link>
                <Link to="/privacy" className="block text-caption text-neutral-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/careers" className="block text-caption text-neutral-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-4 lg:py-6 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <img
                src={logoWhite}
                alt="Terranova Logo"
                className="h-8 w-auto"
              />
            </div>

            <div className="text-center md:text-right">
              <p className="text-caption text-neutral-400">
                Designed by Leela & Srikanth
              </p>
              <p className="text-caption text-neutral-400">
                © 2025 Terranova. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import terranovaAPI from '@/services/api';
import type { APIError } from '@/types/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setShowError(false);
    setShowSuccess(false);
    setIsSubmitting(true);

    try {
      await terranovaAPI.submitContactForm({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        recaptcha_token: 'dummy_recaptcha_token_for_testing',
        property_id: null
      });

      setSubmittedName(`${formData.firstName} ${formData.lastName}`);
      setSubmittedEmail(formData.email);
      setShowSuccess(true);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });

      setTimeout(() => setShowSuccess(false), 6000);

    } catch (error) {
      const apiError = error as APIError;
      setErrorMessage(apiError.error || 'Failed to submit form. Please try again.');
      setShowError(true);
      setTimeout(() => setShowError(false), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&crop=center"
              alt="Modern office space"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="heading-display text-white mb-6">
                Let's Connect
              </h1>
              <p className="text-body-lg text-white/90 max-w-2xl mx-auto">
                Want us to design your dream farm? Share your details below and let Terranova bring your vision to reality.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Toasts */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto max-w-7xl px-6 lg:px-8 -mt-12 mb-8 relative z-20"
            >
              <div className="max-w-2xl mx-auto p-6 bg-green-50 border border-green-200 rounded-lg shadow-lg">
                <h3 className="text-green-800 font-semibold text-lg mb-2">
                  Thank you, {submittedName}!
                </h3>
                <p className="text-green-700">
                  Our team will contact you shortly at {submittedEmail}
                </p>
              </div>
            </motion.div>
          )}

          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto max-w-7xl px-6 lg:px-8 -mt-12 mb-8 relative z-20"
            >
              <div className="max-w-2xl mx-auto p-6 bg-red-50 border border-red-200 rounded-lg shadow-lg">
                <h3 className="text-red-800 font-semibold text-lg mb-2">
                  Submission Failed
                </h3>
                <p className="text-red-700">
                  {errorMessage}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Content */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="heading-lg text-text-primary mb-8">Get in Touch</h2>

                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">Phone</h3>
                      <p className="text-text-secondary">+9121223335</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">Email</h3>
                      <p className="text-text-secondary">Contact@terranovadeveloper.in</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">Office</h3>
                      <p className="text-text-secondary">
                        Terranova- 3rd floors, Arafath Complex, beside Mugadha, Road No.10, Banjara Hills <br /> Hyderabad - 500034
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-2">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-2">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">Message</label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { y: -2 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>

                </form>
              </motion.div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Contact;

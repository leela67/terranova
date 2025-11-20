import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://framerusercontent.com/images/k6XkilwTVOSakz8ryCuWrU7YQFg.jpg"
          alt="Luxury real estate background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/50"></div>
      </div>
 
      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-overline text-text-inverse/80 mb-4 tracking-widest">
            Find Your Dream Home Today
          </p>
          <h2 className="heading-xl text-text-inverse mb-8 font-serif">
            Buy, Sell & Rent Easily
          </h2>
          <p className="text-xl text-text-inverse/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Ready to take the next step in your real estate journey? Whether you're buying, selling, or renting, our experienced team is here to guide you through every step of the process.
          </p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link to="/contact" className="btn-primary">
              Let's Connect
            </Link>
            <Link
              to="/featured-properties"
              className="btn-secondary text-text-inverse border-text-inverse hover:bg-surface-elevated hover:text-text-primary"
            >
              View Properties
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
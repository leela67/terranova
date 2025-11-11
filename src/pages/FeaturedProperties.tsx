import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ScrollScaleImage } from '@/components/ScrollScaleImage'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import terranovaAPI from '@/services/api'
import type { Property } from '@/types/api'

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await terranovaAPI.getProperties({ page: 1, limit: 100 });
        setProperties(response.properties);
      } catch (err: any) {
        setError(err.error || 'Failed to load properties. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <main >
        {/* Hero Section */}
        <section className="relative min-h-[100svh] md:min-h-[100dvh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&h=1080&fit=crop&crop=center"
              alt="Luxury properties and real estate portfolio"
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
              <h1 className="heading-display text-text-inverse mb-6">
                Featured Properties
              </h1>
              <p className="text-body-lg text-text-inverse/90 max-w-2xl mx-auto">
                Discover our carefully curated collection of luxury properties in India's most desirable locations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                <p className="mt-4 text-text-secondary">Loading properties...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-800 font-medium mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="btn-primary"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {!loading && !error && properties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg">No properties available at the moment.</p>
              </div>
            )}

            {!loading && !error && properties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    className="h-full"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={`/properties/${property.id}`} className="group block h-full">
                      <div className="card-elevated overflow-hidden cursor-pointer h-full flex flex-col">
                        {/* Image stays a fixed ratio so every card starts same height */}
                        <ScrollScaleImage className="relative aspect-[3/2] overflow-hidden shrink-0">
                          <img
                            src={property.images?.[0]?.image_url || '/images/placeholder.jpg'}
                            alt={property.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading={index < 3 ? "eager" : "lazy"}
                          />

                          {/* Status Badge */}
                          <div className="absolute top-4 right-4 flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${property.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            <span className="bg-surface-elevated/90 backdrop-blur-sm text-text-primary text-xs font-medium px-3 py-1 rounded-full">
                              {property.status}
                            </span>
                          </div>
                        </ScrollScaleImage>

                        {/* Content area grows to fill and lines up across cards */}
                        <div className="p-6 flex flex-col gap-3 grow">
                          {/* Fix title height to 2 lines max */}
                          <h3 className="text-lg font-medium text-text-primary group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug min-h-[3.25rem]">
                               {property.name}
                          </h3>

                          {/* Push meta row to the bottom for perfect alignment */}
                          <div className="mt-auto flex items-center space-x-4 text-sm text-text-secondary">
                            {property.bedrooms && <span>{property.bedrooms} Bedrooms</span>}
                            {property.bedrooms && property.bathrooms && <span>•</span>}
                            {property.bathrooms && <span>{property.bathrooms} Bathrooms</span>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default FeaturedProperties
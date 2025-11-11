import { Bed, Bath } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import terranovaAPI from '@/services/api';
import type { Property } from '@/types/api';

const FeaturedListingsSection = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await terranovaAPI.getProperties({ page: 1, limit: 3 });
        // Get only featured properties
        const featured = response.properties.filter(p => p.featured);
        setProperties(featured.slice(0, 3));
      } catch (err) {
        console.error('Failed to load featured properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section id="properties" className="py-24 section-elevated">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-overline text-text-muted mb-4">
            Handpicked Just for You
          </p>
          <h2 className="heading-lg text-text-primary">
            Featured Listings
          </h2>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && properties.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
            <motion.div
              key={property.id}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link to={`/properties/${property.id}`} className="block">
                <div className="bg-surface-elevated rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  
                  {/* Property Image */}
                  <div className="relative overflow-hidden aspect-[3/2]">
                    <img
                      src={property.images?.[0]?.image_url || '/images/placeholder.jpg'}
                      alt={property.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Status and Dot on Right Side */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${property.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-white text-text-primary rounded-full">
                        {property.status}
                      </span>
                    </div>
                  </div>

                  {/* Property Details - No price display */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary-600 transition-colors">
                        {property.name}
                      </h3>
                    </div>

                    {/* Property Features */}
                    <div className="flex items-center gap-4 text-text-muted text-sm">
                      {property.bedrooms && (
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span>{property.bedrooms} Bedrooms</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          <span>{property.bathrooms} Bathrooms</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && properties.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/featured-properties" className="btn-primary">
              View All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListingsSection;

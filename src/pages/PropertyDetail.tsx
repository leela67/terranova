import { useParams, Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCarousel from '@/components/PropertyCarousel';
import PropertyImageGallery from '@/components/PropertyImageGallery';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { motion } from 'framer-motion';
import { Bed, Bath } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import terranovaAPI from '@/services/api';
import type { Property } from '@/types/api';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await terranovaAPI.getPropertyById(Number(id));
        setProperty(data);
      } catch (err: any) {
        setError(err.error || 'Failed to load property details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (!id) {
    return <Navigate to="/featured-properties" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-text-secondary">Loading property details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-800 font-medium mb-4">{error || 'Property not found'}</p>
              <Link to="/featured-properties" className="btn-primary">
                Back to Properties
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const propertyImages = property.images?.map(img => img.image_url) || [];

  return (
    <div className="min-h-screen">
      <Header />

      <main>

        {/* Full-Screen Hero Carousel */}
        <section className="relative h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="h-full"
          >
            <PropertyCarousel
              images={propertyImages}
              alt={property.name}
              fullScreen={true}
            />
          </motion.div>
        </section>



        {/* Property Information */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h1 className="heading-lg text-text-primary mb-4">
                    {property.name}
                  </h1>

                  <p className="text-body-lg text-text-secondary mb-6">
                    {property.address || property.location || `${property.city || ''}, ${property.state || ''}`.trim()}
                  </p>

                  {/* Property Stats */}
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                    {property.bedrooms && (
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Bed className="w-5 h-5" />
                        <span className="text-body">{property.bedrooms} Bedrooms</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Bath className="w-5 h-5" />
                        <span className="text-body">{property.bathrooms} Bathrooms</span>
                      </div>
                    )}
                    {property.area_sqft && (
                      <div className="flex items-center gap-2 text-text-secondary">
                        <span className="text-body">{property.area_sqft.toLocaleString()} sq ft</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {property.description && (
                    <div className="mb-8">
                      <h2 className="heading-sm text-text-primary mb-4">
                        Description
                      </h2>
                      <p className="text-body text-text-secondary leading-relaxed">
                        {property.description}
                      </p>
                    </div>
                  )}

                  {/* Amenities Section */}
                  {property.amenities && property.amenities.length > 0 && (
                    <div className="mb-8">
                      <h2 className="heading-sm text-text-primary mb-6">
                        Amenities & Features
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {property.amenities.map((amenity) => (
                          <div
                            key={amenity.id}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-body text-text-secondary">
                              {amenity.amenity_name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Sidebar with Details */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="sticky top-24"
                >
                  <div className="card-elevated p-6">
                    <h3 className="heading-sm text-text-primary mb-6">
                      Property Details
                    </h3>

                    <div className="space-y-4">
                      {property.project_type && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-body text-text-secondary">Type</span>
                          <span className="text-body font-medium text-text-primary">{property.project_type}</span>
                        </div>
                      )}
                      {property.price && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-body text-text-secondary">Price</span>
                          <span className="text-body font-medium text-text-primary">₹{property.price.toLocaleString()}</span>
                        </div>
                      )}
                      {property.area_sqft && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-body text-text-secondary">Area</span>
                          <span className="text-body font-medium text-text-primary">{property.area_sqft.toLocaleString()} sq ft</span>
                        </div>
                      )}
                      {property.bedrooms && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-body text-text-secondary">Bedrooms</span>
                          <span className="text-body font-medium text-text-primary">{property.bedrooms}</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-body text-text-secondary">Bathrooms</span>
                          <span className="text-body font-medium text-text-primary">{property.bathrooms}</span>
                        </div>
                      )}
                      {property.status && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <span className="text-body text-text-secondary">Status</span>
                          <span className="text-body font-medium text-text-primary">{property.status}</span>
                        </div>
                      )}
                    </div>

                    {/* Nearby Landmarks */}
                    {property.nearby && property.nearby.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-body-lg font-semibold text-text-primary mb-4">
                          Nearby Landmarks
                        </h4>
                        <div className="space-y-3">
                          {property.nearby.map((landmark) => (
                            <div key={landmark.id} className="flex justify-between items-center">
                              <span className="text-body text-text-secondary">{landmark.landmark_name}</span>
                              <span className="text-body-sm text-text-muted">{landmark.distance_km} km</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <Link
                        to="/contact"
                        className="btn-primary w-full text-center block"
                      >
                        Schedule Viewing
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
       
        {/* Image Gallery Section */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <PropertyImageGallery
                images={propertyImages}
                alt={property.name}
              />
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="heading-sm text-text-primary mb-6 text-center">
                Location & Neighborhood
              </h2>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Google Map */}
                <div className="lg:col-span-2">
                  <div className="h-96">
                    {property.latitude && property.longitude ? (
                      <GoogleMapEmbed
                        lat={property.latitude}
                        lng={property.longitude}
                        address={property.address || `${property.city}, ${property.state}`}
                        title={property.property_name}
                      />
                    ) : (
                      <div className="bg-surface-elevated rounded-lg overflow-hidden shadow-sm h-full">
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <p className="text-text-secondary text-sm">
                              Location information coming soon
                            </p>
                            <p className="text-text-primary font-medium mt-2">
                              {property.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location Details */}
                <div className="lg:col-span-1">
                  <div className="bg-surface-elevated rounded-lg p-6 shadow-sm h-96 overflow-hidden">
                    <h3 className="heading-xs text-text-primary mb-4">
                      Nearby Landmarks
                    </h3>

                    <div className="space-y-4 overflow-y-auto max-h-80">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <div className="min-w-0 flex-1">
                          <p className="text-body font-medium text-text-primary truncate">IT Hub</p>
                          <p className="text-sm text-text-secondary truncate">2.5 km away</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <div className="min-w-0 flex-1">
                          <p className="text-body font-medium text-text-primary truncate">Metro Station</p>
                          <p className="text-sm text-text-secondary truncate">1.2 km away</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                        <div className="min-w-0 flex-1">
                          <p className="text-body font-medium text-text-primary truncate">Shopping Mall</p>
                          <p className="text-sm text-text-secondary truncate">800 m away</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                        <div className="min-w-0 flex-1">
                          <p className="text-body font-medium text-text-primary truncate">International Airport</p>
                          <p className="text-sm text-text-secondary truncate">15 km away</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                        <div className="min-w-0 flex-1">
                          <p className="text-body font-medium text-text-primary truncate">Hospital</p>
                          <p className="text-sm text-text-secondary truncate">1.8 km away</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                        <div className="min-w-0 flex-1">
                          <p className="text-body font-medium text-text-primary truncate">Schools</p>
                          <p className="text-sm text-text-secondary truncate">500 m away</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
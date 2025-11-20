import { useParams, Navigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyCarousel from "@/components/PropertyCarousel";
import PropertyImageGallery from "@/components/PropertyImageGallery";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { useEffect, useState } from "react";
import { terranovaAPI } from "@/services/api";
import type { Property } from "@/types/api";
import { motion } from "framer-motion";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const data = await terranovaAPI.getPropertyById(Number(id));
        setProperty(data);
      } catch (err: any) {
        setError(err.error || "Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (!id) return <Navigate to="/featured-properties" replace />;

  if (loading)
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

  if (error || !property)
    return (
      <div className="min-h-screen">
        <Header />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-800 font-medium mb-4">{error || "Property not found"}</p>
              <Link to="/featured-properties" className="btn-primary">
                Back to Properties
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );

  const propertyImages = property.images?.map((i) => i.image_url) || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO */}
      <section className="relative h-[88vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="h-full"
        >
          <PropertyCarousel images={propertyImages} alt={property.name} fullScreen />
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <main className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-16">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">

            {/* PROPERTY TITLE */}
            <h1 className="text-4xl md:text-5xl heading-lg text-text-primary mb-4 font-serif">
              {property.name}
            </h1>

            <p className="text-lg text-text-secondary mb-10">{property.location}</p>

            {/* DESCRIPTION */}
            <div className="mb-14">
              <h2 className="heading-sm text-text-primary mb-6 font-serif">
                Description
              </h2>
              <p className="text-body text-text-secondary text-lg leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* AMENITIES */}
            {property.amenities?.length > 0 && (
              <div className="mb-14">
                <h2 className="heading-sm text-text-primary mb-6 font-serif">
                  Amenities & Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.amenities.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="text-body text-text-secondary">
                        {a.amenity_name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 💥 NEW SPACER ADDED 💥 */}
            {/* This empty div artificially extends the height of the left column.
                The sticky sidebar will now stick for a longer duration, 
                up to the start of the Image Gallery section. h-[50vh] is an estimate
                and might need minor adjustment for your specific content. */}
            <div className="h-[50vh]"></div>
          </div>

          {/* STICKY SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-xl p-8 sticky top-32 border border-gray-100 w-full">

              <h3 className="heading-sm text-text-primary mb-6 font-serif">
                Property Details
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-text-secondary">Project Type</span>
                  <span className="text-text-primary font-medium">{property.project_type}</span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-text-secondary">Total Floors</span>
                  <span className="text-text-primary font-medium">{property.total_floors}</span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-text-secondary">Unit Types</span>
                  <span className="text-text-primary font-medium">{property.unit_types}</span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-text-secondary">Amenities</span>
                  <span className="text-text-primary font-medium text-right">
                    {property.amenities?.map((a) => a.amenity_name).join(", ")}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-text-secondary">Location</span>
                  <span className="text-text-primary font-medium">{property.location}</span>
                </div>

                <div className="flex justify-between py-3">
                  <span className="text-text-secondary">Status</span>
                  <span className="text-text-primary font-medium">{property.status}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  to="/contact"
                  className="block text-center bg-text-primary text-white py-3 rounded-full font-medium hover:opacity-90 transition"
                >
                  Schedule Viewing
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE GALLERY (RESTORED TO ORIGINAL FULL-WIDTH POSITION) */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <PropertyImageGallery images={propertyImages} alt={property.name} />
          </div>
        </section>

        {/* LOCATION & NEIGHBORHOOD SECTION */}
        <section className="py-20 bg-gray-50">

          <h2 className="heading-sm text-text-primary mb-12 text-center font-serif">
            Location & Neighborhood
          </h2>

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">

            {/* MAP */}
            <div className="lg:col-span-2 h-96 overflow-hidden rounded-xl shadow-sm border border-gray-200">
              {property.latitude && property.longitude ? (
                <GoogleMapEmbed
                  lat={property.latitude}
                  lng={property.longitude}
                  address={property.location || property.name}
                  title={property.name}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-text-secondary">
                  Location information coming soon
                </div>
              )}
            </div>

            {/* NEARBY LANDMARKS */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 h-96 overflow-y-auto">
              <h3 className="heading-sm text-text-primary mb-4 font-serif">
                Nearby Landmarks
              </h3>

              {property.nearby?.length ? (
                property.nearby.map((n, index) => {
                  const colors = ["#16A34A", "#2563EB", "#F59E0B", "#8B5CF6", "#DC2626"];
                  const dotColor = colors[index % colors.length];

                  return (
                    <div key={n.id} className="py-4 border-b last:border-b-0">

                      <div className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: dotColor }}
                        ></span>

                        <p className="text-body font-medium text-text-primary">
                          {n.landmark_name}
                        </p>
                      </div>

                      <p className="text-sm text-text-secondary ml-6 mt-1">
                        {n.distance_km} km away
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-text-secondary">No nearby landmarks available.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
// API Response Types for Terranova

// ============================================
// Property Types
// ============================================

export interface PropertyImage {
  id: number;
  property_id: number;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface PropertyAmenity {
  id: number;
  property_id: number;
  amenity_name: string;
  is_active: boolean;
}

export interface PropertyNearby {
  id: number;
  property_id: number;
  landmark_name: string;
  distance_km: number;
  is_active: boolean;
}

export interface Property {
  id: number;
  name: string;                      // Changed from property_name
  subtitle: string | null;           // Added
  project_type: string;              // Changed from property_type
  description: string | null;
  total_floors: string | null;       // Added
  unit_types: string | null;         // Added
  location: string | null;           // Added
  price?: number;                    // Made optional
  area_sqft?: number | null;         // Made optional
  bedrooms?: number | null;          // Made optional
  bathrooms?: number | null;         // Made optional
  address?: string | null;           // Made optional
  city?: string | null;              // Made optional
  state?: string | null;             // Made optional
  pincode?: string | null;           // Made optional
  latitude?: number | null;          // Made optional
  longitude?: number | null;         // Made optional
  google_maps_link?: string | null;  // Made optional
  status: string;
  featured?: boolean;                // Made optional
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images?: PropertyImage[];          // Made optional - some properties don't have images
  amenities: PropertyAmenity[];
  nearby: PropertyNearby[];          // Changed from nearby_landmarks
}

export interface PropertiesResponse {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface PropertyDetailResponse {
  property: Property;
}

// ============================================
// Blog Types
// ============================================

export interface BlogSection {
  id: number;
  blog_id: number;
  heading_tag: string;
  heading_text: string | null;
  section_content: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Blog {
  id: number;
  title: string;
  subtitle: string | null;
  slug: string;
  cover_image_url: string | null;
  excerpt: string | null;
  author: string | null;
  category: string | null;
  published_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  sections?: BlogSection[];
}

export interface BlogsResponse {
  blogs: Blog[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface BlogDetailResponse {
  blog: Blog;
}

// ============================================
// FAQ Types
// ============================================

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
}

export interface FAQsResponse {
  faqs: FAQ[];
}

// ============================================
// Contact Form Types
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  property_id?: number | null;
  recaptcha_token: string;
}

export interface ContactQuery {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  property_id: number | null;
  is_read: boolean;
  created_at: string;
}

export interface ContactFormResponse {
  message: string;
  query: ContactQuery;
}

// ============================================
// Newsletter Types
// ============================================

export interface NewsletterSubscribeRequest {
  email_id: string;
  recaptcha_token: string;
}

export interface NewsletterResponse {
  message: string;
}

// ============================================
// Error Types
// ============================================

export interface APIError {
  error: string;
}

// ============================================
// API Filter Types
// ============================================

export interface PropertyFilters {
  page?: number;
  limit?: number;
  search?: string;
  project_type?: string;  // Changed from property_type
  status?: string;
  min_price?: number;
  max_price?: number;
}

export interface BlogFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}


import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  PropertiesResponse,
  PropertyDetailResponse,
  Property,
  PropertyFilters,
  BlogsResponse,
  BlogDetailResponse,
  Blog,
  BlogFilters,
  FAQsResponse,
  FAQ,
  ContactFormData,
  ContactFormResponse,
  NewsletterResponse,
  APIError,
} from '@/types/api';

class TerranovaAPI {
  private api: AxiosInstance;

  constructor() {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    if (!baseURL) {
      throw new Error('VITE_API_BASE_URL environment variable is not set. Please check your .env file.');
    }

    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<APIError>) => {
        if (error.response) {
          // Server responded with error status
          console.error('API Error:', error.response.data);
          return Promise.reject(error.response.data);
        } else if (error.request) {
          // Request made but no response
          console.error('Network Error:', error.message);
          return Promise.reject({ error: 'Network error. Please check your connection.' });
        } else {
          // Something else happened
          console.error('Error:', error.message);
          return Promise.reject({ error: 'An unexpected error occurred.' });
        }
      }
    );
  }

  // ============================================
  // Properties API
  // ============================================

  async getProperties(filters: PropertyFilters = {}): Promise<PropertiesResponse> {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 12,
      ...(filters.search && { search: filters.search }),
      ...(filters.project_type && { project_type: filters.project_type }),
      ...(filters.status && { status: filters.status }),
      ...(filters.min_price && { min_price: filters.min_price }),
      ...(filters.max_price && { max_price: filters.max_price }),
    };

    const response = await this.api.get<PropertiesResponse>('/properties', { params });
    return response.data;
  }

  async getPropertyById(id: number): Promise<Property> {
    const response = await this.api.get<PropertyDetailResponse>(`/properties/${id}`);
    return response.data.property;
  }

  // ============================================
  // Blogs API
  // ============================================

  async getBlogs(filters: BlogFilters = {}): Promise<BlogsResponse> {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 9,
      ...(filters.search && { search: filters.search }),
      ...(filters.category && { category: filters.category }),
    };

    const response = await this.api.get<BlogsResponse>('/blogs', { params });
    return response.data;
  }

  async getBlogById(id: number): Promise<Blog> {
    const response = await this.api.get<BlogDetailResponse>(`/blogs/${id}`);
    return response.data.blog;
  }

  // ============================================
  // FAQs API
  // ============================================

  async getFAQs(): Promise<FAQ[]> {
    const response = await this.api.get<FAQsResponse>('/faqs');
    return response.data.faqs;
  }

  // ============================================
  // Contact Form API
  // ============================================

  async submitContactForm(data: ContactFormData): Promise<ContactFormResponse> {
    const response = await this.api.post<ContactFormResponse>('/contact-queries', data);
    return response.data;
  }

  // ============================================
  // Newsletter API
  // ============================================

  async subscribeNewsletter(email: string, recaptchaToken: string = 'dummy_recaptcha_token_for_testing'): Promise<NewsletterResponse> {
    const response = await this.api.post<NewsletterResponse>('/newsletter', {
      email_id: email,
      recaptcha_token: recaptchaToken,
    });
    return response.data;
  }

  async unsubscribeNewsletter(email: string): Promise<NewsletterResponse> {
    const response = await this.api.put<NewsletterResponse>('/newsletter/unsubscribe', {
      email_id: email,
    });
    return response.data;
  }
}

// Export singleton instance
export const terranovaAPI = new TerranovaAPI();
export default terranovaAPI;


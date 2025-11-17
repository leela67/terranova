import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  PropertiesResponse,
  Property,
  PropertyFilters,
  BlogsResponse,
  Blog,
  BlogFilters,
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
      throw new Error('VITE_API_BASE_URL environment variable is not set.');
    }

    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<APIError>) => {
        if (error.response) return Promise.reject(error.response.data);
        if (error.request) return Promise.reject({ error: 'Network error. Try again.' });
        return Promise.reject({ error: 'Unexpected error occurred.' });
      }
    );
  }

  // ========================================================
  // PROPERTIES API
  // ========================================================

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
    const response = await this.api.get(`/properties/${id}`);
    return response.data;
  }

  // ========================================================
  // BLOGS API
  // ========================================================

  async getBlogs(filters: BlogFilters = {}): Promise<Blog[]> {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 9,
      ...(filters.search && { search: filters.search }),
      ...(filters.category && { category: filters.category }),
    };

    const response = await this.api.get<BlogsResponse>('/blogs', { params });
    return response.data.blogs;
  }

  async getBlogById(id: number): Promise<Blog> {
    const response = await this.api.get(`/blogs/${id}`);

    return {
      ...response.data,
      sections: response.data.sections || [],
    };
  }

  // ========================================================
  // FAQS API
  // ========================================================

  async getFAQs(): Promise<FAQ[]> {
    const response = await this.api.get('/faqs');
    return response.data.faqs;
  }

  // ========================================================
  // CONTACT API (FIXED)
  // ========================================================

  async submitContactForm(form: ContactFormData): Promise<ContactFormResponse> {

    // Base payload with required fields
    const basePayload = {
      firsta_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      recaptcha_token: form.recaptcha_token,
    };

    // Use spread operator to conditionally add PropertyID, avoiding TS error
    const payload = {
        ...basePayload,
        // Only include PropertyID if it is not null or undefined
        ...(form.property_id !== null && form.property_id !== undefined 
            ? { PropertyID: form.property_id } 
            : {}
        )
    };

    const response = await this.api.post('/contact-queries', payload);
    return response.data;
  }

  // ========================================================
  // NEWSLETTER API
  // ========================================================

  async subscribeNewsletter(email: string): Promise<NewsletterResponse> {
    const response = await this.api.post('/newsletter', {
      email_id: email,
      recaptcha_token: 'dummy_recaptcha_token_for_testing',
    });

    return response.data;
  }

  async unsubscribeNewsletter(email: string): Promise<NewsletterResponse> {
    const response = await this.api.put('/newsletter/unsubscribe', {
      email_id: email,
    });

    return response.data;
  }
}

const terranovaAPI = new TerranovaAPI();
export default terranovaAPI;
export { terranovaAPI };
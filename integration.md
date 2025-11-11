# Terranova Marketing Site - API Integration Guide

**For Frontend Developers**

This guide provides complete, copy-paste ready examples for integrating the Terranova public APIs into your React, Next.js, Vue, or vanilla JavaScript application.

---

## 📋 Table of Contents

1. [Base Configuration](#base-configuration)
2. [Properties API](#properties-api)
3. [Blogs API](#blogs-api)
4. [FAQs API](#faqs-api)
5. [Contact Form API](#contact-form-api)
6. [Newsletter API](#newsletter-api)
7. [Error Handling](#error-handling)
8. [TypeScript Types](#typescript-types)

---

## Base Configuration

### API Base URL

```javascript
const API_BASE_URL = 'https://api.terranovadeveloper.in/api/v1';
// For development: 'http://localhost:8080/api/v1'
```

### Axios Configuration (Recommended)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.terranovadeveloper.in/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
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

export default api;
```

---

## Properties API

### 1. Get All Properties (List View)

**Endpoint:** `GET /properties`

**Query Parameters:**
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 10)
- `search` (string, optional) - Search by property name
- `property_type` (string, optional) - Filter by type (e.g., "Apartment", "Villa")
- `status` (string, optional) - Filter by status (e.g., "Available", "Sold")
- `min_price` (number, optional) - Minimum price filter
- `max_price` (number, optional) - Maximum price filter

**Example Request (Axios):**

```javascript
import api from './api-config';

async function fetchProperties(filters = {}) {
  try {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 12,
      ...(filters.search && { search: filters.search }),
      ...(filters.propertyType && { property_type: filters.propertyType }),
      ...(filters.status && { status: filters.status }),
      ...(filters.minPrice && { min_price: filters.minPrice }),
      ...(filters.maxPrice && { max_price: filters.maxPrice }),
    };

    const response = await api.get('/properties', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    throw error;
  }
}

// Usage
const data = await fetchProperties({
  page: 1,
  limit: 12,
  propertyType: 'Apartment',
  minPrice: 5000000,
  maxPrice: 10000000,
});

console.log(data.properties); // Array of properties
console.log(data.total); // Total count
console.log(data.page); // Current page
console.log(data.limit); // Items per page
```

**Example Request (Fetch API):**

```javascript
async function fetchProperties(filters = {}) {
  const params = new URLSearchParams({
    page: filters.page || 1,
    limit: filters.limit || 12,
    ...(filters.search && { search: filters.search }),
    ...(filters.propertyType && { property_type: filters.propertyType }),
  });

  try {
    const response = await fetch(
      `https://api.terranovadeveloper.in/api/v1/properties?${params}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    throw error;
  }
}
```

**Success Response (200 OK):**

```json
{
  "properties": [
    {
      "id": 1,
      "property_name": "Luxury Apartment in Downtown",
      "property_type": "Apartment",
      "description": "Beautiful 3BHK apartment with modern amenities",
      "price": 7500000,
      "area_sqft": 1500,
      "bedrooms": 3,
      "bathrooms": 2,
      "address": "123 Main Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "latitude": 19.0760,
      "longitude": 72.8777,
      "google_maps_link": "https://maps.google.com/?q=19.0760,72.8777",
      "status": "Available",
      "featured": true,
      "is_active": true,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z",
      "images": [
        {
          "id": 1,
          "property_id": 1,
          "image_url": "https://s3.amazonaws.com/bucket/properties/image1.jpg",
          "sort_order": 1,
          "is_active": true
        }
      ],
      "amenities": [
        {
          "id": 1,
          "property_id": 1,
          "amenity_name": "Swimming Pool",
          "is_active": true
        },
        {
          "id": 2,
          "property_id": 1,
          "amenity_name": "Gym",
          "is_active": true
        }
      ],
      "nearby_landmarks": [
        {
          "id": 1,
          "property_id": 1,
          "landmark_name": "Metro Station",
          "distance_km": 0.5,
          "is_active": true
        }
      ]
    }
  ],
  "total": 45,
  "page": 1,
  "limit": 12,
  "total_pages": 4
}
```

**Error Response (500 Internal Server Error):**

```json
{
  "error": "Failed to fetch properties"
}
```

---

### 2. Get Property by ID (Detail View)

**Endpoint:** `GET /properties/:id`

**Example Request (Axios):**

```javascript
import api from './api-config';

async function fetchPropertyDetails(propertyId) {
  try {
    const response = await api.get(`/properties/${propertyId}`);
    return response.data.property;
  } catch (error) {
    if (error.error === 'Property not found') {
      // Handle 404 - redirect to properties list or show 404 page
      console.error('Property not found');
    }
    throw error;
  }
}

// Usage
const property = await fetchPropertyDetails(1);
console.log(property);
```

**Example Request (Fetch API):**

```javascript
async function fetchPropertyDetails(propertyId) {
  try {
    const response = await fetch(
      `https://api.terranovadeveloper.in/api/v1/properties/${propertyId}`
    );
    
    if (response.status === 404) {
      throw new Error('Property not found');
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.property;
  } catch (error) {
    console.error('Failed to fetch property details:', error);
    throw error;
  }
}
```

**Success Response (200 OK):**

```json
{
  "property": {
    "id": 1,
    "property_name": "Luxury Apartment in Downtown",
    "property_type": "Apartment",
    "description": "Beautiful 3BHK apartment with modern amenities...",
    "price": 7500000,
    "area_sqft": 1500,
    "bedrooms": 3,
    "bathrooms": 2,
    "address": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "latitude": 19.0760,
    "longitude": 72.8777,
    "google_maps_link": "https://maps.google.com/?q=19.0760,72.8777",
    "status": "Available",
    "featured": true,
    "is_active": true,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z",
    "images": [
      {
        "id": 1,
        "property_id": 1,
        "image_url": "https://s3.amazonaws.com/bucket/properties/image1.jpg",
        "sort_order": 1,
        "is_active": true
      },
      {
        "id": 2,
        "property_id": 1,
        "image_url": "https://s3.amazonaws.com/bucket/properties/image2.jpg",
        "sort_order": 2,
        "is_active": true
      }
    ],
    "amenities": [
      {
        "id": 1,
        "property_id": 1,
        "amenity_name": "Swimming Pool",
        "is_active": true
      },
      {
        "id": 2,
        "property_id": 1,
        "amenity_name": "Gym",
        "is_active": true
      },
      {
        "id": 3,
        "property_id": 1,
        "amenity_name": "24/7 Security",
        "is_active": true
      }
    ],
    "nearby_landmarks": [
      {
        "id": 1,
        "property_id": 1,
        "landmark_name": "Metro Station",
        "distance_km": 0.5,
        "is_active": true
      },
      {
        "id": 2,
        "property_id": 1,
        "landmark_name": "Shopping Mall",
        "distance_km": 1.2,
        "is_active": true
      }
    ]
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "error": "Property not found"
}
```

---

## Blogs API

### 3. Get All Blogs (List View)

**Endpoint:** `GET /blogs`

**Query Parameters:**
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 10)
- `search` (string, optional) - Search by blog title
- `category` (string, optional) - Filter by category

**Example Request (Axios):**

```javascript
import api from './api-config';

async function fetchBlogs(filters = {}) {
  try {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 9,
      ...(filters.search && { search: filters.search }),
      ...(filters.category && { category: filters.category }),
    };

    const response = await api.get('/blogs', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    throw error;
  }
}

// Usage
const data = await fetchBlogs({ page: 1, limit: 9, category: 'Real Estate Tips' });
console.log(data.blogs);
console.log(data.total);
```

**Success Response (200 OK):**

```json
{
  "blogs": [
    {
      "id": 1,
      "title": "Top 10 Real Estate Investment Tips for 2024",
      "subtitle": "Expert advice for smart property investments",
      "cover_image_url": "https://s3.amazonaws.com/bucket/blogs/cover1.jpg",
      "author": "John Doe",
      "category": "Real Estate Tips",
      "published_date": "2024-01-15T00:00:00Z",
      "is_active": true,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 9,
  "total_pages": 3
}
```

---

### 4. Get Blog by ID (Detail View with Sections)

**Endpoint:** `GET /blogs/:id`

**Example Request (Axios):**

```javascript
import api from './api-config';

async function fetchBlogDetails(blogId) {
  try {
    const response = await api.get(`/blogs/${blogId}`);
    return response.data.blog;
  } catch (error) {
    if (error.error === 'Blog not found') {
      console.error('Blog not found');
    }
    throw error;
  }
}

// Usage
const blog = await fetchBlogDetails(1);
console.log(blog.title);
console.log(blog.sections); // Array of blog sections
```

**Success Response (200 OK):**

```json
{
  "blog": {
    "id": 1,
    "title": "Top 10 Real Estate Investment Tips for 2024",
    "subtitle": "Expert advice for smart property investments",
    "cover_image_url": "https://s3.amazonaws.com/bucket/blogs/cover1.jpg",
    "author": "John Doe",
    "category": "Real Estate Tips",
    "published_date": "2024-01-15T00:00:00Z",
    "is_active": true,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z",
    "sections": [
      {
        "id": 1,
        "blog_id": 1,
        "heading_tag": "h2",
        "heading_text": "Introduction",
        "section_content": "Real estate investment has always been...",
        "sort_order": 1,
        "is_active": true
      },
      {
        "id": 2,
        "blog_id": 1,
        "heading_tag": "h2",
        "heading_text": "Tip #1: Location is Everything",
        "section_content": "When investing in real estate...",
        "sort_order": 2,
        "is_active": true
      },
      {
        "id": 3,
        "blog_id": 1,
        "heading_tag": "h3",
        "heading_text": "Urban vs Suburban",
        "section_content": "Consider the pros and cons...",
        "sort_order": 3,
        "is_active": true
      }
    ]
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "error": "Blog not found"
}
```

---

## FAQs API

### 5. Get All FAQs

**Endpoint:** `GET /faqs`

**Example Request (Axios):**

```javascript
import api from './api-config';

async function fetchFAQs() {
  try {
    const response = await api.get('/faqs');
    return response.data.faqs;
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    throw error;
  }
}

// Usage
const faqs = await fetchFAQs();
console.log(faqs);
```

**Success Response (200 OK):**

```json
{
  "faqs": [
    {
      "id": 1,
      "question": "What is the process for buying a property?",
      "answer": "The property buying process involves several steps...",
      "sort_order": 1,
      "is_active": true
    },
    {
      "id": 2,
      "question": "Do you offer home loans?",
      "answer": "Yes, we have partnerships with leading banks...",
      "sort_order": 2,
      "is_active": true
    }
  ]
}
```

---

## Contact Form API

### 6. Submit Contact Query

**Endpoint:** `POST /contact-queries`

**Request Body:**
- `name` (string, required) - Full name
- `email` (string, required) - Email address
- `phone` (string, required) - Phone number
- `message` (string, required) - Message content
- `property_id` (number, optional) - Related property ID

**Example Request (Axios):**

```javascript
import api from './api-config';

async function submitContactForm(formData) {
  try {
    const response = await api.post('/contact-queries', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      property_id: formData.propertyId || null,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    throw error;
  }
}

// Usage
const result = await submitContactForm({
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '+91 9876543210',
  message: 'I am interested in the luxury apartment listing.',
  propertyId: 1,
});

console.log(result.message); // "Contact query submitted successfully"
```

**Example with Form Validation (React):**

```javascript
import { useState } from 'react';
import api from './api-config';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Valid email is required');
      return false;
    }
    if (!formData.phone.trim() || !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      setError('Valid phone number is required');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Message is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await api.post('/contact-queries', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err.error || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Thank you! We'll contact you soon.</div>}

      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        disabled={loading}
      />

      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        disabled={loading}
      />

      <input
        type="tel"
        placeholder="Your Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        disabled={loading}
      />

      <textarea
        placeholder="Your Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

**Success Response (201 Created):**

```json
{
  "message": "Contact query submitted successfully",
  "query": {
    "id": 123,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+91 9876543210",
    "message": "I am interested in the luxury apartment listing.",
    "property_id": 1,
    "is_read": false,
    "created_at": "2024-01-15T14:30:00Z"
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "error": "Name, email, phone, and message are required"
}
```

---

## Newsletter API

### 7. Subscribe to Newsletter

**Endpoint:** `POST /newsletter`

**Request Body:**
- `email_id` (string, required) - Email address

**Example Request (Axios):**

```javascript
import api from './api-config';

async function subscribeNewsletter(email) {
  try {
    const response = await api.post('/newsletter', {
      email_id: email,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to subscribe:', error);
    throw error;
  }
}

// Usage
const result = await subscribeNewsletter('user@example.com');
console.log(result.message);
```

**Example with React Component:**

```javascript
import { useState } from 'react';
import api from './api-config';

function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validate email
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/newsletter', { email_id: email });
      setSuccess(true);
      setEmail('');
    } catch (err) {
      if (err.error === 'Email already subscribed') {
        setError('This email is already subscribed to our newsletter');
      } else {
        setError(err.error || 'Failed to subscribe. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-form">
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">Successfully subscribed!</div>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}
```

**Success Response (201 Created):**

```json
{
  "message": "Successfully subscribed to newsletter"
}
```

**Error Response (400 Bad Request):**

```json
{
  "error": "Email already subscribed"
}
```

---

### 8. Unsubscribe from Newsletter

**Endpoint:** `PUT /newsletter/unsubscribe`

**Request Body:**
- `email_id` (string, required) - Email address

**Example Request (Axios):**

```javascript
import api from './api-config';

async function unsubscribeNewsletter(email) {
  try {
    const response = await api.put('/newsletter/unsubscribe', {
      email_id: email,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to unsubscribe:', error);
    throw error;
  }
}

// Usage
const result = await unsubscribeNewsletter('user@example.com');
console.log(result.message);
```

**Success Response (200 OK):**

```json
{
  "message": "Successfully unsubscribed from newsletter"
}
```

**Error Response (404 Not Found):**

```json
{
  "error": "Email not found in newsletter list"
}
```

---

## Error Handling

### Common HTTP Status Codes

| Status Code | Meaning | When It Occurs |
|-------------|---------|----------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data or missing required fields |
| 404 | Not Found | Resource not found (property, blog, etc.) |
| 500 | Internal Server Error | Server-side error |

### Best Practices for Error Handling

#### 1. Display User-Friendly Messages

```javascript
function getErrorMessage(error) {
  // Check if it's a known error from the API
  if (error.error) {
    return error.error;
  }

  // Network error
  if (error.message && error.message.includes('Network')) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }

  // Default error message
  return 'Something went wrong. Please try again later.';
}

// Usage in component
try {
  await fetchProperties();
} catch (error) {
  const message = getErrorMessage(error);
  setErrorMessage(message);
}
```

#### 2. Implement Retry Logic

```javascript
async function fetchWithRetry(fetchFunction, maxRetries = 3) {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchFunction();
    } catch (error) {
      lastError = error;

      // Don't retry on 4xx errors (client errors)
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }

  throw lastError;
}

// Usage
const properties = await fetchWithRetry(() => fetchProperties({ page: 1 }));
```

#### 3. Loading States

```javascript
import { useState, useEffect } from 'react';

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProperties({ page: 1, limit: 12 });
        setProperties(data.properties);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  if (loading) {
    return <div>Loading properties...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="properties-grid">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

#### 4. Form Validation Before Submission

```javascript
function validateContactForm(formData) {
  const errors = {};

  // Name validation
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  if (!formData.phone || !phoneRegex.test(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Message validation
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Usage
const handleSubmit = async (e) => {
  e.preventDefault();

  const validation = validateContactForm(formData);

  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }

  // Proceed with API call
  try {
    await submitContactForm(formData);
    setSuccess(true);
  } catch (error) {
    setError(getErrorMessage(error));
  }
};
```

---

## TypeScript Types

### Property Types

```typescript
interface PropertyImage {
  id: number;
  property_id: number;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

interface PropertyAmenity {
  id: number;
  property_id: number;
  amenity_name: string;
  is_active: boolean;
}

interface PropertyNearby {
  id: number;
  property_id: number;
  landmark_name: string;
  distance_km: number;
  is_active: boolean;
}

interface Property {
  id: number;
  property_name: string;
  property_type: string;
  description: string | null;
  price: number;
  area_sqft: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  latitude: number | null;
  longitude: number | null;
  google_maps_link: string | null;
  status: string;
  featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: PropertyImage[];
  amenities: PropertyAmenity[];
  nearby_landmarks: PropertyNearby[];
}

interface PropertiesResponse {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

interface PropertyDetailResponse {
  property: Property;
}
```

### Blog Types

```typescript
interface BlogSection {
  id: number;
  blog_id: number;
  heading_tag: string;
  heading_text: string | null;
  section_content: string | null;
  sort_order: number;
  is_active: boolean;
}

interface Blog {
  id: number;
  title: string;
  subtitle: string | null;
  cover_image_url: string | null;
  author: string | null;
  category: string | null;
  published_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  sections?: BlogSection[];
}

interface BlogsResponse {
  blogs: Blog[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

interface BlogDetailResponse {
  blog: Blog;
}
```

### FAQ Types

```typescript
interface FAQ {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
}

interface FAQsResponse {
  faqs: FAQ[];
}
```

### Contact Form Types

```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  property_id?: number | null;
}

interface ContactQuery {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  property_id: number | null;
  is_read: boolean;
  created_at: string;
}

interface ContactFormResponse {
  message: string;
  query: ContactQuery;
}
```

### Newsletter Types

```typescript
interface NewsletterSubscribeRequest {
  email_id: string;
}

interface NewsletterResponse {
  message: string;
}
```

### Error Types

```typescript
interface APIError {
  error: string;
}
```

### Complete API Service (TypeScript)

```typescript
import axios, { AxiosInstance } from 'axios';

class TerranovaAPI {
  private api: AxiosInstance;

  constructor(baseURL: string = 'https://api.terranovadeveloper.in/api/v1') {
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          return Promise.reject(error.response.data);
        } else if (error.request) {
          return Promise.reject({ error: 'Network error. Please check your connection.' });
        } else {
          return Promise.reject({ error: 'An unexpected error occurred.' });
        }
      }
    );
  }

  // Properties
  async getProperties(params?: {
    page?: number;
    limit?: number;
    search?: string;
    property_type?: string;
    status?: string;
    min_price?: number;
    max_price?: number;
  }): Promise<PropertiesResponse> {
    const response = await this.api.get<PropertiesResponse>('/properties', { params });
    return response.data;
  }

  async getPropertyById(id: number): Promise<Property> {
    const response = await this.api.get<PropertyDetailResponse>(`/properties/${id}`);
    return response.data.property;
  }

  // Blogs
  async getBlogs(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  }): Promise<BlogsResponse> {
    const response = await this.api.get<BlogsResponse>('/blogs', { params });
    return response.data;
  }

  async getBlogById(id: number): Promise<Blog> {
    const response = await this.api.get<BlogDetailResponse>(`/blogs/${id}`);
    return response.data.blog;
  }

  // FAQs
  async getFAQs(): Promise<FAQ[]> {
    const response = await this.api.get<FAQsResponse>('/faqs');
    return response.data.faqs;
  }

  // Contact Form
  async submitContactForm(data: ContactFormData): Promise<ContactFormResponse> {
    const response = await this.api.post<ContactFormResponse>('/contact-queries', data);
    return response.data;
  }

  // Newsletter
  async subscribeNewsletter(email: string): Promise<NewsletterResponse> {
    const response = await this.api.post<NewsletterResponse>('/newsletter', {
      email_id: email,
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
```

### Usage Example (TypeScript + React)

```typescript
import { useState, useEffect } from 'react';
import terranovaAPI from './api-service';
import type { Property } from './api-service';

function PropertyDetail({ propertyId }: { propertyId: number }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProperty() {
      try {
        setLoading(true);
        const data = await terranovaAPI.getPropertyById(propertyId);
        setProperty(data);
      } catch (err: any) {
        setError(err.error || 'Failed to load property');
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [propertyId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div>
      <h1>{property.property_name}</h1>
      <p>Price: ₹{property.price.toLocaleString()}</p>
      <p>Type: {property.property_type}</p>
      {/* ... rest of the component */}
    </div>
  );
}
```

---

## Quick Reference

### All Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/properties` | Get all properties (paginated) |
| GET | `/properties/:id` | Get property by ID |
| GET | `/blogs` | Get all blogs (paginated) |
| GET | `/blogs/:id` | Get blog by ID |
| GET | `/faqs` | Get all FAQs |
| POST | `/contact-queries` | Submit contact form |
| POST | `/newsletter` | Subscribe to newsletter |
| PUT | `/newsletter/unsubscribe` | Unsubscribe from newsletter |

---

## Support

For API issues or questions:
- Check the main API documentation: `TERRANOVA_API_SUMMARY.md`
- Review endpoint details: `TERRANOVA_API_ENDPOINTS.md`
- Contact the backend team

---

**Last Updated:** January 2024
**API Version:** v1
**Base URL:** `https://api.terranovadeveloper.in/api/v1`
```


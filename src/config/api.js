// Centralized API configuration for RestoM
// This file provides the base URL for all API calls

// Use environment variable for API base URL (Vite)
export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://restom-backend-2.onrender.com/api";

// Helper function to make fetch requests with error handling
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`API Error (${response.status}):`, errorData.message || response.statusText);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Convenience methods
export const apiGet = (endpoint) => apiRequest(endpoint, { method: 'GET' });
export const apiPost = (endpoint, data) => apiRequest(endpoint, { method: 'POST', body: JSON.stringify(data) });
export const apiPut = (endpoint, data) => apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(data) });
export const apiDelete = (endpoint) => apiRequest(endpoint, { method: 'DELETE' });

// API configuration and base setup
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

class ApiError extends Error {
  status: number
  data?: unknown

  constructor(
    message: string,
    status: number,
    data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  // Get auth token from localStorage if available
  const token = localStorage.getItem('auth_token')
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    // Handle network errors
    throw new ApiError(
      'Network error: Unable to connect to server',
      0,
      error
    )
  }
}

// Token management utilities
export const tokenUtils = {
  set: (token: string) => localStorage.setItem('auth_token', token),
  get: () => localStorage.getItem('auth_token'),
  remove: () => localStorage.removeItem('auth_token'),
  clear: () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
  }
}

export { apiRequest, ApiError }
export default apiRequest

import { apiRequest } from './api'
import type { User } from '../types'

// Types for auth requests and responses (matching your backend)
export interface LoginRequest {
  method: 'email'
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    email: string
    user_metadata?: {
      name?: string
    }
    // Add other Supabase user fields as needed
  }
  session: {
    access_token: string
    refresh_token: string
    expires_at: number
    // Add other session fields as needed
  }
}

export interface RegisterResponse {
  message: string
  data: {
    user: {
      id: string
      email: string
    } | null
    session: unknown | null
  }
}

// Auth service functions
export const authService = {
  // Login with email and password
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        method: 'email',
        email,
        password
      })
    })
    
    return response
  },

  // Register new user
  async register(email: string, password: string): Promise<RegisterResponse> {
    const response = await apiRequest<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    })
    
    return response
  },

  // OAuth login (for future use)
  async loginWithOAuth(provider: string): Promise<{ url: string }> {
    const response = await apiRequest<{ url: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        method: 'oauth',
        provider
      })
    })
    
    return response
  }
}

// Helper function to convert Supabase user to your app's User type
export function mapSupabaseUserToAppUser(supabaseUser: AuthResponse['user']): User {
  return {
    name: supabaseUser.user_metadata?.name || supabaseUser.email.split('@')[0],
    email: supabaseUser.email
  }
}

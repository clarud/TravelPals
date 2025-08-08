import { useState, useEffect } from 'react'
import type { User, AuthState } from '../types'
import { authService, mapSupabaseUserToAppUser } from '../services/authService'
import { ApiError } from '../services/api'
import { tokenUtils } from '../services/api'

interface SignUpFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// Custom hook for authentication logic
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    currentUser: null
  })

  // Check for existing session on mount
  useEffect(() => {
    const token = tokenUtils.get()
    const userData = localStorage.getItem('user_data')
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        setAuthState({
          isAuthenticated: true,
          currentUser: user
        })
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        tokenUtils.clear()
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login with auth service...')
      
      const authResponse = await authService.login(email, password)
      
      // Store the session token
      tokenUtils.set(authResponse.session.access_token)
      
      // Convert Supabase user to app user format
      const user = mapSupabaseUserToAppUser(authResponse.user)
      
      // Store user data
      localStorage.setItem('user_data', JSON.stringify(user))
      
      setAuthState({
        isAuthenticated: true,
        currentUser: user
      })
      
      console.log('Login successful:', authResponse)
      
      return true
    } catch (error) {
      console.error('Login error:', error)
      
      if (error instanceof ApiError) {
        console.error('API Error details:', {
          status: error.status,
          message: error.message,
          data: error.data
        })
      }
      
      return false
    }
  }

  const signUp = async (formData: SignUpFormData): Promise<boolean> => {
    try {
      console.log('Attempting registration with auth service...')
      
      const registerResponse = await authService.register(formData.email, formData.password)
      
      console.log('Registration response:', registerResponse)
      
      // Note: Supabase registration typically requires email confirmation
      // So we don't automatically log them in here unless session is provided
      if (registerResponse.data.session) {
        // If session is returned, log them in
        const user: User = {
          name: formData.name,
          email: formData.email
        }
        
        setAuthState({
          isAuthenticated: true,
          currentUser: user
        })
      }
      
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const logout = () => {
    tokenUtils.clear()
    setAuthState({
      isAuthenticated: false,
      currentUser: null
    })
    console.log('User logged out')
  }

  return {
    ...authState,
    login,
    signUp,
    logout
  }
}

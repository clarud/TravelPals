import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LandingPage from '../pages/LandingPage'
import { tokenUtils } from '../services/api'

const HomePage = () => {
  const { isAuthenticated, setUser, setIsAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const processOAuthTokens = async () => {
      // Check for OAuth tokens in URL hash (Supabase implicit flow)
      const hash = window.location.hash.substring(1)
      if (!hash) {
        // If user is already authenticated, redirect to dashboard
        if (isAuthenticated) {
          navigate('/dashboard', { replace: true })
        }
        return
      }

      const hashParams = new URLSearchParams(hash)
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')
      const expiresAt = hashParams.get('expires_at')
      const error = hashParams.get('error')

      if (error) {
        console.error('OAuth error:', error)
        // Clean the URL and stay on landing page
        window.history.replaceState({}, '', window.location.pathname)
        return
      }

      if (accessToken) {
        console.log('🔐 Processing OAuth tokens from URL hash...')
        
        // Clean the URL immediately to remove OAuth parameters
        window.history.replaceState({}, '', window.location.pathname)
        
        try {
          // Parse the JWT to get user info
          const payload = JSON.parse(atob(accessToken.split('.')[1]))
          console.log('👤 JWT Payload:', payload)
          
          // Create user object from JWT payload
          const userData = {
            id: payload.sub,
            email: payload.email,
            name: payload.user_metadata?.full_name || payload.user_metadata?.name || payload.email,
            avatar_url: payload.user_metadata?.avatar_url || payload.user_metadata?.picture
          }
          
          // Store tokens using existing tokenUtils
          tokenUtils.set(accessToken)
          if (refreshToken) localStorage.setItem('refresh_token', refreshToken)
          if (expiresAt) localStorage.setItem('token_expires_at', expiresAt)
          
          // Store user data
          localStorage.setItem('user_data', JSON.stringify(userData))
          
          // Update auth state
          setUser(userData)
          setIsAuthenticated(true)
          
          console.log('✅ OAuth login successful:', userData)
          
          // Redirect to dashboard after successful OAuth
          navigate('/dashboard', { replace: true })
          
        } catch (error) {
          console.error('❌ Error processing OAuth tokens:', error)
          // Clean up any partial state
          tokenUtils.clear()
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('token_expires_at')
          localStorage.removeItem('user_data')
        }
      }
    }

    processOAuthTokens()
  }, [setUser, setIsAuthenticated, navigate, isAuthenticated])

  // Always show landing page for public route
  return <LandingPage />
}

export default HomePage

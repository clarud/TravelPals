import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const OAuthCallback = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { handleOAuthCallback } = useAuth()

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get authorization code from URL parameters
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const errorParam = searchParams.get('error')

        if (errorParam) {
          throw new Error(`OAuth error: ${errorParam}`)
        }

        if (!code) {
          throw new Error('No authorization code received')
        }

        console.log('Processing OAuth callback with code:', code)

        // Handle the OAuth callback
        const success = await handleOAuthCallback(code, state || undefined)

        if (success) {
          setStatus('success')
          // Redirect to home page after a brief success message
          setTimeout(() => {
            navigate('/')
          }, 2000)
        } else {
          throw new Error('Failed to complete OAuth login')
        }
      } catch (err) {
        console.error('OAuth callback error:', err)
        setError(err instanceof Error ? err.message : 'OAuth login failed')
        setStatus('error')
        
        // Redirect to login page after error
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    }

    processCallback()
  }, [searchParams, handleOAuthCallback, navigate])

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      {status === 'loading' && (
        <>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3', 
            borderTop: '4px solid #40BFBF', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem'
          }} />
          <h2>Completing your sign in...</h2>
          <p>Please wait while we process your Google authentication.</p>
        </>
      )}

      {status === 'success' && (
        <>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ color: '#40BFBF' }}>Sign in successful!</h2>
          <p>Redirecting you to your dashboard...</p>
        </>
      )}

      {status === 'error' && (
        <>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
          <h2 style={{ color: '#E30613' }}>Sign in failed</h2>
          <p style={{ color: '#666', maxWidth: '400px' }}>
            {error || 'Something went wrong during authentication.'}
          </p>
          <p style={{ fontSize: '0.9rem', color: '#999' }}>
            Redirecting to login page...
          </p>
        </>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default OAuthCallback

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignUpPage.css'

interface SignUpFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface SignUpPageProps {
  onSignUp: (data: SignUpFormData) => Promise<boolean>
}

const SignUpPage = ({ onSignUp }: SignUpPageProps) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields')
        return
      }

      if (!formData.email.includes('@')) {
        setError('Please enter a valid email address')
        return
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long')
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }

      const success = await onSignUp(formData)
      
      if (success) {
        // Redirect to dashboard or home page after successful signup
        navigate('/')
      } else {
        setError('Sign up failed. Please try again.')
      }
    } catch (err) {
      setError('Sign up failed. Please try again.')
      console.error('Sign up error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Join TravelPals</h1>
          <p>Create your account and start your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              disabled={isLoading}
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              required
              disabled={isLoading}
              autoComplete="new-password"
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              required
              disabled={isLoading}
              autoComplete="new-password"
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full-width"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="form-footer">
            <p className="terms-text">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="terms-link">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="terms-link">Privacy Policy</Link>
            </p>
          </div>
        </form>

        <div className="signup-divider">
          <span>Already have an account?</span>
        </div>

        <Link to="/login" className="btn btn-secondary btn-full-width">
          Sign In
        </Link>

        <div className="back-to-home">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage

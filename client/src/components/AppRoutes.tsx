import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import ApiTest from './ApiTest'
import type { User } from '../types'

interface SignUpFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface AppRoutesProps {
  isAuthenticated: boolean
  currentUser: User | null
  onLogin: (email: string, password: string) => Promise<boolean>
  onSignUp: (data: SignUpFormData) => Promise<boolean>
}

const AppRoutes = ({ isAuthenticated, currentUser, onLogin, onSignUp }: AppRoutesProps) => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            // Future: Dashboard or authenticated user content
            <div>Welcome back, {currentUser?.name}! Dashboard coming soon...</div>
          ) : (
            <LandingPage />
          )
        } 
      />
      <Route 
        path="/login" 
        element={<LoginPage onLogin={onLogin} />} 
      />
      <Route 
        path="/signup" 
        element={<SignUpPage onSignUp={onSignUp} />} 
      />
      <Route 
        path="/api-test" 
        element={<ApiTest />} 
      />
      {/* Future routes */}
      {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
      {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
    </Routes>
  )
}

export default AppRoutes

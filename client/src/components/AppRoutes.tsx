import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import type { User } from '../types'

interface AppRoutesProps {
  isAuthenticated: boolean
  currentUser: User | null
  onLogin: (email: string, password: string) => Promise<boolean>
}

const AppRoutes = ({ isAuthenticated, currentUser, onLogin }: AppRoutesProps) => {
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
      {/* Future routes */}
      {/* <Route path="/signup" element={<SignUpPage />} /> */}
      {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
      {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
    </Routes>
  )
}

export default AppRoutes

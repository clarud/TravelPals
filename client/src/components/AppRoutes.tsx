import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import ApiTest from './ApiTest'

interface SignUpFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface AppRoutesProps {
  onLogin: (email: string, password: string) => Promise<boolean>
  onSignUp: (data: SignUpFormData) => Promise<boolean>
}

const AppRoutes = ({ onLogin, onSignUp }: AppRoutesProps) => {
  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/" 
        element={<HomePage />} 
      />
      <Route 
        path="/login" 
        element={<LoginPage onLogin={onLogin} />} 
      />
      <Route 
        path="/signup" 
        element={<SignUpPage onSignUp={onSignUp} />} 
      />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Development/testing routes */}
      <Route 
        path="/api-test" 
        element={<ApiTest />} 
      />
      
      {/* Future protected routes */}
      {/* <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> */}
      {/* <Route path="/trips" element={<ProtectedRoute><TripsPage /></ProtectedRoute>} /> */}
    </Routes>
  )
}

export default AppRoutes

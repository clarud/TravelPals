import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { tokenUtils } from '../services/api'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  
  // Also check localStorage directly for more reliable auth state
  const hasToken = tokenUtils.get()
  const hasUserData = localStorage.getItem('user_data')
  const isActuallyAuthenticated = isAuthenticated || (hasToken && hasUserData)

  console.log('🛡️ ProtectedRoute - isAuthenticated:', isAuthenticated)
  console.log('🛡️ ProtectedRoute - hasToken:', !!hasToken)
  console.log('🛡️ ProtectedRoute - hasUserData:', !!hasUserData)
  console.log('🛡️ ProtectedRoute - isActuallyAuthenticated:', isActuallyAuthenticated)

  if (!isActuallyAuthenticated) {
    console.log('❌ ProtectedRoute - Redirecting to login')
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />
  }

  console.log('✅ ProtectedRoute - Access granted')
  return <>{children}</>
}

export default ProtectedRoute

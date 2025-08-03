import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import AppRoutes from './components/AppRoutes'
import { useAuth } from './hooks/useAuth'
import './App.css'

interface SignUpFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// AppContent component to use hooks inside Router context
function AppContent() {
  const { isAuthenticated, currentUser, login, signUp, logout } = useAuth()
  const navigate = useNavigate()

  // Navigation handlers
  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignUpClick = () => {
    navigate('/signup')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Auth handlers that wrap the hook methods
  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    const success = await login(email, password)
    if (success) {
      navigate('/')
    }
    return success
  }

  const handleSignUp = async (data: SignUpFormData): Promise<boolean> => {
    const success = await signUp(data)
    if (success) {
      navigate('/')
    }
    return success
  }

  return (
    <div className="app">
      <Header 
        onLogin={handleLoginClick} 
        onSignUp={handleSignUpClick} 
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      <main className="app-main">
        <AppRoutes 
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
        />
      </main>
    </div>
  )
}

// Main App component with Router wrapper
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

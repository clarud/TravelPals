import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import AppRoutes from './components/AppRoutes'
import { useAuth } from './hooks/useAuth'
import './App.css'

// AppContent component to use hooks inside Router context
function AppContent() {
  const { isAuthenticated, currentUser, login, logout } = useAuth()
  const navigate = useNavigate()

  // Navigation handlers
  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignUpClick = () => {
    navigate('/signup') // Future: implement signup page
  }

  const handleLogout = () => {
    logout()
    navigate('/')
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
          onLogin={login}
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

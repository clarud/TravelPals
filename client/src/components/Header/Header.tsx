import viteLogo from '/vite.svg'
import './Header.css'

interface User {
  name?: string
  email?: string
}

interface HeaderProps {
  onLogin?: () => void
  onSignUp?: () => void
  isAuthenticated?: boolean
  currentUser?: User | null
  onLogout?: () => void
}

const Header = ({ 
  onLogin, 
  onSignUp, 
  isAuthenticated = false, 
  currentUser, 
  onLogout 
}: HeaderProps) => {
  const handleLogin = () => {
    if (onLogin) {
      onLogin()
    } else {
      console.log('Login clicked')
    }
  }

  const handleSignUp = () => {
    if (onSignUp) {
      onSignUp()
    } else {
      console.log('Sign up clicked')
    }
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      console.log('Logout clicked')
    }
  }

  return (
    <header className="header">
      <div className="header-left">
        <img src={viteLogo} className="header-logo" alt="TravelPals logo" />
        <h1 className="header-title">TravelPals</h1>
      </div>
      <div className="header-right">
        {isAuthenticated ? (
          // Show user menu when authenticated
          <div className="user-menu">
            <span className="welcome-text">
              Welcome, {currentUser?.name || 'User'}!
            </span>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          // Show login/signup when not authenticated
          <>
            <button className="btn btn-secondary" onClick={handleLogin}>
              Login
            </button>
            <button className="btn btn-primary" onClick={handleSignUp}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header

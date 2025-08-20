import { useAuth } from '../hooks/useAuth'
import './Dashboard.css'

const Dashboard = () => {
  const { currentUser, logout } = useAuth()

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {currentUser?.name}!</h1>
        <p>Ready to plan your next adventure?</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>🗺️ Plan a Trip</h3>
            <p>Create your next travel itinerary</p>
            <button className="btn btn-primary">Start Planning</button>
          </div>

          <div className="dashboard-card">
            <h3>✈️ My Trips</h3>
            <p>View and manage your travel plans</p>
            <button className="btn btn-secondary">View Trips</button>
          </div>

          <div className="dashboard-card">
            <h3>👥 Travel Buddies</h3>
            <p>Connect with fellow travelers</p>
            <button className="btn btn-secondary">Find Friends</button>
          </div>

          <div className="dashboard-card">
            <h3>📸 Memories</h3>
            <p>Share your travel photos</p>
            <button className="btn btn-secondary">Upload Photos</button>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <button onClick={logout} className="btn btn-outline">
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Dashboard

import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1>Welcome to TravelPals</h1>
        <p className="hero-subtitle">
          Find your perfect travel companion and explore the world together
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary btn-large">
            Start Your Journey
          </button>
          <button className="btn btn-secondary btn-large">
            Learn More
          </button>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose TravelPals?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🌍 Global Network</h3>
            <p>Connect with travelers from around the world</p>
          </div>
          <div className="feature-card">
            <h3>🛡️ Safe & Secure</h3>
            <p>Verified profiles and secure messaging</p>
          </div>
          <div className="feature-card">
            <h3>🎯 Perfect Matches</h3>
            <p>Find companions with similar interests</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

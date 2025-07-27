import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1>Welcome to TravelPals</h1>
        <p className="hero-subtitle">
          One stop app for all your travel planning discoveries
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
            <h3>🌍 Social Network</h3>
            <p>Connect with travelers from around the world</p>
          </div>
          <div className="feature-card">
            <h3>🛡️ Safe & Secure</h3>
            <p>Verified profiles and secure messaging</p>
          </div>
          <div className="feature-card">
            <h3>🎯 Interactive Planning Experience</h3>
            <p>Plan your trips with ease</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

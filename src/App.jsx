
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#">
          <span className="brand-icon">S</span>
          <span>Smart<span className="brand-accent">Citizen</span></span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#report">Report an Issue</a>
          <a href="#track">Track Complaint</a>
        </nav>

        <button className="login-button">Admin Login</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              SMART GOVERNANCE · MAHARASHTRA
            </span>

            <h1>
              Better Cities.<br />
              <span>Stronger Communities.</span>
            </h1>

            <p>
              Report infrastructure problems in your community,
              track their progress, and help build a better
              Maharashtra for every citizen.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#report">
                Report an Issue <span>→</span>
              </a>
              <a className="secondary-button" href="#track">
                Track Complaint
              </a>
            </div>

            <div className="trust-note">
              <span className="status-dot"></span>
              Your voice matters. Your community matters.
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <div className="visual-icon">🏙️</div>
              <h3>A smarter Maharashtra</h3>
              <p>Every report is a step towards better infrastructure.</p>
              <div className="visual-divider"></div>
              <div className="visual-feature">
                <span>📍</span>
                <div>
                  <strong>Location-based reporting</strong>
                  <small>Identify the problem area</small>
                </div>
              </div>
              <div className="visual-feature">
                <span>🔎</span>
                <div>
                  <strong>Transparent tracking</strong>
                  <small>Follow your complaint's progress</small>
                </div>
              </div>
              <div className="visual-feature">
                <span>🤝</span>
                <div>
                  <strong>Citizen-first governance</strong>
                  <small>Technology serving people</small>
                </div>
              </div>
            </div>
            <div className="floating-badge">
              <span>✦</span> Built for every citizen
            </div>
          </div>
        </section>

        <section className="report-section" id="report">
          <div>
            <span className="section-label">TAKE ACTION</span>
            <h2>Something needs fixing?</h2>
            <p>
              From potholes to broken streetlights, help us identify
              the infrastructure issues that affect your daily life.
            </p>
          </div>
          <div className="report-placeholder">
            <span className="placeholder-icon">＋</span>
            <strong>Complaint registration</strong>
            <p>We'll build the working complaint form next.</p>
          </div>
        </section>

        <section className="track-section" id="track">
          <span className="section-label">STAY INFORMED</span>
          <h2>Your complaint. Your visibility.</h2>
          <p>
                     A future tracking feature will let citizens check
                     complaint progress using a unique complaint ID.
          </p>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">S</span>
          <span>Smart<span className="brand-accent">Citizen</span></span>
        </a>
        <p>Smart Infrastructure for Every Citizen</p>
        <small>SFIC Maharashtra Zone · Competition Project</small>
      </footer>
    </div>
  )
}

export default App
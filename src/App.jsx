
import { useState } from 'react'
import './App.css'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

function App() {
  const [photoPreview, setPhotoPreview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [trackingId, setTrackingId] = useState('')
const [trackedComplaint, setTrackedComplaint] = useState(null)
const [isTracking, setIsTracking] = useState(false)
const [trackingMessage, setTrackingMessage] = useState('')
async function trackComplaint(event) {
  event.preventDefault()

  const cleanId = trackingId.trim().toUpperCase()

  if (!cleanId || isTracking) return

  setIsTracking(true)
  setTrackingMessage('')
  setTrackedComplaint(null)

  try {
    const response = await 
fetch(`${API_BASE_URL}/api/complaints/${encodeURIComponent(cleanId)}`)


    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Unable to find complaint.')
    }

    setTrackedComplaint(result.complaint)
  } catch (error) {
    setTrackingMessage(
      error.message || 'Unable to connect to the server. Please try again.'
    )
  } finally {
    setIsTracking(false)
  }
}
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
      Report potholes, broken streetlights, blocked drains,
      water leaks, and other infrastructure problems in your area.
    </p>
  </div>

 <form
  className="complaint-form"
  onSubmit={async (event) => {
    event.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)
    setSubmitMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    

    try {
     const response = await fetch(
  
`${API_BASE_URL}/api/complaints`
,
  {
    method: 'POST',
    body: formData,
  }
)

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to register complaint.')
      }

      setSubmitMessage(
        `Complaint registered successfully! Your complaint ID is ${result.complaint.complaintId}`
      )

      form.reset()
      setPhotoPreview('')
    } catch (error) {
      setSubmitMessage(
        error.message ||
          'Unable to connect to the server. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }}
>
    <h3>Register a complaint</h3>

    <label htmlFor="category">Issue category</label>
    <select id="category" name="category" required defaultValue="">
      <option value="" disabled>Select an issue</option>
      <option value="Road damage / pothole">Road damage / pothole</option>
      <option value="Streetlight">Streetlight</option>
      <option value="Blocked drain">Blocked drain</option>
      <option value="Water leakage">Water leakage</option>
      <option value="Waste management">Waste management</option>
      <option value="Public facility">Public facility</option>
      <option value="Other">Other</option>
    </select>

    <label htmlFor="description">Describe the problem</label>
    <textarea
      id="description"
      name="description"
      placeholder="Explain the issue and how it affects your area..."
      rows="4"
      required
      minLength={10}
    />
     <label htmlFor="photo">Upload a photo of the problem</label>

<input
  id="photo"
  name="photo"
  type="file"
  accept="image/*"
  capture="environment"
  onChange={(event) => {
    const file = event.target.files?.[0]

    if (!file) {
      setPhotoPreview('')
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      event.target.value = ''
      setPhotoPreview('')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5 MB.')
      event.target.value = ''
      setPhotoPreview('')
      return
    }

    setPhotoPreview(URL.createObjectURL(file))
  }}
/>

{photoPreview && (
  <div className="photo-preview">
    <img src={photoPreview} alt="Preview of the selected problem" />
    <button
      type="button"
      className="secondary-button"
      onClick={() => {
        document.getElementById('photo').value = ''
        URL.revokeObjectURL(photoPreview)
        setPhotoPreview('')
      }}
    >
      Remove photo
    </button>
  </div>
)}
<small>
  Add a photo of the pothole, damaged road, or other issue.
  Image upload is optional for now.
</small>
    <label htmlFor="location">Problem location</label>

<input
  id="location"
  name="location"
  type="text"
  placeholder="Area, street, or nearby landmark"
  required
/>

<button
  type="button"
  className="secondary-button"
  onClick={() => {
    if (!navigator.geolocation) {
      alert('Location services are not supported by this browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        document.getElementById('latitude').value = latitude
        document.getElementById('longitude').value = longitude

        alert('GPS location captured successfully!')
      },
      () => {
        alert('Unable to get your location. Please allow location access or enter the address manually.')
      }
    )
  }}
>
  📍 Use my current location
</button>

<input type="hidden" id="latitude" name="latitude" />
<input type="hidden" id="longitude" name="longitude" />

<small>
  Allow location access when prompted. You can also enter the address manually.
</small>

    <button
  type="submit"
  className="submit-button"
  disabled={isSubmitting}
>
  {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
</button>

{submitMessage && (
  <p role="status" aria-live="polite">
    {submitMessage}
  </p>
)}

   
  </form>
     </section>
       
<section className="track-section" id="track">
  <span className="section-label">STAY INFORMED</span>
  <h2>Track your complaint</h2>
  <p>
    Enter the unique complaint ID you received after submitting your report.
  </p>

  <form className="tracking-form" onSubmit={trackComplaint}>
    <label htmlFor="trackingId">Complaint ID</label>
    <input
      id="trackingId"
      type="text"
      value={trackingId}
      onChange={(event) => setTrackingId(event.target.value)}
      placeholder="e.g. SC-A1B2C3D4E5"
      required
    />

    <button
      type="submit"
      className="submit-button"
      disabled={isTracking}
    >
      {isTracking ? 'Searching...' : 'Track Complaint'}
    </button>
  </form>

  {trackingMessage && (
    <p role="alert">{trackingMessage}</p>
  )}

  {trackedComplaint && (
    <div className="tracking-result" aria-live="polite">
      <h3>Complaint Details</h3>
      <p><strong>Complaint ID:</strong> {trackedComplaint.complaintId}</p>
      <p><strong>Category:</strong> {trackedComplaint.category}</p>
      <p><strong>Description:</strong> {trackedComplaint.description}</p>
      <p><strong>Location:</strong> {trackedComplaint.location}</p>
      <p><strong>Status:</strong> {trackedComplaint.status}</p>
      <p><strong>Priority:</strong> {trackedComplaint.priority}</p>
      <p>
        <strong>Submitted:</strong>{' '}
        {new Date(trackedComplaint.createdAt).toLocaleString()}
      </p>

      {trackedComplaint.photoUrl && (
        <div>
          <p><strong>Attached photo:</strong></p>
          <img
            src={trackedComplaint.photoUrl}
            alt="Photo attached to the complaint"
            className="tracking-photo"
          />
        </div>
      )}
    </div>
  )}
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
import { useEffect } from 'react'

export default function ThankYouRankAI() {
  useEffect(() => {
    // META SCHEDULE EVENT
    if (window.fbq) {
      window.fbq('track', 'Schedule')
    }
    console.log('[PROD] Schedule event fired')
  }, [])

  return (
    <div className="thankyou-page">
      <div className="thankyou-card">
        <img
          src="https://assets.cdn.filesafe.space/Tx5eKisj3Xluq1SeZKe3/media/69f2eaabfc17decc451726a3.png"
          alt="Restoration AI"
          className="thankyou-logo"
        />

        <h1 className="thankyou-headline">Call Confirmed!</h1>

        <p className="thankyou-subheadline">
          We're excited to discuss the Rank AI System with you.
        </p>

        <div className="info-cards-row">
          <div className="info-card">
            <div className="info-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <polyline points="9 16 10.5 18 15 13" />
              </svg>
            </div>
            <h3 className="info-card-title">It's on the Calendar</h3>
            <p className="info-card-text">
              Your time is locked in. We are looking forward to speaking with you and diving into your business.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <h3 className="info-card-title">Check Your Inbox</h3>
            <p className="info-card-text">
              We're sending you an email and text right away with your calendar invite and a few resources to review.
            </p>
          </div>

          <div className="info-card">
            <div className="info-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="info-card-title">Have Questions?</h3>
            <p className="info-card-text">
              If there's anything specific you'd like to go over on our call, please let us know beforehand so we can prepare.
            </p>
          </div>
        </div>

        <p className="thankyou-signoff">
          We'll be keeping in touch leading up to the call. See you soon!
        </p>
      </div>
    </div>
  )
}

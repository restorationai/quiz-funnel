import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  const goToQuiz = () => navigate('/assessment')

  return (
    <div className="landing-page">
      <h1 className="landing-headline">
        Feeling Frustrated That<br className="mobile-break" />{' '}
        You Aren't Booking<br className="mobile-break" />{' '}
        More Restoration Jobs?
      </h1>

      <p className="landing-subheadline">
        Even though you are ready to handle more work?
      </p>

      <p className="landing-hook">
        Take the quick 2-minute assessment to find out exactly why you're experiencing this frustration and what to do about it.
      </p>

      <div className="cta-wrapper">
        <span className="cta-arrow left">→</span>
        <button className="cta-button" onClick={goToQuiz} id="cta-start-quiz-top">
          Start The Assessment
        </button>
        <span className="cta-arrow right">←</span>
      </div>

      <p className="value-props-headline">
        Take this assessment so that we can measure and improve three key areas:
      </p>

      <div className="value-props-row">
        <div className="value-prop-card">Generating More Leads</div>
        <div className="value-prop-card">Securing Every Inbound Call</div>
        <div className="value-prop-card">Increasing Your Revenue</div>
      </div>

      <div className="credibility-box">
        <p className="credibility-line">
          <span className="brand-name">Created by Restoration AI:</span> We analyzed giants like ServPro, ServiceMaster Restore, and Paul Davis Restoration.
        </p>
        <p className="credibility-line">
          We found <span className="stat">85%</span> of companies struggle because they lack an automated system. This assessment will pinpoint exactly where your revenue leaks are occurring.
        </p>
      </div>

      <div className="benefits-row">
        <div className="benefit-card">
          <span className="benefit-icon">✓</span>
          <span>It only takes 3 minutes to complete.</span>
        </div>
        <div className="benefit-card">
          <span className="benefit-icon">✓</span>
          <span>It's completely free.</span>
        </div>
        <div className="benefit-card">
          <span className="benefit-icon">✓</span>
          <span>You get immediate recommendations.</span>
        </div>
      </div>

      <div className="cta-wrapper bottom-cta">
        <span className="cta-arrow left">→</span>
        <button className="cta-button" onClick={goToQuiz} id="cta-start-quiz-bottom">
          Start The Assessment
        </button>
        <span className="cta-arrow right">←</span>
      </div>
    </div>
  )
}

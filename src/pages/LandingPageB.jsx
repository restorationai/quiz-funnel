import { useNavigate } from 'react-router-dom'
import AssessmentPage from './AssessmentPage'

export default function LandingPageB() {
  return (
    <div className="landing-page split-test-b">
      <h1 className="landing-headline">
        Feeling Frustrated That<br className="mobile-break" />{' '}
        You Aren't Booking<br className="mobile-break" />{' '}
        More Restoration Jobs?
      </h1>

      <div className="landing-subheadline-wrapper">
        <span className="bounce-arrow left-diag">↘</span>
        <p className="landing-subheadline">
          Even though you are ready to handle more work?
        </p>
        <span className="bounce-arrow right-diag">↙</span>
      </div>

      <div className="embedded-quiz-container">
        <AssessmentPage isEmbedded={true} />
      </div>

    </div>
  )
}

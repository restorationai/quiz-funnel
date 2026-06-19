import { useEffect } from 'react'
import { useQuiz } from '../context/QuizContext'
import GaugeMeter from '../components/GaugeMeter'

export default function ResultRankAI() {
  const { calculateScore } = useQuiz()
  const score = calculateScore()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://link.restorationai.io/js/form_embed.js'
    script.type = 'text/javascript'
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="results-page">
      <div className="warning-banner">
        🔴 WARNING: YOUR ANSWERS JUST REVEALED THE SILENT KILLER<br /> THAT IS BLEEDING YOUR REVENUE.
      </div>

      <div className="score-section">
        <div className="gauge-column">
          <GaugeMeter score={score} />
        </div>

        <div className="insights-column">
          <h2 className="insights-headline">
            Three Things You Need To Know Based Off Your Results
          </h2>

          <div className="insight-card">
            <div className="insight-number">1</div>
            <div className="insight-body">
              <div className="insight-title">You Are Hidden Online</div>
              <p className="insight-text">
                Homeowners call the first company they see on Google. If you aren't at the top, you are handing high-paying emergency jobs straight to your competitors.
              </p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-number">2</div>
            <div className="insight-body">
              <div className="insight-title">No Automated Leads Coming</div>
              <p className="insight-text">
                Word-of-mouth is completely unpredictable. Without an automated lead system, you cannot control your incoming cash flow or weekly schedule.
              </p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-number">3</div>
            <div className="insight-body">
              <div className="insight-title">Your Business Won't Grow</div>
              <p className="insight-text">
                Having great trucks and gear means nothing if you stay hidden online. You are locking your company at its current size and missing jobs you don't even know exist.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="blueprint-section">
        <div className="blueprint-arrows">
          <span className="bounce-arrow">↘</span>
          <h2 className="blueprint-headline">
            The Blueprint For Fixing Broken Businesses & Doubling Revenue
          </h2>
          <span className="bounce-arrow">↙</span>
        </div>
      </div>

      <div className="video-section">
        <video
          className="video-player"
          controls
          preload="metadata"
          playsInline
          id="rank-ai-vsl-video"
        >
          <source src="https://assets.cdn.filesafe.space/Tx5eKisj3Xluq1SeZKe3/media/6a27305719b4ff338be79c84.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="calendar-section">
        <h2 className="calendar-headline">Let's Stop Leaving Cash On The Table</h2>
        <p className="calendar-subheadline">
          Book A Call Below To Get This System Installed In Your Business
        </p>
        <iframe
          src="https://link.restorationai.io/widget/booking/Ya9jcpzKfBtfVJGHIyNS"
          className="calendar-embed"
          scrolling="no"
          id="rank-ai-calendar-embed"
          title="Book a Rank AI Strategy Call"
        />
      </div>
    </div>
  )
}

import { useEffect } from 'react'
import { useQuiz } from '../context/QuizContext'
import GaugeMeter from '../components/GaugeMeter'

export default function ResultAIReceptionist() {
  const { calculateScore } = useQuiz()
  const score = calculateScore()

  useEffect(() => {
    window.scrollTo(0, 0)
    // The HighLevel form script aggressively auto-scrolls down when it finishes loading.
    // We lock the scroll to the top for the first 1.5 seconds to fight and defeat it.
    const scrollLock = setInterval(() => {
      window.scrollTo(0, 0)
    }, 50)
    setTimeout(() => clearInterval(scrollLock), 1500)

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
              <div className="insight-title">Voicemails Kill Your Revenue</div>
              <p className="insight-text">
                Disasters happen 24/7. Panicked callers won't wait on a voicemail - they instantly hang up and call the next restoration company down the street.
              </p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-number">2</div>
            <div className="insight-body">
              <div className="insight-title">You Waste Marketing Money</div>
              <p className="insight-text">
                Making the phone ring is a total waste of money if those calls aren't answered instantly. Every missed call means you paid out of pocket to give your rivals a lead.
              </p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-number">3</div>
            <div className="insight-body">
              <div className="insight-title">You Are Losing Revenue</div>
              <p className="insight-text">
                You don't need to buy more leads; you need to stop losing the ones you have. Without 24/7 capture, hard-earned revenue silently slips away.
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
          id="ai-receptionist-vsl-video"
        >
          <source src="https://assets.cdn.filesafe.space/Tx5eKisj3Xluq1SeZKe3/media/6a274f75d91f654725b5ffcd.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="calendar-section">
        <h2 className="calendar-headline">Let's Stop Leaving Cash On The Table</h2>
        <p className="calendar-subheadline">
          Book A Call Below To Get This System Installed In Your Business
        </p>
        <iframe
          src="https://link.restorationai.io/widget/booking/szeyWKCEvVWkbFjMFtFT"
          className="calendar-embed"
          scrolling="no"
          id="ai-receptionist-calendar-embed"
          title="Book an AI Receptionist Strategy Call"
        />
      </div>
    </div>
  )
}

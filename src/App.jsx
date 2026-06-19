import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import AssessmentPage from './pages/AssessmentPage'
import FormPage from './pages/FormPage'
import ResultRankAI from './pages/ResultRankAI'
import ResultAIReceptionist from './pages/ResultAIReceptionist'
import ThankYouRankAI from './pages/ThankYouRankAI'
import ThankYouAIReceptionist from './pages/ThankYouAIReceptionist'
import LoadingScreen from './components/LoadingScreen'
import DevNav from './components/DevNav'

function PageTracker() {
  const location = useLocation()
  useEffect(() => {
    // META PAGEVIEW — DISABLED FOR DEVELOPMENT
    // Uncomment when deploying to production.
    /*
    if (window.fbq) {
      window.fbq('track', 'PageView')
    }
    */
  }, [location])
  return null
}

function App() {
  return (
    <>
      <PageTracker />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/result/rank-ai" element={<ResultRankAI />} />
        <Route path="/result/ai-receptionist" element={<ResultAIReceptionist />} />
        <Route path="/thank-you/rank-ai" element={<ThankYouRankAI />} />
        <Route path="/thank-you/ai-receptionist" element={<ThankYouAIReceptionist />} />
      </Routes>
      <DevNav />
    </>
  )
}

export default App

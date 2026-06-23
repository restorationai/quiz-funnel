import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LandingPage from './pages/LandingPage'
import LandingPageB from './pages/LandingPageB'
import AssessmentPage from './pages/AssessmentPage'
import FormPage from './pages/FormPage'
import ResultRankAI from './pages/ResultRankAI'
import ResultAIReceptionist from './pages/ResultAIReceptionist'
import ThankYouRankAI from './pages/ThankYouRankAI'
import ThankYouAIReceptionist from './pages/ThankYouAIReceptionist'
import LoadingScreen from './components/LoadingScreen'


function PageTracker() {
  const location = useLocation()
  useEffect(() => {
    // META PAGEVIEW
    if (window.fbq) {
      window.fbq('track', 'PageView')
    }
  }, [location])
  return null
}

function SplitTestRouter() {
  const [variant, setVariant] = useState('A'); // Default to A

  useEffect(() => {
    // Read the ab-test-variant cookie set by Cloudflare Edge
    const isVariantB = document.cookie.includes('ab-test-variant=B');
    const currentVariant = isVariantB ? 'B' : 'A';
    setVariant(currentVariant);

    // Fire Meta custom event to track which variant they saw
    if (window.fbq) {
      window.fbq('trackCustom', 'SplitTestView', { variant: currentVariant });
    }

    // Send Custom Tag to Microsoft Clarity
    if (window.clarity) {
      window.clarity("set", "ab_test_variant", currentVariant);
    }

    // Send Custom Event to Google Analytics
    if (window.gtag) {
      window.gtag('event', 'split_test_view', {
        'ab_test_variant': currentVariant
      });
    }
  }, []);

  return variant === 'B' ? <LandingPageB /> : <LandingPage />;
}

function App() {
  return (
    <>
      <PageTracker />
      <Routes>
        <Route path="/" element={<SplitTestRouter />} />
        <Route path="/version-b" element={<LandingPageB />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/result/rank-ai" element={<ResultRankAI />} />
        <Route path="/result/ai-receptionist" element={<ResultAIReceptionist />} />
        <Route path="/thank-you/rank-ai" element={<ThankYouRankAI />} />
        <Route path="/thank-you/ai-receptionist" element={<ThankYouAIReceptionist />} />
      </Routes>
    </>
  )
}

export default App

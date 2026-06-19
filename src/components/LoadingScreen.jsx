import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoadingScreen() {
  const navigate = useNavigate()
  const [dotCount, setDotCount] = useState(0)

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4)
    }, 400)

    const timer = setTimeout(() => {
      navigate('/form')
    }, 3000)

    return () => {
      clearInterval(dotInterval)
      clearTimeout(timer)
    }
  }, [navigate])

  const dots = '.'.repeat(dotCount)

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring inner"></div>
        </div>
        <h2 className="loading-text">Calculating Your Results{dots}</h2>
      </div>
    </div>
  )
}

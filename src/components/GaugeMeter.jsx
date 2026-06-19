import { useEffect, useState, useRef } from 'react'

export default function GaugeMeter({ score }) {
  const [animatedOffset, setAnimatedOffset] = useState(null)
  const containerRef = useRef(null)

  // SVG dimensions — taller viewBox so arc sits higher above the text
  const svgWidth = 340
  const svgHeight = 210
  const cx = 170
  const cy = 195  // pushed down so arc bottom sits lower, away from text
  const r = 145   // bigger radius for a wider arc
  const strokeWidth = 22

  // Semicircle from left (180°) to right (0°)
  const startX = cx - r
  const startY = cy
  const endX = cx + r
  const endY = cy
  const arcPath = `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`

  const totalArc = Math.PI * r
  const fillPercent = score / 100
  const targetOffset = totalArc * (1 - fillPercent)

  useEffect(() => {
    setAnimatedOffset(totalArc)
    const timer = setTimeout(() => {
      setAnimatedOffset(targetOffset)
    }, 200)
    return () => clearTimeout(timer)
  }, [score, totalArc, targetOffset])

  const isCritical = score <= 45

  const statusText = score <= 39
    ? 'STATUS: CRITICAL RISK'
    : score <= 56
      ? 'STATUS: HIGH RISK'
      : 'STATUS: REVENUE LEAK DETECTED'

  const statusClass = isCritical ? 'critical' : 'warning'

  return (
    <div className="gauge-container" ref={containerRef}>
      <div className="gauge-overlay-wrapper">
        {/* SVG arc — positioned behind the text */}
        <svg
          className="gauge-svg-overlay"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="gaugeGradientRed" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff1a1a" />
              <stop offset="100%" stopColor="#ff4444" />
            </linearGradient>
            <linearGradient id="gaugeGradientYellow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#ffc107" />
            </linearGradient>
            <filter id="glowRed">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowYellow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background arc track */}
          <path
            d={arcPath}
            fill="none"
            stroke="rgba(100, 120, 160, 0.2)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Filled arc */}
          <path
            d={arcPath}
            fill="none"
            stroke={`url(#${isCritical ? 'gaugeGradientRed' : 'gaugeGradientYellow'})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={totalArc}
            strokeDashoffset={animatedOffset !== null ? animatedOffset : totalArc}
            filter={`url(#${isCritical ? 'glowRed' : 'glowYellow'})`}
            style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
          />
        </svg>

        {/* Score text — sits inside the arc opening */}
        <div className="gauge-text-overlay">
          <div className="gauge-score">{score}%</div>
          <div className="gauge-label">DIAGNOSTIC HEALTH SCORE</div>
        </div>
      </div>

      <div className={`status-pill ${statusClass}`}>
        {statusText}
      </div>
    </div>
  )
}

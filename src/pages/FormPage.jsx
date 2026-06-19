import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'

export default function FormPage() {
  const navigate = useNavigate()
  const { answers, question15Text, determineRoute, calculateScore } = useQuiz()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    // For phone, only allow digits
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '')
      if (digits.length <= 10) {
        // Auto-format: (XXX) XXX-XXXX
        let formatted = digits
        if (digits.length > 6) {
          formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
        } else if (digits.length > 3) {
          formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`
        } else if (digits.length > 0) {
          formatted = `(${digits}`
        }
        setFormData(prev => ({ ...prev, phone: formatted }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const getPhoneDigits = () => formData.phone.replace(/\D/g, '')

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    // Email: at least one char + @ + at least one char
    const emailPattern = /^.+@.+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }

    const phoneDigits = getPhoneDigits()
    if (phoneDigits.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    const route = determineRoute()
    const score = calculateScore()
    const quizOutcome = route === 'rank-ai' ? 'Rank AI' : 'AI Receptionist'

    // ============================================
    // CRM WEBHOOK — DISABLED FOR DEVELOPMENT
    // Uncomment when deploying to production.
    // ============================================
    /*
    try {
      await fetch('https://services.leadconnectorhq.com/hooks/Tx5eKisj3Xluq1SeZKe3/webhook-trigger/ff375b31-6d07-464f-9804-4507d5c046df', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          company_name: formData.companyName,
          phone: formData.phone,
          quiz_outcome: quizOutcome,
          quiz_score: score,
          quiz_question_15: question15Text,
          quiz_answers: answers,
        }),
      })
    } catch (err) {
      console.error('Webhook error:', err)
    }
    */

    console.log('[DEV] Form submitted (webhook disabled):', {
      full_name: formData.fullName,
      email: formData.email,
      company_name: formData.companyName,
      phone: formData.phone,
      quiz_outcome: quizOutcome,
      quiz_score: score,
    })

    // Navigate to result
    navigate(`/result/${route}`)
  }

  const handleBack = () => {
    navigate('/assessment')
  }

  const phoneDigits = getPhoneDigits()
  const isValid = formData.fullName.trim().length >= 1
    && /^.+@.+$/.test(formData.email.trim())
    && formData.companyName.trim().length >= 1
    && phoneDigits.length === 10

  return (
    <div className="form-page">
      <button className="back-button" onClick={handleBack} id="form-back-button">
        ← Back
      </button>

      <div className="form-card">
        <div className="form-headline">
          <span className="line1">We found</span>
          <span className="line2">3 FATAL MISTAKES</span>
          <span className="line3">that are destroying your business</span>
        </div>

        <div className="form-subheadline">
          <span className="bounce-arrow left-diag">↘</span>
          <span>Put your info below to see your score and stop the bleeding.</span>
          <span className="bounce-arrow right-diag">↙</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">Full Name *</label>
            <input
              className={`form-input ${errors.fullName ? 'input-error' : ''}`}
              type="text"
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address *</label>
            <input
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="companyName">Company Name *</label>
            <input
              className={`form-input ${errors.companyName ? 'input-error' : ''}`}
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Acme Restoration"
              value={formData.companyName}
              onChange={handleChange}
            />
            {errors.companyName && <span className="field-error">{errors.companyName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone Number *</label>
            <input
              className={`form-input ${errors.phone ? 'input-error' : ''}`}
              type="tel"
              id="phone"
              name="phone"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <button
            className="submit-button"
            type="submit"
            disabled={!isValid || isSubmitting}
            id="form-submit-button"
          >
            {isSubmitting ? 'Processing...' : 'Get My Results'} {!isSubmitting && <span>›</span>}
          </button>
        </form>
      </div>
    </div>
  )
}

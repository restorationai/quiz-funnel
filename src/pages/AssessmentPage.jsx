import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'

const questions = [
  {
    id: 1,
    text: "Where do you get most of your water damage jobs right now?",
    options: [
      { letter: 'A', text: "Word of mouth, mostly friends and referrals." },
      { letter: 'B', text: "I buy them from places like Angi." },
      { letter: 'C', text: "People find my website on Google." },
    ]
  },
  {
    id: 2,
    text: "When someone searches 'water damage near me,' do you show up at the very top of Google?",
    options: [
      { letter: 'A', text: "Yes, we dominate the top spot." },
      { letter: 'B', text: "Sometimes, but it's hit or miss." },
      { letter: 'C', text: "No, we are basically invisible." },
    ]
  },
  {
    id: 3,
    text: "How many new 5-star Google reviews do you get every month?",
    options: [
      { letter: 'A', text: "0 to 2, it's pretty slow." },
      { letter: 'B', text: "3 to 5, we do okay." },
      { letter: 'C', text: "10 or more, we crush it." },
    ]
  },
  {
    id: 4,
    text: "Do you pay Google for ads right now to get emergency jobs?",
    options: [
      { letter: 'A', text: "No, I don't run any ads." },
      { letter: 'B', text: "Yes, but the leads are terrible." },
      { letter: 'C', text: "Yes, and it works perfectly." },
    ]
  },
  {
    id: 5,
    text: "How would you describe the number of qualified jobs you get?",
    options: [
      { letter: 'A', text: "The phone barely rings." },
      { letter: 'B', text: "It's a stressful rollercoaster." },
      { letter: 'C', text: "It is steady and growing." },
    ]
  },
  {
    id: 6,
    text: "What happens if someone calls you at 2:00 AM on a Sunday?",
    options: [
      { letter: 'A', text: "It goes straight to voicemail." },
      { letter: 'B', text: "Answering service takes a message." },
      { letter: 'C', text: "It rings my cell and I hope I wake up." },
      { letter: 'D', text: "It's answered and handled instantly." },
    ]
  },
  {
    id: 7,
    text: "In a normal week, how many phone calls do you miss?",
    options: [
      { letter: 'A', text: "None, we catch them all." },
      { letter: 'B', text: "Maybe 1 to 3 calls." },
      { letter: 'C', text: "4 to 10 calls." },
      { letter: 'D', text: "Honestly, way too many to count." },
    ]
  },
  {
    id: 8,
    text: "If 6 high-value leads called at the same time, how would you turn all 6 into booked jobs?",
    options: [
      { letter: 'A', text: "We'd answer one call and hope the other five leave a voicemail." },
      { letter: 'B', text: "We'd be able to answer a few calls, but the rest would end up on hold while some leads slip away." },
      { letter: 'C', text: "We use an answering service to take every call, but they don't actively qualify and secure every job." },
      { letter: 'D', text: "Our system instantly qualifies, follows up with, and secures all six leads simultaneously." },
    ]
  },
  {
    id: 9,
    text: "Do you ever lose a job because you didn't answer the phone fast enough?",
    options: [
      { letter: 'A', text: "Yes, and it hurts every time." },
      { letter: 'B', text: "It happens occasionally." },
      { letter: 'C', text: "Never, we are always on top of it." },
    ]
  },
  {
    id: 10,
    text: "How much time do you waste talking to bad leads or telemarketers?",
    options: [
      { letter: 'A', text: "Way too much time, honestly." },
      { letter: 'B', text: "Just a little bit of time." },
      { letter: 'C', text: "None at all." },
    ]
  },
  {
    id: 11,
    text: "How big is your business right now?",
    options: [
      { letter: 'A', text: "Just starting out." },
      { letter: 'B', text: "1 to 3 trucks." },
      { letter: 'C', text: "4 to 10 trucks." },
      { letter: 'D', text: "Very large enterprise." },
    ]
  },
  {
    id: 12,
    text: "What is your biggest goal for the next 90 days?",
    options: [
      { letter: 'A', text: "Get the phone ringing with more jobs." },
      { letter: 'B', text: "Stop missing the calls I already get." },
    ]
  },
  {
    id: 13,
    text: "What is the biggest thing stopping you from reaching that goal?",
    options: [
      { letter: 'A', text: "We just don't show up on Google." },
      { letter: 'B', text: "We are too busy to answer the phone fast." },
    ]
  },
  {
    id: 14,
    text: "What kind of help do you need the most right now?",
    options: [
      { letter: 'A', text: "A system that automatically gets us more Google leads." },
      { letter: 'B', text: "A system that answers every call and qualifies leads." },
    ]
  },
]

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const { answers, setAnswer, question15Text, setQuestion15Text } = useQuiz()
  const navigate = useNavigate()

  const totalQuestions = 15
  const isLastTextQuestion = currentQuestion === 14 // Q15 is index 14
  const isMultipleChoice = currentQuestion < 14

  const progress = Math.round(((currentQuestion + 1) / totalQuestions) * 100)

  const handleAnswerClick = (letter) => {
    const qId = questions[currentQuestion].id
    setAnswer(qId, letter)

    // Auto-advance after brief delay
    setTimeout(() => {
      if (currentQuestion < 13) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        // Go to Q15 (text question)
        setCurrentQuestion(14)
      }
    }, 350)
  }

  const handleContinue = () => {
    navigate('/loading')
  }

  const handleBack = () => {
    if (currentQuestion === 0) {
      navigate('/')
    } else {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  return (
    <div className="assessment-page">
      <button className="back-button" onClick={handleBack} id="quiz-back-button">
        ← Back
      </button>

      <div className="progress-section">
        <div className="progress-labels">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>{progress}% Completed</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="question-card" key={currentQuestion}>
        {isMultipleChoice ? (
          <>
            <h2 className="question-text">{questions[currentQuestion].text}</h2>
            {questions[currentQuestion].options.map(opt => (
              <button
                key={opt.letter}
                className={`answer-option ${answers[questions[currentQuestion].id] === opt.letter ? 'selected' : ''}`}
                onClick={() => handleAnswerClick(opt.letter)}
                id={`q${questions[currentQuestion].id}-option-${opt.letter}`}
              >
                <span>{opt.text}</span>
                <span className="answer-radio" />
              </button>
            ))}
          </>
        ) : (
          <>
            <h2 className="question-text">Is there anything else you want to tell us?</h2>
            <textarea
              className="open-text-area"
              placeholder="Type your answer here..."
              value={question15Text}
              onChange={(e) => setQuestion15Text(e.target.value)}
              id="question-15-textarea"
            />
            <button className="continue-button" onClick={handleContinue} id="quiz-continue-button">
              Continue <span>›</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

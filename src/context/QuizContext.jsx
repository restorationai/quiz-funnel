import { createContext, useContext, useState } from 'react'

const QuizContext = createContext()

export function QuizProvider({ children }) {
  const [answers, setAnswers] = useState({})
  const [question15Text, setQuestion15Text] = useState('')

  const setAnswer = (questionNumber, answerLetter) => {
    setAnswers(prev => ({ ...prev, [questionNumber]: answerLetter }))
  }

  const calculateScore = () => {
    const problematicAnswers = {
      1: ['A', 'B'],
      2: ['B', 'C'],
      3: ['A', 'B'],
      4: ['A', 'B'],
      5: ['A', 'B'],
      6: ['A', 'B', 'C'],
      7: ['B', 'C', 'D'],
      8: ['A', 'B', 'C'],
      9: ['A', 'B'],
      10: ['A', 'B'],
      11: ['A'],
      12: ['A', 'B'],
      13: ['A', 'B'],
      14: ['A', 'B'],
    }

    let problemPoints = 0
    for (let q = 1; q <= 14; q++) {
      const userAnswer = answers[q]
      if (userAnswer && problematicAnswers[q]?.includes(userAnswer)) {
        problemPoints++
      }
    }

    if (problemPoints >= 10) return 39
    if (problemPoints >= 5) return 56
    return 74
  }

  const determineRoute = () => {
    const routingQuestions = [12, 13, 14]
    let aCount = 0
    let bCount = 0

    routingQuestions.forEach(q => {
      if (answers[q] === 'A') aCount++
      if (answers[q] === 'B') bCount++
    })

    if (bCount >= 2) return 'ai-receptionist'
    return 'rank-ai'
  }

  return (
    <QuizContext.Provider value={{
      answers,
      setAnswer,
      question15Text,
      setQuestion15Text,
      calculateScore,
      determineRoute,
    }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  return useContext(QuizContext)
}

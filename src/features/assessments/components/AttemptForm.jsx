/**
 * @file AttemptForm.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * WHAT THIS FILE IS:
 *   AttemptForm.jsx is the assessments presentational UI for DigiFikile LMS. It belongs to the assessments feature, which covers quizzes, assignments, attempts, submissions, and grading-facing workflows. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   features/assessments/components/ keeps UI that belongs only to the assessments domain beside that domain. This preserves feature isolation and prevents shared folders from filling with one-off LMS screens.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Keep this component as a mostly dumb view: receive data, callbacks, status flags, and labels through props; call a feature hook only at a clear container boundary.
 *   - Document the expected prop shape when implemented, validate optional values, and render stable keys when mapping DTO-derived collections.
 *   - Use semantic controls, associated labels, correct button types, keyboard support, and aria attributes only where native HTML does not express the meaning.
 *   - Use responsive Tailwind classes and content-driven sizing; avoid fixed widths that break on phones or translated copy.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not call raw Axios, import lib/api.js, mutate props, or hide side effects inside rendering.
 *   - Do not reach into another feature’s internal folders. A assessments button must not directly issue another domain’s HTTP request; coordinate through page composition, a dedicated workflow hook, or approved public feature APIs.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - features/assessments/hooks/* — supplies data, status, and callbacks.
 *   - features/assessments/index.js — exposes approved components to pages.
 *   - services/* — reached through hooks, never imported directly here.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   This module participates in quizzes, assignments, attempts, submissions, and grading-facing workflows. The .NET API remains authoritative for validation, permissions, persistence, and business rules. Frontend code presents those outcomes, sends DTO-shaped requests through services, and must handle ProblemDetails/validation failures without assuming the browser is trusted.
 *
 * @example
 *   // <AttemptForm data={viewModel} loading={loading} error={error} onRetry={refetch} />
 */

import { useEffect, useMemo, useState } from 'react'

const attemptQuestions = [
  {
    id: 'q1',
    type: 'multiple-choice',
    prompt: 'Which keyword declares a block-scoped variable in JavaScript?',
    options: ['var', 'let', 'const', 'static'],
    correctAnswer: 'let',
    explanation: 'The let keyword is block-scoped, which means it is only accessible inside the block where it is declared.',
  },
  {
    id: 'q2',
    type: 'short-answer',
    prompt: 'In one sentence, what is a JavaScript function used for?',
    acceptedAnswers: ['reusable block of code', 'reusable code block', 'block of code that can be reused'],
    explanation: 'A function groups logic into a reusable unit so the same task can be performed multiple times with different inputs.',
  },
  {
    id: 'q3',
    type: 'multi-select',
    prompt: 'Select all JavaScript primitive data types from the list below.',
    options: ['string', 'boolean', 'array', 'number'],
    correctAnswers: ['string', 'boolean', 'number'],
    explanation: 'In JavaScript, string, boolean, and number are primitive types. Arrays are objects, not primitives.',
  },
  {
    id: 'q4',
    type: 'true-false',
    prompt: 'A while loop continues running until its condition becomes false.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'A while loop executes repeatedly while its condition evaluates to true and stops when the condition becomes false.',
  },
]

const normalizeText = (value) => String(value || '').trim().toLowerCase().replace(/\s+/g, ' ')

const hasAnswerForQuestion = (question, value) => {
  if (question.type === 'short-answer') {
    return normalizeText(value).length > 0
  }

  if (question.type === 'multi-select') {
    return Array.isArray(value) && value.length > 0
  }

  return typeof value === 'string' && value.length > 0
}

const arraysMatch = (left, right) => {
  if (!Array.isArray(left) || !Array.isArray(right)) return false
  if (left.length !== right.length) return false
  return [...left].sort().every((value, index) => value === [...right].sort()[index])
}

const getStorageKey = (quizId) => `digifikile-quiz-active-attempt:${quizId}`

const safeParse = (value) => {
  if (!value) return null

  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

const createAttemptState = ({ quizId, quizTitle, durationSeconds }) => ({
  quizId,
  quizTitle,
  startedAt: Date.now(),
  durationSeconds,
  currentQuestionIndex: 0,
  answersByQuestionId: {},
})

const getFacilitatorFeedback = (scorePercent, completionMode) => {
  if (completionMode === 'timed-out') {
    return 'The attempt ended because time expired. Review the incorrect items and try again with a stronger pace.'
  }

  if (completionMode === 'ended') {
    return 'The learner ended this attempt early. Review the responses completed so far before starting another attempt.'
  }

  if (scorePercent >= 80) {
    return 'Strong performance. The learner showed a solid grasp of the lesson and only needs light revision on the misses.'
  }

  if (scorePercent >= 50) {
    return 'Moderate progress. Focus on the incorrect responses and review the explanations before the next attempt.'
  }

  return 'Needs revision. Revisit the lesson content and work through each incorrect item carefully before retrying.'
}

const getCorrectAnswerLabel = (questionItem) => {
  if (Array.isArray(questionItem.correctAnswers) && questionItem.correctAnswers.length > 0) {
    return questionItem.correctAnswers.join(', ')
  }

  if (typeof questionItem.correctAnswer === 'string' && questionItem.correctAnswer.length > 0) {
    return questionItem.correctAnswer
  }

  return 'Not available'
}

const getQuestionChoiceAnswerText = (questionItem, option) => {
  if (Array.isArray(questionItem.answer)) {
    return questionItem.answer.includes(option)
  }

  return questionItem.answer === option
}

export default function AttemptForm({
  quizId = 'quiz',
  quizTitle = 'JavaScript Fundamentals',
  durationMinutes = 20,
  onSubmitAttempt,
  onCancelAttempt,
}) {
  const storageKey = useMemo(() => getStorageKey(quizId), [quizId])
  const durationSeconds = useMemo(() => Math.max(60, Number(durationMinutes || 0) * 60), [durationMinutes])

  const [attemptState, setAttemptState] = useState(() => {
    if (typeof window === 'undefined') {
      return createAttemptState({ quizId, quizTitle, durationSeconds })
    }

    const storedAttempt = safeParse(localStorage.getItem(storageKey))
    if (storedAttempt && storedAttempt.quizId === quizId && storedAttempt.startedAt && storedAttempt.durationSeconds) {
      return storedAttempt
    }

    const nextAttemptState = createAttemptState({ quizId, quizTitle, durationSeconds })
    localStorage.setItem(storageKey, JSON.stringify(nextAttemptState))
    return nextAttemptState
  })
  const [clockTick, setClockTick] = useState(0)
  const [hasFinalized, setHasFinalized] = useState(false)

  const totalQuestions = attemptQuestions.length
  const currentQuestionIndex = Math.min(attemptState.currentQuestionIndex ?? 0, totalQuestions - 1)
  const currentQuestion = attemptQuestions[currentQuestionIndex]

  const remainingSeconds = useMemo(() => {
    const elapsedSeconds = Math.floor((Date.now() - attemptState.startedAt) / 1000)
    return Math.max(0, (attemptState.durationSeconds || durationSeconds) - elapsedSeconds)
  }, [attemptState.durationSeconds, attemptState.startedAt, clockTick, durationSeconds])

  const completedQuestionsCount = useMemo(
    () =>
      attemptQuestions.reduce((count, question) => {
        const answer = attemptState.answersByQuestionId?.[question.id]
        return hasAnswerForQuestion(question, answer) ? count + 1 : count
      }, 0),
    [attemptState.answersByQuestionId]
  )

  const progressPercent = Math.round((completedQuestionsCount / totalQuestions) * 100)

  const persistAttempt = (nextAttemptState) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(storageKey, JSON.stringify(nextAttemptState))
  }

  const clearAttempt = () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(storageKey)
  }

  const updateAttemptState = (updater) => {
    setAttemptState((currentAttempt) => {
      const nextAttempt = typeof updater === 'function' ? updater(currentAttempt) : updater
      return nextAttempt
    })
  }

  const updateSingleValueAnswer = (questionId, nextValue) => {
    updateAttemptState((currentAttempt) => ({
      ...currentAttempt,
      answersByQuestionId: {
        ...currentAttempt.answersByQuestionId,
        [questionId]: nextValue,
      },
    }))
  }

  const toggleMultiSelectValue = (questionId, selectedValue) => {
    updateAttemptState((currentAttempt) => {
      const currentValue = Array.isArray(currentAttempt.answersByQuestionId?.[questionId])
        ? currentAttempt.answersByQuestionId[questionId]
        : []

      const nextValue = currentValue.includes(selectedValue)
        ? currentValue.filter((item) => item !== selectedValue)
        : [...currentValue, selectedValue]

      return {
        ...currentAttempt,
        answersByQuestionId: {
          ...currentAttempt.answersByQuestionId,
          [questionId]: nextValue,
        },
      }
    })
  }

  const evaluateAttempt = (completionMode) => {
    let correctCount = 0

    const evaluatedQuestions = attemptQuestions.map((question) => {
      const learnerAnswer = attemptState.answersByQuestionId?.[question.id]
      let isCorrect = false
      const isAnswered = hasAnswerForQuestion(question, learnerAnswer)

      if (question.type === 'multiple-choice' || question.type === 'true-false') {
        isCorrect = normalizeText(learnerAnswer) === normalizeText(question.correctAnswer)
      }

      if (question.type === 'short-answer') {
        const normalizedAnswer = normalizeText(learnerAnswer)
        isCorrect = question.acceptedAnswers.some((acceptedAnswer) => normalizedAnswer.includes(normalizeText(acceptedAnswer)))
      }

      if (question.type === 'multi-select') {
        isCorrect = arraysMatch(
          Array.isArray(learnerAnswer) ? learnerAnswer.map(normalizeText) : [],
          question.correctAnswers.map(normalizeText)
        )
      }

      if (isCorrect) {
        correctCount += 1
      }

      return {
        questionId: question.id,
        questionText: question.prompt,
        questionType: question.type,
        options: question.options || [],
        correctAnswer: question.correctAnswer || null,
        correctAnswerText: getCorrectAnswerLabel(question),
        correctAnswers: question.correctAnswers || [],
        explanation: question.explanation || '',
        isAnswered,
        isCorrect,
        answer: learnerAnswer,
      }
    })

    const incorrectCount = totalQuestions - correctCount
    const scorePercent = Math.round((correctCount / totalQuestions) * 100)

    return {
      attemptId: `${quizId}-${attemptState.startedAt}`,
      quizId,
      quizTitle,
      startedAt: attemptState.startedAt,
      completedAt: new Date().toISOString(),
      completionMode,
      scorePercent,
      correct: correctCount,
      incorrect: incorrectCount,
      totalQuestions,
      completedQuestions: completedQuestionsCount,
      questionBreakdown: evaluatedQuestions,
      feedback: getFacilitatorFeedback(scorePercent, completionMode),
    }
  }

  const finalizeAttempt = (completionMode) => {
    if (hasFinalized) return
    setHasFinalized(true)

    const resultSummary = evaluateAttempt(completionMode)
    clearAttempt()

    if (completionMode === 'ended') {
      if (typeof onCancelAttempt === 'function') {
        onCancelAttempt(resultSummary)
        return
      }
      if (typeof onSubmitAttempt === 'function') {
        onSubmitAttempt(resultSummary)
      }
      return
    }

    if (typeof onSubmitAttempt === 'function') {
      onSubmitAttempt(resultSummary)
    }
  }

  const submitAttempt = () => finalizeAttempt('submitted')
  const endAttempt = () => finalizeAttempt('ended')

  useEffect(() => {
    if (hasFinalized) return undefined

    const intervalId = setInterval(() => {
      setClockTick((tick) => tick + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [hasFinalized])

  useEffect(() => {
    if (!hasFinalized && remainingSeconds <= 0) {
      finalizeAttempt('timed-out')
    }
  }, [remainingSeconds, hasFinalized])

  useEffect(() => {
    if (hasFinalized || typeof window === 'undefined') return
    persistAttempt(attemptState)
  }, [attemptState, hasFinalized, storageKey])

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0')
  const seconds = String(remainingSeconds % 60).padStart(2, '0')
  const isCurrentAnswered = hasAnswerForQuestion(currentQuestion, attemptState.answersByQuestionId?.[currentQuestion.id])

  return (
    <div className="attempt-page">
      <div className="attempt-header">
        <div>
          <h1>{quizTitle}</h1>
          <p>Answer all questions before the timer expires. If you leave, this attempt will resume with the remaining time.</p>
        </div>
        <div className={`attempt-timer ${remainingSeconds <= 60 ? 'warning' : ''}`} aria-live="polite" aria-label={`Time left ${minutes} minutes ${seconds} seconds`}>
          <span>Time Left</span>
          <strong>{minutes}:{seconds}</strong>
        </div>
      </div>

      <section className="attempt-progress-panel" aria-label="Question progress tracker">
        <div className="attempt-progress-copy">
          <strong>Progress</strong>
          <span>{completedQuestionsCount} of {totalQuestions} completed</span>
        </div>
        <div className="attempt-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent}>
          <span style={{ width: `${progressPercent}%` }} />
        </div>
      </section>

      <section className="attempt-question-card">
        <div className="attempt-question-meta">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span className={`attempt-question-status ${isCurrentAnswered ? 'answered' : 'pending'}`}>
            {isCurrentAnswered ? 'Answered' : 'Pending'}
          </span>
        </div>

        <h2>{currentQuestion.prompt}</h2>

        {currentQuestion.type === 'multiple-choice' && (
          <div className="attempt-options-group" role="radiogroup" aria-label="Multiple choice options">
            {currentQuestion.options.map((option) => (
              <label key={option} className="attempt-option-row">
                <input
                  type="radio"
                  name={currentQuestion.id}
                  checked={attemptState.answersByQuestionId?.[currentQuestion.id] === option}
                  onChange={() => updateSingleValueAnswer(currentQuestion.id, option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}

        {currentQuestion.type === 'multi-select' && (
          <div className="attempt-options-group" role="group" aria-label="Select all that apply">
            {currentQuestion.options.map((option) => {
              const selectedOptions = Array.isArray(attemptState.answersByQuestionId?.[currentQuestion.id])
                ? attemptState.answersByQuestionId[currentQuestion.id]
                : []

              return (
                <label key={option} className="attempt-option-row">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => toggleMultiSelectValue(currentQuestion.id, option)}
                  />
                  <span>{option}</span>
                </label>
              )
            })}
          </div>
        )}

        {currentQuestion.type === 'short-answer' && (
          <div className="attempt-short-answer-wrap">
            <textarea
              rows={5}
              placeholder="Type your answer here..."
              value={attemptState.answersByQuestionId?.[currentQuestion.id] || ''}
              onChange={(event) => updateSingleValueAnswer(currentQuestion.id, event.target.value)}
            />
          </div>
        )}

        {currentQuestion.type === 'true-false' && (
          <div className="attempt-options-group" role="radiogroup" aria-label="True or False options">
            {currentQuestion.options.map((option) => (
              <label key={option} className="attempt-option-row">
                <input
                  type="radio"
                  name={currentQuestion.id}
                  checked={attemptState.answersByQuestionId?.[currentQuestion.id] === option}
                  onChange={() => updateSingleValueAnswer(currentQuestion.id, option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
      </section>

      <div className="attempt-actions-row">
        <button
          type="button"
          className="attempt-nav-btn"
          onClick={() => updateAttemptState((currentAttempt) => ({
            ...currentAttempt,
            currentQuestionIndex: Math.max(0, currentQuestionIndex - 1),
          }))}
          disabled={currentQuestionIndex === 0}
        >
          Previous Question
        </button>

        <div className="attempt-actions-right">
          {typeof onCancelAttempt === 'function' && (
            <button type="button" className="attempt-cancel-btn" onClick={endAttempt}>
              End Attempt
            </button>
          )}

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              type="button"
              className="attempt-nav-btn primary"
              onClick={() => updateAttemptState((currentAttempt) => ({
                ...currentAttempt,
                currentQuestionIndex: Math.min(totalQuestions - 1, currentQuestionIndex + 1),
              }))}
            >
              Next Question
            </button>
          ) : (
            <button type="button" className="attempt-nav-btn primary" onClick={submitAttempt}>
              Submit Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

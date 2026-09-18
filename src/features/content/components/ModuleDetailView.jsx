/**
 * @file ModuleDetailView.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Module lesson sidebar + lesson content viewer.
 */

import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'

const lessons = [
  {
    id: 'intro-to-computers',
    title: 'Intro to Computers',
    durationLabel: '03:10 / 07:20',
    content: [
      'Computers are programmable machines that process input, perform operations, and produce output.',
      'In this lesson, we focus on the core parts of a computer system and how software instructions control hardware behavior.',
      'By the end, you should be able to explain how data moves from input devices to processing units and then to output devices.',
    ],
  },
  {
    id: 'variables-and-data-types',
    title: 'Variables & Data Types',
    durationLabel: '02:42 / 06:45',
    content: [
      'Variables are named storage locations used to hold information while your program runs.',
      'Data types describe what kind of information a variable can hold, such as numbers, text, or true/false values.',
      'Choosing the right data type helps your code stay predictable and avoids common runtime errors.',
    ],
  },
  {
    id: 'operators',
    title: 'Operators',
    durationLabel: '01:58 / 05:20',
    content: [
      'Operators are symbols that tell the computer to perform actions like addition, comparison, or assignment.',
      'Arithmetic, logical, and comparison operators are used together to build useful program logic.',
      'Understanding operator precedence helps you avoid subtle bugs in complex expressions.',
    ],
  },
  {
    id: 'control-flow',
    title: 'Control Flow',
    durationLabel: '02:31 / 06:10',
    content: [
      'Control flow determines the order in which statements are executed.',
      'Conditional statements such as if/else allow your program to make decisions based on current data.',
      'Well-structured control flow makes code easier to read, test, and maintain.',
    ],
  },
  {
    id: 'loops',
    title: 'Loops',
    durationLabel: '03:04 / 07:05',
    content: [
      'Loops repeat a block of code while a condition is true or for a fixed number of times.',
      'They are useful for processing lists, validating input, and automating repetitive tasks.',
      'Always ensure loop conditions eventually end to prevent infinite loops.',
    ],
  },
  {
    id: 'functions',
    title: 'Functions',
    durationLabel: '02:16 / 06:30',
    content: [
      'Welcome to Lesson 6. In programming, a function is a self-contained block of code that encapsulates a specific task or calculation. You can define a function to perform a certain operation and then call it when you need it.',
      'Functions are fundamental because they help code remain organized, reusable, and easier to debug. Instead of writing the same logic repeatedly, you can create one function and call it many times with different inputs.',
      'A function typically contains three main parts: Declaration, Parameters, and Return Statement.',
    ],
  },
  {
    id: 'arrays-and-lists',
    title: 'Arrays & Lists',
    durationLabel: '02:50 / 06:12',
    content: [
      'Arrays and lists store multiple values in a single structure.',
      'They make it easy to iterate through collections, search values, and apply transformations.',
      'Selecting the right collection type can improve both readability and performance.',
    ],
  },
  {
    id: 'final-project',
    title: 'Final Project',
    durationLabel: '00:30 / 09:40',
    content: [
      'The final project brings all previous lessons together into one practical assignment.',
      'You will plan your program, choose the right data structures, and implement reusable functions.',
      'After completion, review your solution and identify opportunities for refactoring.',
    ],
  },
]

export default function ModuleDetailView() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const [activeLessonIndex, setActiveLessonIndex] = useState(5)
  const [notesText, setNotesText] = useState('')
  const [saveMessage, setSaveMessage] = useState('')

  const moduleKey = moduleId || 'introduction-to-programming'
  const activeLesson = lessons[activeLessonIndex]
  const activeLessonNumber = activeLessonIndex + 1
  const progressPercent = Math.round(((activeLessonIndex + 1) / lessons.length) * 100)
  const notesStorageKey = useMemo(
    () => `digifikile-lesson-note:${moduleKey}:${activeLesson.id}`,
    [moduleKey, activeLesson.id]
  )

  useEffect(() => {
    const savedNote = localStorage.getItem(notesStorageKey) || ''
    setNotesText(savedNote)
    setSaveMessage('')
  }, [notesStorageKey])

  const goToPreviousLesson = () => {
    setActiveLessonIndex((currentIndex) => Math.max(0, currentIndex - 1))
  }

  const goToNextLesson = () => {
    setActiveLessonIndex((currentIndex) => Math.min(lessons.length - 1, currentIndex + 1))
  }

  const saveNotes = () => {
    const trimmedText = notesText.trim()
    if (trimmedText.length === 0) {
      localStorage.removeItem(notesStorageKey)
      setSaveMessage('Note cleared for this lesson.')
      return
    }

    localStorage.setItem(notesStorageKey, notesText)
    setSaveMessage('Note saved for this lesson.')
  }

  const clearNotes = () => {
    setNotesText('')
    localStorage.removeItem(notesStorageKey)
    setSaveMessage('Note cleared for this lesson.')
  }

  return (
    <div className="module-detail-page">
        <button type="button" className="module-detail-back" onClick={() => navigate(ROUTES.MODULES)}>← Back to My Modules</button>

        <div className="module-detail-header-row">
          <h1 className="module-detail-title">
          {moduleId === 'introduction-to-programming' || !moduleId
            ? 'Introduction to Programming'
            : String(moduleId).replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
        </h1>
          <div className="module-detail-progress-wrap">
            <div className="module-detail-progress-bar">
              <span style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="module-detail-progress-label">{progressPercent}% Completed</span>
          </div>
        </div>

        <div className="module-detail-content">
          <aside className="module-detail-sidebar">
            <h2>Course Lessons</h2>
            <ul>
              {lessons.map((lesson, index) => (
                <li key={lesson.id} className={index === activeLessonIndex ? 'active' : ''}>
                  <span className="lesson-number">{index + 1}.</span>
                  <button
                    type="button"
                    className="lesson-item-button"
                    onClick={() => setActiveLessonIndex(index)}
                    aria-current={index === activeLessonIndex ? 'step' : undefined}
                  >
                    {lesson.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <main className="module-detail-main">
            <div className="lesson-header-row">
              <div className="lesson-label">Lesson {activeLessonNumber} — {activeLesson.title}</div>
              <div className="lesson-badge-row">
                <button type="button" className="lesson-play-btn" aria-label="Play lesson">▶</button>
                <span>{activeLesson.durationLabel}</span>
              </div>
            </div>

            <div className="lesson-visual-card lesson-visual-image-card">
              <img
                src="/understanding-computer.png"
                alt="Understanding computer programming functions"
                className="lesson-visual-image"
              />
            </div>

            <div className="lesson-content-block">
              {activeLesson.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="code-block">
              <div className="code-block-header">
                <span>Example</span>
                <button type="button">Copy</button>
              </div>
              <pre>{`function addNumbers(a, b) {
  return a + b;
}

let result = addNumbers(10, 15);
console.log(result);`}</pre>
            </div>

            <div className="additional-resources">
              <h3>ADDITIONAL RESOURCES</h3>
              <div className="resource-grid">
                <div className="resource-pill">
                  <span className="resource-icon">◫</span>
                  <span>Functions Cheat Sheet</span>
                </div>
                <div className="resource-pill">
                  <span className="resource-icon">◫</span>
                  <span>Video Walkthrough</span>
                </div>
              </div>
            </div>

            <div className="lesson-actions">
              <button
                type="button"
                className="lesson-action secondary"
                onClick={goToPreviousLesson}
                disabled={activeLessonIndex === 0}
                aria-label="Go to previous lesson"
              >
                ← Previous
              </button>
              <button
                type="button"
                className="lesson-action secondary"
                onClick={goToNextLesson}
                disabled={activeLessonIndex === lessons.length - 1}
                aria-label="Go to next lesson"
              >
                Next →
              </button>
            </div>

            <section className="lesson-notes-panel" aria-labelledby="lesson-notes-heading">
              <div className="lesson-notes-header">
                <h3 id="lesson-notes-heading">My Notes</h3>
                <span className="lesson-notes-meta">Saved per lesson</span>
              </div>

              <label className="lesson-notes-label" htmlFor="lesson-notes-textarea">
                Capture your personal notes for Lesson {activeLessonNumber}
              </label>
              <textarea
                id="lesson-notes-textarea"
                className="lesson-notes-textarea"
                placeholder="Write key points, reminders, or questions here..."
                value={notesText}
                onChange={(event) => setNotesText(event.target.value)}
              />

              <div className="lesson-notes-actions">
                <button type="button" className="lesson-action primary" onClick={saveNotes}>Save Notes</button>
                <button type="button" className="lesson-action secondary" onClick={clearNotes}>Clear</button>
              </div>

              {saveMessage && <p className="lesson-notes-feedback">{saveMessage}</p>}
            </section>

          </main>
        </div>
      </div>
  )
}

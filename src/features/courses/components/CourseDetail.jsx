/**
 * @file CourseDetail.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * WHAT THIS FILE IS:
 *   CourseDetail.jsx is the courses presentational UI for DigiFikile LMS. It belongs to the courses feature, which covers course discovery, course detail, enrolment, and instructor course management. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   features/courses/components/ keeps UI that belongs only to the courses domain beside that domain. This preserves feature isolation and prevents shared folders from filling with one-off LMS screens.
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
 *   - Do not reach into another feature’s internal folders. A courses button must not directly issue another domain’s HTTP request; coordinate through page composition, a dedicated workflow hook, or approved public feature APIs.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - features/courses/hooks/* — supplies data, status, and callbacks.
 *   - features/courses/index.js — exposes approved components to pages.
 *   - services/* — reached through hooks, never imported directly here.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   This module participates in course discovery, course detail, enrolment, and instructor course management. The .NET API remains authoritative for validation, permissions, persistence, and business rules. Frontend code presents those outcomes, sends DTO-shaped requests through services, and must handle ProblemDetails/validation failures without assuming the browser is trusted.
 *
 * @example
 *   // <CourseDetail data={viewModel} loading={loading} error={error} onRetry={refetch} />
 */

import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { getCourseById } from '../data/courseCatalog'

// Default export: render this component through its owning page/feature; keep its props and UI responsibility focused.
export default function CourseDetail({ courseId }) {
  const navigate = useNavigate()
  const backButtonRef = useRef(null)
  const course = getCourseById(courseId)

  useEffect(() => {
    backButtonRef.current?.focus()
  }, [courseId])

  if (!course) {
    return (
      <section style={{ background: '#fff', border: '1px solid #e7edf5', borderRadius: '14px', padding: '1rem' }}>
        <h2 style={{ margin: 0, color: '#172232' }}>Course not found</h2>
        <p style={{ color: '#58677a' }}>The selected course is unavailable in the catalog right now.</p>
        <button
          type="button"
          onClick={() => navigate(ROUTES.COURSES)}
          style={{ border: 'none', borderRadius: '10px', background: '#1d4ed8', color: '#fff', padding: '0.65rem 0.95rem', fontWeight: 700, cursor: 'pointer' }}
        >
          Back to Catalog
        </button>
      </section>
    )
  }

  return (
    <section style={{ background: '#fff', border: '1px solid #e7edf5', borderRadius: '16px', padding: '1.2rem', boxShadow: '0 8px 20px rgba(16, 24, 40, 0.04)' }}>
      <button
        ref={backButtonRef}
        type="button"
        onClick={() => navigate(ROUTES.COURSES)}
        style={{ border: '1px solid #d7e3f4', borderRadius: '10px', background: '#f6f9ff', color: '#214a88', padding: '0.52rem 0.8rem', fontWeight: 700, cursor: 'pointer', marginBottom: '0.9rem' }}
      >
        Back to Catalog
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: 0, color: '#446188', fontWeight: 700, fontSize: '0.8rem' }}>{course.category}</p>
              <h1 style={{ margin: '0.25rem 0 0.4rem', color: '#172232', fontSize: '1.7rem' }}>{course.title}</h1>
              <p style={{ margin: 0, color: '#5a6b7d' }}>{course.difficulty} · {course.duration} · ⭐ {course.rating}</p>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <h2 style={{ margin: '0 0 0.5rem', color: '#172232', fontSize: '1.05rem' }}>Course description</h2>
            <p style={{ margin: 0, color: '#55667b', lineHeight: 1.65 }}>{course.overview}</p>
          </div>

          <div style={{ marginTop: '0.95rem' }}>
            <h3 style={{ margin: '0 0 0.5rem', color: '#172232', fontSize: '0.98rem' }}>Learning outcomes</h3>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#3f5066', lineHeight: 1.6 }}>
              {course.learningOutcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: '1.1rem', border: '1px solid #e4edf8', borderRadius: '12px', background: '#f8fbff', padding: '0.9rem' }}>
            <h3 style={{ margin: '0 0 0.6rem', color: '#172232', fontSize: '0.98rem' }}>Instructor details</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              {course.instructor.photo && (
                <img
                  src={course.instructor.photo}
                  alt={`${course.instructor.name} profile`}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #d8e5f5' }}
                />
              )}
              <div>
                <p style={{ margin: 0, color: '#172232', fontWeight: 700 }}>{course.instructor.name}</p>
                <p style={{ margin: '0.25rem 0 0', color: '#58677a', lineHeight: 1.55 }}>{course.instructor.bio}</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.1rem' }}>
            <div style={{ border: '1px solid #e7edf5', borderRadius: '12px', padding: '0.85rem' }}>
              <h3 style={{ margin: '0 0 0.5rem', color: '#172232', fontSize: '0.98rem' }}>Modules</h3>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#3f5066', lineHeight: 1.6 }}>
                {course.modules.map((module) => (
                  <li key={module}>{module}</li>
                ))}
              </ul>
            </div>

            <div style={{ border: '1px solid #e7edf5', borderRadius: '12px', padding: '0.85rem' }}>
              <h3 style={{ margin: '0 0 0.5rem', color: '#172232', fontSize: '0.98rem' }}>Prerequisites</h3>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#3f5066', lineHeight: 1.6 }}>
                {course.prerequisites.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside style={{ position: 'sticky', top: '1rem' }}>
          <div style={{ border: '1px solid #dbe8f8', borderRadius: '12px', background: '#f7fbff', padding: '0.9rem' }}>
            <h3 style={{ margin: '0 0 0.55rem', color: '#172232', fontSize: '1rem' }}>Enrollment</h3>
            <p style={{ margin: '0 0 0.7rem', color: '#53657d', lineHeight: 1.5 }}>
              Start this course and track your progress through all modules.
            </p>
            <div style={{ display: 'grid', gap: '0.45rem', color: '#42566d', fontSize: '0.88rem', marginBottom: '0.85rem' }}>
              <div><strong>Duration:</strong> {course.duration}</div>
              <div><strong>Modules:</strong> {course.modules.length}</div>
              <div><strong>Prerequisites:</strong> {course.prerequisites.length}</div>
            </div>
            <button
              type="button"
              style={{ width: '100%', border: 'none', borderRadius: '10px', background: course.enrolled ? '#0f172a' : '#1d4ed8', color: '#fff', padding: '0.75rem 1rem', fontWeight: 700, cursor: 'pointer' }}
            >
              {course.enrolled ? 'Continue Learning' : 'Enroll Now'}
            </button>
          </div>
        </aside>
      </div>
    </section>
  )
}

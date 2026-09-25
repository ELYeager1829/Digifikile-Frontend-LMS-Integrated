/**
 * @file ReportsDashboard.jsx — Reports overview using the existing demonstration snapshot.
 */
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../../i18n/LanguageContext'
import '../styles/reports-dashboard.css'
import Button from '../../../components/ui/Button'

const metrics = [
  { labelKey: 'averageGpa', value: '3.42', change: '+0.1', tone: 'blue' },
  { labelKey: 'passRate', value: '88%', change: '+2%', tone: 'dark' },
  { labelKey: 'activeStudents', value: '12,450', change: '', tone: 'dark' },
  { labelKey: 'atRiskStudents', value: '420', change: '+15', tone: 'orange' },
]

const topCourses = [
  { code: 'CS101', name: 'Intro to Computer Science', faculty: 'Computer Science', enrollment: '850', grade: 'A- (3.7)', tone: 'good' },
  { code: 'MGT201', name: 'Organizational Behavior', faculty: 'Business', enrollment: '620', grade: 'B+ (3.4)', tone: 'good' },
  { code: 'ENG105', name: 'English Composition', faculty: 'Arts & Humanities', enrollment: '1,120', grade: 'B (3.1)', tone: 'neutral' },
]
const defaults = { type: 'academicPerformance', range: 'last30Days', faculty: '' }

function ReportDialog({ title, onClose, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    const previousFocus = document.activeElement
    dialog.showModal()
    return () => { dialog.close(); if (previousFocus?.isConnected) previousFocus.focus() }
  }, [])
  return <dialog ref={ref} className="reports-dashboard-dialog" aria-labelledby="reports-dialog-title" onCancel={event => { event.preventDefault(); onClose() }}>
    <h2 id="reports-dialog-title">{title}</h2>{children}
    <div className="reports-dialog-actions"><button type="button" onClick={onClose}>Close</button></div>
  </dialog>
}

export default function ReportsDashboard() {
  const { t } = useLanguage()
  const [filters, setFilters] = useState(defaults)
  const [generated, setGenerated] = useState({ ...defaults, date: new Date() })
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [dialog, setDialog] = useState(null)
  const [copying, setCopying] = useState(false)
  const rows = topCourses.filter(course => !generated.faculty || course.faculty === generated.faculty)
  // The existing snapshot only supplies institution-wide KPIs and has no dated records.
  const displayedMetrics = generated.faculty ? metrics.map(metric => ({ ...metric, value: '—', change: '' })) : metrics
  const title = t('reports', 'overview')
  const summary = `${t('reports', 'generated')}: ${generated.date.toLocaleDateString()} • ${t('reports', generated.range)} • ${generated.faculty || t('reports', 'allFaculties')}`
  const reportText = [title, summary, 'Sample report — demonstration data; date ranges do not change this undated snapshot.',
    ...displayedMetrics.map(metric => `${t('reports', metric.labelKey)}: ${metric.value}`),
    ...rows.map(course => `${course.code}: ${course.name} | ${course.faculty} | ${course.enrollment} enrolled | ${course.grade}`)].join('\n')

  function generate(event) {
    event.preventDefault()
    setGenerated({ ...filters, date: new Date() })
    setNotice('Sample report generated.')
    setError('')
  }

  function download() {
    setError('')
    try {
      const data = [
        [title], [summary], ['Sample data; date ranges do not change this undated snapshot.'],
        ...displayedMetrics.map(metric => [t('reports', metric.labelKey), metric.value]),
        [], ['Course Code & Name', 'Faculty', 'Enrollment', 'Avg Grade'],
        ...rows.map(course => [`${course.code}: ${course.name}`, course.faculty, course.enrollment.replaceAll(',', ''), course.grade]),
      ]
      const csv = data.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\r\n')
      const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }))
      const link = document.createElement('a')
      link.href = url
      link.download = 'academic-performance-report.csv'
      document.body.appendChild(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
      setNotice('Report download started.')
    } catch (err) { setError(err.message || 'Unable to download the report.') }
  }

  async function copyAnnouncement() {
    setCopying(true)
    setError('')
    try {
      await navigator.clipboard.writeText(reportText)
      setNotice('Announcement text copied. Paste it into a new announcement to review and publish.')
      setDialog(null)
    } catch {
      setError('Unable to copy automatically. Select and copy the announcement text below.')
    } finally { setCopying(false) }
  }

  return (
    <div className="reports-page reports-dashboard">
      <h1>{t('reports', 'title')}</h1>
      <p className="reports-intro">{t('reports', 'intro')}</p>
      <form className="reports-filter-card" onSubmit={generate}>
        <div className="reports-filter-grid">
          <label>{t('reports', 'reportType')}<select value={filters.type} onChange={event => setFilters({ ...filters, type: event.target.value })}>
            <option value="academicPerformance">{t('reports', 'academicPerformance')}</option>
            <option value="enrollmentSummary" disabled>{t('reports', 'enrollmentSummary')} (unavailable)</option>
            <option value="courseCompletion" disabled>{t('reports', 'courseCompletion')} (unavailable)</option>
          </select></label>
          <label>{t('reports', 'dateRange')}<select value={filters.range} onChange={event => setFilters({ ...filters, range: event.target.value })}>
            {['last30Days', 'last90Days', 'thisYear'].map(key => <option key={key} value={key}>{t('reports', key)}</option>)}
          </select></label>
          <label>{t('reports', 'faculty')}<select value={filters.faculty} onChange={event => setFilters({ ...filters, faculty: event.target.value })}>
            <option value="">{t('reports', 'allFaculties')}</option>
            {[...new Set(topCourses.map(course => course.faculty))].map(faculty => <option key={faculty}>{faculty}</option>)}
          </select></label>
        </div>
        <div className="reports-filter-actions">
          <button type="button" className="reports-clear-btn" onClick={() => { setFilters(defaults); setNotice('Filters cleared. Generate a report to apply them.') }}>{t('reports', 'clearFilters')}</button>
          <button type="submit" className="reports-generate-btn">{t('reports', 'generateReport')}</button>
        </div>
      </form>
      {notice && <p className="reports-feedback" role="status">{notice}</p>}
      {error && !dialog && <p className="reports-error" role="alert">{error}</p>}
      <section className="reports-result-card">
        <div className="reports-result-heading">
          <div><h2>{title}</h2><p>{summary}</p></div>
          <div className="reports-result-actions">
            <button type="button" onClick={() => { setError(''); setDialog({ type: 'share' }) }}>{t('reports', 'shareAnnouncement')}</button>
            <Button type="button" variant="secondary" onClick={download}>{t('reports', 'downloadReport')}</Button>
          </div>
        </div>
        <p className="reports-sample-note">Sample data. Date ranges do not change this undated snapshot.{generated.faculty && ' Faculty-level KPIs are not available.'}</p>
        <div className="reports-metrics">{displayedMetrics.map(metric => <div className={`report-metric ${metric.tone}`} key={metric.labelKey}>
          <span>{t('reports', metric.labelKey)}</span><strong>{metric.value}</strong>{metric.change && <small>{metric.change}</small>}
        </div>)}</div>
        <section className="top-courses-wrap">
          <h3 id="reports-courses-title">{t('reports', 'topPerformingCourses')}</h3>
          <div className="reports-table-scroll" tabIndex="0" role="region" aria-labelledby="reports-courses-title">
            <table className="reports-courses-table">
              <thead><tr>{['Course Code & Name', 'Faculty', 'Enrollment', 'Avg Grade', 'Actions'].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
              <tbody>{rows.map(course => <tr key={course.code}>
                <td><strong>{course.code}: {course.name}</strong></td><td>{course.faculty}</td><td>{course.enrollment}</td>
                <td><b className={course.tone}>{course.grade}</b></td>
                <td><button type="button" aria-label={`View ${course.name}`} onClick={() => setDialog({ type: 'course', course })}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
                </button></td>
              </tr>)}</tbody>
            </table>
          </div>
        </section>
      </section>
      {dialog && <ReportDialog title={dialog.type === 'share' ? t('reports', 'shareAnnouncement') : dialog.course.name} onClose={() => setDialog(null)}>
        {dialog.type === 'share' ? <>
          <p>Copy this sample report as an announcement draft. Nothing is published automatically.</p>
          <textarea aria-label="Announcement draft" value={reportText} readOnly rows="9" />
          {error && <p className="reports-error" role="alert">{error}</p>}
          <button type="button" disabled={copying} onClick={copyAnnouncement}>{copying ? 'Copying...' : 'Copy announcement text'}</button>
        </> : <dl>{[['Course code', dialog.course.code], ['Faculty', dialog.course.faculty], ['Enrollment', dialog.course.enrollment], ['Average grade', dialog.course.grade]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
      </ReportDialog>}
    </div>
  )
}

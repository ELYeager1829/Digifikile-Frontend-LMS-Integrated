import { useMemo, useState } from 'react'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/ui/DataTable'
import EmptyState from '../../../components/feedback/EmptyState'
import Loader from '../../../components/feedback/Loader'
import AppLayout from '../../../components/layout/AppLayout'
import {
  courseReportCategories,
  courseReportData,
  courseReportInstructors,
  courseReportScoreDistribution,
  courseReportTrend,
} from '../data/courseReportData'

const initialFilters = {
  course: 'all',
  category: 'all',
  instructor: 'all',
  startDate: '2026-04-01',
  endDate: '2026-09-10',
}

const formatNumber = (value) => new Intl.NumberFormat('en-ZA').format(value)

function getMetrics(rows) {
  const enrolments = rows.reduce((sum, row) => sum + row.enrolments, 0)
  if (!rows.length) return { enrolments: 0, completionRate: 0, averageScore: 0, engagement: 0, dropoutRate: 0 }
  const weightedAverage = (key) => Math.round(rows.reduce((sum, row) => sum + row[key] * row.enrolments, 0) / enrolments)
  return {
    enrolments,
    completionRate: weightedAverage('completionRate'),
    averageScore: weightedAverage('averageScore'),
    engagement: weightedAverage('engagement'),
    dropoutRate: weightedAverage('dropoutRate'),
  }
}

function TrendChart({ rows }) {
  const maxValue = Math.max(...rows.map((row) => row.enrolments), 1)
  return (
    <div className="course-report-chart" aria-label="Enrollment and completion chart">
      <div className="chart-legend"><span className="legend-item"><i className="legend-swatch enrolments" /> Enrolments</span><span className="legend-item"><i className="legend-swatch completions" /> Completions</span></div>
      <div className="bar-chart">
        {rows.map((row) => (
          <div className="bar-group" key={row.month}>
            <div className="bar-pair">
              <span className="bar enrolments" style={{ height: `${(row.enrolments / maxValue) * 100}%` }} title={`${row.enrolments} enrolments`} />
              <span className="bar completions" style={{ height: `${(row.completions / maxValue) * 100}%` }} title={`${row.completions} completions`} />
            </div>
            <span className="chart-label">{row.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScoreChart() {
  const maxValue = Math.max(...courseReportScoreDistribution.map((item) => item.value))
  return (
    <div className="course-report-chart score-chart" aria-label="Assessment score distribution chart">
      {courseReportScoreDistribution.map((item) => (
        <div className="score-row" key={item.label}>
          <span>{item.label}</span>
          <div className="score-track"><span style={{ width: `${(item.value / maxValue) * 100}%` }} /></div>
          <strong>{item.value}%</strong>
        </div>
      ))}
    </div>
  )
}

function EngagementChart({ rows }) {
  const points = rows.map((row, index) => `${index * 20}%,${100 - row.engagement}%`).join(' ')
  return (
    <div className="course-report-chart line-chart" aria-label="Learner engagement chart">
      <div className="line-chart-grid"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Engagement rises from April to September">
        <polyline points={points} fill="none" stroke="var(--report-blue)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        {rows.map((row, index) => <circle key={row.month} cx={`${index * 20}`} cy={`${100 - row.engagement}`} r="2.2" fill="var(--report-blue)" vectorEffect="non-scaling-stroke" />)}
      </svg>
      <div className="line-chart-labels">{rows.map((row) => <span key={row.month}>{row.month}</span>)}</div>
    </div>
  )
}

function ReportFilters({ filters, onChange, onGenerate, loading }) {
  const update = (key) => (event) => onChange({ ...filters, [key]: event.target.value })
  return (
    <section className="course-report-filter-panel" aria-labelledby="report-filters-title">
      <div className="course-report-section-heading"><div><h2 id="report-filters-title">Report configuration</h2><p>Choose the course scope and reporting period.</p></div><span className="filter-status">Mock data preview</span></div>
      <div className="course-report-filter-grid">
        <label>Course<select value={filters.course} onChange={update('course')}><option value="all">All Courses</option>{courseReportData.map((row) => <option value={row.id} key={row.id}>{row.course}</option>)}</select></label>
        <label>Category<select value={filters.category} onChange={update('category')}><option value="all">All Categories</option>{courseReportCategories.map((category) => <option value={category} key={category}>{category}</option>)}</select></label>
        <label>Instructor<select value={filters.instructor} onChange={update('instructor')}><option value="all">All Instructors</option>{courseReportInstructors.map((instructor) => <option value={instructor} key={instructor}>{instructor}</option>)}</select></label>
        <label>Start date<input type="date" value={filters.startDate} onChange={update('startDate')} /></label>
        <label>End date<input type="date" value={filters.endDate} onChange={update('endDate')} /></label>
      </div>
      <div className="course-report-filter-actions"><span>Reports use the selected date range when connected to the LMS API.</span><Button onClick={onGenerate} loading={loading}>{loading ? 'Generating...' : 'Generate Report'}</Button></div>
    </section>
  )
}

function ReportChartPanel({ title, description, children, className = '' }) {
  return <section className={`course-report-chart-panel ${className}`}><div className="course-report-section-heading"><div><h2>{title}</h2><p>{description}</p></div></div>{children}</section>
}

function exportCsv(rows) {
  const headings = ['Course Name', 'Category', 'Instructor', 'Enrolments', 'Completion Rate', 'Average Score', 'Engagement', 'Dropout Rate']
  const lines = rows.map((row) => [row.course, row.category, row.instructor, row.enrolments, `${row.completionRate}%`, `${row.averageScore}%`, `${row.engagement}%`, `${row.dropoutRate}%`].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
  const blob = new Blob([[headings.join(','), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'course-report.csv'
  link.click()
  URL.revokeObjectURL(link.href)
}

const tableColumns = [
  { key: 'course', header: 'Course Name' },
  { key: 'category', header: 'Category' },
  { key: 'instructor', header: 'Instructor' },
  { key: 'enrolments', header: 'Enrolments', render: (row) => formatNumber(row.enrolments) },
  { key: 'completionRate', header: 'Completion', render: (row) => `${row.completionRate}%` },
  { key: 'averageScore', header: 'Avg. score', render: (row) => `${row.averageScore}%` },
  { key: 'engagement', header: 'Engagement', render: (row) => `${row.engagement}%` },
  { key: 'dropoutRate', header: 'Dropout', render: (row) => <span className={row.dropoutRate > 12 ? 'report-risk-value' : ''}>{row.dropoutRate}%</span> },
]

function CourseReportsContent() {
  const [filters, setFilters] = useState(initialFilters)
  const [reportFilters, setReportFilters] = useState(initialFilters)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [loading, setLoading] = useState(false)

  const filteredRows = useMemo(() => courseReportData.filter((row) => (
    (reportFilters.course === 'all' || row.id === reportFilters.course)
    && (reportFilters.category === 'all' || row.category === reportFilters.category)
    && (reportFilters.instructor === 'all' || row.instructor === reportFilters.instructor)
  )), [reportFilters])
  const metrics = useMemo(() => getMetrics(filteredRows), [filteredRows])
  const chartTrend = useMemo(() => {
    const scopeRatio = filteredRows.length / courseReportData.length
    return courseReportTrend.map((row) => ({
      ...row,
      enrolments: Math.max(1, Math.round(row.enrolments * scopeRatio)),
      completions: Math.max(1, Math.round(row.completions * scopeRatio)),
      engagement: Math.max(0, Math.min(100, row.engagement + metrics.engagement - 75)),
      dropout: Math.max(1, Math.round(row.dropout + metrics.dropoutRate - 10)),
    }))
  }, [filteredRows, metrics])

  const generateReport = () => {
    setLoading(true)
    window.setTimeout(() => {
      setReportFilters(filters)
      setHasGenerated(true)
      setLoading(false)
    }, 450)
  }

  return (
    <AppLayout section="Reports">
      <div className="course-reports-page">
        <header className="course-report-page-header"><div><p className="course-report-eyebrow">Reports / Course analytics</p><h1>Course Reports / Analytics</h1><p>Analyse course performance, engagement, completion, and assessment results.</p></div><div className="course-report-header-mark">CR<span>01</span></div></header>
        <ReportFilters filters={filters} onChange={setFilters} onGenerate={generateReport} loading={loading} />
        {!hasGenerated && !loading && <div className="course-report-initial-state"><div className="initial-state-mark">+</div><h2>Build your course report</h2><p>Select filters above, then generate a report to explore course performance and learner trends.</p></div>}
        {loading && <div className="course-report-loading"><Loader label="Generating course report..." /></div>}
        {hasGenerated && !loading && filteredRows.length === 0 && <div className="course-report-empty"><EmptyState title="No course data available for the selected filters." description="Change one or more filters and generate the report again." /></div>}
        {hasGenerated && !loading && filteredRows.length > 0 && <>
          <section className="course-report-summary" aria-label="Course report summary">
            <div className="course-report-summary-heading"><div><h2>Performance snapshot</h2><p>{filteredRows.length} course{filteredRows.length === 1 ? '' : 's'} in the selected scope</p></div><div className="course-report-export-actions"><Button variant="secondary" onClick={() => exportCsv(filteredRows)}>Export Excel</Button><Button variant="secondary" onClick={() => window.print()}>Export PDF</Button></div></div>
            <div className="course-report-metrics">
              <div><span>Total Enrolments</span><strong>{formatNumber(metrics.enrolments)}</strong><small>Selected courses</small></div>
              <div><span>Completion Rate</span><strong>{metrics.completionRate}%</strong><small>Weighted by enrolment</small></div>
              <div><span>Average Score</span><strong>{metrics.averageScore}%</strong><small>Across assessments</small></div>
              <div><span>Engagement</span><strong>{metrics.engagement}%</strong><small>Active learner rate</small></div>
              <div><span>Dropout / Inactivity</span><strong>{metrics.dropoutRate}%</strong><small>Needs attention below 10%</small></div>
            </div>
          </section>
          <div className="course-report-chart-grid">
            <ReportChartPanel title="Enrollment & completion" description="Learner volume compared with completed learners."><TrendChart rows={chartTrend} /></ReportChartPanel>
            <ReportChartPanel title="Assessment performance" description="Distribution of average assessment scores."><ScoreChart /></ReportChartPanel>
            <ReportChartPanel title="Learner engagement" description="Active learner percentage over the reporting period."><EngagementChart rows={chartTrend} /></ReportChartPanel>
            <ReportChartPanel title="Completion / dropout trends" description="Completion improves as inactivity trends down."><div className="trend-summary"><div><span className="trend-dot completion" />Completion <strong>{chartTrend.at(-1).completions}</strong></div><div><span className="trend-dot dropout" />Dropout <strong>{chartTrend.at(-1).dropout}%</strong></div></div><div className="dropout-bars">{chartTrend.map((row) => <div key={row.month}><span style={{ height: `${row.dropout * 7}%` }} /><small>{row.month}</small></div>)}</div></ReportChartPanel>
          </div>
          <section className="course-report-table-section"><div className="course-report-section-heading"><div><h2>Course performance</h2><p>Compare outcomes across the selected courses.</p></div></div><DataTable columns={tableColumns} rows={filteredRows} searchKeys={['course', 'category', 'instructor']} emptyLabel="No course data available for the selected filters." /></section>
        </>}
      </div>
    </AppLayout>
  )
}

export default CourseReportsContent

import { useMemo, useState } from 'react'
import {
  trainingProviderDashboardMetrics,
  trainingProviderQueue,
  trainingProviderSupport,
  trainingProviderIntegrity,
  trainingProviderAnnouncements,
  trainingProviderTrends,
} from '../../../data/mockData'

const formatLastUpdated = () =>
  new Intl.DateTimeFormat('en-ZA', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date())

export default function TrainingProviderDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState(formatLastUpdated())
  const [metrics, setMetrics] = useState(trainingProviderDashboardMetrics)

  const queueRows = useMemo(() => trainingProviderQueue, [])
  const supportRows = useMemo(() => trainingProviderSupport, [])
  const integrityRows = useMemo(() => trainingProviderIntegrity, [])
  const announcements = useMemo(() => trainingProviderAnnouncements, [])
  const trendItems = useMemo(() => trainingProviderTrends, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setError('')

    window.setTimeout(() => {
      setMetrics((current) => current.map((metric) => ({
        ...metric,
        delta: metric.delta.includes('Today') ? metric.delta : `${metric.delta} • refreshed`,
      })))
      setLastUpdated(formatLastUpdated())
      setIsRefreshing(false)
    }, 500)
  }

  const emptyState = metrics.length === 0 || queueRows.length === 0

  if (error) {
    return (
      <div className="training-provider-dashboard-state">
        <div className="training-provider-dashboard-empty">
          <h2>Dashboard unavailable</h2>
          <p>{error}</p>
          <button type="button" className="secondary-btn" onClick={() => setError('')}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="training-provider-dashboard-page">
      <div className="training-provider-header-row">
        <div>
          <h1>Welcome back, L. Sithole</h1>
          <p>Senior Manager</p>
        </div>

        <div className="training-provider-header-actions">
          <button type="button" className="training-provider-ghost-btn" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button type="button" className="training-provider-primary-btn">Add Announcement</button>
        </div>
      </div>

      <div className="training-provider-meta-bar">
        <span className="training-provider-meta-pill">Last updated {lastUpdated}</span>
      </div>

      {!emptyState ? (
        <>
          <section className="training-provider-kpi-grid" aria-label="Training provider summary metrics">
            {metrics.map((metric) => (
              <article key={metric.id} className={`training-provider-kpi-card ${metric.tone}`}>
                <div className="training-provider-kpi-head">
                  <span>{metric.label}</span>
                  <span className="training-provider-kpi-icon" aria-hidden="true">{metric.icon}</span>
                </div>
                <strong>{metric.value}</strong>
                <small>{metric.delta}</small>
              </article>
            ))}
          </section>

          <section className="training-provider-main-grid">
            <div className="training-provider-panel training-provider-panel-lg">
              <div className="training-provider-panel-header">
                <div>
                  <h2>Grading Queue</h2>
                  <p>Assessments awaiting review</p>
                </div>
                <button type="button" className="training-provider-link-btn">View all</button>
              </div>

              <div className="training-provider-table-wrap">
                <table className="training-provider-table">
                  <thead>
                    <tr>
                      <th>Assessment Name</th>
                      <th>Module</th>
                      <th>Submissions</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queueRows.map((row) => (
                      <tr key={row.id}>
                        <td>{row.name}</td>
                        <td>{row.module}</td>
                        <td>{row.submissions}</td>
                        <td>
                          <span className={`training-provider-status ${row.statusClass}`}>{row.status}</span>
                        </td>
                        <td><button type="button" className="training-provider-table-btn">View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="training-provider-panel">
              <div className="training-provider-panel-header">
                <div>
                  <h2>Learners Needing Support</h2>
                  <p>Interventions required</p>
                </div>
                <button type="button" className="training-provider-link-btn">Review</button>
              </div>

              <div className="training-provider-support-list">
                {supportRows.map((learner) => (
                  <div key={learner.id} className="training-provider-support-item">
                    <div className="training-provider-avatar" aria-hidden="true">{learner.initials}</div>
                    <div className="training-provider-support-copy">
                      <strong>{learner.name}</strong>
                      <span>{learner.reason}</span>
                      <small>{learner.course}</small>
                    </div>
                    <span className={`training-provider-status ${learner.statusClass}`}>{learner.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="training-provider-lower-grid">
            <div className="training-provider-panel">
              <div className="training-provider-panel-header">
                <div>
                  <h2>Content Protection Integrity</h2>
                  <p>Compliance coverage</p>
                </div>
                <button type="button" className="training-provider-link-btn">View report</button>
              </div>

              <div className="training-provider-integrity-list">
                {integrityRows.map((item) => (
                  <div key={item.label} className="training-provider-integrity-row">
                    <div className="training-provider-integrity-copy">
                      <span>{item.label}</span>
                      <small>{item.subtitle}</small>
                    </div>
                    <div className="training-provider-progress-wrap" aria-label={`${item.value}%`}>
                      <div className="training-provider-progress-bar" style={{ width: `${item.value}%` }} />
                    </div>
                    <strong>{item.value}%</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="training-provider-panel">
              <div className="training-provider-panel-header">
                <div>
                  <h2>Recent Announcements</h2>
                  <p>Updates for your organisation</p>
                </div>
                <button type="button" className="training-provider-link-btn">See all</button>
              </div>

              <div className="training-provider-announcement-list">
                {announcements.map((notice) => (
                  <div key={notice.id} className="training-provider-announcement-item">
                    <div className="training-provider-announcement-tag">{notice.tag}</div>
                    <div>
                      <strong>{notice.title}</strong>
                      <p>{notice.summary}</p>
                    </div>
                    <span>{notice.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="training-provider-panel training-provider-trend-panel">
            <div className="training-provider-panel-header">
              <div>
                <h2>Training Trends</h2>
                <p>Across the last 6 months</p>
              </div>
              <button type="button" className="training-provider-link-btn">Insights</button>
            </div>

            <div className="training-provider-trend-chart-wrap" aria-label="Training trend chart">
              <svg viewBox="0 0 640 200" className="training-provider-trend-chart" role="img" aria-label="Learner activity and completion trend chart">
                <defs>
                  <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#5ea1ff" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#5ea1ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <g>
                  {[0, 1, 2, 3, 4].map((row) => (
                    <line key={row} x1="30" x2="610" y1={30 + row * 38} y2={30 + row * 38} stroke="#e5ebf5" strokeWidth="1" />
                  ))}
                </g>
                <path d="M30 150 C90 130, 120 110, 160 120 S260 80, 300 90 S390 50, 430 64 S500 42, 610 35 L610 180 L30 180 Z" fill="url(#trend-fill)" opacity="0.7" />
                <path d="M30 150 C90 130, 120 110, 160 120 S260 80, 300 90 S390 50, 430 64 S500 42, 610 35" fill="none" stroke="#2d6ef7" strokeWidth="3" strokeLinecap="round" />
                <path d="M30 160 C90 158, 120 145, 160 138 S260 118, 300 120 S390 94, 430 101 S500 88, 610 82" fill="none" stroke="#2bb980" strokeWidth="3" strokeLinecap="round" />
                {trendItems.map((item, index) => (
                  <g key={item.month}>
                    <circle cx={40 + index * 110} cy={item.activityY} r="4" fill="#2d6ef7" />
                    <circle cx={40 + index * 110} cy={item.completionY} r="4" fill="#2bb980" />
                    <text x={40 + index * 110} y="195" textAnchor="middle" fontSize="10" fill="#7d8aa2">{item.month}</text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="training-provider-trend-legend">
              <span><i className="trend-swatch blue" /> Learner activity</span>
              <span><i className="trend-swatch green" /> Completion rate</span>
            </div>
          </section>
        </>
      ) : (
        <div className="training-provider-dashboard-empty">
          <h2>No training provider dashboard data available</h2>
          <p>There is no data to display yet. Refresh later or check your access permissions.</p>
          <button type="button" className="secondary-btn" onClick={handleRefresh}>Refresh</button>
        </div>
      )}
    </div>
  )
}

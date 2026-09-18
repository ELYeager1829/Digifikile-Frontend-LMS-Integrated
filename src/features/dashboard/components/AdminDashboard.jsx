/**
 * @file AdminDashboard.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Admin academic-structure overview (no AppLayout).
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recentActivity } from '../../../data/mockData';
import { DepartmentIcon, TrainingProviderIcon, CourseIcon, ModuleIcon } from '../../../components/ui/Icons';
import { useLanguage } from '../../../i18n/LanguageContext'
import { ROUTES } from '../../../constants/routes'
import { fetchCourses } from '../../../services/courseService'

const BASE_OVERVIEW_ITEMS = [
  { labelKey: 'departments', value: '12', delta: '+1 this year', icon: DepartmentIcon, tone: 'blue' },
  { labelKey: 'faculties', value: '8', delta: 'Stable', icon: TrainingProviderIcon, tone: 'gold' },
  { labelKey: 'courses', value: '24', delta: '+3 new', icon: CourseIcon, tone: 'violet' },
  { labelKey: 'modules', value: '86', delta: '+12 active', icon: ModuleIcon, tone: 'teal' },
];

function TrendIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 10" focusable="false">
      <path d="M1 8.5 5.25 4.25l2.5 2.5L14.5 1" />
      <path d="M10.5 1h4v4" />
    </svg>
  );
}

function csvCell(value) {
  return `"${String(value).replace(/^[=+@-]/, "'$&").replaceAll('"', '""')}"`
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [courseCount, setCourseCount] = useState(null);

  useEffect(() => {
    let active = true
    if (localStorage.getItem('digifikile-role') !== 'seta-admin') return () => { active = false }
    fetchCourses(1, 200)
      .then((result) => {
        if (!active) return
        const items = Array.isArray(result) ? result : result?.items || []
        setCourseCount(Number.isFinite(result?.totalCount) ? result.totalCount : items.length)
      })
      .catch(() => { if (active) setCourseCount(null) })
    return () => { active = false }
  }, [])

  const overviewItems = useMemo(() => BASE_OVERVIEW_ITEMS.map((item) =>
    item.labelKey === 'courses' && courseCount != null ? { ...item, value: String(courseCount), delta: 'Backend total' } : item
  ), [courseCount]);

  const handleExportReport = () => {
    const rows = [
      ['DigiFikile LMS Dashboard Report'],
      ['Generated', new Date().toLocaleString()],
      [],
      ['Academic Structure', 'Total', 'Change'],
      ...overviewItems.map((item) => [
        t('dashboard', `overviewItems.${item.labelKey}`),
        item.value,
        item.delta,
      ]),
      ['Active Lectures', '150', ''],
      [],
      ['Enrollment Requests', 'Total'],
      [t('dashboard', 'requests.pendingApproval'), '42'],
      [t('dashboard', 'requests.approvedToday'), '18'],
      [t('dashboard', 'requests.rejected'), '3'],
      [],
      ['Recent Activity', 'Details', 'When'],
      ...recentActivity.map((activity) => [
        activity.action,
        `${activity.actor} ${activity.action} ${activity.target}.`,
        activity.time,
      ]),
    ]
    const csv = `\uFEFF${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}`
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')

    link.href = url
    link.download = 'digifikile-dashboard-report.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <div className="admin-dashboard-page">
        <div className="admin-dashboard-heading">
          <div>
            <p className="admin-eyebrow">{t('dashboard', 'administration')}</p>
            <h1>{t('dashboard', 'adminOverview')}</h1>
            <p>{t('dashboard', 'adminSubtitle')}</p>
          </div>
          <div className="admin-heading-actions">
            <button type="button" className="admin-outline-btn" onClick={handleExportReport}>
              <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              </svg>
              {t('dashboard', 'exportReport')}
            </button>
          </div>
        </div>

        <div className="admin-dashboard-grid">
          <main>
            <div className="admin-overview-grid">
              {overviewItems.map((item) => {
                const Icon = item.icon;
                const label = t('dashboard', `overviewItems.${item.labelKey}`)
                return (
                  <article
                    className={`admin-overview-card ${item.tone}${['departments', 'courses'].includes(item.labelKey) ? ' is-clickable' : ''}`}
                    key={item.labelKey}
                    onClick={() => {
                      if (item.labelKey === 'departments') navigate(ROUTES.DEPARTMENTS);
                      if (item.labelKey === 'courses') navigate(ROUTES.COURSE_ADD);
                    }}
                    onKeyDown={(event) => {
                      if (['departments', 'courses'].includes(item.labelKey) && (event.key === 'Enter' || event.key === ' ')) {
                        event.preventDefault();
                        navigate(item.labelKey === 'courses' ? ROUTES.COURSE_ADD : ROUTES.DEPARTMENTS);
                      }
                    }}
                    role={['departments', 'courses'].includes(item.labelKey) ? 'button' : undefined}
                    tabIndex={['departments', 'courses'].includes(item.labelKey) ? 0 : undefined}
                  >
                    <div className="admin-overview-card-header"><span>{label}</span><Icon size={34} color="currentColor" /></div>
                    <strong>{item.value}</strong>
                    <small><TrendIcon />{item.delta}</small>
                  </article>
                );
              })}
            </div>

            <section className="admin-structure-panel">
              <div className="admin-panel-heading">
                <div><h2>{t('dashboard', 'academicStructure')}</h2><p>{t('dashboard', 'structureSubtitle')}</p></div>
                <button type="button" className="admin-icon-button" aria-label="More structure options">...</button>
              </div>

              <div className="admin-structure-items">
                {overviewItems.map((item, index) => {
                  const Icon = item.icon;
                  const shortLabel = ['Depts', 'Courses', 'Modules', 'Lectures'][index];
                  const value = index === 3 ? '150' : item.value;
                  return (
                    <button
                      type="button"
                      className={`admin-structure-tab ${item.tone}${index === 0 ? ' is-active' : ''}`}
                      aria-pressed={index === 0}
                      key={item.labelKey}
                    >
                      <Icon size={18} color="currentColor" />
                      <span><strong>{value}</strong> {shortLabel}</span>
                    </button>
                  );
                })}
              </div>
              <div className="admin-total-card"><div><strong>{t('dashboard', 'totalActiveLectures')}</strong><span>{t('dashboard', 'lecturesSubtitle')}</span></div><b>150</b></div>
            </section>
          </main>

          <aside className="admin-dashboard-side">
            <section className="admin-side-panel enrollment-panel">
              <div className="admin-panel-heading"><h2>{t('nav', 'enrollmentRequests')}</h2><a href={ROUTES.ENROLLMENT_REQUESTS}>{t('dashboard', 'viewAll')}</a></div>
              <div className="request-list">
                <div><span><i className="request-dot orange" />{t('dashboard', 'requests.pendingApproval')}</span><strong>42</strong></div>
                <div><span><i className="request-dot green" />{t('dashboard', 'requests.approvedToday')}</span><strong>18</strong></div>
                <div><span><i className="request-dot red" />{t('dashboard', 'requests.rejected')}</span><strong>3</strong></div>
              </div>
              <a className="admin-primary-btn full" href={ROUTES.ENROLLMENT_REQUESTS}>{t('dashboard', 'requests.reviewPending')}</a>
            </section>

            <section className="admin-side-panel activity-panel">
              <h2>{t('dashboard', 'recentActivityTitle')}</h2>
              <div className="admin-activity-list">
                {recentActivity.map((activity, index) => (
                  <div className="admin-activity-item" key={`${activity.actor}-${activity.target}`}>
                    <span className={`activity-marker marker-${index}`} />
                    <div><strong>{activity.action}</strong><p>{activity.actor} {activity.action} {activity.target}.</p><small>{activity.time}</small></div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
  );
}

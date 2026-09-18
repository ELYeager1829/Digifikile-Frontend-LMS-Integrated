/**
 * @file ProgressOverview.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Learner progress overview (no AppLayout).
 */

import { useLanguage } from '../../../i18n/LanguageContext'
import Button from '../../../components/ui/Button'

const courseModules = [
  { name: 'Intro to Programming', module: 'Module 1', progress: 100 },
  { name: 'Data Structures & Algorithms', module: 'Module 2', progress: 78 },
  { name: 'Object-Oriented Design', module: 'Module 3', progress: 45 },
  { name: 'Advanced Web Development', module: 'Module 4', progress: 0 },
];

const completionStatus = [
  { labelKey: 'completed', count: 12, color: 'blue' },
  { labelKey: 'inprogress', count: 3, color: 'orange' },
  { labelKey: 'notstarted', count: 8, color: 'gray' },
];

const recentGrades = [
  { name: 'Binary Trees Quiz', type: 'Quiz', score: '92%', status: 'Graded' },
  { name: 'Sorting Algorithms Project', type: 'Assignment', score: '88%', status: 'Graded' },
  { name: 'Midterm Examination', type: 'Exam', score: '--', status: 'Pending' },
  { name: 'Python Basics Syntax', type: 'Quiz', score: '100%', status: 'Graded' },
];

const tabs = [
  { key: 'all', label: 'All Enrolled' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'not-started', label: 'Not Started' },
];

const enrollmentProgressByCourseId = {
  '1': 68,
  '2': 0,
  '3': 43,
  '4': 100,
  '5': 76,
  '6': 0,
};

const getStatusFromProgress = (progress) => {
  if (progress >= 100) return 'completed';
  if (progress <= 0) return 'not-started';
  return 'in-progress';
};

const getStatusLabel = (status) => {
  if (status === 'completed') return 'Completed';
  if (status === 'not-started') return 'Not Started';
  return 'In Progress';
};

export default function ProgressOverview() {
  const { t } = useLanguage()

  return (
    <div className="learner-progress-page">
        <div className="progress-header-block">
          <h1 className="progress-title">{t('progress', 'title')}</h1>
          <p className="progress-subtitle">
            {t('progress', 'subtitle')}
          </p>
        </div>

        <div className="progress-actions">
          <Button type="button" variant="secondary">↓ {t('progress', 'downloadReport')}</Button>
        </div>

        <div className="progress-grid">
          <section className="progress-panel overall-panel">
            <h2>{t('progress', 'overallProgress')}</h2>
            <div className="overall-score-wrap">
              <div className="overall-ring" aria-label={t('progress', 'overallProgressAria')}>
                <div className="overall-ring-inner">
                  <div className="overall-score">68%</div>
                  <div className="overall-label">{t('progress', 'completed')}</div>
                </div>
              </div>
            </div>

            <div className="progress-note">
              <span className="note-check">✓</span>
              <span>
                {t('progress', 'motivationText')}
              </span>
            </div>
          </section>

          <section className="progress-panel modules-panel">
            <div className="panel-header-inline">
              <h2>{t('progress', 'courseModules')}</h2>
              <button type="button" className="view-all-btn">{t('progress', 'viewAll')}</button>
            </div>

            <div className="module-progress-list">
              {courseModules.map((item) => (
                <div key={item.name} className="module-progress-item">
                  <div className="module-progress-row">
                    <span className="module-name">{item.name}</span>
                    <span className="module-percent">{item.progress}%</span>
                  </div>
                  <div className="module-bar-outer">
                    <div
                      className={`module-bar ${item.progress === 0 ? 'empty' : ''}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className="module-label">{item.module}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="progress-panel status-panel">
            <h2>{t('progress', 'completionStatus')}</h2>
            <div className="status-list">
              {completionStatus.map((item) => (
                <div key={item.labelKey} className="status-row">
                  <div className="status-left">
                    <span className={`status-dot ${item.color}`} />
                    <span>{t('progress', `status.${item.labelKey}`)}</span>
                  </div>
                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="progress-panel grades-panel">
            <div className="panel-header-inline">
              <h2>{t('progress', 'recentGrades')}</h2>
              <button type="button" className="view-all-btn">{t('progress', 'viewTranscript')}</button>
            </div>

            <div className="grades-table">
              <div className="grades-header">
                <span>{t('progress', 'table.itemName')}</span>
                <span>{t('progress', 'table.type')}</span>
                <span>{t('progress', 'table.score')}</span>
                <span>{t('progress', 'table.status')}</span>
              </div>

              {recentGrades.map((grade) => (
                <div key={grade.name} className="grade-row">
                  <span>{grade.name}</span>
                  <span>{grade.type}</span>
                  <span>{grade.score}</span>
                  <span>
                    <span className={`grade-status ${grade.status === 'Graded' ? 'graded' : 'pending'}`}>
                      {grade.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
  );
}

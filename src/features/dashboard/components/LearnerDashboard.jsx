/**
 * @file LearnerDashboard.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Learner dashboard with progress and tasks (no AppLayout).
 */

import { useNavigate } from 'react-router-dom';
import { learnerDashboardStats, learnerModules } from '../../../data/mockData';
import { AssignmentsIcon, EnrolledModulesIcon, OverallProgressIcon, UpcomingQuizIcon, LessonIcon, CorrectAnswerIcon } from '../../../components/ui/Icons';
import { useLanguage } from '../../../i18n/LanguageContext'
import { ROUTES } from '../../../constants/routes'

const STAT_ICONS = {
  'enrolled-modules': EnrolledModulesIcon,
  'pending-assignments': AssignmentsIcon,
  'upcoming-quizzes': UpcomingQuizIcon,
  'overall-progress': OverallProgressIcon,
};

export default function LearnerDashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const learnerName = localStorage.getItem('digifikile-user-name') || 'Student';
  const greeting = t('dashboard', 'greeting').replace('{name}', learnerName)

  const statLabels = {
    'enrolled-modules': t('dashboard', 'stats.enrolledModules'),
    'pending-assignments': t('dashboard', 'stats.pendingAssignments'),
    'upcoming-quizzes': t('dashboard', 'stats.upcomingQuizzes'),
    'overall-progress': t('dashboard', 'stats.overallProgress'),
  }

  return (
    <div className="learner-dashboard-page">
        <div className="learner-greeting">
          <h2>{greeting}</h2>
          <p>{t('dashboard', 'ready')}</p>
        </div>

        <div className="learner-stats-grid">
          {learnerDashboardStats.map((stat) => {
            const Icon = STAT_ICONS[stat.id];
            return (
              <div className={`learner-stat-card ${stat.type}`} key={stat.id}>
                <div className="stat-card-top">
                  <div className="stat-icon"><Icon size={20} color="currentColor" /></div>
                  <div className="stat-value">{stat.value}</div>
                </div>
                <div className="stat-label">{statLabels[stat.id] || stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="learner-dashboard-content-grid">
          <section className="learner-dashboard-panel learner-progress-panel">
            <div className="learner-panel-heading">
              <div><h3>{t('dashboard', 'learningProgress')}</h3><p>{t('dashboard', 'progressSummary')}</p></div>
              <button type="button" className="learner-panel-link" onClick={() => navigate(ROUTES.PROGRESS)}>{t('dashboard', 'viewProgress')}</button>
            </div>
            <div className="learner-progress-summary"><strong>68%</strong><span>{t('dashboard', 'overallCompletion')}</span><div className="learner-progress-track"><span style={{ width: '68%' }} /></div></div>
            <div className="learner-module-progress-list">
              {learnerModules.map((module) => <div className="learner-module-progress" key={module.id}><div><strong>{module.title}</strong><span>{module.statusLabel}</span></div><b>{module.progress}%</b><div className="learner-progress-track"><span style={{ width: `${module.progress}%` }} /></div></div>)}
            </div>
          </section>

          <section className="learner-dashboard-panel learner-activity-panel">
            <div className="learner-panel-heading"><div><h3>{t('dashboard', 'upcomingAndOverdue')}</h3><p>{t('dashboard', 'stayOnTrack')}</p></div><button type="button" className="learner-panel-link" onClick={() => navigate(ROUTES.ASSIGNMENTS)}>{t('dashboard', 'viewAll')}</button></div>
            <div className="learner-task-list">
              <button type="button" className="learner-task-item overdue" onClick={() => navigate(ROUTES.ASSIGNMENTS)}><span className="learner-task-icon"><AssignmentsIcon size={18} color="#b3261e" /></span><span><strong>{t('dashboard', 'tasks.uxCaseStudy')}</strong><small>{t('dashboard', 'tasks.assignmentOverdue')}</small></span><b>{t('dashboard', 'tasks.dateOct20')}</b></button>
              <button type="button" className="learner-task-item" onClick={() => navigate(ROUTES.ASSESSMENTS)}><span className="learner-task-icon"><UpcomingQuizIcon size={18} color="#b87600" /></span><span><strong>{t('dashboard', 'tasks.javascriptFundamentals')}</strong><small>{t('dashboard', 'tasks.quizDueToday')}</small></span><b>{t('dashboard', 'tasks.today')}</b></button>
              <button type="button" className="learner-task-item" onClick={() => navigate(ROUTES.ASSIGNMENTS)}><span className="learner-task-icon"><AssignmentsIcon size={18} color="#1f7cf2" /></span><span><strong>{t('dashboard', 'tasks.dataAnalysisProject')}</strong><small>{t('dashboard', 'tasks.assignmentUpcoming')}</small></span><b>{t('dashboard', 'tasks.dateOct28')}</b></button>
            </div>
          </section>

          <section className="learner-dashboard-panel learner-continue-panel">
            <div className="learner-panel-heading"><div><h3>{t('dashboard', 'continueLearningTitle')}</h3><p>{t('dashboard', 'continueLearningSubtitle')}</p></div><button type="button" className="learner-panel-link" onClick={() => navigate(ROUTES.MODULES)}>{t('dashboard', 'allModules')}</button></div>
            <div className="learner-continue-list">{learnerModules.filter((module) => module.status !== 'completed').map((module) => <div className="learner-continue-item" key={module.id}><span className="learner-continue-icon"><EnrolledModulesIcon size={21} color="#1f7cf2" /></span><div><strong>{module.title}</strong><small>{module.lessons} {t('dashboard', 'moduleMeta.lessons')} · {module.progress}% {t('dashboard', 'moduleMeta.complete')}</small></div><button type="button" className="btn-primary-continue" onClick={() => navigate(ROUTES.MODULE_DETAIL(module.slug || module.id))}>{module.status === 'in-progress' ? t('dashboard', 'continueButton') : t('dashboard', 'startButton')}</button></div>)}</div>
          </section>

          <section className="learner-dashboard-panel learner-achievements-panel">
            <div className="learner-panel-heading"><div><h3>{t('dashboard', 'recentActivity')}</h3><p>{t('dashboard', 'recentActivitySubtitle')}</p></div></div>
            <div className="learner-achievement-list"><div><span className="learner-achievement-icon"><CorrectAnswerIcon size={18} color="#0a9b67" /></span><p><strong>{t('dashboard', 'activity.completedModule')}</strong><small>{t('dashboard', 'activity.databaseManagementSystems')}</small></p></div><div><span className="learner-achievement-icon"><LessonIcon size={18} color="#1f7cf2" /></span><p><strong>{t('dashboard', 'activity.startedModule')}</strong><small>{t('dashboard', 'activity.introductionToProgramming')}</small></p></div></div>
          </section>
        </div>
      </div>
  );
}

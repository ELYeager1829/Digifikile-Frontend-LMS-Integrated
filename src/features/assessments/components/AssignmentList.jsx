/**
 * @file AssignmentList.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Assignments list and detail UI (no AppLayout).
 */

import { useState } from 'react';
import { useLanguage } from '../../../i18n/LanguageContext'

const assignmentCards = [
  {
    id: 1,
    title: 'Digital Marketing Strategy Proposal',
    module: 'Advanced Digital Marketing',
    status: 'Pending',
    dueLabel: 'Due Today',
    dueText: 'Oct 24, 11:59 PM',
    statusTone: 'pending',
    description: 'Develop and present a detailed digital marketing strategy proposal for the upcoming campaign launch. Include audience segmentation, budget allocation, and success metrics.',
    actions: ['View', 'Upload'],
    highlighted: false,
  },
  {
    id: 2,
    title: 'Data Analysis Project V2',
    module: 'Introduction to Data Science',
    status: 'Pending',
    dueLabel: 'Pending',
    dueText: 'Oct 28, 11:59 PM',
    statusTone: 'pending',
    description: 'Analyze the provided dataset and prepare a summary report with charts, key findings, and recommendations for stakeholders.',
    actions: ['View', 'Upload'],
    highlighted: false,
  },
  {
    id: 3,
    title: 'UX Research Case Study',
    module: 'User Experience Fundamentals',
    status: 'Overdue',
    dueLabel: 'Overdue',
    dueText: 'Oct 20, 11:59 PM',
    statusTone: 'overdue',
    description: 'Research a usability issue and produce a concise case study summarizing insights, findings, and recommended product improvements.',
    actions: ['View', 'Upload Late'],
    highlighted: true,
  },
  {
    id: 4,
    title: 'Responsive Layout Challenge',
    module: 'CSS Grid & Flexbox',
    status: 'Submitted',
    dueLabel: 'Submitted',
    dueText: 'Oct 18, 11:59 PM',
    statusTone: 'submitted',
    description: 'Build a responsive page using CSS Grid and Flexbox, then submit the project for review.',
    actions: ['View Submission'],
    highlighted: false,
  },
  {
    id: 5,
    title: 'JavaScript Fundamentals Quiz',
    module: 'JavaScript Fundamentals',
    status: 'Completed',
    dueLabel: 'Completed',
    dueText: 'Oct 12, 11:59 PM',
    statusTone: 'completed',
    description: 'Review the core JavaScript concepts covered in this module and your completed assessment.',
    actions: ['Review'],
    highlighted: false,
  },
];

const assignmentTabs = [
  { key: 'pending', statuses: ['Pending', 'Overdue'] },
  { key: 'submitted', statuses: ['Submitted'] },
  { key: 'completed', statuses: ['Completed'] },
];

export default function AssignmentList() {
  const { t } = useLanguage();
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');

  if (selectedAssignment) {
    return (
      <div className="assignment-submission-page">
          <div className="submission-breadcrumb">
            <button type="button" className="breadcrumb-back" onClick={() => setSelectedAssignment(null)}>
              ← {t('assignmentList', 'returnToAssignments')}
            </button>
          </div>

          <div className="submission-detail-header">
            <div className="submission-meta-row">
              <span className="submission-calendar">◫</span>
              <span>{t('assignmentList', 'dueText').replace('{date}', selectedAssignment.dueText)}</span>
            </div>
            <button type="button" className="download-assignment-btn">↓ {t('assignmentList', 'downloadAssignment')}</button>
          </div>

          <h1 className="submission-title">{selectedAssignment.title}</h1>
          <p className="submission-description">{selectedAssignment.description}</p>

          <div className="submission-panel">
            <h2>{t('assignmentList', 'submitYourWork')}</h2>
            <div className="upload-dropzone">
              <div className="upload-cloud">☁</div>
              <div className="upload-copy">
                <div className="upload-primary">{t('assignmentList', 'uploadDropzone')}</div>
                <div className="upload-secondary">{t('assignmentList', 'browseComputer')}</div>
              </div>
              <div className="upload-support">{t('assignmentList', 'supportedFormats')}</div>
            </div>

            <button type="button" className="submit-assignment-btn">{t('assignmentList', 'submitAssignment')}</button>
          </div>
        </div>
    );
  }

  return (
    <div className="learner-assignments-page">
        <div className="assignments-header-row">
          <div>
            <h1 className="assignments-title">{t('assignmentList', 'title')}</h1>
            <p className="assignments-subtitle">{t('assignmentList', 'subtitle')}</p>
          </div>

          <div className="assignments-tabs" aria-label="Assignment status filters">
            {assignmentTabs.map((tab) => (
              <button
                key={tab.key}
                className={`assignment-tab${activeTab === tab.key ? ' active' : ''}`}
                type="button"
                onClick={() => setActiveTab(tab.key)}
              >
                {t('assignmentList', `tabs.${tab.key}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="assignment-card-grid">
          {assignmentCards.filter((assignment) => assignmentTabs.find((tab) => tab.key === activeTab).statuses.includes(assignment.status)).map((assignment) => (
            <article
              key={assignment.id}
              className={`assignment-card ${assignment.highlighted ? 'is-overdue' : ''}`}
            >
              <div className="assignment-card-header">
                <span className={`assignment-badge ${assignment.statusTone}`}>{assignment.status}</span>
                <button type="button" className="assignment-menu" aria-label="Assignment options">⋮</button>
              </div>

              <h3 className="assignment-title">{assignment.title}</h3>
              <p className="assignment-module">{t('assignmentList', 'module')}: {assignment.module}</p>

              <div className="assignment-footer">
                <div className="assignment-date">
                  <span className="assignment-calendar">◫</span>
                  <span>{assignment.dueText}</span>
                </div>

                <div className="assignment-actions">
                  {assignment.actions.map((action, index) => (
                    <button
                      key={action}
                      type="button"
                      className={`assignment-action ${index === 1 ? 'primary' : ''}`}
                      onClick={() => setSelectedAssignment(assignment)}
                    >
                      {action === 'View' ? t('assignmentList', 'view') : action === 'Upload' ? t('assignmentList', 'upload') : action === 'Review' ? t('assignmentList', 'review') : action}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
  );
}

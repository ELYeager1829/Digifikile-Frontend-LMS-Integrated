/**
 * @file Sidebar.jsx — DigiFikile LMS Frontend
 * @layer Layout
 */

import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { SITE } from '../../constants/site'
import { useLanguage } from '../../i18n/LanguageContext'
import Button from '../ui/Button'
import { logout } from '../../services/authService'
import {
  DashboardIcon,
  DepartmentIcon,
  CourseIcon,
  ModuleIcon,
  UserIcon,
  QuizzesIcon,
  AssignmentsIcon,
  ProgressIcon,
  BadgeCheck,
  MessagesIcon,
  Megaphone,
  DownloadIcon,
  Cog,
  HelpIcon,
  Logout,
  LockIcon,
} from '../ui/Icons'

const SIDEBAR_ICON_COLOR = '#5a6b7d'

const ADMIN_NAV_ITEMS = [
  { to: ROUTES.DASHBOARD, key: 'dashboard', icon: DashboardIcon },
  { to: ROUTES.DEPARTMENTS, key: 'departments', icon: DepartmentIcon },
  { to: ROUTES.USERS, key: 'User Management', icon: UserIcon },
  { to: ROUTES.LEARNER_GROUPS, key: 'learnerGroups', icon: UserIcon },
  { to: ROUTES.COURSES, key: 'courses', icon: CourseIcon },
  { to: ROUTES.REPORTS, key: 'reports', icon: ProgressIcon },
  { to: ROUTES.CERTIFICATE_VERIFICATION, key: 'certificateVerification', icon: BadgeCheck },
  { to: ROUTES.ANNOUNCEMENTS, key: 'announcements', icon: Megaphone },
  { to: ROUTES.ENROLLMENT_REQUESTS, key: 'enrollmentRequests', icon: MessagesIcon },
]

const STUDENT_NAV_ITEMS = [
  { to: ROUTES.STUDENT_DASHBOARD, key: 'dashboard', icon: DashboardIcon },
  { to: ROUTES.MODULES, key: 'modules', icon: ModuleIcon },
  { to: ROUTES.ASSESSMENTS, key: 'courses', icon: QuizzesIcon },
  { to: ROUTES.ASSIGNMENTS, key: 'assignLectures', icon: AssignmentsIcon },
  { to: ROUTES.PROGRESS, key: 'reports', icon: ProgressIcon },
  { to: ROUTES.MESSAGES, key: 'messages', icon: MessagesIcon },
  { to: ROUTES.ANNOUNCEMENTS, key: 'announcements', icon: Megaphone },
  { to: ROUTES.DOWNLOADS, key: 'downloads', icon: DownloadIcon },
]

const PROVIDER_NAV_SECTIONS = [
  {
    label: 'MAIN',
    items: [
      { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
    ],
  },
  {
    label: 'GRADING',
    items: [
      { to: ROUTES.ASSESSMENTS, label: 'Grading', icon: AssignmentsIcon },
    ],
  },
  {
    label: 'COMMUNICATION',
    items: [
      { to: ROUTES.ANNOUNCEMENTS, label: 'Announcements', icon: Megaphone },
    ],
  },
  {
    label: 'CONTENT',
    items: [
      { to: ROUTES.MODULES, label: 'Content Protection', icon: LockIcon },
    ],
  },
  {
    label: 'MONITORING',
    items: [
      { to: ROUTES.PROGRESS, label: 'Learner Progress', icon: ProgressIcon },
      { to: ROUTES.USERS, label: 'Inactive Learners', icon: UserIcon },
    ],
  },
]

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()
  const { t } = useLanguage()
  const role = localStorage.getItem('digifikile-role')
  const isStudent = role === 'student'
  const isSetaAdmin = role === 'seta-admin'
  const isProvider = role === 'training-provider' || role === 'provider' || role === 'facilitator'
  const navItems = isStudent ? STUDENT_NAV_ITEMS : ADMIN_NAV_ITEMS

  const handleLogout = () => {
    logout().finally(() => navigate(ROUTES.LOGIN))
  }

  const handleNavigation = () => {
    if (window.innerWidth <= 768) onClose()
  }

  return (
    <aside className={`sidebar ${isStudent ? 'learner-sidebar' : 'admin-sidebar'}${isCollapsed ? ' is-collapsed' : ''}${isOpen && isStudent ? ' active' : ''}${!isStudent && isOpen ? ' open' : ''}`}>
      <Button type="button" variant="ghost" size="icon" aria-label="Close menu" onClick={onClose}>
        ×
      </Button>

      <div className="sidebar-brand">
        <div className="brand-lockup" aria-label={SITE.name}>
          <img src="/logo.png" alt="DigiFikile logo" className="brand-logo-image" />
        </div>
      </div>

      {isProvider ? (
        <nav className="sidebar-nav provider-nav">
          {PROVIDER_NAV_SECTIONS.map((section) => (
            <div key={section.label} className="sidebar-section-group">
              <div className="sidebar-section-label">{section.label}</div>
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={`${item.to}-${item.label}`}
                    to={item.to}
                    className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
                    onClick={handleNavigation}
                  >
                    <span className="sidebar-link-icon"><Icon size={16} color="currentColor" /></span>
                    <span>{item.label}</span>
                  </NavLink>
                )
              })}
            </div>
          ))}
          <div className="sidebar-meta provider-meta">
            <button type="button" className="sidebar-meta-item is-logout sidebar-logout-btn" onClick={handleLogout}>
              <span className="sidebar-link-icon"><Logout size={16} color="currentColor" /></span>
              <span>Logout</span>
            </button>
          </div>
        </nav>
      ) : (
        <>
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={`${item.to}-${item.key}`}
                  to={item.to}
                  className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
                  onClick={handleNavigation}
                >
                  <span className="sidebar-link-icon"><Icon size={20} color={SIDEBAR_ICON_COLOR} /></span>
                  <span>{t('nav', item.key)}</span>
                </NavLink>
              )
            })}
          </nav>

          <div className="sidebar-meta">
            <NavLink
              to={isStudent || isSetaAdmin ? ROUTES.PROFILE_SETTINGS : ROUTES.SETTINGS}
              className={({ isActive }) => `sidebar-meta-item${isActive ? ' active' : ''}`}
              onClick={handleNavigation}
            >
              <span className="sidebar-link-icon"><Cog size={20} color={SIDEBAR_ICON_COLOR} /></span>
              <span>{isStudent || isSetaAdmin ? t('nav', 'profileSetting') : t('nav', 'settings')}</span>
            </NavLink>
            <NavLink
              to={ROUTES.HELP}
              className={({ isActive }) => `sidebar-meta-item${isActive ? ' active' : ''}`}
              onClick={handleNavigation}
            >
              <span className="sidebar-link-icon"><HelpIcon size={20} color={SIDEBAR_ICON_COLOR} /></span>
              <span>{t('nav', 'help')}</span>
            </NavLink>
            <button type="button" className="sidebar-meta-item is-logout sidebar-logout-btn" onClick={handleLogout}>
              <span className="sidebar-link-icon"><Logout size={20} color={SIDEBAR_ICON_COLOR} /></span>
              <span>{t('nav', 'logout')}</span>
            </button>
          </div>
        </>
      )}

      <button
        type="button"
        className="sidebar-collapse-control"
        aria-label={isCollapsed ? 'Show sidebar' : 'Hide sidebar'}
        title={isCollapsed ? 'Show sidebar' : 'Hide sidebar'}
        onClick={() => setIsCollapsed((collapsed) => !collapsed)}
      >
        <span className="sidebar-collapse-chevron" aria-hidden="true">{isCollapsed ? '›' : '‹'}</span>
        <span className="sidebar-collapse-label">Hide</span>
      </button>
    </aside>
  )
}

/**
 * @file Topbar.jsx — DigiFikile LMS Frontend
 * @layer Layout
 */

import { Bell, HelpIcon, Search, UserIcon, Menu as MenuIcon } from '../ui/Icons'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import { ROUTES } from '../../constants/routes'
import useCurrentUser from '../../features/auth/hooks/useCurrentUser'

const SECTION_KEY_MAP = {
  Dashboard: 'dashboard',
  Departments: 'departments',
  'Training Providers': 'trainingProviders',
  Users: 'users',
  'User Management': 'users',
  'Learner Groups': 'learnerGroups',
  Courses: 'courses',
  Modules: 'modules',
  'My Modules': 'modules',
  Lectures: 'lectures',
  'Assign Lectures': 'assignLectures',
  Assignments: 'assignments',
  Quizzes: 'assessments',
  Reports: 'reports',
  'Certificate Verification': 'certificateVerification',
  Announcements: 'announcements',
  'Enrollment Requests': 'enrollmentRequests',
  Settings: 'settings',
  'Profile Setting': 'profileSetting',
  Help: 'help',
  'View Certificates': 'certificateVerification',
  'Change Password': 'profileSetting',
  Progress: 'progress',
  Messages: 'messages',
  Downloads: 'downloads',
  Course: 'courses',
}

const SEARCH_DESTINATIONS = [
  { label: 'Dashboard', route: ROUTES.DASHBOARD },
  { label: 'Departments', route: ROUTES.DEPARTMENTS },
  { label: 'User Management', route: ROUTES.USERS },
  { label: 'Learner Groups', route: ROUTES.LEARNER_GROUPS },
  { label: 'Courses', route: ROUTES.COURSES },
  { label: 'Reports', route: ROUTES.REPORTS },
  { label: 'Certificate Verification', route: ROUTES.CERTIFICATE_VERIFICATION },
  { label: 'Announcements', route: ROUTES.ANNOUNCEMENTS },
  { label: 'Enrollment Requests', route: ROUTES.ENROLLMENT_REQUESTS },
  { label: 'Settings', route: ROUTES.SETTINGS },
  { label: 'Help', route: ROUTES.HELP },
]

export default function Topbar({ section, onMenuClick, showMenuButton = false }) {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { user } = useCurrentUser()
  const userName = user?.fullName || [user?.name, user?.surname].filter(Boolean).join(' ').trim() || user?.email || 'DigiFikile User'
  const initials = [user?.name, user?.surname].filter(Boolean).map((part) => part?.[0]).join('').toUpperCase()

  const translatedSection = section
    ? (SECTION_KEY_MAP[section] ? t('nav', SECTION_KEY_MAP[section]) : section)
    : null

  const searchPlaceholder = section === 'Departments' ? 'Search departments...' : 'Search...'
  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return normalizedQuery
      ? SEARCH_DESTINATIONS.filter(({ label }) => label.toLowerCase().includes(normalizedQuery))
      : []
  }, [query])

  const openResult = (route) => {
    setQuery('')
    navigate(route)
  }

  return (
    <header className="topbar">
      {showMenuButton && (
        <button
          type="button"
          className="topbar-menu-btn"
          aria-label="Toggle menu"
          onClick={onMenuClick}
        >
          <MenuIcon size={20} color="#1673e8" />
        </button>
      )}

      <div className="topbar-search-wrap" aria-label="Search">
        <span className="topbar-search-icon"><Search size={14} color="#344154" /></span>
        <input
          type="search"
          className="topbar-search"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query.trim() && (
          <div className={`topbar-search-results${searchResults.length ? '' : ' empty'}`}>
            {searchResults.length
              ? searchResults.map(({ label, route }) => (
                <button key={route} type="button" onClick={() => openResult(route)}>
                  <strong>{label}</strong>
                  <small>Open page</small>
                </button>
              ))
              : 'No matching pages found.'}
          </div>
        )}
      </div>

      <div className="topbar-actions">
        <LanguageSwitcher />
        <button type="button" className="topbar-icon-btn" aria-label="Notifications">
          <Bell size={18} color="#1673e8" />
        </button>
        <button type="button" className="topbar-icon-btn" aria-label="Help">
          <HelpIcon size={18} color="#1673e8" />
        </button>
        <div className="topbar-user-avatar-only" title={userName} aria-label={`Signed in as ${userName}`}>
          <span className="topbar-user-avatar">{initials || <UserIcon size={18} color="#ffffff" />}</span>
        </div>
      </div>
    </header>
  )
}

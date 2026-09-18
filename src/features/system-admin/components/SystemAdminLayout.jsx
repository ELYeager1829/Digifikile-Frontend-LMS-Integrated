import { Outlet, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Bell, Search, UserIcon, DashboardIcon, DepartmentIcon, MessagesIcon, CourseIcon, LockIcon, Cog, Logout, Menu } from '../../../components/ui/Icons'
import { ROUTES } from '../../../constants/routes'
import Button from '../../../components/ui/Button'
import useCurrentUser from '../../auth/hooks/useCurrentUser'
import { logout } from '../../../services/authService'

const NAV_ITEMS = [
  { to: ROUTES.SYSTEM_ADMIN_DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
  { to: ROUTES.SYSTEM_ADMIN_SETA_ADMINISTRATORS, label: 'SETA Administrators', icon: DepartmentIcon },
  { to: ROUTES.SYSTEM_ADMIN_USERS, label: 'User Management', icon: UserIcon },
  { to: ROUTES.SYSTEM_ADMIN_ROLES_PERMISSIONS, label: 'Roles & Permissions', icon: LockIcon },
  { to: ROUTES.SYSTEM_ADMIN_COMPLAINTS, label: 'Complaints', icon: MessagesIcon },
  { to: ROUTES.SYSTEM_ADMIN_SYSTEM_LOG, label: 'System Log', icon: CourseIcon },
]

export default function SystemAdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { user } = useCurrentUser()
  const userName = user?.fullName || [user?.name, user?.surname].filter(Boolean).join(' ').trim() || localStorage.getItem('digifikile-user-name') || 'System Admin'
  const roleLabel = user?.role === 'SystemAdministrator' ? 'System Administrator' : (user?.role || 'System Administrator')

  const openSidebar = () => setIsSidebarOpen(true)
  const closeSidebar = () => setIsSidebarOpen(false)
  const searchResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    return normalizedQuery
      ? NAV_ITEMS.filter(({ label }) => label.toLowerCase().includes(normalizedQuery))
      : []
  }, [searchQuery])

  const openSearchResult = (route) => {
    setSearchQuery('')
    navigate(route)
  }

  return (
    <div className={`system-admin-shell ${isSidebarOpen ? 'sidebar-open' : ''}`}>
    <aside className={`system-admin-sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="system-admin-brand">
          <div className="brand-lockup" aria-label="DigiFikile LMS">
            <img src="/logo.png" alt="DigiFikile logo" className="brand-logo-image" />
          </div>
        </div>

        {/* Close button shown inside sidebar on small screens */}
        <Button type="button" variant="ghost" size="icon" onClick={closeSidebar} aria-label="Close sidebar">×</Button>

        <nav className="system-admin-nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className={`system-admin-nav-item`}
              onClick={() => {
                navigate(to)
                // close on mobile after navigation
                closeSidebar()
              }}
            >
              <span className="system-admin-nav-icon"><Icon size={18} color="currentColor" /></span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="system-admin-meta">
          <button type="button" className="system-admin-meta-item" onClick={() => navigate('/system-admin/profile')}>
            <span className="system-admin-nav-icon"><Cog size={18} color="currentColor" /></span>
            <span>Profile</span>
          </button>
          <button
            type="button"
            className="system-admin-meta-item logout"
            onClick={() => {
              logout().finally(() => navigate(ROUTES.LOGIN))
            }}
          >
            <span className="system-admin-nav-icon"><Logout size={18} color="currentColor" /></span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Backdrop to close sidebar on mobile */}
      {isSidebarOpen && <div className="system-admin-backdrop" onClick={closeSidebar} />}

      <div className="system-admin-main">
        <header className="system-admin-topbar">
          {/* Hamburger menu for small screens */}
          <button
            type="button"
            className="system-admin-menu-button"
            onClick={() => (isSidebarOpen ? closeSidebar() : openSidebar())}
            aria-label="Open sidebar"
          >
            <Menu size={18} color="#1d6ef2" />
          </button>
          <div className="system-admin-search-wrap">
            <span className="system-admin-search-icon"><Search size={16} color="#64748b" /></span>
            <input
              className="system-admin-search"
              type="text"
              placeholder="Search users, roles, complaints, audit logs..."
              aria-label="Search system"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            {searchQuery.trim() && (
              <div className={`system-admin-search-results${searchResults.length ? '' : ' empty'}`}>
                {searchResults.length
                  ? searchResults.map(({ label, to }) => (
                    <button key={to} type="button" onClick={() => openSearchResult(to)}>{label}</button>
                  ))
                  : 'No matching system pages found.'}
              </div>
            )}
          </div>

          <div className="system-admin-topbar-actions">
            <button type="button" className="system-admin-icon-button" aria-label="Notifications">
              <Bell size={18} color="#1d6ef2" />
            </button>
            <div className="system-admin-user-pill">
              <span className="system-admin-user-avatar"><UserIcon size={16} color="#ffffff" /></span>
              <div className="system-admin-user-meta">
                <strong>{userName}</strong>
                <span>{roleLabel}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="system-admin-page">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

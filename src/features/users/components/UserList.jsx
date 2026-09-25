import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, Search } from '../../../components/ui/Icons'
import { ROUTES } from '../../../constants/routes'
import { useUsers } from '../hooks/useUsers'
import { AVAILABLE_USER_ROLES } from '../constants/roles'
import { UserAvatar, UserIcon, UserPill } from './UserPresentation'

const PAGE_SIZE = 5

function getUserName(user) {
  return user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'Unnamed user'
}

function getUserRole(user) {
  const role = user.role || user.roles?.[0]

  if (typeof role === 'object') {
    return role.name || role.slug || 'Unassigned'
  }

  return role || 'Unassigned'
}

function getUserStatus(user) {
  return user.status || 'Active'
}

function normalizeRole(role) {
  const key = String(role || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '')
  const aliases = {
    trainingprovider: 'training-provider',
    setaadministrator: 'seta-admin',
    setaadmin: 'seta-admin',
    systemadministrator: 'system-administrator',
    systemadmin: 'system-administrator',
    learner: 'student',
  }
  return aliases[key] || key
}

export default function UserList({ detailRoute = ROUTES.USER_DETAIL, showAddUser = true, addRoute = ROUTES.USER_ADD }) {
  const navigate = useNavigate()
  const { users, loading, error } = useUsers()
  const isSetaAdmin = localStorage.getItem('digifikile-role') === 'seta-admin'
  const roleOptions = isSetaAdmin ? [{ value: 'student', label: 'Student' }] : AVAILABLE_USER_ROLES
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('all')
  const [status, setStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch = !query || [
        getUserName(user),
        user.email,
        user.id,
        user.userId,
        getUserRole(user),
        user.department,
      ].some((value) => String(value || '').toLowerCase().includes(query))
      const matchesRole = role === 'all' || normalizeRole(getUserRole(user)) === role
      const matchesStatus = status === 'all' || getUserStatus(user).toLowerCase() === status

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, search, role, status])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const page = Math.min(currentPage, totalPages)
  const firstUserIndex = (page - 1) * PAGE_SIZE
  const visibleUsers = filteredUsers.slice(firstUserIndex, firstUserIndex + PAGE_SIZE)
  const firstResult = filteredUsers.length === 0 ? 0 : firstUserIndex + 1
  const lastResult = Math.min(firstUserIndex + PAGE_SIZE, filteredUsers.length)

  const updateFilter = (setFilter) => (event) => {
    setFilter(event.target.value)
    setCurrentPage(1)
  }

  return (
    <section className="um-user-list">
      <header className="um-heading">
        <div>
          <h1>User Management</h1>
          <p>{isSetaAdmin ? 'Manage learners in your SETA administration workspace.' : 'Manage system users, roles and permissions.'}</p>
        </div>
        <div className="um-actions">
          <button type="button" className="um-button um-filter-button" onClick={() => document.getElementById('um-user-search')?.focus()}>
            <UserIcon type="filter" />
            Filter
          </button>
          {showAddUser && (
            <button type="button" className="um-button um-primary" onClick={() => navigate(addRoute)}>
              + Add User
            </button>
          )}
        </div>
      </header>

      <section className="um-toolbar" aria-label="User filters">
        <label className="um-search" htmlFor="um-user-search">
          <Search size={18} color="currentColor" />
          <input
            id="um-user-search"
            type="search"
            value={search}
            onChange={updateFilter(setSearch)}
            placeholder="Search by name, email or ID..."
          />
        </label>
        <label className="um-select">
          <span>Role:</span>
          <select value={role} onChange={updateFilter(setRole)}>
            <option value="all">All Roles</option>
            {roleOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="um-select">
          <span>Status:</span>
          <select value={status} onChange={updateFilter(setStatus)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
      </section>


      <section className="um-table-card">
        <div className="um-table-scroll">
          <table className="um-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td className="um-empty" colSpan="6">Loading users...</td></tr>}
              {!loading && error && <tr><td className="um-empty" colSpan="6">Unable to load users.</td></tr>}
              {!loading && !error && visibleUsers.length === 0 && <tr><td className="um-empty" colSpan="6">No users found.</td></tr>}
              {!loading && !error && visibleUsers.map((user) => {
                const userId = user.id || user.userId
                const userName = getUserName(user)

                return (
                  <tr key={userId || user.email}>
                    <td>
                      <div className="um-identity">
                        <UserAvatar user={{ ...user, name: userName }} />
                        <div>
                          <strong>{userName}</strong>
                          <small>{user.userId || userId || 'No ID'}</small>
                        </div>
                      </div>
                    </td>
                    <td>{user.email || 'Not provided'}</td>
                    <td><UserPill value={getUserRole(user)} /></td>
                    <td>{user.department || user.faculty || 'Unassigned'}</td>
                    <td><UserPill value={getUserStatus(user)} /></td>
                    <td>
                      <div className="um-row-actions">
                        <button type="button" className="um-icon-button" aria-label={`Edit ${userName}`} onClick={() => navigate(detailRoute(userId))}>
                          <Pencil size={16} color="currentColor" />
                        </button>
                        <button type="button" className="um-icon-button" aria-label={`View ${userName}`} onClick={() => navigate(detailRoute(userId))}>
                          <UserIcon type="view" />
                        </button>

                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <footer className="um-pagination">
          <span>Showing {firstResult} to {lastResult} of {filteredUsers.length} users</span>
          <nav aria-label="User pagination">
            <button type="button" disabled={page === 1} onClick={() => setCurrentPage((value) => value - 1)}>Prev</button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((value) => (
              <button
                key={value}
                type="button"
                aria-current={page === value ? 'page' : undefined}
                onClick={() => setCurrentPage(value)}
              >
                {value}
              </button>
            ))}
            <button type="button" disabled={page === totalPages} onClick={() => setCurrentPage((value) => value + 1)}>Next</button>
          </nav>
        </footer>
      </section>
    </section>
  )
}

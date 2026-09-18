import { useEffect, useMemo, useState } from 'react'
import { useRoles } from '../features/users/hooks/useRoles'
import { fetchRoleById } from '../services/userService'
import { UserSwitch } from '../features/users/components/UserPresentation'
import '../features/users/styles/user-management.css'

export default function SystemAdminRolesPermissionsPage() {
  const { roles, permissions, loading, error, setRolePermission } = useRoles()
  const [selectedRoleId, setSelectedRoleId] = useState('')
  const [roleDetail, setRoleDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!selectedRoleId && roles.length) setSelectedRoleId(String(roles[0].id))
  }, [roles, selectedRoleId])

  useEffect(() => {
    if (!selectedRoleId) { setRoleDetail(null); return }
    let active = true
    setDetailLoading(true)
    setDetailError('')
    setNotice('')
    fetchRoleById(Number(selectedRoleId))
      .then(data => { if (active) setRoleDetail(data) })
      .catch(err => { if (active) setDetailError(err.message || String(err)) })
      .finally(() => { if (active) setDetailLoading(false) })
    return () => { active = false }
  }, [selectedRoleId])

  const assignedPermissionIds = useMemo(
    () => new Set((roleDetail?.permissions || []).map(permission => Number(permission.id))),
    [roleDetail]
  )

  async function togglePermission(permission, enabled) {
    if (!roleDetail) return
    setDetailLoading(true)
    setDetailError('')
    setNotice('')
    try {
      const updated = await setRolePermission(roleDetail.id, permission.id, enabled)
      setRoleDetail(updated)
      setNotice(`${permission.name || permission.code} ${enabled ? 'enabled' : 'disabled'} for ${roleDetail.name}.`)
    } catch (err) {
      setDetailError(err.message || String(err))
    } finally {
      setDetailLoading(false)
    }
  }

  return <div className="um-page">
    <header className="um-heading"><div><h1>Roles &amp; Permissions</h1><p>Configure the permissions assigned to existing LMS roles.</p></div></header>
    {error && <p className="um-error" role="alert">Unable to load roles or permissions: {error.message || String(error)}</p>}
    {detailError && <p className="um-error" role="alert">{detailError}</p>}
    {notice && <p className="um-success" role="status">{notice}</p>}

    <div className="um-role-management-grid">
      <section className="um-card um-role-list-card" aria-label="Roles">
        <h2>Roles</h2>
        {loading && !roles.length ? <p role="status">Loading roles…</p> : roles.length ? <div className="um-role-list">
          {roles.map(role => <button key={role.id} type="button" className={String(role.id) === selectedRoleId ? 'active' : ''} onClick={() => setSelectedRoleId(String(role.id))}><strong>{role.name}</strong>{role.description ? <small>{role.description}</small> : null}</button>)}
        </div> : <p className="um-muted">No roles are configured.</p>}
      </section>

      <section className="um-card" aria-label="Role permissions">
        <h2>{roleDetail ? `${roleDetail.name} Permissions` : 'Permissions'}</h2>
        {detailLoading && !roleDetail ? <p role="status">Loading role permissions…</p> : !roleDetail ? <p className="um-muted">Select a role to review its permissions.</p> : <>
          <p className="um-muted">Changes are saved immediately to the backend and are recorded in the System Log.</p>
          {permissions.length ? permissions.map(permission => <label className="um-permission-row" key={permission.id}>
            <span><strong>{permission.name || permission.code}</strong><small>{permission.code}{permission.description ? ` · ${permission.description}` : ''}</small></span>
            <UserSwitch label={permission.name || permission.code} checked={assignedPermissionIds.has(Number(permission.id))} disabled={detailLoading} onChange={event => togglePermission(permission, event.target.checked)} />
          </label>) : <p className="um-muted">No permissions are configured in the database.</p>}
        </>}
      </section>
    </div>
  </div>
}

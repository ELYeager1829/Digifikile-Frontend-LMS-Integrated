import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Pencil } from '../components/ui/Icons'
import { ROUTES } from '../constants/routes'
import { useUsers } from '../features/users/hooks/useUsers'
import { useLanguage } from '../i18n/LanguageContext'
import UserEditDialog from '../features/users/components/UserEditDialog'
import DeactivateUserDialog from '../features/users/components/DeactivateUserDialog'
import { UserAvatar, UserIcon, UserPill, UserSwitch } from '../features/users/components/UserPresentation'
import { useRoles } from '../features/users/hooks/useRoles'
import '../features/users/styles/user-management.css'

function InfoRow({ label, value }) {
  return <div className="um-info-row"><dt>{label}</dt><dd>{value || 'Not provided'}</dd></div>
}

export function UserDetailContent({ backRoute = ROUTES.USERS }) {
  const { userId } = useParams()
  const { t } = useLanguage()
  const { getUser, updateUser } = useUsers()
  const { roles, permissions, assignRole, setRolePermission } = useRoles()
  const isSetaAdmin = localStorage.getItem('digifikile-role') === 'seta-admin'
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  const [editOpen, setEditOpen] = useState(false)
  const [deactivateOpen, setDeactivateOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    setUser(null)
    getUser(userId)
      .then(found => { if (active) setUser(found) })
      .catch(err => { if (active) setError(err.message || String(err)) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [getUser, userId, retry])

  async function update(patches) {
    setSaving(true)
    setError('')
    setNotice('')
    try {
      setUser(await updateUser(user.id, patches))
      setNotice('User updated successfully.')
    } catch (err) {
      setError(err.message || String(err))
    } finally {
      setSaving(false)
    }
  }

  const assignedPermissionCodes = new Set(Array.isArray(user?.permissions) ? user.permissions : [])

  return <div className="um-page">
    <nav className="um-breadcrumb" aria-label="Breadcrumb"><Link to={backRoute}>{t('userManagement', 'title')}</Link><span aria-hidden="true">›</span><span>{user?.name || 'User Profile Details'}</span></nav>
    {loading ? <p role="status">Loading user…</p> : !user ? <section className="um-card"><h1>{error ? 'Unable to load user' : t('userDetail', 'notFound')}</h1><p role={error ? 'alert' : undefined}>{error || t('userDetail', 'notFoundText')}</p>{error && <button className="um-button" onClick={() => setRetry(value => value + 1)}>Retry</button>}</section> : <>
      <header className="um-heading um-profile-heading">
        <div className="um-profile-identity"><UserAvatar key={user.id} user={user} large /><div><div className="um-profile-name"><h1>{user.name}</h1><UserPill value={user.role} /><UserPill value={user.status} /></div><p>ID: {user.userId || user.id}</p></div></div>
        <div className="um-actions"><button className="um-button um-blue-outline" disabled={saving} onClick={() => setEditOpen(true)}><Pencil size={18} color="currentColor" />{t('userDetail', 'editUser')}</button><button className="um-button um-danger" disabled={saving} onClick={() => { if (user.status === 'Active') { setDeactivateOpen(true); return } if (window.confirm(`Reactivate ${user.name}?`)) update({ status: 'Active' }) }}>{user.status === 'Active' ? t('userDetail', 'deactivate') : 'Activate'}</button></div>
      </header>
      {error && <p className="um-error" role="alert">{error}</p>}{notice && <p className="um-success" role="status">{notice}</p>}
      <div className="um-profile-grid">
        <div className="um-card-column">
          <section className="um-card"><h2><UserIcon type="person" />{t('userDetail', 'personalInformation')}</h2><dl>
            <InfoRow label={t('userDetail', 'fullName')} value={user.name} /><InfoRow label={t('userDetail', 'emailAddress')} value={user.email} />
            {user.phone && <InfoRow label={t('userDetail', 'phoneNumber')} value={user.phone} />}{user.address && <InfoRow label={t('userDetail', 'residentialAddress')} value={user.address} />}
          </dl></section>
          <section className="um-card"><h2><UserIcon type="account" />{t('userDetail', 'accountInformation')}</h2><dl>
            <InfoRow label={t('userDetail', 'userId')} value={user.userId || user.id} /><InfoRow label={t('userDetail', 'accountCreated')} value={user.createdAt} /><InfoRow label="Account status" value={user.status} />
          </dl></section>
        </div>
        <div className="um-card-column">
          <section className="um-card"><h2><UserIcon type="shield" />{t('userDetail', 'securityPermissions')}</h2>
            {isSetaAdmin ? (
              <>
                <InfoRow label="Assigned role" value="Student" />
                <p className="um-muted">SETA Administrators can manage learner details and status, but cannot grant System Administrator or other elevated roles.</p>
              </>
            ) : (
              <>
                <label className="um-info-row"><strong>Assigned role</strong><select className="input" value={user.roleId || ''} disabled={saving} onChange={async event => { const roleId = Number(event.target.value); if (!roleId) return; setSaving(true); setError(''); setNotice(''); try { setUser(await assignRole(user.id, roleId)); setNotice('Role updated successfully.') } catch (err) { setError(err.message || String(err)) } finally { setSaving(false) } }}><option value="" disabled>Unassigned</option>{roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}</select></label>
                {user.roleId ? <><p className="um-muted">Permission changes apply to the assigned role and therefore to every user with that role.</p>{permissions.length ? permissions.map(permission => <label className="um-permission-row" key={permission.id}><span><strong>{permission.name || permission.code}</strong>{permission.description ? <small>{permission.description}</small> : null}</span><UserSwitch label={permission.name || permission.code} checked={assignedPermissionCodes.has(permission.code)} disabled={saving} onChange={async event => { setSaving(true); setError(''); setNotice(''); try { await setRolePermission(user.roleId, permission.id, event.target.checked); setUser(await getUser(user.id)); setNotice('Role permissions updated successfully.') } catch (err) { setError(err.message || String(err)) } finally { setSaving(false) } }} /></label>) : <p className="um-muted">No permissions have been configured.</p>}</> : <p className="um-muted">Assign a role to manage its permissions.</p>}
              </>
            )}
          </section>
          <section className="um-card"><h2>Administrative audit</h2><p className="um-muted">Profile, status, role and permission changes made here are written to the persisted System Log. Password values are never returned by the User Management API.</p></section>
        </div>
      </div>
      {deactivateOpen && <DeactivateUserDialog user={user} onClose={() => setDeactivateOpen(false)} onConfirm={async id => { try { setUser(await updateUser(id, { status: 'Inactive' })); setError(''); setNotice('User deactivated successfully.'); setDeactivateOpen(false) } catch (err) { setError(err.message || String(err)); throw err } }} />}
      {editOpen && <UserEditDialog user={user} roles={roles} onClose={() => setEditOpen(false)} onSave={async (id, patches) => { setUser(await updateUser(id, patches)); setNotice('User updated successfully.') }} onAssignRole={async (id, roleId) => { setUser(await assignRole(id, roleId)); setNotice('Role updated successfully.') }} />}
    </>}
  </div>
}

export default function UserDetailPage() {
  const { t } = useLanguage()
  return <AppLayout section={t('userManagement', 'title')}><UserDetailContent /></AppLayout>
}

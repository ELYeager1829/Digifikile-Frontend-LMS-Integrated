import { useEffect, useMemo, useState } from 'react'
import Drawer from '../../../components/ui/Drawer'
import { UserForm } from '../../users'
import {
  activateSetaAdministrator,
  deactivateSetaAdministrator,
  deleteSetaAdministrator,
  fetchSetaAdministrators,
  updateSetaAdministrator,
} from '../../../services/systemAdminService'
import '../styles/seta-administrators.css'

const formatDate = (value) => value ? new Date(value).toLocaleDateString() : 'Never'

const emptyEditForm = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  address: '',
  isActive: true,
}

function EditSetaAdminForm({ admin, saving, error, onCancel, onSave }) {
  const [form, setForm] = useState(() => ({
    name: admin?.name || '',
    surname: admin?.surname || '',
    email: admin?.email || '',
    phone: admin?.phone || '',
    address: admin?.address || '',
    isActive: admin?.isActive !== false,
  }))
  const [fieldErrors, setFieldErrors] = useState({})

  const update = (field) => (event) => {
    const value = field === 'isActive' ? event.target.value === 'active' : event.target.value
    setForm((current) => ({ ...current, [field]: value }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'First name is required.'
    if (!form.surname.trim()) next.surname = 'Last name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.phone && !/^\+?[0-9\s\-()]{7,20}$/.test(form.phone)) next.phone = 'Enter a valid contact number.'
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (event) => {
    event.preventDefault()
    if (!validate()) return
    onSave({
      name: form.name.trim(),
      surname: form.surname.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      address: form.address.trim() || null,
      isActive: form.isActive,
    })
  }

  return (
    <form className="seta-form-container p-4" onSubmit={submit}>
      {error && <div className="error" role="alert">{error}</div>}
      <div className="seta-form-header">
        <div>
          <h3>Edit SETA Administrator</h3>
          <p className="muted">Update profile details, contact information and account status.</p>
        </div>
        <div className="form-badge">CRUD-ST-01</div>
      </div>

      <div className="seta-form-grid">
        <div>
          <label className="field-label">First name <span className="required">*</span></label>
          <input className="auth-input" value={form.name} onChange={update('name')} />
          {fieldErrors.name && <small className="field-error">{fieldErrors.name}</small>}
        </div>
        <div>
          <label className="field-label">Last name <span className="required">*</span></label>
          <input className="auth-input" value={form.surname} onChange={update('surname')} />
          {fieldErrors.surname && <small className="field-error">{fieldErrors.surname}</small>}
        </div>
        <div>
          <label className="field-label">Email address <span className="required">*</span></label>
          <input className="auth-input" value={form.email} onChange={update('email')} />
          {fieldErrors.email && <small className="field-error">{fieldErrors.email}</small>}
        </div>
        <div>
          <label className="field-label">Contact Number</label>
          <input className="auth-input" value={form.phone} onChange={update('phone')} />
          {fieldErrors.phone && <small className="field-error">{fieldErrors.phone}</small>}
        </div>
        <div>
          <label className="field-label">Address</label>
          <input className="auth-input" value={form.address} onChange={update('address')} />
        </div>
        <div>
          <label className="field-label">Account Status</label>
          <select className="auth-input" value={form.isActive ? 'active' : 'inactive'} onChange={update('isActive')}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="drawer-actions">
        <button type="button" className="secondary-btn" onClick={onCancel} disabled={saving}>Cancel</button>
        <button type="submit" className="primary-btn" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
      </div>
    </form>
  )
}

export default function SystemAdminSetaAdministrators() {
  const [administrators, setAdministrators] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [search, setSearch] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [editError, setEditError] = useState('')

  const loadAdministrators = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await fetchSetaAdministrators(1, 100)
      setAdministrators(Array.isArray(result?.items) ? result.items : [])
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Unable to load SETA Administrators.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadAdministrators() }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return administrators
    return administrators.filter((admin) =>
      [admin.name, admin.surname, admin.email, admin.phone, admin.userId, admin.id, admin.isActive ? 'active' : 'inactive']
        .some((value) => String(value || '').toLowerCase().includes(q)))
  }, [administrators, search])

  const handleCreated = async () => {
    setNotice('SETA Administrator created. The invitation process has been triggered.')
    await loadAdministrators()
  }

  const openEdit = (admin) => {
    setSelectedAdmin({ ...emptyEditForm, ...admin })
    setEditError('')
    setEditDrawerOpen(true)
  }

  const saveEdit = async (payload) => {
    if (!selectedAdmin?.id) return
    setActionLoading(true)
    setEditError('')
    setNotice('')
    try {
      await updateSetaAdministrator(selectedAdmin.id, payload)
      setEditDrawerOpen(false)
      setSelectedAdmin(null)
      setNotice('SETA Administrator updated successfully.')
      await loadAdministrators()
    } catch (err) {
      setEditError(err?.response?.data?.error || err?.message || 'Unable to update SETA Administrator.')
    } finally {
      setActionLoading(false)
    }
  }

  const toggleStatus = async (admin) => {
    if (!admin?.id) return
    const nextActive = admin.isActive === false
    const confirmed = window.confirm(`${nextActive ? 'Reactivate' : 'Deactivate'} ${admin.name} ${admin.surname}?`)
    if (!confirmed) return
    setActionLoading(true)
    setError('')
    setNotice('')
    try {
      if (nextActive) await activateSetaAdministrator(admin.id)
      else await deactivateSetaAdministrator(admin.id)
      setNotice(`SETA Administrator ${nextActive ? 'reactivated' : 'deactivated'} successfully.`)
      await loadAdministrators()
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Unable to update SETA Administrator status.')
    } finally {
      setActionLoading(false)
    }
  }

  const removeAdmin = async (admin) => {
    if (!admin?.id) return
    const confirmed = window.confirm(`Remove ${admin.name} ${admin.surname}? This will deactivate the account and block login while keeping audit history.`)
    if (!confirmed) return
    setActionLoading(true)
    setError('')
    setNotice('')
    try {
      await deleteSetaAdministrator(admin.id)
      setNotice('SETA Administrator removed from active administration.')
      await loadAdministrators()
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Unable to remove SETA Administrator.')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div className="seta-administrators-page">
      <header className="page-header">
        <h1>SETA Administrators</h1>
        <p className="page-sub">Create, view, update, deactivate and remove SETA Administrator accounts.</p>
      </header>

      <section className="admin-management-card">
        <div className="table-toolbar">
          <input
            className="search-input"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email, phone, status or ID..."
          />
          <div className="seta-administrator-actions">
            <button type="button" className="primary-btn" onClick={() => setDrawerOpen(true)} disabled={actionLoading}>
              <span className="seta-administrator-plus">+</span> Create SETA Administrator
            </button>
          </div>
        </div>

        {notice && <div className="seta-notice success" role="status">{notice}</div>}

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Administrator</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td className="empty-state" colSpan="7">Loading SETA Administrators...</td></tr>}
              {!loading && error && <tr><td className="empty-state" colSpan="7">{error}</td></tr>}
              {!loading && !error && filtered.length === 0 && (
                <tr><td className="empty-state" colSpan="7">No SETA Administrators found.</td></tr>
              )}
              {!loading && !error && filtered.map((admin) => {
                const initials = `${admin.name?.[0] || ''}${admin.surname?.[0] || ''}`.toUpperCase()
                return (
                  <tr key={admin.id || admin.userId}>
                    <td>
                      <div className="seta-administrator-name">
                        <span className="seta-administrator-avatar">{initials}</span>
                        <strong>{admin.name} {admin.surname}</strong>
                      </div>
                    </td>
                    <td>{admin.email}</td>
                    <td>{admin.phone || 'Not provided'}</td>
                    <td><span className={`seta-status ${admin.isActive ? 'active' : 'inactive'}`}>{admin.isActive ? 'Active' : 'Inactive'}</span></td>
                    <td>{formatDate(admin.lastLogin)}</td>
                    <td>{formatDate(admin.createdAt)}</td>
                    <td>
                      <div className="seta-row-actions">
                        <button type="button" className="secondary-btn" onClick={() => openEdit(admin)} disabled={actionLoading}>Edit</button>
                        <button type="button" className="secondary-btn" onClick={() => toggleStatus(admin)} disabled={actionLoading}>{admin.isActive ? 'Deactivate' : 'Reactivate'}</button>
                        <button type="button" className="danger-btn" onClick={() => removeAdmin(admin)} disabled={actionLoading}>Remove</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <Drawer title="Create SETA Administrator" open={drawerOpen} onClose={() => setDrawerOpen(false)} width={640}>
        <UserForm roleOverride="seta-admin" onCancel={() => setDrawerOpen(false)} onCreated={handleCreated} />
      </Drawer>

      <Drawer title="Edit SETA Administrator" open={editDrawerOpen} onClose={() => setEditDrawerOpen(false)} width={640}>
        {selectedAdmin && (
          <EditSetaAdminForm
            admin={selectedAdmin}
            saving={actionLoading}
            error={editError}
            onCancel={() => setEditDrawerOpen(false)}
            onSave={saveEdit}
          />
        )}
      </Drawer>
    </div>
  )
}

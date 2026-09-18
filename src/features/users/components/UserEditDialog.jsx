import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../../i18n/LanguageContext'

export default function UserEditDialog({ user, roles = [], onSave, onAssignRole, onClose }) {
  const { t } = useLanguage()
  const isSetaAdmin = localStorage.getItem('digifikile-role') === 'seta-admin'
  const dialog = useRef(null)
  const [form, setForm] = useState({
    name: user.name || '', email: user.email || '', phone: user.phone || '', address: user.address || '',
    roleId: user.roleId ? String(user.roleId) : '', status: user.status || 'Active',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => { dialog.current.showModal() }, [])

  async function submit(event) {
    event.preventDefault()
    if (!form.name.trim()) return setError(t('userList', 'nameRequired'))
    setSaving(true); setError('')
    try {
      await onSave(user.id, { name: form.name.trim(), email: isSetaAdmin ? form.email.trim() : undefined, phone: form.phone, address: form.address, status: form.status })
      if (form.roleId && Number(form.roleId) !== Number(user.roleId) && onAssignRole) await onAssignRole(user.id, Number(form.roleId))
      onClose()
    } catch (err) { setError(err.message || String(err)) }
    finally { setSaving(false) }
  }

  return <dialog ref={dialog} className="um-dialog" aria-labelledby="um-edit-title" onCancel={event => { event.preventDefault(); if (!saving) onClose() }}>
    <form onSubmit={submit}>
      <h2 id="um-edit-title">{t('userList', 'editUser')}</h2>
      {error && <p className="um-error" role="alert">{error}</p>}
      <fieldset disabled={saving} className="um-edit-fields">
        <label>{t('userList', 'fullName')}<input className="input" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
        <label>{t('userList', 'email')}<input className="input" type="email" value={form.email} disabled={!isSetaAdmin} onChange={e => setForm({ ...form, email: e.target.value })} title={isSetaAdmin ? undefined : "Email changes are not supported by the current System Admin user-update contract."} /></label>
        <label>Phone<input className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>
        <label>Address<input className="input" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></label>
        {!isSetaAdmin && <label>{t('userList', 'role')}<select className="input" value={form.roleId} onChange={e => setForm({ ...form, roleId: e.target.value })}><option value="">Unassigned</option>{roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}</select></label>}
        <label>{t('userList', 'status')}<select className="input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option value="Active">{t('common', 'active')}</option><option value="Inactive">{t('common', 'inactive')}</option></select></label>
      </fieldset>
      <div className="um-form-actions"><button type="button" className="um-button" disabled={saving} onClick={onClose}>{t('common', 'cancel')}</button><button type="submit" className="um-button um-primary" disabled={saving}>{saving ? 'Saving…' : t('userDetail', 'saveChanges')}</button></div>
    </form>
  </dialog>
}

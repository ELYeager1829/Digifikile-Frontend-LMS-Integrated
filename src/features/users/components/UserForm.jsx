/**
 * @file UserForm.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * WHAT THIS FILE IS:
 *   UserForm.jsx is the users presentational UI for DigiFikile LMS. It belongs to the users feature, which covers user administration, roles, and permissions. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   features/users/components/ keeps UI that belongs only to the users domain beside that domain. This preserves feature isolation and prevents shared folders from filling with one-off LMS screens.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Keep this component as a mostly dumb view: receive data, callbacks, status flags, and labels through props; call a feature hook only at a clear container boundary.
 *   - Document the expected prop shape when implemented, validate optional values, and render stable keys when mapping DTO-derived collections.
 *   - Use semantic controls, associated labels, correct button types, keyboard support, and aria attributes only where native HTML does not express the meaning.
 *   - Use responsive Tailwind classes and content-driven sizing; avoid fixed widths that break on phones or translated copy.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not call raw Axios, import lib/api.js, mutate props, or hide side effects inside rendering.
 *   - Do not reach into another feature’s internal folders. A users button must not directly issue another domain’s HTTP request; coordinate through page composition, a dedicated workflow hook, or approved public feature APIs.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - features/users/hooks/* — supplies data, status, and callbacks.
 *   - features/users/index.js — exposes approved components to pages.
 *   - services/* — reached through hooks, never imported directly here.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   This module participates in user administration, roles, and permissions. The .NET API remains authoritative for validation, permissions, persistence, and business rules. Frontend code presents those outcomes, sends DTO-shaped requests through services, and must handle ProblemDetails/validation failures without assuming the browser is trusted.
 *
 * @example
 *   // <UserForm data={viewModel} loading={loading} error={error} onRetry={refetch} />
 */

// Default export: render this component through its owning page/feature; keep its props and UI responsibility focused.
import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { provisionSetaAdministrator } from '../../../services/systemAdminService'

const SETA_OPTIONS = [ 'MICT SETA', 'W&RSETA', 'SERVICES SETA', 'ETDP SETA' ]

export default function UserForm({ onCancel, onCreated, roleOverride }) {
  const { create } = useUsers()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', contactNumber: '', seta: SETA_OPTIONS[0], status: 'active' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [stage, setStage] = useState('form') // form | confirm | success
  const [pending, setPending] = useState(null)
  const [provisionResult, setProvisionResult] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim()) e.lastName = 'Last name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.contactNumber.trim()) e.contactNumber = 'Contact number is required'
    else if (!/^\+?[0-9\s\-()]{7,20}$/.test(form.contactNumber)) e.contactNumber = 'Enter a valid contact number'
    if (!form.seta) e.seta = 'Select a Sector Authority'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})
    const eobj = validate()
    if (Object.keys(eobj).length) return setErrors(eobj)

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      username: form.email.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      seta: form.seta,
      role: roleOverride || 'seta-admin',
      status: form.status || 'active',
    }
    setPending(payload)
    setStage('confirm')
  }

  const handleConfirm = async () => {
    if (!pending) return
    setSubmitting(true)
    setErrors({})
    try {
      const created = roleOverride === 'seta-admin'
        ? await provisionSetaAdministrator({
            name: pending.firstName,
            surname: pending.lastName,
            email: pending.email,
            phone: pending.contactNumber,
            address: null,
            permissions: [],
          })
        : await create(pending)

      setProvisionResult(created)
      setSuccess(created?.emailStatus || 'SETA Administrator created successfully.')
      setStage('success')
      if (onCreated) await onCreated(created)
    } catch (err) {
      const msg = err?.message || 'Unable to create user.'
      if (err.code === 'DUP_EMAIL') setErrors({ email: 'Email already exists' })
      else if (err.code === 'DUP_USERNAME') setErrors({ username: 'Username already exists' })
      else setErrors({ form: msg })
      setStage('form')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="seta-form-container p-4">
      {stage === 'form' && (
        <form onSubmit={handleSubmit} className="seta-form-content">
          {errors.form && <div className="error">{errors.form}</div>}
          {success && <div className="success">{success}</div>}

          <div className="seta-form-header">
            <div>
              <h3>Identity & Institutional Affiliation</h3>
              <p className="muted">Enter verified delegate details for national accreditation credentials.</p>
            </div>
            <div className="form-badge">FORM-ST-05</div>
          </div>

          <div className="seta-form-grid">
            <div>
              <label className="field-label">First name <span className="required">*</span></label>
              <input value={form.firstName} onChange={(e) => setForm((s) => ({ ...s, firstName: e.target.value }))} className="auth-input" />
              {errors.firstName && <small className="field-error">{errors.firstName}</small>}
            </div>

            <div>
              <label className="field-label">Last name <span className="required">*</span></label>
              <input value={form.lastName} onChange={(e) => setForm((s) => ({ ...s, lastName: e.target.value }))} className="auth-input" />
              {errors.lastName && <small className="field-error">{errors.lastName}</small>}
            </div>

            <div>
              <label className="field-label">Email address <span className="required">*</span></label>
              <input value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} className="auth-input" />
              {errors.email && <small className="field-error">{errors.email}</small>}
            </div>

            <div>
              <label className="field-label">Username</label>
              <input value={form.email.trim().toLowerCase()} disabled className="auth-input seta-input-locked" />
              <div className="role-desc">SETA Administrators sign in with their email address.</div>
            </div>

            <div>
              <label className="field-label">Contact Number <span className="required">*</span></label>
              <input value={form.contactNumber} onChange={(e) => setForm((s) => ({ ...s, contactNumber: e.target.value }))} className="auth-input" />
              {errors.contactNumber && <small className="field-error">{errors.contactNumber}</small>}
            </div>

            <div>
              <label className="field-label">Sector Authority / Organization <span className="required">*</span></label>
              <select value={form.seta} onChange={(e) => setForm((s) => ({ ...s, seta: e.target.value }))} className="auth-input">
                {SETA_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.seta && <small className="field-error">{errors.seta}</small>}
            </div>

            <div>
              <label className="field-label">Assigned Role</label>
              <div className="role-locked-wrap">
                <input value={'SETA Administrator'} disabled className="auth-input seta-input-locked" />
                <span className="role-lock" aria-hidden>🔒</span>
              </div>
              <div className="role-desc">SETA Administrator — delegated authority to manage SETA-level accreditation and delegate access.</div>
            </div>

            <div>
              <label className="field-label">Initial Account Status</label>
              <select value={form.status} disabled className="auth-input seta-input-locked">
                <option value="active">Active (Invitation sent immediately)</option>
              </select>
            </div>
          </div>

          <div className="confirm-card">
            <div className="confirm-left">
              <div className="shield">🔰</div>
            </div>
            <div className="confirm-right">
              <div className="confirm-title">Confirm Authority Provisioning</div>
              <div className="confirm-copy">You are about to grant SETA Administrator access to the person entered above for the selected Sector Authority. An activation email with secure setup instructions will be dispatched.</div>
            </div>
          </div>

          <div className="drawer-actions">
            <button type="button" className="secondary-btn" onClick={onCancel} disabled={submitting}>Cancel</button>
            <button type="submit" className="primary-btn" disabled={submitting}>{submitting ? 'Preparing…' : 'Continue'}</button>
          </div>
        </form>
      )}

      {stage === 'confirm' && pending && (
        <div className="space-y-4">
          <h3>Confirm Authority Provisioning</h3>
          <div className="confirm-note">
            <div style={{width:36, height:36, borderRadius:8, background:'#e6f6ff', display:'flex', alignItems:'center', justifyContent:'center'}}>
              i
            </div>
            <div>
              You are about to grant SETA Administrator access to <strong>{pending.firstName} {pending.lastName}</strong> for <strong>{pending.seta}</strong>. An activation email with secure MFA setup instructions will be dispatched immediately.
            </div>
          </div>
          <div className="confirm-panel">
            <div className="confirm-row"><strong>Name:</strong> {pending.firstName} {pending.lastName}</div>
            <div className="confirm-row"><strong>Email:</strong> {pending.email}</div>
            <div className="confirm-row"><strong>Username:</strong> {pending.username}</div>
            <div className="confirm-row"><strong>SETA:</strong> {pending.seta}</div>
            <div className="confirm-row"><strong>Role:</strong> SETA Administrator</div>
            <div className="confirm-row"><strong>Initial Status:</strong> {pending.status}</div>
          </div>
          {errors.form && <div className="error">{errors.form}</div>}
          <div className="flex items-center gap-2">
            <button type="button" className="primary-btn" onClick={handleConfirm} disabled={submitting}>{submitting ? 'Creating…' : 'Confirm & Create Account'}</button>
            <button type="button" className="secondary-btn" onClick={() => setStage('form')} disabled={submitting}>Back</button>
          </div>
        </div>
      )}

      {stage === 'success' && (
        <div className="space-y-3">
          <div className="success">{success}</div>
          <div className="panel">
            <h4>Administrator</h4>
            <div className="confirm-row"><strong>Name:</strong> {pending.firstName} {pending.lastName}</div>
            <div className="confirm-row"><strong>Email:</strong> {pending.email}</div>
            <div className="confirm-row"><strong>Username:</strong> {pending.username}</div>
            <div className="confirm-row"><strong>SETA:</strong> {pending.seta}</div>
            <div className="confirm-row"><strong>Status:</strong> {pending.status}</div>
            {provisionResult?.temporaryPassword && (
              <div className="confirm-row">
                <strong>Temporary password:</strong> {provisionResult.temporaryPassword}
                <div className="field-error">The invitation email failed. Hand this password to the SETA Administrator securely.</div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="primary-btn" onClick={onCancel}>Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

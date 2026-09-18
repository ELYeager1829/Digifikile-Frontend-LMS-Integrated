import AppLayout from '../components/layout/AppLayout'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserSwitch } from '../features/users/components/UserPresentation'
import '../features/users/styles/user-management.css'
import { useUsers } from '../features/users/hooks/useUsers'
import { AVAILABLE_USER_ROLES } from '../features/users/constants/roles'
import { ROUTES } from '../constants/routes'
import { useLanguage } from '../i18n/LanguageContext'

function Checkbox({ label, checked, onChange, disabled = false }) {
  return (
    <label className="um-checkbox">
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  )
}

export default function AddUserPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { createUser } = useUsers()
  const isSetaAdmin = localStorage.getItem('digifikile-role') === 'seta-admin'
  const allowedRoles = isSetaAdmin ? [{ value: 'student', label: 'Student' }] : AVAILABLE_USER_ROLES
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    faculty: '',
    department: '',
    roles: [],
    status: 'Active',
    autoGeneratePassword: false,
    permissions: {
      courseManagement: false,
      studentRecords: false,
      gradeBook: false,
      reports: false,
      systemSettings: false,
      userManagement: false,
      contentUpload: false,
      announcementManagement: false,
    },
  })

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function togglePermission(key, value) {
    setForm((f) => ({ ...f, permissions: { ...f.permissions, [key]: value } }))
  }

  function toggleRole(role, selected) {
    setForm((current) => ({
      ...current,
      roles: selected
        ? [...current.roles, role]
        : current.roles.filter((value) => value !== role),
    }))
  }

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = t('userManagement', 'errors.firstNameRequired')
    if (!form.lastName.trim()) e.lastName = t('userManagement', 'errors.lastNameRequired')
    if (!form.email.trim() || !form.email.includes('@')) e.email = t('userManagement', 'errors.emailRequired')
    if (!isSetaAdmin && !form.faculty) e.faculty = t('userManagement', 'errors.facultyRequired')
    if (!isSetaAdmin && !form.department) e.department = t('userManagement', 'errors.departmentRequired')
    if (!isSetaAdmin && form.roles.length === 0) e.role = t('userManagement', 'errors.roleRequired')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const payload = {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        faculty: form.faculty,
        department: form.department,
        role: isSetaAdmin ? 'student' : form.roles[0],
        roles: isSetaAdmin ? ['student'] : form.roles,
        status: form.status,
        autoGeneratePassword: form.autoGeneratePassword,
        permissions: form.permissions,
      }
      const created = await createUser(payload)
      navigate(ROUTES.USER_DETAIL(created.id))
    } catch (err) {
      setSubmitError(err.message || String(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AppLayout section={t('userManagement', 'title')}>
      <div className="um-page">
      <div className="um-heading">
        <div>
          <nav className="um-breadcrumb" aria-label="Breadcrumb"><Link to={ROUTES.USERS}>{t('userManagement', 'title')}</Link><span aria-hidden="true">›</span><span>{t('userManagement', 'addNewUser')}</span></nav>
          <h1>{t('userManagement', 'addNewUser')}</h1>
          <p>{t('userManagement', 'addNewUserSubtitle')}</p>
        </div>
      </div>

      <form onSubmit={handleCreate} className="um-card um-form">
        {submitError && <p className="um-error" role="alert">{submitError}</p>}
        <fieldset disabled={submitting} style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>
        <div className="um-form-grid">
          <div>
            <label htmlFor="um-firstName">{t('userManagement', 'firstName')}</label>
            <input id="um-firstName" required className="input" value={form.firstName} onChange={(e) => updateField('firstName', e.target.value)} />
            {errors.firstName && <div className="field-error">{errors.firstName}</div>}
          </div>
          <div>
            <label htmlFor="um-lastName">{t('userManagement', 'lastName')}</label>
            <input id="um-lastName" required className="input" value={form.lastName} onChange={(e) => updateField('lastName', e.target.value)} />
            {errors.lastName && <div className="field-error">{errors.lastName}</div>}
          </div>

          <div>
            <label htmlFor="um-email">{t('userManagement', 'emailAddress')}</label>
            <input id="um-email" type="email" required className="input" value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder={t('userManagement', 'emailPlaceholder')} />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="um-phone">{t('userManagement', 'phoneNumber')}</label>
            <input id="um-phone" type="tel" className="input" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder={t('userManagement', 'phonePlaceholder')} />
          </div>

          <div>
            <label htmlFor="um-faculty">{t('userManagement', 'faculty')}</label>
            <select id="um-faculty" required={!isSetaAdmin} className="input" value={form.faculty} onChange={(e) => updateField('faculty', e.target.value)}>
              <option value="">{t('userManagement', 'selectFaculty')}</option>
              <option>Information Technology</option>
              <option>Telecommunications</option>
              <option>Electronics</option>
              <option>Advertising and Film</option>
              <option>Electronic Media</option>
            </select>
            {errors.faculty && <div className="field-error">{errors.faculty}</div>}
          </div>

          <div>
            <label htmlFor="um-department">{t('userManagement', 'department')}</label>
            <select id="um-department" required={!isSetaAdmin} className="input" value={form.department} onChange={(e) => updateField('department', e.target.value)}>
              <option value="">{t('userManagement', 'selectDepartment')}</option>
              <option>Software Development</option>
              <option>Cybersecurity</option>
              <option>IT Support</option>
              <option>Data Analytics</option>
              <option>Network Engineering</option>
              <option>Signal Distribution</option>
              <option>Satellite Communications</option>
              <option>Electronics n Manufacturing</option>
              <option>Repair n Maintenance</option>
              <option>Security Systems</option>
              <option>Digital Marketing</option>
              <option>Media Planning</option>
              <option>Brand Strategy</option>
              <option>Graphic Design</option>
              <option>Video/Film Production</option>
              <option>Animation</option>
              <option>Broadcasting</option>
              <option>Photography</option>
            </select>
            {errors.department && <div className="field-error">{errors.department}</div>}
          </div>

          <fieldset className="um-role-selection">
            <legend>{t('userManagement', 'role')} *</legend>
            <div className="um-role-options">
              {allowedRoles.map(({ value, label }) => (
                <label className="um-role-option" key={value}>
                  <input
                    type="checkbox"
                    value={value}
                    checked={isSetaAdmin ? value === 'student' : form.roles.includes(value)}
                    disabled={isSetaAdmin}
                    onChange={(event) => toggleRole(value, event.target.checked)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            {errors.role && <div className="field-error">{errors.role}</div>}
          </fieldset>

          <div style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="um-status">{t('userManagement', 'status')}</label>
            <select id="um-status" className="input" value={form.status} onChange={(e) => updateField('status', e.target.value)}>
              <option value="Active">{t('common', 'active')}</option>
              <option value="Inactive">{t('common', 'inactive')}</option>
            </select>
          </div>
        </div>

        <div className="um-form-section">
          <h3>{t('userManagement', 'assignedPermissions')}</h3>
          {isSetaAdmin && <p className="um-muted">Learners receive the Student role only. Elevated roles and system permissions are controlled by System Administrators.</p>}
          <div className="um-checkbox-grid" aria-disabled={isSetaAdmin}>
            <Checkbox label={t('userManagement', 'permissions.courseManagement')} checked={form.permissions.courseManagement} disabled={isSetaAdmin} onChange={(v) => togglePermission('courseManagement', v)} />
            <Checkbox label={t('userManagement', 'permissions.systemSettings')} checked={form.permissions.systemSettings} disabled={isSetaAdmin} onChange={(v) => togglePermission('systemSettings', v)} />
            <Checkbox label={t('userManagement', 'permissions.studentRecords')} checked={form.permissions.studentRecords} disabled={isSetaAdmin} onChange={(v) => togglePermission('studentRecords', v)} />
            <Checkbox label={t('userManagement', 'permissions.userManagement')} checked={form.permissions.userManagement} disabled={isSetaAdmin} onChange={(v) => togglePermission('userManagement', v)} />
            <Checkbox label={t('userManagement', 'permissions.gradeBook')} checked={form.permissions.gradeBook} disabled={isSetaAdmin} onChange={(v) => togglePermission('gradeBook', v)} />
            <Checkbox label={t('userManagement', 'permissions.contentUpload')} checked={form.permissions.contentUpload} disabled={isSetaAdmin} onChange={(v) => togglePermission('contentUpload', v)} />
            <Checkbox label={t('userManagement', 'permissions.reports')} checked={form.permissions.reports} disabled={isSetaAdmin} onChange={(v) => togglePermission('reports', v)} />
            <Checkbox label={t('userManagement', 'permissions.announcementManagement')} checked={form.permissions.announcementManagement} disabled={isSetaAdmin} onChange={(v) => togglePermission('announcementManagement', v)} />
          </div>
        </div>

        <section className="um-form-section">
          <h3>{t('userManagement', 'securityCredentials')}</h3>
          <div className="um-permission-row">
            <div><strong>{t('userManagement', 'autoGeneratePassword')}</strong><p className="um-muted">Generate a temporary password for the new user.</p></div>
            <UserSwitch
              label={t('userManagement', 'autoGeneratePassword')}
              checked={isSetaAdmin ? true : form.autoGeneratePassword}
              disabled={isSetaAdmin}
              onChange={(event) => updateField('autoGeneratePassword', event.target.checked)}
            />
          </div>
        </section>
        </fieldset>
        <div className="um-form-actions">
          <button disabled={submitting} type="button" onClick={() => navigate(ROUTES.USERS)} className="um-button">{t('userManagement', 'cancel')}</button>
          <button disabled={submitting} type="submit" className="um-button um-primary">{submitting ? t('userManagement', 'creating') : t('userManagement', 'createUser')}</button>
        </div>
      </form>
      </div>
    </AppLayout>
  )
}

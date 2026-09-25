/**
 * @file RoleAssignment.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * WHAT THIS FILE IS:
 *   RoleAssignment.jsx is the users presentational UI for DigiFikile LMS. It belongs to the users feature, which covers user administration, roles, and permissions. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
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
 *   // <RoleAssignment data={viewModel} loading={loading} error={error} onRetry={refetch} />
 */

// Default export: render this component through its owning page/feature; keep its props and UI responsibility focused.
import { useMemo, useState } from 'react'
import Button from '../../../components/ui/Button'
import { useUsers } from '../../users/hooks/useUsers'
import { useLanguage } from '../../../i18n/LanguageContext'

export default function RoleAssignment() {
  const { t } = useLanguage()
  const { users: rows, updateUser } = useUsers()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Learner')

  const counts = useMemo(() => {
    return rows.reduce((acc, r) => {
      acc[r.role] = (acc[r.role] || 0) + 1
      return acc
    }, {})
  }, [rows])

  function handleAssign(e) {
    e.preventDefault()
    const idx = rows.findIndex((r) => r.email === email.trim())
    if (idx === -1) {
      alert(t('userManagement', 'userNotFound'))
      return
    }
    updateUser(rows[idx].id, { role }).then(() => alert(t('userManagement', 'roleUpdated'))).catch((e) => alert(String(e)))
    setEmail('')
    alert(t('userManagement', 'roleUpdated'))
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>{t('userManagement', 'roleAssignment')}</h3>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div>
              <div className="eyebrow">{t('userManagement', 'admins')}</div>
              <strong>{counts.Admin ?? 0}</strong>
            </div>
            <div>
              <div className="eyebrow">{t('userManagement', 'instructors')}</div>
              <strong>{counts.Instructor ?? 0}</strong>
            </div>
            <div>
              <div className="eyebrow">{t('userManagement', 'learners')}</div>
              <strong>{counts.Learner ?? 0}</strong>
            </div>
          </div>
        </div>

        <form onSubmit={handleAssign} style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <input placeholder={t('userManagement', 'userEmail')} value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="input">
            <option>Admin</option>
            <option>Instructor</option>
            <option>Learner</option>
          </select>
          <Button type="submit">{t('userManagement', 'assignRole')}</Button>
        </form>
      </div>
    </div>
  )
}

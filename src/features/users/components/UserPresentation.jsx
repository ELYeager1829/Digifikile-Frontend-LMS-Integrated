import { useState } from 'react'

export const permissionKeys = ['courseManagement', 'studentRecords', 'gradeBook', 'reports', 'systemSettings', 'userManagement', 'contentUpload', 'announcementManagement']

export function UserAvatar({ user, large = false }) {
  const [failed, setFailed] = useState(false)
  const src = user.avatarUrl || user.avatar
  return <span className={`um-avatar ${large ? 'um-avatar-large' : ''}`}>
    {src && !failed ? <img src={src} alt="" onError={() => setFailed(true)} /> : String(user.name || '?').trim().split(/\s+/).slice(0, 2).map(n => n[0]).join('')}
  </span>
}

export function UserPill({ value }) {
  return <span className={`um-pill um-pill-${String(value || '').toLowerCase()}`}>{value || 'Not provided'}</span>
}

export function UserIcon({ type }) {
  const paths = {
    filter: <path d="M3 5h18l-7 8v6l-4-2v-4z" />,
    view: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    more: <><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></>,
    person: <><circle cx="12" cy="7" r="3" /><path d="M5 21v-3a7 7 0 0 1 14 0v3" /></>,
    shield: <><path d="m12 3 8 4v6c0 5-8 8-8 8s-8-3-8-8V7z" /><path d="m8 12 3 3 5-6" /></>,
    account: <><circle cx="12" cy="12" r="4" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" /></>,
  }
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}

export function UserSwitch({ label, checked, disabled, onChange }) {
  return <input className="um-switch" type="checkbox" role="switch" aria-label={label} checked={checked} disabled={disabled} onChange={onChange} />
}

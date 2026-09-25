import { useEffect, useMemo, useState } from 'react'
import Button from '../../../components/ui/Button'
import { Search, UserIcon, MessagesIcon } from '../../../components/ui/Icons'
import { complaintService } from '../../../services/complaintService'
import { complaintDemoService } from '../data/complaintSamples'
import '../styles/complaints.css'

const STATUSES = { Open: 'Open', InReview: 'Under Review', Resolved: 'Resolved', Dismissed: 'Dismissed' }
const stamp = value => value ? new Date(value.endsWith('Z') || /[+-]\d\d:\d\d$/.test(value) ? value : value + 'Z').toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' }) : 'Not provided'
const failure = error => error.response?.data?.error || error.response?.data?.title || error.message || 'Unable to load complaints.'
const Badge = ({ value }) => <span className={`cmp-badge cmp-${value?.toLowerCase()}`}><i />{STATUSES[value] || value || 'Not provided'}</span>

export default function SystemAdminComplaints({ demo = false }) {
  const service = demo ? complaintDemoService : complaintService
  const [complaints, setComplaints] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [detail, setDetail] = useState(null)
  const [status, setStatus] = useState('All')
  const [query, setQuery] = useState('')
  const [priority, setPriority] = useState('')
  const [category, setCategory] = useState('')
  const [days, setDays] = useState('')
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [error, setError] = useState('')
  const [detailError, setDetailError] = useState('')
  const [revision, setRevision] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    service.list(controller.signal).then(items => {
      if (!controller.signal.aborted) setComplaints(items)
    }).catch(err => {
      if (!controller.signal.aborted) setError(failure(err))
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false)
    })
    return () => controller.abort()
  }, [revision, service])

  const counts = useMemo(() => Object.fromEntries(Object.keys(STATUSES).map(s => [s, complaints.filter(c => c.status === s).length])), [complaints])
  const categories = useMemo(() => [...new Set(complaints.map(c => c.category).filter(Boolean))].sort(), [complaints])
  const visible = useMemo(() => complaints.filter(c => {
    const text = query.trim().toLowerCase()
    return (status === 'All' || c.status === status)
      && (!priority || c.priority === priority)
      && (!category || c.category === category)
      && (!days || new Date(c.createdAt.endsWith('Z') ? c.createdAt : c.createdAt + 'Z').getTime() >= (demo ? Date.parse('2024-10-18T21:59:59Z') : Date.now()) - Number(days) * 86400000)
      && (!text || [`CMP-${c.id}`, c.userId, c.userName, c.email, c.subject, c.description, c.category].join(' ').toLowerCase().includes(text))
  }), [complaints, status, query, priority, category, days, demo])

  // Keep an explicitly selected complaint open when its status changes or a filter hides it.
  useEffect(() => {
    if (selectedId === null && visible.length) setSelectedId(visible[0].id)
  }, [visible, selectedId])

  useEffect(() => {
    if (selectedId === null) return
    const controller = new AbortController()
    setDetail(null)
    setDetailError('')
    setDetailLoading(true)
    service.detail(selectedId, controller.signal).then(value => {
      if (!controller.signal.aborted) setDetail(value)
    }).catch(err => {
      if (!controller.signal.aborted) setDetailError(failure(err))
    }).finally(() => {
      if (!controller.signal.aborted) setDetailLoading(false)
    })
    return () => controller.abort()
  }, [selectedId, revision, service])

  const saved = value => {
    setDetail(current => current?.id === value.id ? value : current)
    setComplaints(items => items.map(c => c.id === value.id ? value : c))
  }

  return (
    <section className="cmp-page" aria-labelledby="cmp-title">
      <header className="cmp-heading">
        <div><div className="cmp-breadcrumb">USER SUPPORT <span aria-hidden="true">›</span> <strong>COMPLAINTS MANAGEMENT</strong></div>
          <h1 id="cmp-title">Complaints &amp; User Issue Resolution</h1>
          <p>Review, manage, track history, and respond directly to reported user issues across learning channels.</p>
        </div>
        <div className="cmp-queue"><span className="cmp-eyebrow">{demo ? 'SETA SLA GUARANTEE · SAMPLE' : 'COMPLAINT QUEUE'}</span>{demo && <strong>&lt; 4.0h Avg Resolution Time</strong>}<strong>{loading || error ? '—' : counts.Resolved + counts.Dismissed} resolved / closed</strong><small>{loading || error ? 'Awaiting queue data' : `${complaints.length} total complaints`}</small></div>
      </header>

      {demo && <p className="cmp-demo-note">Sample complaints · 18 October 2024 snapshot. Changes are saved in this browser.</p>}
      <div className="cmp-tabs" aria-label="Filter complaints by status">
        {['All', ...Object.keys(STATUSES)].map(s => <button type="button" key={s} className={`cmp-tab ${status === s ? 'is-active' : ''}`} onClick={() => setStatus(s)} aria-pressed={status === s}>
          {s !== 'All' && <i className={`cmp-dot cmp-${s.toLowerCase()}`} />}{s === 'All' ? 'All Complaints' : STATUSES[s]}<span>{loading || error ? '—' : s === 'All' ? complaints.length : counts[s]}</span>
        </button>)}
        <Button variant="ghost" size="sm" onClick={() => setRevision(r => r + 1)} disabled={loading}>Refresh</Button>
      </div>

      <div className="cmp-workspace">
        <aside className="cmp-list-column" aria-label="Complaint queue">
          <div className="cmp-panel cmp-filters">
            <div className="cmp-search"><Search size={18} /><input aria-label="Search complaints" placeholder="Search by ID, user, or keyword…" value={query} onChange={e => setQuery(e.target.value)} /></div>
            <div className="cmp-filter-grid">
              <label>Priority<select aria-label="Priority" value={priority} onChange={e => setPriority(e.target.value)}><option value="">All priorities</option>{['High', 'Medium', 'Low'].map(p => <option key={p}>{p}</option>)}</select></label>
              <label>Category<select aria-label="Category" value={category} onChange={e => setCategory(e.target.value)}><option value="">All categories</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
              <label>Date range<select aria-label="Date range" value={days} onChange={e => setDays(e.target.value)}><option value="">All dates</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option></select></label>
            </div>
          </div>
          {loading ? <div className="cmp-panel cmp-empty" role="status">Loading complaints…</div> : error ? <div className="cmp-panel cmp-error" role="alert">{error}<Button variant="outline" onClick={() => setRevision(r => r + 1)}>Retry</Button></div> : <>
            <p className="cmp-list-count" role="status">{visible.length} of {complaints.length} complaints</p>
            {visible.length === 0 && <div className="cmp-panel cmp-empty"><MessagesIcon size={28} /><h3>No complaints found</h3><p>{complaints.length ? 'Try a different search or filter.' : 'Reported complaints will appear here.'}</p></div>}
            {visible.map(c => <button type="button" key={c.id} className={`cmp-case ${selectedId === c.id ? 'is-selected' : ''}`} onClick={() => setSelectedId(c.id)} aria-pressed={selectedId === c.id}>
              <div className="cmp-case-top"><span className="cmp-id">#CMP-{c.id}</span><Badge value={c.priority} /><Badge value={c.status} /></div>
              <h3>{c.subject}</h3><p className="cmp-category">{c.category || 'Uncategorised'}</p>
              <div className="cmp-case-footer"><span><UserIcon size={15} color="currentColor" />{c.userName} <small>({c.studentNumber || c.role || 'User'})</small></span><time>{stamp(c.createdAt)}</time></div>
            </button>)}
            <div className="cmp-queue cmp-queue-footer"><strong>Queue overview</strong><span>{complaints.length - counts.Resolved - counts.Dismissed} complaints awaiting resolution</span></div>
          </>}
        </aside>
        <div className="cmp-detail-column" aria-live="polite" aria-busy={detailLoading}>
          {detailLoading ? <div className="cmp-panel cmp-empty">Loading complaint details…</div> : detailError ? <div className="cmp-panel cmp-error" role="alert">{detailError}<Button variant="outline" onClick={() => setRevision(r => r + 1)}>Retry</Button></div> : detail ? <ComplaintDetail key={detail.id} complaint={detail} onSaved={saved} service={service} demo={demo} /> : <div className="cmp-panel cmp-empty"><MessagesIcon size={32} /><h2>Select a complaint</h2><p>View the reported issue, review its history, and respond here.</p></div>}
        </div>
      </div>
    </section>
  )
}

function ComplaintDetail({ complaint: c, onSaved, service, demo }) {
  const [nextStatus, setNextStatus] = useState(c.status)
  const [response, setResponse] = useState(c.draft || '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => setNextStatus(c.status), [c.status])

  const submit = async (status, sendResponse = false) => {
    if (busy || (sendResponse && !response.trim())) return
    setBusy(true); setError(''); setMessage('')
    try {
      let updated
      if (sendResponse) {
        updated = await service.respond(c.id, response.trim(), status, c.version)
        setResponse('')
      } else {
        await service.updateStatus(c.id, status, c.version)
        updated = await service.detail(c.id)
      }
      onSaved(updated)
      setMessage(demo ? 'Sample changes saved locally. No notification was sent.' : sendResponse ? 'Response saved as resolution notes and the complaint status was updated.' : 'Complaint status updated successfully.')
    } catch (err) { setError(failure(err)) }
    finally { setBusy(false) }
  }

  return <>
    <article className="cmp-panel cmp-detail">
      <div className="cmp-detail-toolbar"><span className="cmp-id">#CMP-{c.id}</span><Badge value={c.priority} />
        <div className="cmp-status-controls"><select aria-label="Complaint status" value={nextStatus} disabled={busy} onChange={e => setNextStatus(e.target.value)}>{Object.entries(STATUSES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select><Button size="sm" disabled={busy || nextStatus === c.status} onClick={() => submit(nextStatus)}>Update Status</Button></div>
      </div>
      <h2>{c.subject}</h2><p className="cmp-eyebrow">{c.metadata || c.category || 'General'} · Submitted {stamp(c.createdAt)}</p>
      <dl className="cmp-user-summary">
        <div><dt>User</dt><dd><strong>{c.userName}</strong><small>{c.studentNumber || ('User #' + c.userId)}</small></dd></div>
        <div><dt>Email address</dt><dd>{c.email || 'Not provided'}{c.verified && <small className="cmp-verified">SSO Verified</small>}</dd></div>
        <div><dt>Contact number</dt><dd>{c.phone || 'Not provided'}{c.network && <small>{c.network}</small>}</dd></div>
        <div><dt>Role / institute</dt><dd>{c.role || 'Not provided'}{c.institute && <small>{c.institute}</small>}</dd></div>
      </dl>
      <h3 className="cmp-eyebrow">Reported statement &amp; error context</h3><div className="cmp-statement">{c.description || 'No description provided.'}</div>
    </article>
    <section className="cmp-panel cmp-history"><h2><MessagesIcon size={20} />Resolution Timeline &amp; Audit Trail</h2>
      {c.history?.length ? <ol>{c.history.map(event => <li key={event.id}><div className="cmp-event-heading"><h3>{event.eventType}</h3><time>{stamp(event.createdAt)}</time></div><p>{event.details}</p>{event.actor && <small>By {event.actor}</small>}</li>)}</ol> : <p className="cmp-muted">No history entries have been recorded for this complaint.</p>}
    </section>
    <section className="cmp-panel cmp-composer"><div className="cmp-composer-heading"><div><h2>Respond to Complaint</h2><p>{demo ? 'Preview an official response to the complainant. Sample responses are saved locally.' : 'Your response is saved to the complaint and sent as an in-app notification.'}</p></div><span className="cmp-delivery">{demo ? 'Sample response' : 'In-app notification'}</span></div>
      {error && <p className="cmp-error" role="alert">{error}</p>}{message && <p className="cmp-success" role="status">{message}</p>}
      <label className="cmp-eyebrow" htmlFor={`cmp-response-${c.id}`}>Official response / note</label>
      <textarea id={`cmp-response-${c.id}`} placeholder="Write a response to the complainant…" value={response} onChange={e => setResponse(e.target.value)} maxLength={5000} rows={7} disabled={busy} />
      <small className="cmp-character-count">{response.length} / 5000</small>
      <div className="cmp-response-actions"><Button disabled={busy || !response.trim()} onClick={() => submit('InReview', true)}>Send Response &amp; Mark In Progress</Button><Button variant="secondary" disabled={busy || !response.trim()} onClick={() => submit('Resolved', true)}>Send Response &amp; Resolve Complaint</Button></div>
    </section>
  </>
}

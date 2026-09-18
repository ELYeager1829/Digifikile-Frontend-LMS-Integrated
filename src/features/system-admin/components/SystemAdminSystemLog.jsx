import { useEffect, useMemo, useState } from 'react'
import Button from '../../../components/ui/Button'
import { fetchSystemLogs } from '../../../services/systemLogService'

function dateText(value) { return value ? new Date(value).toLocaleString('en-ZA') : 'Unknown time' }

export default function SystemAdminSystemLog() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const [range, setRange] = useState('')
  const [notice, setNotice] = useState('')

  async function refresh() {
    setLoading(true); setError(''); setNotice('')
    try { setEvents(await fetchSystemLogs()); setNotice('System log refreshed.') }
    catch (err) { setError(err.message || String(err)); setEvents([]) }
    finally { setLoading(false) }
  }

  useEffect(() => { refresh() }, [])

  const types = useMemo(() => [...new Set(events.map(e => e.resourceType).filter(Boolean))].sort(), [events])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const now = Date.now()
    return events.filter(event => {
      const searchText = [event.id, event.systemAdministratorName, event.action, event.resourceType, event.resourceId, event.description, event.ipAddress].join(' ').toLowerCase()
      const matchesQuery = !q || searchText.includes(q)
      const matchesType = !type || event.resourceType === type
      const created = event.createdAt ? new Date(event.createdAt).getTime() : 0
      const matchesRange = !range || (created && now - created <= Number(range) * 86400000)
      return matchesQuery && matchesType && matchesRange
    })
  }, [events, query, type, range])

  const totalToday = events.filter(e => e.createdAt && new Date(e.createdAt).toDateString() === new Date().toDateString()).length
  const userChanges = events.filter(e => e.resourceType === 'User').length
  const roleChanges = events.filter(e => /role|permission/i.test(e.action || '')).length

  function doExport() {
    const escape = value => `"${String(value ?? '').replaceAll('\"', '\"\"')}"`
    const rows = [
      ['Id', 'Timestamp', 'Administrator', 'Action', 'ResourceType', 'ResourceId', 'Description', 'IpAddress'],
      ...filtered.map(event => [event.id, event.createdAt, event.systemAdministratorName, event.action, event.resourceType, event.resourceId, event.description, event.ipAddress]),
    ]
    const blob = new Blob(['\uFEFF' + rows.map(row => row.map(escape).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a'); link.href = url; link.download = 'digifikile-system-log.csv'; link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setNotice(`Exported ${filtered.length} filtered audit records.`)
  }

  return <section className="syslog-page" aria-labelledby="syslog-title">
    <div className="syslog-breadcrumb">AUDIT &amp; SECURITY <span>›</span><strong>SYSTEM LOG</strong></div>
    <header className="syslog-heading">
      <div><h1 id="syslog-title">System Log &amp; Security<br />Audit Trail</h1><p>Review persisted administrative activity recorded by the DigiFikile backend.</p></div>
      <div className="syslog-actions"><Button variant="outline" onClick={refresh} disabled={loading}>Refresh Stream</Button><Button onClick={doExport} disabled={loading || !events.length} className="syslog-export">Export System Log</Button></div>
    </header>
    {error && <p className="um-error" role="alert">{error}</p>}
    <div className="syslog-stats">
      <article className="syslog-stat syslog-blue"><div><h2>Total logged events</h2><strong>{events.length}</strong><p>{totalToday} today</p></div></article>
      <article className="syslog-stat syslog-purple"><div><h2>User changes</h2><strong>{userChanges}</strong><p>Persisted audit records</p></div></article>
      <article className="syslog-stat syslog-blue"><div><h2>Role / permission events</h2><strong>{roleChanges}</strong><p>Access-control changes</p></div></article>
    </div>
    <section className="syslog-filters" aria-label="System log filters"><div className="syslog-filter-row">
      <label className="syslog-search"><input aria-label="Search system log" placeholder="Search by user, event ID, action, resource or IP…" value={query} onChange={e => setQuery(e.target.value)} /></label>
      <select aria-label="Resource type" value={type} onChange={e => setType(e.target.value)}><option value="">All Resource Types</option>{types.map(t => <option key={t}>{t}</option>)}</select>
      <select aria-label="Date range" value={range} onChange={e => setRange(e.target.value)}><option value="">All dates</option><option value="1">Last 24 hours</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select>
      <Button variant="link" size="sm" onClick={() => { setQuery(''); setType(''); setRange('') }}>Clear Filters</Button>
    </div><div className="syslog-active-filters"><span className="syslog-showing" role="status">Showing {filtered.length} of {events.length} recorded events</span></div></section>
    <div className="syslog-table-panel"><div className="syslog-table-scroll" role="region" aria-label="System log events" tabIndex={0}>
      <table><caption className="syslog-sr-only">Persisted system audit events</caption><thead><tr><th>Event ID &amp; Timestamp</th><th>Administrator</th><th>Action / Event</th><th>Resource / Details</th><th>IP Address</th></tr></thead><tbody>
        {loading && <tr><td colSpan="5" className="syslog-empty">Loading audit records…</td></tr>}
        {!loading && filtered.map(event => <tr key={event.id}><td><strong className="syslog-event-id">#LOG-{event.id}</strong><time dateTime={event.createdAt}>{dateText(event.createdAt)}</time></td><td><div className="syslog-user"><div><strong>{event.systemAdministratorName || 'System Administrator'}</strong><small className="syslog-admin-role">System Administrator</small></div></div></td><td><span className="syslog-event-badge">{event.action}</span></td><td className="syslog-event-details"><strong>{event.resourceType}{event.resourceId ? ` #${event.resourceId}` : ''}</strong>{event.description ? <><br />{event.description}</> : null}</td><td><span className="syslog-ip">{event.ipAddress || 'Not captured'}</span></td></tr>)}
        {!loading && !filtered.length && <tr><td colSpan="5" className="syslog-empty">No audit records match the selected filters.</td></tr>}
      </tbody></table>
    </div></div><p className="syslog-notice" role="status">{notice}</p>
  </section>
}

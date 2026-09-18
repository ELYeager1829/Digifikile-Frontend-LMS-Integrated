import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { fetchSetaAdministrators } from '../../../services/systemAdminService'
import { complaintService } from '../../../services/complaintService'
import { exportSystemLogs, fetchSystemLogsPage } from '../../../services/systemLogService'
import useCurrentUser from '../../auth/hooks/useCurrentUser'
import '../styles/system-admin-dashboard.css'
import Button from '../../../components/ui/Button'

function formatGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function formatLogWhen(value) {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleString()
}

export default function SystemAdminDashboard() {
  const navigate = useNavigate()
  const { user } = useCurrentUser()
  const userName = user?.fullName || [user?.name, user?.surname].filter(Boolean).join(' ').trim() || 'System Admin'
  const [setaAdmins, setSetaAdmins] = useState([])
  const [complaints, setComplaints] = useState([])
  const [logs, setLogs] = useState([])
  const [logTotal, setLogTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    Promise.all([
      fetchSetaAdministrators(1, 200),
      complaintService.list(),
      fetchSystemLogsPage(1, 50),
    ])
      .then(([adminResult, complaintResult, logResult]) => {
        if (!mounted) return
        setSetaAdmins(adminResult?.items || [])
        setComplaints(Array.isArray(complaintResult) ? complaintResult : [])
        setLogs(Array.isArray(logResult?.items) ? logResult.items : [])
        setLogTotal(logResult?.totalCount ?? 0)
        setLoadError('')
      })
      .catch((error) => {
        if (!mounted) return
        setLoadError(error?.response?.data?.error || error?.message || 'Some dashboard data could not be loaded.')
      })
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  const totalSeta = loading ? '…' : setaAdmins.filter((admin) => admin.isActive !== false).length
  const openComplaints = loading ? '…' : complaints.filter((item) => !['resolved', 'closed', 'dismissed'].includes(String(item.status || '').toLowerCase())).length
  const resolvedComplaints = loading ? '…' : complaints.filter((item) => ['resolved', 'closed', 'dismissed'].includes(String(item.status || '').toLowerCase())).length
  const systemLogEvents = loading ? '…' : logTotal
  const recentComplaints = [...complaints].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 4)
  const recentLogs = [...logs].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 6)

  return (
    <section className="system-admin-dashboard-page">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0 }}>{formatGreeting()}, {userName.split(' ')[0]}!</h1>
          <p style={{ margin: '6px 0 0 0', color: '#475569' }}>Here’s an overview of your system administration activities.</p>
          {loadError && <small role="alert" style={{ color: '#b91c1c' }}>{loadError}</small>}
        </div>
        <div style={{ textAlign: 'right', color: '#64748b' }}>
          <div>PRODUCTION NODE ZA-01</div>
          <div>{new Date().toLocaleString()}</div>
        </div>
      </header>

      <section className="kpi-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        <div className="card" style={{ padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 1px 2px rgba(2,6,23,0.06)' }}>
          <div style={{ fontSize: 12, color: '#334155' }}>SETA Administrators</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{totalSeta}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Active SETA administrator accounts</div>
        </div>
        <div className="card" style={{ padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 1px 2px rgba(2,6,23,0.06)' }}>
          <div style={{ fontSize: 12, color: '#334155' }}>Open Complaints</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{openComplaints}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Pending complaints requiring attention</div>
        </div>
        <div className="card" style={{ padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 1px 2px rgba(2,6,23,0.06)' }}>
          <div style={{ fontSize: 12, color: '#334155' }}>Resolved Complaints</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{resolvedComplaints}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Resolved complaint records</div>
        </div>
        <div className="card" style={{ padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 1px 2px rgba(2,6,23,0.06)' }}>
          <div style={{ fontSize: 12, color: '#334155' }}>System Log Events</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{systemLogEvents}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Persisted audit and log entries</div>
        </div>
      </section>

      <section className="quick-actions" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="primary-btn" onClick={() => navigate(ROUTES.SYSTEM_ADMIN_SETA_ADMINISTRATORS)}>Add SETA Administrator</button>
          <button className="secondary-btn" onClick={() => navigate(ROUTES.SYSTEM_ADMIN_COMPLAINTS)}>View Complaints</button>
          <button className="secondary-btn" onClick={() => navigate(ROUTES.SYSTEM_ADMIN_SYSTEM_LOG)}>View System Log</button>
          <Button variant="secondary" onClick={() => exportSystemLogs().catch(() => setLoadError('Unable to export the system audit log.'))}>Export System Audit</Button>
        </div>
      </section>

      <section className="main-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div>
          <section style={{ background: '#fff', padding: 16, borderRadius: 8, boxShadow: '0 1px 2px rgba(2,6,23,0.06)', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div><h3 style={{ margin: 0 }}>Recent User Complaints</h3><small style={{ color: '#64748b' }}>{openComplaints} Pending</small></div>
              <div><button onClick={() => navigate(ROUTES.SYSTEM_ADMIN_COMPLAINTS)} className="filter-btn">Filter</button></div>
            </div>
            <p style={{ color: '#64748b' }}>Latest issues recorded in the complaint service.</p>
            <div style={{ marginTop: 8 }}>
              <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr style={{ textAlign: 'left', color: '#0f172a' }}><th style={{ padding: '8px 6px' }}>Case ID</th><th style={{ padding: '8px 6px' }}>Subject</th><th style={{ padding: '8px 6px' }}>Reported By</th><th style={{ padding: '8px 6px' }}>Priority</th><th style={{ padding: '8px 6px' }}>Status</th></tr></thead>
                  <tbody>
                    {recentComplaints.length ? recentComplaints.map((complaint) => (
                      <tr key={complaint.id} style={{ borderTop: '1px solid #eef2f7' }}>
                        <td style={{ padding: '10px 6px' }}>{complaint.id}</td>
                        <td style={{ padding: '10px 6px' }}>{complaint.title}</td>
                        <td style={{ padding: '10px 6px' }}>{complaint.complainantName || complaint.complainantEmail || 'User'}</td>
                        <td style={{ padding: '10px 6px' }}><span style={{ padding: '4px 8px', borderRadius: 6, background: '#f8fafc' }}>{complaint.category || 'General'}</span></td>
                        <td style={{ padding: '10px 6px' }}>{complaint.status}</td>
                      </tr>
                    )) : <tr><td colSpan="5" style={{ padding: 12, color: '#64748b' }}>No complaints recorded.</td></tr>}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748b' }}>Showing {recentComplaints.length} of {complaints.length} complaints</span>
                <button className="inline-link" onClick={() => navigate(ROUTES.SYSTEM_ADMIN_COMPLAINTS)}>View all complaints →</button>
              </div>
            </div>
          </section>

          {/* No backend health/compliance endpoint exists yet, so this existing display stays unchanged. */}
          <section style={{ background: '#fff', padding: 16, borderRadius: 8, boxShadow: '0 1px 2px rgba(2,6,23,0.06)' }}>
            <h3 style={{ marginTop: 0 }}>System Health & Security Summary</h3>
            <p style={{ color: '#64748b' }}>Active cryptographic configurations, automated backup states, and authentication perimeter.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              <div style={{ padding: 12, background: '#f8fafc', borderRadius: 6 }}><div style={{ fontSize: 12, color: '#334155' }}>DHET Compliant</div><strong>Yes</strong></div>
              <div style={{ padding: 12, background: '#f8fafc', borderRadius: 6 }}><div style={{ fontSize: 12, color: '#334155' }}>MFA Enforcement</div><strong>Partial</strong></div>
              <div style={{ padding: 12, background: '#f8fafc', borderRadius: 6 }}><div style={{ fontSize: 12, color: '#334155' }}>DB Snapshot</div><strong>Daily</strong></div>
              <div style={{ padding: 12, background: '#f8fafc', borderRadius: 6 }}><div style={{ fontSize: 12, color: '#334155' }}>Encryption</div><strong>AES-256</strong></div>
            </div>
          </section>
        </div>

        <aside>
          {/* The backend does not currently model a SETA organisation/region on the administrator record. */}
          <section style={{ background: '#fff', padding: 16, borderRadius: 8, boxShadow: '0 1px 2px rgba(2,6,23,0.06)', marginBottom: 16 }}>
            <h4 style={{ marginTop: 0 }}>SETA Regional Distribution</h4>
            <div style={{ display: 'grid', gap: 8 }}>
              {['MICT SETA', 'W&RSETA', 'SERVICES SETA', 'ETDP SETA'].map((name, i) => (
                <div key={name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: '#f8fafc', borderRadius: 6 }}><span>{name}</span><strong>{5 - i}</strong></div>
              ))}
            </div>
          </section>

          <section style={{ background: '#fff', padding: 16, borderRadius: 8, boxShadow: '0 1px 2px rgba(2,6,23,0.06)' }}>
            <h4 style={{ marginTop: 0 }}>Audit Stream</h4>
            <div style={{ display: 'grid', gap: 10 }}>
              {recentLogs.length ? recentLogs.map((entry, idx) => (
                <div key={entry.id || idx} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: idx < 2 ? '#ef4444' : '#0ea5a0', marginTop: 6 }} />
                  <div><strong style={{ display: 'block' }}>{entry.systemAdministratorName || 'System Administrator'} — {entry.action}</strong><small style={{ color: '#64748b' }}>{entry.description || entry.resourceType || 'System activity'} • {formatLogWhen(entry.createdAt)}</small></div>
                </div>
              )) : <small style={{ color: '#64748b' }}>No persisted audit entries yet.</small>}
            </div>
            <div style={{ marginTop: 12 }}><button className="inline-link" onClick={() => navigate(ROUTES.SYSTEM_ADMIN_SYSTEM_LOG)}>Open full system log</button></div>
          </section>
        </aside>
      </section>
    </section>
  )
}

// Sample snapshot from the supplied System Log mockup; no production audit records.
export const systemLogSummary = [
  { label: 'Total logged events', value: '1,420,892', note: '+3,412 today', icon: 'file', tone: 'blue' },
  { label: 'Security warnings', value: '14', note: '2 require review', icon: 'warning', tone: 'purple' },
  { label: 'Failed auth attempts', value: '6', note: '3 locked IPs', icon: 'shield', tone: 'red' },
  { label: 'Active operator sessions', value: '28', note: '100% MFA enforced', icon: 'shield', tone: 'blue' },
]

export const systemLogEvents = [
  { id: 'LOG-99412', timestamp: '2024-10-18T10:32:15+02:00', user: 'Kagiso Maluleke', role: 'System Administrator', action: 'SETA Admin Account Created', type: 'Account', status: 'Success', details: 'Created account for b.zwane@wrseta.org.za (W&RSETA)', ip: '196.25.1.84', location: 'Johannesburg, ZA', icon: 'user' },
  { id: 'LOG-99411', timestamp: '2024-10-18T10:14:02+02:00', user: 'Kagiso Maluleke', role: 'System Administrator', action: 'Complaint Responded', type: 'Complaint', status: 'Success', details: 'Complaint #CMP-1048 formal response dispatched to learner', ip: '196.25.1.84', location: 'Johannesburg, ZA', icon: 'message' },
  { id: 'LOG-99410', timestamp: '2024-10-18T09:30:11+02:00', user: 'Kagiso Maluleke', role: 'System Administrator', action: 'MFA Authentication Verified', type: 'Authentication', status: 'Success', details: '6-digit TOTP verified for #SES-4412', ip: '196.25.1.84', location: 'Johannesburg, ZA', icon: 'key' },
  { id: 'LOG-99409', timestamp: '2024-10-18T09:28:45+02:00', user: 'Unknown User', role: 'Unauthenticated', action: 'Failed Login Attempt', type: 'Authentication', status: 'Failed', details: 'Invalid password provided for admin@digifikile.edu (3 consecutive failures)', ip: '102.132.8.21', location: 'Pretoria, ZA (Cloud gateway)', icon: 'lock' },
  { id: 'LOG-99408', timestamp: '2024-10-18T08:45:19+02:00', user: 'Noluthando Sithole', role: 'SETA Administrator', action: 'Certificate Batch Endorsed', type: 'Certificate', status: 'Success', details: '#CERT-MICT-2024-Q3 approved for 18 accredited learners', ip: '197.89.4.12', location: 'Durban, ZA', icon: 'award' },
  { id: 'LOG-99407', timestamp: '2024-10-18T07:15:30+02:00', user: 'Automated System', role: 'Cron Engine', action: 'Database Snapshot Backup', type: 'System', status: 'Success', details: 'Daily scheduled backup completed (SHA-256 verified, 18.4 GB compressed)', ip: '127.0.0.1', location: 'Internal Core Cluster', icon: 'cloud' },
]

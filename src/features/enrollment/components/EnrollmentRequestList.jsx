/**
 * @file EnrollmentRequestList.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Enrollment requests table (no AppLayout).
 */

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes'
import Button from '../../../components/ui/Button'

const initialData = [
  { id: 'L-84729', initials: 'JD', learner: 'Jane Doe', course: 'Advanced Data Science', date: 'Oct 24, 2023', status: 'Pending' },
  { id: 'L-84730', initials: 'MS', learner: 'Michael Smith', course: 'Intro to Cloud Computing', date: 'Oct 24, 2023', status: 'Pending' },
  { id: 'L-84715', initials: 'AJ', learner: 'Alice Johnson', course: 'UI/UX Design Fundamentals', date: 'Oct 23, 2023', status: 'Accepted' },
  { id: 'L-84701', initials: 'RB', learner: 'Robert Brown', course: 'Advanced Data Science', date: 'Oct 22, 2023', status: 'Declined' },
];

export default function EnrollmentRequestList() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(initialData);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Pending');

  const updateStatus = (id, status) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const visible = useMemo(() => requests.filter((request) => {
    const matchesQuery = `${request.learner} ${request.id}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (status === 'All Courses' || request.status === status);
  }), [query, requests, status]);

  return (
    <div className="enrollment-page admin-enrollment-page">
        <div className="enrollment-heading"><div><h1>Enrollment Requests</h1><p>Manage pending course enrollment applications.</p></div><div><Button type="button" variant="secondary">Export</Button><Button type="button">+ New Request</Button></div></div>
        <section className="enrollment-filter-card"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by learner name or ID..." aria-label="Search enrollment requests" /><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status"><option>Pending</option><option>Accepted</option><option>Declined</option></select><select defaultValue="All Courses" aria-label="Filter by course"><option>All Courses</option></select></section>
        <section className="enrollment-table-card"><div className="table-responsive"><table><thead><tr><th>Learner</th><th>Course</th><th>Request Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>{visible.map((request) => <tr key={request.id}><td><span className="learner-avatar">{request.initials}</span><strong>{request.learner}</strong><small>ID: {request.id}</small></td><td>{request.course}</td><td>{request.date}</td><td><span className={`enrollment-status ${request.status.toLowerCase()}`}>{request.status}</span></td><td><div className="enrollment-actions">{request.status === 'Pending' && <><Button type="button" variant="ghost" size="icon" onClick={() => updateStatus(request.id, 'Accepted')} aria-label="Accept request">✓</Button><Button type="button" variant="ghost" size="icon" onClick={() => updateStatus(request.id, 'Declined')} aria-label="Decline request">×</Button></>}<Button type="button" variant="ghost" size="icon" onClick={() => navigate(ROUTES.ENROLLMENT_REQUEST_DETAIL(request.id))} aria-label={`View ${request.learner}`}>◉</Button></div></td></tr>)}</tbody></table></div><div className="enrollment-footer"><span>Showing 1 to 4 of 24 entries</span><div><button type="button">Prev</button><button type="button" className="current">1</button><button type="button">2</button><button type="button">3</button><button type="button">Next</button></div></div></section>
      </div>
  );
}

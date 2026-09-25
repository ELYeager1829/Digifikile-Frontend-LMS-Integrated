/**
 * @file EnrollmentRequestDetail.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Single enrollment request detail (no AppLayout).
 */

import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes'
import Button from '../../../components/ui/Button'

const requestDetail = {
  id: 'L-87239',
  learner: 'Sarah Jenkins',
  email: 'sarah@example.student.com',
  phone: '+1 (555) 019-2834',
  faculty: 'Faculty of Arts & Sciences',
  requestDate: 'Oct 24, 2023 - 09:41 AM',
  courseCode: 'DS101',
  courseName: 'Introduction to Data Science',
  department: 'Department of Computer Science',
  credits: '3.0',
  term: 'Fall 2024',
  capacity: '42 / 50',
  prerequisites: 'Completed all prerequisite courses and has a strong academic background in statistics.',
};

export default function EnrollmentRequestDetail() {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const detail = {
    ...requestDetail,
    id: requestId || requestDetail.id,
  };

  return (
    <div className="enrollment-detail-page">
        <p className="enrollment-detail-intro">Review applicant details and course requirements before decision.</p>

        <div className="enrollment-detail-card">
          <div className="enrollment-detail-grid">
            <section className="enrollment-detail-panel">
              <div className="detail-panel-header">
                <span className="detail-panel-icon">◔</span>
                <h2>Learner Information</h2>
              </div>

              <div className="detail-profile-row">
                <div className="detail-avatar" aria-label="Learner avatar">
                  <span>SJ</span>
                </div>

                <div className="detail-profile-meta">
                  <h3>{detail.learner}</h3>
                  <p>ID: {detail.id}</p>
                </div>
              </div>

              <dl className="detail-meta-list">
                <div>
                  <dt>Email Address</dt>
                  <dd>{detail.email}</dd>
                </div>
                <div>
                  <dt>Phone Number</dt>
                  <dd>{detail.phone}</dd>
                </div>
                <div>
                  <dt>Current Faculty</dt>
                  <dd>{detail.faculty}</dd>
                </div>
                <div>
                  <dt>Request Date</dt>
                  <dd>{detail.requestDate}</dd>
                </div>
              </dl>
            </section>

            <section className="enrollment-detail-panel">
              <div className="detail-panel-header">
                <span className="detail-panel-icon">◔</span>
                <h2>Requested Course</h2>
              </div>

              <div className="course-summary-box">
                <div className="course-title-row">
                  <div>
                    <h3>{detail.courseName}</h3>
                    <p>{detail.courseCode}</p>
                  </div>
                </div>

                <div className="course-meta-grid">
                  <div>
                    <span>Department</span>
                    <strong>{detail.department}</strong>
                  </div>
                  <div>
                    <span>Credits</span>
                    <strong>{detail.credits}</strong>
                  </div>
                  <div>
                    <span>Term</span>
                    <strong>{detail.term}</strong>
                  </div>
                  <div>
                    <span>Current Capacity</span>
                    <strong>{detail.capacity}</strong>
                  </div>
                </div>

                <div className="course-prereq-box">
                  <span>Prerequisites</span>
                  <strong>{detail.prerequisites}</strong>
                </div>

                <div className="course-note-box">
                  <span>Applicant Note</span>
                  <p>
                    “I have completed all prerequisites during the summer semester and am very interested
                    in pursuing this course. I am confident that my academic background and previous
                    coursework will support my success in this program.”
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="enrollment-detail-actions">
            <Button type="button" variant="outline" onClick={() => navigate(ROUTES.ENROLLMENT_REQUESTS)}>
              Decline Request
            </Button>
            <Button type="button" onClick={() => navigate(ROUTES.ENROLLMENT_REQUESTS)}>
              Accept Request
            </Button>
          </div>
        </div>
      </div>
  );
}

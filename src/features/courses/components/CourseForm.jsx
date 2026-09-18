/**
 * @file CourseForm.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Add-course form (no AppLayout).
 */

import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes'

export default function CourseForm() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(ROUTES.COURSES);
  };

  return (
    <div className="add-course-page">
        <div className="add-course-breadcrumb">Courses <span>&gt;</span> Add Course</div>
        <h1>Add Course</h1>
        <p className="add-course-intro">Create a new course entry in the system.</p>

        <form className="add-course-card" onSubmit={handleSubmit}>
          <label htmlFor="course-name">Course Name <b>*</b></label>
          <input id="course-name" type="text" placeholder="e.g. Introduction to Computer Science" required />

          <div className="add-course-fields">
            <div>
              <label htmlFor="course-code">Course Code <b>*</b></label>
              <input id="course-code" type="text" placeholder="E.G. CS101" required />
            </div>
            <div>
              <label htmlFor="course-status">Status</label>
              <select id="course-status" defaultValue="Active"><option>Active</option><option>Draft</option><option>Inactive</option></select>
            </div>
            <div>
              <label htmlFor="course-faculty">Faculty <b>*</b></label>
              <select id="course-faculty" defaultValue="" required>
                <option value="" disabled>Select a Faculty</option>
                <option>Information Technology</option>
                <option>Telecommunications</option>
                <option>Electronics</option>
                <option>Advertising</option>
                <option>Film and Electronic Media</option>
              </select>
            </div>
            <div>
              <label htmlFor="course-department">Department <b>*</b></label>
              <select id="course-department" defaultValue="" required>
                <option value="" disabled>Select a Department</option>
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
            </div>
          </div>

          <label htmlFor="course-description">Description</label>
          <textarea id="course-description" placeholder="Brief overview of the course content..." rows="4" />

          <div className="add-course-actions">
            <button type="button" className="add-course-cancel" onClick={() => navigate(ROUTES.COURSES)}>Cancel</button>
            <button type="submit" className="add-course-submit">Add Course</button>
          </div>
        </form>
      </div>
  );
}

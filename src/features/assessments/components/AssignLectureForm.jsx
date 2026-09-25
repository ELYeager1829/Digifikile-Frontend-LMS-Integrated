/**
 * @file AssignLectureForm.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Assign lecture form (no AppLayout).
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes'

export default function AssignLectureForm() {
  const navigate = useNavigate();
  const [published, setPublished] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(ROUTES.ASSIGNMENTS);
  };

  return (
    <div className="assign-lecture-page">
        <h1>Assign Lecture to Module</h1>
        <p className="assign-lecture-intro">Connect educational content to curriculum modules seamlessly.</p>
        <div className="assign-lecture-layout">
          <form className="assign-lecture-card" onSubmit={handleSubmit}>
            <h2>Configuration</h2>
            <div className="assign-form-rule" />
            <label htmlFor="assign-course">Select Course</label>
            <select id="assign-course" defaultValue="" required><option value="" disabled>Choose a course program...</option><option>Computer Science</option><option>Information Technology</option></select>
            <label htmlFor="assign-module">Select Target Module</label>
            <select id="assign-module" defaultValue="" required><option value="" disabled>Select course first...</option><option>Introduction to Programming</option><option>Web Development</option></select>
            <small className="assign-help">The module where this lecture will be nested.</small>
            <label htmlFor="assign-lecture">Select Lecture to Assign</label>
            <select id="assign-lecture" defaultValue="" required><option value="" disabled>Search or select a lecture...</option><option>Understanding Variables and Data Types</option><option>Introduction to Functions</option></select>
            <div className="publish-row"><div><label htmlFor="publish-toggle">Publish Immediately</label><small>Make visible to enrolled students right away.</small></div><button type="button" id="publish-toggle" className={`toggle ${published ? 'on' : ''}`} aria-pressed={published} onClick={() => setPublished((value) => !value)}><span /></button></div>
            <div className="assign-lecture-actions"><button type="button" className="assign-cancel" onClick={() => navigate(ROUTES.ASSIGNMENTS)}>Cancel</button><button type="submit" className="assign-submit">Assign Lecture</button></div>
          </form>
          <aside className="assign-lecture-preview"><section><h2>▦ Target Module Preview</h2><div className="preview-empty"><span>Not Selected</span><em>Select a module to view structure preview.</em></div></section><section><h2 className="content-heading">▧ Lecture Content</h2><div className="lecture-preview-card"><div className="lecture-thumbnail">ASSIGN LECTURE<br />TO MODULE<div>▶</div></div><strong>Lec-001: Understanding Variables and</strong><small>◷ 45 mins <b>Ready</b></small></div></section></aside>
        </div>
      </div>
  );
}

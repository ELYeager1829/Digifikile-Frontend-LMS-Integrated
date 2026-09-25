/**
 * @file CourseCatalog.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Learner-facing catalog for browsing and filtering available courses.
 */

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Pencil, Trash } from '../../../components/ui/Icons';
import { useLanguage } from '../../../i18n/LanguageContext'
import { ROUTES } from '../../../constants/routes'
import Button from '../../../components/ui/Button'
import { courseCatalog } from '../data/courseCatalog'

const PAGE_SIZE = 5;

export default function CourseCatalog() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourses = useMemo(() => {
    const text = query.trim().toLowerCase();

    return courseCatalog.filter((course) => {
      const matchesText = !text ||
        [
          course.title,
          course.overview,
          course.category,
          course.topic,
          course.instructor.name,
          course.modules.join(' '),
        ]
          .join(' ')
          .toLowerCase()
          .includes(text);

      return matchesText;
    });
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const displayedCourses = filteredCourses.slice(pageStart, pageStart + PAGE_SIZE);

  return (
    <div className="department-page course-catalog-page">
        <div className="department-header-row">
          <h1 className="department-title">{t('courseCatalog', 'title')}</h1>
          <button type="button" className="department-add-btn" onClick={() => navigate(ROUTES.COURSE_ADD)}>
            <span className="department-add-icon">＋</span>
            <span>{t('courseCatalog', 'addCourses')}</span>
          </button>
        </div>
        <div style={{ padding: '0.6rem 1rem', background: '#eaf3ff', borderRadius: '999px', color: '#214a88', fontWeight: 600 }}>
          {filteredCourses.length} course{filteredCourses.length === 1 ? '' : 's'} found
        </div>

        <div className="department-subtitle">{t('courseCatalog', 'manageAllCourses')}</div>

        <div className="department-table-panel">
          <div className="department-search-wrap">
            <input
              type="text"
              className="department-search"
              placeholder="Search Courses"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setCurrentPage(1);
              }}
            />
            <span className="department-search-icon"><SearchIcon size={24} /></span>
          </div>

          <div className="department-table-wrap">
            <table className="department-table">
              <thead>
                <tr>
                  <th>{t('courseCatalog', 'table.number')}</th>
                  <th>{t('courseCatalog', 'table.courseName')}</th>
                  <th>{t('courseCatalog', 'table.department')}</th>
                  <th>{t('courseCatalog', 'table.modules')}</th>
                  <th>{t('courseCatalog', 'table.status')}</th>
                  <th>{t('courseCatalog', 'table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {displayedCourses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.title}</td>
                    <td>{course.category}</td>
                    <td>{course.modules.join(', ')}</td>
                    <td>
                      <span className={`department-status ${course.enrolled ? 'active' : 'inactive'}`}>
                        {course.enrolled ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="department-actions">
                        <Button type="button" variant="ghost" size="icon" aria-label="Edit course">
                          <Pencil size={18} color="#0c7ff5" />
                        </Button>
                        <Button type="button" variant="destructive" size="icon" aria-label="Delete course">
                          <Trash size={18} color="#f44336" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {displayedCourses.length === 0 && (
                  <tr>
                    <td colSpan="6">No courses match your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="department-footer">
            <span>
              Showing {filteredCourses.length === 0 ? 0 : pageStart + 1} to {Math.min(pageStart + PAGE_SIZE, filteredCourses.length)} of {filteredCourses.length} courses
            </span>
            <div className="department-pagination">
              <button type="button" className="page-btn chevron" aria-label="Previous page" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)}>&lt;</button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button key={page} type="button" className={`page-btn ${page === currentPage ? 'current' : ''}`} onClick={() => setCurrentPage(page)}>
                  {page}
                </button>
              ))}
              <button type="button" className="page-btn chevron" aria-label="Next page" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => page + 1)}>&gt;</button>
            </div>
          </div>
        </div>
    </div>
  );
}

import { useMemo, useState } from 'react'
import Modal from '../../../components/ui/Modal'
import { Pencil, Trash } from '../../../components/ui/Icons'
import { initialDepartments } from '../data/academicData'
import { useLanguage } from '../../../i18n/LanguageContext'
import Button from '../../../components/ui/Button'

const initialFormState = {
  name: '',
  faculty: '',
  description: '',
  status: 'Active',
}

const DEPARTMENTS_PER_PAGE = 4

function Field({ label, required = false, error, children }) {
  return (
    <div className="academic-form-field">
      <label>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {children}
      {error && <span className="academic-form-error" role="alert">{error}</span>}
    </div>
  )
}

export default function DepartmentList() {
  const { t } = useLanguage()
  const [departments, setDepartments] = useState(initialDepartments)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState(initialFormState)
  const [formError, setFormError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredDepartments = useMemo(() => departments, [departments])
  const totalPages = Math.max(1, Math.ceil(filteredDepartments.length / DEPARTMENTS_PER_PAGE))
  const firstDepartmentIndex = (currentPage - 1) * DEPARTMENTS_PER_PAGE
  const visibleDepartments = filteredDepartments.slice(firstDepartmentIndex, firstDepartmentIndex + DEPARTMENTS_PER_PAGE)
  const firstResult = filteredDepartments.length === 0 ? 0 : firstDepartmentIndex + 1
  const lastResult = Math.min(firstDepartmentIndex + DEPARTMENTS_PER_PAGE, filteredDepartments.length)

  const handleFieldChange = (field) => (event) => {
    const value = event.target.value
    setForm((current) => ({ ...current, [field]: value }))
    if (formError) setFormError('')
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setForm(initialFormState)
    setFormError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const name = form.name.trim()
    const faculty = form.faculty.trim()
    const description = form.description.trim()

    if (!name || !faculty || !description) {
      setFormError('Please complete all required fields before creating the department.')
      return
    }

    const newDepartment = {
      id: `DEP-${Date.now()}`,
      name,
      faculty,
      description,
      status: form.status || 'Active',
      courses: 0,
    }

    setDepartments((current) => [newDepartment, ...current])
    setCurrentPage(1)
    handleCloseModal()
  }

  return (
    <div className="department-page admin-department-page">
      <div className="department-header-row">
        <div>
          <h1 className="department-title">{t('departmentList', 'title')}</h1>
          <p className="department-subtitle">{t('departmentList', 'subtitle')}</p>
        </div>
        <div className="department-header-actions">
          <button type="button" className="department-filter-btn">{t('departmentList', 'filter')}</button>
          <button type="button" className="department-add-btn" onClick={() => setIsModalOpen(true)}>
            <span className="department-add-icon">+</span>
            <span>{t('departmentList', 'addDepartment')}</span>
          </button>
        </div>
      </div>

      <div className="department-table-panel">
        <h2 className="department-directory-title">Department Directory</h2>
        <div className="department-table-wrap">
          <table className="department-table">
            <thead>
              <tr>
                <th>{t('departmentList', 'table.department')}</th>
                <th>{t('departmentList', 'table.description')}</th>
                <th>{t('departmentList', 'table.courses')}</th>
                <th>{t('departmentList', 'table.status')}</th>
                <th>{t('departmentList', 'table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {visibleDepartments.map((department) => (
                <tr key={department.id}>
                  <td><strong>{department.name}</strong><small>{department.faculty}</small></td>
                  <td>{department.description}</td>
                  <td>{department.courses}</td>
                  <td>
                    <span className={`department-status ${department.status.toLowerCase().replace(' ', '-')}`}>
                      {department.status === 'Active' ? t('common', 'active') : department.status === 'Inactive' ? t('common', 'inactive') : department.status === 'Pending Review' ? t('common', 'pending') : department.status}
                    </span>
                  </td>
                  <td>
                    <div className="department-actions">
                      <Button type="button" variant="ghost" size="icon" aria-label="Edit department">
                        <Pencil size={18} color="#0c7ff5" />
                      </Button>
                      <Button type="button" variant="destructive" size="icon" aria-label="Delete department">
                        <Trash size={18} color="#f44336" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="department-footer">
          <span>Showing {firstResult} to {lastResult} of {filteredDepartments.length} results</span>
          <div className="department-pagination">
            <button
              type="button"
              className="page-btn chevron"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`page-btn${currentPage === page ? ' current' : ''}`}
                aria-current={currentPage === page ? 'page' : undefined}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className="page-btn chevron"
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          title="Add Department"
          onClose={handleCloseModal}
          panelClassName="department-card-modal"
          footer={
            <>
              <button type="button" className="academic-secondary-btn" onClick={handleCloseModal}>Cancel</button>
              <button type="submit" form="department-form" className="academic-primary-btn">Create Department</button>
            </>
          }
        >
          <form id="department-form" onSubmit={handleSubmit}>
            <div className="academic-form-grid">
              <Field label="Department Name" required error={formError && !form.name.trim() ? 'Required' : ''}>
                <input type="text" value={form.name} onChange={handleFieldChange('name')} placeholder="e.g. Computer Science" />
              </Field>

              <Field label="Faculty" required error={formError && !form.faculty.trim() ? 'Required' : ''}>
                <input type="text" value={form.faculty} onChange={handleFieldChange('faculty')} placeholder="e.g. Faculty of Engineering" />
              </Field>
            </div>

            <Field label="Description" required error={formError && !form.description.trim() ? 'Required' : ''}>
              <textarea value={form.description} onChange={handleFieldChange('description')} placeholder="Describe this department" />
            </Field>

            <Field label="Status">
              <select value={form.status} onChange={handleFieldChange('status')}>
                <option value="Active">Active</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Inactive">Inactive</option>
              </select>
            </Field>

            {formError && <div className="academic-feedback">{formError}</div>}
          </form>
        </Modal>
      )}
    </div>
  )
}

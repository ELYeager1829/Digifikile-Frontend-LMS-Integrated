/**
 * @file TrainingProviderList.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Training-provider table with search and row actions (no AppLayout).
 */

import { useMemo, useState } from 'react'
import { Pencil, Search as SearchIcon, Trash } from '../../../components/ui/Icons'
import Button from '../../../components/ui/Button'

const initialProviders = [
  { id: 1, module: 'Programming Basics', lecture: 'Introduction to Programming', status: 'Active' },
  { id: 2, module: 'Variable & Data Types', lecture: 'Introduction to Programming', status: 'Active' },
  { id: 3, module: 'Control Structures', lecture: 'Introduction to Programming', status: 'Active' },
  { id: 4, module: 'Frontend Fundamentals', lecture: 'Web Development', status: 'Active' },
  { id: 5, module: 'Databases', lecture: 'Web Development', status: 'Active' },
]

export default function TrainingProviderList() {
  const [query, setQuery] = useState('')

  const filteredProviders = useMemo(() => {
    const text = query.trim().toLowerCase()
    if (!text) return initialProviders

    return initialProviders.filter((provider) =>
      [provider.module, provider.lecture].some((value) => value.toLowerCase().includes(text))
    )
  }, [query])

  return (
    <div className="department-page">
      <div className="department-header-row">
        <h1 className="department-title">Training Provider</h1>
        <button type="button" className="department-add-btn">
          <span className="department-add-icon">+</span>
          <span>Add Modules</span>
        </button>
      </div>

      <div className="department-subtitle">Manage Training for Modules</div>

      <div className="department-table-panel">
        <div className="department-search-wrap">
          <input
            type="text"
            className="department-search"
            placeholder="Search Lectures"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className="department-search-icon"><SearchIcon size={24} /></span>
        </div>

        <div className="department-table-wrap">
          <table className="department-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Module</th>
                <th>Lecture Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProviders.map((provider) => (
                <tr key={provider.id}>
                  <td>{provider.id}</td>
                  <td>{provider.module}</td>
                  <td>{provider.lecture}</td>
                  <td>
                    <span className={`department-status ${provider.status === 'Active' ? 'active' : 'inactive'}`}>
                      {provider.status}
                    </span>
                  </td>
                  <td>
                    <div className="department-actions">
                      <Button type="button" variant="ghost" size="icon" aria-label="Edit training provider">
                        <Pencil size={18} color="var(--primary-color)" />
                      </Button>
                      <Button type="button" variant="destructive" size="icon" aria-label="Delete training provider">
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
          <span>Showing 1 to 6 of 50 departments</span>
          <div className="department-pagination">
            <button type="button" className="page-btn chevron" aria-label="Previous page">&lt;</button>
            <button type="button" className="page-btn current">1</button>
            <button type="button" className="page-btn">2</button>
            <button type="button" className="page-btn">3</button>
            <button type="button" className="page-btn">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  )
}

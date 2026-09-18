/**
 * @file AppLayout.jsx — DigiFikile LMS Frontend
 * @layer Layout
 *
 * Authenticated app shell with mobile sidebar support for learners.
 */

import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppLayout({ section, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const role = localStorage.getItem('digifikile-role')
  const isStudent = role === 'student'
  const isSetaAdmin = role === 'seta-admin' || role === 'admin'

  const toggleSidebar = () => setIsSidebarOpen((open) => !open)
  const closeSidebar = () => setIsSidebarOpen(false)

  const handleBackdropClick = () => {
    if (isSidebarOpen && window.innerWidth <= 768) closeSidebar()
  }

  return (
    <div className={`app-shell${isSetaAdmin ? ' seta-admin-shell' : ''}${isSidebarOpen && isStudent ? ' sidebar-open' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className="main-column">
        <Topbar
          section={section}
          onMenuClick={toggleSidebar}
          showMenuButton={true}
        />
        <div className={`page-content${isSetaAdmin ? ' seta-admin-page-content' : ''}`} onClick={handleBackdropClick}>
          {children}
        </div>
      </div>
    </div>
  )
}

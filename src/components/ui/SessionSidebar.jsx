import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import ScrollArea from './scroll-area'
import { Avatar, AvatarFallback } from './avatar'
import { Separator } from './separator'
import Badge from './badge'

export default function SessionSidebar({ className = '', onClose } ) {
  const { pathname } = useLocation()

  const navItems = [
    { to: '/system-admin', label: 'Dashboard' },
    { to: '/system-admin/users', label: 'Users' },
    { to: '/system-admin/seta-administrators', label: 'SETA Administrators', badge: 3 },
    { to: '/system-admin/reports', label: 'Reports' },
  ]

  return (
    <aside className={`w-64 bg-white border-r ${className}`} aria-label="Sidebar">
      <div className="p-4 flex items-center gap-3">
        <Avatar src="/logo192.png" alt="DigiFikile" size={40} />
        <div>
          <div className="font-semibold">DigiFikile</div>
          <div className="text-xs text-gray-500">System Admin</div>
        </div>
      </div>

      <ScrollArea className="px-2 pb-8">
        <nav className="mt-2">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              onClick={() => onClose && onClose()}
              className={({ isActive }) =>
                `flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-medium' : 'text-gray-700'}`
              }
            >
              <span>{n.label}</span>
              {n.badge ? <Badge>{n.badge}</Badge> : null}
            </NavLink>
          ))}
        </nav>

        <Separator />

        <div className="p-3">
          <div className="text-xs text-gray-500 mb-2">Quick Actions</div>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">Add SETA Administrator</button>
        </div>
      </ScrollArea>
    </aside>
  )
}

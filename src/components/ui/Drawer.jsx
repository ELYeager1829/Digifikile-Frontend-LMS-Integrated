import React, { useEffect } from 'react'
import Button from './Button'

export default function Drawer({ title, open, onClose, children, footer = null, width = 520 }) {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && open) onClose && onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="drawer-backdrop" role="dialog" aria-modal="true" onClick={() => onClose && onClose()}>
      <div
        className="drawer-panel"
        style={{ width: width, maxWidth: '100%' }}
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <div className="drawer-header">
          <div>
            <h3 style={{ margin: 0 }}>{title}</h3>
          </div>
          <Button variant="ghost" size="icon" aria-label="Close drawer" onClick={() => onClose && onClose()}>×</Button>
        </div>

        <div className="drawer-content">{children}</div>

        {footer && <div className="drawer-footer">{footer}</div>}
      </div>
    </div>
  )
}

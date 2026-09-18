import { createPortal } from 'react-dom'
import Button from './Button'

export default function Modal({ title, onClose, children, footer, panelClassName = '' }) {
  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal-panel ${panelClassName}`.trim()} role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            ×
          </Button>
        </div>
        {children}
        {footer && <div className="modal-actions">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}

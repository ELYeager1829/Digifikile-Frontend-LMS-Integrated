import { useEffect, useRef, useState } from 'react'

export default function DeleteUserDialog({ user, onConfirm, onClose }) {
  const dialog = useRef(null)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    dialog.current.showModal()
  }, [])

  const handleDelete = async (event) => {
    event.preventDefault()
    setDeleting(true)
    setError('')

    try {
      await onConfirm(user.id || user.userId)
      onClose()
    } catch (err) {
      setError(err.message || String(err))
    } finally {
      setDeleting(false)
    }
  }

  return (
    <dialog ref={dialog} className="um-dialog um-delete-dialog" aria-labelledby="um-delete-title" onCancel={(event) => {
      event.preventDefault()
      if (!deleting) onClose()
    }}>
      <form onSubmit={handleDelete}>
        <div className="um-delete-body">
          <h2 id="um-delete-title">Delete User Account</h2>
          <p>This permanently deletes <strong>{user.name}</strong> ({user.email}). This action cannot be undone.</p>
          {error && <p className="um-error" role="alert">{error}</p>}
        </div>
        <div className="um-form-actions">
          <button type="button" className="um-button" disabled={deleting} onClick={onClose}>Cancel</button>
          <button type="submit" className="um-button um-delete-submit" disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </form>
    </dialog>
  )
}

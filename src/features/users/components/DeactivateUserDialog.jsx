import { useEffect, useRef, useState } from 'react'

// The existing status action has no reason field; the optional note stays local.
// onConfirm must reject on failure so this dialog can retain the note and show the error.
export default function DeactivateUserDialog({ user, onConfirm, onClose }) {
  const dialog = useRef(null)
  const submitting = useRef(false)
  const [reason, setReason] = useState('')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const element = dialog.current
    const previousFocus = document.activeElement
    element.showModal()
    return () => {
      element.close()
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [])

  function cancel() {
    if (!submitting.current) onClose()
  }

  async function submit(event) {
    event.preventDefault()
    if (submitting.current) return
    submitting.current = true
    setProcessing(true)
    setError('')
    try {
      await onConfirm(user.id)
      onClose()
    } catch (err) {
      setError(err.message || String(err))
    } finally {
      submitting.current = false
      setProcessing(false)
    }
  }

  return (
    <dialog ref={dialog} className="um-dialog um-deactivate-dialog"
      aria-labelledby="um-deactivate-title" aria-describedby="um-deactivate-description"
      onCancel={event => { event.preventDefault(); cancel() }}>
      <form onSubmit={submit} aria-busy={processing}>
        <div className="um-deactivate-body">
          <header className="um-deactivate-heading">
            <span className="um-deactivate-warning" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                <path d="M12 9v4m0 4h.01" />
              </svg>
            </span>
            <div><h2 id="um-deactivate-title">Deactivate User Account</h2><p>LMS Access Restriction</p></div>
          </header>
          <p id="um-deactivate-description" className="um-deactivate-description">
            Are you sure you want to deactivate the account for <strong>{user.name}</strong> ({user.email})? This user will no longer be able to access the LMS. You can reactivate this account later.
          </p>
          <label className="um-deactivate-label" htmlFor="um-deactivate-reason">Reason for deactivation (optional)</label>
          <input id="um-deactivate-reason" className="input" type="text" value={reason}
            onChange={event => setReason(event.target.value)} disabled={processing}
            placeholder="e.g. Sabbatical leave, left institution..." />
          {error && <p className="um-error" role="alert">{error}</p>}
        </div>
        <footer className="um-deactivate-footer">
          <button type="button" className="um-button" disabled={processing} onClick={cancel} autoFocus>Cancel</button>
          <button type="submit" className="um-button um-deactivate-submit" disabled={processing}>
            {processing ? 'Deactivating...' : 'Deactivate Account'}
          </button>
        </footer>
      </form>
    </dialog>
  )
}

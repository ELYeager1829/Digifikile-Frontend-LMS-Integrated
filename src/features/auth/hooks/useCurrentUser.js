import { useCallback, useEffect, useState } from 'react'
import { getCachedCurrentUser, getCurrentUser } from '../../../services/authService'

export default function useCurrentUser() {
  const [user, setUser] = useState(() => getCachedCurrentUser())
  const [loading, setLoading] = useState(!user)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    if (!localStorage.getItem('token')) { setLoading(false); return null }
    setLoading(true); setError(null)
    try {
      const current = await getCurrentUser()
      setUser(current)
      return current
    } catch (err) {
      setError(err)
      throw err
    } finally { setLoading(false) }
  }, [])

  useEffect(() => {
    let active = true
    const onUpdated = (event) => { if (active) setUser(event.detail || getCachedCurrentUser()) }
    window.addEventListener('digifikile-current-user-updated', onUpdated)
    if (localStorage.getItem('token')) refresh().catch(() => {})
    return () => { active = false; window.removeEventListener('digifikile-current-user-updated', onUpdated) }
  }, [refresh])

  return { user, loading, error, refresh }
}

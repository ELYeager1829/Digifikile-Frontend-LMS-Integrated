import { useCallback, useEffect, useState } from 'react'
import * as userService from '../../../services/userService'

export const useRoles = () => {
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const [roleRows, permissionRows] = await Promise.all([userService.fetchRoles(), userService.fetchPermissions()])
      setRoles(roleRows); setPermissions(permissionRows)
    } catch (err) { setError(err) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const assignRole = useCallback(async (userId, roleId) => {
    setLoading(true); setError(null)
    try { return await userService.assignRole(userId, roleId) }
    catch (err) { setError(err); throw err }
    finally { setLoading(false) }
  }, [])

  const setRolePermission = useCallback(async (roleId, permissionId, enabled) => {
    setLoading(true); setError(null)
    try {
      return enabled
        ? await userService.assignPermission(roleId, permissionId)
        : await userService.removePermission(roleId, permissionId)
    } catch (err) { setError(err); throw err }
    finally { setLoading(false) }
  }, [])

  return { roles, permissions, loading, error, refresh, assignRole, setRolePermission }
}

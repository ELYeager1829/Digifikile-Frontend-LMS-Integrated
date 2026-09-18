import { useEffect, useState, useCallback } from 'react'
import * as userService from '../../../services/userService'

export const useUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setUsers(await userService.fetchUsers())
    } catch (err) {
      setUsers([])
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const create = async (payload) => {
    if (users.some((u) => u.email?.toLowerCase() === payload.email?.toLowerCase())) {
      const e = new Error('Email already exists'); e.code = 'DUP_EMAIL'; throw e
    }
    const created = await userService.createUser(payload)
    await fetch()
    return created
  }

  const getUser = useCallback((userId) => userService.fetchUserById(userId), [])

  const updateUser = useCallback(async (userId, payload) => {
    const updated = await userService.updateUser(userId, payload)
    await fetch()
    return updated
  }, [fetch])

  return {
    users, loading, error, isUsingMockData: false, refetch: fetch,
    create, createUser: create, getUser, updateUser,
  }
}

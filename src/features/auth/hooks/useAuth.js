/**
 * @file useAuth.js — DigiFikile LMS Frontend
 * @layer Feature Hook
 *
 * WHAT THIS FILE IS:
 *   useAuth.js is the auth data/state hook for DigiFikile LMS. It belongs to the auth feature, which covers authentication, registration, and the signed-in user session. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   features/auth/hooks/ owns React-side orchestration for the auth domain. Components consume this hook instead of knowing how HTTP, loading state, errors, and refetching work.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Call only auth-appropriate service functions, own side effects in useEffect/event callbacks, and expose a small object such as { data, loading, error, refetch }.
 *   - Cancel or ignore stale requests when dependencies change, avoid state updates after unmount, and keep hook dependencies accurate.
 *   - Map backend DTO fields to stable view models here when the mapping is presentation-oriented; keep raw HTTP response shapes out of deep JSX.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not render JSX, manipulate the DOM directly, or call another domain’s endpoint as a shortcut.
 *   - Do not swallow errors or expose only an ambiguous boolean when consumers need actionable state.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - services/* — .NET API wrappers called by feature orchestration.
 *   - features/auth/components/* — consumes this hook’s state contract.
 *   - hooks/useApi.js and store/* — generic request/global-state tools when genuinely appropriate.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   This module participates in authentication, registration, and the signed-in user session. The .NET API remains authoritative for validation, permissions, persistence, and business rules. Frontend code presents those outcomes, sends DTO-shaped requests through services, and must handle ProblemDetails/validation failures without assuming the browser is trusted.
 *
 * @example
 *   // const { isAuthenticated, login, logout, register, verify } = useAuth()
 */

const ROLE_KEY = 'digifikile-role'
const AUTH_KEY = 'digifikile-authenticated'

const readRole = () => localStorage.getItem(ROLE_KEY)
const readAuthenticated = () => localStorage.getItem(AUTH_KEY) === 'true'

// Named hook export: implement side effects/status here and return a small, documented contract to UI consumers.
export const useAuth = () => {
  const role = readRole()
  const isAuthenticated = readAuthenticated()

  const login = async ({ role: nextRole = 'system-admin' } = {}) => {
    const resolvedRole = nextRole === 'student'
      ? 'student'
      : nextRole === 'system-admin'
        ? 'system-admin'
        : nextRole === 'training-provider' || nextRole === 'provider' || nextRole === 'facilitator'
          ? 'training-provider'
          : 'admin'

    localStorage.setItem(ROLE_KEY, resolvedRole)
    return { role: readRole() }
  }

  const register = async ({ role: nextRole = 'student' } = {}) => {
    const resolvedRole = nextRole === 'student'
      ? 'student'
      : nextRole === 'system-admin'
        ? 'system-admin'
        : nextRole === 'training-provider' || nextRole === 'provider' || nextRole === 'facilitator'
          ? 'training-provider'
          : 'admin'

    localStorage.setItem(ROLE_KEY, resolvedRole)
    return { role: readRole() }
  }

  /** Sets digifikile-authenticated after mock 2FA; returns the stored role. */
  const verify = () => {
    localStorage.setItem(AUTH_KEY, 'true')
    return readRole()
  }

  const logout = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(ROLE_KEY)
  }

  return {
    user: isAuthenticated
      ? { role, isAuthenticated: true }
      : null,
    role,
    isAuthenticated,
    login,
    logout,
    register,
    verify,
  }
}

/**
 * @file api.js — DigiFikile LMS Frontend
 * @layer Lib
 *
 * WHAT THIS FILE IS:
 *   api.js is the shared infrastructure for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   lib/ contains framework and infrastructure configuration shared by the whole frontend. api.js is the single Axios client boundary for base URL, authentication headers, timeouts, and cross-cutting response handling.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Configure the shared Axios instance once using Vite environment variables, with a safe development fallback only where appropriate.
 *   - Interceptors must stay generic: attach the current access token, normalise cross-cutting errors, and delegate navigation/session changes to an explicit integration.
 *   - Keep .NET ProblemDetails and validation responses available to calling hooks so forms can show field-level messages.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not add endpoint-specific course/user/report methods here; those belong in services/.
 *   - Do not embed production secrets or silently redirect in a way that bypasses React session cleanup.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - services/* — endpoint-specific wrappers built on this client.
 *   - constants/api.js — endpoint paths appended by services.
 *   - store/* / auth hooks — session lifecycle used by authentication integration.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   DigiFikile’s .NET backend is the source of truth for LMS records, validation, authentication, and role enforcement. This frontend boundary sends JSON over the configured API base URL and must tolerate nulls, validation errors, 401/403 responses, and evolving DTO contracts.
 *
 * @example
 *   // const response = await api.get(ENDPOINTS.COURSES)
 */

import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5001/api'

// Named export: this is part of the module’s explicit contract; keep its purpose narrow and documented.
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — attach auth token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — handle 401 globally (redirect to login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem('token')) {
      localStorage.removeItem('token')
      localStorage.removeItem('digifikile-authenticated')
      localStorage.removeItem('digifikile-role')
      localStorage.removeItem('digifikile-current-user')
      localStorage.removeItem('digifikile-user-name')
      window.location.assign('/login')
    }
    return Promise.reject(error)
  }
)

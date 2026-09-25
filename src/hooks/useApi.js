/**
 * @file useApi.js — DigiFikile LMS Frontend
 * @layer Shared Hook
 *
 * WHAT THIS FILE IS:
 *   useApi.js is the generic reusable React hook for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   hooks/ contains generic hooks useful across multiple unrelated features. Domain-specific behaviour belongs in features/<name>/hooks so the shared layer remains small and broadly reusable.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Accept generic inputs (for example, a request callback) and return a predictable state contract usable by unrelated features.
 *   - Keep domain names and .NET endpoint knowledge out of this hook; feature hooks adapt the generic behaviour.
 *   - Own effect cleanup, request races, and retry semantics while keeping consumers in control of when a request runs.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not encode course, assessment, user, or report-specific rules in a generic shared hook.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - features/<name>/hooks/* — domain adapters that may build on generic request behaviour.
 *   - services/* — request callbacks supplied by feature hooks.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   useApi supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // const { data, loading, error } = useApi(request)
 */

import { useCallback, useState } from 'react'

// Named hook export: implement side effects/status here and return a small, documented contract to UI consumers.
export const useApi = (requestFn) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const run = useCallback(
    async (...args) => {
      setLoading(true)
      setError(null)
      try {
        const response = await requestFn(...args)
        setData(response)
        return response
      } catch (requestError) {
        setError(requestError)
        throw requestError
      } finally {
        setLoading(false)
      }
    },
    [requestFn],
  )

  return { data, loading, error, run }
}

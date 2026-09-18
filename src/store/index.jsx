/**
 * @file index.jsx — DigiFikile LMS Frontend
 * @layer Store
 *
 * WHAT THIS FILE IS:
 *   index.jsx is the global client-state boundary for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   store/ is reserved for genuinely global client state that must survive route changes or be shared by distant features, such as the auth session or selected course. Server data should normally stay in feature hooks/cache.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Add a global slice only after confirming multiple distant routes need the state; define initial state, narrowly named actions, selectors, and reset behaviour.
 *   - Keep auth session metadata, selected-course identity, or UI-wide preferences here; keep fetched course/report collections in their feature data layer.
 *   - Ensure sign-out clears sensitive in-memory state, while remembering that frontend storage is never a secure place for secrets.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not place every server response in global state, duplicate hook state, or store derived values that selectors can calculate.
 *   - Do not treat localStorage or any browser store as secure.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - features/<name>/hooks/* — reads/actions global state only when cross-route sharing is needed.
 *   - lib/api.js and auth services — session lifecycle may inform token attachment and reset.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   index supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // const selectedCourse = useStore(selectSelectedCourse)
 */

import { createContext, useContext, useMemo, useReducer } from 'react'
import { authInitialState, authReducer } from './slices/authSlice'
import { courseInitialState, courseReducer } from './slices/courseSlice'
import { userInitialState, userReducer } from './slices/userSlice'

const StoreContext = createContext(null)

const rootInitialState = {
  auth: authInitialState,
  course: courseInitialState,
  user: userInitialState,
}

const rootReducer = (state, action) => ({
  auth: authReducer(state.auth, action),
  course: courseReducer(state.course, action),
  user: userReducer(state.user, action),
})

// Named store export: keep state/actions/selectors narrowly scoped to cross-route client state.
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, rootInitialState)
  const value = useMemo(() => ({ state, dispatch }), [state])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

// Named hook export: implement side effects/status here and return a small, documented contract to UI consumers.
export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used within StoreProvider')
  return context
}

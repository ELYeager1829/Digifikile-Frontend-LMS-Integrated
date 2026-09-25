import { useState } from 'react'
import { cn } from '../../lib/utils'
import './Button.css'

const VARIANTS = new Set(['default', 'secondary', 'outline', 'destructive', 'gold', 'ghost', 'link'])
const SIZES = new Set(['sm', 'default', 'lg', 'icon'])

export function Button({ children, className = '', variant = 'default', size = 'default', loading = false, disabled = false, onClick, ...props }) {
  const [isPending, setIsPending] = useState(false)
  const resolvedVariant = VARIANTS.has(variant) ? variant : 'default'
  const resolvedSize = SIZES.has(size) ? size : 'default'
  const isLoading = loading || isPending

  const handleClick = (event) => {
    const result = onClick?.(event)
    if (result && typeof result.then === 'function') {
      setIsPending(true)
      Promise.resolve(result).then(
        () => setIsPending(false),
        () => setIsPending(false),
      )
    }
    return result
  }

  return (
    <button
      className={cn('df-button', `df-button--${resolvedVariant}`, `df-button--${resolvedSize}`, className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      onClick={handleClick}
      {...props}
    >
      {isLoading && <span className="df-button__spinner" aria-hidden="true" />}
      <span className="df-button__label">{children}</span>
    </button>
  )
}

export default Button
/**
 * @file Button.jsx — DigiFikile LMS Frontend
 * @layer UI
 *
 * WHAT THIS FILE IS:
 *   Button.jsx is the shared design-system primitive for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   components/ui/ contains small reusable visual primitives used across unrelated features. These components define consistent styling and accessibility while remaining unaware of LMS domain data.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Define a small prop contract for content, variants, disabled/loading state, className extension, and event forwarding.
 *   - Prefer native semantic elements and forward relevant HTML attributes; preserve focus indication and sufficient colour contrast.
 *   - Keep styling responsive and composable; this primitive must work in courses, assessments, admin screens, and narrow mobile layouts.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not import feature hooks/services, hardcode LMS-specific wording, or remove native accessibility behaviour for styling convenience.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - components/layout/* and features/<name>/components/* — consumers of shared primitives.
 *   - components/feedback/* — complementary shared status presentation.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   Button supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // <Button aria-label="Save course">Save</Button>
 */

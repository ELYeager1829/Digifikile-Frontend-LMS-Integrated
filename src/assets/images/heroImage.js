/**
 * @file heroImage.js — DigiFikile LMS Frontend
 * @layer Asset
 *
 * WHAT THIS FILE IS:
 *   heroImage.js is the static asset reference for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   assets/ contains importable references to fonts and images. Keeping asset paths behind modules avoids scattered string paths and makes bundler-managed replacement straightforward.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Export a stable reference that components can import rather than repeating a relative file path.
 *   - Provide meaningful alt text at the consuming component; decorative images should use empty alt text there.
 *   - Optimise large media before committing and verify the bundler includes the referenced file.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not place executable feature logic, credentials, or unoptimised binary data in JavaScript asset-reference modules.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - components/* and pages/* — import the reference and provide accessible presentation context.
 *   - Vite asset pipeline — resolves and bundles imported files.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   heroImage supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // import heroImage from './assets/.../heroImage.js'
 */

// Asset export: consumers import this stable reference and provide presentation/accessibility context.
export const heroImage = { path: '/vite.svg', alt: 'DigiFikile LMS hero placeholder image' }

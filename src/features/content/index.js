/**
 * @file index.js — DigiFikile LMS Frontend
 * @layer Feature Public API
 *
 * WHAT THIS FILE IS:
 *   Public barrel for the content feature.
 */

export { default as ModuleList } from './components/ModuleList'
export { default as ModuleDetailView } from './components/ModuleDetailView'
export { default as LessonList } from './components/LessonList'
export { default as LessonViewer } from './components/LessonViewer'
export { useContent } from './hooks/useContent'
export { useLessons } from './hooks/useLessons'

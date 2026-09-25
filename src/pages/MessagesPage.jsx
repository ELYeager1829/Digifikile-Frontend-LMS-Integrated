/**
 * @file MessagesPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * WHAT THIS FILE IS:
 *   Thin route screen for learner messages.
 *
 * RELATED FILES:
 *   - features/messages — MessagesPanel
 *   - constants/routes.js — ROUTES.MESSAGES
 */

import AppLayout from '../components/layout/AppLayout'
import { MessagesPanel } from '../features/messages'

export default function MessagesPage() {
  return (
    <AppLayout section="Messages">
      <MessagesPanel />
    </AppLayout>
  )
}

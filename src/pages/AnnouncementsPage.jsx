/**
 * @file AnnouncementsPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * WHAT THIS FILE IS:
 *   Thin route screen for announcements.
 *
 * RELATED FILES:
 *   - features/announcements — AnnouncementList
 *   - constants/routes.js — ROUTES.ANNOUNCEMENTS
 */

import AppLayout from '../components/layout/AppLayout'
import { AnnouncementList } from '../features/announcements'

export default function AnnouncementsPage() {
  return (
    <AppLayout section="Announcements">
      <AnnouncementList />
    </AppLayout>
  )
}

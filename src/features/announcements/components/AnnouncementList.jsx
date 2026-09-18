/**
 * @file AnnouncementList.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Announcements list UI (no AppLayout).
 */

import { useLanguage } from '../../../i18n/LanguageContext'
import GradientCard from '../../../components/ui/GradientCard'

const announcementCards = [
  {
    id: 1,
    type: 'warning',
    typeLabelKey: 'urgentUpdate',
    title: 'System Maintenance',
    body: 'The learning portal will be offline for scheduled maintenance this Saturday from 02:00 AM to 06:00 AM GMT. Please ensure all active assignments are saved before then.',
    date: 'Oct 24, 2023',
    icon: '⚠',
    accent: 'orange',
    imageUrl: 'https://lftz25oez4aqbxpq.public.blob.vercel-storage.com/image-CVv0qK2DYZbOAQP2LboVFgQGt0UMfB.png',
  },
  {
    id: 2,
    type: 'info',
    typeLabelKey: 'newModule',
    title: 'Advanced Data Structures',
    body: 'Module 4: Advanced Data Structures is now open. This module covers trees, graphs, and hash tables. Expected completion time: 4 hours.',
    date: 'Oct 22, 2023',
    icon: '▣',
    accent: 'purple',
    imageUrl: 'https://lftz25oez4aqbxpq.public.blob.vercel-storage.com/image-5WJZLkaCfLUnCYpgNz89tPx5C4KYgJ.png',
  },
  {
    id: 3,
    type: 'success',
    typeLabelKey: 'gradesPosted',
    title: 'Midterm Results Released',
    body: 'The grades for the recent midterm examination have been finalized and published. Please review your score and feedback in your gradebook.',
    date: 'Oct 20, 2023',
    icon: '✓',
    accent: 'green',
    imageUrl: 'https://lftz25oez4aqbxpq.public.blob.vercel-storage.com/image-Q24CTBwBqnBrGujxuykBW9GfOYTdeE.png',
  },
  {
    id: 4,
    type: 'event',
    typeLabelKey: 'event',
    title: 'Guest Lecture: AI Ethics',
    body: 'Join us this Friday for a special guest lecture on the ethics of Artificial Intelligence by Dr. Sarah Jenkins.',
    date: 'Oct 18, 2023',
    icon: '◫',
    accent: 'gray',
    imageUrl: 'https://lftz25oez4aqbxpq.public.blob.vercel-storage.com/image-5i9EDsbgEZk9k7NBeKt3ImNXkx0F66.png',
  },
]

const orderedAnnouncementCards = [announcementCards[0], announcementCards[1], announcementCards[2], announcementCards[3]]

export default function AnnouncementList() {
  const { t } = useLanguage()

  return (
    <div className="learner-announcements-page student-announcements-page">
      <div className="announcements-header-block">
        <h1 className="announcements-title">{t('announcementList', 'title')}</h1>
        <p className="announcements-subtitle">{t('announcementList', 'subtitle')}</p>
      </div>

      <div className="announcement-card-grid">
        {orderedAnnouncementCards.map((item) => (
          <GradientCard
            key={item.id}
            item={item}
            tagLabel={t('announcementList', `cards.${item.typeLabelKey}`)}
            readMoreLabel={t('announcementList', 'readMore')}
          />
        ))}
      </div>
    </div>
  )
}

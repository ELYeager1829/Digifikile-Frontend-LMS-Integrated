export function Home({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M12 29L32 12l20 17v23a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V29z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path d="M24 55V35h16v20" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

export function DepartmentIcon({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M10 28L32 12l22 16v24H10V28z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path d="M22 52V34h20v18M26 22h12M18 28h28M18 34h28M26 40h12M20 46h24" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M46 14l6 0 0 8" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function CourseIcon({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M8 18L20 12l12 6v28L20 52 8 46V18z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path d="M20 12v40M32 18l12-6v28l-12 6V18z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path d="M32 18v28" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function ModuleIcon({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M8 13c8-3 16-1 24 5v35c-8-6-16-8-24-5V13zm48 0c-8-3-16-1-24 5v35c8-6 16-8 24-5V13z" fill={color} />
      <path d="M37 25c5-2 10-2 14 0M37 33c5-2 10-2 14 0M37 41c5-2 10-2 14 0" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function CodeIcon({ size = 24, color = '#000000' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M27 17L12 32l15 15M37 17l15 15-15 15" fill="none" stroke={color} strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export function PencilIcon({ size = 24 }) {
  return (
    <img
      src="/design-icon.png"
      alt=""
      width={size}
      height={size}
      style={{ display: 'inline-block' }}
    />
  );
}

export function DatabaseIcon({ size = 24, color = '#454d68' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <ellipse cx="32" cy="16" rx="19" ry="8" fill="none" stroke={color} strokeWidth="5" />
      <path d="M13 16v32c0 5 9 9 19 9s19-4 19-9V16M13 32c0 5 9 9 19 9s19-4 19-9" fill="none" stroke={color} strokeWidth="5" />
    </svg>
  );
}



export function LessonIcon({ size = 24, color = '#667085' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <circle cx="32" cy="32" r="23" fill="none" stroke={color} strokeWidth="4" />
      <path d="M28 22l13 10-13 10V22z" fill={color} />
    </svg>
  );
}

export function ResourceIcon({ size = 24, color = '#667085' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M16 8h25l9 9v39H16V8zM40 8v11h10" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path d="M24 34h18M24 43h18" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function EnrolledModulesIcon({ size = 24, color = '#ffffff' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M8 13c8-3 16-1 24 5v35c-8-6-16-8-24-5V13zm48 0c-8-3-16-1-24 5v35c8-6 16-8 24-5V13z" fill={color} />
      <path d="M37 25c5-2 10-2 14 0M37 33c5-2 10-2 14 0M37 41c5-2 10-2 14 0" fill="none" stroke="#1f7cf2" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function DownloadModuleIcon({ size = 24, color = '#667085' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M8 14c8-3 16-1 24 5v34c-8-6-16-8-24-5V14zm48 0c-8-3-16-1-24 5v34c8-6 16-8 24-5V14z" fill={color} />
      <path d="M37 26c5-2 10-2 14 0M37 34c5-2 10-2 14 0M37 42c5-2 10-2 14 0" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function SyncedOfflineIcon({ size = 24, color = '#1f9446' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M19 49h27a11 11 0 0 0 1-22 16 16 0 0 0-30-2A12 12 0 0 0 19 49z" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 37l6 6 12-13" fill="none" stroke={color} strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export function StudyNoteIcon({ size = 24, color = '#0f61bb' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M16 7h25l10 10v40H16V7z" fill="none" stroke={color} strokeWidth="5" strokeLinejoin="round" />
      <path d="M41 7v11h10M24 31h20M24 41h20" fill="none" stroke={color} strokeWidth="5" strokeLinecap="square" />
    </svg>
  );
}

export function PdfDocumentIcon({ size = 24, color = '#df2b21' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M15 8h25l10 10v38H15V8z" fill="none" stroke={color} strokeWidth="5" strokeLinejoin="round" />
      <path d="M40 8v11h10" fill="none" stroke={color} strokeWidth="5" strokeLinejoin="round" />
      <text x="20" y="42" fill={color} fontSize="13" fontWeight="800" fontFamily="Arial, sans-serif">PDF</text>
    </svg>
  );
}

export function TrainingProviderIcon({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M18 50V25h28v25" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path d="M24 50V32h16v18M13 50h38" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M32 18a8 8 0 0 0-8 8v8h16v-8a8 8 0 0 0-8-8z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

export function Laptop({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <rect x="10" y="14" width="44" height="28" rx="4" fill="none" stroke={color} strokeWidth="4" />
      <path d="M6 46h52l-6 8H12l-6-8z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

export function BadgeCheck({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M32 8l18 7v13c0 11-7 20-18 26-11-6-18-15-18-26V15l18-7z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path d="M24 32l5 5 11-13" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Megaphone({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M8 28a8 8 0 0 1 8-8h17L53 8v48L33 44H16a8 8 0 0 1-8-8V28z" fill={color} />
      <path d="M17 43v12h8V43" fill={color} />
      <path d="M57 20c4 4 4 20 0 24M61 13c7 8 7 30 0 38" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Cog({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <circle cx="32" cy="32" r="8" fill="none" stroke={color} strokeWidth="4" />
      <path d="M32 12v8M32 44v8M12 32h8M44 32h8M18 18l6 6M40 40l6 6M18 46l6-6M40 24l6-6" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Logout({ size = 24, color = '#f4a100' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M24 18h20a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6H24" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 32H8M20 22l-10 10 10 10" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Bell({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M22 46h20l-4-18V24a8 8 0 0 0-16 0v4l-4 18z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path d="M26 50a6 6 0 0 0 12 0" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Search({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <circle cx="27" cy="27" r="14" fill="none" stroke={color} strokeWidth="4" />
      <path d="M39 39l14 14" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Pencil({ size = 30, color = '#0c7ff5' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M20 44l26-26 8 8-26 26-10 2 2-10z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path d="M34 18l8 8" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M16 48l8 2-2-8" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Trash({ size = 30, color = '#f44336' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M18 20h28l-2 32H20l-2-32z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path d="M12 20h40M24 12h16l2 8H22l2-8z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M28 28v16M36 28v16" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function UserIcon({ size = 24, color = '#ffffff' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <circle cx="32" cy="22" r="11" fill={color} opacity="0.9" />
      <path d="M18 52c3-8 10-12 14-12s11 4 14 12" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function LockIcon({ size = 24, color = '#454d5c' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <rect x="14" y="28" width="36" height="26" rx="4" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path d="M22 28v-8a10 10 0 0 1 20 0v8" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="41" r="3" fill={color} />
    </svg>
  );
}

export function VisibilityIcon({ size = 24, color = '#454d5c', isVisible = false }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M6 32s10-15 26-15 26 15 26 15-10 15-26 15S6 32 6 32z" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="8" fill="none" stroke={color} strokeWidth="4" />
      {!isVisible && <path d="M12 12l40 40" stroke={color} strokeWidth="4" strokeLinecap="round" />}
    </svg>
  );
}

export function QuizzesIcon({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M12 8h40a5 5 0 0 1 5 5v34a5 5 0 0 1-5 5H26L12 62V13a5 5 0 0 1 5-5z" fill={color} />
      <path d="M31 22c0-4 3-7 8-7s9 3 9 8c0 6-7 7-8 12v3M40 45v1" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function UpcomingQuizIcon({ size = 24, color = '#626d89' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M14 10v39a6 6 0 0 0 6 6h30" fill="none" stroke={color} strokeWidth="5" strokeLinecap="square" />
      <rect x="25" y="12" width="29" height="29" rx="4" fill={color} />
      <path d="M36 23c0-3 2-5 5-5s5 2 5 5c0 4-5 5-5 8M41 35v1" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function AssignmentsIcon({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <rect x="10" y="12" width="44" height="46" rx="5" fill={color} />
      <rect x="22" y="7" width="20" height="11" rx="5" fill={color} />
      <path d="M20 28h25M20 38h25M20 48h17" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function ProgressIcon({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M8 53V12h5v36h43v5H8z" fill={color} />
      <path d="M15 43l13-13 10 10 15-18" fill="none" stroke={color} strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export function OverallProgressIcon({ size = 24, color = '#0f61bb' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M10 45l14-14 10 10 19-19v10h6V12H39v6h10L34 33 24 23 6 41l4 4z" fill={color} />
    </svg>
  );
}

export function TotalQuestionsIcon({ size = 24, color = '#485160' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <text x="8" y="18" fill={color} fontSize="15" fontWeight="700" fontFamily="Arial, sans-serif">1</text>
      <text x="8" y="36" fill={color} fontSize="15" fontWeight="700" fontFamily="Arial, sans-serif">2</text>
      <text x="8" y="54" fill={color} fontSize="15" fontWeight="700" fontFamily="Arial, sans-serif">3</text>
      <path d="M27 13h28M27 31h28M27 49h28" fill="none" stroke={color} strokeWidth="5" strokeLinecap="square" />
    </svg>
  );
}

export function IncorrectAnswerIcon({ size = 24, color = '#c8191f' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <circle cx="32" cy="32" r="24" fill="none" stroke={color} strokeWidth="6" />
      <path d="M21 21l22 22M43 21L21 43" fill="none" stroke={color} strokeWidth="7" strokeLinecap="square" />
    </svg>
  );
}

export function CorrectAnswerIcon({ size = 24, color = '#10b981' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <circle cx="32" cy="32" r="24" fill="none" stroke={color} strokeWidth="6" />
      <path d="M19 33l9 9 18-20" fill="none" stroke={color} strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export function MessagesIcon({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M8 16h40a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H12l-8 8V20a4 4 0 0 1 4-4z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path d="M16 28h20M16 36h16" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function DownloadIcon({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M27 8h10v28l10-10 7 7-22 22L10 33l7-7 10 10V8z" fill={color} />
      <path d="M12 52h40v7H12z" fill={color} />
    </svg>
  );
}

export function DashboardIcon({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <rect x="9" y="9" width="20" height="20" rx="2" fill={color} />
      <rect x="35" y="9" width="20" height="20" rx="2" fill={color} />
      <rect x="9" y="35" width="20" height="20" rx="2" fill={color} />
      <rect x="35" y="35" width="20" height="20" rx="2" fill={color} />
    </svg>
  );
}

export function HelpIcon({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <circle cx="32" cy="32" r="20" fill="none" stroke={color} strokeWidth="3" />
      <text x="32" y="40" textAnchor="middle" fontSize="28" fontWeight="bold" fill={color} fontFamily="Arial, sans-serif">
        ?
      </text>
    </svg>
  );
}

export function Menu({ size = 24, color = '#1d6ef2' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M12 18h40M12 32h40M12 46h40" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

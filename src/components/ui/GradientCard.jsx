export default function GradientCard({ item, tagLabel, readMoreLabel }) {
  const renderVisual = () => {
    if (item.accent === 'orange') {
      return (
        <svg viewBox="0 0 220 180" className="announcement-svg announcement-svg-orange" aria-hidden="true">
          <defs>
            <linearGradient id="maintenanceGrad" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#f7cd7a" />
              <stop offset="100%" stopColor="#d98a2f" />
            </linearGradient>
          </defs>
          <circle cx="120" cy="96" r="64" fill="url(#maintenanceGrad)" opacity="0.95" />
          <circle cx="120" cy="96" r="28" fill="rgba(255,255,255,0.22)" />
          <path d="M84 114 L103 95 L116 108 L136 85 L158 106 L170 96 L177 102 L157 132 L82 132 Z" fill="rgba(255,255,255,0.18)" />
          <g transform="translate(35 20) rotate(-16 94 76)">
            <rect x="70" y="72" width="48" height="16" rx="8" fill="#f3b863" />
            <rect x="90" y="54" width="48" height="16" rx="8" fill="#f3b863" transform="rotate(45 114 62)" />
            <rect x="72" y="53" width="48" height="16" rx="8" fill="#f3b863" transform="rotate(-45 96 61)" />
            <circle cx="108" cy="82" r="20" fill="#f3b863" stroke="rgba(255,255,255,0.3)" strokeWidth="8" />
          </g>
        </svg>
      )
    }

    if (item.accent === 'purple') {
      return (
        <svg viewBox="0 0 220 180" className="announcement-svg announcement-svg-purple" aria-hidden="true">
          <g stroke="#b884c6" strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M54 104 L96 78 L140 102 L176 88" />
            <path d="M96 78 L94 126 L140 102" />
            <path d="M54 104 L94 126" />
            <path d="M140 102 L176 88 L176 130 L94 126" />
          </g>
          <g>
            <circle cx="54" cy="104" r="12" fill="#c383d4" />
            <circle cx="96" cy="78" r="12" fill="#c383d4" />
            <circle cx="140" cy="102" r="12" fill="#c383d4" />
            <circle cx="176" cy="88" r="12" fill="#c383d4" />
            <circle cx="94" cy="126" r="12" fill="#c383d4" />
            <circle cx="176" cy="130" r="12" fill="#c383d4" />
          </g>
        </svg>
      )
    }

    if (item.accent === 'green') {
      return (
        <svg viewBox="0 0 220 180" className="announcement-svg announcement-svg-green" aria-hidden="true">
          <g>
            <path d="M129 138 L129 72" stroke="#5b3b1c" strokeWidth="8" strokeLinecap="round" />
            <path d="M87 98 C100 72, 120 68, 136 94 C118 89, 103 90, 87 98 Z" fill="#7bd08a" />
            <path d="M116 84 C132 68, 150 70, 165 92 C152 88, 138 88, 116 84 Z" fill="#7bd08a" />
            <path d="M109 96 C124 80, 152 82, 163 102 C143 99, 127 100, 109 96 Z" fill="#7bd08a" />
            <circle cx="118" cy="98" r="56" fill="rgba(117, 219, 197, 0.84)" />
            <path d="M58 108 C70 78, 98 62, 122 82 C108 86, 82 94, 58 108 Z" fill="rgba(0,0,0,0.08)" />
          </g>
        </svg>
      )
    }

    if (item.accent === 'gray') {
      return (
        <svg viewBox="0 0 220 180" className="announcement-svg announcement-svg-gray" aria-hidden="true">
          <path d="M155 30 C180 30, 197 43, 197 66 L197 104 C197 133, 178 155, 145 166 C117 176, 86 176, 62 166 C29 155, 10 133, 10 104 L10 66 C10 43, 27 30, 52 30 L155 30 Z" fill="url(#shieldGrad)" />
          <path d="M112 62 L145 87 L112 116 L79 87 Z" fill="rgba(255,255,255,0.2)" />
          <path d="M86 95 L106 116 L141 74" fill="none" stroke="#fff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="shieldGrad" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#3d8ef3" />
              <stop offset="100%" stopColor="#1c5ed3" />
            </linearGradient>
          </defs>
        </svg>
      )
    }

    return (
      <div className="announcement-visual-art announcement-art-default" aria-hidden="true">
        <span className="announcement-visual-badge">{item.icon}</span>
      </div>
    )
  }

  return (
    <article className={`announcement-card modern gradient-card ${item.accent ?? 'blue'}`}>
      <div className="announcement-card-content">
        <div className="announcement-copy">
          <div className="announcement-topline">
            <span className={`announcement-tag ${item.accent ?? 'blue'}`}>
              <span className="announcement-tag-dot" aria-hidden="true" />
              {tagLabel}
            </span>
          </div>

          <h3>{item.title}</h3>
          <p>{item.body}</p>

          <button type="button" className="read-more-btn">
            {readMoreLabel} <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="announcement-visual">{renderVisual()}</div>
      </div>
    </article>
  )
}

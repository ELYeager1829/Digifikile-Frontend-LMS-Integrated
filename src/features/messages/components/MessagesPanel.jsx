/**
 * @file MessagesPanel.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Messages inbox panel (no AppLayout).
 */

import Button from '../../../components/ui/Button'

const conversations = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    preview: 'Please review the supplementary materials before our next session on Thursday.',
    time: '10:42 AM',
    unread: 3,
    active: true,
    role: 'Facilitator',
    avatar: 'SJ',
    color: 'blue',
    messages: [
      { sender: 'them', text: 'Hello! I noticed you had some trouble with the last quiz on Cognitive Load Theory. Would you like to schedule a quick 10-minute session to go over those concepts?', time: '10:42 AM' },
      { sender: 'me', text: 'Hi Dr. Jenkins, yes! That would be incredibly helpful. I specifically struggled with the intrinsic vs extraneous load distinctions.', time: '14:45 PM' },
      { sender: 'them', text: 'Are you free tomorrow afternoon?', time: 'Today' },
    ],
  },
  {
    id: 2,
    name: 'Data Structures Study Group',
    preview: 'Michael: I found a great resource for Binary Trees.',
    time: 'Yesterday',
    unread: 0,
    active: false,
    role: 'Group',
    avatar: 'DS',
    color: 'gray',
    messages: [
      { sender: 'them', text: 'Michael: I found a great resource for Binary Trees.', time: 'Yesterday' },
    ],
  },
  {
    id: 3,
    name: 'David Chen',
    preview: 'Thanks for sharing your notes!',
    time: 'Mon',
    unread: 0,
    active: false,
    role: 'Student',
    avatar: 'DC',
    color: 'orange',
    messages: [
      { sender: 'them', text: 'Thanks for sharing your notes!', time: 'Mon' },
    ],
  },
  {
    id: 4,
    name: 'Student Admin',
    preview: 'Your enrollment for next semester is confirmed.',
    time: 'Oct 12',
    unread: 0,
    active: false,
    role: 'Admin',
    avatar: 'SA',
    color: 'green',
    messages: [
      { sender: 'them', text: 'Your enrollment for next semester is confirmed.', time: 'Oct 12' },
    ],
  },
];

export default function MessagesPanel() {
  const [query, setQuery] = useState('');
  const [activeConversationId, setActiveConversationId] = useState(conversations[0].id);
  const filteredConversations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return normalizedQuery
      ? conversations.filter((conversation) =>
        [conversation.name, conversation.preview, conversation.role]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      )
      : conversations;
  }, [query]);
  const activeConversation = conversations.find((conversation) => conversation.id === activeConversationId) || conversations[0];

  return (
    <div className="messages-page-content">
        <h1 className="messages-title">Messages</h1>
        <div className="learner-messages-page">
          <aside className="messages-sidebar">
          <div className="messages-toolbar">
            <div className="messages-search-wrap">
              <span className="messages-search-icon">⌕</span>
              <input
                type="search"
                placeholder="Search messages..."
                className="messages-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <button type="button" className="messages-compose-btn" aria-label="New message">✎</button>
          </div>

          <div className="messages-filters" aria-label="Conversation filters">
            <button type="button" className="message-filter active">All</button>
            <button type="button" className="message-filter">Facilitators</button>
            <button type="button" className="message-filter">Study Groups</button>
            <button type="button" className="message-filter">Unread</button>
          </div>

          <div className="conversation-list">
            {filteredConversations.map((conversation) => (
              <button
                type="button"
                key={conversation.id}
                className={`conversation-item ${conversation.id === activeConversation.id ? 'selected' : ''}`}
                onClick={() => setActiveConversationId(conversation.id)}
              >
                <div className={`conversation-avatar ${conversation.color}`}>{conversation.avatar}</div>

                <div className="conversation-copy">
                  <div className="conversation-topline">
                    <span className="conversation-name">{conversation.name}</span>
                    <span className="conversation-time">{conversation.time}</span>
                  </div>

                  <div className="conversation-preview-row">
                    <span className="conversation-preview">{conversation.preview}</span>
                    {conversation.unread > 0 && <span className="conversation-badge">{conversation.unread}</span>}
                  </div>
                </div>
              </button>
            ))}
            {filteredConversations.length === 0 && <p className="messages-empty">No messages match your search.</p>}
          </div>
          </aside>

          <main className="messages-chat-panel">
          <div className="chat-header">
            <div className="chat-profile">
              <div className={`chat-avatar ${activeConversation.color}`}>{activeConversation.avatar}</div>
              <div className="chat-profile-text">
                <div className="chat-name">{activeConversation.name}</div>
                <div className="chat-role">{activeConversation.role}</div>
              </div>
            </div>

            <div className="chat-actions">
              <button type="button" className="chat-icon-btn" aria-label="Call">◫</button>
              <Button type="button" variant="ghost" size="icon" aria-label="More options">⋮</Button>
            </div>
          </div>

          <div className="chat-thread">
            {activeConversation.messages.map((message, index) => (
              <div key={`${message.time}-${index}`} className={`chat-message ${message.sender === 'me' ? 'mine' : 'theirs'}`}>
                {message.sender === 'them' && (
                  <div className={`chat-avatar mini ${activeConversation.color}`}>{activeConversation.avatar}</div>
                )}
                <div className="chat-bubble">
                  <div className="chat-text">{message.text}</div>
                  <div className="chat-time">{message.time}</div>
                </div>
              </div>
            ))}

            <div className="chat-message theirs">
              <div className={`chat-avatar mini ${activeConversation.color}`}>{activeConversation.avatar}</div>
              <div className="chat-bubble document-bubble">
                <div className="document-card">
                  <div className="document-icon">PDF</div>
                  <div className="document-meta">
                    <div className="document-name">CTL_Supplementary_Notes.pdf</div>
                    <div className="document-size">2.4 MB • Document</div>
                  </div>
                  <button type="button" className="document-download" aria-label="Download file">↓</button>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-composer">
            <button type="button" className="composer-icon" aria-label="Attach">◌</button>
            <button type="button" className="composer-icon" aria-label="Emoji">☺</button>
            <input type="text" className="composer-input" placeholder="Type a message..." />
            <button type="button" className="send-btn" aria-label="Send message">→</button>
          </div>
          </main>
        </div>
      </div>
  );
}

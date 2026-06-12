import { Bell } from 'lucide-react'
import { useNotifications } from '../../context/NotificationContext'
import { useAuth } from '../../context/AuthContext'

export default function Header({ title }) {
  const { unread, setOpen, open } = useNotifications()
  const { user } = useAuth()

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        <button
          className={`notif-btn ${open ? 'active' : ''}`}
          onClick={() => setOpen(o => !o)}
          title="Notificaciones"
        >
          <Bell size={20} />
          {unread > 0 && <span className="notif-badge">{unread}</span>}
        </button>
        <div className="header-user">
          <div className="header-user-avatar">
            {user?.nombre?.charAt(0).toUpperCase()}
          </div>
          <span className="header-user-name">{user?.nombre}</span>
        </div>
      </div>
    </header>
  )
}

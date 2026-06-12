import { AlertTriangle, XCircle, Info, CheckCircle, X } from 'lucide-react'
import { useNotifications } from '../../context/NotificationContext'

const icons = {
  warning: <AlertTriangle size={16} />,
  error: <XCircle size={16} />,
  info: <Info size={16} />,
  success: <CheckCircle size={16} />,
}

export default function NotificationCenter() {
  const { notifications, open, setOpen, markAllRead, clearAll } = useNotifications()

  if (!open) return null

  return (
    <>
      <div className="notif-overlay" onClick={() => setOpen(false)} />
      <div className="notif-panel">
        <div className="notif-panel-header">
          <span className="notif-panel-title">Notificaciones</span>
          <div className="notif-panel-actions">
            <button onClick={markAllRead} className="notif-action-btn">Marcar leídas</button>
            <button onClick={clearAll} className="notif-action-btn">Limpiar</button>
            <button onClick={() => setOpen(false)} className="notif-close-btn">
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="notif-list">
          {notifications.length === 0 ? (
            <div className="notif-empty">Sin notificaciones</div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className={`notif-item notif-${n.type} ${n.read ? 'read' : ''}`}>
                <span className={`notif-icon notif-icon-${n.type}`}>{icons[n.type]}</span>
                <div className="notif-body">
                  <p className="notif-msg">{n.message}</p>
                  <span className="notif-time">{n.time}</span>
                </div>
                {!n.read && <span className="notif-dot" />}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

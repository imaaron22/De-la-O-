import { createContext, useContext, useState } from 'react'
import { initialNotifications } from '../data/mockData'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [open, setOpen] = useState(false)

  const unread = notifications.filter(n => !n.read).length

  const addNotification = (type, message) => {
    const now = new Date()
    const time = now.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })
    setNotifications(prev => [
      { id: Date.now(), type, message, time, read: false },
      ...prev,
    ])
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const clearAll = () => setNotifications([])

  return (
    <NotificationContext.Provider value={{ notifications, unread, open, setOpen, addNotification, markAllRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)

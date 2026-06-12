import { createContext, useContext, useState, useEffect } from 'react'
import { users, employees } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('barUser')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const login = (username, password) => {
    const found = users.find(u => u.username === username && u.password === password && u.activo)
    if (found) {
      const session = { id: found.id, username: found.username, rol: found.rol, nombre: found.nombre, empleado_id: found.empleado_id || null }
      setUser(session)
      localStorage.setItem('barUser', JSON.stringify(session))
      return { ok: true, rol: found.rol }
    }
    return { ok: false, error: 'Credenciales incorrectas' }
  }

  const loginWithPin = (pin) => {
    const emp = employees.find(e => e.pin === pin && e.estado === 'ACTIVO')
    if (emp) {
      const session = { id: emp.id, username: emp.codigo, rol: 'EMPLEADO', nombre: `${emp.nombre} ${emp.apellido}`, empleado_id: emp.id }
      setUser(session)
      localStorage.setItem('barUser', JSON.stringify(session))
      return { ok: true }
    }
    return { ok: false, error: 'PIN incorrecto' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('barUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithPin, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Lock, User, Hash, UtensilsCrossed } from 'lucide-react'

export default function Login() {
  const { login, loginWithPin } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('admin')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const handleAdminLogin = (e) => {
    e.preventDefault()
    setError('')
    const result = login(username, password)
    if (result.ok) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
  }

  const handlePinPress = (digit) => {
    if (digit === 'C') { setPin(''); setError(''); return }
    if (digit === '✓') {
      attemptPin(pin)
      return
    }
    if (pin.length >= 4) return
    const newPin = pin + digit
    setPin(newPin)
    if (newPin.length === 4) {
      setTimeout(() => attemptPin(newPin), 200)
    }
  }

  const attemptPin = (enteredPin) => {
    const result = loginWithPin(enteredPin)
    if (result.ok) {
      navigate('/mesas')
    } else {
      setError(result.error)
      setPin('')
    }
  }

  return (
    <div className="login-page">
      {/* Botón al menú público */}
      <Link to="/menu" className="login-menu-link">
        <UtensilsCrossed size={16} />
        Ver menú del bar
      </Link>

      <div className="login-card">
        <div className="login-logo">
          <h1>Bar De la O</h1>
          <p>Sistema de gestión</p>
        </div>

        <div className="login-tabs">
          <button
            className={`login-tab ${tab === 'admin' ? 'active' : ''}`}
            onClick={() => { setTab('admin'); setError(''); setPin('') }}
          >
            <User size={16} /> Admin
          </button>
          <button
            className={`login-tab ${tab === 'empleado' ? 'active' : ''}`}
            onClick={() => { setTab('empleado'); setError(''); }}
          >
            <Hash size={16} /> Empleado (PIN)
          </button>
        </div>

        {tab === 'admin' ? (
          <form onSubmit={handleAdminLogin} className="login-form">
            <div className="form-group">
              <label>Usuario</label>
              <div className="input-icon">
                <User size={16} />
                <input
                  type="text"
                  placeholder="usuario"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <div className="input-icon">
                <Lock size={16} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="btn btn-primary btn-full">
              Iniciar sesión
            </button>
            <p className="login-hint">Prueba: admin / admin123</p>
          </form>
        ) : (
          <div className="pin-section">
            <div className="pin-display">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`pin-dot ${i < pin.length ? 'filled' : ''}`} />
              ))}
            </div>
            {error && <p className="login-error">{error}</p>}
            <div className="pin-grid">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '✓'].map(d => (
                <button
                  key={d}
                  className={`pin-key ${d === 'C' ? 'pin-clear' : d === '✓' ? 'pin-enter' : ''}`}
                  onClick={() => handlePinPress(d)}
                >
                  {d}
                </button>
              ))}
            </div>
            <p className="login-hint">Prueba: PIN 1234 (Juan Pérez)</p>
          </div>
        )}
      </div>
    </div>
  )
}

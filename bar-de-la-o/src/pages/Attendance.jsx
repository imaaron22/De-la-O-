import { useState } from 'react'
import { Clock, CheckCircle, XCircle } from 'lucide-react'
import { employees, attendance as initialAttendance } from '../data/mockData'
import { useNotifications } from '../context/NotificationContext'

export default function Attendance() {
  const { addNotification } = useNotifications()
  const [pin, setPin] = useState('')
  const [message, setMessage] = useState(null)
  const [records, setRecords] = useState(initialAttendance)

  const handlePin = (digit) => {
    if (digit === 'C') { setPin(''); setMessage(null); return }
    if (pin.length >= 4) return
    const newPin = pin + digit

    setPin(newPin)
    if (newPin.length === 4) {
      setTimeout(() => processPin(newPin), 200)
    }
  }

  const processPin = (enteredPin) => {
    const emp = employees.find(e => e.pin === enteredPin && e.estado === 'ACTIVO')
    if (!emp) {
      setMessage({ ok: false, text: 'PIN incorrecto. Intenta de nuevo.' })
      setPin('')
      return
    }

    const today = new Date().toISOString().split('T')[0]
    const todayRecord = records.find(r => r.empleado_id === emp.id && r.fecha === today)
    const now = new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })

    if (!todayRecord) {
      setRecords(prev => [...prev, { id: Date.now(), empleado_id: emp.id, fecha: today, hora_entrada: now, hora_salida: null }])
      setMessage({ ok: true, text: `¡Bienvenido/a ${emp.nombre}! Entrada registrada a las ${now}` })
      addNotification('info', `${emp.nombre} ${emp.apellido} marcó entrada — ${now}`)
    } else if (!todayRecord.hora_salida) {
      setRecords(prev => prev.map(r => r.id === todayRecord.id ? { ...r, hora_salida: now } : r))
      setMessage({ ok: true, text: `¡Hasta luego ${emp.nombre}! Salida registrada a las ${now}` })
      addNotification('info', `${emp.nombre} ${emp.apellido} marcó salida — ${now}`)
    } else {
      setMessage({ ok: false, text: `${emp.nombre} ya registró entrada y salida hoy.` })
    }

    setPin('')
    setTimeout(() => setMessage(null), 4000)
  }

  const today = new Date().toISOString().split('T')[0]
  const todayRecords = records.filter(r => r.fecha === today)

  const getEmpName = (id) => {
    const e = employees.find(e => e.id === id)
    return e ? `${e.nombre} ${e.apellido}` : '—'
  }

  const calcHours = (entrada, salida) => {
    if (!entrada || !salida) return null
    const [eh, em] = entrada.split(':').map(Number)
    const [sh, sm] = salida.split(':').map(Number)
    const mins = (sh * 60 + sm) - (eh * 60 + em)
    return `${Math.floor(mins / 60)}h ${mins % 60}m`
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Control de Asistencia</h2>
      </div>

      <div className="attendance-layout">
        <div className="pin-card">
          <div className="pin-card-title">
            <Clock size={20} />
            <span>Ingresa tu PIN</span>
          </div>

          <div className="pin-display">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`pin-dot ${i < pin.length ? 'filled' : ''}`} />
            ))}
          </div>

          {message && (
            <div className={`pin-message ${message.ok ? 'success' : 'error'}`}>
              {message.ok ? <CheckCircle size={18} /> : <XCircle size={18} />}
              <span>{message.text}</span>
            </div>
          )}

          <div className="pin-grid">
            {['1','2','3','4','5','6','7','8','9','C','0','✓'].map(d => (
              <button
                key={d}
                className={`pin-key ${d === 'C' ? 'pin-clear' : d === '✓' ? 'pin-enter' : ''}`}
                onClick={() => handlePin(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="attendance-records">
          <h3>Registros de hoy — {new Date().toLocaleDateString('es-CR')}</h3>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Empleado</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                  <th>Horas</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {employees.filter(e => e.estado === 'ACTIVO').map(emp => {
                  const rec = todayRecords.find(r => r.empleado_id === emp.id)
                  return (
                    <tr key={emp.id}>
                      <td>
                        <div className="cell-with-avatar">
                          <div className="table-avatar">{emp.nombre.charAt(0)}</div>
                          <span>{emp.nombre} {emp.apellido}</span>
                        </div>
                      </td>
                      <td>{rec?.hora_entrada || <span className="text-muted">—</span>}</td>
                      <td>{rec?.hora_salida || <span className="text-muted">—</span>}</td>
                      <td>{rec ? (calcHours(rec.hora_entrada, rec.hora_salida) || <span className="text-muted">En turno</span>) : <span className="text-muted">—</span>}</td>
                      <td>
                        {!rec && <span className="badge badge-gray">Sin registro</span>}
                        {rec && !rec.hora_salida && <span className="badge badge-green">En turno</span>}
                        {rec && rec.hora_salida && <span className="badge badge-blue">Completo</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

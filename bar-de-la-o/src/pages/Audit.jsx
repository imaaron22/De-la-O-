import { Shield } from 'lucide-react'
import { auditLog, users } from '../data/mockData'

export default function Audit() {
  const getUserName = (id) => users.find(u => u.id === id)?.nombre || '—'

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Auditoría</h2>
        <p className="page-subtitle">Registro de todas las acciones del sistema</p>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>#</th><th>Usuario</th><th>Acción</th><th>Fecha / Hora</th></tr></thead>
          <tbody>
            {[...auditLog].reverse().map(log => (
              <tr key={log.id}>
                <td><span className="code-badge">#{log.id}</span></td>
                <td>
                  <div className="cell-with-avatar">
                    <div className="table-avatar">{getUserName(log.usuario_id).charAt(0)}</div>
                    <span>{getUserName(log.usuario_id)}</span>
                  </div>
                </td>
                <td>{log.accion}</td>
                <td className="text-muted">{log.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { tables as initialTables } from '../data/mockData'
import { Users } from 'lucide-react'

const ESTADOS = ['DISPONIBLE', 'OCUPADA', 'RESERVADA']

export default function Tables() {
  const [tables, setTables] = useState(initialTables)
  const [filter, setFilter] = useState('TODAS')

  const counts = {
    TODAS: tables.length,
    DISPONIBLE: tables.filter(t => t.estado === 'DISPONIBLE').length,
    OCUPADA: tables.filter(t => t.estado === 'OCUPADA').length,
    RESERVADA: tables.filter(t => t.estado === 'RESERVADA').length,
  }

  const visible = filter === 'TODAS' ? tables : tables.filter(t => t.estado === filter)

  const cycleStatus = (id) => {
    setTables(prev => prev.map(t => {
      if (t.id !== id) return t
      const idx = ESTADOS.indexOf(t.estado)
      return { ...t, estado: ESTADOS[(idx + 1) % ESTADOS.length] }
    }))
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Mesas</h2>
        <p className="page-subtitle">Haz clic en una mesa para cambiar su estado</p>
      </div>

      <div className="table-filter-bar">
        {['TODAS', ...ESTADOS].map(f => (
          <button
            key={f}
            className={`filter-btn estado-filter-${f.toLowerCase()} ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f} <span className="filter-count">{counts[f] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="tables-grid">
        {visible.map(t => (
          <button
            key={t.id}
            className={`table-card estado-${t.estado.toLowerCase()}`}
            onClick={() => cycleStatus(t.id)}
          >
            <span className="table-number">Mesa {t.numero}</span>
            <div className="table-capacity">
              <Users size={14} />
              <span>{t.capacidad} personas</span>
            </div>
            <span className={`badge badge-table-${t.estado.toLowerCase()}`}>{t.estado}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

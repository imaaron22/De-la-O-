import { TrendingUp, Users, LayoutGrid, Wallet, Wine, UserCheck } from 'lucide-react'
import { sales, tables, employees, products, formatCRC } from '../data/mockData'

const todaySales = sales.reduce((sum, s) => sum + s.total, 0)
const occupiedTables = tables.filter(t => t.estado === 'OCUPADA').length
const activeEmployees = employees.filter(e => e.estado === 'ACTIVO').length
const topProducts = [
  { nombre: 'Imperial', ventas: 38 },
  { nombre: 'Pilsen', ventas: 25 },
  { nombre: 'Mojito', ventas: 18 },
  { nombre: 'Alitas', ventas: 15 },
  { nombre: 'Nachos', ventas: 12 },
]

const stats = [
  { label: 'Ventas Hoy', value: formatCRC(todaySales), icon: TrendingUp, color: 'green' },
  { label: 'Clientes Atendidos', value: '85', icon: Users, color: 'blue' },
  { label: 'Mesas Ocupadas', value: `${occupiedTables}/${tables.length}`, icon: LayoutGrid, color: 'amber' },
  { label: 'Caja Actual', value: formatCRC(120000), icon: Wallet, color: 'purple' },
]

export default function Dashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Bienvenido al sistema</h2>
          <p className="page-subtitle">Resumen del día — {new Date().toLocaleDateString('es-CR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className={`stat-card stat-${s.color}`}>
            <div className="stat-icon">
              <s.icon size={22} />
            </div>
            <div className="stat-body">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dash-card">
          <div className="dash-card-header">
            <Wine size={18} />
            <h3>Productos más vendidos</h3>
          </div>
          <div className="dash-table">
            {topProducts.map((p, i) => (
              <div key={p.nombre} className="dash-row">
                <span className="dash-rank">#{i + 1}</span>
                <span className="dash-name">{p.nombre}</span>
                <span className="dash-count">{p.ventas} ventas</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <UserCheck size={18} />
            <h3>Empleados activos hoy</h3>
          </div>
          <div className="dash-table">
            {employees.filter(e => e.estado === 'ACTIVO').map(e => (
              <div key={e.id} className="dash-row">
                <div className="dash-avatar">{e.nombre.charAt(0)}</div>
                <div>
                  <span className="dash-name">{e.nombre} {e.apellido}</span>
                  <span className="dash-sub">{e.puesto}</span>
                </div>
                <span className="badge badge-green">Activo</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <TrendingUp size={18} />
            <h3>Ventas recientes</h3>
          </div>
          <div className="dash-table">
            {sales.map(s => (
              <div key={s.id} className="dash-row">
                <span className="dash-name">Venta #{String(s.id).padStart(3, '0')}</span>
                <span className="dash-sub">Mesa {s.mesa_id}</span>
                <span className="dash-amount">{formatCRC(s.total)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <LayoutGrid size={18} />
            <h3>Estado de mesas</h3>
          </div>
          <div className="mini-tables">
            {tables.map(t => (
              <div key={t.id} className={`mini-table estado-${t.estado.toLowerCase()}`} title={`Mesa ${t.numero} — ${t.estado}`}>
                {t.numero}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

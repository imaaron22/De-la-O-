import { BarChart3, TrendingUp, Users, Package, Clock, Wallet } from 'lucide-react'
import { sales, employees, products, formatCRC } from '../data/mockData'

const weekSales = [
  { dia: 'Lun', total: 185000 },
  { dia: 'Mar', total: 210000 },
  { dia: 'Mié', total: 175000 },
  { dia: 'Jue', total: 290000 },
  { dia: 'Vie', total: 380000 },
  { dia: 'Sáb', total: 450000 },
  { dia: 'Hoy', total: sales.reduce((s, v) => s + v.total, 0) },
]
const maxSale = Math.max(...weekSales.map(d => d.total))

const topProducts = [
  { nombre: 'Imperial', ventas: 38, ingresos: 57000 },
  { nombre: 'Pilsen', ventas: 25, ingresos: 37500 },
  { nombre: 'Mojito', ventas: 18, ingresos: 81000 },
  { nombre: 'Alitas', ventas: 15, ingresos: 82500 },
  { nombre: 'Nachos', ventas: 12, ingresos: 42000 },
]

export default function Reports() {
  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Reportes</h2>
        <p className="page-subtitle">Semana del 5 al 11 de junio 2026</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-green"><div className="stat-icon"><TrendingUp size={22} /></div><div className="stat-body"><span className="stat-value">{formatCRC(weekSales.reduce((s, d) => s + d.total, 0))}</span><span className="stat-label">Ventas de la semana</span></div></div>
        <div className="stat-card stat-blue"><div className="stat-icon"><Users size={22} /></div><div className="stat-body"><span className="stat-value">412</span><span className="stat-label">Clientes atendidos</span></div></div>
        <div className="stat-card stat-purple"><div className="stat-icon"><Package size={22} /></div><div className="stat-body"><span className="stat-value">108</span><span className="stat-label">Productos vendidos</span></div></div>
        <div className="stat-card stat-amber"><div className="stat-icon"><Wallet size={22} /></div><div className="stat-body"><span className="stat-value">{formatCRC(1689000)}</span><span className="stat-label">Ingresos del mes</span></div></div>
      </div>

      <div className="dashboard-grid">
        <div className="dash-card dash-chart">
          <div className="dash-card-header">
            <BarChart3 size={18} />
            <h3>Ventas por día (semana actual)</h3>
          </div>
          <div className="bar-chart">
            {weekSales.map(d => (
              <div key={d.dia} className="bar-col">
                <span className="bar-value">{formatCRC(d.total).replace('₡', '')}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ height: `${(d.total / maxSale) * 100}%` }} />
                </div>
                <span className="bar-label">{d.dia}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <TrendingUp size={18} />
            <h3>Productos más vendidos</h3>
          </div>
          <div className="dash-table">
            {topProducts.map((p, i) => (
              <div key={p.nombre} className="dash-row">
                <span className="dash-rank">#{i + 1}</span>
                <span className="dash-name">{p.nombre}</span>
                <span className="dash-sub">{p.ventas} uds.</span>
                <span className="dash-amount">{formatCRC(p.ingresos)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <Clock size={18} />
            <h3>Asistencia de la semana</h3>
          </div>
          <div className="dash-table">
            {employees.filter(e => e.estado === 'ACTIVO').map(e => (
              <div key={e.id} className="dash-row">
                <div className="dash-avatar">{e.nombre.charAt(0)}</div>
                <div>
                  <span className="dash-name">{e.nombre} {e.apellido}</span>
                  <span className="dash-sub">{e.puesto}</span>
                </div>
                <span className="badge badge-green">5/5 días</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <Wallet size={18} />
            <h3>Métodos de pago</h3>
          </div>
          <div className="dash-table">
            {[{ m: 'Efectivo', pct: 45, amount: 150750 }, { m: 'SINPE', pct: 35, amount: 117250 }, { m: 'Tarjeta', pct: 20, amount: 67000 }].map(p => (
              <div key={p.m} className="dash-row">
                <span className="dash-name">{p.m}</span>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${p.pct}%` }} /></div>
                <span className="dash-amount">{p.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { cashMovements as initialMovements, formatCRC } from '../data/mockData'

const INITIAL_AMOUNT = 50000
const TOTAL_SALES = 73450

export default function CashRegister() {
  const [movements, setMovements] = useState(initialMovements)
  const [cajaOpen, setCajaOpen] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ tipo: 'EGRESO', descripcion: '', monto: '' })

  const totalEgresos = movements.filter(m => m.tipo === 'EGRESO').reduce((s, m) => s + m.monto, 0)
  const totalIngresos = movements.filter(m => m.tipo === 'INGRESO' && m.id !== 1).reduce((s, m) => s + m.monto, 0)
  const cajaEsperada = INITIAL_AMOUNT + TOTAL_SALES + totalIngresos - totalEgresos

  const handleSave = () => {
    if (!form.descripcion || !form.monto) return
    setMovements(prev => [...prev, {
      id: Date.now(),
      caja_id: 1,
      tipo: form.tipo,
      descripcion: form.descripcion,
      monto: Number(form.monto),
      fecha: new Date().toLocaleString('es-CR'),
      usuario_id: 1,
    }])
    setForm({ tipo: 'EGRESO', descripcion: '', monto: '' })
    setModal(false)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Caja</h2>
        <div className="header-actions-row">
          <span className={`badge ${cajaOpen ? 'badge-green' : 'badge-gray'}`}>{cajaOpen ? 'ABIERTA' : 'CERRADA'}</span>
          {cajaOpen && <button className="btn btn-primary" onClick={() => setModal(true)}><Plus size={16} /> Movimiento</button>}
          {cajaOpen && <button className="btn btn-danger" onClick={() => setCajaOpen(false)}>Cerrar caja</button>}
        </div>
      </div>

      <div className="caja-summary">
        <div className="caja-card">
          <span className="caja-label">Monto inicial</span>
          <span className="caja-value">{formatCRC(INITIAL_AMOUNT)}</span>
        </div>
        <div className="caja-card">
          <span className="caja-label">Ventas del día</span>
          <span className="caja-value caja-green">{formatCRC(TOTAL_SALES)}</span>
        </div>
        <div className="caja-card">
          <span className="caja-label">Gastos / Egresos</span>
          <span className="caja-value caja-red">{formatCRC(totalEgresos)}</span>
        </div>
        <div className="caja-card caja-total">
          <span className="caja-label">Caja esperada</span>
          <span className="caja-value">{formatCRC(cajaEsperada)}</span>
        </div>
      </div>

      <h3 className="section-title">Movimientos</h3>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Tipo</th><th>Descripción</th><th>Monto</th><th>Fecha/Hora</th></tr></thead>
          <tbody>
            {movements.map(m => (
              <tr key={m.id}>
                <td><span className={`badge ${m.tipo === 'INGRESO' ? 'badge-green' : 'badge-red'}`}>{m.tipo}</span></td>
                <td>{m.descripcion}</td>
                <td className="font-mono">{formatCRC(m.monto)}</td>
                <td>{m.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal modal-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>Nuevo movimiento</h3><button onClick={() => setModal(false)}><X size={18} /></button></div>
            <div className="modal-body">
              <div className="form-group">
                <label>Tipo</label>
                <select value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}>
                  <option value="INGRESO">INGRESO</option>
                  <option value="EGRESO">EGRESO</option>
                </select>
              </div>
              <div className="form-group">
                <label>Descripción *</label>
                <input value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} placeholder="Ej: Compra de hielo" />
              </div>
              <div className="form-group">
                <label>Monto (₡) *</label>
                <input type="number" value={form.monto} onChange={e => setForm(f => ({ ...f, monto: e.target.value }))} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

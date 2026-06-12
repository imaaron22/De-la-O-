import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { purchases as initialData, suppliers, products, formatCRC } from '../data/mockData'

export default function Purchases() {
  const [list, setList] = useState(initialData)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ proveedor_id: '', fecha: new Date().toISOString().split('T')[0], items: [{ producto_id: '', cantidad: '', precio_unitario: '' }] })

  const getSupplierName = (id) => suppliers.find(s => s.id === id)?.nombre || '—'
  const getProductName = (id) => products.find(p => p.id === id)?.nombre || '—'

  const addItem = () => setForm(f => ({ ...f, items: [...f.items, { producto_id: '', cantidad: '', precio_unitario: '' }] }))

  const updateItem = (i, key, val) => {
    setForm(f => {
      const items = [...f.items]
      items[i] = { ...items[i], [key]: val }
      return { ...f, items }
    })
  }

  const calcTotal = () => form.items.reduce((s, i) => s + (Number(i.cantidad) * Number(i.precio_unitario) || 0), 0)

  const handleSave = () => {
    if (!form.proveedor_id) return
    setList(prev => [...prev, { ...form, id: Date.now(), proveedor_id: Number(form.proveedor_id), total: calcTotal() }])
    setModal(false)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Compras</h2>
        <button className="btn btn-primary" onClick={() => setModal(true)}><Plus size={16} /> Nueva compra</button>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>#</th><th>Proveedor</th><th>Fecha</th><th>Productos</th><th>Total</th></tr></thead>
          <tbody>
            {list.map(c => (
              <tr key={c.id}>
                <td><span className="code-badge">#{c.id}</span></td>
                <td>{getSupplierName(c.proveedor_id)}</td>
                <td>{c.fecha}</td>
                <td>{c.items.map(i => `${getProductName(Number(i.producto_id))} x${i.cantidad}`).join(', ')}</td>
                <td className="font-mono">{formatCRC(c.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>Nueva compra</h3><button onClick={() => setModal(false)}><X size={18} /></button></div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Proveedor *</label>
                  <select value={form.proveedor_id} onChange={e => setForm(f => ({ ...f, proveedor_id: e.target.value }))}>
                    <option value="">Seleccionar...</option>
                    {suppliers.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Fecha</label>
                  <input type="date" value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))} />
                </div>
              </div>
              <p className="form-section-title">Productos</p>
              {form.items.map((item, i) => (
                <div key={i} className="form-grid form-item-row">
                  <div className="form-group">
                    <select value={item.producto_id} onChange={e => updateItem(i, 'producto_id', e.target.value)}>
                      <option value="">Producto...</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <input type="number" placeholder="Cantidad" value={item.cantidad} onChange={e => updateItem(i, 'cantidad', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <input type="number" placeholder="Precio unitario ₡" value={item.precio_unitario} onChange={e => updateItem(i, 'precio_unitario', e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="btn btn-secondary" onClick={addItem}><Plus size={14} /> Agregar producto</button>
              <p className="form-total">Total: {formatCRC(calcTotal())}</p>
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

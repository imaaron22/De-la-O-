import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react'
import { suppliers as initialData } from '../data/mockData'

const EMPTY = { nombre: '', telefono: '', correo: '', direccion: '' }

export default function Suppliers() {
  const [list, setList] = useState(initialData)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)

  const filtered = list.filter(s => `${s.nombre} ${s.correo}`.toLowerCase().includes(search.toLowerCase()))

  const openCreate = () => { setForm(EMPTY); setModal('create') }
  const openEdit = (s) => { setForm({ ...s }); setModal('edit') }

  const handleSave = () => {
    if (!form.nombre) return
    if (modal === 'create') {
      setList(prev => [...prev, { ...form, id: Date.now() }])
    } else {
      setList(prev => prev.map(s => s.id === form.id ? form : s))
    }
    setModal(null)
  }

  const handleDelete = (id) => {
    if (confirm('¿Eliminar este proveedor?')) setList(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Proveedores</h2>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Nuevo proveedor</button>
      </div>
      <div className="toolbar">
        <div className="search-wrap"><Search size={16} /><input placeholder="Buscar proveedor..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <span className="toolbar-count">{filtered.length} proveedores</span>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Nombre</th><th>Teléfono</th><th>Correo</th><th>Dirección</th><th>Acciones</th></tr></thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td><span className="cell-main">{s.nombre}</span></td>
                <td>{s.telefono}</td>
                <td>{s.correo}</td>
                <td>{s.direccion}</td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn" onClick={() => openEdit(s)}><Pencil size={15} /></button>
                    <button className="icon-btn danger" onClick={() => handleDelete(s.id)}><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>{modal === 'create' ? 'Nuevo proveedor' : 'Editar proveedor'}</h3><button onClick={() => setModal(null)}><X size={18} /></button></div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group span-2"><label>Nombre *</label><input value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} /></div>
                <div className="form-group"><label>Teléfono</label><input value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} /></div>
                <div className="form-group"><label>Correo</label><input type="email" value={form.correo} onChange={e => setForm(f => ({ ...f, correo: e.target.value }))} /></div>
                <div className="form-group span-2"><label>Dirección</label><input value={form.direccion} onChange={e => setForm(f => ({ ...f, direccion: e.target.value }))} /></div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

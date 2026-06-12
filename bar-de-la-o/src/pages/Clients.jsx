import { useState } from 'react'
import { Plus, Pencil, Search, X } from 'lucide-react'
import { clients as initialData } from '../data/mockData'

const EMPTY = { nombre: '', telefono: '', correo: '' }

export default function Clients() {
  const [list, setList] = useState(initialData)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)

  const filtered = list.filter(c =>
    `${c.nombre} ${c.telefono} ${c.correo}`.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => { setForm(EMPTY); setModal('create') }
  const openEdit = (c) => { setForm({ ...c }); setModal('edit') }

  const handleSave = () => {
    if (!form.nombre) return
    const today = new Date().toISOString().split('T')[0]
    if (modal === 'create') {
      setList(prev => [...prev, { ...form, id: Date.now(), fecha_registro: today }])
    } else {
      setList(prev => prev.map(c => c.id === form.id ? form : c))
    }
    setModal(null)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Clientes</h2>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Nuevo cliente</button>
      </div>
      <div className="toolbar">
        <div className="search-wrap"><Search size={16} /><input placeholder="Buscar cliente..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <span className="toolbar-count">{filtered.length} clientes</span>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Nombre</th><th>Teléfono</th><th>Correo</th><th>Registro</th><th>Acciones</th></tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td><div className="cell-with-avatar"><div className="table-avatar">{c.nombre.charAt(0)}</div><span className="cell-main">{c.nombre}</span></div></td>
                <td>{c.telefono}</td>
                <td>{c.correo}</td>
                <td>{c.fecha_registro}</td>
                <td><button className="icon-btn" onClick={() => openEdit(c)}><Pencil size={15} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>{modal === 'create' ? 'Nuevo cliente' : 'Editar cliente'}</h3><button onClick={() => setModal(null)}><X size={18} /></button></div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group span-2"><label>Nombre *</label><input value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} /></div>
                <div className="form-group"><label>Teléfono</label><input value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} /></div>
                <div className="form-group"><label>Correo</label><input type="email" value={form.correo} onChange={e => setForm(f => ({ ...f, correo: e.target.value }))} /></div>
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

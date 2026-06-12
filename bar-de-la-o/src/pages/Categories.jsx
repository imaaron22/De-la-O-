import { useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { categories as initialData } from '../data/mockData'

export default function Categories() {
  const [list, setList] = useState(initialData)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ nombre: '' })

  const openCreate = () => { setForm({ nombre: '' }); setModal('create') }
  const openEdit = (c) => { setForm({ ...c }); setModal('edit') }

  const handleSave = () => {
    if (!form.nombre) return
    if (modal === 'create') {
      setList(prev => [...prev, { ...form, id: Date.now() }])
    } else {
      setList(prev => prev.map(c => c.id === form.id ? form : c))
    }
    setModal(null)
  }

  const handleDelete = (id) => {
    if (confirm('¿Eliminar esta categoría?')) setList(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Categorías</h2>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Nueva categoría</button>
      </div>
      <div className="cards-grid">
        {list.map(c => (
          <div key={c.id} className="simple-card">
            <span className="simple-card-name">{c.nombre}</span>
            <div className="action-btns">
              <button className="icon-btn" onClick={() => openEdit(c)}><Pencil size={15} /></button>
              <button className="icon-btn danger" onClick={() => handleDelete(c.id)}><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal modal-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>{modal === 'create' ? 'Nueva categoría' : 'Editar categoría'}</h3><button onClick={() => setModal(null)}><X size={18} /></button></div>
            <div className="modal-body">
              <div className="form-group"><label>Nombre *</label><input value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} autoFocus /></div>
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

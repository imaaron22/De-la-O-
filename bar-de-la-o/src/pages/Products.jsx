import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, X, AlertTriangle } from 'lucide-react'
import { products as initialProducts, categories, formatCRC } from '../data/mockData'

const EMPTY = { nombre: '', descripcion: '', precio: '', stock: '', categoria_id: '' }

export default function Products() {
  const [list, setList] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)

  const filtered = list.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter ? p.categoria_id === Number(catFilter) : true
    return matchSearch && matchCat
  })

  const getCatName = (id) => categories.find(c => c.id === id)?.nombre || '—'

  const openCreate = () => { setForm(EMPTY); setModal('create') }
  const openEdit = (p) => { setForm({ ...p }); setModal('edit') }

  const handleSave = () => {
    if (!form.nombre || !form.precio) return
    if (modal === 'create') {
      setList(prev => [...prev, { ...form, id: Date.now(), precio: Number(form.precio), stock: Number(form.stock), categoria_id: Number(form.categoria_id) }])
    } else {
      setList(prev => prev.map(p => p.id === form.id ? { ...form, precio: Number(form.precio), stock: Number(form.stock), categoria_id: Number(form.categoria_id) } : p))
    }
    setModal(null)
  }

  const handleDelete = (id) => {
    if (confirm('¿Eliminar este producto?')) {
      setList(prev => prev.filter(p => p.id !== id))
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Productos</h2>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Nuevo producto</button>
      </div>

      <div className="toolbar">
        <div className="search-wrap">
          <Search size={16} />
          <input placeholder="Buscar producto..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="select-filter" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
        <span className="toolbar-count">{filtered.length} productos</span>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className={p.stock === 0 ? 'row-danger' : p.stock <= 3 ? 'row-warning' : ''}>
                <td>
                  <span className="cell-main">{p.nombre}</span>
                  <span className="cell-sub">{p.descripcion}</span>
                </td>
                <td><span className="badge badge-purple">{getCatName(p.categoria_id)}</span></td>
                <td className="font-mono">{formatCRC(p.precio)}</td>
                <td>
                  <span className={`stock-badge ${p.stock === 0 ? 'stock-out' : p.stock <= 3 ? 'stock-low' : 'stock-ok'}`}>
                    {p.stock === 0 && <AlertTriangle size={12} />} {p.stock}
                  </span>
                </td>
                <td>
                  {p.stock === 0
                    ? <span className="badge badge-red">Agotado</span>
                    : p.stock <= 3
                      ? <span className="badge badge-yellow">Stock bajo</span>
                      : <span className="badge badge-green">Disponible</span>}
                </td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn" onClick={() => openEdit(p)}><Pencil size={15} /></button>
                    <button className="icon-btn danger" onClick={() => handleDelete(p.id)}><Trash2 size={15} /></button>
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
            <div className="modal-header">
              <h3>{modal === 'create' ? 'Nuevo producto' : 'Editar producto'}</h3>
              <button onClick={() => setModal(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group span-2">
                  <label>Nombre *</label>
                  <input value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
                </div>
                <div className="form-group span-2">
                  <label>Descripción</label>
                  <input value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Precio (₡) *</label>
                  <input type="number" value={form.precio} onChange={e => setForm(f => ({ ...f, precio: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
                </div>
                <div className="form-group span-2">
                  <label>Categoría</label>
                  <select value={form.categoria_id} onChange={e => setForm(f => ({ ...f, categoria_id: e.target.value }))}>
                    <option value="">Seleccionar...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                </div>
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

import { useState } from 'react'
import { Plus, Pencil, UserX, Search, X } from 'lucide-react'
import { employees as initialData, formatCRC } from '../data/mockData'

const EMPTY = { codigo: '', nombre: '', apellido: '', telefono: '', correo: '', puesto: '', salario: '', pin: '', fecha_contratacion: '', estado: 'ACTIVO' }
const puestos = ['Mesero', 'Mesera', 'Bartender', 'Cajero', 'Cajera', 'Cocinero', 'Cocinera', 'Seguridad', 'Limpieza']

export default function Employees() {
  const [list, setList] = useState(initialData)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)

  const filtered = list.filter(e =>
    `${e.nombre} ${e.apellido} ${e.codigo} ${e.puesto}`.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    const nextId = Math.max(...list.map(e => e.id)) + 1
    const nextCode = `EMP${String(nextId).padStart(3, '0')}`
    setForm({ ...EMPTY, codigo: nextCode })
    setModal('create')
  }

  const openEdit = (emp) => {
    setForm({ ...emp })
    setModal('edit')
  }

  const handleSave = () => {
    if (!form.nombre || !form.apellido || !form.pin) return
    if (modal === 'create') {
      const newId = Math.max(...list.map(e => e.id)) + 1
      setList(prev => [...prev, { ...form, id: newId, salario: Number(form.salario) }])
    } else {
      setList(prev => prev.map(e => e.id === form.id ? { ...form, salario: Number(form.salario) } : e))
    }
    setModal(null)
  }

  const toggleStatus = (id) => {
    setList(prev => prev.map(e => e.id === id ? { ...e, estado: e.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO' } : e))
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Empleados</h2>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} /> Nuevo empleado
        </button>
      </div>

      <div className="toolbar">
        <div className="search-wrap">
          <Search size={16} />
          <input placeholder="Buscar empleado..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <span className="toolbar-count">{filtered.length} empleados</span>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Puesto</th>
              <th>Teléfono</th>
              <th>Salario</th>
              <th>PIN</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id}>
                <td><span className="code-badge">{e.codigo}</span></td>
                <td>
                  <div className="cell-with-avatar">
                    <div className="table-avatar">{e.nombre.charAt(0)}</div>
                    <div>
                      <span className="cell-main">{e.nombre} {e.apellido}</span>
                      <span className="cell-sub">{e.correo}</span>
                    </div>
                  </div>
                </td>
                <td>{e.puesto}</td>
                <td>{e.telefono}</td>
                <td>{formatCRC(e.salario)}</td>
                <td><span className="pin-badge">••••</span></td>
                <td>
                  <span className={`badge ${e.estado === 'ACTIVO' ? 'badge-green' : 'badge-gray'}`}>
                    {e.estado}
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn" onClick={() => openEdit(e)} title="Editar">
                      <Pencil size={15} />
                    </button>
                    <button className="icon-btn danger" onClick={() => toggleStatus(e.id)} title={e.estado === 'ACTIVO' ? 'Desactivar' : 'Activar'}>
                      <UserX size={15} />
                    </button>
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
              <h3>{modal === 'create' ? 'Nuevo empleado' : 'Editar empleado'}</h3>
              <button onClick={() => setModal(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Código</label>
                  <input value={form.codigo} readOnly className="input-readonly" />
                </div>
                <div className="form-group">
                  <label>PIN (4 dígitos) *</label>
                  <input maxLength={4} value={form.pin} onChange={e => setForm(f => ({ ...f, pin: e.target.value }))} placeholder="1234" />
                </div>
                <div className="form-group">
                  <label>Nombre *</label>
                  <input value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Apellido *</label>
                  <input value={form.apellido} onChange={e => setForm(f => ({ ...f, apellido: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Correo</label>
                  <input type="email" value={form.correo} onChange={e => setForm(f => ({ ...f, correo: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Puesto</label>
                  <select value={form.puesto} onChange={e => setForm(f => ({ ...f, puesto: e.target.value }))}>
                    <option value="">Seleccionar...</option>
                    {puestos.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Salario (₡)</label>
                  <input type="number" value={form.salario} onChange={e => setForm(f => ({ ...f, salario: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Fecha contratación</label>
                  <input type="date" value={form.fecha_contratacion} onChange={e => setForm(f => ({ ...f, fecha_contratacion: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Estado</label>
                  <select value={form.estado} onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}>
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="INACTIVO">INACTIVO</option>
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

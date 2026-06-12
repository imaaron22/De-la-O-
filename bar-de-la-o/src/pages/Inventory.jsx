import { useState } from 'react'
import { AlertTriangle, XCircle, Search } from 'lucide-react'
import { products, categories } from '../data/mockData'

export default function Inventory() {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [list, setList] = useState(products)

  const filtered = list.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter ? p.categoria_id === Number(catFilter) : true
    return matchSearch && matchCat
  })

  const lowStock = list.filter(p => p.stock > 0 && p.stock <= 5).length
  const outOfStock = list.filter(p => p.stock === 0).length

  const updateStock = (id, delta) => {
    setList(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Inventario</h2>
        <div className="header-alerts">
          {outOfStock > 0 && <span className="alert-chip red"><XCircle size={14} /> {outOfStock} agotados</span>}
          {lowStock > 0 && <span className="alert-chip yellow"><AlertTriangle size={14} /> {lowStock} stock bajo</span>}
        </div>
      </div>
      <div className="toolbar">
        <div className="search-wrap"><Search size={16} /><input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <select className="select-filter" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Producto</th><th>Categoría</th><th>Stock</th><th>Estado</th><th>Ajustar</th></tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className={p.stock === 0 ? 'row-danger' : p.stock <= 5 ? 'row-warning' : ''}>
                <td><span className="cell-main">{p.nombre}</span></td>
                <td>{categories.find(c => c.id === p.categoria_id)?.nombre}</td>
                <td>
                  <span className={`stock-badge ${p.stock === 0 ? 'stock-out' : p.stock <= 5 ? 'stock-low' : 'stock-ok'}`}>
                    {p.stock === 0 && <XCircle size={12} />}
                    {p.stock > 0 && p.stock <= 5 && <AlertTriangle size={12} />}
                    {p.stock}
                  </span>
                </td>
                <td>
                  {p.stock === 0
                    ? <span className="badge badge-red">Agotado</span>
                    : p.stock <= 5
                      ? <span className="badge badge-yellow">Stock bajo</span>
                      : <span className="badge badge-green">OK</span>}
                </td>
                <td>
                  <div className="stock-adjust">
                    <button className="adj-btn" onClick={() => updateStock(p.id, -1)}>−</button>
                    <button className="adj-btn adj-add" onClick={() => updateStock(p.id, 10)}>+10</button>
                    <button className="adj-btn adj-add" onClick={() => updateStock(p.id, 1)}>+1</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

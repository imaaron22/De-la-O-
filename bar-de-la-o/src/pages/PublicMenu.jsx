import { useState, useEffect } from 'react'
import { getMenuItems, getCategories } from '../services/api'
import { Link } from 'react-router-dom'

const categoryIcons = {
  'Cervezas': '🍺',
  'Cócteles': '🍹',
  'Licores': '🥃',
  'Comidas': '🍔',
  'Snacks': '🍟',
}

function formatCRC(amount) {
  return '₡' + Number(amount).toLocaleString('es-CR')
}

export default function PublicMenu() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('TODAS')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    Promise.all([getMenuItems(), getCategories()]).then(([prods, cats]) => {
      setProducts(prods.filter(p => p.stock > 0))
      setCategories(cats)
      setLoading(false)
    })
  }, [])

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'TODAS'
      ? true
      : categories.find(c => c.nombre === activeCategory)?.id === p.categoria_id
    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const getCatName = (id) => categories.find(c => c.id === id)?.nombre || ''

  return (
    <div className="public-menu-page">
      {/* HEADER */}
      <header className="public-header">
        <div className="public-header-inner">
          <div className="public-logo">
            <span className="public-logo-text">Bar De la O</span>
            <span className="public-logo-tag">Menú</span>
          </div>
          <Link to="/login" className="public-admin-btn">
            Acceso empleados
          </Link>
        </div>
      </header>

      {/* HERO */}
      <div className="public-hero">
        <h1>Nuestro Menú</h1>
        <p>Bebidas y comidas para todos los gustos</p>
        <div className="public-search">
          <input
            type="search"
            placeholder="Buscar platillo o bebida..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="public-cats">
        <button
          className={`public-cat-btn ${activeCategory === 'TODAS' ? 'active' : ''}`}
          onClick={() => setActiveCategory('TODAS')}
        >
          🍽️ Todos
        </button>
        {categories.map(c => (
          <button
            key={c.id}
            className={`public-cat-btn ${activeCategory === c.nombre ? 'active' : ''}`}
            onClick={() => setActiveCategory(c.nombre)}
          >
            {categoryIcons[c.nombre] || '•'} {c.nombre}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <main className="public-main">
        {loading ? (
          <div className="public-loading">
            <div className="spinner" />
            <p>Cargando menú...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="public-empty">
            <p>No hay productos disponibles en esta categoría.</p>
          </div>
        ) : (
          <>
            {/* If showing ALL, group by category */}
            {activeCategory === 'TODAS' && !search ? (
              categories.map(cat => {
                const catProducts = filtered.filter(p => p.categoria_id === cat.id)
                if (catProducts.length === 0) return null
                return (
                  <section key={cat.id} className="public-section">
                    <h2 className="public-section-title">
                      <span>{categoryIcons[cat.nombre] || '•'}</span>
                      {cat.nombre}
                    </h2>
                    <div className="public-grid">
                      {catProducts.map(p => (
                        <ProductCard key={p.id} product={p} catName={getCatName(p.categoria_id)} />
                      ))}
                    </div>
                  </section>
                )
              })
            ) : (
              <div className="public-grid">
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} catName={getCatName(p.categoria_id)} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer className="public-footer">
        <p>Bar De la O — Pregunta a tu mesero por nuestras especialidades del día</p>
      </footer>
    </div>
  )
}

function ProductCard({ product, catName }) {
  return (
    <div className="product-card">
      <div className="product-card-img">
        <span className="product-placeholder-icon">
          {categoryIcons[catName] || '🍽️'}
        </span>
      </div>
      <div className="product-card-body">
        <div className="product-card-top">
          <h3 className="product-name">{product.nombre}</h3>
          <span className="product-cat-chip">{catName}</span>
        </div>
        {product.descripcion && (
          <p className="product-desc">{product.descripcion}</p>
        )}
        <div className="product-card-footer">
          <span className="product-price">{formatCRC(product.precio)}</span>
          <span className="product-available">Disponible</span>
        </div>
      </div>
    </div>
  )
}

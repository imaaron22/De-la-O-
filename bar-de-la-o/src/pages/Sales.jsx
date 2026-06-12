import { useState } from 'react'
import { Plus, Minus, Trash2, ShoppingCart, CheckCircle } from 'lucide-react'
import { products, categories, tables, clients, formatCRC } from '../data/mockData'
import { useNotifications } from '../context/NotificationContext'

const TAX = 0.13

export default function Sales() {
  const { addNotification } = useNotifications()
  const [catFilter, setCatFilter] = useState('')
  const [cart, setCart] = useState([])
  const [selectedTable, setSelectedTable] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [payMethod, setPayMethod] = useState('EFECTIVO')
  const [done, setDone] = useState(false)

  const filteredProducts = catFilter
    ? products.filter(p => p.categoria_id === Number(catFilter) && p.stock > 0)
    : products.filter(p => p.stock > 0)

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const changeQty = (id, delta) => {
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    )
  }

  const subtotal = cart.reduce((s, i) => s + i.precio * i.qty, 0)
  const tax = subtotal * TAX
  const total = subtotal + tax

  const handlePay = () => {
    if (cart.length === 0 || !selectedTable) return
    addNotification('success', `Venta registrada — ${formatCRC(total)} — ${payMethod}`)
    setDone(true)
    setTimeout(() => {
      setCart([])
      setSelectedTable('')
      setSelectedClient('')
      setPayMethod('EFECTIVO')
      setDone(false)
    }, 2500)
  }

  if (done) {
    return (
      <div className="page sale-done">
        <CheckCircle size={56} className="done-icon" />
        <h2>¡Venta registrada!</h2>
        <p className="done-total">{formatCRC(total)}</p>
        <p className="done-method">{payMethod}</p>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Registrar Venta</h2>
      </div>

      <div className="pos-layout">
        <div className="pos-products">
          <div className="pos-cat-filter">
            <button className={`cat-btn ${catFilter === '' ? 'active' : ''}`} onClick={() => setCatFilter('')}>Todos</button>
            {categories.map(c => (
              <button key={c.id} className={`cat-btn ${catFilter === String(c.id) ? 'active' : ''}`} onClick={() => setCatFilter(String(c.id))}>
                {c.nombre}
              </button>
            ))}
          </div>
          <div className="pos-grid">
            {filteredProducts.map(p => (
              <button key={p.id} className="pos-product-card" onClick={() => addToCart(p)}>
                <span className="pos-prod-name">{p.nombre}</span>
                <span className="pos-prod-price">{formatCRC(p.precio)}</span>
                <span className="pos-prod-stock">Stock: {p.stock}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pos-order">
          <div className="pos-order-header">
            <ShoppingCart size={18} />
            <span>Orden actual</span>
          </div>

          <div className="pos-selects">
            <select value={selectedTable} onChange={e => setSelectedTable(e.target.value)}>
              <option value="">Seleccionar mesa *</option>
              {tables.map(t => <option key={t.id} value={t.id}>Mesa {t.numero} — {t.estado}</option>)}
            </select>
            <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)}>
              <option value="">Cliente (opcional)</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>

          <div className="pos-cart">
            {cart.length === 0
              ? <p className="cart-empty">Agrega productos de la izquierda</p>
              : cart.map(item => (
                <div key={item.id} className="cart-item">
                  <span className="cart-name">{item.nombre}</span>
                  <div className="cart-qty">
                    <button onClick={() => changeQty(item.id, -1)}><Minus size={13} /></button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)}><Plus size={13} /></button>
                  </div>
                  <span className="cart-price">{formatCRC(item.precio * item.qty)}</span>
                  <button className="cart-remove" onClick={() => changeQty(item.id, -item.qty)}><Trash2 size={13} /></button>
                </div>
              ))
            }
          </div>

          <div className="pos-totals">
            <div className="pos-total-row"><span>Subtotal</span><span>{formatCRC(subtotal)}</span></div>
            <div className="pos-total-row"><span>IVA 13%</span><span>{formatCRC(tax)}</span></div>
            <div className="pos-total-row total-row"><span>Total</span><span>{formatCRC(total)}</span></div>
          </div>

          <div className="pos-payment">
            <p className="pos-payment-label">Método de pago</p>
            <div className="pay-methods">
              {['EFECTIVO', 'TARJETA', 'SINPE'].map(m => (
                <button key={m} className={`pay-btn ${payMethod === m ? 'active' : ''}`} onClick={() => setPayMethod(m)}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn btn-primary btn-full pay-action"
            onClick={handlePay}
            disabled={cart.length === 0 || !selectedTable}
          >
            Cobrar {formatCRC(total)}
          </button>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingCart, Receipt, LayoutGrid, Users, Package,
  Wine, Tag, Boxes, Truck, ShoppingBag, UserCheck, Clock, Wallet,
  ArrowLeftRight, BarChart3, Shield, Settings, ChevronDown, LogOut,
  PanelLeftClose, PanelLeftOpen, UtensilsCrossed,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const menuGroups = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
    roles: ['ADMIN'],
  },
  {
    id: 'ventas',
    label: 'Ventas',
    icon: ShoppingCart,
    roles: ['ADMIN', 'EMPLEADO'],
    children: [
      { label: 'Registrar Venta', icon: Receipt, path: '/ventas' },
      { label: 'Mesas', icon: LayoutGrid, path: '/mesas' },
      { label: 'Clientes', icon: Users, path: '/clientes' },
    ],
  },
  {
    id: 'inventario',
    label: 'Inventario',
    icon: Package,
    roles: ['ADMIN'],
    children: [
      { label: 'Productos', icon: Wine, path: '/productos' },
      { label: 'Categorías', icon: Tag, path: '/categorias' },
      { label: 'Inventario', icon: Boxes, path: '/inventario' },
      { label: 'Proveedores', icon: Truck, path: '/proveedores' },
      { label: 'Compras', icon: ShoppingBag, path: '/compras' },
    ],
  },
  {
    id: 'personal',
    label: 'Personal',
    icon: UserCheck,
    roles: ['ADMIN'],
    children: [
      { label: 'Empleados', icon: UserCheck, path: '/empleados' },
      { label: 'Asistencia', icon: Clock, path: '/asistencia' },
    ],
  },
  {
    id: 'caja',
    label: 'Caja',
    icon: Wallet,
    roles: ['ADMIN'],
    children: [
      { label: 'Apertura / Cierre', icon: Wallet, path: '/caja' },
      { label: 'Movimientos', icon: ArrowLeftRight, path: '/caja/movimientos' },
    ],
  },
  {
    id: 'reportes',
    label: 'Reportes',
    icon: BarChart3,
    path: '/reportes',
    roles: ['ADMIN'],
  },
  {
    id: 'auditoria',
    label: 'Auditoría',
    icon: Shield,
    path: '/auditoria',
    roles: ['ADMIN'],
  },
  {
    id: 'config',
    label: 'Configuración',
    icon: Settings,
    path: '/configuracion',
    roles: ['ADMIN'],
  },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [openGroups, setOpenGroups] = useState(['ventas'])

  const toggleGroup = (id) => {
    setOpenGroups(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const visible = menuGroups.filter(g => g.roles.includes(user?.rol))

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          {!collapsed && <span>Bar De la O</span>}
        </div>
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(c => !c)}
          title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {visible.map(group => {
          if (!group.children) {
            return (
              <NavLink
                key={group.id}
                to={group.path}
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                title={collapsed ? group.label : undefined}
              >
                <group.icon size={18} className="sidebar-icon" />
                {!collapsed && <span>{group.label}</span>}
              </NavLink>
            )
          }

          const isOpen = openGroups.includes(group.id)
          return (
            <div key={group.id} className="sidebar-group">
              <button
                className={`sidebar-group-btn ${isOpen ? 'open' : ''}`}
                onClick={() => !collapsed && toggleGroup(group.id)}
                title={collapsed ? group.label : undefined}
              >
                <group.icon size={18} className="sidebar-icon" />
                {!collapsed && (
                  <>
                    <span className="sidebar-group-label">{group.label}</span>
                    <ChevronDown size={14} className={`chevron ${isOpen ? 'rotated' : ''}`} />
                  </>
                )}
              </button>
              {(isOpen || collapsed) && (
                <div className={`sidebar-children ${collapsed ? 'children-collapsed' : ''}`}>
                  {group.children.map(child => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) => `sidebar-child ${isActive ? 'active' : ''}`}
                      title={collapsed ? child.label : undefined}
                    >
                      <child.icon size={15} className="sidebar-icon" />
                      {!collapsed && <span>{child.label}</span>}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <Link
          to="/menu"
          target="_blank"
          className="sidebar-menu-link"
          title="Ver menú público"
        >
          <UtensilsCrossed size={16} />
          {!collapsed && <span>Ver menú público</span>}
        </Link>
        {!collapsed && (
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user?.nombre}</span>
            <span className="sidebar-user-role">{user?.rol}</span>
          </div>
        )}
        <button className="sidebar-logout" onClick={handleLogout} title="Cerrar sesión">
          <LogOut size={16} />
          {!collapsed && <span>Salir</span>}
        </button>
      </div>
    </aside>
  )
}

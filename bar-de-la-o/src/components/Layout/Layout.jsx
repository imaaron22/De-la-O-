import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import NotificationCenter from './NotificationCenter'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/ventas': 'Registrar Venta',
  '/mesas': 'Mesas',
  '/clientes': 'Clientes',
  '/productos': 'Productos',
  '/categorias': 'Categorías',
  '/inventario': 'Inventario',
  '/proveedores': 'Proveedores',
  '/compras': 'Compras',
  '/empleados': 'Empleados',
  '/asistencia': 'Control de Asistencia',
  '/caja': 'Caja',
  '/caja/movimientos': 'Movimientos de Caja',
  '/reportes': 'Reportes',
  '/auditoria': 'Auditoría',
  '/configuracion': 'Configuración',
}

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()
  const title = pageTitles[pathname] || 'Bar De la O'

  return (
    <div className={`app-layout ${collapsed ? 'sidebar-is-collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="main-area">
        <Header title={title} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <NotificationCenter />
    </div>
  )
}

import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout/Layout'
import Login from './pages/Login'
import PublicMenu from './pages/PublicMenu'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Attendance from './pages/Attendance'
import Clients from './pages/Clients'
import Tables from './pages/Tables'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Inventory from './pages/Inventory'
import Suppliers from './pages/Suppliers'
import Purchases from './pages/Purchases'
import Sales from './pages/Sales'
import CashRegister from './pages/CashRegister'
import CashMovements from './pages/CashMovements'
import Reports from './pages/Reports'
import Audit from './pages/Audit'
import Config from './pages/Config'
import './App.css'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Rutas públicas — sin login */}
      <Route path="/menu" element={<PublicMenu />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="ventas" element={<Sales />} />
        <Route path="mesas" element={<Tables />} />
        <Route path="clientes" element={<Clients />} />
        <Route path="productos" element={<Products />} />
        <Route path="categorias" element={<Categories />} />
        <Route path="inventario" element={<Inventory />} />
        <Route path="proveedores" element={<Suppliers />} />
        <Route path="compras" element={<Purchases />} />
        <Route path="empleados" element={<Employees />} />
        <Route path="asistencia" element={<Attendance />} />
        <Route path="caja" element={<CashRegister />} />
        <Route path="caja/movimientos" element={<CashMovements />} />
        <Route path="reportes" element={<Reports />} />
        <Route path="auditoria" element={<Audit />} />
        <Route path="configuracion" element={<Config />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App

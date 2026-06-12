/**
 * Capa de servicios — Bar De la O
 *
 * Cuando tengas las credenciales de Azure SQL, reemplaza cada función
 * con una llamada real a tu API / backend.
 *
 * Ejemplo con backend Node.js:
 *   const BASE = import.meta.env.VITE_API_URL  // ej: https://tu-api.azurewebsites.net
 *   export const getMenuItems = () => fetch(`${BASE}/api/productos`).then(r => r.json())
 *
 * Por ahora usa los datos mock del proyecto.
 */

import { products, categories, employees as empData } from '../data/mockData'

// Simula un pequeño delay de red para que se vea realista
const delay = (ms = 250) => new Promise(res => setTimeout(res, ms))

// ─── MENÚ PÚBLICO ────────────────────────────────────────────────────────────

export async function getMenuItems() {
  await delay()
  return products
}

export async function getCategories() {
  await delay()
  return categories
}

// ─── EMPLEADOS ────────────────────────────────────────────────────────────────

export async function getEmployees() {
  await delay()
  return empData
}

// ─── VENTAS ───────────────────────────────────────────────────────────────────

export async function createSale(saleData) {
  await delay(400)
  // TODO: POST /api/ventas
  console.log('Venta a registrar:', saleData)
  return { id: Date.now(), ...saleData }
}

// ─── ASISTENCIA ───────────────────────────────────────────────────────────────

export async function registerAttendance(empleadoId, tipo) {
  await delay()
  // TODO: POST /api/asistencia
  console.log(`Asistencia ${tipo} para empleado ${empleadoId}`)
  return { ok: true }
}

// ─── INVENTARIO ───────────────────────────────────────────────────────────────

export async function updateStock(productoId, cantidad) {
  await delay()
  // TODO: PATCH /api/productos/:id/stock
  console.log(`Stock de producto ${productoId} actualizado a ${cantidad}`)
  return { ok: true }
}

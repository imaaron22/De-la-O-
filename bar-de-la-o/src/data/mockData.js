export const users = [
  { id: 1, username: 'admin', password: 'admin123', rol: 'ADMIN', nombre: 'Administrador', activo: true },
  { id: 2, username: 'juan.perez', password: 'emp123', rol: 'EMPLEADO', nombre: 'Juan Pérez', empleado_id: 1, activo: true },
  { id: 3, username: 'maria.gonzalez', password: 'emp123', rol: 'EMPLEADO', nombre: 'María González', empleado_id: 2, activo: true },
]

export const employees = [
  { id: 1, codigo: 'EMP001', nombre: 'Juan', apellido: 'Pérez', telefono: '8888-1234', correo: 'juan@bar.com', puesto: 'Mesero', salario: 450000, pin: '1234', fecha_contratacion: '2023-01-15', estado: 'ACTIVO' },
  { id: 2, codigo: 'EMP002', nombre: 'María', apellido: 'González', telefono: '8888-5678', correo: 'maria@bar.com', puesto: 'Bartender', salario: 500000, pin: '5678', fecha_contratacion: '2023-03-20', estado: 'ACTIVO' },
  { id: 3, codigo: 'EMP003', nombre: 'Carlos', apellido: 'Rodríguez', telefono: '8888-9012', correo: 'carlos@bar.com', puesto: 'Cajero', salario: 480000, pin: '9012', fecha_contratacion: '2022-11-01', estado: 'ACTIVO' },
  { id: 4, codigo: 'EMP004', nombre: 'Ana', apellido: 'Mora', telefono: '8888-3456', correo: 'ana@bar.com', puesto: 'Mesera', salario: 450000, pin: '3456', fecha_contratacion: '2024-02-10', estado: 'INACTIVO' },
]

export const categories = [
  { id: 1, nombre: 'Cervezas' },
  { id: 2, nombre: 'Cócteles' },
  { id: 3, nombre: 'Licores' },
  { id: 4, nombre: 'Comidas' },
  { id: 5, nombre: 'Snacks' },
]

export const products = [
  { id: 1, nombre: 'Imperial', descripcion: 'Cerveza nacional 350ml', precio: 1500, stock: 48, categoria_id: 1 },
  { id: 2, nombre: 'Pilsen', descripcion: 'Cerveza nacional 350ml', precio: 1500, stock: 36, categoria_id: 1 },
  { id: 3, nombre: 'Bavaria', descripcion: 'Cerveza oscura 350ml', precio: 1600, stock: 24, categoria_id: 1 },
  { id: 4, nombre: 'Mojito', descripcion: 'Cóctel con menta y limón', precio: 4500, stock: 20, categoria_id: 2 },
  { id: 5, nombre: 'Margarita', descripcion: 'Cóctel con tequila', precio: 5000, stock: 15, categoria_id: 2 },
  { id: 6, nombre: 'Gin Tonic', descripcion: 'Con Bombay Sapphire', precio: 5500, stock: 0, categoria_id: 2 },
  { id: 7, nombre: 'Tequila (shot)', descripcion: 'José Cuervo 1oz', precio: 3000, stock: 2, categoria_id: 3 },
  { id: 8, nombre: 'Ron (shot)', descripcion: 'Flor de Caña 1oz', precio: 2500, stock: 18, categoria_id: 3 },
  { id: 9, nombre: 'Hamburguesa', descripcion: 'Con papas fritas', precio: 6500, stock: 12, categoria_id: 4 },
  { id: 10, nombre: 'Alitas', descripcion: '10 unidades con salsa', precio: 5500, stock: 8, categoria_id: 4 },
  { id: 11, nombre: 'Nachos', descripcion: 'Con guacamole y jalapeños', precio: 3500, stock: 25, categoria_id: 5 },
  { id: 12, nombre: 'Papas fritas', descripcion: 'Porción grande', precio: 2000, stock: 30, categoria_id: 5 },
]

export const tables = [
  { id: 1, numero: 1, capacidad: 4, estado: 'DISPONIBLE' },
  { id: 2, numero: 2, capacidad: 6, estado: 'OCUPADA' },
  { id: 3, numero: 3, capacidad: 4, estado: 'RESERVADA' },
  { id: 4, numero: 4, capacidad: 2, estado: 'DISPONIBLE' },
  { id: 5, numero: 5, capacidad: 8, estado: 'OCUPADA' },
  { id: 6, numero: 6, capacidad: 4, estado: 'DISPONIBLE' },
  { id: 7, numero: 7, capacidad: 4, estado: 'DISPONIBLE' },
  { id: 8, numero: 8, capacidad: 6, estado: 'OCUPADA' },
  { id: 9, numero: 9, capacidad: 4, estado: 'DISPONIBLE' },
  { id: 10, numero: 10, capacidad: 2, estado: 'RESERVADA' },
  { id: 11, numero: 11, capacidad: 4, estado: 'DISPONIBLE' },
  { id: 12, numero: 12, capacidad: 8, estado: 'DISPONIBLE' },
  { id: 13, numero: 13, capacidad: 4, estado: 'OCUPADA' },
  { id: 14, numero: 14, capacidad: 6, estado: 'DISPONIBLE' },
  { id: 15, numero: 15, capacidad: 4, estado: 'DISPONIBLE' },
]

export const clients = [
  { id: 1, nombre: 'Roberto Soto', telefono: '6666-1234', correo: 'roberto@email.com', fecha_registro: '2024-01-10' },
  { id: 2, nombre: 'Laura Jiménez', telefono: '6666-5678', correo: 'laura@email.com', fecha_registro: '2024-02-15' },
  { id: 3, nombre: 'Pedro Castro', telefono: '6666-9012', correo: 'pedro@email.com', fecha_registro: '2024-03-20' },
  { id: 4, nombre: 'Sofía Vargas', telefono: '6666-3456', correo: 'sofia@email.com', fecha_registro: '2024-04-05' },
]

export const suppliers = [
  { id: 1, nombre: 'Distribuidora Nacional S.A.', telefono: '2222-1234', correo: 'ventas@distnacional.com', direccion: 'San José Centro' },
  { id: 2, nombre: 'Cervecería Costa Rica', telefono: '2222-5678', correo: 'pedidos@crc.com', direccion: 'Alajuela' },
  { id: 3, nombre: 'Alimentos y Más', telefono: '2222-9012', correo: 'info@alimentos.com', direccion: 'Cartago' },
]

export const purchases = [
  { id: 1, proveedor_id: 2, fecha: '2026-06-10', total: 125000, items: [{ producto_id: 1, cantidad: 50, precio_unitario: 900 }, { producto_id: 2, cantidad: 50, precio_unitario: 900 }] },
  { id: 2, proveedor_id: 3, fecha: '2026-06-09', total: 85000, items: [{ producto_id: 9, cantidad: 20, precio_unitario: 2500 }, { producto_id: 11, cantidad: 30, precio_unitario: 1000 }] },
]

export const sales = [
  { id: 1, cliente_id: null, empleado_id: 1, mesa_id: 2, fecha: '2026-06-11', subtotal: 13000, impuesto: 1690, total: 14690, metodo_pago: 'EFECTIVO' },
  { id: 2, cliente_id: 2, empleado_id: 2, mesa_id: 5, fecha: '2026-06-11', subtotal: 19000, impuesto: 2470, total: 21470, metodo_pago: 'SINPE' },
  { id: 3, cliente_id: null, empleado_id: 1, mesa_id: 8, fecha: '2026-06-11', subtotal: 7500, impuesto: 975, total: 8475, metodo_pago: 'EFECTIVO' },
  { id: 4, cliente_id: 1, empleado_id: 3, mesa_id: 13, fecha: '2026-06-11', subtotal: 25500, impuesto: 3315, total: 28815, metodo_pago: 'TARJETA' },
]

export const attendance = [
  { id: 1, empleado_id: 1, fecha: '2026-06-11', hora_entrada: '14:00', hora_salida: '22:00' },
  { id: 2, empleado_id: 2, fecha: '2026-06-11', hora_entrada: '14:05', hora_salida: null },
  { id: 3, empleado_id: 3, fecha: '2026-06-11', hora_entrada: '13:58', hora_salida: '22:00' },
  { id: 4, empleado_id: 1, fecha: '2026-06-10', hora_entrada: '14:00', hora_salida: '22:15' },
  { id: 5, empleado_id: 2, fecha: '2026-06-10', hora_entrada: '14:10', hora_salida: '22:00' },
]

export const cashMovements = [
  { id: 1, caja_id: 1, tipo: 'INGRESO', descripcion: 'Apertura de caja', monto: 50000, fecha: '2026-06-11 12:00', usuario_id: 1 },
  { id: 2, caja_id: 1, tipo: 'EGRESO', descripcion: 'Compra de hielo', monto: 3500, fecha: '2026-06-11 13:20', usuario_id: 1 },
  { id: 3, caja_id: 1, tipo: 'EGRESO', descripcion: 'Compra de limones', monto: 2000, fecha: '2026-06-11 13:45', usuario_id: 1 },
]

export const auditLog = [
  { id: 1, usuario_id: 1, accion: 'Abrió caja con ₡50,000', fecha: '2026-06-11 12:00' },
  { id: 2, usuario_id: 2, accion: 'Registró venta #001 por ₡14,690', fecha: '2026-06-11 14:35' },
  { id: 3, usuario_id: 1, accion: 'Creó empleado EMP004 - Ana Mora', fecha: '2026-06-11 11:30' },
  { id: 4, usuario_id: 3, accion: 'Registró venta #004 por ₡28,815', fecha: '2026-06-11 15:10' },
  { id: 5, usuario_id: 1, accion: 'Actualizó precio de Mojito a ₡4,500', fecha: '2026-06-11 11:00' },
]

export const initialNotifications = [
  { id: 1, type: 'warning', message: 'Stock bajo: Tequila (2 unidades)', time: '14:32', read: false },
  { id: 2, type: 'error', message: 'Producto agotado: Gin Tonic (0 unidades)', time: '13:15', read: false },
  { id: 3, type: 'info', message: 'Juan Pérez marcó entrada — 14:00', time: '14:00', read: false },
  { id: 4, type: 'success', message: 'Venta #004 registrada — ₡28,815', time: '15:10', read: true },
  { id: 5, type: 'info', message: 'Caja abierta — ₡50,000 inicial', time: '12:00', read: true },
]

export const formatCRC = (amount) =>
  '₡' + Number(amount).toLocaleString('es-CR')

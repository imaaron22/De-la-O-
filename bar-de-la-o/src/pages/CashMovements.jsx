import { cashMovements, formatCRC } from '../data/mockData'

export default function CashMovements() {
  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Movimientos de Caja</h2>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Tipo</th><th>Descripción</th><th>Monto</th><th>Fecha</th></tr></thead>
          <tbody>
            {cashMovements.map(m => (
              <tr key={m.id}>
                <td><span className={`badge ${m.tipo === 'INGRESO' ? 'badge-green' : 'badge-red'}`}>{m.tipo}</span></td>
                <td>{m.descripcion}</td>
                <td className="font-mono">{formatCRC(m.monto)}</td>
                <td>{m.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

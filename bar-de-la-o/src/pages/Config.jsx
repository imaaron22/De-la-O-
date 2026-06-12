export default function Config() {
  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Configuración</h2>
      </div>
      <div className="dash-card" style={{ maxWidth: 480 }}>
        <div className="dash-card-header"><h3>Información del negocio</h3></div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group span-2"><label>Nombre del negocio</label><input defaultValue="Bar De la O" /></div>
            <div className="form-group"><label>Teléfono</label><input defaultValue="2222-0000" /></div>
            <div className="form-group"><label>Correo</label><input defaultValue="info@bardelao.com" /></div>
            <div className="form-group span-2"><label>Dirección</label><input defaultValue="San José, Costa Rica" /></div>
            <div className="form-group"><label>Moneda</label><input defaultValue="₡ (Colones CRC)" readOnly className="input-readonly" /></div>
            <div className="form-group"><label>IVA (%)</label><input type="number" defaultValue="13" /></div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: 16 }}>Guardar cambios</button>
        </div>
      </div>
    </div>
  )
}

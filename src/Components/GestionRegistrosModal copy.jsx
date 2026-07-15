import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GestionRegistrosModal = ({
  mostrarFormulario,
  cerrar,
  modo,
  setModo,
  trabajadores,
  registros,
  nuevoNombre,
  setNuevoNombre,
  nuevoValor,
  setNuevoValor,
  nuevaFecha,
  setNuevaFecha,
  guardarReporte,
  eliminarReporte,
  setEditando,
  setIdEditar,
  editando,
  campo,
  nombreCampo,
  unidad,
  titulo,
  mensaje,
}) => {
  if (!mostrarFormulario) return null;

  const cerrarModal = () => {
    setEditando(false);
    setIdEditar(null);
    setModo("nuevo");
    cerrar();
  };

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,.6)",
      }}
      onClick={() => cerrarModal()}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nuevo {titulo.toLowerCase()}</h5>

            <button className="btn-close" onClick={() => cerrarModal()} />
          </div>

          <div className="modal-body">
            {modo === "nuevo" ? (
              <>
                <div className="mb-3">
                  <label className="form-label">Trabajador</label>
                  <select
                    className="form-select"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                  >
                    {trabajadores.map((t) => (
                      <option key={t.id} value={t.nombre}>
                        {t.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">{nombreCampo}</label>

                  <div className="d-grid gap-2">
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-secondary flex-fill"
                        onClick={() => setNuevoValor((v) => v - 1)}
                      >
                        -1 h
                      </button>

                      <button
                        className="btn btn-secondary flex-fill"
                        onClick={() => setNuevoValor((v) => v - 0.5)}
                      >
                        -0.5 h
                      </button>
                    </div>

                    <div className="display-5 text-center fw-bold">
                      {nuevoValor} h
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success flex-fill"
                        onClick={() => setNuevoValor((v) => v + 0.5)}
                      >
                        +0.5 h
                      </button>

                      <button
                        className="btn btn-success flex-fill"
                        onClick={() => setNuevoValor((v) => v + 1)}
                      >
                        +1 h
                      </button>
                    </div>
                    <button
                      className="btn btn-outline-secondary w-100 mt-2"
                      onClick={() => setNuevoValor(0)}
                    >
                      Reiniciar
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Fecha</label>
                  <div>
                    <DatePicker
                      selected={nuevaFecha}
                      onChange={(date) => setNuevaFecha(date)}
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <h5>Editar {titulo.toLowerCase()}</h5>

                {Object.entries(
                  registros.reduce((grupos, registro) => {
                    if (!grupos[registro.nombre]) {
                      grupos[registro.nombre] = [];
                    }

                    grupos[registro.nombre].push(registro);

                    return grupos;
                  }, {}),
                ).map(([nombre, lista]) => {
                  const total = lista.reduce((suma, r) => suma + r[campo], 0);

                  const color =
                    total > 0 ? "#198754" : total < 0 ? "#212529" : "#6c757d";

                  return (
                    <div key={nombre} className="mb-4">
                      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                        <h5 className="mb-0">{nombre}</h5>

                        <strong style={{ color }}>
                          {total > 0 ? `+${total}` : total} {unidad}
                        </strong>
                      </div>

                      {[...lista]
                        .sort((a, b) => b.fecha.toDate() - a.fecha.toDate())
                        .map((registro) => (
                          <div
                            key={registro.id}
                            className="d-flex justify-content-between align-items-center py-2 border-bottom"
                          >
                            <div>
                              <div>
                                <strong>
                                  {registro[campo] > 0 ? "+" : ""}
                                  {registro[campo]} {unidad}
                                </strong>
                              </div>

                              <small className="text-muted">
                                {registro.fecha
                                  .toDate()
                                  .toLocaleDateString("es-ES")}
                              </small>
                            </div>

                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => {
                                  setEditando(true);
                                  setModo("nuevo");

                                  setIdEditar(registro.id);
                                  setNuevoNombre(registro.nombre);
                                  setNuevoValor(registro[campo]);

                                  setNuevaFecha(registro.fecha.toDate());
                                }}
                              >
                                ✏️
                              </button>

                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => eliminarReporte(registro.id)}
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {mensaje && (
            <div className="alert alert-success text-center mx-3 mb-3">
              {mensaje}
            </div>
          )}

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => cerrarModal()}>
              Cerrar
            </button>

            {modo === "nuevo" && (
              <button className="btn btn-success" onClick={guardarReporte}>
                {editando ? "Actualizar" : "Guardar"}
              </button>
            )}

            <button
              className="btn btn-outline-primary"
              onClick={() => setModo(modo === "nuevo" ? "editar" : "nuevo")}
            >
              {modo === "nuevo"
                ? `Editar ${titulo.toLowerCase()}`
                : `Nuevo ${titulo.toLowerCase()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionRegistrosModal;

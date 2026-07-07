import { useState } from "react";
import { plural } from "../utils/formato";

const CuadroTrabajador = ({
  nombre,
  total,
  registros,
  campo,
  unidad,
  tipo,
  acumulados,
  disfrutados,
  fechaAlta,
}) => {
  const [abierto, setAbierto] = useState(false);

  const fechaInicio =
    fechaAlta && typeof fechaAlta.toDate === "function"
      ? fechaAlta.toDate().toLocaleDateString("es-ES")
      : "";

  let colorFondo;

  if (tipo === "vacaciones") {
    colorFondo = total > 14 ? "#198754" : "#6c757d";
  } else {
    if (total > 0) {
      colorFondo = "#198754";
    } else if (total === 0) {
      colorFondo = "#6c757d";
    } else {
      colorFondo = "#212529";
    }
  }

  return (
    <div
      onClick={() => setAbierto(!abierto)}
      className="cuadro-trabajador border rounded p-3 w-100 mb-3 d-flex align-items-center"
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        backgroundColor: colorFondo,
        color: "white",
        cursor: "pointer",
      }}
    >
      <div
        onClick={() => setAbierto(!abierto)}
        className="border rounded py-3 bg-white"
        style={{
          minWidth: "120px",
          maxWidth: "120px",
          textAlign: "center",
          userSelect: "none",
          color: "black",
        }}
      >
        <h5 className="mb-0">{nombre}</h5>
      </div>

      <div className="ms-auto fw-bold">
        {total > 0 ? `+${total}` : total} {unidad}
      </div>

      {abierto && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
          onClick={() => setAbierto(false)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{nombre}</h4>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAbierto(false)}
                ></button>
              </div>

              <div className="modal-body">
                {tipo === "vacaciones" ? (
                  <>
                    <div className="modal-body">
                      <h5>Fecha de alta</h5> {fechaInicio}
                    </div>
                    <h5>
                      Acumulados: {Math.round(acumulados)}{" "}
                      {plural(acumulados, "día", "días")}
                    </h5>

                    <h5>
                      Disfrutados: {Math.round(disfrutados)}{" "}
                      {plural(disfrutados, "día", "días")}
                    </h5>

                    <h4 className="text-success">
                      Pendientes: {Math.round(total)} {unidad}
                    </h4>

                    <hr />
                  </>
                ) : (
                  <>
                    <h5>
                      Saldo actual:
                      <strong>
                        {" "}
                        {total > 0 ? `+${total}` : total} {unidad}
                      </strong>
                    </h5>

                    <hr />
                  </>
                )}

                {registros.length === 0 ? (
                  <p>No hay registros.</p>
                ) : (
                  [...registros]
                    .sort((a, b) => {
                      return b.fecha.toDate() - a.fecha.toDate();
                    })
                    .map((registro) => {
                      const fecha = registro.fecha
                        .toDate()
                        .toLocaleDateString("es-ES");

                      return (
                        <div
                          key={registro.id}
                          className="d-flex justify-content-between align-items-center border-bottom py-2"
                        >
                          <div className="d-flex align-items-center gap-2">
                            <span
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor:
                                  registro[campo] > 0 ? "#198754" : "#212529",
                              }}
                            />

                            <strong
                              style={{
                                color:
                                  registro[campo] > 0 ? "#198754" : "#212529",
                                minWidth: "45px",
                              }}
                            >
                              {tipo === "vacaciones"
                                ? `${registro[campo]} días`
                                : registro[campo] > 0
                                  ? `+${registro[campo]} h`
                                  : `${registro[campo]} h`}
                            </strong>

                            <span>
                              {tipo === "vacaciones"
                                ? `ha disfrutado`
                                : registro[campo] > 0
                                  ? "Trabajó horas extra"
                                  : "Libró horas"}
                            </span>
                          </div>

                          <small className="text-muted">{fecha}</small>
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CuadroTrabajador;

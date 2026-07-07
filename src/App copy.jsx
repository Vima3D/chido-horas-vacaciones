import "../App.css";
import Logo from "../Components/Logo";
import ListaTrabajadores from "../Components/ListaTrabajadores";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HorasExtra = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [registros, setRegistros] = useState([]);

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevasHoras, setNuevasHoras] = useState(0);
  const [nuevaFecha, setNuevaFecha] = useState(new Date());

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [modo, setModo] = useState("nuevo");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // CARGAR TRABAJADORES

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "trabajadores"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTrabajadores(data);
    });

    return () => unsub();
  }, []);

  // CARGAR REPORTES

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "reportes_horas_extra"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          fecha: doc.data().fecha.toDate().toLocaleDateString("es-ES"),
        }));

        setRegistros(data);
      },
    );

    return () => unsub();
  }, []);

  // AQUÍ van guardarReporte y eliminarReporte
  const guardarReporte = async () => {
    try {
      if (editando) {
        await updateDoc(doc(db, "reportes_horas_extra", idEditar), {
          nombre: nuevoNombre,
          horas: nuevasHoras,
          fecha: Timestamp.fromDate(nuevaFecha),
        });
      } else {
        await addDoc(collection(db, "reportes_horas_extra"), {
          nombre: nuevoNombre,
          horas: nuevasHoras,
          fecha: Timestamp.fromDate(nuevaFecha),
        });
      }

      setEditando(false);
      setIdEditar(null);

      setMostrarFormulario(false);

      setNuevasHoras(0);
      setNuevaFecha(new Date());
      setNuevoNombre(trabajadores[0]?.nombre || "");
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarReporte = async (id) => {
    try {
      await deleteDoc(doc(db, "reportes_horas_extra", id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="min-vh-100 d-flex justify-content-center px-3 py-5 w-100">
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <div className="bg-secondary bg-dark rounded-4 shadow p-4 p-sm-5">
            <Logo onClick={() => setMostrarFormulario(true)} />

            <main className="text-center">
              <p className="fs-5 fw-semibold text-white">HORAS EXTRA</p>

              <ListaTrabajadores
                trabajadores={trabajadores}
                registros={registros}
              />
            </main>
          </div>
        </div>
      </div>

      {mostrarFormulario && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,.6)",
          }}
          onClick={() => setMostrarFormulario(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nuevo reporte</h5>

                <button
                  className="btn-close"
                  onClick={() => setMostrarFormulario(false)}
                />
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
                      <label className="form-label">Horas</label>
                      <input
                        type="number"
                        className="form-control"
                        value={nuevasHoras}
                        onChange={(e) => setNuevasHoras(Number(e.target.value))}
                      />
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
                    <h5>Editar reportes</h5>

                    {Object.entries(
                      registros.reduce((grupos, registro) => {
                        if (!grupos[registro.nombre]) {
                          grupos[registro.nombre] = [];
                        }

                        grupos[registro.nombre].push(registro);

                        return grupos;
                      }, {}),
                    ).map(([nombre, lista]) => {
                      const total = lista.reduce(
                        (suma, r) => suma + r.horas,
                        0,
                      );

                      const color =
                        total > 0
                          ? "#198754"
                          : total < 0
                            ? "#212529"
                            : "#6c757d";

                      return (
                        <div key={nombre} className="mb-4">
                          <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                            <h5 className="mb-0">{nombre}</h5>

                            <strong style={{ color }}>
                              {total > 0 ? `+${total}` : total} h
                            </strong>
                          </div>

                          {[...lista]
                            .sort((a, b) => {
                              const [diaA, mesA, añoA] = a.fecha.split("/");
                              const [diaB, mesB, añoB] = b.fecha.split("/");

                              return (
                                new Date(añoB, mesB - 1, diaB) -
                                new Date(añoA, mesA - 1, diaA)
                              );
                            })
                            .map((registro) => (
                              <div
                                key={registro.id}
                                className="d-flex justify-content-between align-items-center py-2 border-bottom"
                              >
                                <div>
                                  <div>
                                    <strong>
                                      {registro.horas > 0 ? "+" : ""}
                                      {registro.horas} h
                                    </strong>
                                  </div>

                                  <small className="text-muted">
                                    {registro.fecha}
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
                                      setNuevasHoras(registro.horas);

                                      const [dia, mes, año] =
                                        registro.fecha.split("/");
                                      setNuevaFecha(
                                        new Date(año, mes - 1, dia),
                                      );
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

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
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
                  {modo === "nuevo" ? "Editar reportes" : "Nuevo reporte"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HorasExtra;

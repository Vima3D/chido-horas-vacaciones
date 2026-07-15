import { calcularVacaciones } from "../utils/vacaciones";
import Logo from "../Components/Logo";
import CuadroTrabajador from "../Components/CuadroTrabajador";
import { Link } from "react-router-dom";
import GestionRegistrosModal from "../Components/GestionRegistrosModal";
import useGestionRegistros from "../hooks/useGestionRegistros";
import PinModal from "../Components/PinModal";
import { useState } from "react";

const Vacaciones = () => {
  const [mostrarPin, setMostrarPin] = useState(false);

  const {
    trabajadores,
    registros: vacaciones,

    mostrarFormulario,
    setMostrarFormulario,

    nuevoNombre,
    setNuevoNombre,

    nuevoValor,
    setNuevoValor,

    nuevaFecha,
    setNuevaFecha,

    editando,
    setEditando,

    setIdEditar,

    modo,
    setModo,

    mensaje,

    guardarReporte,
    eliminarReporte,
  } = useGestionRegistros("vacaciones", "dias");

  return (
    <div className="min-vh-100 d-flex justify-content-center px-3 py-5">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <div className="bg-secondary bg-dark rounded-4 shadow p-4">
          <Logo onClick={() => setMostrarPin(true)} />

          <main className="text-center">
            <p className="mt-4 text-center">
              <Link to="/" className="btn btn-outline-light">
                Ir a Horas Extra
              </Link>
            </p>

            <div className="fs-5 fw-semibold text-white">VACACIONES</div>

            <div className="mt-3">
              {trabajadores.map((trabajador) => {
                const acumulados = calcularVacaciones(trabajador.fechaAlta);

                const registrosTrabajador = vacaciones.filter(
                  (v) => v.nombre === trabajador.nombre,
                );

                const disfrutados = registrosTrabajador.reduce(
                  (suma, v) => suma + v.dias,
                  0,
                );

                const pendientes = acumulados - disfrutados;

                return (
                  <CuadroTrabajador
                    key={trabajador.id}
                    nombre={trabajador.nombre}
                    unidad={Math.round(pendientes) === 1 ? "día" : "días"}
                    total={Math.round(pendientes)}
                    registros={registrosTrabajador}
                    campo="dias"
                    tipo="vacaciones"
                    acumulados={acumulados}
                    disfrutados={disfrutados}
                    fechaAlta={trabajador.fechaAlta}
                  />
                );
              })}
            </div>
          </main>
        </div>
      </div>
      <GestionRegistrosModal
        mostrarFormulario={mostrarFormulario}
        cerrar={() => setMostrarFormulario(false)}
        titulo="Vacaciones"
        modo={modo}
        setModo={setModo}
        trabajadores={trabajadores}
        registros={vacaciones}
        nuevoNombre={nuevoNombre}
        setNuevoNombre={setNuevoNombre}
        nuevoValor={nuevoValor}
        setNuevoValor={setNuevoValor}
        nuevaFecha={nuevaFecha}
        setNuevaFecha={setNuevaFecha}
        guardarReporte={guardarReporte}
        eliminarReporte={eliminarReporte}
        setEditando={setEditando}
        setIdEditar={setIdEditar}
        editando={editando}
        campo="dias"
        nombreCampo="Días"
        unidad="días"
        mensaje={mensaje}
      />

      <PinModal
        mostrar={mostrarPin}
        cerrar={() => setMostrarPin(false)}
        onCorrecto={() => {
          setMostrarPin(false);
          setMostrarFormulario(true);
        }}
      />
    </div>
  );
};

export default Vacaciones;

import { calcularVacaciones } from "../utils/vacaciones";
import { locales } from "../config/locales";
import CuadroTrabajador from "../Components/CuadroTrabajador";
import { Link } from "react-router-dom";
import GestionRegistrosModal from "../Components/GestionRegistrosModal";
import useGestionRegistros from "../hooks/useGestionRegistros";
import PinModal from "../Components/PinModal";
import { useState } from "react";
import Logo from "../Components/Logo";
import BotonLocal from "../Components/BotonLocal";

const Vacaciones = ({ local, titulo, rutaVolver, textoBoton }) => {
  const [mostrarPin, setMostrarPin] = useState(false);

  const config = locales[local];

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
  } = useGestionRegistros("vacaciones", "dias", local);

  const registrosDelLocal = vacaciones.filter((registro) =>
    trabajadores.some((t) => t.nombre === registro.nombre),
  );

  return (
    <div className="min-vh-100 d-flex justify-content-center px-3 py-5">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <div
          className="rounded-4 shadow p-4"
          style={{ backgroundColor: config.color }}
        >
          <BotonLocal local={local} />
          <Logo
            src={config.logo}
            ancho={config.anchoLogo}
            onClick={() => setMostrarPin(true)}
          />

          <main className="text-center">
            <p className="mt-4 text-center">
              <Link to={rutaVolver} className="btn btn-outline-light">
                {textoBoton}
              </Link>
            </p>

            <div className="fs-5 fw-semibold text-white">
              {titulo} {config.nombre}
            </div>

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
        registros={registrosDelLocal}
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

          if (trabajadores.length > 0 && !nuevoNombre) {
            setNuevoNombre(trabajadores[0].nombre);
          }

          setMostrarFormulario(true);
        }}
      />
    </div>
  );
};

export default Vacaciones;

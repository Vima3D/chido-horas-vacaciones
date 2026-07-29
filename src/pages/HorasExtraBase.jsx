import "../App.css";
import Logo from "../Components/Logo";
import { locales } from "../config/locales";
import ListaTrabajadores from "../Components/ListaTrabajadores";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import GestionRegistrosModal from "../Components/GestionRegistrosModal";
import useGestionRegistros from "../hooks/useGestionRegistros";
import PinModal from "../Components/PinModal";
import { useState } from "react";
import BotonLocal from "../Components/BotonLocal";

const HorasExtra = ({ local, titulo, rutaVolver, textoBoton }) => {
  const config = locales[local];
  const campo = "horas";
  const nombreCampo = "Horas";
  const unidad = "h";
  const [mostrarPin, setMostrarPin] = useState(false);

  const {
    trabajadores,
    registros,

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
  } = useGestionRegistros("reportes_horas_extra", "horas", local);

  const registrosDelLocal = registros.filter((registro) =>
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
            <div className="text-center pb-4">
              <Link to={rutaVolver} className="btn btn-outline-light">
                {textoBoton}
              </Link>
            </div>

            <div className="fs-5 fw-semibold text-white">
              {titulo} {config.nombre}
            </div>

            <ListaTrabajadores
              trabajadores={trabajadores}
              registros={registros}
              campo={campo}
              unidad={unidad}
            />
          </main>
        </div>
      </div>

      <GestionRegistrosModal
        mostrarFormulario={mostrarFormulario}
        cerrar={() => setMostrarFormulario(false)}
        titulo={titulo}
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
        campo={campo}
        nombreCampo={nombreCampo}
        unidad={unidad}
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

export default HorasExtra;

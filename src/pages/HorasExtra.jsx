import "../App.css";
import Logo from "../Components/Logo";
import ListaTrabajadores from "../Components/ListaTrabajadores";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import GestionRegistrosModal from "../Components/GestionRegistrosModal";
import useGestionRegistros from "../hooks/useGestionRegistros";
import PinModal from "../Components/PinModal";
import { useState } from "react";

const HorasExtra = () => {
  const titulo = "HORAS EXTRA";
  const campo = "horas";
  const nombreCampo = "Horas";
  const unidad = "h";
  const rutaDestino = "/vacaciones";
  const textoBoton = "Ir a Vacaciones";
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

    guardarReporte,
    eliminarReporte,
  } = useGestionRegistros("reportes_horas_extra", "horas");

  return (
    <div className="min-vh-100 d-flex justify-content-center px-3 py-5">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <div className="bg-secondary bg-dark rounded-4 shadow p-4">
          <Logo onClick={() => setMostrarPin(true)} />

          <main className="text-center">
            <div className="text-center pb-4">
              <Link to={rutaDestino} className="btn btn-outline-light">
                {textoBoton}
              </Link>
            </div>

            <div className="fs-5 fw-semibold text-white">HORAS EXTRA</div>

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
        registros={registros}
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

export default HorasExtra;

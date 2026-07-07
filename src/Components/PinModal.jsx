import { useState } from "react";

const PinModal = ({ mostrar, cerrar, onCorrecto }) => {
  const PIN = "4181";

  const teclas = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"];

  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  if (!mostrar) return null;

  const agregarNumero = (numero) => {
    if (pin.length >= 4) return;

    const nuevoPin = pin + numero;
    setPin(nuevoPin);

    if (nuevoPin.length === 4) {
      if (nuevoPin === PIN) {
        cerrar();
        onCorrecto();
        setPin("");
        setError(false);
      } else {
        setError(true);
        setShake(true);

        setTimeout(() => {
          setPin("");
          setError(false);
          setShake(false);
        }, 800);
      }
    }
  };

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,.6)",
      }}
      onClick={cerrar}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`modal-content ${shake ? "shake" : ""}`}>
          <div className="modal-header">
            <h5 className="modal-title">Introducir PIN</h5>

            <button className="btn-close" onClick={cerrar} />
          </div>

          <div className="modal-body text-center">
            <div className="d-flex justify-content-center gap-3 mb-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: i < pin.length ? "#198754" : "#ced4da",
                  }}
                />
              ))}
            </div>

            <div className="row g-2 mt-3">
              {teclas.map((tecla) => (
                <div className="col-4" key={tecla}>
                  <button
                    className="btn btn-outline-dark w-100 py-3 fs-4"
                    onClick={() => {
                      if (tecla === "C") {
                        setPin("");
                        setError(false);
                      } else if (tecla === "⌫") {
                        setPin(pin.slice(0, -1));
                        setError(false);
                      } else {
                        agregarNumero(tecla);
                      }
                    }}
                  >
                    {tecla}
                  </button>
                </div>
              ))}
            </div>

            {error && <p className="text-danger fw-bold">PIN incorrecto</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinModal;

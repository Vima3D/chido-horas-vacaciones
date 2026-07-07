import ChidoLogo from "../assets/CHIDO.png";

const Logo = ({ onClick }) => {
  return (
    <header className="text-center mb-4">
      <img
        src={ChidoLogo} // <- Vite resuelve la ruta automáticamente
        alt="Chido Logo"
        className="img-fluid mb-3"
        onClick={onClick}
        style={{
          maxWidth: "120px",
          cursor: "pointer",
        }}
      />
      <h1 className="visually-hidden">Reglas de faltas</h1>
    </header>
  );
};

export default Logo;

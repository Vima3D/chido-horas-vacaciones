const Logo = ({ src, ancho = 120, onClick }) => {
  return (
    <header className="text-center mb-4">
      <img
        src={src}
        alt="Logo"
        className="img-fluid mb-3"
        onClick={onClick}
        style={{
          maxWidth: `${ancho}px`,
          width: "100%",
          height: "auto",
          cursor: "pointer",
        }}
      />
      <h1 className="visually-hidden">Reglas de faltas</h1>
    </header>
  );
};

export default Logo;

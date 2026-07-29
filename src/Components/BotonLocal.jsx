import { Link } from "react-router-dom";

const BotonLocal = ({ local }) => {
  const destino = local === "chido" ? "/coco" : "/vacaciones";
  const color = local === "chido" ? "#8B4513" : "#212529";
  const texto = local === "chido" ? "CO" : "CH";

  return (
    <Link
      to={destino}
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        backgroundColor: color,
        color: "white",
        textDecoration: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "14px",
        boxShadow: "0 3px 8px rgba(0,0,0,.3)",
        transition: "transform .15s",
      }}
    >
      {texto}
    </Link>
  );
};

export default BotonLocal;

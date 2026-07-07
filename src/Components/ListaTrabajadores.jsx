import CuadroTrabajador from "./CuadroTrabajador";

const ListaTrabajadores = ({
  trabajadores,
  registros,
  campo,
  unidad,
  tipo,
}) => {
  return (
    <div className="container py-3">
      {trabajadores.map((trabajador) => {
        const nombre = trabajador.nombre;

        const total = registros
          .filter((r) => r.nombre === nombre)
          .reduce((suma, r) => suma + r[campo], 0);

        const registrosTrabajador = registros.filter(
          (r) => r.nombre === nombre,
        );

        return (
          <CuadroTrabajador
            key={trabajador.id}
            nombre={nombre}
            total={total}
            registros={registrosTrabajador}
            campo={campo}
            unidad={unidad}
            tipo={tipo}
          />
        );
      })}
    </div>
  );
};

export default ListaTrabajadores;

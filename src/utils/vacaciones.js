export function calcularVacaciones(fechaAlta) {
  const hoy = new Date();

  const alta =
    typeof fechaAlta.toDate === "function"
      ? fechaAlta.toDate()
      : new Date(fechaAlta);

  const milisegundos = hoy - alta;

  const diasTrabajados = milisegundos / (1000 * 60 * 60 * 24);

  const vacaciones = (diasTrabajados * 30) / 365;

  return vacaciones;
}

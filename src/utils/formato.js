export function plural(valor, singular, plural) {
  return Math.round(valor) === 1 ? singular : plural;
}

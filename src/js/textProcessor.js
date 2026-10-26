/**
 * Lógica pura de búsqueda y resaltado.
 * No toca el DOM: recibe texto y devuelve datos, lo que facilita probarla.
 */

/**
 * Escapa los caracteres especiales de RegExp para que el término
 * se busque literalmente (por ejemplo "." o "+" no son comodines).
 * @param {string} value
 * @returns {string}
 */
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Escapa HTML para insertar texto del usuario de forma segura con innerHTML
 * (evita que un "<script>" escrito en el textarea se ejecute).
 * @param {string} value
 * @returns {string}
 */
const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/**
 * Busca `term` dentro de `text` sin distinguir mayúsculas/minúsculas,
 * cuenta las coincidencias y construye el HTML con cada una marcada.
 *
 * @param {string} text Texto completo donde buscar.
 * @param {string} term Palabra o carácter a buscar.
 * @returns {{ count: number, html: string }}
 */
export function processText(text, term) {
  // Flags: g = todas las coincidencias, i = sin distinguir mayúsculas, u = Unicode (acentos, ñ)
  const pattern = new RegExp(escapeRegExp(term), 'giu');

  let count = 0;
  let html = '';
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    count += 1;
    // Texto previo a la coincidencia + la coincidencia marcada con <mark>
    html += escapeHtml(text.slice(lastIndex, match.index));
    html += `<mark class="hit">${escapeHtml(match[0])}</mark>`;
    lastIndex = match.index + match[0].length;
  }

  // Resto del texto después de la última coincidencia
  html += escapeHtml(text.slice(lastIndex));

  return { count, html };
}

export { escapeHtml };

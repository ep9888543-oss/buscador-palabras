function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Busca `term` en `text` sin distinguir mayúsculas.
 * Devuelve el total y una lista de fragmentos { text, match }.
 */
export function findMatches(text, term) {
  const regex = new RegExp(escapeRegExp(term), "gi");
  const parts = [];
  let last = 0;
  let total = 0;

  for (const m of text.matchAll(regex)) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), match: false });
    parts.push({ text: m[0], match: true });
    last = m.index + m[0].length;
    total++;
  }
  if (last < text.length) parts.push({ text: text.slice(last), match: false });

  return { total, parts };
}

/**
 * Reemplaza todas las coincidencias de `term` (sin distinguir mayúsculas)
 * por `replacement`. Devuelve el texto nuevo, el total y los fragmentos
 * { text, replaced } para poder resaltar lo reemplazado.
 */
export function replaceMatches(text, term, replacement) {
  const regex = new RegExp(escapeRegExp(term), "gi");
  const parts = [];
  let last = 0;
  let total = 0;

  for (const m of text.matchAll(regex)) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), replaced: false });
    parts.push({ text: replacement, replaced: true });
    last = m.index + m[0].length;
    total++;
  }
  if (last < text.length) parts.push({ text: text.slice(last), replaced: false });

  return { total, parts, newText: parts.map((p) => p.text).join("") };
}
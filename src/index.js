/**
 * Punto de entrada de la aplicación.
 * Conecta el DOM con la lógica de búsqueda (processText) y las alertas.
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

import { processText, escapeHtml } from './js/textProcessor';
import { showAlert, clearAlerts } from './js/alerts';

// ---------- Referencias al DOM ----------
const form = document.getElementById('search-form');
const textInput = document.getElementById('text-input');
const termInput = document.getElementById('term-input');
const clearButton = document.getElementById('clear-btn');
const alertArea = document.getElementById('alert-area');
const counter = document.getElementById('counter');
const counterNumber = document.getElementById('counter-number');
const counterLabel = document.getElementById('counter-label');
const resultText = document.getElementById('result-text');

const EMPTY_RESULT_MESSAGE = 'El texto con las coincidencias marcadas aparecerá aquí.';

// ---------- Funciones de interfaz ----------

/** Devuelve el panel de resultados a su estado inicial. */
function resetResult() {
  counter.hidden = true;
  resultText.classList.add('result-text--empty');
  resultText.textContent = EMPTY_RESULT_MESSAGE;
}

/**
 * Pinta el contador y el texto procesado.
 * @param {number} count Número de coincidencias.
 * @param {string} term Término buscado.
 * @param {string} html Texto (ya escapado) con las coincidencias marcadas.
 */
function renderResult(count, term, html) {
  counter.hidden = false;
  counterNumber.textContent = count;
  counterLabel.textContent =
    count === 1 ? `coincidencia de «${term}»` : `coincidencias de «${term}»`;

  resultText.classList.remove('result-text--empty');
  resultText.innerHTML = html;
}

/**
 * Valida los campos. Devuelve un mensaje de error o null si todo está bien.
 * @param {string} text
 * @param {string} term
 * @returns {string|null}
 */
function validate(text, term) {
  if (!text && !term) return 'Escribe un texto y la palabra que quieres buscar.';
  if (!text) return 'El campo de texto está vacío. Escribe o pega un texto.';
  if (!term) return 'Escribe una palabra o carácter para buscar.';
  return null;
}

// ---------- Manejadores de eventos ----------

/** Acción del botón "Buscar" (también se activa con Enter). */
function handleSearch(event) {
  event.preventDefault(); // evita recargar la página

  const text = textInput.value;
  const term = termInput.value.trim();

  clearAlerts(alertArea);

  const error = validate(text.trim(), term);
  if (error) {
    resetResult();
    showAlert(alertArea, error, 'warning');
    return;
  }

  const { count, html } = processText(text, term);

  if (count === 0) {
    // Se muestra el texto original sin marcas y un aviso
    renderResult(0, term, escapeHtml(text));
    showAlert(alertArea, `No se encontró «${term}» en el texto.`, 'info');
    return;
  }

  renderResult(count, term, html);
}

/** Acción del botón "Limpiar": restablece campos, alertas y resultado. */
function handleClear() {
  form.reset();
  clearAlerts(alertArea);
  resetResult();
  textInput.focus();
}

// ---------- Inicialización ----------
form.addEventListener('submit', handleSearch);
clearButton.addEventListener('click', handleClear);

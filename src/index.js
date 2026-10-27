import "bootstrap/dist/css/bootstrap.min.css"; // primero Bootstrap
import "./styles/main.css";                    // después tus estilos

import { showAlert, clearAlerts } from "./js/alerts.js";
import { findMatches, replaceMatches } from "./js/textProcessor.js";

const alertArea = document.getElementById("alert-area");
const form = document.getElementById("search-form");
const textInput = document.getElementById("text-input");
const termInput = document.getElementById("term-input");
const replaceInput = document.getElementById("replace-input");
const replaceBtn = document.getElementById("replace-btn");
const clearBtn = document.getElementById("clear-btn");
const counter = document.getElementById("counter");
const counterNumber = document.getElementById("counter-number");
const counterLabel = document.getElementById("counter-label");
const resultText = document.getElementById("result-text");

const EMPTY_MSG = "El texto con las coincidencias marcadas aparecerá aquí.";

function resetResult() {
  counter.hidden = true;
  resultText.className = "result-text result-text--empty";
  resultText.textContent = EMPTY_MSG;
}

// ---------- BUSCAR ----------
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearAlerts(alertArea);

  const text = textInput.value;
  const term = termInput.value;

  if (!text.trim()) return showAlert(alertArea, "Escribe o pega un texto antes de buscar.");
  if (!term) return showAlert(alertArea, "Escribe la palabra o carácter que quieres buscar.");

  const { total, parts } = findMatches(text, term);

  resultText.className = "result-text";
  resultText.textContent = "";
  for (const p of parts) {
    if (p.match) {
      const mark = document.createElement("mark");
      mark.textContent = p.text;
      resultText.append(mark);
    } else {
      resultText.append(p.text);
    }
  }

  counterNumber.textContent = total;
  counterLabel.textContent =
    total === 1 ? `coincidencia con “${term}”` : `coincidencias con “${term}”`;
  counter.hidden = false;
});

// ---------- REEMPLAZAR ----------
replaceBtn.addEventListener("click", () => {
  clearAlerts(alertArea);

  const text = textInput.value;
  const term = termInput.value;
  const replacement = replaceInput.value;

  if (!text.trim()) return showAlert(alertArea, "Escribe o pega un texto antes de reemplazar.");
  if (!term) return showAlert(alertArea, "Escribe la palabra o carácter que quieres reemplazar.");

  const { total, parts, newText } = replaceMatches(text, term, replacement);

  if (total === 0) {
    return showAlert(alertArea, `No se encontró “${term}” en el texto, no hay nada que reemplazar.`);
  }

  // El textarea queda con el texto nuevo, así puedes seguir buscando sobre él
  textInput.value = newText;

  resultText.className = "result-text";
  resultText.textContent = "";
  for (const p of parts) {
    if (p.replaced) {
      const mark = document.createElement("mark");
      mark.className = "mark--replaced";
      mark.textContent = p.text;
      resultText.append(mark);
    } else {
      resultText.append(p.text);
    }
  }

  counterNumber.textContent = total;
  counterLabel.textContent =
    total === 1 ? `reemplazo de “${term}”` : `reemplazos de “${term}”`;
  counter.hidden = false;
});

// ---------- LIMPIAR ----------
clearBtn.addEventListener("click", () => {
  textInput.value = "";
  termInput.value = "";
  replaceInput.value = "";
  clearAlerts(alertArea);
  resetResult();
  textInput.focus();
});
/**
 * Alertas personalizadas basadas en los estilos de Bootstrap.
 * Solo usan CSS de Bootstrap; el cierre lo maneja este módulo.
 */

/**
 * Muestra una alerta dentro de `container`, reemplazando la anterior.
 * @param {HTMLElement} container Elemento donde se inserta la alerta.
 * @param {string} message Mensaje para el usuario.
 * @param {'warning'|'danger'|'info'|'success'} [type='warning'] Estilo visual.
 */
export function showAlert(container, message, type = 'warning') {
  clearAlerts(container);

  const alert = document.createElement('div');
  alert.className = `alert alert-${type} alert-dismissible fade show`;
  alert.setAttribute('role', 'alert');
  alert.textContent = message;

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'btn-close';
  closeButton.setAttribute('aria-label', 'Cerrar alerta');
  closeButton.addEventListener('click', () => alert.remove());

  alert.append(closeButton);
  container.append(alert);
}

/**
 * Elimina cualquier alerta mostrada en `container`.
 * @param {HTMLElement} container
 */
export function clearAlerts(container) {
  container.replaceChildren();
}

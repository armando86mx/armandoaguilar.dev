// Aplica el tema guardado ANTES de pintar (evita el flashazo oscuro al cambiar de idioma).
// Va como archivo externo (no inline) para cumplir la CSP del .htaccess: script-src 'self'.
// Debe cargarse BLOQUEANTE en el <head> (sin async/defer) para correr antes del primer pintado.
try { var t = JSON.parse(localStorage.getItem("aa_theme")); if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t); } catch (e) {}

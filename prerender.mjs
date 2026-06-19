/* Prerender: renderiza <App/> a HTML estático (ES y EN) y lo inyecta en el
   #root de cada index.html. Corre en el build (npm run build), NO en Hostinger.
   Usa react-dom/server — sin navegador, sin Chromium. El runtime sigue siendo
   React: el cliente hidrata este HTML (ver final de armando-v2.jsx). */
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";
import React from "react";
import { renderToString } from "react-dom/server";

// Renderiza la app para una ruta dada, corriendo los MISMOS scripts que el
// navegador (content/carousel/app) dentro de un contexto con globals mínimos.
function render(pathname) {
  const sandbox = { React, console };
  sandbox.window = sandbox;       // window === el contexto global del sandbox
  sandbox.globalThis = sandbox;
  sandbox.location = { pathname }; // de aquí sale el idioma (armando-v2.jsx)
  // localStorage queda undefined a propósito: usePersisted lo envuelve en
  // try/catch y cae al valor inicial ("dark"), igual que el primer render del
  // cliente. document tampoco existe → el bloque de montaje del cliente se omite.
  vm.createContext(sandbox);
  for (const file of ["content.js", "carousel.js", "app.js"]) {
    vm.runInContext(readFileSync(file, "utf8"), sandbox, { filename: file });
  }
  return renderToString(React.createElement(sandbox.__App));
}

// Inyecta el markup entre <div id="root"> y el centinela <!--/#root-->.
// El centinela hace la sustitución idempotente (re-buildeable sin romperse) y
// vive FUERA de #root, así que no interfiere con la hidratación.
function inject(htmlFile, pathname, mustContain) {
  const markup = render(pathname);
  if (markup.length < 2000 || !markup.includes(mustContain)) {
    throw new Error(`prerender ${htmlFile}: markup sospechoso (${markup.length} bytes, ¿contiene "${mustContain}"?)`);
  }
  const html = readFileSync(htmlFile, "utf8");
  const re = /<div id="root">[\s\S]*?<\/div><!--\/#root-->/;
  if (!re.test(html)) throw new Error(`prerender ${htmlFile}: no encontré <div id="root">…<!--/#root-->`);
  writeFileSync(htmlFile, html.replace(re, `<div id="root">${markup}</div><!--/#root-->`));
  console.log(`✓ ${htmlFile} prerenderizado (${markup.length} bytes)`);
}

inject("index.html", "/", "se rompen");        // hero ES: "…cómo se rompen las cosas"
inject("en/index.html", "/en/", "things break"); // hero EN

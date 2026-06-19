# Portafolio — Armando Aguilar (estilo Blueprint)

Sitio estático bilingüe (ES/EN), con modo claro/oscuro. React precompilado a JS
plano: **no usa Babel en el navegador** y no depende de CDNs para la app.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Página principal y punto de entrada (Hostinger lo sirve por defecto). |
| `content.js` | **Todo el contenido bilingüe** (textos ES/EN, proyectos, formación, certificaciones, contacto). **Edita aquí para cambiar textos — no requiere recompilar.** |
| `armando-v2.jsx` | Fuente React de la maquetación y estilos (CSS dentro de `const CSS`). |
| `carousel.jsx` | Fuente React del carrusel de imágenes. |
| `app.js`, `carousel.js` | **Generados** a partir de los `.jsx`. No los edites a mano. |
| `vendor/` | React y ReactDOM (build de producción), servidos localmente. |
| `assets/` | Imágenes (foto, capturas de proyectos). |
| `favicon.svg` | Ícono del sitio. |

## Ver en local

El HTML carga scripts por ruta, así que necesita un servidor local (no basta abrir el archivo directo):

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000/
```

## Editar

- **Textos / contenido** → edita `content.js` y recarga. **Sin compilar.**
- **Estructura o estilos** (los `.jsx`) → recompila:

  ```bash
  npm install      # solo la primera vez
  npm run build    # regenera app.js y carousel.js
  ```

## Desplegar en Hostinger

Sube el contenido de la carpeta a `public_html/` (vía Git, el File Manager o FTP).
Necesario en el servidor: `index.html`, `content.js`, `app.js`, `carousel.js`,
`favicon.svg`, `vendor/` y `assets/`. **No subas** `node_modules/` (ya está en `.gitignore`).
Los `.jsx`, `package.json` y `package-lock.json` no son necesarios en producción,
pero no estorban.

## Notas

- Idioma (ES/EN) y tema (claro/oscuro) se cambian con los botones de la barra superior y se guardan en `localStorage`.
- Las tipografías se cargan desde Google Fonts (con respaldo a fuentes del sistema si falla). Es la única dependencia externa en runtime; opcionalmente puedes autohospedarlas.
- En `index.html`, ajusta el dominio en las etiquetas Open Graph (`og:url`, `og:image`) si no es `armandoaguilar.dev`.

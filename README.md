# Portafolio — Armando Aguilar (estilo Blueprint)

Sitio estático bilingüe (ES/EN) con URLs propias por idioma, modo claro/oscuro.
React precompilado a JS plano: **no usa Babel en el navegador** y no depende de CDNs para la app.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | Página en **español** (`/`) y punto de entrada por defecto. |
| `en/index.html` | Página en **inglés** (`/en/`). |
| `content.js` | **Todo el contenido bilingüe** (textos ES/EN, proyectos, formación, certificaciones, contacto). **Edita aquí para cambiar textos — sirve para ambos idiomas, sin recompilar.** |
| `armando-v2.jsx` | Fuente React de la maquetación y estilos de componente (CSS dentro de `const CSS`). |
| `carousel.jsx` | Fuente React del carrusel de imágenes. |
| `app.js`, `carousel.js` | **Generados** a partir de los `.jsx`. No los edites a mano. |
| `base.css` | Estilos base/tema (variables, reset, body). Compartido por ambas páginas. |
| `vendor/` | React y ReactDOM (build de producción), servidos localmente. |
| `assets/` | Imágenes en WebP. Originales en `assets/_originals/` (ignorado por git). |
| `favicon.svg`, `og-image.png` | Ícono y tarjeta social (1200×630). |
| `robots.txt`, `sitemap.xml` | SEO. El sitemap lista `/` y `/en/` con hreflang. |

## Ver en local

Necesita un servidor local (no basta abrir el archivo directo):

```bash
python3 -m http.server 8000
# Español:  http://localhost:8000/
# Inglés:   http://localhost:8000/en/
```

## Editar

- **Textos / contenido** → edita `content.js` y recarga. **Sin compilar.** Aplica a ES y EN.
- **Estructura o estilos de componente** (los `.jsx`) → recompila:

  ```bash
  npm install      # solo la primera vez
  npm run build    # regenera app.js y carousel.js
  ```
- **Etiquetas `<head>`** (title, description, Open Graph, JSON-LD) viven en `index.html`
  (ES) y `en/index.html` (EN) por separado. Si cambias una, **replica el cambio en la otra**.

## Bilingüe

- El idioma lo define la **URL**: `/` = español, `/en/` = inglés. El botón ES/EN navega entre ambas.
- Cada página declara su `lang`, su `canonical` y las etiquetas `hreflang` recíprocas, para que
  Google/Bing indexen cada idioma por separado.
- El tema (claro/oscuro) se guarda en `localStorage` y persiste al cambiar de idioma.

## Desplegar en Hostinger

Sube **todo** el contenido de la carpeta a `public_html/` (Git, File Manager o FTP),
**incluida la subcarpeta `en/`**. Necesario en el servidor: `index.html`, `en/index.html`,
`base.css`, `content.js`, `app.js`, `carousel.js`, `favicon.svg`, `og-image.png`,
`robots.txt`, `sitemap.xml`, `vendor/` y `assets/`. **No subas** `node_modules/` ni
`assets/_originals/` (ya están en `.gitignore`). Los `.jsx`, `package.json` y
`package-lock.json` no son necesarios en producción, pero no estorban.

## Notas

- Las tipografías se cargan desde Google Fonts (con respaldo a fuentes del sistema). Es la única dependencia externa en runtime; opcionalmente puedes autohospedarlas.
- Tras el despliegue, envía el `sitemap.xml` en Google Search Console.

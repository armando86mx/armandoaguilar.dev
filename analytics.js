/* Analítica del sitio — Google Analytics (GA4) + Microsoft Clarity.
   Cargado por index.html y en/index.html: los IDs viven aquí, en un solo lugar. */

/* Google Analytics (GA4) — G-D3EPGBCT24 */
(function () {
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=G-D3EPGBCT24";
  document.head.appendChild(s);
})();
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag("js", new Date());
gtag("config", "G-D3EPGBCT24");

/* Microsoft Clarity — x9kzbwihky */
(function (c, l, a, r, i, t, y) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "x9kzbwihky");

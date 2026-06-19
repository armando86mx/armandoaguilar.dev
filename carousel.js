/* Carrusel compartido por las 3 direcciones. Usa las variables de tema
   (--acc, --line, --panel, --bg, --bg-2, --mono) para adaptarse a cada una.
   Expuesto como window.Carousel. */
(function () {
  const {
    useState,
    useRef,
    useEffect,
    useCallback
  } = React;
  const CAR_CSS = `
  .aa-car { display: flex; flex-direction: column; gap: 12px; width: 100%; }
  .aa-car-stage { position: relative; overflow: hidden; border: 1px solid var(--line);
    height: min(clamp(380px, 54vh, 560px), 72vh);
    background:
      radial-gradient(120% 80% at 50% 0%, color-mix(in srgb, var(--acc) 7%, transparent), transparent 60%),
      var(--bg-2, var(--panel)); touch-action: pan-y; cursor: grab; }
  .aa-car-stage:active { cursor: grabbing; }
  .aa-car-track { display: flex; height: 100%; transition: transform .5s cubic-bezier(.22,.7,.2,1); will-change: transform; }
  .aa-car-slide { flex: 0 0 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .aa-car-slide img { max-width: 100%; max-height: 100%; object-fit: contain; display: block;
    box-shadow: 0 22px 50px -22px rgba(0,0,0,.55); border-radius: 6px; pointer-events: none; -webkit-user-drag: none; }
  .aa-car-badge { position: absolute; top: 12px; left: 12px; z-index: 4;
    font-family: var(--mono, inherit); font-size: 10.5px; letter-spacing: .5px;
    color: var(--acc); border: 1px solid var(--acc); padding: 4px 9px; border-radius: 4px;
    background: color-mix(in srgb, var(--bg) 80%, transparent); }
  .aa-car-tag { position: absolute; top: 12px; right: 12px; z-index: 4;
    font-family: var(--mono, inherit); font-size: 10.5px; letter-spacing: .5px;
    color: var(--fg-dim); border: 1px solid var(--line); padding: 4px 9px; border-radius: 4px;
    background: color-mix(in srgb, var(--bg) 80%, transparent); }
  .aa-car-btn { position: absolute; top: 50%; transform: translateY(-50%); z-index: 5;
    width: 42px; height: 42px; border-radius: 50%; cursor: pointer; display: grid; place-items: center;
    border: 1px solid var(--line); background: color-mix(in srgb, var(--bg) 78%, transparent);
    color: var(--fg); font-size: 22px; line-height: 1; backdrop-filter: blur(6px);
    transition: background .2s, border-color .2s, transform .2s; }
  .aa-car-btn:hover { border-color: var(--acc); color: var(--acc); }
  .aa-car-btn.prev { left: 12px; } .aa-car-btn.next { right: 12px; }
  .aa-car-foot { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
  .aa-car-dots { display: flex; gap: 7px; flex-wrap: wrap; }
  .aa-car-dot { width: 8px; height: 8px; border-radius: 50%; padding: 0; cursor: pointer;
    border: 1px solid var(--fg-faint); background: transparent; transition: .2s; }
  .aa-car-dot:hover { border-color: var(--acc); }
  .aa-car-dot.on { background: var(--acc); border-color: var(--acc); transform: scale(1.15); }
  .aa-car-count { font-family: var(--mono, inherit); font-size: 11.5px; color: var(--fg-faint); letter-spacing: .5px; white-space: nowrap; }
  @media (max-width: 520px){ .aa-car-btn { width: 36px; height: 36px; font-size: 18px; } }
  `;
  function ensureStyle() {
    if (document.getElementById("aa-car-style")) return;
    const s = document.createElement("style");
    s.id = "aa-car-style";
    s.textContent = CAR_CSS;
    document.head.appendChild(s);
  }
  function Carousel({
    images,
    badge,
    tag,
    name
  }) {
    const [i, setI] = useState(0);
    const n = images.length;
    const drag = useRef({
      x: 0,
      active: false,
      moved: 0
    });
    useEffect(ensureStyle, []);
    const go = useCallback(d => setI(p => (p + d + n) % n), [n]);
    const onDown = e => {
      drag.current = {
        x: e.clientX,
        active: true,
        moved: 0
      };
    };
    const onMove = e => {
      if (drag.current.active) drag.current.moved = e.clientX - drag.current.x;
    };
    const onUp = () => {
      if (!drag.current.active) return;
      const m = drag.current.moved;
      drag.current.active = false;
      if (m < -45) go(1);else if (m > 45) go(-1);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "aa-car"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aa-car-stage",
      onPointerDown: onDown,
      onPointerMove: onMove,
      onPointerUp: onUp,
      onPointerLeave: onUp
    }, /*#__PURE__*/React.createElement("div", {
      className: "aa-car-track",
      style: {
        transform: `translateX(${-i * 100}%)`
      }
    }, images.map((src, k) => /*#__PURE__*/React.createElement("div", {
      className: "aa-car-slide",
      key: k
    }, /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: `${name ? name + " — " : ""}${tag || "imagen"} ${k + 1}`,
      draggable: "false",
      loading: "lazy"
    })))), badge && /*#__PURE__*/React.createElement("span", {
      className: "aa-car-badge"
    }, badge), tag && /*#__PURE__*/React.createElement("span", {
      className: "aa-car-tag"
    }, tag), /*#__PURE__*/React.createElement("button", {
      className: "aa-car-btn prev",
      onClick: () => go(-1),
      "aria-label": "Anterior"
    }, "\u2039"), /*#__PURE__*/React.createElement("button", {
      className: "aa-car-btn next",
      onClick: () => go(1),
      "aria-label": "Siguiente"
    }, "\u203A")), /*#__PURE__*/React.createElement("div", {
      className: "aa-car-foot"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aa-car-dots"
    }, images.map((_, k) => /*#__PURE__*/React.createElement("button", {
      key: k,
      className: "aa-car-dot" + (k === i ? " on" : ""),
      onClick: () => setI(k),
      "aria-label": `Ir a ${k + 1}`
    }))), /*#__PURE__*/React.createElement("span", {
      className: "aa-car-count"
    }, String(i + 1).padStart(2, "0"), " / ", String(n).padStart(2, "0"))));
  }
  window.Carousel = Carousel;
})();

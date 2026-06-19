const {
  useState,
  useEffect,
  useRef
} = React;
const C = window.CONTENT;
const P = window.PICK;
const Carousel = window.Carousel;
function usePersisted(key, initial) {
  const [v, setV] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s == null ? initial : JSON.parse(s);
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {}
  }, [key, v]);
  return [v, setV];
}
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }), {
      threshold: 0.14
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}
function Reveal({
  children,
  className = "",
  style
}) {
  const [ref, shown] = useReveal();
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: `reveal ${shown ? "in" : ""} ${className}`,
    style: style
  }, children);
}
const CSS = `
.bp { position: relative; min-height: 100vh; }
.bp-grid { position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px),
    linear-gradient(var(--grid-2) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-2) 1px, transparent 1px);
  background-size: 28px 28px, 28px 28px, 140px 140px, 140px 140px; }
.bp-frame { position: fixed; inset: 14px; z-index: 0; pointer-events: none; border: 1px solid var(--line); }
.bp-frame::before, .bp-frame::after { content:""; position: absolute; width: 11px; height: 11px; border: 1px solid var(--acc); }
.bp-frame::before { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
.bp-frame::after { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }
.bp-main { position: relative; z-index: 2; }
.bp-shell { max-width: 1200px; margin: 0 auto; padding-inline: clamp(20px,5vw,72px); }

/* nav */
.bp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; border-bottom: 1px solid transparent; transition: background .35s ease, backdrop-filter .35s ease, border-color .35s ease; }
.bp-nav-in { max-width: 1200px; margin: 0 auto; padding: 16px clamp(24px,5vw,72px); display: flex; align-items: center; justify-content: space-between; }
.bp-nav.scrolled { background: color-mix(in srgb, var(--bg) 84%, transparent); backdrop-filter: blur(10px); border-bottom-color: var(--line); }
.bp-mark { font-family: var(--mono); font-size: 13.5px; letter-spacing: .5px; display: flex; align-items: center; gap: 9px; white-space: nowrap; }
.bp-mark .pin { width: 9px; height: 9px; border: 1.5px solid var(--acc); border-radius: 50%; position: relative; }
.bp-mark .pin::after { content:""; position: absolute; inset: 2px; background: var(--acc); border-radius: 50%; }
.bp-mark b { color: var(--acc); font-weight: 500; }
@media (max-width: 400px){ .bp-mark-suf { display: none; } }
.bp-navlinks { display: flex; gap: 3px; }
.bp-navlink { font-family: var(--mono); font-size: 12px; letter-spacing: .3px; color: var(--fg-dim); padding: 7px 12px; transition: .2s; white-space: nowrap; }
.bp-navlink:hover { color: var(--fg); }
.bp-navlink.active { color: var(--acc); }
.bp-ctrls { display: flex; gap: 8px; }
.bp-tg { font-family: var(--mono); font-size: 12px; color: var(--fg-dim); border: 1px solid var(--line); background: transparent; padding: 7px 10px; cursor: pointer; transition: .2s; }
.bp-tg:hover { border-color: var(--acc); color: var(--fg); }
.bp-tg .on { color: var(--acc); }
.bp-burger { display: none; font-family: var(--mono); font-size: 15px; line-height: 1; color: var(--fg-dim); border: 1px solid var(--line); background: transparent; padding: 8px 11px; cursor: pointer; transition: .2s; }
.bp-burger:hover { border-color: var(--acc); color: var(--fg); }
.bp-mobnav { display: none; }
@media (max-width: 880px){
  .bp-navlinks { display: none; }
  .bp-burger { display: inline-flex; align-items: center; justify-content: center; }
  .bp-mobnav.open { display: flex; flex-direction: column; position: fixed; top: 0; left: 0; right: 0; z-index: 49;
    padding: 70px clamp(20px,5vw,72px) 22px; background: color-mix(in srgb, var(--bg) 95%, transparent);
    backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); animation: bpmob .22s ease; }
  .bp-mobnav.open a { font-family: var(--mono); font-size: 15px; color: var(--fg-dim); letter-spacing: .3px;
    padding: 15px 2px; border-bottom: 1px solid var(--line-2); transition: color .2s; }
  .bp-mobnav.open a:last-child { border-bottom: 0; }
  .bp-mobnav.open a.active { color: var(--acc); }
}
@keyframes bpmob { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }

/* section header */
.bp-section { padding-block: clamp(72px,11vh,128px); position: relative; }
.bp-sechead { display: flex; align-items: center; gap: 14px; margin-bottom: 48px; }
.bp-cross { width: 18px; height: 18px; position: relative; flex-shrink: 0; }
.bp-cross::before, .bp-cross::after { content:""; position: absolute; background: var(--acc); }
.bp-cross::before { left: 50%; top: 0; bottom: 0; width: 1px; transform: translateX(-50%); }
.bp-cross::after { top: 50%; left: 0; right: 0; height: 1px; transform: translateY(-50%); }
.bp-sechead .sec { font-family: var(--mono); font-size: 12px; color: var(--acc); letter-spacing: 1px; }
.bp-sechead .ttl { font-family: var(--mono); font-size: 12px; font-weight: 400; color: var(--fg-dim); letter-spacing: 2px; text-transform: uppercase; }
.bp-sechead .rule { flex: 1; height: 1px; background: var(--line); }
.bp-sechead .coord { font-family: var(--mono); font-size: 11px; color: var(--fg-faint); }

/* hero */
.bp-hero { padding-block: clamp(74px,9vh,116px) clamp(48px,7vh,84px); }
.bp-kicker { font-family: var(--mono); font-size: 12.5px; color: var(--fg-dim); letter-spacing: .4px; margin-bottom: 26px; display: flex; align-items: center; gap: 11px; }
.bp-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--acc); animation: bppulse 2.2s infinite; flex-shrink: 0; }
@keyframes bppulse { 0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--acc) 55%,transparent);} 70%{box-shadow:0 0 0 9px transparent;} 100%{box-shadow:0 0 0 0 transparent;} }
.bp-hero-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: clamp(34px,5vw,64px); align-items: center; }
.bp-headline { font-size: clamp(40px,6.6vw,86px); font-weight: 600; line-height: 1.0; letter-spacing: -.025em; }
.bp-headline .em { color: var(--acc); position: relative; }
.bp-headline .br { display: block; }
.bp-sub { color: var(--fg-dim); font-size: clamp(15px,1.5vw,18px); max-width: 48ch; margin-top: 22px; }
.bp-role { font-family: var(--mono); font-size: 13px; color: var(--fg); margin-top: 22px; padding-left: 14px; border-left: 2px solid var(--acc); line-height: 1.5; }
.bp-cta { display: flex; gap: 13px; margin-top: 28px; flex-wrap: wrap; }
.bp-btn { font-family: var(--mono); font-size: 13px; padding: 13px 22px; cursor: pointer; transition: .22s; border: 1px solid var(--acc); background: var(--acc); color: var(--bg); font-weight: 500; display: inline-flex; gap: 8px; align-items: center; }
.bp-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 26px -12px var(--acc); }
.bp-btn.ghost { background: transparent; color: var(--fg); border-color: var(--line); }
.bp-btn.ghost:hover { border-color: var(--acc); color: var(--acc); box-shadow: none; }

/* hero photo — Mac window */
.bp-hero-right { display: flex; flex-direction: column; }
.bp-photo-card { border: 1px solid var(--line); overflow: hidden; background: var(--panel); box-shadow: 0 30px 70px -42px #000; }
.bp-photo-bar { display: flex; align-items: center; gap: 7px; padding: 11px 14px; border-bottom: 1px solid var(--line); }
.bp-photo-bar i { width: 10px; height: 10px; border-radius: 50%; background: var(--line); }
.bp-photo-bar i:nth-child(1){ background: var(--acc); }
.bp-photo-bar i:nth-child(2){ background: color-mix(in srgb,var(--acc) 55%, var(--fg-faint)); }
.bp-photo-bar i:nth-child(3){ background: var(--fg-faint); }
.bp-photo-bar span { font-family: var(--mono); font-size: 11.5px; color: var(--fg-faint); margin-left: 6px; white-space: nowrap; }
.bp-photo-img { position: relative; aspect-ratio: 4/4.5; overflow: hidden; }
.bp-photo-img img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 16%; filter: grayscale(.2) contrast(1.03) saturate(.9); }
.bp-photo-img::after { content:""; position:absolute; inset:0; pointer-events: none; box-shadow: inset 0 0 0 1px var(--acc-soft);
  background: linear-gradient(180deg, transparent 50%, color-mix(in srgb,var(--panel) 80%, transparent)); }
.bp-photo-meta { position:absolute; z-index: 4; bottom: 15px; left: 15px; right: 15px; font-family: var(--mono); font-size: 12px; color: var(--fg); display: flex; align-items: center; }
.bp-photo-meta .who { display: inline-flex; align-items: center; gap: 9px; padding-left: 18px; white-space: nowrap; text-shadow: 0 1px 7px var(--panel), 0 0 2px var(--panel); }
.bp-photo-meta b { color: var(--acc); font-size: 13px; line-height: 1; }
.bp-social { display: flex; gap: 13px; justify-content: center; align-items: center; margin-top: 18px; }
.bp-soc { font-family: var(--mono); font-size: 13px; border: 1px solid var(--line); padding: 13px 22px; display: inline-flex; align-items: center; gap: 8px; transition: .22s; background: transparent; color: var(--fg); }
.bp-soc span { color: var(--acc); transition: .22s; }
.bp-soc.gh:hover { border-color: var(--acc); color: var(--acc); transform: translateY(-2px); }
.bp-soc.li { background: #0a66c2; border-color: #0a66c2; color: #fff; }
.bp-soc.li span { color: #fff; }
.bp-soc.li:hover { background: #084e96; border-color: #084e96; transform: translateY(-2px); }

/* analytic */
.bp-analytic-lead { font-size: clamp(20px,2.6vw,31px); line-height: 1.36; font-weight: 500; max-width: 30ch; letter-spacing: -.01em; }
.bp-analytic-lead .hl { color: var(--acc); }
.bp-cols { display: grid; grid-template-columns: repeat(3,1fr); margin-top: 54px; border: 1px solid var(--line); }
.bp-col { padding: 28px 26px; border-right: 1px solid var(--line); position: relative; transition: background .25s; }
.bp-col:last-child { border-right: 0; }
.bp-col:hover { background: var(--acc-soft); }
.bp-col .idx { font-family: var(--mono); font-size: 11px; color: var(--fg-faint); position: absolute; top: 12px; right: 14px; }
.bp-col h4 { font-family: var(--mono); font-size: 14px; color: var(--acc); margin-bottom: 14px; letter-spacing: .4px; }
.bp-col p { color: var(--fg-dim); font-size: 14.5px; }

/* projects — alternating feature */
.bp-feat { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(30px,5vw,64px); padding: clamp(44px,7vh,84px) 0; border-top: 1px solid var(--line); align-items: center; }
.bp-feat:first-of-type { border-top: 0; padding-top: 0; }
.bp-feat.flip .bp-feat-media { order: -1; }
.bp-feat-area { font-family: var(--mono); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--acc); margin-bottom: 18px; }
.bp-feat-title { font-size: clamp(26px,3.3vw,44px); font-weight: 600; line-height: 1.04; letter-spacing: -.02em; margin-bottom: 18px; }
.bp-feat-name { font-family: var(--mono); font-size: 11.5px; letter-spacing: .06em; text-transform: uppercase; color: var(--fg-faint); margin-bottom: 24px; }
.bp-feat-body p { color: var(--fg-dim); margin-bottom: 16px; font-size: 15px; }
.bp-feat-body p.res { color: var(--fg); }
.bp-feat-body .lbl { display: block; font-family: var(--mono); font-size: 10.5px; letter-spacing: 1px; text-transform: uppercase; color: var(--fg-faint); margin-bottom: 5px; }
.bp-feat-body p.res .lbl { color: var(--acc); }
.bp-feat-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.bp-feat-tags span { font-family: var(--mono); font-size: 11.5px; color: var(--fg-dim); border: 1px solid var(--line); padding: 5px 11px; }
.bp-feat-ai { font-family: var(--mono); font-size: 11.5px; color: var(--acc); margin-top: 16px; display: flex; gap: 7px; align-items: center; }
.bp-feat-ai::before { content:"⌖"; }
.bp-pbtns { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
.bp-pbtn { font-family: var(--mono); font-size: 12.5px; padding: 12px 18px; cursor: pointer; transition: .22s; display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--line); background: transparent; color: var(--fg); }
.bp-pbtn:hover { border-color: var(--acc); color: var(--acc); transform: translateY(-2px); }
.bp-pbtn.primary { background: var(--acc); color: var(--bg); border-color: var(--acc); }
.bp-pbtn.primary:hover { color: var(--bg); box-shadow: 0 12px 26px -12px var(--acc); }
.bp-pbtn.soon { opacity: .7; cursor: default; }
.bp-pbtn.soon:hover { transform: none; border-color: var(--line); color: var(--fg); }
.bp-pbtn .s { color: var(--fg-faint); }
.bp-feat-media { position: relative; }
.bp-media-frame { border: 1px solid var(--line); background: var(--panel); overflow: hidden; position: relative; }
.bp-media-frame img { width: 100%; display: block; }
.bp-media-frame .tag { position: absolute; top: 11px; left: 11px; z-index: 3; font-family: var(--mono); font-size: 10px; letter-spacing: .05em; text-transform: uppercase; background: var(--acc); color: var(--bg); padding: 4px 9px; }

/* about */
.bp-about { display: grid; grid-template-columns: 1fr .85fr; gap: clamp(32px,5vw,64px); }
.bp-about p { font-size: clamp(16px,1.7vw,19px); color: var(--fg-dim); margin-bottom: 20px; max-width: 52ch; }
.bp-about p:first-of-type { color: var(--fg); }
.bp-card { border: 1px solid var(--line); background: var(--panel); padding: 24px; margin-bottom: 24px; }
.bp-card h5 { font-family: var(--mono); font-size: 12px; color: var(--acc); letter-spacing: .6px; margin-bottom: 16px; text-transform: uppercase; }
.bp-langrow { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--line-2); font-size: 15px; }
.bp-langrow:last-child { border-bottom: 0; }
.bp-langrow span { font-family: var(--mono); font-size: 12px; color: var(--fg-dim); }
.bp-edu-item { padding: 14px 0; border-bottom: 1px solid var(--line-2); }
.bp-edu-item:last-child { border-bottom: 0; }
.bp-edu-item h6 { font-size: 14.5px; font-weight: 600; }
.bp-edu-item .d { font-size: 13px; color: var(--fg-dim); margin: 4px 0; }
.bp-edu-item .y { font-family: var(--mono); font-size: 11px; color: var(--fg-faint); margin-bottom: 8px; }
.bp-edu-item .desc { font-size: 13.5px; color: var(--fg-dim); border-top: 1px solid var(--line-2); padding-top: 10px; margin-top: 4px; }
.bp-photo-slot { border: 1px solid var(--line); aspect-ratio: 3/2.4; display: grid; place-items: center; margin-bottom: 24px; overflow: hidden; }
.bp-photo-slot img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 14%; }
.reveal.bp-about-aside { display: flex; }
.bp-about-aside-in { display: flex; flex-direction: column; width: 100%; flex: 1; }
.bp-about-aside-in .bp-photo-slot { flex: 1 1 0; min-height: 0; aspect-ratio: auto; position: relative; overflow: hidden; }
.bp-about-aside-in .bp-photo-slot img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 14%; }
.bp-about-aside-in .bp-card { margin-bottom: 0; }

/* skills */
.bp-skill-groups { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); border: 1px solid var(--line); }
.bp-skill-g { background: var(--bg); padding: 28px; }
.bp-skill-g h4 { font-family: var(--mono); font-size: 13px; color: var(--acc); margin-bottom: 18px; letter-spacing: .5px; }
.bp-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.bp-chip { font-family: var(--mono); font-size: 12.5px; color: var(--fg); border: 1px solid var(--line); padding: 8px 13px; transition: .2s; }
.bp-chip:hover { border-color: var(--acc); color: var(--acc); }
.bp-skills-intro { color: var(--fg-dim); font-size: 15px; margin-bottom: 28px; max-width: 52ch; }
.bp-studying { margin-top: 28px; font-family: var(--mono); font-size: 13.5px; color: var(--acc); border: 1px solid var(--acc); padding: 16px 20px; display: flex; gap: 12px; align-items: center; background: var(--acc-soft); }
.bp-studying::before { content:"▸"; }

/* certifications — standout band */
.bp-cert-band { border: 1px solid var(--acc); background: linear-gradient(150deg, var(--acc-soft), var(--panel) 74%); box-shadow: 0 22px 54px -34px var(--acc); padding: clamp(24px,3.4vw,34px); margin-top: 26px; position: relative; }
.bp-cert-band::before, .bp-cert-band::after { content:""; position: absolute; width: 10px; height: 10px; border: 1px solid var(--acc); }
.bp-cert-band::before { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
.bp-cert-band::after { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }
.bp-cert-band-label { font-family: var(--mono); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--acc); display: flex; gap: 9px; align-items: center; margin-bottom: 24px; }
.bp-cert-band-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(20px,3vw,38px); }
.bp-cert-feat { border-left: 2px solid var(--acc); padding-left: 20px; }
.bp-cert-feat .nm { font-size: clamp(20px,2.2vw,26px); font-weight: 600; letter-spacing: -.015em; line-height: 1.08; display: flex; align-items: baseline; gap: 11px; }
.bp-cert-feat .nm i { width: 9px; height: 9px; border-radius: 50%; background: var(--acc); box-shadow: 0 0 0 4px var(--acc-soft); flex-shrink: 0; transform: translateY(-2px); }
.bp-cert-feat .is { font-family: var(--mono); font-size: 11.5px; color: var(--fg-dim); margin-top: 11px; line-height: 1.55; text-transform: uppercase; letter-spacing: .02em; }
.bp-cert-verify { font-family: var(--mono); font-size: 11px; color: var(--acc); margin-top: 14px; display: inline-block; border-bottom: 1px solid transparent; transition: .2s; }
.bp-cert-verify:hover { border-bottom-color: var(--acc); }
.bp-certs-note { font-family: var(--mono); font-size: 12.5px; color: var(--fg-dim); margin-top: 20px; }

/* contact */
.bp-contact-h { font-size: clamp(30px,4.6vw,58px); font-weight: 600; letter-spacing: -.025em; line-height: 1.04; max-width: 16ch; }
.bp-contact-h .em { color: var(--acc); }
.bp-contact-sub { color: var(--fg-dim); font-size: 17px; margin-top: 22px; max-width: 44ch; }
.bp-links { margin-top: 42px; border-top: 1px solid var(--line); }
.bp-link { display: flex; align-items: center; gap: 18px; padding: 22px 4px; border-bottom: 1px solid var(--line); transition: .25s; }
.bp-link:hover { padding-left: 16px; background: var(--acc-soft); }
.bp-link .k { font-family: var(--mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--fg-faint); width: 96px; flex-shrink: 0; }
.bp-link .v { font-size: clamp(16px,2vw,22px); font-weight: 600; flex: 1; }
.bp-link .ar { color: var(--acc); font-family: var(--mono); transition: .25s; }
.bp-link:hover .ar { transform: translate(4px,-4px); }

.bp-footer { border-top: 1px solid var(--line); padding-block: 28px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-family: var(--mono); font-size: 11.5px; color: var(--fg-faint); }
.bp-footer a:hover { color: var(--acc); }

.reveal { } .reveal.in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: no-preference){
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
}
@media (max-width: 880px){
  .bp-hero-grid { grid-template-columns: 1fr; }
  .bp-hero-right { max-width: 400px; }
  .bp-cols { grid-template-columns: 1fr; }
  .bp-col { border-right: 0; border-bottom: 1px solid var(--line); }
  .bp-feat { grid-template-columns: 1fr; }
  .bp-feat.flip .bp-feat-media { order: 0; }
  .bp-about { grid-template-columns: 1fr; }
  .bp-about-aside-in .bp-photo-slot { flex: 0 0 auto; aspect-ratio: 3/2.4; }
  .bp-skill-groups { grid-template-columns: 1fr; }
  .bp-cert-band-grid { grid-template-columns: 1fr; gap: 26px; }
}
`;
function Feature({
  p,
  i,
  t
}) {
  const flip = i % 2 === 1;
  return /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("article", {
    className: `bp-feat ${flip ? "flip" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-feat-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-feat-area"
  }, t(p.area)), /*#__PURE__*/React.createElement("h3", {
    className: "bp-feat-title"
  }, t(p.title)), /*#__PURE__*/React.createElement("div", {
    className: "bp-feat-name"
  }, t(p.name), " \xB7 ", t(p.kind)), /*#__PURE__*/React.createElement("div", {
    className: "bp-feat-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "prob"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, t(C.ui.problem)), t(p.problem)), /*#__PURE__*/React.createElement("p", {
    className: "res"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, t(C.ui.result)), t(p.result))), /*#__PURE__*/React.createElement("div", {
    className: "bp-feat-tags"
  }, p.tags.map((tg, k) => /*#__PURE__*/React.createElement("span", {
    key: k
  }, t(tg)))), p.ai && /*#__PURE__*/React.createElement("div", {
    className: "bp-feat-ai"
  }, t(C.ui.builtAi)), p.linkPending && /*#__PURE__*/React.createElement("div", {
    className: "bp-pbtns"
  }, p.link ? /*#__PURE__*/React.createElement("a", {
    className: "bp-pbtn primary",
    href: p.link,
    target: "_blank",
    rel: "noopener"
  }, t(C.ui.viewSite), " \u2197") : /*#__PURE__*/React.createElement("span", {
    className: "bp-pbtn soon"
  }, t(C.ui.viewSite), " ", /*#__PURE__*/React.createElement("span", {
    className: "s"
  }, "\xB7 ", t(C.ui.soon))))), /*#__PURE__*/React.createElement("div", {
    className: "bp-feat-media"
  }, p.images ? /*#__PURE__*/React.createElement(Carousel, {
    images: p.images,
    badge: p.status ? t(p.status) : null,
    tag: t(p.imageLabel),
    name: t(p.name)
  }) : /*#__PURE__*/React.createElement("div", {
    className: "bp-media-frame"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tag"
  }, t(p.imageLabel)), /*#__PURE__*/React.createElement("img", {
    src: p.image,
    alt: t(p.name),
    loading: "lazy"
  })))));
}
function App() {
  const [lang] = useState(/^\/en(\/|$)/.test(location.pathname) ? "en" : "es");
  const [theme, setTheme] = usePersisted("aa_theme", "dark");
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = n => P(n, lang);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.lang = lang;
  }, [theme, lang]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    }), {
      rootMargin: "-45% 0px -50% 0px"
    });
    C.nav.forEach(n => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  const head = t(C.hero.tagline);
  const secCoord = i => "X:" + String(i * 240).padStart(4, "0") + " · Y:" + String(i * 160).padStart(4, "0");
  return /*#__PURE__*/React.createElement("div", {
    className: "bp"
  }, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("div", {
    className: "bp-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bp-frame"
  }), /*#__PURE__*/React.createElement("nav", {
    className: `bp-nav ${scrolled ? "scrolled" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-nav-in"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#inicio",
    className: "bp-mark"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pin"
  }), "A.AGUILAR", /*#__PURE__*/React.createElement("span", {
    className: "bp-mark-suf"
  }, /*#__PURE__*/React.createElement("b", null, "\xB7"), lang === "es" ? "INFRA/NUBE" : "INFRA/CLOUD")), /*#__PURE__*/React.createElement("div", {
    className: "bp-navlinks"
  }, C.nav.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.id,
    href: `#${n.id}`,
    className: `bp-navlink ${active === n.id ? "active" : ""}`
  }, t(n)))), /*#__PURE__*/React.createElement("div", {
    className: "bp-ctrls"
  }, /*#__PURE__*/React.createElement("a", {
    className: "bp-tg bp-tg-lang",
    href: lang === "es" ? "/en/" : "/",
    "aria-label": lang === "es" ? "Switch to English" : "Cambiar a español"
  }, /*#__PURE__*/React.createElement("span", {
    className: lang === "es" ? "on" : ""
  }, "ES"), "/", /*#__PURE__*/React.createElement("span", {
    className: lang === "en" ? "on" : ""
  }, "EN")), /*#__PURE__*/React.createElement("button", {
    className: "bp-tg",
    onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
    "aria-label": lang === "es" ? theme === "dark" ? "Activar modo claro" : "Activar modo oscuro" : theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  }, theme === "dark" ? "☾" : "☀"), /*#__PURE__*/React.createElement("button", {
    className: "bp-burger",
    onClick: () => setMenuOpen(o => !o),
    "aria-label": lang === "es" ? "Menú" : "Menu",
    "aria-expanded": menuOpen
  }, menuOpen ? "✕" : "☰")))), /*#__PURE__*/React.createElement("div", {
    className: `bp-mobnav ${menuOpen ? "open" : ""}`
  }, C.nav.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.id,
    href: `#${n.id}`,
    className: active === n.id ? "active" : "",
    onClick: () => setMenuOpen(false)
  }, t(n)))), /*#__PURE__*/React.createElement("main", {
    className: "bp-main"
  }, /*#__PURE__*/React.createElement("header", {
    id: "inicio",
    className: "bp-shell bp-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-kicker"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bp-dot"
  }), t(C.hero.kicker)), /*#__PURE__*/React.createElement("div", {
    className: "bp-hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "bp-headline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "br"
  }, head[0]), /*#__PURE__*/React.createElement("span", {
    className: "br"
  }, /*#__PURE__*/React.createElement("span", {
    className: "em"
  }, head[1])), /*#__PURE__*/React.createElement("span", {
    className: "br"
  }, head[2])), /*#__PURE__*/React.createElement("p", {
    className: "bp-sub"
  }, t(C.hero.sub)), /*#__PURE__*/React.createElement("p", {
    className: "bp-role"
  }, "// ", t(C.hero.role)), /*#__PURE__*/React.createElement("div", {
    className: "bp-cta"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#proyectos",
    className: "bp-btn"
  }, t(C.hero.ctaPrimary), " \u2192"), /*#__PURE__*/React.createElement("a", {
    href: "#contacto",
    className: "bp-btn ghost"
  }, t(C.hero.ctaSecondary)))), /*#__PURE__*/React.createElement("div", {
    className: "bp-hero-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-photo-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-photo-bar"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("span", null, "~/armando \u2014 id")), /*#__PURE__*/React.createElement("div", {
    className: "bp-photo-img"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/assets/armando-aguilar.webp",
    alt: "Armando Aguilar",
    width: "600",
    height: "675"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bp-photo-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "who"
  }, /*#__PURE__*/React.createElement("b", null, "\u25CF"), " ", t(C.hero.photoCaption))))), /*#__PURE__*/React.createElement("div", {
    className: "bp-social"
  }, /*#__PURE__*/React.createElement("a", {
    className: "bp-soc gh",
    href: C.contact.github,
    target: "_blank",
    rel: "noopener"
  }, "GitHub ", /*#__PURE__*/React.createElement("span", null, "\u2197")), /*#__PURE__*/React.createElement("a", {
    className: "bp-soc li",
    href: C.contact.linkedin,
    target: "_blank",
    rel: "noopener"
  }, "LinkedIn ", /*#__PURE__*/React.createElement("span", null, "\u2197")))))), /*#__PURE__*/React.createElement("section", {
    id: "mente",
    className: "bp-shell bp-section"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "bp-sechead"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bp-cross"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sec"
  }, "SEC.01"), /*#__PURE__*/React.createElement("h2", {
    className: "ttl"
  }, t(C.analytic.label)), /*#__PURE__*/React.createElement("span", {
    className: "rule"
  }), /*#__PURE__*/React.createElement("span", {
    className: "coord"
  }, secCoord(1)))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "bp-analytic-lead"
  }, (() => {
    const key = lang === "es" ? "posibles puntos de falla" : "potential points of failure";
    const txt = t(C.analytic.intro);
    const i = txt.indexOf(key);
    if (i < 0) return txt;
    return /*#__PURE__*/React.createElement(React.Fragment, null, txt.slice(0, i), /*#__PURE__*/React.createElement("span", {
      className: "hl"
    }, txt.slice(i)));
  })())), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "bp-cols"
  }, C.analytic.cols.map((c, i) => /*#__PURE__*/React.createElement("div", {
    className: "bp-col",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "idx"
  }, "0", i + 1), /*#__PURE__*/React.createElement("h4", null, t(c.title)), /*#__PURE__*/React.createElement("p", null, t(c.body))))))), /*#__PURE__*/React.createElement("section", {
    id: "proyectos",
    className: "bp-shell bp-section"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "bp-sechead"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bp-cross"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sec"
  }, "SEC.02"), /*#__PURE__*/React.createElement("h2", {
    className: "ttl"
  }, lang === "es" ? "Proyectos seleccionados" : "Selected work"), /*#__PURE__*/React.createElement("span", {
    className: "rule"
  }), /*#__PURE__*/React.createElement("span", {
    className: "coord"
  }, C.projects.length, " ", lang === "es" ? "registros" : "records"))), C.projects.map((p, i) => /*#__PURE__*/React.createElement(Feature, {
    key: p.id,
    p: p,
    i: i,
    t: t
  }))), /*#__PURE__*/React.createElement("section", {
    id: "sobre",
    className: "bp-shell bp-section"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "bp-sechead"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bp-cross"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sec"
  }, "SEC.03"), /*#__PURE__*/React.createElement("h2", {
    className: "ttl"
  }, t(C.about.label)), /*#__PURE__*/React.createElement("span", {
    className: "rule"
  }), /*#__PURE__*/React.createElement("span", {
    className: "coord"
  }, secCoord(3)))), /*#__PURE__*/React.createElement("div", {
    className: "bp-about"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", null, C.about.paras.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, t(p))), /*#__PURE__*/React.createElement("div", {
    className: "bp-card",
    style: {
      marginTop: "28px",
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("h5", null, t(C.about.educationLabel)), C.about.education.map((e, i) => /*#__PURE__*/React.createElement("div", {
    className: "bp-edu-item",
    key: i
  }, /*#__PURE__*/React.createElement("h6", null, e.school, " \xB7 ", t(e.place)), /*#__PURE__*/React.createElement("div", {
    className: "d"
  }, t(e.degree)), /*#__PURE__*/React.createElement("div", {
    className: "y"
  }, e.years), e.desc && /*#__PURE__*/React.createElement("div", {
    className: "desc"
  }, t(e.desc))))))), /*#__PURE__*/React.createElement(Reveal, {
    className: "bp-about-aside"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-about-aside-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-photo-slot"
  }, C.about.photo ? /*#__PURE__*/React.createElement("img", {
    src: C.about.photo,
    alt: C.meta.name,
    loading: "lazy"
  }) : /*#__PURE__*/React.createElement("span", null, "[ ", t(C.about.photoLabel), " ]")), /*#__PURE__*/React.createElement("div", {
    className: "bp-card"
  }, /*#__PURE__*/React.createElement("h5", null, t(C.about.languagesLabel)), C.about.languages.map((l, i) => /*#__PURE__*/React.createElement("div", {
    className: "bp-langrow",
    key: i
  }, /*#__PURE__*/React.createElement("b", null, t(l.name)), /*#__PURE__*/React.createElement("span", null, t(l.level))))))))), /*#__PURE__*/React.createElement("section", {
    id: "habilidades",
    className: "bp-shell bp-section"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "bp-sechead"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bp-cross"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sec"
  }, "SEC.04"), /*#__PURE__*/React.createElement("h2", {
    className: "ttl"
  }, t(C.skills.label)), /*#__PURE__*/React.createElement("span", {
    className: "rule"
  }), /*#__PURE__*/React.createElement("span", {
    className: "coord"
  }, secCoord(4)))), C.skills.intro && /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "bp-skills-intro"
  }, t(C.skills.intro))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "bp-skill-groups"
  }, C.skills.groups.map((g, i) => /*#__PURE__*/React.createElement("div", {
    className: "bp-skill-g",
    key: i
  }, /*#__PURE__*/React.createElement("h4", null, t(g.label)), /*#__PURE__*/React.createElement("div", {
    className: "bp-chips"
  }, g.items.map((it, k) => /*#__PURE__*/React.createElement("span", {
    className: "bp-chip",
    key: k
  }, t(it)))))))), C.skills.studying && /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "bp-studying"
  }, t(C.skills.studying))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "bp-cert-band"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bp-cert-band-label"
  }, "\u2605 ", t(C.certs.bannerLabel)), /*#__PURE__*/React.createElement("div", {
    className: "bp-cert-band-grid"
  }, C.certs.items.map((c, i) => /*#__PURE__*/React.createElement("div", {
    className: "bp-cert-feat",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, /*#__PURE__*/React.createElement("i", null), c.name), /*#__PURE__*/React.createElement("div", {
    className: "is"
  }, c.issuer, " \xB7 ", t(c.note)), c.link && /*#__PURE__*/React.createElement("a", {
    className: "bp-cert-verify",
    href: c.link,
    target: "_blank",
    rel: "noopener"
  }, t(C.ui.verify), " \u2197"))))), C.certs.note && /*#__PURE__*/React.createElement("p", {
    className: "bp-certs-note"
  }, t(C.certs.note)))), /*#__PURE__*/React.createElement("section", {
    id: "contacto",
    className: "bp-shell bp-section"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "bp-sechead"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bp-cross"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sec"
  }, "SEC.05"), /*#__PURE__*/React.createElement("h2", {
    className: "ttl"
  }, t(C.contact.label)), /*#__PURE__*/React.createElement("span", {
    className: "rule"
  }))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    className: "bp-contact-h"
  }, (() => {
    const w = t(C.contact.headline).split(" ");
    return /*#__PURE__*/React.createElement(React.Fragment, null, w.slice(0, -1).join(" "), " ", /*#__PURE__*/React.createElement("span", {
      className: "em"
    }, w.slice(-1)));
  })()), /*#__PURE__*/React.createElement("p", {
    className: "bp-contact-sub"
  }, t(C.contact.blurb)), /*#__PURE__*/React.createElement("div", {
    className: "bp-links"
  }, /*#__PURE__*/React.createElement("a", {
    className: "bp-link",
    href: `mailto:${C.contact.email}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Email"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, C.contact.email), /*#__PURE__*/React.createElement("span", {
    className: "ar"
  }, "\u2197")), /*#__PURE__*/React.createElement("a", {
    className: "bp-link",
    href: C.contact.github,
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "GitHub"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, C.contact.githubLabel), /*#__PURE__*/React.createElement("span", {
    className: "ar"
  }, "\u2197")), /*#__PURE__*/React.createElement("a", {
    className: "bp-link",
    href: C.contact.linkedin,
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "LinkedIn"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, C.contact.linkedinLabel), /*#__PURE__*/React.createElement("span", {
    className: "ar"
  }, "\u2197"))))), /*#__PURE__*/React.createElement("footer", {
    className: "bp-shell bp-footer"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " ", C.meta.name, " \xB7 ", t(C.meta.role)), /*#__PURE__*/React.createElement("a", {
    href: C.contact.linkedin,
    target: "_blank",
    rel: "noopener"
  }, "LinkedIn \u2197"))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));

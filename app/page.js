'use client';
import { useEffect, useRef, useState } from 'react';

/* ── Corner Ornament SVG (reused) ── */
function CornerSVG({ hasInnerCurve }) {
  return (
    <svg viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L4 32" stroke="#C9A84C" strokeWidth="1.6" />
      <path d="M4 4L32 4" stroke="#C9A84C" strokeWidth="1.6" />
      <path d="M4 4Q20 4 20 20Q20 32 32 32" stroke="#C9A84C" strokeWidth=".75" fill="none" opacity=".55" />
      {hasInnerCurve && <path d="M4 4Q12 4 12 12Q12 18 18 18" stroke="#C9A84C" strokeWidth=".5" fill="none" opacity=".35" />}
      <polygon points="4,1 7,4 4,7 1,4" fill="#C9A84C" opacity=".9" />
      <circle cx="32" cy="4" r="1.6" fill="#C9A84C" opacity=".6" />
      <circle cx="4" cy="32" r="1.6" fill="#C9A84C" opacity=".6" />
    </svg>
  );
}

/* ── Gold Dust Particles ── */
const particles = [
  { w: 2, l: '12%', b: '28%', d: '7s', dl: '0s', tx: '7px', ty: '-38px' },
  { w: 3, l: '22%', b: '18%', d: '9.5s', dl: '1.8s', tx: '-5px', ty: '-55px' },
  { w: 2, r: '18%', b: '32%', d: '8s', dl: '.9s', tx: '-8px', ty: '-48px' },
  { w: 2, r: '28%', b: '14%', d: '6.5s', dl: '3.2s', tx: '6px', ty: '-42px' },
  { w: 3, l: '38%', b: '8%', d: '10s', dl: '2.1s', tx: '-3px', ty: '-68px' },
  { w: 2, r: '12%', t: '38%', d: '8.5s', dl: '4.1s', tx: '9px', ty: '28px' },
  { w: 2, l: '8%', t: '42%', d: '7.5s', dl: '5.5s', tx: '-7px', ty: '22px' },
  { w: 2, l: '52%', b: '22%', d: '8s', dl: '2.8s', tx: '5px', ty: '-52px' },
];

/* ── Year options ── */
const years = [];
for (let y = 1995; y <= 2025; y++) years.push(y);

export default function FarewellPage() {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [batchFrom, setBatchFrom] = useState('');
  const [batchTo, setBatchTo] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  /* ── 1. STARFIELD BG ── */
  useEffect(() => {
    const c = canvasRef.current, x = c.getContext('2d');
    let W, H, pts = [], animId;
    const rs = () => { W = c.width = innerWidth; H = c.height = innerHeight; };
    rs(); window.addEventListener('resize', rs);
    function P() {
      this.reset = function () { this.x = Math.random() * W; this.y = Math.random() * H; this.r = Math.random() * 1.4 + .2; this.vx = (Math.random() - .5) * .18; this.vy = (Math.random() - .5) * .18 - .04; this.life = 0; this.max = Math.random() * 220 + 100; this.gold = Math.random() > .35; };
      this.reset(); this.life = Math.random() * this.max;
    }
    for (let i = 0; i < 140; i++) pts.push(new P());
    (function loop() {
      x.clearRect(0, 0, W, H);
      pts.forEach(p => { p.life++; if (p.life > p.max) p.reset(); const t = p.life / p.max, a = t < .18 ? t / .18 : t > .82 ? (1 - t) / .18 : 1; p.x += p.vx; p.y += p.vy; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.28); x.fillStyle = p.gold ? `rgba(201,168,76,${a * .65})` : `rgba(180,200,255,${a * .18})`; x.fill(); });
      animId = requestAnimationFrame(loop);
    })();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', rs); };
  }, []);

  /* ── 2. INTRO ORCHESTRATION ── */
  useEffect(() => {
    const intro = document.getElementById('intro');
    const flap = document.getElementById('env-flap');
    const seal = document.getElementById('wax-seal');
    const envCard = document.getElementById('env-card');
    const scene = document.getElementById('invite-scene');
    const t1 = setTimeout(() => { seal.classList.add('bye'); flap.classList.add('open'); }, 900);
    const t2 = setTimeout(() => envCard.classList.add('out'), 1500);
    const t3 = setTimeout(() => intro.classList.add('gone'), 2700);
    const t4 = setTimeout(() => {
      scene.classList.add('show');
      document.querySelectorAll('.rv').forEach((el, i) => setTimeout(() => el.classList.add('on'), i * 110));
    }, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  /* ── 3. MOUSE PARALLAX TILT ── */
  useEffect(() => {
    const card = cardRef.current;
    let tx = 0, ty = 0, cx = 0, cy = 0, animId;
    const onMove = e => {
      const r = card.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - .5, my = (e.clientY - r.top) / r.height - .5;
      const inside = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
      if (inside) { tx = my * 5; ty = -mx * 5; } else { tx = 0; ty = 0; }
    };
    window.addEventListener('mousemove', onMove);
    (function loop() { cx += (tx - cx) * .07; cy += (ty - cy) * .07; card.style.transform = `perspective(1400px) rotateX(${cx}deg) rotateY(${cy}deg)`; animId = requestAnimationFrame(loop); })();
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(animId); };
  }, []);

  /* ── 4. CUSTOM CURSOR ── */
  useEffect(() => {
    const dot = dotRef.current, ring = ringRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0, animId;
    const onMove = e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; };
    window.addEventListener('mousemove', onMove);
    (function loop() { rx += (mx - rx) * .13; ry += (my - ry) * .13; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; animId = requestAnimationFrame(loop); })();
    const btns = document.querySelectorAll('button,.det-item');
    const enter = () => { dot.style.width = '18px'; dot.style.height = '18px'; ring.style.width = '46px'; ring.style.height = '46px'; };
    const leave = () => { dot.style.width = '10px'; dot.style.height = '10px'; ring.style.width = '28px'; ring.style.height = '28px'; };
    btns.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(animId); btns.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); }); };
  }, []);

  /* ── 5. SPARKLE TRAIL ── */
  useEffect(() => {
    const onMove = e => {
      if (Math.random() > .55) return;
      const s = document.createElement('div'), sz = Math.random() * 4 + 1.5;
      Object.assign(s.style, { position: 'fixed', left: e.clientX + (Math.random() - .5) * 14 + 'px', top: e.clientY + (Math.random() - .5) * 14 + 'px', width: sz + 'px', height: sz + 'px', borderRadius: '50%', background: `rgba(201,168,76,${.4 + Math.random() * .6})`, pointerEvents: 'none', zIndex: '9990', transform: 'translate(-50%,-50%)', transition: `all ${.5 + Math.random() * .3}s ease` });
      document.body.appendChild(s);
      requestAnimationFrame(() => { s.style.opacity = '0'; s.style.transform = `translate(${(Math.random() - .5) * 28}px,${-18 - Math.random() * 22}px) scale(0)`; });
      setTimeout(() => s.remove(), 800);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* ── 6. MOBILE GYRO TILT ── */
  useEffect(() => {
    if (!('DeviceOrientationEvent' in window)) return;
    const card = cardRef.current;
    const onOrient = e => {
      const tx = Math.max(-5, Math.min(5, (e.beta || 0) / 90 * 4));
      const ty = Math.max(-5, Math.min(5, (e.gamma || 0) / 90 * 4));
      card.style.transform = `perspective(1400px) rotateX(${tx}deg) rotateY(${ty}deg)`;
    };
    window.addEventListener('deviceorientation', onOrient);
    return () => window.removeEventListener('deviceorientation', onOrient);
  }, []);

  /* ── Helpers ── */
  function showToast(msg) {
    const t = document.createElement('div');
    Object.assign(t.style, { position: 'fixed', bottom: '8%', left: '50%', transform: 'translateX(-50%) translateY(20px)', fontFamily: "'Cinzel',serif", fontSize: 'clamp(9px,.9vw,11px)', letterSpacing: '.25em', color: 'var(--gold)', background: 'rgba(4,9,15,.95)', border: '1px solid rgba(201,168,76,.4)', padding: '10px 28px', zIndex: '9995', opacity: '0', transition: 'all .5s ease', whiteSpace: 'nowrap' });
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; }, 50);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(10px)'; }, 2800);
    setTimeout(() => t.remove(), 3400);
  }

  function fireConfetti() {
    const cx = innerWidth / 2, cy = innerHeight / 2;
    const cols = ['#C9A84C', '#FFE898', '#F0C040', '#FFF5CC', '#E8B84B'];
    for (let i = 0; i < 28; i++) {
      const cf = document.createElement('div'), ang = Math.random() * 6.28, dist = Math.random() * 90 + 45, s2 = Math.random() * 7 + 3, rect = Math.random() > .5;
      Object.assign(cf.style, { position: 'fixed', left: cx + 'px', top: cy + 'px', width: s2 + 'px', height: (rect ? s2 * .4 : s2) + 'px', background: cols[Math.floor(Math.random() * 5)], borderRadius: rect ? '0' : '50%', pointerEvents: 'none', zIndex: '9999', transform: 'translate(-50%,-50%)', transition: `all ${.55 + Math.random() * .45}s cubic-bezier(.25,.46,.45,.94)` });
      document.body.appendChild(cf);
      requestAnimationFrame(() => { cf.style.transform = `translate(calc(${Math.cos(ang) * dist}px - 50%),calc(${Math.sin(ang) * dist}px - 50%)) scale(0) rotate(${Math.random() * 360}deg)`; cf.style.opacity = '0'; });
      setTimeout(() => cf.remove(), 1100);
    }
  }

  function handleRsvpClick(e) {
    e.preventDefault();
    const btn = e.currentTarget;
    const r = btn.getBoundingClientRect(), rpl = document.createElement('span');
    rpl.className = 'ripple'; const sz = Math.max(r.width, r.height) * 2.5;
    Object.assign(rpl.style, { width: sz + 'px', height: sz + 'px', left: (e.clientX - r.left - sz / 2) + 'px', top: (e.clientY - r.top - sz / 2) + 'px' });
    btn.appendChild(rpl); setTimeout(() => rpl.remove(), 700);
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('Please enter your name'); return; }
    if (!batchFrom || !batchTo) { setError('Please select batch years'); return; }
    if (parseInt(batchTo) < parseInt(batchFrom)) { setError('Batch To must be after Batch From'); return; }
    setSubmitting(true);
    try {
      const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.trim(), batchFrom, batchTo }) });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false); setName(''); setBatchFrom(''); setBatchTo('');
        showToast('Registration successful ✦');
        fireConfetti();
      } else { setError(data.message || 'Something went wrong. Please try again.'); }
    } catch { setError('Network error. Please try again.'); }
    setSubmitting(false);
  }

  return (
    <>
      <canvas id="bg-canvas" ref={canvasRef}></canvas>
      <div id="csr" ref={dotRef}></div>
      <div id="csr-ring" ref={ringRef}></div>

      {/* ── INTRO: ENVELOPE ── */}
      <div id="intro">
        <div className="env-wrap">
          <div className="env-body">
            <div className="fold-l"></div>
            <div className="fold-r"></div>
            <div className="env-card" id="env-card">
              <div className="env-card-inner">
                <div className="ecm-stars">✦ ✦ ✦</div>
                <div className="ecm-word">FAREWELL</div>
              </div>
            </div>
          </div>
          <div className="env-flap" id="env-flap">
            <div className="wax-seal" id="wax-seal">
              <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="#FFE898" fontFamily="Cinzel,serif" fontSize="13" fontWeight="700">CS</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN INVITATION CARD ── */}
      <div id="invite-scene">
        <div className="invite-card" id="invite-card" ref={cardRef}>
          {/* Ambient glow */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse 72% 38% at 50% 22%,rgba(201,168,76,.07),transparent 60%),radial-gradient(ellipse 50% 30% at 50% 88%,rgba(22,40,85,.5),transparent 55%)' }}></div>
          <div className="card-light"></div>
          <div className="frame-a"></div>
          <div className="frame-b"></div>

          {/* Corner ornaments */}
          <div className="co co-tl"><CornerSVG hasInnerCurve /></div>
          <div className="co co-tr"><CornerSVG /></div>
          <div className="co co-bl"><CornerSVG /></div>
          <div className="co co-br"><CornerSVG /></div>

          {/* Gold dust */}
          {particles.map((p, i) => (
            <div key={i} className="cp" style={{ width: p.w + 'px', height: p.w + 'px', left: p.l, right: p.r, top: p.t, bottom: p.b, '--d': p.d, '--dl': p.dl, '--tx': p.tx, '--ty': p.ty }}></div>
          ))}

          {/* ── CONTENT ── */}
          <div className="ccard">
            <div className="rv" id="r1" style={{ textAlign: 'center' }}>
              <div className="t-college">Presidency College (Autonomous), Chennai</div>
              <div className="t-dept" style={{ marginTop: 3 }}>Department of Computer Science</div>
            </div>

            <div className="div-gold rv" id="r2" style={{ margin: '0 auto' }}>
              <div className="dl"></div><div className="ds"></div><div className="ds" style={{ width: 3, height: 3 }}></div><div className="ds"></div><div className="dl"></div>
            </div>

            <div className="rv" id="r3"><p className="t-invite">cordially invites the Alumni of the Department</p></div>

            <div className="rv" id="r4"><h1 className="t-farewell">FAREWELL</h1></div>

            <div className="div-ornate rv" id="r5" style={{ margin: '0 auto' }}>
              <div className="dc"></div><div className="dl"></div><div className="ds"></div><div className="dc"></div><div className="ds"></div><div className="dl"></div><div className="dc"></div>
            </div>

            <div className="hod-group rv" id="r6">
              <p className="t-honour">in honour of our beloved</p>
              <p className="t-hodtitle">Head of the Department</p>
              <div className="stars-anim" style={{ marginTop: 2 }}>✦ ✦ ✦</div>
              <p className="t-hodname" style={{ marginTop: 2 }}>Dr.&nbsp;S. MARY VENNILA</p>
            </div>

            <div className="div-sm rv" id="r7" style={{ margin: '0 auto' }}>
              <div className="dl"></div><div className="ds"></div><div className="dl"></div>
            </div>

            <div className="alumni-group rv" id="r8">
              <p className="t-hostedby">Presented by</p>
              <p className="t-alumni">Department of Computer Science</p>
            </div>

            <div className="details-box rv" id="r9">
              <div className="det-item"><span className="det-label">Date</span><span className="det-val">April <br />4 / 2026</span></div>
              <div className="det-sep"></div>
              <div className="det-item"><span className="det-label">Venue</span><span className="det-val" style={{ fontSize: 'clamp(10.5px,1.15vw,14px)' }}>MCA<br />Seminar Hall</span></div>
              <div className="det-sep"></div>
              <div className="det-item"><span className="det-label">Time</span><span className="det-val">10:00<br />AM</span></div>
            </div>

            <div className="rv" id="r10">
              <button className="rsvp" id="rsvp-btn" onClick={handleRsvpClick}>✦ &nbsp;Click to Register Your Presence&nbsp; ✦</button>
            </div>

            <div className="rv t-bottom" id="r11">
              Formal Attire Requested &nbsp;·&nbsp; Kindly grace us with your cherished presence
            </div>
          </div>
        </div>
      </div>

      {/* ── REGISTRATION MODAL ── */}
      <div className={`modal-overlay ${modalOpen ? 'active' : ''}`} onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
        <div className="modal-card">
          <button className="modal-close" onClick={() => setModalOpen(false)}>&times;</button>
          <h2 className="modal-title">Register Your Presence</h2>
          <div className="modal-divider"><div className="dl"></div><div className="ds"></div><div className="dl"></div></div>
          <form className="modal-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="modal-field">
              <label className="modal-label" htmlFor="reg-name">Full Name</label>
              <input type="text" className="modal-input" id="reg-name" placeholder="Enter your full name" required value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="modal-batch-row">
              <div className="modal-field">
                <label className="modal-label" htmlFor="reg-batch-from">Batch From</label>
                <select className="modal-select" id="reg-batch-from" required value={batchFrom} onChange={e => setBatchFrom(e.target.value)}>
                  <option value="" disabled>Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="modal-field">
                <label className="modal-label" htmlFor="reg-batch-to">Batch To</label>
                <select className="modal-select" id="reg-batch-to" required value={batchTo} onChange={e => setBatchTo(e.target.value)}>
                  <option value="" disabled>Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
            <div className="modal-error">{error}</div>
            <button type="submit" className="modal-submit" disabled={submitting}>
              {submitting ? 'Registering…' : '✦  Confirm Registration  ✦'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

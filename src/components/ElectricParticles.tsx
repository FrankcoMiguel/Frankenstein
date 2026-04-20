import { useEffect, useRef, useState, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
// Particle: tiny plasma orbs that arc electricity between them
// Electrode: fixed tesla-coil tips anchored to canvas edges
// Arc: jagged lightning bolt between two points

// ─── Constants ────────────────────────────────────────────────────────────────
const TOXIC_GREEN  = '#39FF14';
const OZONE_BLUE   = '#00CFFF';
const DEEP_RUST    = '#8B2500';
const RUST_GLOW    = '#C84B00';
const PLASMA_WHITE = '#E8FFE8';

// ─── Canvas Particle Engine ───────────────────────────────────────────────────
export const ElectricParticles = () => {
  const canvasRef     = useRef(null);
  const particlesRef  = useRef([]);
  const electrodesRef = useRef([]);
  const mouseRef      = useRef({ x: -9999, y: -9999 });
  const animIdRef     = useRef();
  const frameRef      = useRef(0);

  // Meter state lifted via a shared ref so canvas can poke it without re-rendering
  const meterDataRef  = useRef({ density: 0, voltage: 0, flux: 0 });
  const [meters, setMeters]   = useState({ density: 0, voltage: 0, flux: 0 });
  const [headerGlitch, setHeaderGlitch] = useState(false);
  const [scanOffset, setScanOffset] = useState(0);

  // ── Jagged arc generator ─────────────────────────────────────────────────
  const buildArcPoints = useCallback((x1, y1, x2, y2, segments = 10, jitter = 18) => {
    const pts = [{ x: x1, y: y1 }];
    for (let i = 1; i < segments; i++) {
      const t  = i / segments;
      const bx = x1 + (x2 - x1) * t;
      const by = y1 + (y2 - y1) * t;
      const perp = { x: -(y2 - y1), y: x2 - x1 };
      const len  = Math.sqrt(perp.x ** 2 + perp.y ** 2) || 1;
      const n    = (Math.random() - 0.5) * 2 * jitter;
      pts.push({ x: bx + (perp.x / len) * n, y: by + (perp.y / len) * n });
    }
    pts.push({ x: x2, y: y2 });
    return pts;
  }, []);

  const drawArc = useCallback((ctx, pts, alpha, color, width = 1) => {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.strokeStyle = color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
    ctx.lineWidth   = width;
    ctx.shadowBlur  = 12;
    ctx.shadowColor = color;
    ctx.stroke();
    ctx.shadowBlur  = 0;
  }, []);

  // ── rgba helper ─────────────────────────────────────────────────────────────
  const hexAlpha = (hex, a) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // Rebuild electrodes on resize
      electrodesRef.current = [
        { x: canvas.width  * 0.1,  y: canvas.height * 0.15 },
        { x: canvas.width  * 0.9,  y: canvas.height * 0.15 },
        { x: canvas.width  * 0.05, y: canvas.height * 0.85 },
        { x: canvas.width  * 0.95, y: canvas.height * 0.85 },
        { x: canvas.width  * 0.5,  y: canvas.height * 0.05 },
        { x: canvas.width  * 0.25, y: canvas.height * 0.95 },
        { x: canvas.width  * 0.75, y: canvas.height * 0.95 },
      ];
    };
    resize();

    // ── Particle factory ───────────────────────────────────────────────────
    const spawnParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.2 + 0.3;
      return {
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        vx:      Math.cos(angle) * speed,
        vy:      Math.sin(angle) * speed,
        life:    1,
        maxLife: Math.random() * 3 + 1.5,
        radius:  Math.random() * 2.5 + 0.8,
        color:   Math.random() < 0.6 ? TOXIC_GREEN : OZONE_BLUE,
        charge:  Math.random() * 0.3 + 0.7,   // how strongly it draws arcs
      };
    };

    // ── Main loop ─────────────────────────────────────────────────────────
    let lastTime = 0;
    const TARGET_FPS = 50;
    const FRAME_MS   = 1000 / TARGET_FPS;

    const animate = (timestamp) => {
      animIdRef.current = requestAnimationFrame(animate);

      const delta = timestamp - lastTime;
      if (delta < FRAME_MS) return;
      lastTime = timestamp - (delta % FRAME_MS);

      frameRef.current++;
      const frame = frameRef.current;

      const W = canvas.width;
      const H = canvas.height;

      // Ghost fade
      ctx.fillStyle = 'rgba(3,6,3,0.18)';
      ctx.fillRect(0, 0, W, H);

      const particles  = particlesRef.current;
      const electrodes = electrodesRef.current;
      const mouse      = mouseRef.current;

      // ── Update particles ──────────────────────────────────────────────
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Mouse gravity pull
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 280) {
          const force = (280 - dist) / 280 * 0.04;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Mild damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1 / (60 * p.maxLife);

        // Wrap edges
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        if (p.life <= 0) { particles.splice(i, 1); continue; }

        // Draw plasma orb
        const alpha = p.life * 0.9;
        ctx.shadowBlur  = 14;
        ctx.shadowColor = p.color;
        ctx.fillStyle   = hexAlpha(p.color, alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ── Spawn particles ───────────────────────────────────────────────
      if (particles.length < 60 && Math.random() < 0.4) {
        particles.push(spawnParticle());
      }

      // ── Jacob's Ladder arcs: electrode → electrode ────────────────────
      if (frame % 2 === 0) {
        const numArcs = 2 + Math.floor(Math.random() * 3);
        for (let a = 0; a < numArcs; a++) {
          const e1 = electrodes[Math.floor(Math.random() * electrodes.length)];
          const e2 = electrodes[Math.floor(Math.random() * electrodes.length)];
          if (e1 === e2) continue;
          const segs   = 8 + Math.floor(Math.random() * 8);
          const jitter = 20 + Math.random() * 30;
          const pts    = buildArcPoints(e1.x, e1.y, e2.x, e2.y, segs, jitter);
          const alpha  = 0.15 + Math.random() * 0.55;
          const color  = Math.random() < 0.65 ? TOXIC_GREEN : OZONE_BLUE;

          // Fat outer glow
          drawArc(ctx, pts, alpha * 0.3, color, 4 + Math.random() * 3);
          // Core bright bolt
          drawArc(ctx, pts, alpha,       color, 0.8 + Math.random() * 1);
          // Highlight
          drawArc(ctx, pts, alpha * 0.6, PLASMA_WHITE, 0.4);
        }
      }

      // ── Particle-to-particle arcs ─────────────────────────────────────
      if (frame % 3 === 0 && particles.length > 8) {
        const pickN = Math.min(particles.length, 22);
        for (let i = 0; i < 4; i++) {
          const p1 = particles[Math.floor(Math.random() * pickN)];
          const p2 = particles[Math.floor(Math.random() * pickN)];
          if (!p1 || !p2 || p1 === p2) continue;
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist > 240 || dist < 30) continue;
          const proximity = 1 - dist / 240;
          const pts   = buildArcPoints(p1.x, p1.y, p2.x, p2.y, 6, 14);
          const alpha = proximity * 0.7 * Math.random();
          drawArc(ctx, pts, alpha,       TOXIC_GREEN, 1.2);
          drawArc(ctx, pts, alpha * 0.4, PLASMA_WHITE, 0.5);
        }
      }

      // ── Mouse-grounded arcs ───────────────────────────────────────────
      if (mouse.x > 0 && mouse.x < W && frame % 2 === 0) {
        // Closest electrode arcs toward mouse
        let nearest = electrodes[0];
        let nearDist = Infinity;
        for (const e of electrodes) {
          const d = Math.hypot(e.x - mouse.x, e.y - mouse.y);
          if (d < nearDist) { nearDist = d; nearest = e; }
        }
        if (nearDist < Math.max(W, H) * 0.75) {
          const pts   = buildArcPoints(nearest.x, nearest.y, mouse.x, mouse.y, 12, 25);
          const alpha = 0.4 + Math.random() * 0.5;
          drawArc(ctx, pts, alpha * 0.25, OZONE_BLUE, 5);
          drawArc(ctx, pts, alpha,        OZONE_BLUE, 1.2);
          drawArc(ctx, pts, alpha * 0.5,  PLASMA_WHITE, 0.5);
        }

        // Nearby particles also arc to mouse
        for (const p of particles) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < 120 && Math.random() < 0.4) {
            const pts   = buildArcPoints(p.x, p.y, mouse.x, mouse.y, 5, 10);
            const alpha = (1 - d / 120) * 0.8 * Math.random();
            drawArc(ctx, pts, alpha,       p.color, 1);
            drawArc(ctx, pts, alpha * 0.3, PLASMA_WHITE, 0.4);
          }
        }
      }

      // ── Electrode halos ───────────────────────────────────────────────
      if (frame % 4 === 0) {
        for (const e of electrodes) {
          const pulse = 0.3 + Math.random() * 0.6;
          ctx.beginPath();
          ctx.arc(e.x, e.y, 5 + Math.random() * 4, 0, Math.PI * 2);
          ctx.fillStyle   = hexAlpha(TOXIC_GREEN, pulse);
          ctx.shadowBlur  = 20;
          ctx.shadowColor = TOXIC_GREEN;
          ctx.fill();
          ctx.shadowBlur  = 0;

          // Outer ring flicker
          ctx.beginPath();
          ctx.arc(e.x, e.y, 10 + Math.random() * 8, 0, Math.PI * 2);
          ctx.strokeStyle = hexAlpha(OZONE_BLUE, pulse * 0.5);
          ctx.lineWidth   = 1;
          ctx.stroke();
        }
      }

      // ── Vignette ─────────────────────────────────────────────────────
      const vgr = ctx.createRadialGradient(W/2,H/2, H*0.35, W/2,H/2, H*0.85);
      vgr.addColorStop(0,   'rgba(0,0,0,0)');
      vgr.addColorStop(1,   'rgba(0,0,0,0.72)');
      ctx.fillStyle = vgr;
      ctx.fillRect(0, 0, W, H);

      // ── Meter data ────────────────────────────────────────────────────
      if (frame % 8 === 0) {
        const density = Math.min(1, particles.length / 60);
        const voltage = 0.3 + Math.random() * 0.7;
        const flux    = 0.4 + Math.sin(frame * 0.03) * 0.3 + Math.random() * 0.3;
        meterDataRef.current = { density, voltage, flux };
        setMeters({ density, voltage, flux: Math.min(1, flux) });
      }
    };

    animIdRef.current = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [buildArcPoints, drawArc]);

  // Mouse tracking
  useEffect(() => {
    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = ()  => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Header glitch timer
  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() < 0.25) {
        setHeaderGlitch(true);
        setTimeout(() => setHeaderGlitch(false), 80 + Math.random() * 160);
      }
    }, 600);
    return () => clearInterval(id);
  }, []);

  // Scanline drift
  useEffect(() => {
    const id = setInterval(() => {
      setScanOffset(p => (p + 1) % 4);
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#030A03',
      fontFamily: '"Special Elite", "Courier New", monospace',
      overflow: 'hidden',
      userSelect: 'none',
      cursor: 'crosshair',
    }}>
      {/* ── Canvas ── */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />

      {/* ── Scanlines overlay ── */}
      <div style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none',
        zIndex: 3,
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0,0,0,0.18) 2px,
          rgba(0,0,0,0.18) 4px
        )`,
        backgroundPositionY: `${scanOffset}px`,
      }} />

      {/* ── Film grain ── */}
      <div style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none',
        zIndex: 3,
        opacity: 0.045,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }} />

      {/* ── UI Layer ── */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>

        {/* ── Header ── */}
        <header style={{
          padding: '18px 32px 12px',
          borderBottom: `2px solid ${DEEP_RUST}`,
          boxShadow: `0 2px 24px rgba(139,37,0,0.5), inset 0 -1px 0 ${RUST_GLOW}`,
          background: 'linear-gradient(180deg, rgba(8,16,8,0.95) 0%, rgba(3,6,3,0.85) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backdropFilter: 'blur(4px)',
        }}>
          <div>
            <div style={{
              fontSize: '9px',
              color: RUST_GLOW,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              marginBottom: '2px',
            }}>
              ◈ CLASSIFIED — LEVEL OMEGA ◈
            </div>
            <h1 style={{
              margin: 0,
              fontSize: 'clamp(18px, 3vw, 28px)',
              color: headerGlitch ? OZONE_BLUE : TOXIC_GREEN,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textShadow: headerGlitch
                ? `0 0 8px ${OZONE_BLUE}, 2px 0 rgba(255,0,0,0.6), -2px 0 rgba(0,255,200,0.6)`
                : `0 0 20px ${TOXIC_GREEN}, 0 0 40px rgba(57,255,20,0.3)`,
              transition: 'color 0.04s, text-shadow 0.04s',
              transform: headerGlitch ? 'skewX(-1.5deg) translateX(2px)' : 'none',
            }}>
              Dr. Frankenstein's Forbidden Laboratory
            </h1>
            <div style={{
              fontSize: '10px',
              color: 'rgba(57,255,20,0.5)',
              letterSpacing: '0.3em',
              marginTop: '4px',
            }}>
              HIGH VOLTAGE PLASMA CONTAINMENT — EXPERIMENT #113
            </div>
          </div>

          {/* Status indicators */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {['LIVE', 'ARMED', 'UNSTABLE'].map((label, i) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '10px', letterSpacing: '0.2em',
                color: [TOXIC_GREEN, RUST_GLOW, OZONE_BLUE][i],
              }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: [TOXIC_GREEN, RUST_GLOW, OZONE_BLUE][i],
                  boxShadow: `0 0 8px ${[TOXIC_GREEN, RUST_GLOW, OZONE_BLUE][i]}`,
                  animation: `blink${i} ${[0.8, 1.4, 2.1][i]}s infinite`,
                  display: 'inline-block',
                }} />
                {label}
              </div>
            ))}
          </div>
        </header>

        {/* ── Main content area (fills remaining height) ── */}
        <div style={{ flex: 1, position: 'relative' }} />

        {/* ── Analog Meters row ── */}
        <footer style={{
          padding: '12px 24px 16px',
          borderTop: `2px solid ${DEEP_RUST}`,
          boxShadow: `0 -2px 24px rgba(139,37,0,0.4), inset 0 1px 0 ${RUST_GLOW}`,
          background: 'linear-gradient(0deg, rgba(8,16,8,0.97) 0%, rgba(3,6,3,0.85) 100%)',
          display: 'flex', gap: '20px', alignItems: 'flex-end', justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          flexWrap: 'wrap',
        }}>
          <Meter label="PLASMA DENSITY"  value={meters.density} color={TOXIC_GREEN}  unit="ρ" />
          <Meter label="VOLTAGE SURGE"   value={meters.voltage} color={OZONE_BLUE}   unit="kV" />
          <Meter label="FLUX COHERENCE"  value={meters.flux}    color={RUST_GLOW}    unit="Wb" />

          <div style={{
            marginLeft: 'auto',
            fontSize: '9px',
            color: 'rgba(57,255,20,0.35)',
            letterSpacing: '0.2em',
            textAlign: 'right',
            lineHeight: '1.8',
          }}>
            <div>MOVE CURSOR TO GROUND CIRCUIT</div>
            <div>JACOB'S LADDER ARRAY: ACTIVE</div>
            <div style={{ color: RUST_GLOW }}>⚠ DO NOT TOUCH ELECTRODES ⚠</div>
          </div>
        </footer>
      </div>

      {/* ── Corner rusted brackets ── */}
      {[
        { top: 54, left: 0 },   { top: 54, right: 0 },
        { bottom: 70, left: 0 }, { bottom: 70, right: 0 },
      ].map((pos, i) => (
        <CornerBracket key={i} pos={pos} flip={i % 2 !== 0} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
        @keyframes blink0 { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes blink1 { 0%,100%{opacity:0.7} 40%{opacity:1} 80%{opacity:0.15} }
        @keyframes blink2 { 0%,100%{opacity:0.5} 30%{opacity:1} 70%{opacity:0.3} }
        @keyframes needleSpin {
          0%{transform:rotate(-110deg)} 100%{transform:rotate(-110deg)}
        }
      `}</style>
    </div>
  );
};

// ─── SVG Analog Meter ─────────────────────────────────────────────────────────
const Meter = ({ label, value, color, unit }) => {
  const clampedValue = Math.max(0, Math.min(1, isNaN(value) ? 0 : value));
  // Needle sweeps from -110° to +110° (220° total arc)
  const angle = -110 + clampedValue * 220;

  const W = 130, H = 110;
  const cx = W / 2, cy = 76;
  const r = 46;

  // Arc path helper
  const arcPath = (startDeg, endDeg, radius, inset = 0) => {
    const toRad = d => (d - 90) * Math.PI / 180;
    const x1 = cx + (radius - inset) * Math.cos(toRad(startDeg + 90));
    const y1 = cy + (radius - inset) * Math.sin(toRad(startDeg + 90));
    const x2 = cx + (radius - inset) * Math.cos(toRad(endDeg + 90));
    const y2 = cy + (radius - inset) * Math.sin(toRad(endDeg + 90));
    const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius - inset} ${radius - inset} 0 ${large} 1 ${x2} ${y2}`;
  };

  // Tick marks
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const a = -110 + i * 22;
    const rad = (a - 90) * Math.PI / 180;
    const major = i % 5 === 0;
    const inner = major ? r - 9 : r - 5;
    return {
      x1: cx + r     * Math.cos(rad),
      y1: cy + r     * Math.sin(rad),
      x2: cx + inner * Math.cos(rad),
      y2: cy + inner * Math.sin(rad),
      major,
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
        {/* Outer bezel */}
        <rect x="2" y="2" width={W-4} height={H-4} rx="8"
          fill="rgba(8,20,8,0.9)" stroke={DEEP_RUST} strokeWidth="1.5" />
        <rect x="4" y="4" width={W-8} height={H-8} rx="6"
          fill="none" stroke={RUST_GLOW} strokeWidth="0.4" opacity="0.4" />

        {/* Danger zone arc (red portion) */}
        <path d={arcPath(-110, 0, r)} fill="none"
          stroke="rgba(0,207,255,0.15)" strokeWidth="5" />
        <path d={arcPath(0, 110, r)} fill="none"
          stroke="rgba(139,37,0,0.4)" strokeWidth="5" />

        {/* Active progress arc */}
        <path d={arcPath(-110, -110 + clampedValue * 220, r)} fill="none"
          stroke={color} strokeWidth="3" opacity="0.85"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }} />

        {/* Tick marks */}
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={color} strokeWidth={t.major ? 1.5 : 0.7} opacity={t.major ? 0.9 : 0.4} />
        ))}

        {/* Needle */}
        <g transform={`rotate(${angle}, ${cx}, ${cy})`}
          style={{ transition: 'transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
          <line x1={cx} y1={cy + 8} x2={cx} y2={cy - r + 4}
            stroke={color} strokeWidth="1.5" strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
        </g>

        {/* Pivot dot */}
        <circle cx={cx} cy={cy} r="4" fill={DEEP_RUST} stroke={RUST_GLOW} strokeWidth="1" />
        <circle cx={cx} cy={cy} r="1.5" fill={color}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }} />

        {/* Value readout */}
        <text x={cx} y={cy + 20} textAnchor="middle"
          fontSize="11" fontFamily="'Special Elite', monospace"
          fill={color} opacity="0.9">
          {(clampedValue * 9.9).toFixed(1)}{unit}
        </text>
      </svg>

      {/* Label */}
      <div style={{
        fontSize: '8px', letterSpacing: '0.3em',
        color: 'rgba(57,255,20,0.5)',
        textTransform: 'uppercase',
        marginTop: '-2px',
      }}>
        {label}
      </div>
    </div>
  );
};

// ─── Rusted corner bracket ────────────────────────────────────────────────────
const CornerBracket = ({ pos, flip }) => (
  <div style={{
    position: 'absolute',
    ...pos,
    width: '48px', height: '48px',
    pointerEvents: 'none',
    zIndex: 12,
    transform: flip ? 'scaleX(-1)' : undefined,
  }}>
    <svg width="48" height="48" viewBox="0 0 48 48">
      <path d="M 4 44 L 4 4 L 44 4" fill="none"
        stroke={DEEP_RUST} strokeWidth="2.5" strokeLinecap="square" />
      <path d="M 8 44 L 8 8 L 44 8" fill="none"
        stroke={RUST_GLOW} strokeWidth="0.6" strokeLinecap="square" opacity="0.5" />
      <circle cx="4" cy="4"  r="2.5" fill={RUST_GLOW} />
      <circle cx="4" cy="20" r="1.5" fill={DEEP_RUST} />
      <circle cx="20" cy="4" r="1.5" fill={DEEP_RUST} />
    </svg>
  </div>
);

export default ElectricParticles;
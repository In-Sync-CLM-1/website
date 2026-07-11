/**
 * Per-product hero backdrop scenes.
 * Each scene is a full-bleed decorative SVG layer with industry motifs,
 * tuned to stay behind white hero copy (strokes ~0.10–0.35 opacity,
 * heavier detail kept to the right/edges away from the headline).
 */

function Scene({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ── Field-Sync: routes, map pins, radar ─────────────────── */
export function FieldSyncScene() {
  const pin = 'M0,0 C-13,-20 -21,-31 -21,-45 a21,21 0 1,1 42,0 C21,-31 13,-20 0,0 Z';
  return (
    <Scene>
      {/* dotted travel route */}
      <path
        d="M-40,640 C280,590 400,430 660,480 C900,525 1010,330 1200,270 C1310,235 1400,190 1500,150"
        fill="none" stroke="white" strokeOpacity="0.22" strokeWidth="3"
        strokeDasharray="1 16" strokeLinecap="round"
      />
      {/* map pins along the route */}
      <g transform="translate(340,528)">
        <path d={pin} fill="white" fillOpacity="0.10" stroke="white" strokeOpacity="0.4" strokeWidth="2.5" />
        <circle cy="-45" r="7" fill="white" fillOpacity="0.45" />
      </g>
      <g transform="translate(760,470)">
        <path d={pin} fill="#a7f3d0" fillOpacity="0.16" stroke="#a7f3d0" strokeOpacity="0.65" strokeWidth="2.5" />
        <circle cy="-45" r="7" fill="#a7f3d0" fillOpacity="0.7" />
      </g>
      <g transform="translate(1200,268)">
        <path d={pin} fill="white" fillOpacity="0.10" stroke="white" strokeOpacity="0.4" strokeWidth="2.5" />
        <circle cy="-45" r="7" fill="white" fillOpacity="0.45" />
      </g>
      {/* radar rings, top right */}
      <g transform="translate(1250,120)" stroke="white" fill="none">
        <circle r="42" strokeOpacity="0.16" strokeWidth="1.5" />
        <circle r="84" strokeOpacity="0.11" strokeWidth="1.5" />
        <circle r="126" strokeOpacity="0.07" strokeWidth="1.5" />
        <path d="M0,0 L118,-46 A126,126 0 0,1 126,0 Z" fill="white" fillOpacity="0.07" stroke="none" />
      </g>
      {/* start pulse */}
      <circle cx="60" cy="622" r="8" fill="#a7f3d0" fillOpacity="0.6" />
      <circle cx="60" cy="622" r="18" fill="none" stroke="#a7f3d0" strokeOpacity="0.3" strokeWidth="2" />
    </Scene>
  );
}

/* ── EventSync: spotlights, confetti, ticket ─────────────── */
export function EventSyncScene() {
  const confetti = [
    [180, 110, '#fbbf24', 0], [420, 70, '#f472b6', 30], [650, 130, '#ffffff', 60],
    [890, 80, '#38bdf8', 15], [1120, 60, '#fbbf24', 45], [1330, 130, '#f472b6', 70],
    [260, 240, '#34d399', 20], [1230, 260, '#ffffff', 50], [1390, 380, '#fbbf24', 10],
    [90, 420, '#f472b6', 40], [1300, 560, '#38bdf8', 25], [200, 610, '#ffffff', 65],
  ] as const;
  return (
    <Scene>
      {/* spotlight beams */}
      <polygon points="380,-40 180,760 620,760" fill="white" fillOpacity="0.05" />
      <polygon points="1080,-40 880,760 1320,760" fill="white" fillOpacity="0.04" />
      {/* confetti */}
      {confetti.map(([x, y, c, r], i) =>
        i % 3 === 0 ? (
          <circle key={i} cx={x} cy={y} r="5" fill={c} fillOpacity="0.5" />
        ) : (
          <rect key={i} x={x} y={y} width="11" height="7" rx="1.5" fill={c} fillOpacity="0.45" transform={`rotate(${r} ${x} ${y})`} />
        )
      )}
      {/* ticket stub, bottom right */}
      <g transform="translate(1150,540) rotate(-8)" fill="none" stroke="white">
        <rect x="-100" y="-48" width="200" height="96" rx="14" strokeOpacity="0.32" strokeWidth="2.5" />
        <line x1="30" y1="-48" x2="30" y2="48" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="5 7" />
        <circle cx="30" cy="-48" r="9" fill="#0d9488" stroke="none" fillOpacity="0.9" />
        <circle cx="30" cy="48" r="9" fill="#0d9488" stroke="none" fillOpacity="0.9" />
        <line x1="-72" y1="-14" x2="0" y2="-14" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" />
        <line x1="-72" y1="8" x2="-20" y2="8" strokeOpacity="0.22" strokeWidth="4" strokeLinecap="round" />
        {/* QR corner */}
        <g strokeOpacity="0.32" strokeWidth="2">
          <rect x="52" y="-24" width="12" height="12" /><rect x="70" y="-24" width="12" height="12" />
          <rect x="52" y="-6" width="12" height="12" /><rect x="70" y="12" width="12" height="12" />
        </g>
      </g>
    </Scene>
  );
}

/* ── Email Broadcast: flight paths, paper planes, envelope ─ */
export function EmailScene() {
  const plane = 'M0,0 L34,10 L6,17 L10,10 Z';
  return (
    <Scene>
      <path d="M-40,560 C300,470 520,300 820,260 C1020,235 1150,180 1290,110"
        fill="none" stroke="white" strokeOpacity="0.22" strokeWidth="2.5" strokeDasharray="1 13" strokeLinecap="round" />
      <path d="M120,700 C420,620 700,520 980,430 C1140,378 1260,330 1400,300"
        fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="2.5" strokeDasharray="1 13" strokeLinecap="round" />
      <g transform="translate(1290,96) rotate(-18)"><path d={plane} fill="white" fillOpacity="0.55" /></g>
      <g transform="translate(1398,292) rotate(-14)"><path d={plane} fill="#67e8f9" fillOpacity="0.6" /></g>
      {/* envelope, right */}
      <g transform="translate(1170,500) rotate(6)" fill="none" stroke="white" strokeWidth="2.5">
        <rect x="-85" y="-55" width="170" height="110" rx="10" strokeOpacity="0.32" />
        <path d="M-85,-45 L0,18 L85,-45" strokeOpacity="0.32" />
      </g>
      {/* @ mark */}
      <text x="200" y="220" fontSize="120" fontWeight="700" fill="white" fillOpacity="0.09" fontFamily="ui-sans-serif, system-ui">@</text>
      {/* open-rate sparkline */}
      <polyline points="90,560 170,540 250,555 330,505 410,520 490,470"
        fill="none" stroke="#67e8f9" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="490" cy="470" r="5" fill="#67e8f9" fillOpacity="0.6" />
    </Scene>
  );
}

/* ── ATS: candidate cards, network, sparkles ─────────────── */
export function ATSScene() {
  const card = (
    <>
      <rect x="-88" y="-34" width="176" height="68" rx="14" />
      <circle cx="-56" cy="0" r="16" />
      <line x1="-28" y1="-10" x2="60" y2="-10" strokeWidth="5" strokeLinecap="round" />
      <line x1="-28" y1="10" x2="30" y2="10" strokeWidth="5" strokeLinecap="round" />
    </>
  );
  return (
    <Scene>
      <g fill="none" stroke="white" strokeWidth="2.5">
        <path d="M1040,180 C1090,240 1120,260 1160,300" strokeOpacity="0.18" strokeDasharray="4 8" />
        <path d="M1160,368 C1120,420 1080,440 1040,480" strokeOpacity="0.18" strokeDasharray="4 8" />
        <g transform="translate(1000,150) rotate(4)" strokeOpacity="0.32">{card}</g>
        <g transform="translate(1200,334) rotate(-3)" stroke="#f0abfc" strokeOpacity="0.55">{card}</g>
        <g transform="translate(1000,516) rotate(2)" strokeOpacity="0.28">{card}</g>
      </g>
      {/* selected-candidate check */}
      <g transform="translate(1284,296)">
        <circle r="17" fill="#f0abfc" fillOpacity="0.85" />
        <path d="M-7,0 L-2,5 L8,-6" fill="none" stroke="#581c87" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* sparkles */}
      {[[240, 160, 0.5], [420, 90, 0.35], [180, 480, 0.4], [640, 140, 0.3]].map(([x, y, o], i) => (
        <path key={i} d={`M${x},${Number(y) - 14} L${Number(x) + 4},${Number(y) - 4} L${Number(x) + 14},${y} L${Number(x) + 4},${Number(y) + 4} L${x},${Number(y) + 14} L${Number(x) - 4},${Number(y) + 4} L${Number(x) - 14},${y} L${Number(x) - 4},${Number(y) - 4} Z`}
          fill="white" fillOpacity={o as number} />
      ))}
    </Scene>
  );
}

/* ── Paisaa Saarthi: rupee, rising steps, coins ──────────── */
export function PaisaaScene() {
  return (
    <Scene>
      <text x="1010" y="600" fontSize="460" fontWeight="800" fill="white" fillOpacity="0.08" fontFamily="ui-sans-serif, system-ui">₹</text>
      {/* rising step chart, kept below the headline block */}
      <polyline points="100,690 240,690 240,640 380,640 380,590 520,590 520,540 660,540 660,490 780,490"
        fill="none" stroke="#fde68a" strokeOpacity="0.32" strokeWidth="3" strokeLinejoin="round" />
      <path d="M780,490 L820,472 M820,472 L798,468 M820,472 L816,494" fill="none" stroke="#fde68a" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
      {/* coins on the steps */}
      {[[240, 616], [380, 566], [520, 516], [660, 466]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`} fill="none" stroke="#fcd34d" strokeOpacity="0.55">
          <circle r="16" strokeWidth="2.5" />
          <circle r="10" strokeWidth="1.5" strokeOpacity="0.35" />
        </g>
      ))}
      {/* ledger lines, faint, top left */}
      <g stroke="white" strokeOpacity="0.08" strokeWidth="2">
        <line x1="80" y1="140" x2="420" y2="140" /><line x1="80" y1="180" x2="360" y2="180" /><line x1="80" y1="220" x2="300" y2="220" />
      </g>
    </Scene>
  );
}

/* ── Expense: receipts, approval stamp ───────────────────── */
export function ExpenseScene() {
  const receipt = (w: number, h: number) => {
    const zig = 12;
    let d = `M${-w / 2},${-h / 2} H${w / 2} V${h / 2 - zig}`;
    for (let x = w / 2; x > -w / 2; x -= zig) d += ` L${x - zig / 2},${h / 2} L${x - zig},${h / 2 - zig}`;
    return d + ' Z';
  };
  return (
    <Scene>
      <g transform="translate(1120,240) rotate(-8)" fill="none" stroke="white" strokeOpacity="0.32" strokeWidth="2.5">
        <path d={receipt(160, 230)} />
        <line x1="-52" y1="-72" x2="52" y2="-72" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.3" />
        <line x1="-52" y1="-40" x2="30" y2="-40" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.22" />
        <line x1="-52" y1="-12" x2="40" y2="-12" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.22" />
        <line x1="-52" y1="30" x2="52" y2="30" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.32" />
      </g>
      <g transform="translate(1310,470) rotate(10)" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="2.5">
        <path d={receipt(120, 170)} />
        <line x1="-38" y1="-50" x2="38" y2="-50" strokeWidth="4" strokeLinecap="round" />
        <line x1="-38" y1="-22" x2="20" y2="-22" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.6" />
      </g>
      {/* approval stamp */}
      <g transform="translate(1000,500) rotate(-14)" fill="none" stroke="#fda4af">
        <circle r="58" strokeOpacity="0.6" strokeWidth="3.5" />
        <circle r="44" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M-18,0 L-5,13 L22,-16" strokeOpacity="0.75" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* small floating rupee dots */}
      {[[220, 150], [360, 520], [520, 120]].map(([x, y], i) => (
        <text key={i} x={x} y={y} fontSize="30" fontWeight="700" fill="white" fillOpacity="0.14" fontFamily="ui-sans-serif, system-ui">₹</text>
      ))}
    </Scene>
  );
}

/* ── WhatsApp: chat bubbles, double ticks ────────────────── */
export function WhatsAppScene() {
  return (
    <Scene>
      {/* incoming bubble */}
      <g transform="translate(1300,140)" fill="none" stroke="white" strokeOpacity="0.32" strokeWidth="2.5">
        <path d="M-100,-40 h200 a16,16 0 0 1 16,16 v48 a16,16 0 0 1 -16,16 h-176 l-32,26 8,-26 a16,16 0 0 1 -16,-16 v-48 a16,16 0 0 1 16,-16 Z" transform="translate(0,-2)" />
        <line x1="-76" y1="-8" x2="72" y2="-8" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.28" />
        <line x1="-76" y1="14" x2="20" y2="14" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.2" />
      </g>
      {/* outgoing bubble with WA-blue ticks */}
      <g transform="translate(1230,360)">
        <path d="M-84,-32 h168 a14,14 0 0 1 14,14 v40 a14,14 0 0 1 -14,14 h-140 a14,14 0 0 1 -14,-14 v-40 a14,14 0 0 1 14,-14 Z"
          fill="white" fillOpacity="0.09" stroke="white" strokeOpacity="0.25" strokeWidth="2" />
        <line x1="-62" y1="-6" x2="48" y2="-6" stroke="white" strokeOpacity="0.25" strokeWidth="5" strokeLinecap="round" />
        <g stroke="#53bdeb" strokeOpacity="0.9" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M42,16 l6,6 11,-12" />
          <path d="M56,16 l6,6 11,-12" />
        </g>
      </g>
      {/* small third bubble */}
      <g transform="translate(1040,500)">
        <path d="M-56,-24 h112 a12,12 0 0 1 12,12 v24 a12,12 0 0 1 -12,12 h-96 l-22,18 6,-18 a12,12 0 0 1 -12,-12 v-24 a12,12 0 0 1 12,-12 Z"
          fill="none" stroke="white" strokeOpacity="0.22" strokeWidth="2.5" />
        <line x1="-36" y1="0" x2="40" y2="0" stroke="white" strokeOpacity="0.2" strokeWidth="4" strokeLinecap="round" />
      </g>
      {/* broadcast ripples, left */}
      <g transform="translate(140,540)" fill="none" stroke="#86efac">
        <circle r="26" strokeOpacity="0.4" strokeWidth="2.5" />
        <circle r="52" strokeOpacity="0.22" strokeWidth="2" />
        <circle r="80" strokeOpacity="0.12" strokeWidth="2" />
      </g>
    </Scene>
  );
}

/* ── Work-Sync: kanban columns, moving card ──────────────── */
export function WorkSyncScene() {
  const col = (cards: number[]) => (
    <>
      <rect x="-62" y="-130" width="124" height="260" rx="14" />
      {cards.map((y, i) => (
        <rect key={i} x="-46" y={y} width="92" height="42" rx="8" fill="white" fillOpacity="0.08" stroke="none" />
      ))}
    </>
  );
  return (
    <Scene>
      <g fill="none" stroke="white" strokeWidth="2.5">
        <g transform="translate(1000,300)" strokeOpacity="0.26">{col([-108, -52, 8])}</g>
        <g transform="translate(1160,330)" strokeOpacity="0.3">{col([-108, -48])}</g>
        <g transform="translate(1320,290)" strokeOpacity="0.22">{col([-108])}</g>
      </g>
      {/* highlighted done card with check */}
      <g transform="translate(1320,242)">
        <rect x="-46" y="-21" width="92" height="42" rx="8" fill="#c4b5fd" fillOpacity="0.2" stroke="#c4b5fd" strokeOpacity="0.7" strokeWidth="2.5" />
        <path d="M-24,0 L-14,10 L6,-12" fill="none" stroke="#c4b5fd" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* card movement arrow */}
      <path d="M1046,192 C1090,150 1130,150 1168,180" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="2.5" strokeDasharray="5 8" />
      <path d="M1168,180 L1150,168 M1168,180 L1158,194" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" />
      {/* checkbox ticks, left */}
      {[[160, 160], [230, 500], [420, 100]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`} fill="none" stroke="white" strokeOpacity="0.22" strokeWidth="3">
          <rect x="-14" y="-14" width="28" height="28" rx="7" />
          <path d="M-6,0 L-1,5 L8,-6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </Scene>
  );
}

/* ── In-Sync CRM: funnel, growth curve, deal dots ────────── */
export function CRMScene() {
  return (
    <Scene>
      {/* funnel */}
      <g fill="none" stroke="white" transform="translate(1150,120)">
        <path d="M-130,0 H130 L86,74 H-86 Z" strokeOpacity="0.3" strokeWidth="2.5" />
        <path d="M-80,90 H80 L52,164 H-52 Z" strokeOpacity="0.24" strokeWidth="2.5" />
        <path d="M-46,180 H46 L26,254 H-26 Z" stroke="#2dd4bf" strokeOpacity="0.6" strokeWidth="2.5" />
        <circle cx="0" cy="292" r="9" fill="#2dd4bf" fillOpacity="0.8" stroke="none" />
      </g>
      {/* growth polyline */}
      <polyline points="880,600 990,560 1080,585 1190,505 1290,530 1400,420"
        fill="none" stroke="#2dd4bf" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {[[990, 560], [1190, 505], [1400, 420]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5.5" fill="#2dd4bf" fillOpacity="0.75" />
      ))}
      {/* fine grid, echoes the app hero */}
      <g stroke="white" strokeOpacity="0.05">
        {[180, 340, 500, 660].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="720" />)}
        {[180, 340, 500].map((y) => <line key={y} x1="0" y1={y} x2="820" y2={y} />)}
      </g>
      {/* node dots */}
      <circle cx="340" cy="180" r="4" fill="#2dd4bf" fillOpacity="0.5" />
      <circle cx="500" cy="340" r="4" fill="#a78bfa" fillOpacity="0.45" />
      <circle cx="180" cy="500" r="4" fill="white" fillOpacity="0.3" />
    </Scene>
  );
}

/* ── Vendor Verification: shield, fingerprint, scan ──────── */
export function VendorScene() {
  return (
    <Scene>
      {/* shield with check */}
      <g transform="translate(1170,330)" fill="none">
        <path d="M0,-180 L138,-128 V18 C138,112 74,166 0,198 C-74,166 -138,112 -138,18 V-128 Z"
          stroke="white" strokeOpacity="0.32" strokeWidth="3" fill="white" fillOpacity="0.04" />
        <path d="M0,-140 L104,-100 V14 C104,88 56,132 0,158 C-56,132 -104,88 -104,14 V-100 Z"
          stroke="white" strokeOpacity="0.12" strokeWidth="2" />
        <path d="M-52,0 L-16,38 L62,-52" stroke="#fdba74" strokeOpacity="0.8" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* scan line sweeping the shield */}
      <line x1="990" y1="260" x2="1350" y2="260" stroke="#7dd3fc" strokeOpacity="0.35" strokeWidth="2.5" strokeDasharray="14 10" />
      {/* fingerprint arcs, top left */}
      <g transform="translate(210,170)" fill="none" stroke="white" strokeLinecap="round">
        <path d="M-70,40 A85,85 0 0 1 70,40" strokeOpacity="0.14" strokeWidth="2.5" />
        <path d="M-52,44 A62,62 0 0 1 52,44" strokeOpacity="0.12" strokeWidth="2.5" />
        <path d="M-34,48 A40,40 0 0 1 34,48" strokeOpacity="0.1" strokeWidth="2.5" />
        <path d="M-16,50 A18,18 0 0 1 16,50" strokeOpacity="0.09" strokeWidth="2.5" />
      </g>
      {/* verified document, bottom left */}
      <g transform="translate(300,540) rotate(-6)" fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="2.5">
        <rect x="-55" y="-70" width="110" height="140" rx="10" />
        <line x1="-32" y1="-38" x2="32" y2="-38" strokeWidth="4" strokeLinecap="round" />
        <line x1="-32" y1="-12" x2="20" y2="-12" strokeWidth="4" strokeLinecap="round" />
        <circle cx="22" cy="38" r="20" stroke="#7dd3fc" strokeOpacity="0.5" />
        <path d="M12,38 L19,45 L33,29" stroke="#7dd3fc" strokeOpacity="0.7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Scene>
  );
}

/* ── EventSync alt export name kept obvious per product ──── */
export const heroScenes = {
  FieldSync: FieldSyncScene,
  EventSync: EventSyncScene,
  Email: EmailScene,
  ATS: ATSScene,
  Paisaa: PaisaaScene,
  Expense: ExpenseScene,
  WhatsApp: WhatsAppScene,
  WorkSync: WorkSyncScene,
  CRM: CRMScene,
  Vendor: VendorScene,
};

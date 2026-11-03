// Custom dental line icons, drawn to match Lucide's 24px / 1.75 stroke style.

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

// Shared tooth crown outline (top part of a molar)
const CROWN = "M12 4.6C10.4 3.3 8.3 2.9 6.5 3.8 4.2 4.9 3.4 7.8 4.2 10.6c.5 1.8 1.1 3.4 1.6 5.6.4 2.3.8 4.3 2.2 4.3 1.6 0 1.6-2.6 2.1-4.6.3-1.1 1-1.7 1.9-1.7s1.6.6 1.9 1.7c.5 2 .5 4.6 2.1 4.6 1.4 0 1.8-2 2.2-4.3.5-2.2 1.1-3.8 1.6-5.6.8-2.8 0-5.7-2.3-6.8-1.8-.9-3.9-.5-5.5.8z";

export function ToothIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d={CROWN} />
    </svg>
  );
}

export function ImplantIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.2c-1.3-.9-3-1.1-4.4-.4C5.8 3.7 5.3 5.9 5.9 8c.2.8.5 1.6.7 2.5h10.8c.2-.9.5-1.7.7-2.5.6-2.1.1-4.3-1.7-5.2-1.4-.7-3.1-.5-4.4.4z" />
      <path d="M9 13.5h6M9.5 16h5M10 18.5h4M11 21h2" />
      <path d="M8.5 10.5 9 13.5M15.5 10.5 15 13.5" />
    </svg>
  );
}

export function RootCanalIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d={CROWN} />
      <path d="M10 8.2c.6.6 1.3.9 2 .9s1.4-.3 2-.9" />
      <path d="M12 9.1v4.4" strokeDasharray="1.2 1.6" />
    </svg>
  );
}

export function BracesIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 9.5c2.6 1.4 5.6 2.1 9 2.1s6.4-.7 9-2.1" />
      <rect x="4.6" y="8.2" width="3" height="3.2" rx=".8" />
      <rect x="10.5" y="9.6" width="3" height="3.2" rx=".8" />
      <rect x="16.4" y="8.2" width="3" height="3.2" rx=".8" />
      <path d="M4 14.5c2.4 1.5 5 2.3 8 2.3s5.6-.8 8-2.3" opacity=".55" />
    </svg>
  );
}

export function CrownBridgeIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m5 9 2.5-4 2.5 3 2-3.5 2 3.5 2.5-3L19 9" />
      <path d="M5 9h14v2.5a7 7 0 0 1-14 0z" />
      <path d="M9 18.5v2M15 18.5v2" />
    </svg>
  );
}

export function WisdomToothIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d={CROWN} />
      <path d="M17.5 2.5 21 6M21 2.5 17.5 6" opacity=".7" />
    </svg>
  );
}

type OrnamentProps = { className?: string };

const fade = {
  maskImage: "linear-gradient(90deg, transparent, #000 16%, #000 84%, transparent)",
  WebkitMaskImage:
    "linear-gradient(90deg, transparent, #000 16%, #000 84%, transparent)",
};

/** A rule broken by a single burning diamond. */
export function Divider({ className = "" }: OrnamentProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      fill="none"
      className={className}
      style={fade}
    >
      <path d="M0 12h556" stroke="#b08a52" strokeOpacity="0.3" />
      <path d="M644 12h556" stroke="#b08a52" strokeOpacity="0.3" />
      <path
        d="M600 2l26 10-26 10-26-10 26-10z"
        stroke="#b08a52"
        strokeOpacity="0.7"
      />
      <path
        d="M600 8.5l10 3.5-10 3.5-10-3.5 10-3.5z"
        fill="#ffa14f"
        fillOpacity="0.75"
      />
      <path d="M558 12h-18M642 12h18" stroke="#b08a52" strokeOpacity="0.28" />
    </svg>
  );
}

/** The corner brackets that frame a menu. */
export function Corner({ className = "" }: OrnamentProps) {
  return (
    <svg aria-hidden viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M2 46V14C2 7.4 7.4 2 14 2h32" stroke="#b08a52" strokeOpacity="0.45" />
      <path d="M8 46V16c0-4.4 3.6-8 8-8h30" stroke="#7a5c30" strokeOpacity="0.35" />
      <path
        d="M2 14c0-6.6 5.4-12 12-12"
        stroke="#d8b98a"
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** The mark, large: a broken ring around a hole. No flame — the hole is the point. */
export function Seal({ className = "" }: OrnamentProps) {
  return (
    <svg aria-hidden viewBox="0 0 72 72" fill="none" className={className}>
      <circle
        cx="36"
        cy="36"
        r="27"
        pathLength={100}
        strokeDasharray="41 5 13 5"
        stroke="#8e9aa1"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
        transform="rotate(-34 36 36)"
      />
      <circle
        cx="36"
        cy="36"
        r="20"
        pathLength={100}
        strokeDasharray="2 6"
        stroke="#5b666c"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <circle
        cx="36"
        cy="36"
        r="2.6"
        fill="#05060a"
        stroke="#66717b"
        strokeOpacity="0.7"
      />
      {[-42, 106, 214].map((deg) => (
        <path
          key={deg}
          d="M36 7v4"
          stroke="#66717b"
          strokeOpacity="0.45"
          strokeWidth="1.2"
          strokeLinecap="round"
          transform={`rotate(${deg} 36 36)`}
        />
      ))}
    </svg>
  );
}

/** The mark, small: the same broken ring, legible at twelve pixels. */
export function SignMark({ className = "" }: OrnamentProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className={className}>
      <circle
        cx="12"
        cy="12"
        r="8"
        pathLength={100}
        strokeDasharray="34 6 12 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        transform="rotate(-38 12 12)"
      />
      <path
        d="M12 2.6v2.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

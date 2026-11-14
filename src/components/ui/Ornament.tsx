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

/** A flame inside a ring — the footer's mark. */
export function Seal({ className = "" }: OrnamentProps) {
  return (
    <svg aria-hidden viewBox="0 0 72 72" fill="none" className={className}>
      <circle cx="36" cy="36" r="27" stroke="#b08a52" strokeOpacity="0.5" />
      <circle
        cx="36"
        cy="36"
        r="22"
        stroke="#7a5c30"
        strokeOpacity="0.4"
        strokeDasharray="1 5"
      />
      <path
        d="M36 20c5 7 8 10 8 15a8 8 0 0 1-16 0c0-2 1-4 3-6 0 2 1 3 2 3 0-4 1-7 3-12z"
        stroke="#ffa14f"
        strokeOpacity="0.85"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="36" cy="55" r="1.6" fill="#ff7a2b" fillOpacity="0.7" />
    </svg>
  );
}

/** The small flame glyph used as a bullet and as a section mark. */
export function FlameMark({ className = "" }: OrnamentProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3c3.2 4.4 5 6.8 5 9.8a5 5 0 0 1-10 0c0-1.4.6-2.6 1.8-3.8 0 1.4.6 2.3 1.4 2.5C10.4 8.9 11 6.4 12 3z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path
        d="M12 8.6c1.5 2 2.2 3.2 2.2 4.5a2.2 2.2 0 0 1-4.4 0c0-1 .5-1.9 1.2-2.7 0 .8.3 1.3.7 1.4.1-1.1.2-2 .3-3.2z"
        fill="#ffe4b8"
        fillOpacity="0.55"
      />
    </svg>
  );
}

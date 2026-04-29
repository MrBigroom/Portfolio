const marqueeItems = [
  "Full-stack",
  "✦",
  "Machine Learning",
  "✦",
  "Computer Vision",
  "✦",
  "LLM Integration",
  "✦",
  "React Native",
  "✦",
  "Flutter",
  "✦",
  "Python",
  "✦",
  "Available 2026",
  "✦",
];

export default function Marquee() {
  // Duplicate for seamless loop
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative py-6 md:py-8 border-y border-bone-50/10 overflow-hidden bg-ink-900">
      <div className="flex marquee-track whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className={`display text-3xl md:text-5xl px-6 ${
              item === "✦" ? "text-lime" : "text-bone-50/80"
            } ${i % 4 === 0 ? "display-italic" : ""}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

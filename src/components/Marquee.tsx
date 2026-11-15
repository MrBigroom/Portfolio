const marqueeItems = [
  "Applied AI",
  "✦",
  "Agent Orchestration",
  "✦",
  "Local Inference",
  "✦",
  "RAG",
  "✦",
  "Computer Vision",
  "✦",
  "llama.cpp",
  "✦",
  "Python",
  "✦",
  "Available 2026",
  "✦",
];

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee relative overflow-hidden border-y border-steel-700/25 bg-void-900/40 py-5 md:py-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-void-950 to-transparent md:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-void-950 to-transparent md:w-40"
      />
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`display px-5 text-xl md:text-2xl ${
              item === "✦" ? "text-rime-500" : "text-bone-200/85"
            } ${index % 4 === 0 ? "display-italic" : ""}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

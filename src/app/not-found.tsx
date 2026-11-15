export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,52,36,0.16),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_28%,rgba(0,0,0,0.62)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[13vh] bg-gradient-to-b from-void-950 via-void-950/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[13vh] bg-gradient-to-t from-void-950 via-void-950/70 to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="engraved text-[10px] text-bone-300/60">
          A record ends
        </div>
        <h1 className="death-title display mt-8 whitespace-nowrap bg-gradient-to-b from-blood-400 via-blood-500 to-blood-700 bg-clip-text text-[13vw] leading-none text-transparent md:text-[8rem]">
          YOU DIED
        </h1>
        <p className="display-italic mx-auto mt-8 max-w-md text-xl text-bone-200">
          The path you sought has faded from these lands.
        </p>
        <a
          href="/"
          className="engraved mt-12 inline-block border border-steel-700/50 px-6 py-3 text-[10px] text-ember-200 transition-colors duration-500 hover:border-ember-400/80 hover:bg-ember-400/[0.06]"
        >
          Return to the mark
        </a>
      </div>
    </main>
  );
}
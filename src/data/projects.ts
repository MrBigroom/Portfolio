export type ProjectStatus =
  | "Internship"
  | "Shipped"
  | "In Development"
  | "Final-Year Project"
  | "Active";

export type Metric = { value: string; label: string };

export type Project = {
  index: string;
  title: string;
  /** Where it came from / who it was for. Rendered above the title. */
  kind: string;
  tagline: string;
  description: string;
  role: string;
  status: ProjectStatus;
  year: string;
  tech: string[];
  highlights: string[];
  /** Scannable numbers. Rendered as a mono strip under the highlights. */
  metrics: Metric[];
  /** Shown where a repo link would be, when the code isn't public. */
  access?: string;
  featured?: boolean;
  links?: { label: string; url: string }[];
  accent: "lime" | "magenta";
  image?: string;
  /** Intrinsic pixel size of `image`, so the card can preserve its aspect ratio. */
  imageW?: number;
  imageH?: number;
  /** Alt text for `image`; falls back to "<title> screenshot". */
  imageAlt?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "AI Livestreaming Avatar",
    kind: "Internship · SNS Network · Jul 2026 – Present",
    tagline:
      "A creator writes a script, picks an avatar, and publishes a livestream that renders itself.",
    description:
      "Built inside SNS Network as Component 3 of a livestream-commerce platform. A creator generates a product script with an LLM, chooses an avatar, action set and cloned voice, then publishes a pre-rendered live session that viewers watch while chatting in real time. I own the FastAPI/PostgreSQL backend, the render-orchestration service that drives seven GPU services, and the creator and viewer front ends.",
    role: "Platform engineer — backend, render orchestration, creator & viewer UI",
    status: "Internship",
    year: "2026",
    tech: [
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy 2.0",
      "Redis",
      "MinIO / S3",
      "WebSockets",
      "Docker Compose",
      "Vanilla JS",
      "llama.cpp",
      "Wan 2.2",
      "EchoMimic",
      "MuseTalk",
      "RVM",
      "GLM-TTS",
      "Whisper",
    ],
    highlights: [
      "Render pipeline across 7 GPU services — TTS, lip-sync, matting, pose, captions, base render, composite — with per-stage job rows, resume after a mid-render outage, and a documented salvage path that recovered a stream whose stage artefacts had already been swept.",
      "Multi-stage video pipeline: LLM scriptgen → voice clone → EchoMimic / Wan 2.2 base → MuseTalk lip-sync → RVM matting → captions → composite, with splice-accurate audio/video joins, plus creator clips, music beds and transitions layered on top.",
      "Every phase gate-reviewed by a separate reviewer model with recorded CHANGES_REQUESTED/APPROVED rounds; four security audits drove the hardening work — request-body limits, secret rotation, row-level security, rate-limit accounting.",
    ],
    metrics: [
      { value: "1,187", label: "commits" },
      { value: "50", label: "migrations" },
      { value: "3,652", label: "backend tests" },
      { value: "7", label: "GPU services" },
    ],
    access: "Private · walkthrough on request",
    featured: true,
    accent: "lime",
    image: "/shots/avatar-xiaomi-live.jpg",
    imageW: 1791,
    imageH: 878,
    imageAlt:
      "Viewer page of a Xiaomi Live 8 stream: an AI-generated presenter mid-sentence, burned-in captions, a floating product card for the Xiaomi Book Pro 14 at RM5999, and the AI host answering a viewer's question in the live chat.",
  },
  {
    index: "02",
    title: "Coding Orchestration Agent Harness",
    kind: "Personal R&D · Oct 2026 – Present",
    tagline: "A control plane that makes coding agents show their work.",
    description:
      "A local-first orchestrator for an Architect → Supervisor → Worker loop. It drives headless coding CLIs and model APIs through a state machine and artifacts — worktree-isolated phase branches, handoff.json, review.json, verification.json, a JSONL build log and gated merges — so an agent run leaves evidence instead of a transcript.",
    role: "Solo — architecture, backend, CLI and GUI",
    status: "Active",
    year: "2026",
    tech: [
      "FastAPI",
      "SQLite",
      "Alembic",
      "Typer CLI",
      "React 19",
      "Vite",
      "Tailwind",
      "Git worktrees",
      "Anthropic / OpenAI-compatible APIs",
    ],
    highlights: [
      "Prompts are built in a fixed cache order, and the preview fails when dynamic content leaks into the static prefix; cache-hit rates are recorded per run.",
      "Memory is a governed prompt section: agents only suggest entries, an approval gate decides what is injected, and each role gets its own slice. Because memory is static it can't be trimmed by the budget enforcer, so each section has a hard cap (2,000 / 800 / 4,000 tokens) and demotes rot-prone entries before the newest.",
      "Scopes are a closed vocabulary enforced at every write boundary, and triage flags rot — task-shaped references, bare SHAs, absolute dates — before it reaches a prompt.",
      "verification.json records which world the gate ran in: a green in a tracked-files-only worktree, not the operator's checkout.",
      "A false-pass guard aborts the suite (exit 3) when `import orchestrator` resolves outside the checkout — the failure mode is a green run that tested the wrong code. Review parsing fails closed, and 157 of its 220 commits were authored by the orchestrator itself.",
    ],
    metrics: [
      { value: "220", label: "commits in 17 days" },
      { value: "519", label: "tests" },
      { value: "88", label: "API routes" },
      { value: "8", label: "harness adapters" },
    ],
    access: "Private · walkthrough on request",
    accent: "magenta",
  },
  {
    index: "03",
    title: "Allie",
    kind: "Personal · built for a working photography business · Oct 2026",
    tagline: "A booking agent that runs on one laptop and never publishes a port.",
    description:
      "A WhatsApp and Telegram assistant for a working photography business. It answers pricing and package questions from the business's own documents, captures bookings, collects payment-receipt photos, and hands off to an admin dashboard that issues PDFs and returns photos. The LLM, embeddings and WhatsApp bridge run on one machine with an 8 GB GPU; the cloud side reaches it only by polling.",
    role: "Solo — LLM serving, RAG, agent loop, WhatsApp bridge, dashboard",
    status: "Active",
    year: "2026",
    tech: [
      "llama.cpp",
      "Ornith-1.5-35B-A3B",
      "nomic-embed-text",
      "Baileys",
      "Supabase",
      "Next.js",
      "Vercel",
      "Google Calendar / Sheets / Gmail",
      "pdf-lib",
    ],
    highlights: [
      "A 35B-A3B MoE at 128k context on an 8 GB RTX 5050, by keeping 35 of 41 layers' expert tensors in system RAM — chosen against a measured tok/s-vs-VRAM sweep, where one layer further down OOMs the vision projector.",
      "Designed zero-inbound: the retired public tunnel was replaced with two pull patterns — an outbox the laptop polls, and a document sync on a timer — so the dashboard, webhooks and receipts all live on the edge and the machine only dials out. The honest tradeoff: sends queue while it's offline.",
      "No customer-lookup tool, by design. The bot talks to unauthenticated strangers, so the tool surface is the blast radius — a prompt can't exfiltrate what no tool can read.",
      "After it messaged non-customers, added sender allowlists, a STOP blocklist that also suppresses queued sends, LID resolution, message dedupe and a send-time audit log — then wrote the relink runbook whose acceptance criteria are audit-log strings.",
    ],
    metrics: [
      { value: "128k", label: "context" },
      { value: "~3B", label: "active params" },
      { value: "2", label: "agent tools" },
      { value: "0", label: "inbound ports" },
    ],
    access: "Private · details on request",
    accent: "lime",
  },
  {
    index: "04",
    title: "AuraFit",
    kind: "Final-year project · Quest International University",
    tagline: "Real-time AR pose detection for at-home workouts.",
    description:
      "A Flutter mobile app that uses on-device computer vision to track body pose in real time and give feedback on exercise form, built around a custom pose-detection pipeline wired into the Flutter rendering loop.",
    role: "Solo lead",
    status: "Final-Year Project",
    year: "2025–2026",
    tech: ["Flutter", "Dart", "Computer Vision", "AR", "On-device ML"],
    highlights: [
      "Real-time pose estimation for form correction",
      "Custom AR overlay on top of the Flutter camera stream",
      "Designed for offline, on-device inference",
    ],
    metrics: [
      { value: "Real-time", label: "pose feedback" },
      { value: "On-device", label: "inference" },
      { value: "Offline", label: "by design" },
      { value: "2026", label: "final year" },
    ],
    accent: "magenta",
  },
  {
    index: "05",
    title: "QuestFocus",
    kind: "Personal · in development",
    tagline:
      "An RPG productivity app that makes deep work feel like a dungeon run.",
    description:
      "A desktop productivity app that gamifies focused work with Pomodoro mechanics, XP and levelling, dungeon-run sessions, and social co-focus parties — built cross-platform on Tauri with a real-time backend on Supabase and LiveKit.",
    role: "Solo lead",
    status: "In Development",
    year: "2026",
    tech: ["Tauri", "React", "Supabase", "LiveKit", "Vercel", "TypeScript"],
    highlights: [
      "RPG-style XP, levelling and dungeon mechanics for focus sessions",
      "Real-time co-focus parties via LiveKit",
      "Supabase-backed auth, persistence and presence",
    ],
    metrics: [
      { value: "Tauri", label: "desktop shell" },
      { value: "LiveKit", label: "co-focus parties" },
      { value: "Supabase", label: "auth + presence" },
      { value: "2026", label: "in development" },
    ],
    accent: "lime",
  },
];

export const skills = {
  Languages: ["TypeScript", "Python", "JavaScript", "Dart", "SQL"],
  "Inference & Serving": [
    "llama.cpp",
    "GGUF quantisation",
    "VRAM budgeting",
    "KV-cache tuning",
    "vLLM",
    "CUDA builds",
  ],
  "Agents & Orchestration": [
    "Multi-agent pipelines",
    "Git-worktree isolation",
    "Prompt caching",
    "Tool calling",
    "Eval / review gates",
  ],
  Retrieval: ["RAG", "Embeddings", "Chunking", "Hybrid retrieval"],
  "Platform & Infra": [
    "FastAPI",
    "PostgreSQL",
    "Redis",
    "Docker",
    "S3 / MinIO",
    "Supabase",
    "Vercel",
    "systemd",
    "Linux",
  ],
  Product: ["React", "Next.js", "React Native", "Flutter", "Tauri", "Tailwind"],
};
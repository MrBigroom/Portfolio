export type Project = {
  index: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  status: "Shipped" | "In Development" | "Final-Year Project" | "Active";
  year: string;
  tech: string[];
  highlights: string[];
  links?: { label: string; url: string }[];
  accent: "lime" | "magenta";
  image?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "CoinSage",
    tagline: "ML-powered personal finance, on your phone.",
    description:
      "A React Native finance app with a custom Python/Flask AI microservice that auto-categorizes transactions using a TF-IDF + Naïve Bayes classifier. Two services, deployed independently, communicating over REST. Includes a feedback loop that logs predictions vs. user-corrected categories so the model can be improved over time.",
    role: "Solo lead, team mini-project",
    status: "Shipped",
    year: "2025",
    tech: ["React Native", "Expo Go", "Node.js", "Express", "MongoDB", "Python", "Flask", "scikit-learn", "JWT", "Render"],
    highlights: [
      "Microservices architecture: Node backend + Python AI service",
      "TF-IDF + Naïve Bayes classifier for transaction categorization",
      "JWT auth with access + refresh token rotation",
      "Model feedback loop for ongoing performance evaluation",
    ],
    accent: "lime",
  },
  {
    index: "02",
    title: "AuraFit",
    tagline: "Real-time AR pose detection for at-home workouts.",
    description:
      "Final-year project: a Flutter mobile app that uses on-device computer vision to track body pose in real time and provide feedback on exercise form. Built around a custom pose-detection pipeline integrated into the Flutter rendering loop.",
    role: "Solo lead",
    status: "Final-Year Project",
    year: "2025–2026",
    tech: ["Flutter", "Dart", "Computer Vision", "AR", "On-device ML"],
    highlights: [
      "Real-time pose estimation for form correction",
      "Custom AR overlay on top of Flutter camera stream",
      "Designed for offline, on-device inference",
    ],
    accent: "magenta",
  },
  {
    index: "03",
    title: "QuestFocus",
    tagline: "An RPG productivity app that makes deep work feel like a dungeon run.",
    description:
      "An in-development desktop productivity app that gamifies focused work using Pomodoro mechanics, XP/leveling, dungeon-run sessions, and social co-focus parties. Designed for cross-platform delivery with Tauri and a real-time backend on Supabase + LiveKit.",
    role: "Solo lead",
    status: "In Development",
    year: "2026",
    tech: ["Tauri", "React", "Supabase", "LiveKit", "Vercel", "TypeScript"],
    highlights: [
      "RPG-style XP, leveling, and dungeon mechanics for focus sessions",
      "Real-time co-focus parties via LiveKit",
      "Supabase-backed auth, persistence, and presence",
    ],
    accent: "lime",
  },
  {
    index: "04",
    title: "Discord LLM Bot",
    tagline: "A conversational agent built on Gemini.",
    description:
      "A Python Discord bot that uses Google's Gemini models via AI Studio to power conversational features. The work is essentially UI/UX for an AI agent in a chat context — designing system prompts, handling edge cases, iterating when the model misbehaves.",
    role: "Solo, personal project",
    status: "Active",
    year: "2025–2026",
    tech: ["Python", "discord.py", "Google AI Studio", "Gemini API"],
    highlights: [
      "Prompt engineering for reliable conversational outputs",
      "Edge-case handling and safety constraints",
      "Tight iteration loop on system instructions",
    ],
    accent: "magenta",
  },
  {
    index: "05",
    title: "SOCAR Car Rental",
    tagline: "A full PHP/MySQL booking platform with payments and maps.",
    description:
      "A car rental web application built end-to-end: HTML/CSS/JS frontend, PHP backend, MySQL database, with Google Maps API for branch and vehicle locations and Stripe for payment processing. Designed the schema, server-side logic, and the full customer booking flow.",
    role: "Lead, team coursework project",
    status: "Shipped",
    year: "2024",
    tech: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Google Maps API", "Stripe API"],
    highlights: [
      "Full end-to-end booking and payment flow",
      "MySQL schema design from scratch",
      "Google Maps integration for branch & vehicle discovery",
      "Stripe integration with secure payment handling",
    ],
    accent: "lime",
  },
];

export const skills = {
  "Languages": ["TypeScript", "JavaScript", "Python", "Dart", "PHP", "SQL"],
  "Frameworks": ["React", "React Native", "Next.js", "Flutter", "Express.js", "Flask", "Tauri"],
  "AI / ML": ["scikit-learn", "Gemini API", "Computer Vision", "TF-IDF + Naïve Bayes", "Prompt engineering"],
  "Infra": ["MongoDB", "MySQL", "Supabase", "Vercel", "Render", "Git", "REST APIs"],
};

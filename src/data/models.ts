export type ModelRow = {
  name: string;
  task: string;
  quant: string;
  size: string;
  fit: string;
};

export type FitStrategy = {
  title: string;
  body: string;
};

export const labIntro = {
  eyebrow: "Local Inference",
  headline: "A hundred and twenty-four gigabytes,",
  headlineItalic: "on eight gigabytes of VRAM.",
  lead: "Everything I run locally has to fit one consumer card. That constraint is the interesting part — quantisation, expert offload, KV-cache size and speculative decoding aren't tuning knobs here, they decide what runs at all.",
};

export const fitStrategies: FitStrategy[] = [
  {
    title: "MoE expert offload",
    body: "256 experts, 8 active per token. The expert tensors of 35 of 41 layers stay in system RAM while attention stays on the GPU, which is what makes a 20 GB checkpoint fit a 7.5 GB budget. The 128k context is affordable because both K and V are quantised to q8_0.",
  },
  {
    title: "Dense partial offload",
    body: "22 of 65 blocks on the GPU, and --fit deliberately off, because auto-fitting doesn't model MTP's runtime allocation. Speculative decoding with one draft token recovers the throughput the offload costs.",
  },
  {
    title: "4-bit diffusion, staged",
    body: "Every image and video UNet is a 4-bit GGUF with a separately loaded text encoder. The two can't co-reside in 8 GB, so they load as sequential stages rather than sitting in VRAM together.",
  },
];

export const models: ModelRow[] = [
  {
    name: "Ornith-1.5-35B-A3B",
    task: "LLM + vision",
    quant: "Q4_K_M",
    size: "20.2 GB",
    fit: "35/41 layers' experts in RAM · 128k ctx · q8_0 KV",
  },
  {
    name: "Qwen3.8-27B",
    task: "LLM",
    quant: "IQ4_XS",
    size: "14.6 GB",
    fit: "22/65 blocks on GPU · MTP drafting",
  },
  {
    name: "FLUX.2-klein-9B",
    task: "Image",
    quant: "Q4_K_M",
    size: "5.5 + 5.6 GB",
    fit: "4-bit UNet · encoder as a separate stage",
  },
  {
    name: "Qwen-Image-2.1",
    task: "Image",
    quant: "Q4_K_M",
    size: "4.3 + 5.9 GB",
    fit: "same pattern · w4a8 encoder",
  },
  {
    name: "Wan 2.2 · 5B / 14B I2V",
    task: "Video",
    quant: "Q5_K_M · q4 hi+lo",
    size: "3.6–18 GB",
    fit: "high/low noise experts as separate GGUFs",
  },
  {
    name: "GFPGAN + RestoreFormer++",
    task: "Face restore",
    quant: "fp32",
    size: "0.6 GB",
    fit: "two restorers sharing one detector set",
  },
];

export const labHardware = [
  { label: "GPU", value: "RTX 5050 · 8 GB" },
  { label: "System RAM", value: "32 GB" },
  { label: "llama.cpp", value: "sm_120 · CUDA 13.4 · FA + CUDA graphs" },
  { label: "VRAM budget", value: "8,151 MiB usable" },
  { label: "Diffusion", value: "ComfyUI" },
  { label: "Scheduling", value: "systemd units, Conflicts= (swap, not co-serve)" },
];

export const labMeasured = [
  { value: "38.4", unit: "tok/s", label: "35B MoE at 7.5 GB" },
  { value: "4.3", unit: "tok/s", label: "dense 27B, 22/65 on GPU" },
  { value: "124", unit: "GB", label: "across 8 model families" },
];
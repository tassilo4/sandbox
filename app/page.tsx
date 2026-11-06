import Link from "next/link";

const experiments = [
  {
    href: "/ascii-effect",
    title: "ASCII Effect",
    description: "A responsive image-to-ASCII rendering study.",
  },
  {
    href: "/ascii-wave",
    title: "ASCII Wave",
    description: "Animated typographic waves rendered as a text field.",
  },
  {
    href: "/codex-bg",
    title: "Particle Field",
    description: "A layered generative background with organic motion.",
  },
  {
    href: "/dither-prism-hero",
    title: "Dithered Prism",
    description: "A WebGL hero combining refraction, color, and dithering.",
  },
  {
    href: "/griffin-buttons",
    title: "Magnetic Buttons",
    description: "Pointer-aware controls with playful physical movement.",
  },
  {
    href: "/griffin-canvas",
    title: "Interactive Canvas",
    description: "A canvas-based cursor and particle interaction study.",
  },
  {
    href: "/magnet-lines",
    title: "Magnetic Lines",
    description: "A directional line grid that reacts to pointer movement.",
  },
  {
    href: "/orbit-card-stack",
    title: "Orbit Card Stack",
    description: "Layered cards arranged and animated around an orbit.",
  },
  {
    href: "/prism-gradient",
    title: "Prism Gradient",
    description: "A luminous animated gradient built for hero surfaces.",
  },
];

export default function Home() {
  return (
    <main className="min-h-svh bg-zinc-950 px-6 py-20 text-zinc-100 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14">
        <header className="max-w-3xl space-y-5">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">
            Interactive UI Lab
          </p>
          <h1 className="text-balance text-4xl font-medium tracking-tight sm:text-6xl">
            Experiments in motion, graphics, and interface behavior.
          </h1>
          <p className="max-w-2xl text-pretty text-base leading-7 text-zinc-400 sm:text-lg">
            A working collection of visual prototypes built with React, WebGL,
            Three.js, canvas, and CSS. Each route isolates one idea so it can be
            studied, adapted, or discarded without ceremony.
          </p>
        </header>

        <section className="grid gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((experiment, index) => (
            <Link
              key={experiment.href}
              href={experiment.href}
              className="group flex min-h-52 flex-col justify-between bg-zinc-950 p-6 transition-colors hover:bg-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zinc-100"
            >
              <span className="font-mono text-xs text-zinc-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="space-y-2">
                <h2 className="text-lg font-medium tracking-tight text-zinc-100">
                  {experiment.title}
                  <span
                    aria-hidden="true"
                    className="ml-2 inline-block text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-zinc-300"
                  >
                    →
                  </span>
                </h2>
                <p className="text-sm leading-6 text-zinc-500">
                  {experiment.description}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

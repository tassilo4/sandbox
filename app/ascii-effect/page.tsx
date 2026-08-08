"use client";

import { useState } from "react";
import { AsciiEffect } from "@/components/ui/ascii-effect";
import { cn } from "@/lib/utils";

const VARIANTS = [
  { key: "image", label: "Image" },
  { key: "flow", label: "Flow" },
  { key: "glitch", label: "Glitch" },
] as const;

type Variant = (typeof VARIANTS)[number]["key"];

const DEMO_IMAGE = "/images/ascii-effect/chrome-bust.webp";

export default function Page() {
  const [variant, setVariant] = useState<Variant>("image");

  return (
    <div className="relative flex min-h-[82vh] flex-col items-center justify-center gap-6 overflow-hidden bg-black p-8 text-foreground">
      <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1">
        {VARIANTS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setVariant(key)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm text-white/60 transition-colors",
              variant === key && "bg-white/10 text-white"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="h-[774px] w-[620px] overflow-hidden rounded-2xl">
        <AsciiEffect
          key={variant}
          variant={variant}
          imageSrc={DEMO_IMAGE}
          fontSize={9}
          scale={1.15}
          brightnessBoost={1.4}
          contrast={1}
          threshold={0.03}
          flowStrength={6}
        />
      </div>
    </div>
  );
}

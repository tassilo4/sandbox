"use client";

import { PrismGradient } from "@/components/ui/prism-gradient";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Page() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-[82vh] flex-col items-center justify-center gap-6">
      <button
        type="button"
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        className="rounded-full border border-black/20 bg-black/5 px-4 py-2 text-sm transition hover:bg-black/10 dark:border-white/30 dark:bg-white/10 dark:hover:bg-white/20"
      >
        {mounted ? `Toggle theme (${resolvedTheme})` : "Toggle theme"}
      </button>
      <div className="relative size-[420px] overflow-hidden rounded-2xl">
        <PrismGradient />
      </div>
      <div className="relative h-[420px] w-full overflow-hidden rounded-2xl">
        <PrismGradient
          speed={1}
          rotation={-50}
          proportion={39}
          scale={0.013}
          distortion={0}
          swirl={50}
          swirlIterations={16}
          softness={15}
          shapeSize={45}
          color1="#FFFFFF"
          color2="#ffa8d7"
          color3="#ffffff"
          noise={{ opacity: 0, scale: 1 }}
        />
      </div>
    </div>
  );
}

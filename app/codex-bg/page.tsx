import { AsciiHoverTrail } from "@/components/ascii-hover-trail";

export default function Page() {
  return (
    <div className="relative min-h-[82vh] text-foreground">
      <AsciiHoverTrail
        className="absolute inset-0 -z-10 h-full w-full"
        glyphs=" _>o"
        cellSize={10}
        cellGap={1}
        brushRadius={25}
        decay={0.969}
        follow={0.01}
        wander={17}
        shimmerFrames={22}
        wanderInertia={0.77}
        charBias={0.4}
        charSpread={0}
        momentum={0.84}
        kick={0.1}
        driftInterval={29}
      />
    </div>
  );
}

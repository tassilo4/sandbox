import { AsciiWave } from "@/components/ascii-wave";

export default function Page() {
  return (
    <div className="relative min-h-[82vh] overflow-hidden bg-white text-foreground dark:bg-black">
      <AsciiWave
        className="absolute inset-0"
        speed={1}
        opacity={0.9}
        cellWidth={7}
        cellHeight={6}
        fontSize={6}
        baseColor="#e7ebed"
        colorMix={0.8}
        hueRotate={0}
        saturate={1}
      />
    </div>
  );
}

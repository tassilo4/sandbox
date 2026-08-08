import { MagnetLines } from "@/components/magnet-lines";

export default function Page() {
  return (
    <div className="relative min-h-[82vh] overflow-hidden bg-white text-foreground dark:bg-black flex flex-wrap items-center justify-center gap-16 p-8">
      <MagnetLines
        rows={10}
        columns={8}
        containerSize="60vmin"
        lineColor="#111111"
        lineWidth="0.9vmin"
        lineHeight="5vmin"
        baseAngle={0}
      />
      <MagnetLines
        rows={10}
        columns={11}
        containerSize="55vmin"
        lineColor="#000000"
        lineWidth="0.3vmin"
        lineHeight="1.5vmin"
        baseAngle={45}
      />
    </div>
  );
}

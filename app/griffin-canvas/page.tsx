import { AsciiDiagonalRain } from "@/components/ascii-diagonal-rain";

export default function GriffinCanvasPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0c0c0b] p-8">
      <style>{`
        @font-face {
          font-family: 'Sohne Mono';
          src: url('/fonts/sohne-mono-buch-tq5ze9.woff2') format('woff2');
          font-style: normal;
          font-weight: 400;
          font-display: swap;
        }
      `}</style>
      <div className="relative h-[252px] w-[784px] max-w-full">
        <AsciiDiagonalRain className="absolute inset-0" />
      </div>
    </div>
  );
}

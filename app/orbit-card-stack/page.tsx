import { OrbitCardStack } from "@/components/ui/orbit-card-stack";

export default function Page() {
  return (
    <div className="flex min-h-[82vh] items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="h-[620px] w-full">
        <OrbitCardStack defaultActiveIndex={2} spread={150} lift={40} />
      </div>
    </div>
  );
}

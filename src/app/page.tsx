import { Demo1 } from "@/components/demo-1";
import { Demo2 } from "@/components/demo-2";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <Demo1 />
      <Demo2 />
    </div>
  );
}

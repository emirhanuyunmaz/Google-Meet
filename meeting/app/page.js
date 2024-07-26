import Inputs from "./_components/Inputs";
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Inputs/>
      <Toaster/>
    </main>
  );
}

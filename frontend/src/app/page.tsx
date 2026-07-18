import HeroBanner from "@/components/HeroBanner";
import HomeSections from "@/components/HomePages";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-brand-primary">
      <HeroBanner />

      <HomeSections></HomeSections>
    </main>
  );
}

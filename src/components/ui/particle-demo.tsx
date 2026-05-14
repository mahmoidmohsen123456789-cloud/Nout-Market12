import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

export default function ParticleDemo() {
  return (
    <div className="py-20 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8 text-[#D4AF37]">Interactive Particle Experience</h2>
      <ParticleTextEffect words={["NOUR", "MARKET", "LUXURY", "AL-ARISH"]} />
    </div>
  );
}

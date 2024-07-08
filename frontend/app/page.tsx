import Image from "next/image";
import Hero from "./components/Hero";
import MusicPlayer from "./components/MusicPlayer";

export default function Home() {
  return (
    <main >
      <div className="max-w-screen-xl mx-auto">
        <Hero />
      </div>
      <svg className="fixed top-0 left-0 w-full h-full opacity-20 z-[-1]" preserveAspectRatio="none">
        <pattern id="smallGrid" width="25" height="25" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="#fff" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
      </svg>
    </main>
  );
}

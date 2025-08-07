import { Background } from "@/components/home/background";
import Hero from "@/components/home/hero";
import Navbar from "@/components/home/navbar";


export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Background>
        <Hero />
      </Background>
    </main>
  );
}
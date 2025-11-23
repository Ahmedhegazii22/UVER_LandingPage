import Image from "next/image";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Comprehensive from "./_components/Comprehensive";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Comprehensive />
    </>
  );
}

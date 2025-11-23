import Image from "next/image";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Comprehensive from "./_components/Comprehensive";
import Steps from "./_components/Steps";
import SmoothScrollWrapper from "./_components/Smoothscroll";

export default function Home() {
  return (
    <>
      <Navbar />
      <SmoothScrollWrapper>
        <Hero />
        <Comprehensive />
        <Steps />
      </SmoothScrollWrapper>
    </>
  );
}

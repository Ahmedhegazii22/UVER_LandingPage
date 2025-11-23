"use client";
import Image from "next/image";
import Card from "./Card/Card";
import { IoMdSearch } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { PiEyesDuotone } from "react-icons/pi";
import { LuNotebookPen } from "react-icons/lu";
import { FaBuildingColumns, FaMobileRetro } from "react-icons/fa6";
// import success from "public/success.jpg";
import { IoMdSchool } from "react-icons/io";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { IoArrowForward } from "react-icons/io5";

const STEPS = [
  {
    title: "Search for Your Ideal College",
    description:
      "Browse a wide database of colleges and universities, and refine your search by location, majors, and campus features.",
    icon: <IoMdSearch />,
  },
  {
    title: "Chat with Admissions Experts",
    description:
      "Get direct guidance and answers from admissions specialists to help you make better decisions.",
    icon: <IoChatbubbleEllipsesOutline />,
  },
  {
    title: "Track Deadlines and Requirements",
    description:
      "Stay updated with important submissions, required documents, and deadlines all in one place.",
    icon: <PiEyesDuotone />,
  },
  {
    title: "Apply with Confidence",
    description:
      "Fill out forms easily, upload any necessary files, and submit your applications digitally.",
    icon: <LuNotebookPen />,
  },
  {
    title: "Plan Your College Future",
    description:
      "Compare offers, analyze financial aid, and choose the college that matches your goals.",
    icon: <FaBuildingColumns />,
  },
];

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function Steps() {
  const sectionRef = useRef(null);
  const badgeIcon = useRef(null);

  useGSAP(
    () => {
      ScrollTrigger.refresh();

      const introTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none none",
        },
      });

      introTL.from(badgeIcon.current, {
        opacity: 0,
        y: -35,
        duration: 0.6,
        ease: "power2.out",
      });

      introTL.from(
        ".work-tag",
        {
          opacity: 0,
          y: -35,
          duration: 0.6,
          ease: "power2.out",
        },
        "<"
      );

      const split = new SplitText("h1", { type: "lines" });

      introTL.from(
        split.lines,
        {
          x: gsap.utils.wrap([-120, 120]),
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.2"
      );

      introTL.from(
        ".step-card",
        {
          opacity: 0,
          y: gsap.utils.wrap([-80, 80]),
          stagger: 0.12,
          duration: 0.55,
          ease: "power1.out",
        },
        "-=0.3"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="container mx-auto px-5 py-20">
      <header className="flex justify-between items-center mb-14">
        <div className="work-tag flex items-center gap-3">
          <span className="w-1.5 h-6 bg-gray-500 rounded"></span>
          <p className="text-sm font-semibold text-gray-600">How It Works</p>
        </div>

        <span ref={badgeIcon} className="text-gray-700 text-3xl">
          <IoMdSchool />
        </span>
      </header>

      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16 leading-[1.2]">
        Simple Steps to <br /> College Success
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 justify-items-center">
        {STEPS.map((step) => (
          <Card
            key={step.title}
            title={step.title}
            description={step.description}
            icon={step.icon}
            className="step-card"
          />
        ))}

        <div className="relative rounded-3xl shadow-xl overflow-hidden group step-card">
          <Image
            alt="Students celebrating graduation"
            src="/success.jpg"
            width={500}
            height={500}
            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.06]"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">
            <h2 className="text-2xl font-bold mb-3">
              Discover, apply, succeed — UVER makes college planning easier.
            </h2>

            <button className="self-start w-fit md:inline-flex bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-800 transition-colors flex items-center gap-2">
              Get Early Access <FaMobileRetro />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;

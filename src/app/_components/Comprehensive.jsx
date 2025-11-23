"use client";
import { useGSAP } from "@gsap/react";
import Mobile3D from "./Mobile3D";
import { MdOutlineMouse } from "react-icons/md";
import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import ComprehensiveData from "./ComprehensiveData";

gsap.registerPlugin(
  useGSAP,
  Observer,
  ScrollSmoother,
  ScrollTrigger,
  SplitText
);

const data = [
  {
    id: 1,
    label: "College Search",
    header: "Comprehensive College Search",
    content:
      "Effortlessly explore a vast database of colleges and universities worldwide. Filter your results based on location, majors, campus facilities, and more to find the perfect match for your educational journey.",
  },
  {
    id: 2,
    label: "Recommendations",
    header: "Personalized Advising",
    content:
      "Receive tailored guidance based on your interests, academic background, and career goals. Discover colleges and programs aligned with your aspirations, helping you make informed decisions about your future.",
  },
  {
    id: 3,
    label: "Tracker",
    header: "Application Tracker",
    content:
      "Stay organized with an intuitive application tracker. Monitor the progress of your submissions, track deadlines, and get reminders for required documents to ensure you never miss an important milestone.",
  },
  {
    id: 4,
    label: "Chat",
    header: "Engaging Expert Chat",
    content:
      "Feel free to ask questions, seek advice, and gain valuable insights to support you throughout your college application process. Receive expert guidance every step of the way.",
  },
  {
    id: 5,
    label: "Application",
    header: "Seamless Application",
    content:
      "Submit your applications directly through the app. Save time by completing forms electronically, uploading required documents with ease, and maintaining smooth communication with admissions offices.",
  },
];

function Comprehensive() {
  const container = useRef(null);
  const observerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(1);
  const isScrolling = useRef(false);

  const changeSection = useCallback((direction) => {
    if (isScrolling.current) return;

    isScrolling.current = true;
    setActiveSection((prev) => {
      const newSection =
        direction === "down"
          ? Math.min(prev + 1, data.length)
          : Math.max(prev - 1, 1);

      if (prev === 2 || prev === 3 || prev === 4) {
        console.log("scrolled");
        gsap.to(window, { scrollTo: container.current, duration: 1 });
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 600);

      return newSection;
    });
  }, []);

  useGSAP(
    () => {
      if (observerRef.current) {
        observerRef.current.kill();
      }

      observerRef.current = Observer.create({
        type: "wheel,scroll,touch",
        target: container.current,
        tolerance: 10,
        onUp: () => changeSection("up"),
        onDown: () => changeSection("down"),
      });

      gsap.to(".mouse-indicator", {
        y: -30,
        repeat: -2,
        yoyo: true,
        duration: 2,
        ease: "power1.inOut",
      });

      gsap.from("nav p", {
        x: -20,
        opacity: 0,
        scrollTrigger: {
          trigger: ".comprehensive",
        },
      });

      return () => {
        if (observerRef.current) {
          observerRef.current.kill();
        }
      };
    },
    {
      scope: container,
      dependencies: [activeSection],
      revertOnUpdate: true,
    }
  );

  return (
    <section
      ref={container}
      className="comprehensive flex items-center justify-center min-h-screen w-full bg-zinc-800"
    >
      <div className="w-full max-w-7xl mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-[200px_1fr_350px] gap-12 items-center w-full">
          <nav className="flex flex-col space-y-3">
            {data.map((item) => (
              <p
                key={item.id}
                className={`pl-6 border-l-3 transition-colors duration-400 ${
                  activeSection === item.id
                    ? "text-white font-bold border-blue-400"
                    : "text-gray-400 hover:text-white border-transparent"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </p>
            ))}
          </nav>

          <div className="flex flex-col space-y-8 text-center">
            <ComprehensiveData
              content={data[activeSection - 1].content}
              header={data[activeSection - 1].header}
            />

            <div className="flex justify-center items-center text-neutral-400">
              <MdOutlineMouse className="mouse-indicator mr-2" size={36} />
            </div>
          </div>

          <div className="relative">
            <Mobile3D activeSection={activeSection} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Comprehensive;

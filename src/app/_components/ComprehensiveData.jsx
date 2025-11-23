import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

function ComprehensiveData({ content, header }) {
  const container = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(headerRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(
        contentRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.3"
      );
    },
    {
      scope: container,
      dependencies: [content, header],
      revertOnUpdate: true,
    }
  );

  return (
    <div className="space-y-6" ref={container}>
      <h1
        ref={headerRef}
        className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight text-white"
      >
        {header}
      </h1>
      <p ref={contentRef} className="text-gray-300 max-w-lg leading-relaxed">
        {content}
      </p>
    </div>
  );
}

export default ComprehensiveData;

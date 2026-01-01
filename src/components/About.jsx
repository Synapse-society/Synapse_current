import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goals = [
    { title: "Socio-Linguistic Knowledge", desc: "Our Primary focus is on enhancing and engaging the Socio-Linguistic Knowledge and Social Skills among our members.", tilt: -4, offset: -30 },
    { title: "Language Awareness", desc: "We also emphasise on improving language education policies and practices to ensure that they are inclusive and culturally sensitive", tilt: 5, offset: 40 },
    { title: "Geopolitical Analysis", desc: "Analyze and disseminate information about geopolitical issues and conflicts to promote peace, diplomacy, and international cooperation", tilt: -2, offset: -10 },
    { title: "Preservation", desc: "Advocate for policies and practices that celebrate and respect cultural diversity within society to preserve and respect their cultural knowledge and heritage.", tilt: 7, offset: 50 },
    { title: "Research & Publications", desc: "Publish scholarly journals, books, and other materials to disseminate research findings and cultural insights.", tilt: -5, offset: -20 },
    { title: "Global Perspective", desc: "Collaborate with organizations to address global cultural and geographical challenges, such as climate change and cultural preservation.", tilt: 3, offset: 30 }
  ];

  const premiumEase = [0.6, 0.01, 0.05, 0.95];

  // --- KINETIC TYPOGRAPHY COMPONENT ---
  const AlternatingChar = ({ char, index, isAccent }) => {
    const isEven = index % 2 === 0;
    const targetY = isEven ? "-100%" : "100%";
    const cloneInitialY = isEven ? "100%" : "-100%";

    return (
      <span className="relative inline-block overflow-hidden h-[1.1em] leading-[1.1]" 
            style={{ color: isAccent ? "var(--synapse-accent)" : "white" }}>
        <motion.span
          variants={{ initial: { y: "0%" }, animate: { y: targetY } }}
          transition={{ duration: 0.9, ease: premiumEase }}
          className="block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
        <motion.span
          variants={{ initial: { y: cloneInitialY }, animate: { y: "0%" } }}
          transition={{ duration: 0.9, ease: premiumEase }}
          className="absolute inset-0 block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      </span>
    );
  };

  useGSAP(() => {
    if (!isDesktop) return;

    const scrollWidth = scrollTrackRef.current.offsetWidth;

    // --- SEAMLESS PINNING LOGIC ---
    // Start at -20% viewport to overlap with the Hero video zoom
    gsap.fromTo(scrollTrackRef.current, 
      { x: "100vw" }, 
      {
        x: -scrollWidth, 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top 20%", // Triggers early while Hero is still visible
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      }
    );
  }, [isDesktop]);

  return (
    <section 
      ref={containerRef} 
      id="about" 
      // Negative margin pulls the transparent container UP into the Hero section
      className={`relative z-20 bg-transparent overflow-hidden ${isDesktop ? 'h-screen -mt-[80vh]' : 'py-20'}`}
    >
      <div className={`flex h-full items-center ${isDesktop ? 'flex-row-reverse pr-20' : 'flex-col px-6'}`}>
        
        {/* --- STATIC HEADING --- */}
        <div className={`z-50 ${isDesktop ? 'w-[40%] pl-10' : 'w-full text-center mb-16'}`}>
          <div className="relative p-6 rounded-[2rem]">
            {/* Deep glow behind text to darken the Earth video for readability */}
            <div className="absolute inset-0 bg-[#020a1a]/70 blur-[120px] -z-10 rounded-full" />
            
            <motion.h1
              initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ staggerChildren: 0.03 }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-white flex flex-wrap justify-end gap-x-3 mb-6"
            >
              {["Our", "Goals"].map((word, wordIdx) => (
                <span key={wordIdx} className="flex flex-nowrap">
                  {word.split("").map((char, charIdx) => (
                    <AlternatingChar key={charIdx} char={char} index={charIdx} isAccent={word === "Goals"} />
                  ))}
                </span>
              ))}
            </motion.h1>

            <motion.p 
              initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ staggerChildren: 0.005, delayChildren: 0.5 }}
              className="text-white/80 text-lg md:text-xl leading-relaxed font-medium flex flex-wrap justify-end text-right"
            >
              {"Synapse Society has a diverse range of goals to enrich members.".split(" ").map((word, wordIdx) => (
                <span key={wordIdx} className="flex flex-nowrap ml-2">
                  {word.split("").map((char, charIdx) => (
                    <AlternatingChar key={charIdx} char={char} index={charIdx + wordIdx} />
                  ))}
                </span>
              ))}
            </motion.p>
          </div>
        </div>

        {/* --- GLIDING TRACK --- */}
        <div 
          ref={scrollTrackRef} 
          className={`flex items-center ${isDesktop ? 'flex-nowrap' : 'flex-col w-full gap-10'}`}
        >
          {goals.map((goal, index) => (
            <div
              key={index}
              className={`flex-shrink-0 relative p-10 md:p-12 rounded-[3.5rem] bg-[#030a1a]/95 border border-white/20 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col group will-change-transform
                ${isDesktop ? 'w-[450px] h-[520px] -mr-6 hover:-translate-y-4' : 'w-full h-auto'} 
              `} // Reduced overlap from -mr-16 to -mr-6
              style={{ 
                zIndex: goals.length - index,
                transform: isDesktop ? `rotate(${goal.tilt}deg) translateY(${goal.offset}px)` : 'none',
                transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              {/* Gold Accent Line */}
              <div className="w-12 h-1 mb-10 rounded-full" style={{ backgroundColor: "var(--synapse-accent)" }} />
              
              <h5 className="font-black text-2xl md:text-4xl mb-6 leading-tight uppercase tracking-tight" style={{ color: "var(--synapse-accent)" }}>
                {goal.title}
              </h5>
              <p className="text-white/50 leading-relaxed text-lg italic group-hover:text-white transition-colors duration-500">
                "{goal.desc}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
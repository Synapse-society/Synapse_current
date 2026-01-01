import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Departments = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Update layout based on window size
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const depts = [

    { name: "Panini", field: "Linguistics", img: "/images/language.png", desc: "Fosters a deeper understanding of the complex interplay between language and society, ultimately contributing to more inclusive practices." },
    { name: "Kumarila Bhatta", field: "Culture", img: "/images/Culture.jpg", desc: "Promotes cultural awareness and inclusive practices by exploring the rich diversity of global heritage and societal norms." },
    { name: "Kalhana", field: "History", img: "/images/History.jpg", desc: "Dedicated to the critical analysis of historical narratives to better understand the foundations of our modern world." },
    { name: "Strabo", field: "Geography", img: "/images/Geography.png", desc: "Explores the relationship between physical environments and human societies to address global geographical challenges." },
    { name: "Chanakya", field: "Political Studies", img: "/images/Politics.jpeg", desc: "Analyzes political structures and diplomatic relations to promote international cooperation and peace." },
    { name: "Aristotle", field: "Philosophy", img: "/images/Philosophy.jpg", desc: "Engages with fundamental questions of existence, ethics, and reason to develop critical thinking and global perspective." },
  ];

  useGSAP(() => {
    // Only run GSAP horizontal scroll if we are on desktop
    if (!isDesktop) return;

    const scrollWidth = triggerRef.current.offsetWidth - window.innerWidth;

    const ctx = gsap.to(triggerRef.current, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1.5, // Buttery smooth delay
        start: "top top",
        end: () => `+=${triggerRef.current.offsetWidth}`,
        anticipatePin: 1,
        invalidateOnRefresh: true, // Refreshes layout if window is resized
      },
    });

    return () => ctx.kill(); // Cleanup
  }, [isDesktop]);

  return (
    <div ref={sectionRef} className="overflow-hidden bg-transparent">
      <section className={`min-h-screen w-full flex flex-col justify-center relative ${!isDesktop ? 'py-20' : ''}`}>
        
        {/* Background Large Title (Desktop Only) */}
        {isDesktop && (
          <div className="absolute top-10 left-20 z-10 pointer-events-none">
            <h2 className="text-[10rem] font-black tracking-tighter text-white/5 uppercase select-none">
              Departments
            </h2>
          </div>
        )}

        {/* Section Header */}
        <div className="px-6 md:px-20 mb-12 relative z-20 text-center md:text-left">
          <h2 className="text-5xl md:text-8xl font-black text-white leading-none">
            Our <span style={{ color: "var(--synapse-accent)" }}>Departments</span>
          </h2>
          <div className="w-20 h-1 mt-6 rounded-full opacity-40 mx-auto md:mx-0" style={{ backgroundColor: "var(--synapse-accent)" }} />
        </div>

        {/* --- DYNAMIC TRACK --- */}
        {/* On desktop: flex-nowrap for horizontal. On mobile: flex-col for vertical stack */}
        <div 
          ref={triggerRef} 
          className={`flex gap-8 md:gap-16 px-6 md:px-20 items-center 
            ${isDesktop ? 'flex-nowrap w-max' : 'flex-col w-full'}
          `}
        >
          {depts.map((dept, index) => (
            <motion.div
              key={index}
              initial={!isDesktop ? { opacity: 0, y: 30 } : {}}
              whileInView={!isDesktop ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true, amount: 0.2 }}
              className="w-full md:w-[450px] h-[500px] md:h-[600px] flex-shrink-0 relative rounded-[3rem] overflow-hidden group bg-black/40 border border-white/5 shadow-2xl"
              style={{ isolation: 'isolate' }}
            >
              <img 
                src={dept.img} 
                alt={dept.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out will-change-transform"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#020a1a] via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-left">
                <p style={{ color: "var(--synapse-accent)" }} className="uppercase tracking-[0.3em] text-[10px] font-black mb-2 opacity-80">
                  Dept. of {dept.field}
                </p>
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  {dept.name}
                </h4>
                <p className="text-white/40 leading-relaxed text-sm italic font-medium max-w-xs">
                  "{dept.desc}"
                </p>
              </div>
            </motion.div>
          ))}
          
          {/* Visual Buffer for desktop end-of-scroll */}
          {isDesktop && <div className="w-[400px] flex-shrink-0 h-1" />}
        </div>
      </section>
    </div>
  );
};

export default Departments;
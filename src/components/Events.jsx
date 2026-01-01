import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- KINETIC TYPOGRAPHY (Slot Machine) ---
const AlternatingChar = ({ char, index, isHovered, isAccent }) => {
  const premiumEase = [0.6, 0.01, 0.05, 0.95];
  const isEven = index % 2 === 0;
  const targetY = isEven ? "-100%" : "100%";
  const cloneInitialY = isEven ? "100%" : "-100%";

  return (
    <span className="relative inline-block overflow-hidden h-[1.1em] leading-[1.1]">
      <motion.span
        animate={{ y: isHovered ? targetY : "0%" }}
        transition={{ duration: 0.8, ease: premiumEase }}
        className="block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
      <motion.span
        animate={{ y: isHovered ? "0%" : cloneInitialY }}
        transition={{ duration: 0.8, ease: premiumEase }}
        className="absolute inset-0 block"
        style={{ color: isAccent ? "var(--synapse-accent)" : "white" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
};

const Events = () => {
  const containerRef = useRef();
  const lineRef = useRef();

  // --- FASTER GSAP LOADING LOGIC ---
  useGSAP(() => {
    // Line grows as you scroll
    gsap.fromTo(lineRef.current, 
      { height: "0%" }, 
      { 
        height: "100%", 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 80%",
          scrub: 1.5
        }
      }
    );

    // Cards pop in much faster now
    gsap.utils.toArray(".event-dossier").forEach((card) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 30, filter: "blur(10px)" }, 
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 0.7, // Reduced from 1.5s to 0.7s
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%", // Card triggers as soon as it enters viewport
            once: true
          }
        }
      );
    });
  }, { scope: containerRef });

  const eventsData = [
    {
      id: "conclave",
      tag: "Inter-House Championship",
      title: "Capitol Conclave",
      brief: "An inter-house debate championship recreating historical assemblies and senates.",
      pillars: ["History", "Politics", "Philosophy", "Geography", "Heritage"],
      specs: [
        { label: "Format", val: "Inter-House (3 Members)" },
        { label: "Selection", val: "Intra House Group Discussions" }, // Long text
        { label: "Window", val: "Jan 05 - Jan 11" }
      ],
      regLink: "https://iitmparadox.org/events/32",
      rulesLink: "https://drive.google.com/file/d/1HThAjbnqFtMlbEjnRd31VMAW9rqWXopq/view",
      schedule: [
        { phase: "R1: Qualifying GD", date: "Jan 05", detail: "House Councils select 3-member teams." },
        { phase: "R2: Quarter-Finals", date: "Jan 08", detail: "1 v 1 Debates. Top 6 advance." },
        { phase: "R3: Semi-Finals", date: "Jan 09", detail: "Top 3 teams proceed to Finale." },
        { phase: "R4: Grand Finale", date: "Jan 11", detail: "Championship Triangular Debate." }
      ]
    },
    {
      id: "parliament",
      tag: "Simulated Forum",
      title: "Youth Parliament",
      brief: "A simulated parliamentary forum designed to encourage dialogue on public policy.",
      pillars: ["Governance", "Policy", "Leadership", "Diplomacy"],
      specs: [
        { label: "Format", val: "Solo Participation" },
        { label: "Rounds", val: "3 Phases" },
        { label: "Window", val: "Jan 08 - Jan 11" }
      ],
      regLink: "https://iitmparadox.org/events/31",
      rulesLink: "https://drive.google.com/file/d/1Z1GeilMajFXJb-vKTczqbsZdhcDL6VGQ/view",
      schedule: [
        { phase: "S1: Prelims", date: "Jan 08", detail: "Structured Group Discussions." },
        { phase: "S2: Simulation D1", date: "Jan 10", detail: "Parliamentary simulation Day 1." },
        { phase: "S2: Simulation D2", date: "Jan 11", detail: "Final parliamentary resolution." }
      ]
    }
  ];

  return (
    <section ref={containerRef} id="events" className="relative py-40 px-6 bg-transparent overflow-hidden">
      
      {/* SYNAPSE PATH (Hidden on mobile for cleaner view if desired, or kept) */}
      <div className="absolute left-6 md:left-20 top-40 bottom-40 w-[1px] bg-white/5">
        <div ref={lineRef} className="w-full bg-[#E2C17D] shadow-[0_0_20px_#E2C17D]" />
      </div>

      <div className="max-w-7xl mx-auto pl-8 md:pl-32">
        <div className="mb-24 md:mb-40">
          <p className="text-[#E2C17D] font-black tracking-[0.5em] uppercase text-[10px] mb-4">Current Directives</p>
          <h2 className="text-5xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none">
            Active <span className="text-[#E2C17D]">Events</span>
          </h2>
        </div>

        <div className="space-y-40 md:space-y-60">
          {eventsData.map((event) => (
            <div key={event.id} className="event-dossier relative w-full lg:w-11/12">
              
              {/* LIQUID BLACK GLASS DOSSIER */}
              <div className="relative p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] bg-[#030a1a]/80 border border-white/10 backdrop-blur-3xl shadow-2xl overflow-hidden">
                
                {/* GLASS CORNER PIECE */}
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 backdrop-blur-3xl rounded-bl-full border-b border-l border-white/10 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                  
                  {/* BRIEFING & ROADMAP */}
                  <div>
                    <span className="text-[#E2C17D] font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px] mb-3 md:mb-4 block">{event.tag}</span>
                    <h3 className="text-3xl md:text-6xl font-black text-white uppercase mb-6 md:mb-8 tracking-tighter">{event.title}</h3>
                    <p className="text-white/60 text-lg md:text-xl leading-relaxed italic mb-8 border-l-2 border-[#E2C17D]/30 pl-4 md:pl-6">"{event.brief}"</p>
                    
                    {/* ROADMAP TABLE */}
                    <div className="mt-8 md:mt-12 rounded-2xl md:rounded-3xl bg-white/5 border border-white/5 p-6 md:p-8">
                      <p className="text-[#E2C17D] text-[10px] font-black uppercase tracking-[0.3em] mb-6">Operational Roadmap</p>
                      <div className="space-y-6">
                        {event.schedule.map((s, i) => (
                          <div key={i} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-1 gap-2">
                              <span className="text-white font-bold text-xs uppercase tracking-wider">{s.phase}</span>
                              <span className="text-[#E2C17D] text-[9px] font-black whitespace-nowrap">{s.date}</span>
                            </div>
                            <p className="text-white/30 text-[10px] md:text-xs leading-relaxed">{s.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SPECS & ACTIONS (DE-CLUTTERED) */}
                  <div className="flex flex-col justify-between">
                    <div className="space-y-6 md:space-y-8">
                      {event.specs.map((spec, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-white/5 pb-3 md:pb-4">
                          {/* Label stays on top on mobile */}
                          <span className="text-white/20 uppercase font-black text-[8px] md:text-[9px] tracking-[0.2em] mb-1 md:mb-0">
                            {spec.label}
                          </span>
                          {/* Value gets full width to prevent clutter */}
                          <span className="text-white font-bold text-base md:text-lg leading-tight">
                            {spec.val}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 md:mt-16 space-y-4">
                      <a href={event.regLink} target="_blank" rel="noreferrer"
                        className="group relative block w-full py-5 md:py-6 rounded-[1.5rem] md:rounded-[2rem] bg-[#E2C17D] text-[#030a1a] font-black uppercase text-center tracking-[0.3em] text-[10px] md:text-xs overflow-hidden transition-transform active:scale-95"
                      >
                        <span className="relative z-10 w-full block">Initialize Registration</span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </a>

                      <a href={event.rulesLink} target="_blank" rel="noreferrer"
                        className="block w-full py-4 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 bg-white/5 text-white/40 font-black uppercase text-center tracking-[0.2em] text-[9px] hover:bg-white/10 hover:text-white transition-all"
                      >
                        Mission Protocol (PDF)
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- KINETIC TYPOGRAPHY ---
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

  useGSAP(() => {
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

    gsap.utils.toArray(".event-dossier").forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        x: -80,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
        }
      });
    });
  }, { scope: containerRef });

  const eventsData = [
    {
      id: "conclave",
      tag: "Inter-House Championship",
      title: "Capitol Conclave",
      brief: "An Inter-House Debate championship recreation of historical assemblies and senates. Participants engage in discourse across History, Politics, Philosophy, and Culture.",
      pillars: ["History", "Politics", "Philosophy", "Geography", "Heritage"],
      specs: [
        { label: "Format", val: "Inter-House (3 Members)" },
        { label: "Selection", val: "Intra House Group Discussions" },
        { label: "Window", val: "Jan 05 - Jan 11" }
      ],
      regLink: "https://iitmparadox.org/events/32",
      rulesLink: "https://drive.google.com/file/d/1HThAjbnqFtMlbEjnRd31VMAW9rqWXopq/view",
      schedule: [
        { phase: "R1: Qualifying GD", date: "Jan 05 | 02-07 PM", detail: "12 Houses compete. Councils select 3-member teams." },
        { phase: "R2: Quarter-Finals", date: "Jan 08 | 02-08 PM", detail: "1 v 1 Debates. Top 6 teams advance by score." },
        { phase: "R3: Semi-Finals", date: "Jan 09 | 10 AM-06 PM", detail: "1 v 1 Debates. Top 3 teams proceed to Finale." },
        { phase: "R4: Grand Finale", date: "Jan 11 | 07-09 PM", detail: "The Faceoff: Triangular debate for the Championship." }
      ]
    },
    {
      id: "parliament",
      tag: "Simulated Forum",
      title: "Youth Parliament",
      brief: "A simulated parliamentary forum designed to encourage informed dialogue on governance, public policy, and national issues.",
      pillars: ["Governance", "Policy", "Leadership", "Diplomacy"],
      specs: [
        { label: "Format", val: "Solo Participation" },
        { label: "Rounds", val: "3 Phases" },
        { label: "Window", val: "Jan 08 - Jan 11" }
      ],
      regLink: "https://iitmparadox.org/events/31",
      rulesLink: "https://drive.google.com/file/d/1Z1GeilMajFXJb-vKTczqbsZdhcDL6VGQ/view",
      schedule: [
        { phase: "S1: Prelims", date: "Jan 08 | 06-08 PM", detail: "Structured Group Discussions on Governance." },
        { phase: "S2: Simulation D1", date: "Jan 10 | 06-08 PM", detail: "Full-scale parliamentary simulation." },
        { phase: "S2: Simulation D2", date: "Jan 11 | 04-06 PM", detail: "Final parliamentary resolution day." }
      ]
    }
  ];

  return (
    <section ref={containerRef} id="events" className="relative py-60 px-6 bg-transparent overflow-hidden">
      
      {/* SYNAPSE PATH */}
      <div className="absolute left-10 md:left-20 top-40 bottom-40 w-[1px] bg-white/5">
        <div ref={lineRef} className="w-full bg-[#E2C17D] shadow-[0_0_20px_#E2C17D]" />
      </div>

      <div className="max-w-7xl mx-auto pl-12 md:pl-32">
        <div className="mb-40">
          <p className="text-[#E2C17D] font-black tracking-[0.5em] uppercase text-xs mb-4">Current Directives</p>
          <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none">
            Active <span className="text-[#E2C17D]">Events</span>
          </h2>
        </div>

        <div className="space-y-60">
          {eventsData.map((event) => (
            <div key={event.id} className="event-dossier relative w-full lg:w-11/12">
              <div className="relative p-8 md:p-16 rounded-[4rem] bg-[#030a1a]/80 border border-white/10 backdrop-blur-3xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 backdrop-blur-3xl rounded-bl-full border-b border-l border-white/10" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                  
                  {/* BRIEFING & ROADMAP */}
                  <div>
                    <span className="text-[#E2C17D] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">{event.tag}</span>
                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase mb-8 tracking-tighter">{event.title}</h3>
                    <p className="text-white/60 text-xl leading-relaxed italic mb-10 border-l-2 border-[#E2C17D]/30 pl-6">"{event.brief}"</p>
                    
                    {/* ENHANCED ROADMAP TABLE */}
                    <div className="mt-12 rounded-3xl bg-white/5 border border-white/5 p-8 overflow-hidden">
                      <p className="text-[#E2C17D] text-[10px] font-black uppercase tracking-[0.3em] mb-6">Operational Roadmap</p>
                      <div className="space-y-6">
                        {event.schedule.map((s, i) => (
                          <div key={i} className="group/item relative pb-6 border-b border-white/5 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-white font-bold text-sm uppercase tracking-wider">{s.phase}</span>
                              <span className="text-[#E2C17D] text-[10px] font-black">{s.date}</span>
                            </div>
                            <p className="text-white/30 text-xs leading-relaxed group-hover/item:text-white/60 transition-colors">{s.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SPECS & ACTIONS */}
                  <div className="flex flex-col justify-between">
                    <div className="space-y-6">
                      {event.specs.map((spec, i) => (
                        <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                          <span className="text-white/40 uppercase font-black text-[9px] tracking-[0.2em]">{spec.label}</span>
                          <span className="text-white font-bold text-lg">{spec.val}</span>
                        </div>
                      ))}
                      <p className="text-[16px] text-white/40 italic leading-tight mt-4">
                        * Note: Contact us at culturalstudy.society@study.iitm.ac.in for any clarifications regarding event details.
                      </p>
                    </div>

                    <div className="mt-16 space-y-4">
                      <a href={event.regLink} target="_blank" rel="noreferrer"
                        className="group relative block w-full py-6 rounded-[2rem] bg-[#E2C17D] text-[#030a1a] font-black uppercase text-center tracking-[0.3em] text-xs overflow-hidden transition-transform active:scale-95 shadow-[0_0_30px_rgba(226,193,125,0.2)]"
                      >
                        <span className="relative z-10 text-center w-full block">Initialize Registration</span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </a>

                      <a href={event.rulesLink} target="_blank" rel="noreferrer"
                        className="block w-full py-4 rounded-[2rem] border border-white/10 bg-white/5 text-white/40 font-black uppercase text-center tracking-[0.2em] text-[9px] hover:bg-white/10 hover:text-white transition-all"
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
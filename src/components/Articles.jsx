import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { InertiaPlugin } from "gsap/InertiaPlugin"; 

gsap.registerPlugin(InertiaPlugin);

const Articles = () => {
  const container = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const finalists = [
    { 
      name: "Sagnik Chakraborty", 
      state: "WEST BENGAL", 
      img: "/images/sagnik-indo.jpg", 
      desc: "Winner Sagnik Chakraborty unfolds a narrative of rich history and cultural prowess.", 
      link: "#",
      glowColor: "rgba(226, 193, 125, 0.5)", 
      borderColor: "#E2C17D" // GOLD
    },
    { 
      name: "Agamani Paul", 
      state: "WEST BENGAL", 
      img: "/images/agamani-indo.jpg", 
      desc: "Agamani Paul delved into history and intellectual prowess of West Bengal.", 
      link: "#",
      glowColor: "rgba(192, 192, 192, 0.5)",
      borderColor: "#C0C0C0" // SILVER
    },
    { 
      name: "P Umesh Kannan", 
      state: "TAMIL NADU", 
      img: "/images/umesh-indo.jpg", 
      desc:"P Umesh Kannan described Tamil Nadu as a cradle of Dravidian culture.", 
      link: "#",
      glowColor: "rgba(184, 115, 51, 0.5)",
      borderColor: "#B87333" // COPPER
    }
  ];

  const premiumEase = [0.6, 0.01, 0.05, 0.95];

  // --- SLOT MACHINE CHARACTER COMPONENT ---
  const AlternatingChar = ({ char, index, isAccent }) => {
    const isEven = index % 2 === 0; //
    const targetY = isEven ? "-100%" : "100%"; //
    const cloneInitialY = isEven ? "100%" : "-100%"; //

    return (
      <span 
        className="relative inline-block overflow-hidden h-[1.1em] leading-[1.1]" 
        style={{ color: isAccent ? "var(--synapse-accent)" : "white" }}
      >
        <motion.span
          variants={{ initial: { y: "0%" }, animate: { y: targetY } }}
          transition={{ duration: 0.9, ease: premiumEase }}
          className="block"
        >
          {char}
        </motion.span>
        <motion.span
          variants={{ initial: { y: cloneInitialY }, animate: { y: "0%" } }}
          transition={{ duration: 0.9, ease: premiumEase }}
          className="absolute inset-0 block"
        >
          {char}
        </motion.span>
      </span>
    );
  };

  // --- INERTIA & DYNAMIC BORDER LOGIC ---
  useGSAP(() => {
    if (isMobile) return;

    let oldX = 0, oldY = 0;
    let deltaX = 0, deltaY = 0;

    const handleMouseMove = (e) => {
      deltaX = e.clientX - oldX; //
      deltaY = e.clientY - oldY; //
      oldX = e.clientX;
      oldY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const cards = gsap.utils.toArray(".article-card");
    
    cards.forEach((card, index) => {
      const colors = finalists[index];

      card.addEventListener("mouseenter", () => {
        const tl = gsap.timeline({ onComplete: () => tl.kill() });
        tl.timeScale(1.6); 

        // Distinctive Inertia Movement
        tl.to(card, {
          inertia: {
            x: { velocity: deltaX * 60, end: 0 },
            y: { velocity: deltaY * 60, end: 0 }
          },
          zIndex: 100,
        }, 0);

        // Snappy Rotation
        tl.fromTo(card, { rotate: 0 }, {
          duration: 0.4,
          rotate: (Math.random() - 0.5) * 30,
          yoyo: true, 
          repeat: 1,
          ease: "back.out(2)"
        }, 0);

        // Dynamic Metallic Glow
        gsap.to(card, {
          borderColor: colors.borderColor,
          boxShadow: `0 20px 50px -10px rgba(0,0,0,0.5), 0 0 30px ${colors.glowColor}, inset 0 0 20px ${colors.glowColor}`,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, { 
          zIndex: 1, 
          duration: 0.3,
          borderColor: "rgba(255, 255, 255, 0.05)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        });
      });
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: container, dependencies: [isMobile] });

  return (
    <section id="articles" ref={container} className="py-40 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- SLOT MACHINE HEADER --- */}
        <div className="text-center mb-32">
          <motion.h1
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.03 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-white flex justify-center flex-wrap gap-x-4 md:gap-x-8 mb-6"
          >
            {["Members'", "Articles"].map((word, wordIdx) => (
              <span key={wordIdx} className="flex flex-nowrap">
                {word.split("").map((char, charIdx) => (
                  <AlternatingChar 
                    key={charIdx} 
                    char={char} 
                    index={charIdx} 
                    isAccent={word === "Articles"} 
                  />
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.005, delayChildren: 0.5 }}
            className="text-white/40 text-lg md:text-xl leading-relaxed font-medium flex flex-wrap justify-center"
          >
            {"Top 3 Articles by Indo-Mosaic winners.".split(" ").map((word, wordIdx) => (
              <span key={wordIdx} className="flex flex-nowrap mr-2">
                {word.split("").map((char, charIdx) => (
                  <AlternatingChar key={charIdx} char={char} index={charIdx + wordIdx} />
                ))}
              </span>
            ))}
          </motion.p>
        </div>

        {/* --- DYNAMIC ARTICLE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {finalists.map((article, index) => (
            <div 
              key={index}
              className="article-card group relative flex flex-col p-8 rounded-[3.5rem] bg-[#030a1a]/80 border border-white/10 backdrop-blur-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 will-change-transform"
            >
              <div className="w-full h-64 rounded-[2.5rem] overflow-hidden mb-8 relative pointer-events-none">
                <img 
                  src={article.img} 
                  alt={article.name} 
                  className="w-full h-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100" 
                />
              </div>

              <div className="flex flex-col flex-1 pointer-events-none">
                <h4 className="text-2xl font-bold text-white mb-4">By {article.name}</h4>
                <p className="text-white/40 leading-relaxed text-sm italic mb-8 flex-1">
                  "{article.desc}"
                </p>
                <div className="relative flex items-center justify-center py-4 px-8 rounded-full border border-white/10 bg-white/5 text-white font-black text-[10px] tracking-[0.2em] overflow-hidden">
                  <span className="relative z-10 uppercase">Read Article</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
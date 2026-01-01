import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
        transition={{ duration: 1.0, ease: premiumEase }}
        className="block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
      <motion.span
        animate={{ y: isHovered ? "0%" : cloneInitialY }}
        transition={{ duration: 1.0, ease: premiumEase }}
        className="absolute inset-0 block"
        style={{ color: isAccent ? "var(--synapse-accent)" : "white" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
};

// --- SNOWMAN COMPONENT ---
const WavingSnowman = ({ className, delay = 0, isHoldingHands = false, side = "left" }) => {
  const armAnimation = isHoldingHands ? { rotate: side === "left" ? 45 : -45 } : { rotate: [0, -25, 0] };
  return (
    <div className={className}>
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="90" r="30" fill="white" fillOpacity="0.95" />
        <circle cx="50" cy="45" r="20" fill="white" fillOpacity="0.95" />
        <circle cx="43" cy="40" r="3" fill="#030a1a" />
        <circle cx="57" cy="40" r="3" fill="#030a1a" />
        <path d="M48 50 L52 50 L50 60 Z" fill="#fb923c" />
        <motion.line
          x1="30" y1="50" x2="10" y2="35"
          stroke="#4a2c1d" strokeWidth="4" strokeLinecap="round"
          animate={armAnimation}
          transition={isHoldingHands ? { duration: 1 } : { repeat: Infinity, duration: 2, ease: "easeInOut", delay }}
          style={{ originX: "30px", originY: "50px" }}
        />
        <line x1="70" y1="50" x2="90" y2="60" stroke="#4a2c1d" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
};

const Senate = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef();
  const canvasRef = useRef(null);
  const sparkleCanvasRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end end"] });
  const sparkleOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  const members = [
    { id: 1, name: "Shubh Ghiya", role: "Secretary", img: "/images/Shubh.jpeg", email: "23f2002762@ds.study.iitm.ac.in", tier: "top" },
    { id: 2, name: "Shamanth V", role: "Deputy Secretary", img: "/images/Shamanth.jpg", email: "23f2004250@ds.study.iitm.ac.in", tier: "top" },
    { id: 3, name: "Ridhi Sehgal", role: "Content Head", img: "/images/Ridhi.png", email: "24F2008371@ds.study.iitm.ac.in", tier: "general" },
    { id: 4, name: "Sayam Kala", role: "Strabo Head", img: "/images/Sayam.jpeg", email: "25F2003474@ds.study.iitm.ac.in", tier: "general" },
    { id: 5, name: "Subham Sharma", role: "Aristotle Head", img: "/images/Subham.jpg", email: "24f1000512@ds.study.iitm.ac.in", tier: "general" },
    { id: 6, name: "Gunjan Soni", role: "Panini Head", img: "/images/Gunjan.jpg", email: "23f2004656@ds.study.iitm.ac.in", tier: "general" },
    { id: 7, name: "Jeshvanth Kumar", role: "Kumarila Bhatta Head", img: "/images/Jeshvanth.jpeg", email: "24f2001377@ds.study.iitm.ac.in", tier: "general" },
    { id: 8, name: "Dibyanshu Kumar", role: "Kalhana Head", img: "/images/Dibyanshu.jpeg", email: "24f1000785@ds.study.iitm.ac.in", tier: "general" },
    { id: 9, name: "Diya Ajay Antony", role: "Aristotle Deputy", img: "/images/Diya.jpeg", email: "24F2007162@ds.study.iitm.ac.in", tier: "general" },
    { id: 10, name: "Pratik Kumar", role: "Panini Deputy", img: "/images/Pratik.jpeg", email: "24f2005917@ds.study.iitm.ac.in", tier: "general" },
    { id: 11, name: "Nithyashree DN", role: "Content Deputy", img: "/images/Nithyashree.jpeg", email: "24F3001893@ds.study.iitm.ac.in", tier: "general" },
    { id: 12, name: "Rishi Ranjan Borah", role: "Volunteer Content", img: "/images/Rishi.jpeg", email: "25F2000964@ds.study.iitm.ac.in", tier: "general" },
    { id: 13, name: "Samriddhi Kashyap", role: "Web-Admin", img: "/images/samriddhi.jpg", email: "23f1001623@ds.study.iitm.ac.in", tier: "founding" },
    { id: 14, name: "Ayush Khade", role: "Ex-Secretary", img: "/images/Ayush.jpg", email: "24f3100265@es.study.iitm.ac.in", tier: "founding" },
    { id: 15, name: "Vighnesh Mishra", role: "Ex-Gen Secretary", img: "/images/vignesh.jpg", email: "22f3001240@ds.study.iitm.ac.in", tier: "founding" },
    { id: 16, name: "Krishnan Lakshmi", role: "Ex-Web-Admin", img: "/images/keshava.jpg", email: "22f3002565@ds.study.iitm.ac.in", tier: "founding" },
  ];

  useGSAP(() => {
    gsap.utils.toArray(".member-img-wrap").forEach((wrap) => {
      gsap.fromTo(wrap, { clipPath: "inset(0% 50% 0% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", scrollTrigger: { trigger: wrap, start: "top 90%", once: true } });
    });
  }, { scope: containerRef });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const canvas = canvasRef.current;
    const sCanvas = sparkleCanvasRef.current;
    if (!canvas || !sCanvas) return;
    const ctx = canvas.getContext("2d");
    const sCtx = sCanvas.getContext("2d");
    canvas.width = window.innerWidth; canvas.height = 180;
    sCanvas.width = window.innerWidth; sCanvas.height = 250;
    const drifts = Array.from({ length: 40 }, () => ({ x: Math.random() * canvas.width, y: canvas.height, r: Math.random() * 50 + 30, phase: Math.random() * Math.PI * 2 }));
    const sparkles = Array.from({ length: 60 }, () => ({ x: Math.random() * sCanvas.width, y: Math.random() * sCanvas.height, size: Math.random() * 2 + 1, speed: Math.random() * 0.05 + 0.01 }));
    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      drifts.forEach(d => { const sway = Math.sin(time * 0.001 + d.phase) * 15; ctx.beginPath(); ctx.arc(d.x + sway, canvas.height + 20, d.r, 0, Math.PI, true); ctx.fill(); });
      sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);
      sparkles.forEach(s => { const op = (Math.sin(time * s.speed) + 1) / 2; sCtx.fillStyle = `rgba(226, 193, 125, ${op})`; sCtx.beginPath(); sCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2); sCtx.fill(); });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCopyEmail = (e, email, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const SenateCard = ({ member }) => {
    const cardRef = useRef(null);
    const handleMouseMove = (e) => {
      setHoveredIndex(member.id);
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * 8; // Slightly reduced for smoothness
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * -8;
      gsap.to(cardRef.current.querySelector('.inner-card'), { rotationX: rotateX, rotationY: rotateY, scale: 1.03, duration: 0.6, ease: "power2.out" });
    };

    return (
      <div 
        ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => setHoveredIndex(null)}
        className={`relative w-full sm:w-[260px] aspect-[4/5] transition-all duration-[800ms] cubic-bezier(0.4, 0, 0.2, 1)
          ${hoveredIndex !== null && hoveredIndex !== member.id ? 'opacity-20 blur-[5px] scale-95' : 'opacity-100 scale-100'}
        `}
      >
        <div className="inner-card h-full w-full rounded-[2.5rem] overflow-hidden relative border border-white/10 bg-[#030a1a] shadow-2xl z-10" style={{ transformStyle: "preserve-3d" }}>
          <div className="member-img-wrap absolute inset-0 w-full h-full overflow-hidden">
            <img src={member.img} className="w-full h-full object-cover" alt={member.name} />
          </div>

          {/* --- LIQUID GLASS (WHITE) QUARTER CIRCLE --- */}
          <AnimatePresence>
            {hoveredIndex === member.id && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.7, scale: 1 }} // This keeps it more translucent
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-0 right-0 w-20 h-20 z-30 origin-top-right"
              >
                {/* Deep Liquid Black Glass Layer */}
                <div className="absolute inset-0 bg-[#030a1a]/60 backdrop-blur-2xl rounded-bl-[100%] border-b border-l border-white/10 shadow-[inset_0_0_30px_rgba(0,0,0,0.8),0_5px_15px_rgba(0,0,0,0.5)]"></div>
                <button 
                  onClick={(e) => handleCopyEmail(e, member.email, member.id)}
                  className="absolute top-4 right-4 group/btn flex items-center justify-end"
                >
                  {copiedId === member.id ? (
                    <span className="text-[9px] font-black text-[#030a1a] bg-[#E2C17D] px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">Copied</span>
                  ) : (
                    <svg className="text-[#E2C17D] drop-shadow-[0_2px_10px_rgba(226,193,125,0.4)] transition-transform duration-500 group-hover/btn:scale-110" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-[#030a1a] via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-0 left-0 w-full p-6" style={{ transform: "translateZ(60px)" }}>
            <motion.div transition={{ staggerChildren: 0.05 }} className="flex flex-wrap mb-1">
              {member.name.split("").map((c, i) => (
                <AlternatingChar key={i} char={c} index={i} isHovered={hoveredIndex === member.id} isAccent={false} />
              ))}
            </motion.div>
            <p className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#E2C17D] text-[8px] font-black uppercase tracking-[0.15em] border border-white/5">
              {member.role}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={containerRef} id="senate" className="relative py-40 px-6 bg-[#020a1a] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-32">
           <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter flex justify-center flex-wrap gap-x-6">
              {["The", "Senate"].map((word, wordIdx) => (
                <span key={wordIdx} className="flex flex-nowrap">
                  {word.split("").map((char, charIdx) => (
                    <AlternatingChar key={charIdx} char={char} index={charIdx} isHovered={true} isAccent={word === "Senate"} />
                  ))}
                </span>
              ))}
           </h2>
        </div>

        <div className="space-y-32">
          <div className="flex flex-wrap justify-center gap-10">
            {members.filter(m => m.tier === "top").map(m => <SenateCard key={m.id} member={m} />)}
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {members.filter(m => m.tier === "general").map(m => <SenateCard key={m.id} member={m} />)}
          </div>
          <div className="pt-20">
            <h4 className="text-center text-xl font-black uppercase tracking-[0.4em] mb-12 text-[#E2C17D]/60">Founding Custodians</h4>
            <div className="flex flex-wrap justify-center gap-8">
              {members.filter(m => m.tier === "founding").map(m => <SenateCard key={m.id} member={m} />)}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[250px] pointer-events-none z-[80]">
        <motion.canvas ref={sparkleCanvasRef} style={{ opacity: sparkleOpacity }} className="absolute bottom-10 left-0 w-full z-[3]" />
        <canvas ref={canvasRef} className="absolute bottom-0 left-0 w-full z-[1]" style={{ filter: "blur(14px)" }} />
        <WavingSnowman className={`absolute bottom-[-10px] z-[4] transition-all duration-1000 ${isMobile ? 'left-[calc(50%-55px)] w-24' : 'left-10 md:left-32 w-24 md:w-44'}`} isHoldingHands={isMobile} side="left" />
        <WavingSnowman className={`absolute bottom-[-10px] z-[4] transition-all duration-1000 ${isMobile ? 'right-[calc(50%-55px)] w-24 scale-x-[-1]' : 'right-10 md:right-32 w-24 md:w-44 scale-x-[-1]'}`} delay={0.7} isHoldingHands={isMobile} side="right" />
      </div>
    </section>
  );
};

export default Senate;
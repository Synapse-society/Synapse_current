import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// --- THE WAVING SNOWMAN COMPONENT ---
const WavingSnowman = ({ className, delay = 0 }) => (
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
        animate={{ rotate: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay }}
        style={{ originX: "30px", originY: "50px" }}
      />
      <line x1="70" y1="50" x2="90" y2="60" stroke="#4a2c1d" strokeWidth="4" strokeLinecap="round" />
    </svg>
  </div>
);

const Senate = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const container = useRef();
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);

  const members = [
    { id: 1, name: "Shubh Ghiya", role: "Secretary", img: "/images/Shubh.jpeg", email: "23f2002762@ds.study.iitm.ac.in", tier: "top" },
    { id: 2, name: "Shamanth V", role: "Deputy Secretary", img: "/images/Shamanth.jpg", email: "23f2004250@ds.study.iitm.ac.in", tier: "top" },
    { id: 3, name: "Ridhi Sehgal", role: "Content Team Head", img: "/images/Ridhi.png", email: "24F2008371@ds.study.iitm.ac.in", tier: "general" },
    { id: 4, name: "Sayam Kala", role: "Strabo Department Head", img: "/images/Sayam.jpeg", email: "25F2003474@ds.study.iitm.ac.in", tier: "general" },
    { id: 5, name: "Subham Sharma", role: "Aristotle Department Head", img: "/images/Subham.jpg", email: "24f1000512@ds.study.iitm.ac.in", tier: "general" },
    { id: 6, name: "Gunjan Soni", role: "Panini Department Head", img: "/images/Gunjan.png", email: "23f2004656@ds.study.iitm.ac.in", tier: "general" },
    { id: 7, name: "Jeshvanth Kumar P K", role: "Kumarila Bhatta Department Head", img: "/images/Jeshvanth.jpeg", email: "24f2001377@ds.study.iitm.ac.in", tier: "general" },
    { id: 8, name: "Dibyanshu Kumar", role: "Kalhana Department Head", img: "/images/Dibyanshu.jpeg", email: "24f1000785@ds.study.iitm.ac.in", tier: "general" },
    { id: 9, name: "Diya Ajay Antony", role: "Aristotle Deputy Head", img: "/images/Diya.jpeg", email: "24F2007162@ds.study.iitm.ac.in", tier: "general" },
    { id: 10, name: "Pratik Kumar Srivastav", role: "Panini Deputy Head", img: "/images/Pratik.jpeg", email: "24f2005917@ds.study.iitm.ac.in", tier: "general" },
    { id: 11, name: "Nithyashree DN", role: "Content Deputy Head", img: "/images/Nithyashree.jpeg", email: "24F3001893@ds.study.iitm.ac.in", tier: "general" },
    { id: 12, name: "Rishi Ranjan Borah", role: "Volunteer Content Team", img: "/images/Rishi.jpeg", email: "25F2000964@ds.study.iitm.ac.in", tier: "general" },
    
    { id: 13, name: "Ayush Khade", role: "Ex - Secretary", img: "/images/Ayush.jpg", email: "24f3100265@es.study.iitm.ac.in", tier: "founding" },
    { id: 14, name: "Samriddhi Kashyap", role: "Web-Admin & Ex-Sec", img: "/images/samriddhi.jpg", email: "23f1001623@ds.study.iitm.ac.in", tier: "founding" },
    { id: 15, name: "Vighnesh Mishra", role: "Founder and Ex-General Secretary", img: "/images/vignesh.jpg", email: "22f3001240@ds.study.iitm.ac.in", tier: "founding" },
    { id: 16, name: "Krishnan Lakshmi Narayan", role: "Founder and Ex-Web-Admin", img: "/images/keshava.jpg", email: "22f3002565@ds.study.iitm.ac.in", tier: "founding" },
  ];

  const topTier = members.filter(m => m.tier === "top");
  const generalTier = members.filter(m => m.tier === "general");
  const foundingTier = members.filter(m => m.tier === "founding");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 180;

    const drawPile = () => {
      if (Math.random() > 0.8) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)"; 
        ctx.beginPath();
        const x = Math.random() * canvas.width;
        const radius = Math.random() * 80 + 40;
        ctx.arc(x, canvas.height, radius, 0, Math.PI, true);
        ctx.fill();
      }
      requestAnimationFrame(drawPile);
    };
    drawPile();
  }, []);

  const handleMouseMove = (e, id) => {
    setHoveredIndex(id);
    const card = cardRefs.current[id];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 18; 
    const rotateY = ((x - centerX) / centerX) * -18;

    gsap.to(card.querySelector('.senate-card-inner'), {
      rotationX: rotateX, rotationY: rotateY, scale: 1.05,
      duration: 0.8, ease: "power1.out", overwrite: "auto"
    });
  };

  const handleMouseLeave = (id) => {
    setHoveredIndex(null);
    const card = cardRefs.current[id];
    gsap.to(card.querySelector('.senate-card-inner'), {
      rotationX: 0, rotationY: 0, scale: 1, duration: 1.2, ease: "power3.inOut"
    });
  };

  const handleCopyEmail = (e, email, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

    const SenateCard = ({ member }) => (
      <div 
        ref={el => cardRefs.current[member.id] = el}
        className={`senate-card-container relative w-full sm:w-[280px] aspect-[4/5] transition-all duration-1000 ease-in-out
          ${hoveredIndex !== null && hoveredIndex !== member.id ? 'blur-md opacity-20 grayscale' : 'opacity-100'}
        `}
        onMouseMove={(e) => handleMouseMove(e, member.id)}
        onMouseLeave={() => handleMouseLeave(member.id)}
      >
        <div className={`absolute -inset-[2px] rounded-[3rem] overflow-hidden transition-opacity duration-700 ${hoveredIndex === member.id ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,#E2C17D_360deg)] animate-[spin_4s_linear_infinite]" />
        </div>

        <div className="senate-card-inner h-full w-full rounded-[3rem] overflow-hidden relative border border-white/10 bg-[#030a1a] shadow-2xl z-10" style={{ transformStyle: "preserve-3d" }}>
          
          <img src={member.img} className="absolute inset-0 w-full h-full object-cover opacity-100" alt={member.name} />
          
          <button 
            onClick={(e) => handleCopyEmail(e, member.email, member.id)}
            className="absolute top-0 right-0 w-24 h-24 z-30 group"
            style={{ transform: "translateZ(60px)" }}
          >
            <div className={`absolute inset-0 rounded-bl-full transition-all duration-[1200ms] ease-in-out
              ${hoveredIndex === member.id ? 'bg-[#E2C17D]/20 backdrop-blur-xl opacity-100' : 'bg-transparent opacity-0'}
            `} />
            <div className="relative z-10 w-full h-full flex items-center justify-center -translate-y-2 translate-x-2">
              {copiedId === member.id ? (
                <span className="text-[9px] font-black text-[#030a1a] bg-[#E2C17D] px-2 py-1 rounded-full uppercase">Copied</span>
              ) : (
                <svg className={`transition-colors duration-700 ${hoveredIndex === member.id ? 'text-white' : 'text-[#E2C17D]'}`} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              )}
            </div>
          </button>

          <div className="absolute inset-0 bg-gradient-to-t from-[#030a1a] via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start" style={{ transform: "translateZ(50px)" }}>
            {/* Name now appears first */}
            <h3 className="text-xl font-bold tracking-tight text-white mb-3">{member.name}</h3>
            
            {/* Role now appears second (below the name) */}
            <p className="inline-block px-4 py-1.5 rounded-full bg-(--synapse-accent)/20 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.15em] shadow-sm transition-all duration-700">
              {member.role}
            </p>
          </div>
        </div>
      </div>
    );
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <section id="senate" ref={container} className="relative py-40 px-6 overflow-hidden bg-transparent">
        <div className={`fixed inset-0 bg-[#020a1a] z-[60] transition-opacity duration-1000 ease-in-out pointer-events-none ${hoveredIndex !== null ? 'opacity-90 backdrop-blur-3xl' : 'opacity-0'}`} />
        
        <div className="max-w-7xl mx-auto relative z-[70]">
          <h2 className="text-6xl md:text-8xl font-black text-center mb-32 tracking-tighter text-white">
            The <span style={{ color: "var(--synapse-accent)" }}>Senate</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-12 mb-20">
            {topTier.map(member => <SenateCard key={member.id} member={member} />)}
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-10 mb-40">
            {generalTier.map(member => <SenateCard key={member.id} member={member} />)}
          </div>

          <div className="mt-32">
            <h4 style={{ color: "var(--synapse-accent)" }} className="text-center text-2xl font-black uppercase tracking-[0.4em] mb-16 opacity-80">
              Founding Members
            </h4>
            <div className="flex flex-wrap justify-center gap-8 md:gap-10 mb-40">
              {foundingTier.map(member => <SenateCard key={member.id} member={member} />)}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[180px] pointer-events-none z-[80]">
          <canvas ref={canvasRef} className="absolute bottom-0 left-0 w-full z-[1]" style={{ filter: "blur(14px)" }} />
          <WavingSnowman className="absolute bottom-[-10px] left-10 md:left-32 w-24 md:w-44 z-[2]" />
          <WavingSnowman className="absolute bottom-[-10px] right-10 md:right-32 w-24 md:w-44 z-[2] scale-x-[-1]" delay={0.7} />
        </div>
      </section>
    </motion.div>
  );
};

export default Senate;
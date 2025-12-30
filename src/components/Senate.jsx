import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

/* ---------------- WAVING SNOWMAN ---------------- */

const WavingSnowman = ({ className, delay = 0 }) => (
  <div className={className}>
    <svg viewBox="0 0 100 120" className="w-full h-full">
      <circle cx="50" cy="90" r="30" fill="white" fillOpacity="0.95" />
      <circle cx="50" cy="45" r="20" fill="white" fillOpacity="0.95" />
      <circle cx="43" cy="40" r="3" fill="#030a1a" />
      <circle cx="57" cy="40" r="3" fill="#030a1a" />
      <path d="M48 50 L52 50 L50 60 Z" fill="#fb923c" />
      <motion.line
        x1="30"
        y1="50"
        x2="10"
        y2="35"
        stroke="#4a2c1d"
        strokeWidth="4"
        strokeLinecap="round"
        animate={{ rotate: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay }}
        style={{ originX: "30px", originY: "50px" }}
      />
      <line x1="70" y1="50" x2="90" y2="60" stroke="#4a2c1d" strokeWidth="4" strokeLinecap="round" />
    </svg>
  </div>
);

/* ---------------- SENATE ---------------- */

const Senate = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
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
  ];

  const topTier = members.filter(m => m.tier === "top");
  const generalTier = members.filter(m => m.tier === "general");

  /* ---------------- SNOW STACKING ---------------- */

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const DPR = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = 180 * DPR;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = "180px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const piles = Array.from({ length: Math.floor(window.innerWidth / 120) }, (_, i) => ({
      x: i * 120 + Math.random() * 40,
      h: Math.random() * 12 + 8,
      max: Math.random() * 40 + 35,
      g: Math.random() * 0.025 + 0.01,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      piles.forEach(p => {
        if (p.h < p.max) p.h += p.g;
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.beginPath();
        ctx.moveTo(p.x - 70, canvas.height);
        ctx.quadraticCurveTo(p.x, canvas.height - p.h, p.x + 70, canvas.height);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ---------------- CARD INTERACTION ---------------- */

  const handleMove = (e, id) => {
    setHoveredIndex(id);
    const card = cardRefs.current[id];
    const r = card.getBoundingClientRect();

    gsap.to(card.querySelector(".inner"), {
      rotationX: ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 16,
      rotationY: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * -16,
      scale: 1.04,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handleLeave = id => {
    setHoveredIndex(null);
    gsap.to(cardRefs.current[id].querySelector(".inner"), {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out",
    });
  };

  const copyEmail = (e, email, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const Card = ({ m }) => (
    <div
      ref={el => (cardRefs.current[m.id] = el)}
      onMouseMove={e => handleMove(e, m.id)}
      onMouseLeave={() => handleLeave(m.id)}
      className={`relative w-[280px] aspect-[4/5] transition-all
        ${hoveredIndex && hoveredIndex !== m.id ? "blur-md opacity-20" : ""}`}
    >
      <div className="inner relative h-full w-full rounded-[3rem] overflow-hidden bg-[#030a1a] border border-white/10 shadow-2xl">
        <img
          src={m.img}
          alt={m.name}
          className="absolute inset-0 w-full h-full object-cover saturate-110 contrast-110 opacity-80"
        />

        {/* -------- LIQUID GLASS EMAIL (ACCENT HOVER) -------- */}
        <button
          onClick={e => copyEmail(e, m.email, m.id)}
          className="absolute top-0 right-0 w-16 h-16 z-20 group"
        >
          <div
            className="
              relative w-full h-full
              rounded-bl-[2.2rem]
              overflow-hidden
              backdrop-blur-xl
              bg-white/10
              border border-white/20
            "
          >
            {/* liquid fill */}
            <div
              className="
                absolute inset-0
                bg-[var(--synapse-accent)]
                translate-y-full
                group-hover:translate-y-0
                transition-transform
                duration-[850ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
              "
            />

            {/* highlight */}
            <div className="
              absolute inset-0
              bg-gradient-to-br
              from-white/30 via-transparent to-transparent
              pointer-events-none
            " />

            {/* icon */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {copiedId === m.id ? (
                <span className="text-[9px] font-black text-[#030a1a] bg-white px-2 py-1 rounded-full">
                  COPIED
                </span>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="
                    text-white
                    transition-colors duration-300
                    group-hover:text-[#030a1a]
                  "
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              )}
            </div>
          </div>
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030a1a]/90 via-[#030a1a]/40 to-transparent" />

        {/* ROLE + NAME */}
        <div className="absolute bottom-0 left-0 p-8">
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-[var(--synapse-accent)]
            "
          >
            {m.role}
          </p>
          <h3 className="text-xl font-bold text-white">{m.name}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-40 px-6 overflow-hidden">
      <h2 className="text-6xl md:text-8xl font-black text-center mb-32 text-white">
        The <span className="text-[var(--synapse-accent)]">Senate</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-12 mb-20">
        {topTier.map(m => <Card key={m.id} m={m} />)}
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-40">
        {generalTier.map(m => <Card key={m.id} m={m} />)}
      </div>

      {/* SNOW BASE */}
      <div className="absolute bottom-0 left-0 w-full h-[180px] pointer-events-none">
        <canvas ref={canvasRef} className="absolute bottom-0 left-0 w-full blur-xl" />
        <WavingSnowman className="absolute bottom-[-10px] left-16 w-32" />
        <WavingSnowman className="absolute bottom-[-10px] right-16 w-32 scale-x-[-1]" delay={0.7} />
      </div>
    </section>
  );
};

export default Senate;

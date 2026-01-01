import React, { useRef, useEffect, useState } from "react"; 
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

// --- HOLIDAY SNOW OVERLAY COMPONENT ---
const HolidayOverlay = ({ type, opacity }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = type === "snow" ? 150 : 40; 

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height; 
        this.size = Math.random() * (type === "snow" ? 1.5 : 3) + 1;
        this.speedY = type === "snow" ? Math.random() * 0.6 + 0.2 : Math.random() * -5 - 2;
        this.speedX = (Math.random() - 0.5) * (type === "snow" ? 0.4 : 3);
        this.color = type === "snow" ? "white" : `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.alpha = type === "snow" ? Math.random() * 0.5 + 0.2 : 1;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (type === "snow" && this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        if (type === "snow") {
          ctx.shadowBlur = 4;
          ctx.shadowColor = "white";
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [type]);

  return (
    <motion.canvas
      ref={canvasRef}
      style={{ opacity }}
      className="absolute inset-0 z-[5] pointer-events-none will-change-opacity"
    />
  );
};

// --- MAIN HERO COMPONENT ---
const Hero = () => {
  const containerRef = useRef(null); 
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics for the scroll feel
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scaling and Opacity transforms
  const videoScale = useTransform(smoothScroll, [0, 0.8], [1, 2.2]);
  const effectOpacity = useTransform(smoothScroll, [0.4, 0.8], [0, 0.8]);
  const morphOpacity = useTransform(smoothScroll, [0.8, 1], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[300vh] w-full bg-black overflow-hidden"
    >
      <div className="fixed inset-0 h-screen w-full z-0">
        <div className="absolute inset-0 z-[-1] bg-black" />

        {/* --- 1. POSTER IMAGE (VISIBLE DURING LOAD) --- */}
        <AnimatePresence>
          {!videoLoaded && (
            <motion.img
              src="/images/hero_poster.jpg"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ 
                scale: videoScale,
                willChange: "transform" 
              }}
              className="absolute inset-0 h-full w-full object-cover z-[2]"
              alt="SYNAPSE Imperial Earth View"
            />
          )}
        </AnimatePresence>

        {/* --- 2. THE VIDEO LAYER --- */}
        <motion.video
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          style={{ 
            scale: videoScale,
            opacity: videoLoaded ? 1 : 0, // Keeps it hidden until ready to play
            willChange: "transform, opacity" 
          }}
          className="h-full w-full object-cover z-[1]"
        >
          <source src="/images/earth_night.webm" type="video/webm" />
          {/* Fallback for older browsers */}
          <source src="/images/earth_night.mp4" type="video/mp4" />
        </motion.video>

        {/* --- 3. PARTICLES & EFFECTS --- */}
        <HolidayOverlay type="snow" opacity={effectOpacity} />

        <motion.div 
          style={{ opacity: morphOpacity }}
          className="absolute inset-0 bg-[#020a1a] pointer-events-none z-[3]"
        />
      </div>

      {/* --- 4. TEXT CONTENT --- */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <h1 className="text-white text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none will-change-transform">
          SYNAPSE
        </h1>
        
        <p 
          style={{ color: "var(--synapse-accent)" }} 
          className="font-bold tracking-[0.3em] sm:tracking-[0.6em] md:tracking-[1em] uppercase text-[8px] sm:text-[10px] md:text-xs mt-6 md:mt-10 max-w-[90vw] sm:max-w-none"
        >
          The Socio-Cultural and Linguistic Society of IITM BS
        </p>
      </div>
      
      {/* Spacer for scroll height */}
      <div className="h-[200vh]" />
    </section>
  );
};

export default Hero;
import React, { useRef, useEffect } from "react"; // Explicitly import useRef and useEffect
import { motion, useScroll, useTransform } from "framer-motion";

const HolidayOverlay = ({ type, opacity }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = type === "snow" ? 200 : 50; 

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = type === "snow" ? Math.random() * -canvas.height : canvas.height; 
        this.size = Math.random() * (type === "snow" ? 2 : 4) + 1;
        this.speedY = type === "snow" ? Math.random() * 0.6 + 0.2 : Math.random() * -5 - 2;
        this.speedX = (Math.random() - 0.5) * (type === "snow" ? 0.5 : 4);
        this.color = type === "snow" ? "white" : `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.alpha = type === "snow" ? Math.random() * 0.5 + 0.3 : 1;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (type === "snow" && this.y > canvas.height) {
          this.y = -10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = type === "snow" ? 5 : 0;
        ctx.shadowColor = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [type]);

  return (
    <motion.canvas
      ref={canvasRef}
      style={{ opacity }}
      className="absolute inset-0 z-[5] pointer-events-none"
    />
  );
};

const Hero = () => {
  const containerRef = useRef(null); // This was throwing the error because of missing import
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.8], [1, 3.5]);
  const effectOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 0.8]);
  const morphOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[300vh] w-full bg-black overflow-hidden"
    >
      <div className="fixed inset-0 h-screen w-full z-0">
        <div className="absolute inset-0 z-[-1] starry-night-fallback" />

        <motion.video
          autoPlay loop muted playsInline preload="metadata"
          style={{ scale: videoScale }}
          className="h-full w-full object-cover"
        >
          <source src="./images/earth_night.webm" type="video/webm" />
        </motion.video>

        <HolidayOverlay type="snow" opacity={effectOpacity} />

        <motion.div 
          style={{ opacity: morphOpacity }}
          className="absolute inset-0 bg-[#020a1a]"
        />
      </div>

      <div className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-8xl md:text-[12rem] font-black tracking-tighter">
          SYNAPSE
        </h1>
        {/* Updated accent color to Champagne Gold variable */}
        <p 
          style={{ color: "var(--synapse-accent)" }} 
          className="font-bold tracking-[1em] uppercase text-[9px] mt-10"
        >
          The Socio-Culural and Linguistic Society of IITM BS
        </p>
      </div>
      
      <div className="h-[200vh]" />
    </section>
  );
};

export default Hero;
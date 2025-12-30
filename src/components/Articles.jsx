import { useRef } from "react";
import { motion } from "framer-motion"; 
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Articles = () => {
  const container = useRef();
  const finalists = [
    { name: "Sagnik Chakraborty", state: "WEST BENGAL", img: "/images/sagnik-indo.jpg", desc: "The winner of the event Sagnik Chakraborty unfolds a narrative of rich history, diverse geography, and unparalleled cultural prowess of West Bengal.", link: "#"},
    { name: "Agamani Paul", state: "WEST BENGAL", img: "/images/agamani-indo.jpg", desc: "Agamani Paul delved into history, cultural luminaries, intellectual prowess, and delectable cuisine of West Bengal.", link: "#" },
    { name: "P Umesh Kannan", state: "TAMIL NADU", img: "/images/umesh-indo.jpg", desc:"P Umesh Kannan described Tamil Nadu as a cradle of Dravidian culture, boasting a heritage shaped by ancient dynasties.", link: "#" }
  ];

  useGSAP(() => {
    const cards = gsap.utils.toArray(".article-card");
    cards.forEach((card) => {
      gsap.from(card, {
        y: 50, opacity: 0,
        scrollTrigger: { 
          trigger: card, 
          start: "top bottom", 
          end: "top 80%",
          scrub: 1, 
        }
      });
    });
  }, { scope: container });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* Background tied to CSS Variable */}
      <section id="articles" ref={container} style={{ backgroundColor: "var(--synapse-bg)" }} className="py-40 relative overflow-hidden">
        
        {/* Decorative Gold Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 blur-[150px] rounded-full -z-10" 
             style={{ backgroundColor: "var(--synapse-accent)" }} />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32">
            <p style={{ color: "var(--synapse-accent)" }} className="font-black tracking-[0.5em] uppercase text-[10px] mb-4">Featured Content</p>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
              Indo-Mosaic <span style={{ color: "var(--synapse-accent)" }}>Finalists</span>
            </h2>
          </div>

          <div className="space-y-12">
            {finalists.map((article, index) => (
              <div key={index} className="article-card group flex flex-col md:flex-row items-center gap-12 p-8 md:p-12 rounded-[4rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl transition-all duration-700 hover:bg-white/[0.05]">
                <div className="w-full md:w-1/3 h-72 rounded-[3rem] overflow-hidden">
                  <img src={article.img} alt={article.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                </div>

                <div className="flex-1 flex flex-col items-start">
                  <div className="flex items-center gap-4 mb-4">
                    <span style={{ backgroundColor: "var(--synapse-accent)" }} className="h-[1px] w-8"></span>
                    <h2 style={{ color: "var(--synapse-accent)" }} className="text-sm font-black tracking-[0.3em] uppercase">{article.state}</h2>
                  </div>
                  
                  <h4 className="text-3xl font-bold text-white mb-6">By {article.name}</h4>
                  <p className="text-white/40 text-lg leading-relaxed italic mb-10 max-w-2xl">"{article.desc}"</p>

                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="relative group/link flex items-center gap-4 py-4 px-10 rounded-full border border-white/10 bg-white/5 text-white font-black text-[11px] tracking-[0.2em] overflow-hidden transition-all duration-500">
                    <span className="relative z-10 transition-colors duration-500 group-hover/link:text-black uppercase">Read Full Article</span>
                    <div style={{ backgroundColor: "var(--synapse-accent)" }} className="absolute inset-0 translate-y-full group-hover/link:translate-y-0 transition-transform duration-500 ease-out" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Articles;
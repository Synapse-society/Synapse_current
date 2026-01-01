import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Departments from "./components/Departments";
import Events from "./components/Events";
import Articles from "./components/Articles";
import Senate from "./components/Senate";

import "./index.css";

function App() {
  const { scrollYProgress } = useScroll();

  // Morphing from Black to Deep Space Navy
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8], 
    ["#000000", "#020617", "#020a1a"] 
  );

  // 3. Smooth Scroll Initialization (Lenis)
  useEffect(() => {
    const lenis = new Lenis({ 
      duration: 1.5, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      {/* 4. Global Wrapper with Dynamic Background Color */}
      <motion.main 
        style={{ backgroundColor: bgColor }} 
        className="text-white selection:bg-[#E2C17D]/30 min-h-screen relative overflow-x-hidden"
      >
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <>
              {/* The Hero handles the video zoom and slow-motion snow */}
              <Hero />
              
              {/* Ensure these sections are set to bg-transparent */}
              <section id="about"><About /></section>
              <section id="departments"><Departments /></section>
              <section id="events"><Events /></section>
              <section id="articles"><Articles /></section>
              <section id="senate"><Senate /></section>
            </>
          } />
        </Routes>

        <Footer />
      </motion.main>
    </Router>
  );
}

export default App;
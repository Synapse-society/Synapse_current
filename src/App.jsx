import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { motion } from "framer-motion";

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
  // Smooth Scroll Initialization (Lenis) - Essential for high-end parallax
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
      {/* Global Wrapper: 
        1. bg-transparent ensures the Hero video is visible everywhere.
        2. relative positioning keeps sections in proper stacking order.
      */}
      <motion.main 
        className="bg-transparent text-white selection:bg-[#E2C17D]/30 min-h-screen relative overflow-x-hidden"
      >
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <>
              {/* Hero: Contains the fixed video and the initial zoom interaction.
              */}
              <Hero />
              
              {/* Floating Sections: 
                All these components MUST have 'bg-transparent' or 'bg-opacity-0' 
                applied within their internal code to keep the video visible.
              */}
              <div className="relative z-10">
                <section id="about"><About /></section>
                <section id="departments"><Departments /></section>
                <section id="events"><Events /></section>
                <section id="articles"><Articles /></section>
                
                {/* Senate: Reaches the bottom with snow heaps and sparkles 
                  appearing directly over the planet's surface.
                */}
                <section id="senate"><Senate /></section>
              </div>
            </>
          } />
        </Routes>

        <Footer />
      </motion.main>
    </Router>
  );
}

export default App;
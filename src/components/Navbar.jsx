import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false); 
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Departments", id: "departments" },
    { name: "Articles", id: "articles" },
    { name: "Senate", id: "senate" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-center pt-8 px-6 pointer-events-none">
        <div className={`
          pointer-events-auto flex items-center justify-between px-8 py-3 rounded-full transition-all duration-700 ease-in-out
          ${scrolled 
            ? "w-full max-w-4xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
            : "w-full max-w-7xl bg-transparent border border-transparent"}
        `}>
          
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <img src="/images/Synapse.png" className="h-8" alt="Synapse Logo" />
            <span className="font-black text-white tracking-tighter">SYNAPSE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-widest">
            {navLinks.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                onClick={(e) => handleNavClick(e, link.id)} 
                className="text-white/40 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            {/* CTA in Champagne Gold */}
            <a 
              href="https://forms.gle/25ethkjjT33y68cQ6" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "var(--synapse-accent)" }}
              className="font-bold hover:text-white transition-colors"
            >
              Join Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-[#030a1a] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                onClick={(e) => handleNavClick(e, link.id)} 
                className="text-4xl font-black uppercase tracking-tighter text-white/40 hover:text-white"
                onMouseEnter={(e) => e.target.style.color = "var(--synapse-accent)"}
                onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.4)"}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://forms.gle/25ethkjjT33y68cQ6" 
              target="_blank" 
              style={{ color: "var(--synapse-accent)" }}
              className="text-2xl font-bold mt-4"
            >
              Join Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
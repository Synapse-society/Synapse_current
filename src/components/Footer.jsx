import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UilInstagram, 
  UilLinkedinAlt,
  UilEnvelope
} from "@iconscout/react-unicons";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const email = "culturalstudy.society@study.iitm.ac.in";

  const privacyLinks = [
    { name: "Constitution", href: "https://docs.google.com/document/d/1QN1oQ2lz4dCgDxnqLghqJNcslz6A3XUYXMRyxhBtZoo/edit?usp=sharing" },
    { name: "Privacy Policy", href: "https://docs.google.com/document/d/12lDL73IegFcx7m1Ur-5mhcnD3SFfHgtqoIHkzImttIk/edit?usp=drivesdk" },
    { name: "Code of Conduct", href: "https://docs.google.com/document/d/1hA5IdzPb7iJ91TsyVyNRKS-MDdsL6JMBnHpm8LEhQNk/edit?usp=drivesdk" },
  ];

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <footer className="bg-[#020a1a] border-t border-white/5 pt-20 pb-12 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 mb-16 relative z-10">
          
          {/* Brand Info */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/images/Synapse.png" className="h-8" alt="Synapse Logo" />
              <span className="font-black text-white tracking-tighter text-xl">
                SYNAPSE
              </span>
            </Link>
            <p className="text-white/30 text-[10px] leading-relaxed font-medium uppercase tracking-[0.2em] max-w-[250px]">
              Bridging Humanities and Technology at IITM BS.
            </p>
          </div>

          {/* Resources & Connect Section - Changed to grid-cols-1 on mobile */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10 text-center sm:text-left">
            {/* Resources */}
            <div>
              <h5
                style={{ color: "var(--synapse-accent)" }}
                className="text-[10px] font-black uppercase tracking-[0.4em] mb-6"
              >
                Resources
              </h5>
              <div className="flex flex-col gap-4">
                {privacyLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Social / Contact */}
            <div className="flex flex-col items-center sm:items-start">
              <h5
                style={{ color: "var(--synapse-accent)" }}
                className="text-[10px] font-black uppercase tracking-[0.4em] mb-6"
              >
                Connect
              </h5>

              {/* Icon container with flex-wrap to prevent squishing */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 relative">
                
                {/* EMAIL (COPYABLE) */}
                <div className="relative">
                  <button
                    onClick={handleCopyEmail}
                    className="
                      w-12 h-12 flex items-center justify-center rounded-xl
                      bg-white/[0.02] border border-white/5
                      text-white/30
                      transition-all
                      hover:text-[var(--synapse-accent)]
                    "
                    aria-label="Copy email"
                  >
                    <UilEnvelope size="20" />
                  </button>

                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="
                          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                          text-[9px] font-black uppercase tracking-widest
                          px-2 py-1 rounded-full bg-[var(--synapse-accent)] text-[#020a1a]
                        "
                      >
                        Copied
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* SOCIAL LINKS */}
                {[
                  { icon: <UilInstagram size="20" />, href: "https://www.instagram.com/synapse_iitmbs/" },
                  { icon: <RiTwitterXFill size="18" />, href: "https://x.com/synapse_iitmbs" },
                  { icon: <UilLinkedinAlt size="20" />, href: "https://www.linkedin.com/company/synapse-iitm-bs-socio-linguistic-society/" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-12 h-12 flex items-center justify-center rounded-xl
                      bg-white/[0.02] border border-white/5
                      text-white/30
                      transition-all
                      hover:text-[var(--synapse-accent)]
                    "
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 text-center md:text-left">
          <p className="text-[10px] text-white/50 font-black tracking-[0.2em] uppercase">
            © {currentYear} Synapse Society IITM BS.
          </p>
          <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase">
            <span className="text-white/70">Made with ❣️ by</span>
            <a
              href="http://github.com/Felicitatem"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--synapse-accent)" }}
              className="hover:text-white transition-all animate-glow-soft"
            >
              Samriddhi
            </a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Footer;
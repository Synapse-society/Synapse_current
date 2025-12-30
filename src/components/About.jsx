import React from "react";
import { motion } from "framer-motion";

const About = () => {
  // Goal data structured for mapping
  const goals = [
    { title: "Socio-Linguistic Knowledge", desc: "Our Primary focus is on enhancing and engaging the Socio-Linguistic Knowledge and Social Skills among our members." },
    { title: "Language Awareness", desc: "We also emphasise on improving language education policies and practices to ensure that they are inclusive and culturally sensitive" },
    { title: "Geopolitical Analysis", desc: "Analyze and disseminate information about geopolitical issues and conflicts to promote peace, diplomacy, and international cooperation" },
    { title: "Preservation", desc: "Advocate for policies and practices that celebrate and respect cultural diversity within society to preserve and respect their cultural knowledge and heritage." },
    { title: "Research & Publications", desc: "Publish scholarly journals, books, and other materials to disseminate research findings and cultural insights.." },
    { title: "Global Perspective", desc: "Collaborate with organizations to address global cultural and geographical challenges, such as climate change and cultural preservation." }
  ];

  return (
    <motion.section 
      id="about" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative z-20 py-60 px-6 md:px-20 bg-transparent flex flex-col items-center"
    >
      <div className="max-w-7xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32" 
        >
          {/* Using dynamic accent color from index.css */}
          <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter text-white">
            Our <span style={{ color: "var(--synapse-accent)" }}>Goals</span>
          </h1>
          <p className="text-white/60 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
            Synapse Society has a diverse range of goals to enrich members and help them become better global citizens.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="flex flex-col p-12 rounded-[3.5rem] bg-black/30 border border-white/10 backdrop-blur-2xl shadow-2xl transition-all"
            >
              <div 
                className="w-12 h-1 mb-8 rounded-full" 
                style={{ backgroundColor: "var(--synapse-accent)" }} 
              />
              <h5 
                className="font-black text-2xl mb-6 leading-tight uppercase tracking-tight"
                style={{ color: "var(--synapse-accent)" }}
              >
                {goal.title}
              </h5>
              <p className="text-white/50 leading-relaxed text-base italic">
                "{goal.desc}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default About;
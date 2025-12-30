import React from "react";
import { motion } from "framer-motion";

const Departments = () => {
  const depts = [
    { 
      name: "Panini", 
      field: "Linguistics", 
      img: "/images/language.png", 
      description: "Fosters a deeper understanding of the complex interplay between language and society, ultimately contributing to more inclusive and equitable linguistic practices and policies."
    },
    { 
      name: "Kumarila Bhatta", 
      field: "Culture", 
      img: "/images/Culture.jpg", 
      description: "Fosters a deeper understanding of the complex interplay between language and society, ultimately contributing to more inclusive and equitable linguistic practices and policies."
    },
    { 
      name: "Kalhana", 
      field: "History", 
      img: "/images/History.jpg", 
      description: "Fosters a deeper understanding of the complex interplay between language and society, ultimately contributing to more inclusive and equitable linguistic practices and policies."
    },
    { 
      name: "Strabo", 
      field: "Geography", 
      img: "/images/Geography.png", 
      description: "Fosters a deeper understanding of the complex interplay between language and society, ultimately contributing to more inclusive and equitable linguistic practices and policies."
    },
    { 
      name: "Chanakya", 
      field: "Political Studies", 
      img: "/images/Political Sience.jpeg", 
      description: "Fosters a deeper understanding of the complex interplay between language and society, ultimately contributing to more inclusive and equitable linguistic practices and policies."
    },
    { 
      name: "Aristotle", 
      field: "Philosophy", 
      img: "/images/Philosophy.jpg", 
      description: "Fosters a deeper understanding of the complex interplay between language and society, ultimately contributing to more inclusive and equitable linguistic practices and policies."
    },
  ];

  return (
    <section id="departments" className="relative z-20 py-40 px-6 md:px-20 bg-transparent flex flex-col items-center">
      <div className="max-w-7xl w-full mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
            Our <span style={{ color: "var(--synapse-accent)" }}>Departments</span>
          </h2>
          <div 
            className="w-24 h-1 mx-auto mt-6 rounded-full opacity-50" 
            style={{ backgroundColor: "var(--synapse-accent)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {depts.map((dept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }} 
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -15 }}
              /* Comment moved outside tag: Card background switched to Black/30 for space contrast */
              className="group flex flex-col items-center text-center rounded-[3.5rem] bg-black/30 border border-white/10 backdrop-blur-3xl shadow-2xl overflow-hidden transition-all duration-500"
              style={{ borderBottom: "4px solid var(--synapse-accent)" }}
            >
              <div className="w-full h-72 overflow-hidden relative">
                <img 
                  src={dept.img} 
                  alt={dept.name} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-10 md:p-12">
                <h4 
                  className="text-3xl font-bold mb-3 tracking-tight text-white transition-colors duration-500"
                  onMouseEnter={(e) => e.target.style.color = "var(--synapse-accent)"}
                  onMouseLeave={(e) => e.target.style.color = "white"}
                >
                  {dept.name}
                </h4>
                <p 
                  style={{ color: "var(--synapse-accent)" }} 
                  className="uppercase tracking-[0.3em] text-[10px] font-black mb-8 opacity-80"
                >
                  Dept. of {dept.field}
                </p>
                <p className="text-white/40 leading-relaxed text-sm italic font-medium">
                  "{dept.description}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Departments;
"use client";

import { motion } from "framer-motion";

const journeyData = [
  {
    year: "2025",
    title: "Technologia 1.0",
    desc: "The foundation. The first ever inter-departmental technical clash.",
    status: "past"
  },
  {
    year: "2026",
    title: "Technologia 2.0",
    desc: "Expanded events, digital platform, and larger prize pools.",
    status: "current"
  },
  {
    year: "2027",
    title: "Technologia 3.0",
    desc: "Scaling to new heights. Coming soon.",
    status: "future"
  }
];

export function JourneySection() {
  return (
    <section id="journey" className="py-32 px-6 bg-black relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Journey</h2>
          <p className="text-gray-400">Our evolution over the years.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          {journeyData.map((item, i) => (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`relative flex items-center mb-16 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-black border-2 md:-translate-x-1/2 z-10 
                ${item.status === 'current' ? 'border-accent-blue bg-accent-blue/20 shadow-[0_0_15px_#00E5FF]' : 
                  item.status === 'past' ? 'border-white' : 'border-gray-700'}" 
                style={{ 
                  borderColor: item.status === 'current' ? '#00E5FF' : item.status === 'past' ? '#fff' : '#333'
                }}
              />

              {/* Content Box */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12 text-left md:text-right"}`}>
                <div className="glass-card p-6 border border-white/5 hover:border-white/20 transition-all duration-300">
                  <span className={`text-sm font-bold tracking-widest ${
                    item.status === 'current' ? 'text-accent-blue' : 'text-gray-500'
                  }`}>
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

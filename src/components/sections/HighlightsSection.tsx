"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Years of Legacy", value: "2+" },
  { label: "Technical Events", value: "30+" },
  { label: "Active Participants", value: "500+" },
  { label: "Prize Pool", value: "₹50K+" }
];

export function HighlightsSection() {
  return (
    <section className="py-24 px-6 border-y border-white/5 bg-gradient-to-b from-black to-gray-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6"
            >
              <h4 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {stat.value}
              </h4>
              <p className="text-sm md:text-base text-gray-500 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

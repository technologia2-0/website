"use client";

import { motion } from "framer-motion";

interface AboutProps {
  title?: string;
  description?: string;
  vision?: string;
  mission?: string;
}

export function AboutSection({ title, description, vision, mission }: AboutProps) {
  return (
    <section id="about" className="py-32 px-6 bg-black relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            {title || 'Designed for the relentless.'}
          </h2>
          
          <p className="text-lg md:text-2xl text-gray-400 leading-relaxed font-light mb-12">
            {description || 'Technologia is more than a technical fest. It is the convergence of brilliant minds, relentless engineering, and sheer creative force.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 glass-card border border-white/5"
          >
            <h3 className="text-xl font-bold text-white mb-3">The Vision</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {vision || 'To cultivate an ecosystem where innovation is standard, and boundaries are merely milestones.'}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 glass-card border border-white/5"
          >
            <h3 className="text-xl font-bold text-white mb-3">The Mission</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {mission || 'Provide a world-class competitive platform for students to test their skills.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 glass-card border border-white/5"
          >
            <h3 className="text-xl font-bold text-white mb-3">The Battle</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Three departments. One legendary trophy. Compete in rigorous events spanning coding, design, hardware, and logic to prove your supremacy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

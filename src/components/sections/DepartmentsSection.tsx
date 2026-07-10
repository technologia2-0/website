"use client";

import { motion } from "framer-motion";
import { Monitor, Cpu, Database } from "lucide-react";

const departments = [
  {
    id: "it",
    name: "Information Technology",
    icon: <Monitor className="w-8 h-8" />,
    desc: "Pioneers of software engineering, web technologies, and systems architecture. Building the digital infrastructure of tomorrow.",
    color: "from-blue-500/20 to-transparent",
    border: "group-hover:border-blue-500/50"
  },
  {
    id: "cs",
    name: "Computer Science",
    icon: <Cpu className="w-8 h-8" />,
    desc: "Masters of algorithms, computation, and core hardware integration. Pushing the limits of processing power and logic.",
    color: "from-purple-500/20 to-transparent",
    border: "group-hover:border-purple-500/50"
  },
  {
    id: "ds",
    name: "Data Science",
    icon: <Database className="w-8 h-8" />,
    desc: "Architects of artificial intelligence, machine learning, and big data. Extracting meaning from the noise.",
    color: "from-cyan-500/20 to-transparent",
    border: "group-hover:border-cyan-500/50"
  }
];

export function DepartmentsSection() {
  return (
    <section id="departments" className="py-32 px-6 bg-black relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">The Organizers</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Three powerhouse departments united to orchestrate the ultimate technical fest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group glass-card overflow-hidden border border-white/5 transition-colors duration-500 ${dept.border}`}
            >
              <div className={`h-2 w-full bg-gradient-to-r ${dept.color}`} />
              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                  {dept.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{dept.name}</h3>
                <p className="text-gray-400 leading-relaxed font-light">
                  {dept.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

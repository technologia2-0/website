"use client";

import { motion } from "framer-motion";
import { Laptop, Network, Trophy, Lightbulb, FileBadge, Star } from "lucide-react";

const features = [
  {
    icon: <Laptop className="w-6 h-6" />,
    title: "Hands-on Learning",
    desc: "Test your skills in real-world scenarios and high-pressure environments."
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: "Networking",
    desc: "Connect with like-minded peers, faculty, and industry professionals."
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Competitions",
    desc: "Participate in intensive challenges and prove your department's worth."
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Innovation",
    desc: "Bring your crazy ideas to life and showcase them to the world."
  },
  {
    icon: <FileBadge className="w-6 h-6" />,
    title: "Certificates",
    desc: "Earn verifiable digital certificates to boost your professional portfolio."
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Recognition",
    desc: "Stand out from the crowd and build a reputation for excellence."
  }
];

export function WhyParticipateSection() {
  return (
    <section className="py-32 px-6 bg-black relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Why Participate?</h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            Technologia isn't just an event. It's an opportunity to accelerate your growth and leave a mark.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card p-8 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-white/10 group-hover:text-accent-blue transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client'

import { motion } from 'framer-motion'
import { Monitor, Cpu, Database, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Technologia</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            The premier technical fest bringing together the brightest minds from Information Technology, Computer Science, and Data Science.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h3 className="text-2xl font-bold text-white mb-4">The Ultimate Battle</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                For three days, the departments will clash in a series of rigorous technical events. 
                Only one department will lift the legendary Best Department Trophy. Do you have what it takes?
              </p>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Monitor className="w-5 h-5" /> IT
                </div>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Cpu className="w-5 h-5" /> CS
                </div>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Database className="w-5 h-5" /> DS
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              { icon: <Award className="w-6 h-6" />, title: "Digital First", desc: "100% automated systems" },
              { icon: <Monitor className="w-6 h-6" />, title: "30+ Events", desc: "Coding, Quizzes & More" },
              { icon: <Database className="w-6 h-6" />, title: "Data Driven", desc: "Live PR Points" },
              { icon: <Cpu className="w-6 h-6" />, title: "Next Gen", desc: "Futuristic Platform" },
            ].map((feature, i) => (
              <Card key={i} className="bg-white/5 border-white/10 p-6 flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                <p className="text-sm text-white/50">{feature.desc}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

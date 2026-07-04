'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Code, Bug, Keyboard, Brain, Terminal, Network } from 'lucide-react'
import Link from 'next/link'

const featuredEvents = [
  {
    title: 'Code Genesis',
    category: 'Competitive Programming',
    icon: <Code className="w-8 h-8 text-primary" />,
    desc: 'The ultimate algorithmic battle. Solve complex problems under intense time pressure.'
  },
  {
    title: 'Bug Bash',
    category: 'Debugging',
    icon: <Bug className="w-8 h-8 text-primary" />,
    desc: 'Find and fix obscure bugs in a massive legacy codebase before time runs out.'
  },
  {
    title: 'TypeRacer Pro',
    category: 'Speed Typing',
    icon: <Keyboard className="w-8 h-8 text-primary" />,
    desc: 'Test your WPM in our custom-built typing arena with real-time leaderboards.'
  },
  {
    title: 'Brainiac',
    category: 'Technical Quiz',
    icon: <Brain className="w-8 h-8 text-primary" />,
    desc: 'Test your knowledge across CS fundamentals, latest tech, and pop culture.'
  },
  {
    title: 'Hack the Box',
    category: 'Cybersecurity',
    icon: <Terminal className="w-8 h-8 text-primary" />,
    desc: 'Capture the flag in our simulated vulnerable network environment.'
  },
  {
    title: 'System Design',
    category: 'Architecture',
    icon: <Network className="w-8 h-8 text-primary" />,
    desc: 'Design a scalable architecture for a million-user application.'
  }
]

export function EventsSection() {
  return (
    <section id="events" className="py-24 px-4 bg-black/50 relative border-t border-white/5">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Events</h2>
            <p className="text-lg text-white/60 max-w-xl">
              Discover the challenges that await you. Register early to secure your spot in these high-stakes competitions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button variant="outline" className="rounded-full">
              View All Events <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full p-8 flex flex-col group hover:border-primary/50 transition-colors duration-300">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                  {event.icon}
                </div>
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {event.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                <p className="text-white/60 flex-1 mb-6">
                  {event.desc}
                </p>
                <Link href="/events" className="inline-flex items-center text-sm font-medium text-white/40 hover:text-white transition-colors mt-auto">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

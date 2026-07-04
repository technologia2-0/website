'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { CalendarDays, Clock, MapPin } from 'lucide-react'

const schedule = [
  {
    day: 'Day 1',
    date: 'March 15, 2026',
    title: 'The Inception',
    events: [
      { time: '09:00 AM', name: 'Inauguration Ceremony', venue: 'Main Auditorium' },
      { time: '11:00 AM', name: 'Code Genesis (Round 1)', venue: 'Lab 1 & 2' },
      { time: '02:00 PM', name: 'Bug Bash', venue: 'Lab 3' },
      { time: '04:30 PM', name: 'TypeRacer Pro', venue: 'Lab 1' },
    ]
  },
  {
    day: 'Day 2',
    date: 'March 16, 2026',
    title: 'The Climax',
    events: [
      { time: '09:30 AM', name: 'Code Genesis (Finals)', venue: 'Lab 1' },
      { time: '11:30 AM', name: 'System Design', venue: 'Seminar Hall' },
      { time: '02:00 PM', name: 'Hack the Box', venue: 'Lab 2 & 3' },
      { time: '05:00 PM', name: 'Brainiac (Finals)', venue: 'Main Auditorium' },
    ]
  },
  {
    day: 'Day 3',
    date: 'March 17, 2026',
    title: 'The Legacy',
    events: [
      { time: '10:00 AM', name: 'Project Showcase', venue: 'Exhibition Hall' },
      { time: '01:00 PM', name: 'Cultural Events', venue: 'Main Auditorium' },
      { time: '04:00 PM', name: 'Prize Distribution & Reveals', venue: 'Main Auditorium' },
      { time: '06:30 PM', name: 'Closing Ceremony', venue: 'Main Auditorium' },
    ]
  }
]

export function ScheduleSection() {
  return (
    <section id="schedule" className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Event Schedule</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Three days of non-stop technical action, concluding with a grand prize distribution ceremony.
          </p>
        </motion.div>

        <div className="space-y-12">
          {schedule.map((day, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="p-0 overflow-hidden border-white/10 bg-white/5 backdrop-blur-md">
                <div className="bg-primary/10 border-b border-white/5 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        {day.day}
                      </span>
                      <span className="text-white/60 text-sm flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" /> {day.date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{day.title}</h3>
                  </div>
                </div>
                <div className="divide-y divide-white/5">
                  {day.events.map((event, i) => (
                    <div key={i} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 hover:bg-white/[0.02] transition-colors">
                      <div className="w-32 flex items-center gap-2 text-primary font-medium shrink-0">
                        <Clock className="w-4 h-4" /> {event.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1">{event.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-white/50">
                          <MapPin className="w-4 h-4" /> {event.venue}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

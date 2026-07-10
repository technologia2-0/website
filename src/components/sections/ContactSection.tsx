"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 bg-black relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have questions? Reach out to the organizing committee.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="glass-card p-8 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Campus Location</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      University Campus, Technical Block<br />
                      Main Avenue, Innovation City
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Official Email</h4>
                    <a href="mailto:technologiaitcsds@gmail.com" className="text-accent-blue hover:underline text-sm">
                      technologiaitcsds@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Support Desk</h4>
                    <p className="text-gray-400 text-sm">
                      +91 98765 43210
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <h4 className="text-white font-medium mb-4">Connect with us</h4>
                <div className="flex gap-4">
                  <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                    <span className="text-white font-bold">in</span>
                  </Link>
                  <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                    <span className="text-white font-bold">ig</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map/Visual Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="h-full min-h-[400px] glass-card border border-white/5 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 grayscale-[50%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-medium text-white mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Location
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Technologia HQ</h3>
              <p className="text-gray-300 text-sm">Find us at the heart of the campus.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

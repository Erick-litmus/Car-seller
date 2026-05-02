import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, MessageCircle, Send, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="flex-grow bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Have questions about a specific vehicle or want to book a viewing? Our team is here to help you every step of the way.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-brand-dark mb-8">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { icon: Phone, label: "Call Us", value: "+254 706 546 644" },
                    { icon: Mail, label: "Email Us", value: "info@erickandmutua.com" },
                    { icon: MapPin, label: "Visit Us", value: "Nairobi, Kenya" },
                    { icon: Clock, label: "Work Hours", value: "Mon - Sat: 8AM - 6PM" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center flex-shrink-0 text-accent border border-accent/10">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-brand-dark font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-light p-10 rounded-3xl border border-black/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 gold-gradient opacity-10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">Direct WhatsApp</h3>
                <p className="text-muted mb-8 max-w-sm">
                  Want an instant response? Chat directly with our sales consultants on WhatsApp.
                </p>
                <a
                  href="https://wa.me/254706546644"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 gold-gradient text-white rounded-xl font-bold shadow-lg shadow-accent/20 hover:scale-[1.02] transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Start WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-black/5">
              <h3 className="text-2xl font-serif font-bold text-brand-dark mb-8">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-5 py-4 bg-brand-light border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-brand-dark font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-5 py-4 bg-brand-light border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-brand-dark font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Subject</label>
                  <select className="w-full px-5 py-4 bg-brand-light border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-brand-dark font-medium appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Book a Viewing</option>
                    <option>Sell My Car</option>
                    <option>Car Valuation</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us what you're looking for..."
                    className="w-full px-5 py-4 bg-brand-light border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-brand-dark font-medium resize-none"
                  ></textarea>
                </div>
                <button className="w-full py-5 gold-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-accent/20 hover:opacity-90 transition-all">
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

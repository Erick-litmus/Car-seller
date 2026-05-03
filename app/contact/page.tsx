import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="flex-grow bg-slate-50">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Contact Our Team
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a question about a vehicle or need assistance? We're ready to help you with expert guidance.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { icon: Phone, label: "Phone", value: "+254 706 000 000" },
                    { icon: Mail, label: "Email", value: "info@erickandmutua.com" },
                    { icon: MapPin, label: "Location", value: "Nairobi, Kenya" },
                    { icon: Clock, label: "Hours", value: "Mon – Sat, 8:00 AM – 6:00 PM" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-amber-600">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          {item.label}
                        </p>
                        <p className="text-slate-900 font-medium">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Quick WhatsApp Support
                </h3>
                <p className="text-slate-500 mb-6">
                  Prefer instant replies? Chat directly with our team on WhatsApp.
                </p>
                <a
                  href="https://wa.me/254706546644"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

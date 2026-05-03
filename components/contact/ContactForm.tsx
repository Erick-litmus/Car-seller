"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { submitContactInquiry } from "@/lib/actions/contact";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    
    try {
      await submitContactInquiry(formData);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-black/5 text-center space-y-6">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">Message Sent!</h3>
          <p className="text-muted">Thank you for reaching out. Our team will get back to you shortly.</p>
        </div>
        <button 
          onClick={() => setSuccess(false)}
          className="text-accent font-bold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-3xl shadow-2xl border border-black/5">
      <h3 className="text-2xl font-serif font-bold text-brand-dark mb-8">Send us a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Full Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-5 py-4 bg-brand-light border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-brand-dark font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Email Address</label>
            <input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="w-full px-5 py-4 bg-brand-light border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-brand-dark font-medium"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Subject</label>
          <select 
            name="subject"
            className="w-full px-5 py-4 bg-brand-light border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-brand-dark font-medium appearance-none cursor-pointer"
          >
            <option>General Inquiry</option>
            <option>Book a Viewing</option>
            <option>Sell My Car</option>
            <option>Car Valuation</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Message</label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell us what you're looking for..."
            className="w-full px-5 py-4 bg-brand-light border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-brand-dark font-medium resize-none"
          ></textarea>
        </div>
        
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full py-5 gold-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-accent/20 hover:opacity-90 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

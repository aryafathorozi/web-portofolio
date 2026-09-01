"use client";

import { useState } from "react";
import { Send, User, Mail, MessageSquare, MapPin } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Fonnte API later
    console.log("Form data ready to be sent via Fonnte:", formData);
    alert("This is a UI preview. Fonnte integration will be added next!");
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[#030712] -z-20" />
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -z-10 mix-blend-screen" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10 mix-blend-screen" />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16 text-center">
          <span className="text-blue-500 font-mono text-xs tracking-widest uppercase block mb-2">06 / Contact</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-white">
            Get In <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-500 text-xs md:text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            Have a project in mind or just want to say hi? Send me a message and let&apos;s talk about it.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Contact Info Card */}
          <div className="lg:w-1/3 bg-[#081328]/40 border border-white/5 backdrop-blur-md rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between shadow-2xl hover:shadow-[0_0_40px_rgba(34,211,238,0.1)] transition-all duration-500">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="space-y-10 relative z-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white tracking-tight">Let&apos;s Connect</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  I&apos;m always open to discussing product design work or partnership opportunities. Let&apos;s build something great together.
                </p>
              </div>

              <div className="space-y-6">
                 {/* Email Item */}
                 <div className="flex items-center gap-5 group/item">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-cyan-400 group-hover/item:scale-110 group-hover/item:bg-cyan-500/20 group-hover/item:text-cyan-300 transition-all duration-300 shadow-lg">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">Email</p>
                      <p className="text-sm text-gray-200 font-medium">hello@example.com</p>
                    </div>
                 </div>

                 {/* Location Item */}
                 <div className="flex items-center gap-5 group/item">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-purple-400 group-hover/item:scale-110 group-hover/item:bg-purple-500/20 group-hover/item:text-purple-300 transition-all duration-300 shadow-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">Location</p>
                      <p className="text-sm text-gray-200 font-medium">Jakarta, Indonesia</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:w-2/3 bg-[#081328]/40 border border-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-2xl hover:border-white/10 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Field */}
                <div className="space-y-3">
                  <label htmlFor="name" className="text-xs font-mono text-gray-400 uppercase tracking-wider pl-1">
                    Your Name
                  </label>
                  <div className="relative group/input">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within/input:text-cyan-400 transition-colors" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-[#030712]/50 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all hover:bg-[#030712]/80"
                    />
                  </div>
                </div>

                {/* Contact Info Field */}
                <div className="space-y-3">
                  <label htmlFor="contactInfo" className="text-xs font-mono text-gray-400 uppercase tracking-wider pl-1">
                    Email / WhatsApp
                  </label>
                  <div className="relative group/input">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within/input:text-cyan-400 transition-colors" />
                    <input
                      type="text"
                      id="contactInfo"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com / +62..."
                      className="w-full bg-[#030712]/50 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all hover:bg-[#030712]/80"
                    />
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-3">
                <label htmlFor="message" className="text-xs font-mono text-gray-400 uppercase tracking-wider pl-1">
                  Your Message
                </label>
                <div className="relative group/input">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-500 group-focus-within/input:text-cyan-400 transition-colors" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project or idea..."
                    className="w-full bg-[#030712]/50 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none hover:bg-[#030712]/80"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-mono text-sm font-bold tracking-wide transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center gap-3 group/btn"
                >
                  Send Message
                  <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

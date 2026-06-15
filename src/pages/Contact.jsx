"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Loader2, CheckCircle } from "lucide-react";
import { storeInfo } from "@/data/mockData";

// Helper to build API URLs through the Caddy gateway
function apiUrl(path) {
  return `/api/${path}?XTransformPort=3001`;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(apiUrl("enquiries"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || "General Enquiry",
          message: formData.message,
        }),
      });

      const data = await res.json();
      
      // Also save to localStorage as backup
      const existing = JSON.parse(localStorage.getItem("erodeContactMsgs") || "[]");
      const newMessage = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
      localStorage.setItem("erodeContactMsgs", JSON.stringify([...existing, newMessage]));

      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      // Fallback to localStorage only
      const existing = JSON.parse(localStorage.getItem("erodeContactMsgs") || "[]");
      const newMessage = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
      localStorage.setItem("erodeContactMsgs", JSON.stringify([...existing, newMessage]));
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${storeInfo.whatsapp}`, "_blank");
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-erode-black text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl tracking-wider mb-4">
            CONTACT US
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Have questions or need assistance? We&apos;re here to help. Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Side — Form */}
            <div className="w-full lg:w-[60%]">
              <h2 className="font-heading text-2xl sm:text-3xl text-erode-black tracking-wider mb-2">
                SEND US A MESSAGE
              </h2>
              <p className="text-sm text-erode-black/50 mb-6">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              {submitted && (
                <div className="mb-6 bg-erode-green/10 border border-erode-green/30 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle className="text-erode-green flex-shrink-0" size={20} />
                  <p className="text-erode-black font-medium text-sm">
                    Message sent successfully! We&apos;ll get back to you soon.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-4 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-erode-black mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-erode-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-erode-green/20 focus:border-erode-green transition"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-erode-black mb-1.5">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-erode-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-erode-green/20 focus:border-erode-green transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-erode-black mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-erode-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-erode-green/20 focus:border-erode-green transition"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-erode-black mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-erode-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-erode-green/20 focus:border-erode-green transition"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-erode-black mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-erode-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-erode-green/20 focus:border-erode-green transition resize-vertical"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-erode-green text-erode-black font-bold py-3.5 rounded-xl hover:bg-erode-green/90 transition-colors text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>

              {/* WhatsApp Button */}
              <button
                onClick={openWhatsApp}
                className="w-full mt-3 flex items-center justify-center gap-2 border-2 border-erode-black text-erode-black font-semibold py-3.5 rounded-xl hover:bg-erode-black hover:text-white transition-colors text-base cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </button>
            </div>

            {/* Right Side — Info Cards */}
            <div className="w-full lg:w-[40%]">
              <h2 className="font-heading text-2xl sm:text-3xl text-erode-black tracking-wider mb-2">
                CONTACT INFORMATION
              </h2>
              <p className="text-sm text-erode-black/50 mb-6">
                Reach us directly through any of these channels
              </p>

              <div className="space-y-4">
                {/* Phone Card */}
                <div className="border border-gray-100 rounded-xl p-5 flex items-start gap-4 hover:border-erode-green/20 hover:shadow-sm transition-all">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-erode-green/10 flex-shrink-0">
                    <Phone className="w-5 h-5 text-erode-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-erode-black text-sm mb-1">Phone</h3>
                    <a href="tel:+919994893337" className="text-sm text-erode-black/60 hover:text-erode-green transition-colors block">
                      {storeInfo.phone1}
                    </a>
                    <a href="tel:+919842991959" className="text-sm text-erode-black/60 hover:text-erode-green transition-colors block">
                      {storeInfo.phone2}
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="border border-gray-100 rounded-xl p-5 flex items-start gap-4 hover:border-erode-green/20 hover:shadow-sm transition-all">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-erode-green/10 flex-shrink-0">
                    <Mail className="w-5 h-5 text-erode-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-erode-black text-sm mb-1">Email</h3>
                    <a href="mailto:contact@eroderifles.com" className="text-sm text-erode-black/60 hover:text-erode-green transition-colors">
                      {storeInfo.email}
                    </a>
                  </div>
                </div>

                {/* Address Card */}
                <div className="border border-gray-100 rounded-xl p-5 flex items-start gap-4 hover:border-erode-green/20 hover:shadow-sm transition-all">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-erode-green/10 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-erode-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-erode-black text-sm mb-1">Address</h3>
                    <p className="text-sm text-erode-black/60">{storeInfo.address}</p>
                  </div>
                </div>

                {/* Business Hours Card */}
                <div className="border border-gray-100 rounded-xl p-5 flex items-start gap-4 hover:border-erode-green/20 hover:shadow-sm transition-all">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-erode-green/10 flex-shrink-0">
                    <Clock className="w-5 h-5 text-erode-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-erode-black text-sm mb-1">Business Hours</h3>
                    <p className="text-sm text-erode-black/60">{storeInfo.hours}</p>
                    <p className="text-sm text-erode-green font-medium">{storeInfo.sundayHours}</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="mt-6 rounded-xl overflow-hidden border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.5!2d77.7!3d11.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE4JzAwLjAiTiA3N8KwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Erode Rifles Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

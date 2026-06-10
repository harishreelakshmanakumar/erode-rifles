"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { storeInfo } from "@/data/mockData";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
    localStorage.setItem(
      "erodeContactMsgs",
      JSON.stringify([...existing, newMessage])
    );

    setSubmitted(true);
    setFormData({ name: "", phone: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${storeInfo.whatsapp}`, "_blank");
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-erode-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions or need assistance? We&apos;re here to help. Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Side — Form (60%) */}
            <div className="w-full lg:w-[60%]">
              <h2 className="font-heading text-3xl md:text-4xl text-erode-black tracking-wide mb-6">
                Send Us A Message
              </h2>
              <div className="w-12 h-1 bg-erode-green mb-8"></div>

              {submitted && (
                <div className="mb-8 bg-erode-green/10 border border-erode-green rounded-lg p-4 text-center">
                  <p className="text-erode-black font-semibold">
                    Message sent successfully! We&apos;ll get back to you soon.
                  </p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-erode-black mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-erode-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-erode-green focus:border-transparent transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-semibold text-erode-black mb-1.5"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-erode-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-erode-green focus:border-transparent transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold text-erode-black mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-erode-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-erode-green focus:border-transparent transition"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-erode-black mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-erode-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-erode-green focus:border-transparent transition resize-vertical"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-erode-green text-erode-black font-semibold py-3 rounded-lg hover:bg-erode-green/90 transition-colors text-lg"
                >
                  Send Message
                </button>
              </form>

              {/* WhatsApp Button */}
              <button
                onClick={openWhatsApp}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-erode-green text-erode-black font-semibold py-3 rounded-lg hover:bg-erode-green/90 transition-colors text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </button>
            </div>

            {/* Right Side — Info Cards (40%) */}
            <div className="w-full lg:w-[40%]">
              <h2 className="font-heading text-3xl md:text-4xl text-erode-black tracking-wide mb-6">
                Contact Information
              </h2>
              <div className="w-12 h-1 bg-erode-green mb-8"></div>

              <div className="space-y-5">
                {/* Phone Card */}
                <div className="border border-gray-200 rounded-lg p-5 flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-erode-green/10 flex-shrink-0">
                    <Phone className="w-6 h-6 text-erode-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-erode-black mb-1">Phone</h3>
                    <p className="text-gray-600">{storeInfo.phone1}</p>
                    <p className="text-gray-600">{storeInfo.phone2}</p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="border border-gray-200 rounded-lg p-5 flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-erode-green/10 flex-shrink-0">
                    <Mail className="w-6 h-6 text-erode-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-erode-black mb-1">Email</h3>
                    <p className="text-gray-600">{storeInfo.email}</p>
                  </div>
                </div>

                {/* Address Card */}
                <div className="border border-gray-200 rounded-lg p-5 flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-erode-green/10 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-erode-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-erode-black mb-1">Address</h3>
                    <p className="text-gray-600">{storeInfo.address}</p>
                  </div>
                </div>

                {/* Business Hours Card */}
                <div className="border border-gray-200 rounded-lg p-5 flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-erode-green/10 flex-shrink-0">
                    <Clock className="w-6 h-6 text-erode-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-erode-black mb-1">Business Hours</h3>
                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="mt-8 rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.5!2d77.7!3d11.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE4JzAwLjAiTiA3N8KwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
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

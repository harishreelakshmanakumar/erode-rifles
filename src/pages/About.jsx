"use client";

import { Shield, Award, Tag, Heart, CheckCircle, Phone, Mail, MapPin, Clock, Target, Eye, HeadphonesIcon, Crosshair, ArrowRight } from "lucide-react";
import { whyChooseUs, teamMembers, storeInfo, aboutInfo } from "@/data/mockData";
import { motion } from "framer-motion";

const iconMap = {
  Shield: Shield,
  Award: Award,
  Tag: Tag,
  Heart: Heart,
  Check: CheckCircle,
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const stagger = (i) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay: i * 0.1 },
});

export default function About() {
  return (
    <div className="bg-white">
      {/* ── Hero Section ── */}
      <section className="relative bg-erode-black text-white overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {/* Green accent line */}
            <div className="w-12 h-1 bg-erode-green mb-6" />

            <span className="text-erode-green font-semibold text-sm uppercase tracking-[0.2em] block mb-4">
              About Us
            </span>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide leading-[1.1] mb-6">
              About Erode Rifles
            </h1>

            {/* Tagline — elegant vertical line separators */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8">
              {["Precision", "Passion", "Performance"].map((word, i) => (
                <span key={word} className="flex items-center gap-x-5">
                  <span className="font-heading text-2xl sm:text-3xl md:text-4xl tracking-wide text-white">
                    {word}
                  </span>
                  {i < 2 && (
                    <span className="w-px h-7 sm:h-8 md:h-9 bg-erode-green/50" />
                  )}
                </span>
              ))}
            </div>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
              At Erode Rifles, we are dedicated to delivering excellence in shooting sports through quality equipment, professional guidance, and a commitment to safety. Whether you are a beginner exploring the sport or an experienced enthusiast, our mission is to provide a trusted environment where skill, discipline, and performance come together.
            </p>
          </motion.div>

          {/* Decorative crosshair */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-10">
            <Crosshair className="w-48 h-48 text-erode-green" strokeWidth={0.5} />
          </div>
        </div>
      </section>

      {/* ── Commitment Section ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <span className="text-erode-green font-semibold text-sm uppercase tracking-[0.15em]">Our Commitment</span>
              <div className="w-10 h-0.5 bg-erode-green mx-auto mt-4 mb-6" />
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                With a focus on quality products, expert training, and customer satisfaction, Erode Rifles continues to support individuals who are passionate about precision shooting and continuous improvement.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "10+", label: "Years of Experience" },
              { value: "5000+", label: "Happy Customers" },
              { value: "100+", label: "Quality Products" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                {...stagger(idx)}
                className="text-center p-6 sm:p-8 bg-white border border-gray-100 rounded-xl hover:border-erode-green/30 transition-colors"
              >
                <p className="font-heading text-3xl sm:text-4xl md:text-5xl text-erode-green leading-none">
                  {stat.value}
                </p>
                <p className="text-sm text-erode-black/60 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Section ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <span className="text-erode-green font-semibold text-sm uppercase tracking-[0.15em]">Our Purpose</span>
              <h2 className="font-heading text-3xl md:text-4xl text-erode-black tracking-wide mt-3 mb-4">
                Our Mission
              </h2>
              <div className="w-10 h-0.5 bg-erode-green mx-auto mb-8" />
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {aboutInfo.mission}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Vision, Values, Support ── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div {...fadeUp}>
              <span className="text-erode-green font-semibold text-sm uppercase tracking-[0.15em]">What Drives Us</span>
              <div className="w-10 h-0.5 bg-erode-green mx-auto mt-4" />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Eye, title: "Our Vision", text: aboutInfo.vision },
              { icon: Target, title: "Our Values", text: aboutInfo.values },
              { icon: HeadphonesIcon, title: "Our Support", text: aboutInfo.support },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                {...stagger(idx)}
                className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 hover:border-erode-green/30 transition-colors group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-erode-green/10 mb-5 group-hover:bg-erode-green/20 transition-colors">
                  <item.icon className="w-6 h-6 text-erode-green" />
                </div>
                <h3 className="font-heading text-xl text-erode-black tracking-wide mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div {...fadeUp}>
              <span className="text-erode-green font-semibold text-sm uppercase tracking-[0.15em]">Why Us</span>
              <h2 className="font-heading text-3xl md:text-4xl text-erode-black tracking-wide mt-3 mb-4">
                Why Choose Us
              </h2>
              <div className="w-10 h-0.5 bg-erode-green mx-auto mb-6" />
              <p className="text-gray-600 text-base max-w-2xl mx-auto">
                We stand out from the rest with our commitment to quality and customer satisfaction.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Shield;
              return (
                <motion.div
                  key={index}
                  {...stagger(index)}
                  className="border border-gray-100 rounded-xl p-6 hover:border-erode-green/30 hover:shadow-sm transition-all group"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-erode-green/10 mb-4 group-hover:bg-erode-green/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-erode-green" />
                  </div>
                  <h3 className="font-heading text-lg text-erode-black tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Store Info Section ── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div {...fadeUp}>
              <span className="text-erode-green font-semibold text-sm uppercase tracking-[0.15em]">Visit Us</span>
              <h2 className="font-heading text-3xl md:text-4xl text-erode-black tracking-wide mt-3 mb-4">
                Get In Touch
              </h2>
              <div className="w-10 h-0.5 bg-erode-green mx-auto mb-6" />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Phone, title: "Phone", lines: [storeInfo.phone1, storeInfo.phone2] },
              { icon: Mail, title: "Email", lines: [storeInfo.email] },
              { icon: MapPin, title: "Address", lines: [storeInfo.address] },
              { icon: Clock, title: "Hours", lines: [storeInfo.hours], accent: storeInfo.sundayHours },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                {...stagger(idx)}
                className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:border-erode-green/30 transition-colors group"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-erode-green/10 mx-auto mb-4 group-hover:bg-erode-green/20 transition-colors">
                  <card.icon className="w-7 h-7 text-erode-green" />
                </div>
                <h3 className="font-heading text-lg text-erode-black tracking-wide mb-2">{card.title}</h3>
                {card.lines.map((line, i) => (
                  <p key={i} className="text-gray-600 text-sm">{line}</p>
                ))}
                {card.accent && (
                  <p className="text-erode-green text-sm font-medium mt-1">{card.accent}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Section ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div {...fadeUp}>
              <span className="text-erode-green font-semibold text-sm uppercase tracking-[0.15em]">Our People</span>
              <h2 className="font-heading text-3xl md:text-4xl text-erode-black tracking-wide mt-3 mb-4">
                Meet Our Team
              </h2>
              <div className="w-10 h-0.5 bg-erode-green mx-auto mb-6" />
              <p className="text-gray-600 text-base max-w-2xl mx-auto">
                Our team of trained professionals and shooting enthusiasts is here to help you choose the right gear and grow in your shooting journey.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                {...fadeUp}
                className="bg-white border border-gray-100 rounded-xl p-8 text-center hover:border-erode-green/30 hover:shadow-sm transition-all"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-erode-green/10 border-2 border-erode-green/30 flex items-center justify-center">
                  <span className="font-heading text-2xl text-erode-green">
                    {member.name.replace("Mr. ", "").charAt(0)}
                  </span>
                </div>
                <h3 className="font-heading text-xl text-erode-black tracking-wide mb-1">
                  {member.name}
                </h3>
                <p className="text-erode-green font-semibold text-sm mb-3">
                  {member.designation}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { Shield, Award, Tag, Heart, CheckCircle, Phone, Mail, MapPin, Clock, Target, Eye, HeadphonesIcon } from "lucide-react";
import { whyChooseUs, teamMembers, achievements, storeInfo, aboutInfo } from "@/data/mockData";
import { motion } from "framer-motion";

const iconMap = {
  Shield: Shield,
  Award: Award,
  Tag: Tag,
  Heart: Heart,
  Check: CheckCircle,
};

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section - Using verified tagline from eroderifles.com */}
      <section className="bg-erode-black text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-erode-green font-semibold text-sm uppercase tracking-widest">
              About Us
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide mt-3 mb-6">
              {aboutInfo.tagline}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {aboutInfo.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Verified from eroderifles.com */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "10+", label: "Years of Experience" },
              { value: "5000+", label: "Happy Customers" },
              { value: "100+", label: "Quality Products" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="text-center p-6 border border-gray-100 rounded-xl hover:border-erode-green/30 transition-colors"
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

      {/* Mission Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-erode-green font-semibold text-sm uppercase tracking-wider">Our Purpose</span>
              <h2 className="font-heading text-3xl md:text-4xl text-erode-black tracking-wide mt-2 mb-6">
                Our Mission
              </h2>
              <div className="w-16 h-1 bg-erode-green mx-auto mb-8" />
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {aboutInfo.mission}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision, Values, Support - From eroderifles.com */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 hover:border-erode-green/30 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-erode-green/10 mb-4">
                <Eye className="w-6 h-6 text-erode-green" />
              </div>
              <h3 className="font-heading text-xl text-erode-black tracking-wide mb-3">Our Vision</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{aboutInfo.vision}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 hover:border-erode-green/30 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-erode-green/10 mb-4">
                <Target className="w-6 h-6 text-erode-green" />
              </div>
              <h3 className="font-heading text-xl text-erode-black tracking-wide mb-3">Our Values</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{aboutInfo.values}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 hover:border-erode-green/30 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-erode-green/10 mb-4">
                <HeadphonesIcon className="w-6 h-6 text-erode-green" />
              </div>
              <h3 className="font-heading text-xl text-erode-black tracking-wide mb-3">Our Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{aboutInfo.support}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-erode-green font-semibold text-sm uppercase tracking-wider">Why Us</span>
            <h2 className="font-heading text-3xl md:text-4xl text-erode-black tracking-wide mt-2 mb-4">
              Why Choose Us
            </h2>
            <div className="w-16 h-1 bg-erode-green mx-auto mb-6" />
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              We stand out from the rest with our commitment to quality and customer satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Shield;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border border-gray-100 rounded-xl p-6 hover:border-erode-green/30 hover:shadow-sm transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-erode-green/10 mb-4">
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

      {/* Store Info Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-erode-green font-semibold text-sm uppercase tracking-wider">Visit Us</span>
            <h2 className="font-heading text-3xl md:text-4xl text-erode-black tracking-wide mt-2 mb-4">
              Get In Touch
            </h2>
            <div className="w-16 h-1 bg-erode-green mx-auto mb-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Card */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:border-erode-green/30 transition-colors">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-erode-green/10 mx-auto mb-4">
                <Phone className="w-7 h-7 text-erode-green" />
              </div>
              <h3 className="font-heading text-lg text-erode-black tracking-wide mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">{storeInfo.phone1}</p>
              <p className="text-gray-600 text-sm">{storeInfo.phone2}</p>
            </div>

            {/* Email Card */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:border-erode-green/30 transition-colors">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-erode-green/10 mx-auto mb-4">
                <Mail className="w-7 h-7 text-erode-green" />
              </div>
              <h3 className="font-heading text-lg text-erode-black tracking-wide mb-2">Email</h3>
              <p className="text-gray-600 text-sm">{storeInfo.email}</p>
            </div>

            {/* Address Card */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:border-erode-green/30 transition-colors">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-erode-green/10 mx-auto mb-4">
                <MapPin className="w-7 h-7 text-erode-green" />
              </div>
              <h3 className="font-heading text-lg text-erode-black tracking-wide mb-2">Address</h3>
              <p className="text-gray-600 text-sm">{storeInfo.address}</p>
            </div>

            {/* Hours Card */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:border-erode-green/30 transition-colors">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-erode-green/10 mx-auto mb-4">
                <Clock className="w-7 h-7 text-erode-green" />
              </div>
              <h3 className="font-heading text-lg text-erode-black tracking-wide mb-2">Hours</h3>
              <p className="text-gray-600 text-sm">{storeInfo.hours}</p>
              <p className="text-erode-green text-sm font-medium">{storeInfo.sundayHours}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-erode-green font-semibold text-sm uppercase tracking-wider">Our People</span>
            <h2 className="font-heading text-3xl md:text-4xl text-erode-black tracking-wide mt-2 mb-4">
              Meet Our Team
            </h2>
            <div className="w-16 h-1 bg-erode-green mx-auto mb-6" />
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Our team of trained professionals and shooting enthusiasts is here to help you choose the right gear and grow in your shooting journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

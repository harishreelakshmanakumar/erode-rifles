"use client";

import { Shield, Award, Tag, Heart, CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import { whyChooseUs, teamMembers, achievements, storeInfo, aboutInfo } from "@/data/mockData";

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
      {/* Hero Section */}
      <section className="bg-erode-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6">
            We&apos;re The Best Rifles Seller
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {aboutInfo.quality} {aboutInfo.team}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-erode-black tracking-wide mb-8">
              Our Mission
            </h2>
            <div className="w-16 h-1 bg-erode-green mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {aboutInfo.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-erode-black tracking-wide mb-8">
              Our Vision
            </h2>
            <div className="w-16 h-1 bg-erode-green mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              To become the most trusted name in shooting sports across India, known for quality products, expert training, and unwavering commitment to the sport.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-erode-black tracking-wide mb-4">
              Why Choose Us
            </h2>
            <div className="w-16 h-1 bg-erode-green mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We stand out from the rest with our commitment to quality and customer satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Shield;
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:border-erode-green transition-colors"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-erode-green/10 mb-4">
                    <IconComponent className="w-6 h-6 text-erode-green" />
                  </div>
                  <h3 className="font-heading text-xl text-erode-black tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Store Info Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-erode-black tracking-wide mb-4">
              Get In Touch
            </h2>
            <div className="w-16 h-1 bg-erode-green mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-erode-green/10 mx-auto mb-4">
                <Phone className="w-7 h-7 text-erode-green" />
              </div>
              <h3 className="font-heading text-xl text-erode-black tracking-wide mb-2">Phone</h3>
              <p className="text-gray-600">{storeInfo.phone1}</p>
            </div>

            {/* Email Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-erode-green/10 mx-auto mb-4">
                <Mail className="w-7 h-7 text-erode-green" />
              </div>
              <h3 className="font-heading text-xl text-erode-black tracking-wide mb-2">Email</h3>
              <p className="text-gray-600">{storeInfo.email}</p>
            </div>

            {/* Address Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-erode-green/10 mx-auto mb-4">
                <MapPin className="w-7 h-7 text-erode-green" />
              </div>
              <h3 className="font-heading text-xl text-erode-black tracking-wide mb-2">Address</h3>
              <p className="text-gray-600">{storeInfo.address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-erode-black tracking-wide mb-4">
              Our Achievements
            </h2>
            <div className="w-16 h-1 bg-erode-green mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A track record of excellence in shooting sports.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-erode-green transition-colors"
              >
                <span className="inline-block bg-erode-green text-erode-black text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  {achievement.year}
                </span>
                <h3 className="font-heading text-2xl text-erode-black tracking-wide mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-erode-black tracking-wide mb-4">
              Meet Our Team
            </h2>
            <div className="w-16 h-1 bg-erode-green mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The passionate professionals behind Erode Rifles.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:border-erode-green transition-colors"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-2 border-erode-green"
                />
                <h3 className="font-heading text-2xl text-erode-black tracking-wide mb-1">
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

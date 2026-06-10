"use client";

import { useState } from "react";
import { Target, Crosshair, Trophy, ChevronDown } from "lucide-react";

const programs = [
  {
    id: "beginner",
    icon: Target,
    title: "Beginner Program",
    description:
      "Perfect for those new to shooting sports. Learn the fundamentals of air rifle handling, safety protocols, and basic marksmanship.",
    duration: "4 Weeks",
  },
  {
    id: "intermediate",
    icon: Crosshair,
    title: "Intermediate Program",
    description:
      "For shooters with basic experience. Improve your accuracy, learn advanced techniques, and prepare for competitions.",
    duration: "8 Weeks",
  },
  {
    id: "advanced",
    icon: Trophy,
    title: "Advanced Program",
    description:
      "Elite training for competitive shooters. Intensive coaching, mental conditioning, and competition preparation.",
    duration: "12 Weeks",
  },
];

export default function Training() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    experienceLevel: "",
    preferredProgram: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const scrollToForm = () => {
    const formSection = document.getElementById("training-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store in localStorage
    const existing = JSON.parse(localStorage.getItem("erodeTrainingApps") || "[]");
    const newApplication = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: "Pending",
    };
    localStorage.setItem(
      "erodeTrainingApps",
      JSON.stringify([...existing, newApplication])
    );

    setSubmitted(true);
    setFormData({
      name: "",
      phone: "",
      email: "",
      age: "",
      experienceLevel: "",
      preferredProgram: "",
      message: "",
    });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-erode-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6">
            Training Programs
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From beginner to competitive shooter, our expert coaches will guide you through every step of your shooting sports journey.
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-erode-black tracking-wide mb-4">
              Our Programs
            </h2>
            <div className="w-16 h-1 bg-erode-green mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose the program that fits your skill level and ambitions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((program) => {
              const IconComponent = program.icon;
              return (
                <div
                  key={program.id}
                  className="border border-gray-200 rounded-lg p-8 hover:border-erode-green transition-colors flex flex-col"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-erode-green/10 mb-6">
                    <IconComponent className="w-7 h-7 text-erode-green" />
                  </div>
                  <h3 className="font-heading text-2xl text-erode-black tracking-wide mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                    {program.description}
                  </p>
                  <div className="mb-6">
                    <span className="inline-block bg-erode-green/10 text-erode-green text-sm font-semibold px-3 py-1 rounded-full">
                      Duration: {program.duration}
                    </span>
                  </div>
                  <button
                    onClick={scrollToForm}
                    className="w-full bg-erode-black text-white font-semibold py-3 rounded-lg hover:bg-erode-black/90 transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="training-form" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-erode-black tracking-wide mb-4">
              Apply For Training
            </h2>
            <div className="w-16 h-1 bg-erode-green mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              Fill out the form below and we&apos;ll get back to you shortly.
            </p>
          </div>

          {submitted && (
            <div className="mb-8 bg-erode-green/10 border border-erode-green rounded-lg p-4 text-center">
              <p className="text-erode-black font-semibold">
                Application submitted successfully! We&apos;ll contact you soon.
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 space-y-5"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-erode-black mb-1.5"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
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
                htmlFor="phone"
                className="block text-sm font-semibold text-erode-black mb-1.5"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
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
                htmlFor="email"
                className="block text-sm font-semibold text-erode-black mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-erode-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-erode-green focus:border-transparent transition"
              />
            </div>

            {/* Age */}
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-semibold text-erode-black mb-1.5"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="10"
                max="80"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-erode-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-erode-green focus:border-transparent transition"
              />
            </div>

            {/* Experience Level */}
            <div>
              <label
                htmlFor="experienceLevel"
                className="block text-sm font-semibold text-erode-black mb-1.5"
              >
                Experience Level
              </label>
              <div className="relative">
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  required
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-erode-black appearance-none focus:outline-none focus:ring-2 focus:ring-erode-green focus:border-transparent transition bg-white"
                >
                  <option value="">Select experience level</option>
                  <option value="None">None</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Preferred Program */}
            <div>
              <label
                htmlFor="preferredProgram"
                className="block text-sm font-semibold text-erode-black mb-1.5"
              >
                Preferred Program
              </label>
              <div className="relative">
                <select
                  id="preferredProgram"
                  name="preferredProgram"
                  required
                  value={formData.preferredProgram}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-erode-black appearance-none focus:outline-none focus:ring-2 focus:ring-erode-green focus:border-transparent transition bg-white"
                >
                  <option value="">Select program</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-erode-black mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your goals or any questions you have"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-erode-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-erode-green focus:border-transparent transition resize-vertical"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-erode-green text-erode-black font-semibold py-3 rounded-lg hover:bg-erode-green/90 transition-colors text-lg"
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

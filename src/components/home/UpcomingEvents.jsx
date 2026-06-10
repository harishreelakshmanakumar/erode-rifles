"use client";

import { useState } from "react";
import { events } from "@/data/mockData";
import { Calendar, Clock, MapPin } from "lucide-react";

const TABS = ["All", "Competition", "Training", "Event", "Workshop"];

export default function UpcomingEvents() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredEvents =
    activeTab === "All"
      ? events
      : events.filter((e) => e.type === activeTab);

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <span className="text-erode-green font-semibold text-sm uppercase tracking-wider">
            What&apos;s Happening
          </span>
          <h2 className="font-heading text-4xl text-erode-black mt-2">
            Upcoming Events &amp; Competitions
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === tab
                  ? "bg-erode-green text-erode-black"
                  : "border border-erode-black/20 text-erode-black/70 hover:border-erode-black/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => {
            const dateParts = event.date.split(" ");
            const dayNum = dateParts[1]?.replace(",", "") || "";
            const month = dateParts[0] || "";

            return (
              <div
                key={event.id}
                className="border border-gray-200 rounded-lg p-6 flex gap-5"
              >
                {/* Date Badge */}
                <div className="flex-shrink-0 bg-erode-black rounded-lg w-16 h-16 flex flex-col items-center justify-center">
                  <span className="text-erode-green text-xl font-bold leading-none">
                    {dayNum}
                  </span>
                  <span className="text-white text-xs uppercase mt-0.5">
                    {month}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <span className="inline-block text-xs border border-erode-black/20 text-erode-black/70 px-2.5 py-0.5 rounded">
                    {event.type}
                  </span>
                  <h3 className="font-semibold text-lg text-erode-black">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-erode-black/60">
                    <Clock size={14} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-erode-black/60">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                  <button className="mt-2 border-2 border-erode-black text-erode-black font-semibold px-5 py-1.5 rounded-lg text-sm hover:bg-erode-black hover:text-white transition-colors cursor-pointer">
                    Register
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRouter } from "@/context/RouterContext";

export default function ContactCTA() {
  const { navigate } = useRouter();

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <h2 className="font-heading text-4xl md:text-5xl text-erode-black">
          Ready to Start Your Shooting Journey?
        </h2>
        <p className="text-erode-black/70 text-lg max-w-2xl mx-auto leading-relaxed">
          Whether you&apos;re looking for premium air rifles, professional training,
          or expert advice, we&apos;re here to help.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button
            onClick={() => navigate("/shop")}
            className="bg-erode-green text-erode-black font-semibold px-8 py-3 rounded-lg hover:bg-erode-green/90 transition-colors cursor-pointer"
          >
            Shop Products
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="border-2 border-erode-black text-erode-black font-semibold px-8 py-3 rounded-lg hover:bg-erode-black hover:text-white transition-colors cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

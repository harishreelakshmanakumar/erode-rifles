"use client";

import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryGrid from "@/components/home/CategoryGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TrainingCTA from "@/components/home/TrainingCTA";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import ReviewsSection from "@/components/home/ReviewsSection";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <CategoryGrid />
      <WhyChooseUs />
      <TrainingCTA />
      <UpcomingEvents />
      <ReviewsSection />
      <ContactCTA />
    </div>
  );
}

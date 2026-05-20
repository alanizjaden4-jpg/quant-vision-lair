import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Ticker } from "@/components/landing/Ticker";
import { Features } from "@/components/landing/Features";
import { LiveStreamPreview } from "@/components/landing/LiveStreamPreview";
import { Community } from "@/components/landing/Community";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quantdev — Trade Live With Real-Time Market Insight" },
      { name: "description", content: "A private live trading community with real-time streams, market discussions, and institutional-grade analysis from elite traders." },
      { property: "og:title", content: "Quantdev — Live Trading Community" },
      { property: "og:description", content: "Premium trading Discord with integrated live streaming. Join 12,000+ traders." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Ticker />
      <Features />
      <LiveStreamPreview />
      <Community />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}

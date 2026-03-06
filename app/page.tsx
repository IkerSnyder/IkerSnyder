import About from "@/components/About";
import BeforeAfter from "@/components/BeforeAfter";
import Contact from "@/components/Contact";
import FlowCanvas from "@/components/FlowCanvas";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import OutboundAudit from "@/components/OutboundAudit";
import PatternInterrupt from "@/components/PatternInterrupt";
import Results from "@/components/Results";
import Services from "@/components/Services";
import WhoItsFor from "@/components/WhoItsFor";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        {/* 1. Hook — pain-first + live counter */}
        <Hero />

        {/* 2. Pattern interrupt — the 12 hr number */}
        <PatternInterrupt />

        {/* 3. ICP self-qualification */}
        <WhoItsFor />

        {/* 4. Before / After comparison */}
        <BeforeAfter />

        {/* 5. Interactive outbound audit quiz */}
        <OutboundAudit />

        {/* 6. Workflow walkthrough — user controlled */}
        <FlowCanvas />

        {/* 7. Honest results framing */}
        <Results />

        {/* 8. Services detail */}
        <Services />

        {/* 9. About + availability */}
        <About />

        {/* 10. Contact CTA */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}

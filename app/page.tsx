import About from "@/components/About";
import Contact from "@/components/Contact";
import FlowCanvas from "@/components/FlowCanvas";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <FlowCanvas />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

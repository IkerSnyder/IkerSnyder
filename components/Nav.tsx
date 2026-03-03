"use client";

import { useEffect, useRef } from "react";

const navItems = [
  { href: "#workflow", label: "Workflow" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    const ring = ringRef.current;

    if (!cursor || !ring) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frameId = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animateCursor = () => {
      cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      frameId = window.requestAnimationFrame(animateCursor);
    };

    document.addEventListener("mousemove", handleMouseMove);
    frameId = window.requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />

      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#home" className="nav-brand" aria-label="Go to top of page">
          <span className="nav-logo">IS</span>
          <span className="nav-brand-copy">Automation systems</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="nav-cta">
          Contact
        </a>
      </nav>
    </>
  );
}

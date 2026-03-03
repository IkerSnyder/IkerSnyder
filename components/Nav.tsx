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
    let isVisible = false;

    const showCursor = () => {
      if (isVisible) {
        return;
      }

      isVisible = true;
      cursor.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const hideCursor = () => {
      isVisible = false;
      cursor.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      showCursor();
    };

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      frameId = window.requestAnimationFrame(animateCursor);
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", hideCursor);
    window.addEventListener("blur", hideCursor);
    frameId = window.requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
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

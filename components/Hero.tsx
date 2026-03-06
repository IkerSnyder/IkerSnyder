"use client";

import { useEffect, useState } from "react";

const capabilityTags = [
  "LinkedIn outreach",
  "Lead sourcing",
  "Email campaigns",
  "n8n automation",
];

function useWeeklyWastedMinutes() {
  const compute = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(now);
    monday.setDate(now.getDate() - daysFromMonday);
    monday.setHours(0, 0, 0, 0);
    const elapsedSeconds = (now.getTime() - monday.getTime()) / 1000;
    // 15 hrs/week = 900 min/week = 900/604800 min per second
    return elapsedSeconds * (900 / 604800);
  };

  const [minutes, setMinutes] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMinutes(compute());
    const id = setInterval(() => setMinutes(compute()), 5000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { minutes, mounted };
}

export default function Hero() {
  const { minutes, mounted } = useWeeklyWastedMinutes();

  const displayHours = Math.floor(minutes / 60);
  const displayMins = Math.floor(minutes % 60);
  const displayStr = mounted
    ? `${displayHours}h ${displayMins.toString().padStart(2, "0")}m`
    : "0h 00m";

  return (
    <section id="home" className="hero" aria-label="Hero section">
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow hero-glow-secondary" aria-hidden="true" />

      <div className="hero-layout">
        <div className="hero-copy">
          <div className="hero-tag">{"// Available for new projects"}</div>

          <h1 className="hero-title">
            Your outbound<br />
            needs a system.<br />
            <span className="accent">Not another hire.</span>
          </h1>

          <p className="hero-sub">
            I build done-for-you LinkedIn and email outreach systems for B2B
            service companies that need a repeatable pipeline without hiring a
            full sales team.
          </p>

          <div className="hero-actions">
            <div className="hero-cta-group">
              <a href="#contact" className="hero-cta">
                <span>Book a discovery call</span>
                <span aria-hidden="true">→</span>
              </a>
              <span className="hero-cta-sub">
                15 min. You leave with a diagnosis and a recommended build plan.
              </span>
            </div>
          </div>

          <div className="hero-capability-row" aria-label="Core capabilities">
            {capabilityTags.map((tag) => (
              <span key={tag} className="hero-capability-tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="hero-counter-wrap" aria-label="Weekly manual prospecting time estimate">
            <p className="hero-counter-label">
              Hours spent on manual<br />
              prospecting this week<br />
              <em style={{ fontStyle: "normal", opacity: 0.7 }}>avg. 15 hrs/week per rep</em>
            </p>
            <div className="hero-counter-display">
              <span className="hero-counter-number" aria-live="polite">
                {displayStr}
              </span>
              <span className="hero-counter-unit">this week</span>
              <span className="hero-counter-note">resets Monday · industry estimate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

type Question = {
  id: string;
  question: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: "team_size",
    question: "What is your current sales team headcount?",
    options: ["Just me", "2 to 5 people", "6 to 15 people", "15+ people"],
  },
  {
    id: "lead_gen",
    question: "How are you currently generating outbound leads?",
    options: [
      "Fully manual: LinkedIn and email by hand",
      "Mix of manual and a few tools",
      "Partially automated but inconsistent",
      "Mostly automated already",
    ],
  },
  {
    id: "bottleneck",
    question: "Where does outreach most often break down for you?",
    options: [
      "Finding enough qualified prospects",
      "Starting conversations that get replies",
      "Following up consistently after the first touch",
      "Qualifying replies and routing to the right next step",
    ],
  },
  {
    id: "deal_size",
    question: "What is your typical deal size?",
    options: ["Under $5k", "$5k to $25k", "$25k to $100k", "$100k+"],
  },
];

type Diagnosis = {
  title: string;
  body: string;
  offer: string;
};

const diagnoses: Record<string, Diagnosis> = {
  "Finding enough qualified prospects": {
    title: "Your pipeline problem starts at the top of the funnel.",
    body:
      "You are building lists instead of having conversations. LinkedIn automation sources, filters, and enriches prospects weekly based on your ICP. No manual searching.",
    offer: "Outbound System Buildout",
  },
  "Starting conversations that get replies": {
    title: "You have leads. They are going cold before you engage.",
    body:
      "Automated DM sequences with personalised hooks get replies at scale. The first message does the work so you only show up when there is already interest.",
    offer: "Outreach Retainer",
  },
  "Following up consistently after the first touch": {
    title: "You are leaving pipeline on the table after the first touch.",
    body:
      "Most deals close after 5 or more touchpoints but manual follow-up falls off after one or two. Automated sequences keep every lead warm so nothing slips through.",
    offer: "Outreach Retainer",
  },
  "Qualifying replies and routing to the right next step": {
    title: "You are spending time on conversations that will not close.",
    body:
      "An automated qualification layer scores and routes replies by intent. You focus on leads worth pursuing. Lower-intent replies get nurtured until they are ready.",
    offer: "Outbound Audit",
  },
};

const letters = ["A", "B", "C", "D"];

export default function OutboundAudit() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const current = questions[step];
  const selected = current ? answers[current.id] : undefined;
  const progress = done ? 100 : (step / questions.length) * 100;

  const handleSelect = (option: string) => {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: option }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  const bottleneck = answers["bottleneck"];
  const diagnosis = bottleneck ? diagnoses[bottleneck] : null;

  return (
    <section id="audit" className="audit-section" aria-label="Outbound audit quiz">
      <div className="section-label">{"// Quick diagnosis"}</div>
      <h2 className="section-title">What is slowing your outbound?</h2>
      <p className="section-sub">
        Four questions. Get a personalised read on where your outreach is leaking pipeline.
      </p>

      <div className="audit-card">
        <div className="audit-progress-bar" aria-hidden="true">
          <div
            className="audit-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {!done ? (
          <>
            <div className="audit-step-label">
              Question {step + 1} of {questions.length}
            </div>
            <h3 className="audit-question">{current.question}</h3>

            <div className="audit-options" role="radiogroup" aria-label={current.question}>
              {current.options.map((option, i) => (
                <button
                  key={option}
                  role="radio"
                  aria-checked={selected === option}
                  className={`audit-option${selected === option ? " selected" : ""}`}
                  onClick={() => handleSelect(option)}
                >
                  <span className="audit-option-letter" aria-hidden="true">
                    {letters[i]}
                  </span>
                  {option}
                </button>
              ))}
            </div>

            <div className="audit-nav">
              <button
                className="audit-btn audit-btn--back"
                onClick={handleBack}
                disabled={step === 0}
                aria-label="Previous question"
              >
                Back
              </button>
              <button
                className="audit-btn audit-btn--next"
                onClick={handleNext}
                disabled={!selected}
                aria-label={
                  step < questions.length - 1 ? "Next question" : "See my diagnosis"
                }
              >
                {step < questions.length - 1 ? "Next" : "See diagnosis"}
              </button>
            </div>
          </>
        ) : (
          <div className="audit-result">
            <div className="audit-result-label">{"// Your diagnosis"}</div>
            {diagnosis ? (
              <>
                <h3 className="audit-result-title">{diagnosis.title}</h3>
                <p className="audit-result-body">{diagnosis.body}</p>
                <p className="audit-result-offer">
                  Recommended offer: <strong>{diagnosis.offer}</strong>
                </p>
              </>
            ) : (
              <>
                <h3 className="audit-result-title">
                  Your outbound has room to run on autopilot.
                </h3>
                <p className="audit-result-body">
                  Based on your answers, there are clear points in your process
                  where automation can remove friction and increase output without
                  adding headcount.
                </p>
                <p className="audit-result-offer">
                  Recommended offer: <strong>Outbound System Buildout</strong>
                </p>
              </>
            )}
            <a href="#contact" className="audit-result-cta">
              Book a discovery call
            </a>
            <button className="audit-restart" onClick={handleRestart}>
              Retake the audit
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

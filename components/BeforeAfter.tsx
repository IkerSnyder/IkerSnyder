const beforeSteps = [
  {
    time: "9:00",
    task: "Open LinkedIn",
    detail: "Start manually scrolling to find prospects",
    variant: "pain",
  },
  {
    time: "9:45",
    task: "Build a prospect list",
    detail: "Copy names, titles, and companies into a spreadsheet",
    variant: "pain",
  },
  {
    time: "11:00",
    task: "Send connection requests",
    detail: "Write personalised notes one by one",
    variant: "pain",
  },
  {
    time: "1:30",
    task: "Check replies",
    detail: "Scroll through notifications, lose track of threads",
    variant: "pain",
  },
  {
    time: "3:00",
    task: "Manual follow-ups",
    detail: "Remind yourself who hasn't replied in 3 days",
    variant: "pain",
  },
  {
    time: "5:00",
    task: "Update CRM",
    detail: "Manually log every interaction before closing the laptop",
    variant: "pain",
  },
];

const afterSteps = [
  {
    time: "9:00",
    task: "Check overnight replies",
    detail: "System ran while you slept. Warm leads already flagged",
    variant: "gain",
  },
  {
    time: "9:25",
    task: "Respond to interested prospects",
    detail: "Pre-qualified by reply detection, ready to move forward",
    variant: "gain",
  },
  {
    time: "10:00",
    task: "Book a call",
    detail: "Meeting landed directly into your calendar",
    variant: "gain",
  },
  {
    time: "10:30",
    task: "The rest of your day is yours",
    detail: "Pipeline keeps filling in the background",
    variant: "gain",
  },
];

export default function BeforeAfter() {
  return (
    <section
      id="before-after"
      className="before-after-section"
      aria-label="Before and after comparison"
    >
      <div className="section-label">{"// The difference"}</div>
      <h2 className="section-title">Manual Monday vs Automated Monday</h2>
      <p className="section-sub">
        Same goal. Completely different experience and output.
      </p>

      <div className="ba-grid">
        {/* Before column */}
        <div className="ba-col ba-col--before" aria-label="Manual outreach day">
          <div className="ba-col-header">
            <span className="ba-col-title">Without automation</span>
            <span className="ba-col-chip">12 hrs manual work</span>
          </div>

          <div className="ba-timeline">
            {beforeSteps.map((step) => (
              <div key={step.time} className={`ba-step ba-step--${step.variant}`}>
                <span className="ba-step-time">{step.time}</span>
                <div className="ba-step-body">
                  <div className="ba-step-task">{step.task}</div>
                  <div className="ba-step-detail">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="ba-summary">
            Result: exhausted rep, inconsistent pipeline, leads slipping through.
          </div>
        </div>

        {/* After column */}
        <div className="ba-col ba-col--after" aria-label="Automated outreach day">
          <div className="ba-col-header">
            <span className="ba-col-title">With automation</span>
            <span className="ba-col-chip">~30 min of actual work</span>
          </div>

          <div className="ba-timeline">
            {afterSteps.map((step) => (
              <div key={step.time} className={`ba-step ba-step--${step.variant}`}>
                <span className="ba-step-time">{step.time}</span>
                <div className="ba-step-body">
                  <div className="ba-step-task">{step.task}</div>
                  <div className="ba-step-detail">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="ba-summary">
            Result: consistent pipeline, more time closing, no dropped leads.
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";

type NodeId = "n1" | "n2" | "n3" | "n4" | "n5" | "n6";
type DotId = "d1r" | "d2l" | "d2r" | "d3l" | "d3r" | "d4l" | "d4r" | "d5l" | "d5r" | "d6l";
type PathId = "p12" | "p13" | "p24" | "p35" | "p46" | "p56";
type DotClass = "lit" | "lit2";

type FlowNode = {
  id: NodeId;
  icon: string;
  title: string;
  subtitle: string;
  style: CSSProperties;
  dots: Array<{ id: DotId; side: "left" | "right" }>;
};

type Connection = {
  from: NodeId;
  fromDot: "left" | "right";
  to: NodeId;
  toDot: "left" | "right";
  id: PathId;
};

type SequenceStep = {
  nodes: NodeId[];
  dots: Array<[DotId, DotClass]>;
  paths: PathId[];
  label: string;
};

const flowNodes: FlowNode[] = [
  {
    id: "n1",
    icon: "/LI",
    title: "LinkedIn Profile",
    subtitle: "Target ICP found",
    style: { left: "4%", top: "50%", transform: "translateY(-50%)" },
    dots: [{ id: "d1r", side: "right" }],
  },
  {
    id: "n2",
    icon: "/ENR",
    title: "Enrich Lead",
    subtitle: "Pull email + data",
    style: { left: "26%", top: "20%" },
    dots: [
      { id: "d2l", side: "left" },
      { id: "d2r", side: "right" },
    ],
  },
  {
    id: "n3",
    icon: "/DM",
    title: "LinkedIn DM",
    subtitle: "Personalised outreach",
    style: { left: "26%", top: "62%" },
    dots: [
      { id: "d3l", side: "left" },
      { id: "d3r", side: "right" },
    ],
  },
  {
    id: "n4",
    icon: "/SEQ",
    title: "Email Sequence",
    subtitle: "3-touch campaign",
    style: { left: "52%", top: "20%" },
    dots: [
      { id: "d4l", side: "left" },
      { id: "d4r", side: "right" },
    ],
  },
  {
    id: "n5",
    icon: "/QL",
    title: "Reply Detected",
    subtitle: "Auto-qualify lead",
    style: { left: "52%", top: "62%" },
    dots: [
      { id: "d5l", side: "left" },
      { id: "d5r", side: "right" },
    ],
  },
  {
    id: "n6",
    icon: "/CRM",
    title: "CRM Updated",
    subtitle: "Ready to close",
    style: { left: "76%", top: "50%", transform: "translateY(-50%)" },
    dots: [{ id: "d6l", side: "left" }],
  },
];

const connections: Connection[] = [
  { from: "n1", fromDot: "right", to: "n2", toDot: "left", id: "p12" },
  { from: "n1", fromDot: "right", to: "n3", toDot: "left", id: "p13" },
  { from: "n2", fromDot: "right", to: "n4", toDot: "left", id: "p24" },
  { from: "n3", fromDot: "right", to: "n5", toDot: "left", id: "p35" },
  { from: "n4", fromDot: "right", to: "n6", toDot: "left", id: "p46" },
  { from: "n5", fromDot: "right", to: "n6", toDot: "left", id: "p56" },
];

const sequence: SequenceStep[] = [
  {
    label: "ICP prospect identified on LinkedIn",
    nodes: ["n1"],
    dots: [["d1r", "lit"]],
    paths: [],
  },
  {
    label: "Lead enriched. Email and data pulled automatically",
    nodes: ["n2", "n3"],
    dots: [["d2l", "lit"], ["d3l", "lit"]],
    paths: ["p12", "p13"],
  },
  {
    label: "3-touch email sequence triggered",
    nodes: ["n4"],
    dots: [["d2r", "lit"], ["d4l", "lit"]],
    paths: ["p24"],
  },
  {
    label: "Reply detected. Lead auto-qualified",
    nodes: ["n5"],
    dots: [["d3r", "lit"], ["d5l", "lit"]],
    paths: ["p35"],
  },
  {
    label: "CRM updated. Pipeline-ready, handed off to close",
    nodes: ["n6"],
    dots: [["d4r", "lit"], ["d5r", "lit"], ["d6l", "lit2"]],
    paths: ["p46", "p56"],
  },
];

export default function FlowCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<Record<NodeId, HTMLDivElement | null>>({
    n1: null, n2: null, n3: null, n4: null, n5: null, n6: null,
  });
  const dotRefs = useRef<Record<DotId, HTMLDivElement | null>>({
    d1r: null, d2l: null, d2r: null, d3l: null,
    d3r: null, d4l: null, d4r: null, d5l: null, d5r: null, d6l: null,
  });
  const pathRefs = useRef<Partial<Record<PathId, SVGPathElement>>>({});
  const gradientId = useId().replace(/:/g, "");

  const [currentStep, setCurrentStep] = useState(-1);
  const [pathsReady, setPathsReady] = useState(false);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getDotPoint = (element: HTMLDivElement, side: "left" | "right") => {
    const canvas = canvasRef.current!;
    const canvasRect = canvas.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    return {
      x: side === "right" ? elementRect.right - canvasRect.left : elementRect.left - canvasRect.left,
      y: elementRect.top - canvasRect.top + elementRect.height / 2,
    };
  };

  const makePath = (x1: number, y1: number, x2: number, y2: number) => {
    const curvePull = (x2 - x1) * 0.5;
    return `M ${x1} ${y1} C ${x1 + curvePull} ${y1}, ${x2 - curvePull} ${y2}, ${x2} ${y2}`;
  };

  const drawPaths = useCallback(() => {
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    if (!canvas || !svg) return;

    svg.replaceChildren();
    svg.setAttribute("viewBox", `0 0 ${canvas.clientWidth} ${canvas.clientHeight}`);
    pathRefs.current = {};

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", gradientId);
    gradient.setAttribute("gradientUnits", "userSpaceOnUse");

    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#7C3AED");

    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#A855F7");

    gradient.append(stop1, stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);

    connections.forEach((conn) => {
      const fromEl = nodeRefs.current[conn.from];
      const toEl = nodeRefs.current[conn.to];
      if (!fromEl || !toEl) return;

      const from = getDotPoint(fromEl, conn.fromDot);
      const to = getDotPoint(toEl, conn.toDot);
      const d = makePath(from.x, from.y, to.x, to.y);

      const base = document.createElementNS("http://www.w3.org/2000/svg", "path");
      base.setAttribute("d", d);
      base.setAttribute("fill", "none");
      base.setAttribute("stroke", "#221B3A");
      base.setAttribute("stroke-width", "1.5");
      svg.appendChild(base);

      const animated = document.createElementNS("http://www.w3.org/2000/svg", "path");
      animated.setAttribute("d", d);
      animated.setAttribute("fill", "none");
      animated.setAttribute("stroke", `url(#${gradientId})`);
      animated.setAttribute("stroke-width", "1.5");
      animated.setAttribute("opacity", "0");

      const length = typeof animated.getTotalLength === "function"
        ? animated.getTotalLength()
        : 200;
      animated.style.strokeDasharray = `${length}`;
      animated.style.strokeDashoffset = `${length}`;

      svg.appendChild(animated);
      pathRefs.current[conn.id] = animated;
    });

    setPathsReady(true);
  }, [gradientId]);

  const resetAll = useCallback(() => {
    Object.values(nodeRefs.current).forEach((node) => {
      node?.classList.remove("active", "active2");
    });
    Object.values(dotRefs.current).forEach((dot) => {
      dot?.classList.remove("lit", "lit2");
    });
    Object.values(pathRefs.current).forEach((path) => {
      if (!path) return;
      const length = Number(path.style.strokeDasharray) || 200;
      path.setAttribute("opacity", "0");
      path.style.transition = "none";
      path.style.strokeDashoffset = `${length}`;
    });
  }, []);

  const applyStep = useCallback((stepIndex: number) => {
    if (stepIndex < 0) {
      resetAll();
      return;
    }
    // Accumulate all steps up to and including stepIndex
    resetAll();
    for (let i = 0; i <= stepIndex; i++) {
      const s = sequence[i];
      s.nodes.forEach((nodeId) => {
        nodeRefs.current[nodeId]?.classList.add(nodeId === "n6" ? "active2" : "active");
      });
      s.dots.forEach(([dotId, cls]) => {
        dotRefs.current[dotId]?.classList.add(cls);
      });
      s.paths.forEach((pathId) => {
        const path = pathRefs.current[pathId];
        if (!path) return;
        path.setAttribute("opacity", "1");
        path.style.transition = i === stepIndex
          ? "stroke-dashoffset 0.55s ease"
          : "none";
        path.style.strokeDashoffset = "0";
      });
    }
  }, [resetAll]);

  // Draw paths on mount and on resize
  useEffect(() => {
    drawPaths();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && canvasRef.current) {
      ro = new ResizeObserver(() => {
        drawPaths();
        // Re-apply current step after redraw
        setCurrentStep((prev) => {
          setTimeout(() => applyStep(prev), 50);
          return prev;
        });
      });
      ro.observe(canvasRef.current);
    }
    return () => ro?.disconnect();
  }, [drawPaths, applyStep]);

  // Auto-play: advance every 1.4s, pause 2s on last step then loop
  useEffect(() => {
    if (!pathsReady) return;
    applyStep(currentStep);

    const delay = currentStep >= sequence.length - 1 ? 2200 : 1400;
    autoRef.current = setTimeout(() => {
      setCurrentStep((s) =>
        s >= sequence.length - 1 ? -1 : s + 1
      );
    }, delay);

    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
    };
  }, [currentStep, pathsReady, applyStep]);

  const setNodeRef = (id: NodeId) => (el: HTMLDivElement | null) => {
    nodeRefs.current[id] = el;
  };
  const setDotRef = (id: DotId) => (el: HTMLDivElement | null) => {
    dotRefs.current[id] = el;
  };

  const stepLabel = currentStep >= 0 ? sequence[currentStep].label : "";

  return (
    <section
      id="workflow"
      className="automation-section"
      aria-label="Automation workflow visualization"
    >
      <div className="section-label">{"// How it works"}</div>
      <h2 className="section-title">
        Automation that<br />actually works
      </h2>
      <p className="section-sub">
        A real lead generation workflow, the same kind I build for every client.
      </p>

      {/* Desktop canvas */}
      <div ref={canvasRef} className="flow-canvas flow-canvas-desktop">
        <div className="canvas-label">interactive workflow preview</div>
        <svg ref={svgRef} className="flow-svg" aria-hidden="true" />

        {flowNodes.map((node) => (
          <div
            key={node.id}
            id={node.id}
            ref={setNodeRef(node.id)}
            className="node"
            style={node.style}
          >
            <div className="node-icon" aria-hidden="true">{node.icon}</div>
            <div className="node-title">{node.title}</div>
            <div className="node-sub">{node.subtitle}</div>
            {node.dots.map((dot) => (
              <div
                key={dot.id}
                id={dot.id}
                ref={setDotRef(dot.id)}
                className={`node-dot ${dot.side}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Step description */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          letterSpacing: "0.14em",
          color: "var(--muted)",
          marginTop: "0.85rem",
          minHeight: "1.2em",
          transition: "opacity 0.3s ease",
        }}
        aria-live="polite"
      >
        {stepLabel}
      </p>

      {/* Mobile stack */}
      <div className="flow-stack-mobile" aria-label="Workflow steps">
        {flowNodes.map((node, index) => (
          <div key={node.id} className="flow-stack-step">
            <div className="flow-stack-rail" aria-hidden="true" />
            <article className="flow-stack-card">
              <div className="flow-stack-card-top">
                <span className="node-icon flow-stack-icon">{node.icon}</span>
                <span className="flow-stack-index">{`0${index + 1}`}</span>
              </div>
              <div className="flow-stack-title">{node.title}</div>
              <p className="flow-stack-subtitle">{node.subtitle}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

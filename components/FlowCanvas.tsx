"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";

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
  { nodes: ["n1"], dots: [["d1r", "lit"]], paths: [] },
  { nodes: ["n2", "n3"], dots: [["d2l", "lit"], ["d3l", "lit"]], paths: ["p12", "p13"] },
  { nodes: ["n4"], dots: [["d2r", "lit"], ["d4l", "lit"]], paths: ["p24"] },
  { nodes: ["n5"], dots: [["d3r", "lit"], ["d5l", "lit"]], paths: ["p35"] },
  {
    nodes: ["n6"],
    dots: [["d4r", "lit"], ["d5r", "lit"], ["d6l", "lit2"]],
    paths: ["p46", "p56"],
  },
];

export default function FlowCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<Record<NodeId, HTMLDivElement | null>>({
    n1: null,
    n2: null,
    n3: null,
    n4: null,
    n5: null,
    n6: null,
  });
  const dotRefs = useRef<Record<DotId, HTMLDivElement | null>>({
    d1r: null,
    d2l: null,
    d2r: null,
    d3l: null,
    d3r: null,
    d4l: null,
    d4r: null,
    d5l: null,
    d5r: null,
    d6l: null,
  });
  const pathRefs = useRef<Partial<Record<PathId, SVGPathElement>>>({});
  const gradientId = useId().replace(/:/g, "");

  useEffect(() => {
    const canvas = canvasRef.current;
    const svg = svgRef.current;

    if (!canvas || !svg) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeoutIds: number[] = [];
    let step = 0;

    const schedule = (callback: () => void, delay: number) => {
      const timeoutId = window.setTimeout(callback, delay);
      timeoutIds.push(timeoutId);
    };

    const clearTimers = () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIds.length = 0;
    };

    const getDotPoint = (element: HTMLDivElement, side: "left" | "right") => {
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

    const drawPaths = () => {
      svg.replaceChildren();
      svg.setAttribute("viewBox", `0 0 ${canvas.clientWidth} ${canvas.clientHeight}`);
      pathRefs.current = {};

      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
      gradient.setAttribute("id", gradientId);
      gradient.setAttribute("gradientUnits", "userSpaceOnUse");

      const start = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      start.setAttribute("offset", "0%");
      start.setAttribute("stop-color", "#00e5ff");

      const end = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      end.setAttribute("offset", "100%");
      end.setAttribute("stop-color", "#7b61ff");

      gradient.append(start, end);
      defs.appendChild(gradient);
      svg.appendChild(defs);

      connections.forEach((connection) => {
        const fromEl = nodeRefs.current[connection.from];
        const toEl = nodeRefs.current[connection.to];

        if (!fromEl || !toEl) {
          return;
        }

        const fromPoint = getDotPoint(fromEl, connection.fromDot);
        const toPoint = getDotPoint(toEl, connection.toDot);
        const d = makePath(fromPoint.x, fromPoint.y, toPoint.x, toPoint.y);

        const basePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        basePath.setAttribute("d", d);
        basePath.setAttribute("fill", "none");
        basePath.setAttribute("stroke", "#1a2535");
        basePath.setAttribute("stroke-width", "1.5");
        svg.appendChild(basePath);

        const animatedPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        animatedPath.setAttribute("d", d);
        animatedPath.setAttribute("fill", "none");
        animatedPath.setAttribute("stroke", `url(#${gradientId})`);
        animatedPath.setAttribute("stroke-width", "1.5");
        animatedPath.setAttribute("opacity", "0");

        const length =
          typeof animatedPath.getTotalLength === "function" ? animatedPath.getTotalLength() : 200;

        animatedPath.style.strokeDasharray = `${length}`;
        animatedPath.style.strokeDashoffset = `${length}`;

        svg.appendChild(animatedPath);
        pathRefs.current[connection.id] = animatedPath;
      });
    };

    const resetAll = () => {
      Object.entries(nodeRefs.current).forEach(([id, node]) => {
        if (!node) {
          return;
        }

        node.classList.remove("active", "active2");

        if (id === "n6") {
          node.classList.remove("active2");
        }
      });

      Object.values(dotRefs.current).forEach((dot) => {
        dot?.classList.remove("lit", "lit2");
      });

      Object.values(pathRefs.current).forEach((path) => {
        if (!path) {
          return;
        }

        const length =
          Number(path.style.strokeDasharray) ||
          (typeof path.getTotalLength === "function" ? path.getTotalLength() : 200);

        path.setAttribute("opacity", "0");
        path.style.transition = "none";
        path.style.strokeDashoffset = `${length}`;
      });
    };

    const animatePath = (pathId: PathId) => {
      const path = pathRefs.current[pathId];

      if (!path) {
        return;
      }

      path.setAttribute("opacity", "1");
      path.style.transition = "stroke-dashoffset 0.6s ease";
      path.style.strokeDashoffset = "0";
    };

    const showStaticState = () => {
      resetAll();

      Object.entries(nodeRefs.current).forEach(([id, node]) => {
        if (!node) {
          return;
        }

        node.classList.add(id === "n6" ? "active2" : "active");
      });

      Object.entries(dotRefs.current).forEach(([id, dot]) => {
        if (!dot) {
          return;
        }

        dot.classList.add(id === "d6l" ? "lit2" : "lit");
      });

      Object.values(pathRefs.current).forEach((path) => {
        if (!path) {
          return;
        }

        path.setAttribute("opacity", "1");
        path.style.transition = "none";
        path.style.strokeDashoffset = "0";
      });
    };

    const runStep = () => {
      if (step === 0) {
        resetAll();
      }

      if (step >= sequence.length) {
        step = 0;
        schedule(runStep, 1500);
        return;
      }

      const currentStep = sequence[step];

      currentStep.nodes.forEach((nodeId) => {
        nodeRefs.current[nodeId]?.classList.add(nodeId === "n6" ? "active2" : "active");
      });

      currentStep.dots.forEach(([dotId, className]) => {
        dotRefs.current[dotId]?.classList.add(className);
      });

      currentStep.paths.forEach(animatePath);

      step += 1;
      schedule(runStep, step >= sequence.length ? 2000 : 900);
    };

    const startSequence = () => {
      clearTimers();
      step = 0;
      drawPaths();

      if (prefersReducedMotion) {
        showStaticState();
        return;
      }

      schedule(runStep, 500);
    };

    startSequence();

    let resizeObserver: ResizeObserver | null = null;
    const handleResize = () => startSequence();

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      clearTimers();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [gradientId]);

  const setNodeRef = (id: NodeId) => (element: HTMLDivElement | null) => {
    nodeRefs.current[id] = element;
  };

  const setDotRef = (id: DotId) => (element: HTMLDivElement | null) => {
    dotRefs.current[id] = element;
  };

  return (
    <section
      id="workflow"
      className="automation-section"
      aria-label="Automation workflow visualization"
    >
      <div className="section-label">{"// How it works"}</div>
      <h2 className="section-title">
        Automation that
        <br />
        actually works
      </h2>
      <p className="section-sub">
        Every campaign I build runs on connected workflows. Here&apos;s what a real lead
        generation automation looks like under the hood.
      </p>

      <div ref={canvasRef} className="flow-canvas flow-canvas-desktop">
        <div className="canvas-label">live workflow preview</div>
        <svg ref={svgRef} className="flow-svg" aria-hidden="true" />

        {flowNodes.map((node) => (
          <div
            key={node.id}
            id={node.id}
            ref={setNodeRef(node.id)}
            className="node"
            style={node.style}
          >
            <div className="node-icon" aria-hidden="true">
              {node.icon}
            </div>
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

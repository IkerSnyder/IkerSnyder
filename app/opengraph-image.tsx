import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Iker Snyder website preview";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function SmallNode({
  title,
  subtitle,
  glow,
}: {
  title: string;
  subtitle: string;
  glow?: "cyan" | "purple";
}) {
  const borderColor =
    glow === "purple" ? "rgba(123, 97, 255, 0.72)" : "rgba(0, 229, 255, 0.2)";
  const shadow =
    glow === "purple"
      ? "0 0 0 2px rgba(123, 97, 255, 0.14), 0 0 20px rgba(123, 97, 255, 0.2)"
      : glow === "cyan"
        ? "0 0 0 2px rgba(0, 229, 255, 0.14), 0 0 20px rgba(0, 229, 255, 0.2)"
        : "none";

  return (
    <div
      style={{
        width: 145,
        height: 84,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "14px 18px",
        background: "#0c1520",
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        color: "#dfeaf4",
        boxShadow: shadow,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 8,
            height: 15,
            display: "flex",
            borderRadius: 3,
            border: "1px solid rgba(0,229,255,0.4)",
          }}
        />
        <div style={{ display: "flex", fontSize: 12, fontWeight: 700 }}>{title}</div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 6,
          fontSize: 10,
          color: "#5d7492",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#080c10",
          color: "#e8edf2",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", inset: 0, display: "flex" }}
        >
          <rect width="1200" height="630" fill="#080c10" />

          {Array.from({ length: 22 }).map((_, index) => (
            <path
              key={`h-${index}`}
              d={`M0 ${index * 30}H1200`}
              stroke="rgba(0,229,255,0.05)"
              strokeWidth="1"
            />
          ))}

          {Array.from({ length: 42 }).map((_, index) => (
            <path
              key={`v-${index}`}
              d={`M${index * 30} 0V630`}
              stroke="rgba(0,229,255,0.05)"
              strokeWidth="1"
            />
          ))}

          {Array.from({ length: 18 }).map((_, index) => (
            <circle
              key={`c-${index}`}
              cx="310"
              cy="315"
              r={120 + index * 26}
              fill="none"
              stroke="rgba(0,229,255,0.14)"
              strokeWidth="1"
            />
          ))}

          <rect
            x="55"
            y="28"
            width="440"
            height="574"
            rx="28"
            fill="none"
            stroke="rgba(0,229,255,0.12)"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            left: 72,
            top: 82,
            display: "flex",
            fontFamily: "monospace",
            fontSize: 22,
            color: "#00e5ff",
          }}
        >
          {"// available for freelance"}
        </div>

        <div
          style={{
            position: "absolute",
            left: 72,
            top: 118,
            width: 4,
            height: 292,
            display: "flex",
            background: "#00e5ff",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 92,
            top: 126,
            display: "flex",
            flexDirection: "column",
            lineHeight: 0.88,
            letterSpacing: -6,
            fontFamily: "Arial, sans-serif",
            fontWeight: 900,
          }}
        >
          <div style={{ display: "flex", fontSize: 118, color: "#e8edf2" }}>IKER</div>
          <div style={{ display: "flex", fontSize: 140, color: "rgba(0,229,255,0.18)" }}>
            SNYDER
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 60,
            bottom: 120,
            display: "flex",
            gap: 30,
            fontFamily: "monospace",
            fontSize: 17,
            color: "#5d7492",
          }}
        >
          <div style={{ display: "flex" }}>LinkedIn outreach</div>
          <div style={{ display: "flex" }}>Email campaigns</div>
          <div style={{ display: "flex" }}>n8n automation</div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 60,
            bottom: 42,
            display: "flex",
            fontFamily: "monospace",
            fontSize: 14,
            color: "#475264",
          }}
        >
          ikersnyder.com
        </div>

        <div
          style={{
            position: "absolute",
            right: 38,
            top: 60,
            width: 572,
            height: 510,
            display: "flex",
            overflow: "hidden",
            borderRadius: 18,
            border: "1px solid #1e2d3d",
            background: "#091018",
          }}
        >
          <svg
            width="572"
            height="510"
            viewBox="0 0 572 510"
            style={{ position: "absolute", inset: 0, display: "flex" }}
          >
            {Array.from({ length: 18 }).map((_, index) => (
              <path
                key={`ph-${index}`}
                d={`M0 ${index * 30}H572`}
                stroke="rgba(0,229,255,0.04)"
                strokeWidth="1"
              />
            ))}
            {Array.from({ length: 20 }).map((_, index) => (
              <path
                key={`pv-${index}`}
                d={`M${index * 30} 0V510`}
                stroke="rgba(0,229,255,0.04)"
                strokeWidth="1"
              />
            ))}
            <defs>
              <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="100%" stopColor="#7b61ff" />
              </linearGradient>
            </defs>
            <path d="M145 255C180 255 176 170 210 170" fill="none" stroke="url(#flowGrad)" strokeWidth="2" />
            <path d="M145 255C180 255 176 380 210 380" fill="none" stroke="url(#flowGrad)" strokeWidth="2" />
            <path d="M354 170C389 170 395 170 425 170" fill="none" stroke="url(#flowGrad)" strokeWidth="2" />
            <path d="M354 380C389 380 395 380 425 380" fill="none" stroke="url(#flowGrad)" strokeWidth="2" />
            <path d="M510 212C490 240 483 282 468 315" fill="none" stroke="url(#flowGrad)" strokeWidth="2" />
            <path d="M510 380C492 352 479 323 470 296" fill="none" stroke="url(#flowGrad)" strokeWidth="2" />
            <circle cx="146" cy="255" r="5" fill="#00e5ff" />
            <circle cx="210" cy="170" r="4" fill="#00e5ff" />
            <circle cx="210" cy="380" r="4" fill="#00e5ff" />
            <circle cx="354" cy="170" r="4" fill="#22384d" />
            <circle cx="354" cy="380" r="4" fill="#22384d" />
            <circle cx="425" cy="170" r="4" fill="#22384d" />
            <circle cx="425" cy="380" r="4" fill="#22384d" />
            <circle cx="510" cy="255" r="5" fill="#7b61ff" />
          </svg>

          <div
            style={{
              position: "absolute",
              left: 16,
              top: 16,
              display: "flex",
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#4a5568",
            }}
          >
            live workflow
          </div>

          <div style={{ position: "absolute", left: 20, top: 213, display: "flex" }}>
            <SmallNode title="LinkedIn" subtitle="Target ICP" glow="cyan" />
          </div>
          <div style={{ position: "absolute", left: 190, top: 128, display: "flex" }}>
            <SmallNode title="Enrich Lead" subtitle="Pull email + data" />
          </div>
          <div style={{ position: "absolute", left: 190, top: 338, display: "flex" }}>
            <SmallNode title="LinkedInDM" subtitle="Personalised msg" />
          </div>
          <div style={{ position: "absolute", left: 370, top: 128, display: "flex" }}>
            <SmallNode title="Email Seq." subtitle="3-touch campaign" />
          </div>
          <div style={{ position: "absolute", left: 370, top: 338, display: "flex" }}>
            <SmallNode title="Reply Check" subtitle="Auto-qualify" />
          </div>
          <div style={{ position: "absolute", right: 24, top: 213, display: "flex" }}>
            <SmallNode title="CRM Updated" subtitle="Ready to close" glow="purple" />
          </div>
        </div>
      </div>
    ),
    size,
  );
}

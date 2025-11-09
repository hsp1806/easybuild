import React from "react";
import PartCard from "./PartCard";

export default function Results({ result }: { result: any | null }) {
  if (!result) return null;
  const { parts, total, explanations } = result;
  return (
    <div style={{ maxWidth: 900, margin: "12px auto", padding: 12 }}>
      <div style={{ padding: 12, background: "white", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <h2 style={{ margin: 0 }}>Build result — Total: ${total}</h2>
        <p style={{ color: "#666", marginTop: 6 }}>Simple prototype algorithm output.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 12 }}>
        <PartCard title="CPU" part={parts.cpu} explanation={explanations.cpu} />
        <PartCard title="GPU" part={parts.gpu} explanation={explanations.gpu} />
        <PartCard title="Motherboard" part={parts.mobo} explanation={explanations.mobo} />
        <PartCard title="RAM" part={parts.ram} explanation={explanations.ram} />
        <PartCard title="Storage" part={parts.storage} explanation={explanations.storage} />
        <PartCard title="PSU" part={parts.psu} explanation={explanations.psu} />
        <PartCard title="Case" part={parts.case} explanation={explanations.case} />
      </div>
    </div>
  );
}

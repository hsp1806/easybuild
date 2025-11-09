import React from "react";

export default function PartCard({ title, part, explanation }: { title:string, part:any, explanation:string }) {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
      <h3 style={{ fontWeight: 600 }}>{title}</h3>
      <p style={{ margin: "6px 0" }}>{part?.name || "None"}</p>
      <p style={{ fontSize: 12, color: "#555" }}>Price: ${part?.price ?? "—"}</p>
      <p style={{ marginTop: 8 }}>{explanation}</p>
    </div>
  );
}

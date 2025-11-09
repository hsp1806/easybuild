import React, { useState } from "react";

export default function BudgetInput({ onBuild }: { onBuild: (b:number)=>void }) {
  const [val, setVal] = useState<string>("800");

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", padding: 12 }}>
      <label style={{ display: "block", marginBottom: 8 }}>Enter your budget (USD)</label>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="number"
          value={val}
          onChange={e => setVal(e.target.value)}
          style={{ flex: 1, padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
        />
        <button
          onClick={() => onBuild(Number(val))}
          style={{ padding: "8px 12px", background: "#2563eb", color: "white", border: "none", borderRadius: 4 }}
        >
          Build
        </button>
      </div>
      <p style={{ fontSize: 12, color: "#555", marginTop: 8 }}>Try budgets like 400, 800, 1400</p>
    </div>
  );
}

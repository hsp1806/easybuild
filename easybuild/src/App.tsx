import React, { useState } from "react";
import BudgetInput from "./components/BudgetInput";
import Results from "./components/Results";
import partsData from "./data/parts.json";
import { buildFromBudget } from "./lib/builder";

function App() {
  const [result, setResult] = useState<any | null>(null);

  function handleBuild(budget: number) {
    const r = buildFromBudget(budget, partsData as any);
    setResult(r);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>
      <header style={{ padding: 20, background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>EasyBuild (prototype)</h1>
      </header>

      <main style={{ padding: 20 }}>
        <BudgetInput onBuild={handleBuild} />
        <Results result={result} />
      </main>
    </div>
  );
}

export default App;

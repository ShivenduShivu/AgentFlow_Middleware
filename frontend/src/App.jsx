import "./App.css";
import { useState } from "react";

export default function App() {
  const workflow = ["support", "policy", "finance"];
  const [trace, setTrace] = useState([]);

  async function runWorkflow() {
    const response = await fetch("http://127.0.0.1:8000/run-workflow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workflow: workflow,
        input: { request: "refund" },
      }),
    });

    const data = await response.json();
    setTrace(data.trace);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>AgentFlow Dashboard</h1>
      </header>

      <div className="main">
        {/* Workflow Panel */}
        <div className="panel workflow">
          <h2>Workflow Builder</h2>

          <div className="workflow-diagram">
            {workflow.map((agent, index) => (
              <div key={agent} className="workflow-step">
                <div className="agent-box">{agent}</div>
                {index < workflow.length - 1 && (
                  <div className="arrow">→</div>
                )}
              </div>
            ))}
          </div>

          <button className="run-btn" onClick={runWorkflow}>
            Run Workflow
          </button>
        </div>

        {/* Trace Panel */}
        <div className="panel trace">
          <h2>Trace Panel</h2>

          <div className="trace-list">
            {trace.map((step) => {
              const value = Object.values(step.output)[0];

              return (
                <div key={step.agent} className="trace-item">
                  <span className="trace-agent">{step.agent}</span>
                  <span className="trace-arrow">→</span>
                  <span className="trace-value">{value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
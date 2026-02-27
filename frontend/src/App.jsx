import "./App.css";
import { useState } from "react";

export default function App() {
  const [workflowInput, setWorkflowInput] = useState(
    "support,policy,finance"
  );
  const [requestInput, setRequestInput] = useState("refund");
  const [trace, setTrace] = useState([]);

  const workflow = workflowInput
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  async function runWorkflow() {
    const response = await fetch("http://127.0.0.1:8000/run-workflow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workflow: workflow,
        input: { request: requestInput },
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

          <label>Agents (comma separated)</label>
          <input
            className="text-input"
            value={workflowInput}
            onChange={(e) => setWorkflowInput(e.target.value)}
          />

          <label>Request</label>
          <input
            className="text-input"
            value={requestInput}
            onChange={(e) => setRequestInput(e.target.value)}
          />

          <div className="workflow-diagram">
            {workflow.map((agent, index) => (
              <div key={agent + index} className="workflow-step">
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
          <h2>Execution Trace</h2>

          {trace.length === 0 && (
            <div className="trace-empty">
              Run workflow to see execution trace
            </div>
          )}

          <div className="trace-list">
            {trace.map((step, i) => {
              const value = Object.values(step.output)[0];

              return (
                <div key={i} className="trace-item">
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
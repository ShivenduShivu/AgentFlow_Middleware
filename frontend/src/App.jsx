import "./App.css";

export default function App() {
  const workflow = ["support", "policy", "finance"];

  // demo trace (matches backend format)
  const trace = [
    { agent: "support", output: { support: "approved" } },
    { agent: "policy", output: { policy: "validated" } },
    { agent: "finance", output: { finance: "processed" } }
  ];

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
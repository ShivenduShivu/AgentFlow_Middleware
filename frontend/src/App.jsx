import "./App.css";

export default function App() {
  const workflow = ["support", "policy", "finance"];

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
          <p>(execution trace will appear here)</p>
        </div>
      </div>
    </div>
  );
}
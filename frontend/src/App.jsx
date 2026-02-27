import "./App.css";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>AgentFlow Dashboard</h1>
      </header>

      <div className="main">
        <div className="panel workflow">
          <h2>Workflow Builder</h2>
          <p>(workflow controls will go here)</p>
        </div>

        <div className="panel trace">
          <h2>Trace Panel</h2>
          <p>(execution trace will appear here)</p>
        </div>
      </div>
    </div>
  );
}
from fastapi import FastAPI
from app.agents.registry import registry
from app.agents.base import Agent
from app.orchestrator.workflow import orchestrator
from app.trace.store import trace_store

app = FastAPI(title="AgentFlow Backend")


# --- Demo Agents ---
class SupportAgent(Agent):
    def execute(self, data: dict) -> dict:
        return {"support": "approved"}


class PolicyAgent(Agent):
    def execute(self, data: dict) -> dict:
        return {"policy": "validated"}


class FinanceAgent(Agent):
    def execute(self, data: dict) -> dict:
        return {"finance": "processed"}


# Register agents
registry.register(SupportAgent("support"))
registry.register(PolicyAgent("policy"))
registry.register(FinanceAgent("finance"))


@app.get("/")
def read_root():
    return {"message": "AgentFlow backend is running"}


@app.get("/agents")
def list_agents():
    return registry.list_agents()


@app.get("/run-workflow")
def run_workflow():
    workflow = ["support", "policy", "finance"]
    input_data = {"request": "refund"}

    result = orchestrator.run(workflow, input_data)

    return result


# --- NEW: execution trace ---
@app.get("/trace")
def get_trace():
    return trace_store.get_trace()
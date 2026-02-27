from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Dict

from app.agents.registry import registry
from app.agents.base import Agent
from app.orchestrator.workflow import orchestrator
from app.trace.store import trace_store

app = FastAPI(title="AgentFlow Backend")


# ---------- Request Model ----------
class WorkflowRequest(BaseModel):
    workflow: List[str]
    input: Dict


# ---------- Demo Agents ----------
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
def serve_ui():
    return FileResponse("app/ui/index.html")


@app.get("/agents")
def list_agents():
    return registry.list_agents()


@app.post("/run-workflow")
def run_workflow(req: WorkflowRequest):
    result = orchestrator.run(req.workflow, req.input)
    trace = trace_store.get_trace()

    return {
        "result": result,
        "trace": trace
    }
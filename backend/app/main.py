from fastapi import FastAPI
from app.agents.registry import registry
from app.agents.base import Agent

app = FastAPI(title="AgentFlow Backend")


# --- Demo Agents ---
class SupportAgent(Agent):
    def execute(self, data: dict) -> dict:
        return {"status": "support_checked"}


class PolicyAgent(Agent):
    def execute(self, data: dict) -> dict:
        return {"status": "policy_checked"}


class FinanceAgent(Agent):
    def execute(self, data: dict) -> dict:
        return {"status": "finance_checked"}


# Register agents at startup
registry.register(SupportAgent("support"))
registry.register(PolicyAgent("policy"))
registry.register(FinanceAgent("finance"))


@app.get("/")
def read_root():
    return {"message": "AgentFlow backend is running"}


@app.get("/agents")
def list_agents():
    return registry.list_agents()
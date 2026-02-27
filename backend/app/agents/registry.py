from typing import Dict
from .base import Agent


class AgentRegistry:
    """
    Stores and manages all agents.
    """

    def __init__(self):
        self._agents: Dict[str, Agent] = {}

    def register(self, agent: Agent):
        self._agents[agent.name] = agent

    def get(self, name: str) -> Agent:
        return self._agents[name]

    def list_agents(self):
        return list(self._agents.keys())


# Global registry instance
registry = AgentRegistry()
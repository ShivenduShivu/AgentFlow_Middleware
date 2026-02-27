from typing import List, Dict
from app.agents.registry import registry
from app.trace.store import trace_store


class WorkflowOrchestrator:
    """
    Executes agents in sequence and records trace.
    """

    def run(self, agent_names: List[str], data: Dict) -> Dict:
        current_data = data.copy()

        # clear previous trace
        trace_store.clear()

        for name in agent_names:
            agent = registry.get(name)
            result = agent.execute(current_data)

            # record trace
            trace_store.add(name, result)

            # merge into shared state
            current_data.update(result)

        return current_data


# global orchestrator
orchestrator = WorkflowOrchestrator()
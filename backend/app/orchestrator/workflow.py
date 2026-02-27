from typing import List, Dict
from app.agents.registry import registry


class WorkflowOrchestrator:
    """
    Executes agents in sequence.
    """

    def run(self, agent_names: List[str], data: Dict) -> Dict:
        """
        agent_names: ordered list of agent names
        data: shared workflow data
        """
        current_data = data.copy()

        for name in agent_names:
            agent = registry.get(name)
            result = agent.execute(current_data)

            # merge result into workflow data
            current_data.update(result)

        return current_data


# global orchestrator
orchestrator = WorkflowOrchestrator()
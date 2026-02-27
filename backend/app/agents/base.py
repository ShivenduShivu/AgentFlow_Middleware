class Agent:
    """
    Base class for all agents.
    Each agent must have:
    - name
    - execute() method
    """

    def __init__(self, name: str):
        self.name = name

    def execute(self, data: dict) -> dict:
        """
        Override in specific agents.
        """
        raise NotImplementedError
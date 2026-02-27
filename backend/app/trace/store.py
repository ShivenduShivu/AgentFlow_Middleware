from typing import List, Dict


class TraceStore:
    """
    Stores execution trace of workflows.
    """

    def __init__(self):
        self._trace: List[Dict] = []

    def add(self, agent: str, output: Dict):
        self._trace.append({
            "agent": agent,
            "output": output
        })

    def get_trace(self) -> List[Dict]:
        return self._trace

    def clear(self):
        self._trace = []


# global trace store
trace_store = TraceStore()
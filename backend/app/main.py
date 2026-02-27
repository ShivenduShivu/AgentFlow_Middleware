from fastapi import FastAPI

# Create FastAPI app
app = FastAPI(title="AgentFlow Backend")

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "AgentFlow backend is running"}